import { bones } from '../../data/bones'
import { jointActions } from '../../data/jointActions'
import type { JointAction } from '../../domain/anatomy'
import * as THREE from 'three'

export interface BoneMotionSpec {
  actionId: string
  movingBoneIds: readonly string[]
  pivotBoneId: string
  pivotEnd: 'maxY' | 'minY'
  /** Negative sagittal rotation swings the distal end toward the front (+Z). */
  sagittal: number
  /** Positive frontal rotation lifts the +X side away from the midline. */
  frontal: number
  mirrorFrontal: boolean
  follow: 'arm' | 'leg' | 'none'
  singlePivot?: boolean
  startSagittal?: number
  startFrontal?: number
}

const arm = ['humerus', 'radius', 'ulna'] as const
const lowerLeg = ['patella', 'tibia', 'fibula', 'talus'] as const
const wholeLeg = ['femur', ...lowerLeg] as const
const trunk = [
  'vertebral-column',
  'sternum',
  'ribs',
  'clavicle',
  'scapula',
  ...arm,
] as const

export const boneMotionSpecs: readonly BoneMotionSpec[] = [
  {
    actionId: 'shoulder-flexion',
    movingBoneIds: arm,
    pivotBoneId: 'humerus',
    pivotEnd: 'maxY',
    sagittal: -1.35,
    frontal: 0.12,
    mirrorFrontal: true,
    follow: 'arm',
  },
  {
    actionId: 'shoulder-extension',
    movingBoneIds: arm,
    pivotBoneId: 'humerus',
    pivotEnd: 'maxY',
    sagittal: 0.9,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'arm',
  },
  {
    actionId: 'shoulder-abduction',
    movingBoneIds: arm,
    pivotBoneId: 'humerus',
    pivotEnd: 'maxY',
    sagittal: 0,
    frontal: 1.25,
    mirrorFrontal: true,
    follow: 'arm',
  },
  {
    actionId: 'shoulder-horizontal-adduction',
    movingBoneIds: arm,
    pivotBoneId: 'humerus',
    pivotEnd: 'maxY',
    sagittal: -1.15,
    frontal: -0.75,
    mirrorFrontal: true,
    follow: 'arm',
  },
  {
    actionId: 'elbow-flexion',
    movingBoneIds: ['radius', 'ulna'],
    pivotBoneId: 'humerus',
    pivotEnd: 'minY',
    sagittal: -2.05,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'arm',
  },
  {
    actionId: 'elbow-extension',
    movingBoneIds: ['radius', 'ulna'],
    pivotBoneId: 'humerus',
    pivotEnd: 'minY',
    sagittal: 0,
    frontal: 0,
    startSagittal: -2.05,
    mirrorFrontal: false,
    follow: 'arm',
  },
  {
    actionId: 'trunk-flexion',
    movingBoneIds: trunk,
    pivotBoneId: 'vertebral-column',
    pivotEnd: 'minY',
    sagittal: -0.55,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'arm',
    singlePivot: true,
  },
  {
    actionId: 'trunk-extension',
    movingBoneIds: trunk,
    pivotBoneId: 'vertebral-column',
    pivotEnd: 'minY',
    sagittal: 0.35,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'arm',
    singlePivot: true,
  },
  {
    actionId: 'hip-flexion',
    movingBoneIds: wholeLeg,
    pivotBoneId: 'femur',
    pivotEnd: 'maxY',
    sagittal: -1.15,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'leg',
  },
  {
    actionId: 'hip-extension',
    movingBoneIds: wholeLeg,
    pivotBoneId: 'femur',
    pivotEnd: 'maxY',
    sagittal: 0.5,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'leg',
  },
  {
    actionId: 'knee-flexion',
    movingBoneIds: lowerLeg,
    pivotBoneId: 'femur',
    pivotEnd: 'minY',
    sagittal: 1.7,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'leg',
  },
  {
    actionId: 'knee-extension',
    movingBoneIds: lowerLeg,
    pivotBoneId: 'femur',
    pivotEnd: 'minY',
    sagittal: 0,
    frontal: 0,
    startSagittal: 1.7,
    mirrorFrontal: false,
    follow: 'leg',
  },
  {
    actionId: 'ankle-plantarflexion',
    movingBoneIds: ['talus'],
    pivotBoneId: 'tibia',
    pivotEnd: 'minY',
    sagittal: 0.7,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'leg',
  },
  {
    actionId: 'ankle-dorsiflexion',
    movingBoneIds: ['talus'],
    pivotBoneId: 'tibia',
    pivotEnd: 'minY',
    sagittal: -0.45,
    frontal: 0,
    mirrorFrontal: false,
    follow: 'leg',
  },
]

const specsByAction = new Map(
  boneMotionSpecs.map((spec) => [spec.actionId, spec]),
)

export function motionSpecFor(actionId: string) {
  return specsByAction.get(actionId) ?? null
}

export function jointActionsForBone(boneId: string): JointAction[] {
  const bone = bones.find((item) => item.id === boneId)
  if (!bone) return []
  const jointIds = new Set(bone.relatedJointIds)
  return jointActions.filter((action) => jointIds.has(action.jointId))
}

