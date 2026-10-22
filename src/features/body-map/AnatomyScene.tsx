import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import {
  Bounds,
  Center,
  OrbitControls,
  useBounds,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'
import { mapBoneLabel, mapMuscleConcept } from './anatomyIndex'
import { applyBonePose, motionSpecFor, restoreBonePose } from './boneMotions'
import { skeletonLabels } from './skeletonLabels'
import type { BodyMapMode, BodyView } from './BodyMap'

type MuscleRole = 'agonist' | 'synergist' | 'stabilizer' | 'antagonist'

interface Highlight {
  muscleId: string
  role: MuscleRole
}

const roleColors: Record<MuscleRole, string> = {
  agonist: '#f04438',
  synergist: '#e7a196',
  stabilizer: '#c96a63',
  antagonist: '#6e8baa',
}

function paint(
  mesh: THREE.Mesh,
  color: string,
  opacity: number,
  emphasis: boolean,
) {
  const materials = Array.isArray(mesh.material)
    ? mesh.material
    : [mesh.material]
  materials.forEach((material) => {
    if (!('color' in material)) return
    const standard = material as THREE.MeshStandardMaterial
    standard.color.set(color)
    standard.emissive.set(emphasis ? color : '#000000')
    standard.emissiveIntensity = emphasis ? 0.22 : 0
    standard.transparent = opacity < 0.98
    standard.opacity = opacity
    standard.depthWrite = opacity > 0.45
    standard.side = THREE.DoubleSide
    standard.needsUpdate = true
  })
}

function storeBoneExtents(mesh: THREE.Mesh) {
  const rest = mesh.userData.restPosition as THREE.Vector3 | undefined
  if (!rest) return
  mesh.geometry.computeBoundingBox()
  const bounds = mesh.geometry.boundingBox
  if (!bounds) return
  const scaledMin = bounds.min.clone().multiply(mesh.scale)
  const scaledMax = bounds.max.clone().multiply(mesh.scale)
  mesh.userData.restMin = rest.clone().add(scaledMin.clone().min(scaledMax))
  mesh.userData.restMax = rest.clone().add(scaledMax.clone().max(scaledMin))
}

function prepare(scene: THREE.Object3D, kind: 'muscle' | 'bone') {
  const tracked: THREE.Mesh[] = []
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh
    if (!mesh.isMesh) return
    if (mesh.userData.kind) {
      if (kind === 'bone') storeBoneExtents(mesh)
      if (mesh.userData.kind === kind) tracked.push(mesh)
      return
    }
    const source = Array.isArray(mesh.material)
      ? mesh.material[0]
      : mesh.material
    mesh.material = source.clone()
    const standard = mesh.material as THREE.MeshStandardMaterial
    if ('roughness' in standard) {
      standard.roughness = 0.55
      standard.metalness = 0
    }
    mesh.userData.kind = kind
    mesh.userData.baseRaycast = mesh.raycast.bind(mesh)
    mesh.userData.homeParent = mesh.parent
    mesh.userData.restPosition = mesh.position.clone()
    mesh.userData.restQuaternion = mesh.quaternion.clone()
    if (kind === 'bone') storeBoneExtents(mesh)
    const concept =
      kind === 'muscle'
        ? String(mesh.userData.concept ?? '')
        : (skeletonLabels[String(mesh.userData.structureId ?? '')] ?? '')
    mesh.userData.entityId =
      kind === 'muscle' ? mapMuscleConcept(concept) : mapBoneLabel(concept)
    tracked.push(mesh)
  })
  scene.userData.tracked = tracked
}

function presentScene(
  scene: THREE.Object3D,
  parking: THREE.Object3D,
  kind: 'muscle' | 'bone',
  mode: BodyMapMode,
  selectedEntityId: string | undefined,
  highlightedMuscles: readonly Highlight[],
  visibleIds: readonly string[] | null,
  isolate: boolean,
) {
  const tracked = scene.userData.tracked as THREE.Mesh[] | undefined
  if (!tracked) return
  const highlighted = new Map(
    highlightedMuscles.map((item) => [item.muscleId, item.role]),
  )
  const active = kind === 'muscle' ? mode === 'muscles' : mode === 'bones'
  const allow = visibleIds ? new Set(visibleIds) : null

  tracked.forEach((mesh) => {
    const home = mesh.userData.homeParent as THREE.Object3D
    const rest = mesh.userData.restPosition as THREE.Vector3
    if (mesh.parent !== home) home.attach(mesh)
    mesh.position.copy(rest)
    const restRotation = mesh.userData.restQuaternion as
      THREE.Quaternion | undefined
    if (restRotation) mesh.quaternion.copy(restRotation)

    const entityId = mesh.userData.entityId as string | null
    const included = allow === null || Boolean(entityId && allow.has(entityId))
    if (!included) {
      mesh.visible = false
      parking.attach(mesh)
      return
    }

    mesh.visible = true
    if (isolate && kind === 'muscle') {
      const reach = Math.hypot(rest.x, rest.z)
      if (reach > 1) {
        mesh.position.x = rest.x * 1.22
        mesh.position.z = rest.z * 1.22
      } else {
        mesh.position.z = rest.z + 12
      }
    }

    const role = entityId ? highlighted.get(entityId) : undefined
    const selected = Boolean(entityId && entityId === selectedEntityId)
    let color = kind === 'muscle' ? '#c96a63' : '#d9d3c7'
    let opacity = kind === 'muscle' ? (active ? 0.94 : 0.08) : active ? 1 : 0.2

    if (role) {
      color = roleColors[role]
      opacity = role === 'agonist' ? 1 : 0.72
    } else if (highlighted.size > 0 && kind === 'muscle' && allow === null) {
      opacity = 0.08
    }
    if (selected) {
      color = kind === 'muscle' ? '#f04438' : '#087e8b'
      opacity = 1
    }

    paint(mesh, color, opacity, selected || role === 'agonist')
    const selectable = active && Boolean(entityId)
    mesh.raycast = selectable
      ? (mesh.userData.baseRaycast as typeof mesh.raycast)
      : () => undefined
  })
}

