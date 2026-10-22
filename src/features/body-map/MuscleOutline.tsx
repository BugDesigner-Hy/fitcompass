import { BACK_MUSCLES, FRONT_MUSCLES } from 'body-muscles'
import type { MuscleDef } from 'body-muscles'
import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { muscles } from '../../data/muscles'
import type { BodyView } from './BodyMap'
import { muscleIdForOutline, muscleIdsForOutline } from './muscleOutlineMap'
import { outlineCallout, type OutlineCallout } from './outlineCallouts'

type MuscleRole = 'agonist' | 'synergist' | 'stabilizer' | 'antagonist'

const roleRank: Record<MuscleRole, number> = {
  agonist: 4,
  synergist: 3,
  stabilizer: 2,
  antagonist: 1,
}

const roleColors: Record<MuscleRole, string> = {
  agonist: '#f04438',
  synergist: '#e7a196',
  stabilizer: '#c96a63',
  antagonist: '#6e8baa',
}

const names = new Map(muscles.map((muscle) => [muscle.id, muscle.nameZh]))

interface LeaderLine {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
}

interface LabelPlacement {
  left: number
  top: number
}

export function MuscleOutline({
  view,
  selectedEntityId,
  highlightedMuscles = [],
  visibleMuscleIds,
  onEntitySelect,
}: {
  view: BodyView
  selectedEntityId?: string
  highlightedMuscles?: ReadonlyArray<{
    muscleId: string
    role: MuscleRole
  }>
  visibleMuscleIds: readonly string[] | null
  onEntitySelect: (entityId: string) => void
}) {
  const roles = new Map(
    highlightedMuscles.map(({ muscleId, role }) => [muscleId, role]),
  )
  const allow = visibleMuscleIds ? new Set(visibleMuscleIds) : null
  const visibleKey = visibleMuscleIds?.join('|') ?? '*'
  const boardRef = useRef<HTMLDivElement>(null)
  const drawnLeaderRef = useRef<LeaderLine | null>(null)
  const leaderTargetRef = useRef<LeaderLine | null>(null)
  const leaderFrame = useRef(0)
  const [leaders, setLeaders] = useState<LeaderLine[]>([])
  const [placement, setPlacement] = useState<LabelPlacement | null>(null)
  const [travel, setTravel] = useState(false)
  const [settledView, setSettledView] = useState(view)
  const turning = settledView !== view
  const activeCallout = useMemo(() => {
    if (!selectedEntityId) return null
    if (visibleMuscleIds && !visibleMuscleIds.includes(selectedEntityId)) {
      return null
    }
    return outlineCallout(view, selectedEntityId)
  }, [selectedEntityId, view, visibleKey, visibleMuscleIds])

  function moveLeader(next: LeaderLine) {
    const previousTarget = leaderTargetRef.current
    if (
      previousTarget?.id === next.id &&
      previousTarget.x1 === next.x1 &&
      previousTarget.y1 === next.y1 &&
      previousTarget.x2 === next.x2 &&
      previousTarget.y2 === next.y2
    ) {
      return
    }
    leaderTargetRef.current = next
    cancelAnimationFrame(leaderFrame.current)
    const from = drawnLeaderRef.current
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (!from || reduced) {
      drawnLeaderRef.current = next
      setLeaders((current) => (sameLeaders(current, [next]) ? current : [next]))
      return
    }
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 520)
      const eased = moveEase(progress)
      const frame =
        progress === 1
          ? next
          : {
              id: next.id,
              x1: lerp(from.x1, next.x1, eased),
              y1: lerp(from.y1, next.y1, eased),
              x2: lerp(from.x2, next.x2, eased),
              y2: lerp(from.y2, next.y2, eased),
            }
      drawnLeaderRef.current = frame
      setLeaders([frame])
      if (progress < 1) leaderFrame.current = requestAnimationFrame(tick)
    }
    leaderFrame.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    if (!turning) return
    if (prefersReducedMotion()) {
      setSettledView(view)
      return
    }
    const model = boardRef.current?.querySelector('.muscle-outline__model')
    const settle = () => setSettledView(view)
    const onEnd = (event: Event) => {
      if (
        event.target !== model ||
        (event instanceof TransitionEvent && event.propertyName !== 'transform')
      ) {
        return
      }
      settle()
    }
    model?.addEventListener('transitionend', onEnd)
    const timeoutId = window.setTimeout(settle, 650)
    return () => {
      model?.removeEventListener('transitionend', onEnd)
      window.clearTimeout(timeoutId)
    }
  }, [turning, view])

  useLayoutEffect(() => {
    if (turning) {
      cancelAnimationFrame(leaderFrame.current)
      drawnLeaderRef.current = null
      leaderTargetRef.current = null
      return
    }
    const board = boardRef.current
    if (!board || !activeCallout) {
      cancelAnimationFrame(leaderFrame.current)
      drawnLeaderRef.current = null
      leaderTargetRef.current = null
      setLeaders((current) => (current.length === 0 ? current : []))
      setPlacement((current) => (current === null ? current : null))
      setTravel(false)
      return
    }

    const callout = activeCallout
    const measure = () => {
      const figure = board.querySelector(`.muscle-outline__figure--${view}`)
      const path = figure?.querySelector(
        `[data-callout-target="${callout.targetRegionId}"]`,
      )
      const label = board.querySelector(
        `[data-callout-label="${callout.muscleId}"]`,
      )
      if (!(path instanceof Element) || !(label instanceof HTMLElement)) return
      if (!(figure instanceof Element)) return
      const origin = board.getBoundingClientRect()
      const pathBox = path.getBoundingClientRect()
      const labelBox = label.getBoundingClientRect()
      if (pathBox.width === 0 || labelBox.width === 0 || origin.width === 0) {
        return
      }
      const body = drawnBodyRect(figure)
      const margin = 6
      const gap = 8
      const unclampedLeft =
        callout.side === 'left'
          ? body.left - origin.left - labelBox.width - gap
          : body.right - origin.left + gap
      const unclampedTop =
        pathBox.top + pathBox.height / 2 - origin.top - labelBox.height / 2
      const left = Math.round(
        Math.min(
          Math.max(unclampedLeft, margin),
          Math.max(margin, origin.width - labelBox.width - margin),
        ),
      )
      const top = Math.round(
        Math.min(
          Math.max(unclampedTop, margin),
          Math.max(margin, origin.height - labelBox.height - margin),
        ),
      )
      setPlacement((current) =>
        current?.left === left && current.top === top ? current : { left, top },
      )
      if (!travel) requestAnimationFrame(() => setTravel(true))
      moveLeader({
        id: callout.muscleId,
        x1: Math.round(callout.side === 'left' ? left + labelBox.width : left),
        y1: Math.round(top + labelBox.height / 2),
        x2: Math.round(pathBox.left + pathBox.width / 2 - origin.left),
        y2: Math.round(pathBox.top + pathBox.height / 2 - origin.top),
      })
    }

    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(board)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(leaderFrame.current)
      leaderTargetRef.current = drawnLeaderRef.current
    }
  }, [activeCallout, turning, view])

  return (
    <figure className="muscle-outline">
      <div
        className="muscle-outline__board"
        data-turning={turning ? 'true' : 'false'}
        ref={boardRef}
      >
        <div className="muscle-outline__model" data-view={view}>
          <OutlineFace
            active={view === 'front'}
            activeCallout={activeCallout}
            allow={allow}
            face="front"
            roles={roles}
            selectedEntityId={selectedEntityId}
            onEntitySelect={onEntitySelect}
          />
          <OutlineFace
            active={view === 'back'}
            activeCallout={activeCallout}
            allow={allow}
            face="back"
            roles={roles}
            selectedEntityId={selectedEntityId}
            onEntitySelect={onEntitySelect}
          />
        </div>
        <svg aria-hidden="true" className="muscle-outline__leaders">
          {leaders.map((leader) => (
            <g key="active">
              <polyline
                fill="none"
                points={leaderPoints(leader)}
                stroke="#f04438"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
              />
              <circle cx={leader.x2} cy={leader.y2} fill="#f04438" r={3.2} />
            </g>
          ))}
        </svg>
        {activeCallout ? (
          <div
            aria-label="肌肉名称"
            className="muscle-outline__labels"
            role="group"
          >
            <Callout
              callout={activeCallout}
              placement={placement}
              travel={travel}
              onSelect={onEntitySelect}
            />
          </div>
        ) : null}
        <Link aria-label="训练计划" className="plan-entry" to="/plans">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <rect
              fill="none"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
              width="16"
              x="4"
              y="5.5"
            />
            <path
              d="M8 4.2v3M16 4.2v3M4 9.5h16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
            <path
              d="M8 13.2h2.2M12 13.2h2.2M8 16.2h2.2"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </Link>
        <Link aria-label="理论知识" className="theory-bulb" to="/theory">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M12 2.2c-3.4 0-6 2.6-6 5.9 0 2.1 1.1 3.9 2.7 5 .6.4 1 1 1 1.7V16h4.6v-1.2c0-.7.4-1.3 1-1.7 1.6-1.1 2.7-2.9 2.7-5 0-3.3-2.6-5.9-6-5.9z"
              fill="currentColor"
            />
            <path
              d="M9.4 17.2h5.2v1.1H9.4zm.4 2h4.4v1.1h-4.4zm.6 1.9h3.2v1.2h-3.2z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <AttributionButton />
      </div>
    </figure>
  )
}