function smooth(value: number) {
  const clamped = Math.min(1, Math.max(0, value))
  return clamped * clamped * (3 - 2 * clamped)
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

export function samplePose(spec: BoneMotionSpec, progress: number) {
  const startSagittal = spec.startSagittal ?? 0
  const startFrontal = spec.startFrontal ?? 0
  const time = Math.min(1, Math.max(0, progress))
  if (time < 0.2) {
    const amount = smooth(time / 0.2)
    return {
      sagittal: lerp(0, startSagittal, amount),
      frontal: lerp(0, startFrontal, amount),
    }
  }
  if (time < 0.36) {
    const amount = smooth((time - 0.2) / 0.16)
    return {
      sagittal: lerp(startSagittal, spec.sagittal, amount),
      frontal: lerp(startFrontal, spec.frontal, amount),
    }
  }
  if (time < 0.78) {
    return { sagittal: spec.sagittal, frontal: spec.frontal }
  }
  const amount = smooth((time - 0.78) / 0.22)
  return {
    sagittal: lerp(spec.sagittal, 0, amount),
    frontal: lerp(spec.frontal, 0, amount),
  }
}

const offset = new THREE.Vector3()
const euler = new THREE.Euler(0, 0, 0, 'XYZ')
const rotation = new THREE.Quaternion()

function restPosition(mesh: THREE.Mesh) {
  return mesh.userData.restPosition as THREE.Vector3
}

function sideOf(mesh: THREE.Mesh) {
  const x = restPosition(mesh).x
  if (Math.abs(x) < 12) return 0
  return Math.sign(x)
}

function restoreMesh(mesh: THREE.Mesh) {
  mesh.position.copy(restPosition(mesh))
  const restRotation = mesh.userData.restQuaternion as
    THREE.Quaternion | undefined
  if (restRotation) mesh.quaternion.copy(restRotation)
}

export function restoreBonePose(meshes: readonly THREE.Mesh[]) {
  meshes.forEach((mesh) => {
    if (mesh.userData.kind === 'bone' && mesh.userData.restPosition) {
      restoreMesh(mesh)
    }
  })
}

function pivotFor(
  meshes: readonly THREE.Mesh[],
  spec: BoneMotionSpec,
  side: number,
) {
  const sources = meshes.filter((mesh) => {
    if (mesh.userData.entityId !== spec.pivotBoneId) return false
    if (spec.singlePivot) return true
    return sideOf(mesh) === side
  })
  if (sources.length === 0) return null
  const pivot = new THREE.Vector3()
  let extreme = spec.pivotEnd === 'maxY' ? -Infinity : Infinity
  sources.forEach((mesh) => {
    const rest = restPosition(mesh)
    const limit = mesh.userData[
      spec.pivotEnd === 'maxY' ? 'restMax' : 'restMin'
    ] as THREE.Vector3 | undefined
    const y = limit?.y ?? rest.y
    extreme =
      spec.pivotEnd === 'maxY' ? Math.max(extreme, y) : Math.min(extreme, y)
    pivot.x += rest.x
    pivot.z += rest.z
  })
  pivot.x /= sources.length
  pivot.z /= sources.length
  pivot.y = extreme
  return pivot
}

function follows(
  mesh: THREE.Mesh,
  spec: BoneMotionSpec,
  side: number,
  pivot: THREE.Vector3,
) {
  const entityId = mesh.userData.entityId as string | null
  const meshSide = sideOf(mesh)
  if (spec.singlePivot) {
    if (entityId && spec.movingBoneIds.includes(entityId)) return true
  } else if (meshSide !== side) {
    return false
  } else if (entityId && spec.movingBoneIds.includes(entityId)) {
    return true
  }
  if (entityId || spec.follow === 'none') return false
  const rest = restPosition(mesh)
  if (!spec.singlePivot && meshSide !== side) return false
  if (rest.y >= pivot.y) return false
  if (spec.follow === 'arm') return Math.abs(rest.x) > 140
  return Math.abs(rest.x) > 40 && rest.y < 450
}

export function applyBonePose(
  meshes: readonly THREE.Mesh[],
  spec: BoneMotionSpec,
  progress: number,
) {
  restoreBonePose(meshes)
  const pose = samplePose(spec, progress)
  if (pose.sagittal === 0 && pose.frontal === 0) return
  const sides = spec.singlePivot ? [0] : [1, -1]
  sides.forEach((side) => {
    const pivot = pivotFor(meshes, spec, side)
    if (!pivot) return
    const frontal =
      side < 0 && spec.mirrorFrontal ? -pose.frontal : pose.frontal
    euler.set(pose.sagittal, 0, frontal)
    rotation.setFromEuler(euler)
    meshes.forEach((mesh) => {
      if (mesh.userData.kind !== 'bone' || !mesh.userData.restPosition) return
      if (mesh.parent?.name === 'anatomy-parking') return
      if (!follows(mesh, spec, side, pivot)) return
      offset.copy(restPosition(mesh)).sub(pivot)
      offset.applyQuaternion(rotation)
      mesh.position.copy(pivot).add(offset)
      const restRotation = mesh.userData.restQuaternion as
        THREE.Quaternion | undefined
      mesh.quaternion.copy(rotation)
      if (restRotation) mesh.quaternion.multiply(restRotation)
    })
  })
}