function AnatomyLayer({
  url,
  kind,
  mode,
  selectedEntityId,
  highlightedMuscles,
  visibleIds,
  isolate,
  parking,
  onEntitySelect,
  motionId = null,
  motionToken = 0,
}: {
  url: string
  kind: 'muscle' | 'bone'
  mode: BodyMapMode
  selectedEntityId?: string
  highlightedMuscles: readonly Highlight[]
  visibleIds: readonly string[] | null
  isolate: boolean
  parking: THREE.Group
  onEntitySelect: (entityId: string) => void
  motionId?: string | null
  motionToken?: number
}) {
  const { scene } = useGLTF(url)
  const playback = useRef({ token: -1, start: 0, done: false })

  useFrame((state) => {
    if (kind !== 'bone') return
    const tracked = scene.userData.tracked as THREE.Mesh[] | undefined
    if (!tracked) return
    const spec = motionId ? motionSpecFor(motionId) : null
    if (!spec) {
      if (playback.current.token !== -1) {
        restoreBonePose(tracked)
        playback.current.token = -1
      }
      return
    }
    if (playback.current.token !== motionToken) {
      playback.current = {
        token: motionToken,
        start: state.clock.elapsedTime,
        done: false,
      }
    }
    if (playback.current.done) return
    const elapsed = state.clock.elapsedTime - playback.current.start
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const progress = reduced ? 0.55 : Math.min(elapsed / 3.6, 1)
    applyBonePose(tracked, spec, progress)
    if (!reduced && progress >= 1) {
      restoreBonePose(tracked)
      playback.current.done = true
    }
  })

  useLayoutEffect(() => {
    prepare(scene, kind)
  }, [kind, scene])

  useLayoutEffect(() => {
    presentScene(
      scene,
      parking,
      kind,
      mode,
      selectedEntityId,
      highlightedMuscles,
      visibleIds,
      isolate,
    )
  }, [
    highlightedMuscles,
    isolate,
    kind,
    mode,
    parking,
    scene,
    selectedEntityId,
    visibleIds,
  ])

  return (
    <primitive
      object={scene}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (pointerDragged) return
        event.stopPropagation()
        const entityId = (event.object as THREE.Object3D).userData.entityId as
          string | null
        if (entityId) onEntitySelect(entityId)
      }}
    />
  )
}

function FrameFocus({ focusKey }: { focusKey: string }) {
  const api = useBounds()
  const apiRef = useRef(api)
  apiRef.current = api
  useLayoutEffect(() => {
    apiRef.current.refresh().reset().clip()
  }, [focusKey])
  return null
}

function cacheKeyFor(value: string) {
  return Array.from(value).reduce(
    (sum, char, index) => sum + char.charCodeAt(0) * (index + 1),
    0,
  )
}

let pointerDragged = false

type OrbitLike = {
  mouseButtons: { LEFT: number }
  touches: { ONE: number }
}

function isShownAnatomyMesh(object: THREE.Object3D) {
  const mesh = object as THREE.Mesh
  if (!mesh.isMesh) return false
  if (mesh.userData.kind !== 'muscle' && mesh.userData.kind !== 'bone') {
    return false
  }
  let current: THREE.Object3D | null = mesh
  while (current) {
    if (!current.visible || current.name === 'anatomy-parking') return false
    current = current.parent
  }
  return true
}

const raycaster = new THREE.Raycaster()
const pointerNdc = new THREE.Vector2()
const meshBounds = new THREE.Box3()
const hitPoint = new THREE.Vector3()