function AttributionButton() {
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!(event.target instanceof Node)) return
      if (rootRef.current?.contains(event.target)) return
      setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="attribution" ref={rootRef}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label="素材与署名"
        className="attribution__button"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        i
      </button>
      {open ? (
        <div
          aria-label="素材与署名"
          className="attribution__panel"
          id={panelId}
          role="region"
        >
          <p>
            平面肌肉图来自{' '}
            <a
              href="https://github.com/vulovix/body-muscles"
              rel="noreferrer"
              target="_blank"
            >
              Body Muscles
            </a>
            ，© Ivan Vulović，Apache-2.0
          </p>
          <p>
            <Link to="/licenses">素材许可</Link>
          </p>
          <p>
            <a href="https://repdb.co" rel="noreferrer" target="_blank">
              Exercise data by RepDB (repdb.co)
            </a>
          </p>
        </div>
      ) : null}
    </div>
  )
}

function prefersReducedMotion() {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function OutlineFace({
  face,
  active,
  allow,
  roles,
  selectedEntityId,
  activeCallout,
  onEntitySelect,
}: {
  face: BodyView
  active: boolean
  allow: Set<string> | null
  roles: Map<string, MuscleRole>
  selectedEntityId?: string
  activeCallout: OutlineCallout | null
  onEntitySelect: (entityId: string) => void
}) {
  const regions = face === 'front' ? FRONT_MUSCLES : BACK_MUSCLES
  return (
    <svg
      aria-hidden={active ? undefined : true}
      aria-label={face === 'front' ? '正面肌肉轮廓' : '背面肌肉轮廓'}
      className={`muscle-outline__figure muscle-outline__figure--${face}`}
      role="group"
      viewBox={face === 'front' ? '0 0 35 93' : '37 0 35 93'}
    >
      {regions.map((region) => (
        <OutlineRegion
          allow={allow}
          frozen={!active}
          key={region.id}
          region={region}
          roles={roles}
          selectedEntityId={selectedEntityId}
          target={active && region.id === activeCallout?.targetRegionId}
          onEntitySelect={onEntitySelect}
        />
      ))}
    </svg>
  )
}

function Callout({
  callout,
  placement,
  travel,
  onSelect,
}: {
  callout: OutlineCallout
  placement: LabelPlacement | null
  travel: boolean
  onSelect: (entityId: string) => void
}) {
  return (
    <button
      aria-label={callout.nameZh}
      aria-pressed
      className="muscle-callout"
      data-callout-label={callout.muscleId}
      data-side={callout.side}
      data-travel={travel ? 'true' : 'false'}
      style={{
        left: placement?.left ?? 0,
        top: placement?.top ?? 0,
      }}
      type="button"
      onClick={() => onSelect(callout.muscleId)}
    >
      <strong key={callout.muscleId}>{callout.nameZh}</strong>
    </button>
  )
}

function drawnBodyRect(figure: Element) {
  const bounds = figure.getBoundingClientRect()
  const style = getComputedStyle(figure)
  const padLeft = Number.parseFloat(style.paddingLeft) || 0
  const padRight = Number.parseFloat(style.paddingRight) || 0
  const padTop = Number.parseFloat(style.paddingTop) || 0
  const padBottom = Number.parseFloat(style.paddingBottom) || 0
  const width = bounds.width - padLeft - padRight
  const height = bounds.height - padTop - padBottom
  const left = bounds.left + padLeft
  const top = bounds.top + padTop
  const viewAspect = 35 / 93
  if (width / height > viewAspect) {
    const drawnWidth = height * viewAspect
    const drawnLeft = left + (width - drawnWidth) / 2
    return { left: drawnLeft, right: drawnLeft + drawnWidth }
  }
  return { left, right: left + width, top, bottom: top + height }
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

function moveEase(progress: number) {
  return cubicBezier(0.22, 1, 0.36, 1, progress)
}

function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  progress: number,
) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sampleX = (time: number) => ((ax * time + bx) * time + cx) * time
  const sampleY = (time: number) => ((ay * time + by) * time + cy) * time
  const slopeX = (time: number) => (3 * ax * time + 2 * bx) * time + cx
  let time = progress
  for (let step = 0; step < 6; step += 1) {
    const error = sampleX(time) - progress
    const slope = slopeX(time)
    if (Math.abs(error) < 1e-4 || Math.abs(slope) < 1e-4) break
    time = Math.min(1, Math.max(0, time - error / slope))
  }
  return sampleY(time)
}