function pointerHitsModel(
  event: PointerEvent,
  dom: HTMLCanvasElement,
  camera: THREE.Camera,
  scene: THREE.Scene,
) {
  const rect = dom.getBoundingClientRect()
  pointerNdc.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
  camera.updateMatrixWorld(true)
  scene.updateMatrixWorld(true)
  raycaster.setFromCamera(pointerNdc, camera)
  let hit = false
  scene.traverse((object) => {
    if (hit || !isShownAnatomyMesh(object)) return
    const mesh = object as THREE.Mesh
    const geometry = mesh.geometry
    if (!geometry.boundingBox) geometry.computeBoundingBox()
    if (!geometry.boundingBox) return
    meshBounds.copy(geometry.boundingBox).applyMatrix4(mesh.matrixWorld)
    hit = raycaster.ray.intersectBox(meshBounds, hitPoint) !== null
  })
  return hit
}

function DragMode() {
  const camera = useThree((state) => state.camera)
  const controls = useThree((state) => state.controls) as OrbitLike | null
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (!controls) return
    const dom = gl.domElement
    let startX = 0
    let startY = 0

    const onPointerDown = (event: PointerEvent) => {
      pointerDragged = false
      startX = event.clientX
      startY = event.clientY
      if (event.pointerType !== 'touch' && event.button !== 0) return
      const onModel = pointerHitsModel(event, dom, camera, scene)
      controls.mouseButtons.LEFT = onModel
        ? THREE.MOUSE.ROTATE
        : THREE.MOUSE.PAN
      controls.touches.ONE = onModel ? THREE.TOUCH.ROTATE : THREE.TOUCH.PAN
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.buttons === 0 && event.pointerType !== 'touch') return
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 6) {
        pointerDragged = true
      }
    }

    dom.addEventListener('pointerdown', onPointerDown, true)
    dom.ownerDocument.addEventListener('pointermove', onPointerMove)
    return () => {
      dom.removeEventListener('pointerdown', onPointerDown, true)
      dom.ownerDocument.removeEventListener('pointermove', onPointerMove)
    }
  }, [camera, controls, gl, scene])

  return null
}

export function AnatomyScene({
  mode,
  view,
  selectedEntityId,
  highlightedMuscles,
  visibleMuscleIds,
  visibleBoneIds,
  isolate,
  onEntitySelect,
  motionId = null,
  motionToken = 0,
}: {
  mode: BodyMapMode
  view: BodyView
  selectedEntityId?: string
  highlightedMuscles: readonly Highlight[]
  visibleMuscleIds: readonly string[] | null
  visibleBoneIds: readonly string[] | null
  isolate: boolean
  onEntitySelect: (entityId: string) => void
  motionId?: string | null
  motionToken?: number
}) {
  const [parking] = useState(() => {
    const group = new THREE.Group()
    group.name = 'anatomy-parking'
    group.visible = false
    return group
  })
  const framingKey = `${mode}:${view}`

  return (
    <Canvas
      camera={{ fov: 32, position: [0, 0.1, 3.2] }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMappingExposure: 1.12 }}
    >
      <color attach="background" args={['#f3f1ec']} />
      <hemisphereLight args={['#fff7f2', '#e7ddd2', 0.72]} />
      <ambientLight intensity={0.2} />
      <directionalLight intensity={1.55} position={[1.4, 2.5, 3.6]} />
      <directionalLight intensity={0.7} position={[-2.2, 1.3, 2.4]} />
      <directionalLight intensity={0.35} position={[0.4, 1.6, -3]} />
      <primitive object={parking} />
      <Bounds clip fit margin={1.28} maxDuration={0.45} observe>
        <Center cacheKey={cacheKeyFor(framingKey)}>
          <group rotation={[0, view === 'back' ? Math.PI : 0, 0]}>
            <AnatomyLayer
              highlightedMuscles={highlightedMuscles}
              isolate={isolate}
              kind="muscle"
              mode={mode}
              onEntitySelect={onEntitySelect}
              parking={parking}
              selectedEntityId={selectedEntityId}
              url="/models/muscles.glb"
              visibleIds={visibleMuscleIds}
            />
            <AnatomyLayer
              highlightedMuscles={highlightedMuscles}
              isolate={false}
              kind="bone"
              motionId={motionId}
              motionToken={motionToken}
              mode={mode}
              onEntitySelect={onEntitySelect}
              parking={parking}
              selectedEntityId={selectedEntityId}
              url="/models/skeleton.glb"
              visibleIds={visibleBoneIds}
            />
          </group>
        </Center>
        <FrameFocus focusKey={framingKey} />
      </Bounds>
      <OrbitControls
        enablePan
        makeDefault
        maxDistance={8}
        minDistance={0.35}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        screenSpacePanning
        touches={{
          ONE: THREE.TOUCH.PAN,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
      />
      <DragMode />
    </Canvas>
  )
}

useGLTF.preload('/models/muscles.glb')
useGLTF.preload('/models/skeleton.glb')