function leaderPoints(leader: LeaderLine) {
  const direction = leader.x2 >= leader.x1 ? 1 : -1
  const stub = direction * Math.min(14, Math.abs(leader.x2 - leader.x1) * 0.28)
  const elbowX = leader.x1 + stub
  return `${leader.x1},${leader.y1} ${elbowX},${leader.y1} ${leader.x2},${leader.y2}`
}

function sameLeaders(current: LeaderLine[], next: LeaderLine[]) {
  if (current.length !== next.length) return false
  return current.every(
    (line, index) =>
      line.id === next[index]?.id &&
      line.x1 === next[index].x1 &&
      line.y1 === next[index].y1 &&
      line.x2 === next[index].x2 &&
      line.y2 === next[index].y2,
  )
}

function OutlineRegion({
  region,
  allow,
  roles,
  selectedEntityId,
  target,
  frozen = false,
  onEntitySelect,
}: {
  region: MuscleDef
  allow: Set<string> | null
  roles: Map<string, MuscleRole>
  selectedEntityId?: string
  target: boolean
  frozen?: boolean
  onEntitySelect: (entityId: string) => void
}) {
  const owners = muscleIdsForOutline(region.id)
  const interactiveId = muscleIdForOutline(region.id)
  const included =
    !frozen &&
    interactiveId !== null &&
    (allow === null || allow.has(interactiveId))
  const selected = Boolean(
    selectedEntityId && owners.includes(selectedEntityId),
  )
  const role = strongestRole(owners, roles)
  const faded = allow !== null && interactiveId !== null && !included
  const emphasizing = Boolean(selectedEntityId) || roles.size > 0
  const quiet =
    emphasizing && !selected && role === undefined && interactiveId !== null
  const fill = selected
    ? '#f04438'
    : role
      ? roleColors[role]
      : quiet
        ? '#eadfd9'
        : interactiveId
          ? '#c96a63'
          : '#d9d3c7'

  function select() {
    if (interactiveId && included) onEntitySelect(interactiveId)
  }

  return (
    <path
      aria-label={
        interactiveId ? (names.get(interactiveId) ?? region.name) : undefined
      }
      aria-pressed={interactiveId ? selected : undefined}
      d={region.path}
      data-callout-target={target ? region.id : undefined}
      data-highlight-role={role}
      fill={fill}
      role={interactiveId && included ? 'button' : undefined}
      stroke={fill}
      style={{ fill, stroke: fill }}
      strokeWidth={0.04}
      tabIndex={interactiveId && included ? 0 : undefined}
      onClick={select}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          select()
        }
      }}
      opacity={faded ? 0.2 : interactiveId ? 0.96 : 0.72}
    />
  )
}

function strongestRole(
  owners: readonly string[],
  roles: Map<string, MuscleRole>,
) {
  let winner: MuscleRole | undefined
  for (const owner of owners) {
    const role = roles.get(owner)
    if (!role) continue
    if (!winner || roleRank[role] > roleRank[winner]) winner = role
  }
  return winner
}
