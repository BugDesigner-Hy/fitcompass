import { useId, type KeyboardEvent, type MouseEvent } from 'react'
import { bones } from '../../data/bones'
import { muscles } from '../../data/muscles'
import {
  BODY_MAP_VIEWBOX_HEIGHT,
  BODY_MAP_VIEWBOX_WIDTH,
  FigureBackdrop,
  getEntityAnchors,
  getRegions,
  muscleLabelLayouts,
} from './bodyMapGeometry'
import './BodyMap.css'

export type BodyMapMode = 'muscles' | 'bones'
export type BodyView = 'front' | 'back'

type MuscleRole = 'agonist' | 'synergist' | 'stabilizer' | 'antagonist'

export interface BodyMapProps {
  mode: BodyMapMode
  view: BodyView
  selectedEntityId?: string
  highlightedMuscles?: ReadonlyArray<{
    muscleId: string
    role: MuscleRole
  }>
  onViewChange: (view: BodyView) => void
  onEntitySelect: (entityId: string) => void
}

const roleLabels: Record<MuscleRole, string> = {
  agonist: '主动肌',
  synergist: '协同肌',
  stabilizer: '稳定肌',
  antagonist: '拮抗肌',
}

const POINTER_HIT_RADIUS_PX = 22

const muscleToneByRegion = {
  chest: 'coral',
  back: 'teal',
  shoulders: 'amber',
  arms: 'rose',
  core: 'aqua',
  hips: 'blue',
  thighs: 'sand',
  'lower-legs': 'violet',
  trunk: 'aqua',
} as const

export function BodyMap({
  mode,
  view,
  selectedEntityId,
  highlightedMuscles = [],
  onViewChange,
  onEntitySelect,
}: BodyMapProps) {
  const instanceId = useId()
  const titleId = `${instanceId}-body-map-title`
  const descriptionId = `${instanceId}-body-map-description`
  const entities = mode === 'muscles' ? muscles : bones
  const regions = getRegions(mode, view)
  const namesById = new Map(entities.map(({ id, nameZh }) => [id, nameZh]))
  const tonesById = new Map(
    muscles.map(({ id, bodyRegion }) => [id, muscleToneByRegion[bodyRegion]]),
  )
  const rolesByMuscleId = new Map(
    highlightedMuscles.map(({ muscleId, role }) => [muscleId, role]),
  )

  const selectWithKeyboard = (
    event: KeyboardEvent<SVGGElement>,
    entityId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onEntitySelect(entityId)
    }
  }

  const selectWithAssistiveActivation = (
    event: MouseEvent<SVGGElement>,
    entityId: string,
  ) => {
    if (event.detail === 0) {
      event.stopPropagation()
      onEntitySelect(entityId)
    }
  }

  const selectNearestEntity = (event: MouseEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const scale = Math.min(
      bounds.width / BODY_MAP_VIEWBOX_WIDTH,
      bounds.height / BODY_MAP_VIEWBOX_HEIGHT,
    )
    if (scale <= 0) return

    const offsetX =
      bounds.left + (bounds.width - BODY_MAP_VIEWBOX_WIDTH * scale) / 2
    const offsetY =
      bounds.top + (bounds.height - BODY_MAP_VIEWBOX_HEIGHT * scale) / 2
    let nearestEntityId: string | undefined
    let nearestDistanceSquared = Number.POSITIVE_INFINITY

    regions.forEach(({ id }) => {
      getEntityAnchors(id).forEach(([x, y]) => {
        const deltaX = event.clientX - (offsetX + x * scale)
        const deltaY = event.clientY - (offsetY + y * scale)
        const distanceSquared = deltaX * deltaX + deltaY * deltaY
        if (distanceSquared < nearestDistanceSquared) {
          nearestDistanceSquared = distanceSquared
          nearestEntityId = id
        }
      })
    })

    if (
      nearestEntityId &&
      nearestDistanceSquared <= POINTER_HIT_RADIUS_PX ** 2
    ) {
      onEntitySelect(nearestEntityId)
    }
  }

  return (
    <div className="body-map__explorer">
      <div className="body-map__toolbar">
        <div
          className="body-map__view-control"
          aria-label="人体视图"
          role="group"
        >
          {(
            [
              ['front', '正面'],
              ['back', '背面'],
            ] as const
          ).map(([value, label]) => (
            <button
              aria-pressed={view === value}
              key={value}
              onClick={() => onViewChange(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="body-map__caption">
          示意性人体结构，仅用于训练教育定位，不作为诊断依据。
        </p>
      </div>

      <div className="body-map__canvas">
        <svg
          aria-labelledby={`${titleId} ${descriptionId}`}
          className={`body-map__svg body-map__svg--${mode}`}
          data-visual-style="medical-line-art"
          onClick={selectNearestEntity}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 320 710"
        >
          <title id={titleId}>
            {view === 'front' ? '正面' : '背面'}
            {mode === 'muscles' ? '肌肉' : '骨骼'}示意图
          </title>
          <desc id={descriptionId}>
            使用键盘 Tab 聚焦结构，并按 Enter 或空格键选择。
          </desc>
          <rect
            aria-hidden="true"
            className="body-map__interaction-surface"
            height={BODY_MAP_VIEWBOX_HEIGHT}
            width={BODY_MAP_VIEWBOX_WIDTH}
          />
          <FigureBackdrop view={view} />
          <g className="body-map__entity-layer">
            {regions.map(({ id, shape }) => {
              const role = rolesByMuscleId.get(id)
              const selected = selectedEntityId === id
              const classes = [
                'body-map__entity',
                `body-map__entity--${mode}`,
                mode === 'muscles' &&
                  `body-map__entity--tone-${tonesById.get(id)}`,
                selected && 'body-map__entity--selected',
                role && `body-map__entity--${role} role--${role}`,
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <g
                  aria-label={namesById.get(id)}
                  aria-pressed={selected}
                  className={classes}
                  data-entity-id={id}
                  data-highlight-role={role}
                  key={id}
                  onClick={(event) => selectWithAssistiveActivation(event, id)}
                  onKeyDown={(event) => selectWithKeyboard(event, id)}
                  role="button"
                  tabIndex={0}
                >
                  {shape}
                </g>
              )
            })}
          </g>
          {mode === 'muscles' && (
            <g
              aria-hidden="true"
              className="body-map__labels"
              data-label-content="muscle-names-only"
            >
              {regions.map(({ id }) => {
                const layout = muscleLabelLayouts[id]
                const name = namesById.get(id)
                if (!layout || !name) return null
                const selected = selectedEntityId === id
                const labelEdgeX =
                  layout.align === 'start'
                    ? layout.x + 4
                    : layout.align === 'end'
                      ? layout.x - 4
                      : layout.x

                return (
                  <g
                    className={[
                      'body-map__label',
                      `body-map__label--${layout.placement}`,
                      `body-map__label--${layout.priority}`,
                    ].join(' ')}
                    data-selected={selected}
                    key={`label-${id}`}
                  >
                    {layout.placement === 'callout' && (
                      <path
                        d={`M ${layout.targetX} ${layout.targetY} L ${labelEdgeX} ${layout.y - 3}`}
                      />
                    )}
                    <text textAnchor={layout.align} x={layout.x} y={layout.y}>
                      {name}
                    </text>
                  </g>
                )
              })}
            </g>
          )}
        </svg>
      </div>

      {mode === 'muscles' && (
        <div className="body-map__legend" aria-label="肌肉状态图例">
          <span className="body-map__legend-item body-map__legend-item--default">
            <i aria-hidden="true" />
            肌肉
          </span>
          {(Object.entries(roleLabels) as [MuscleRole, string][]).map(
            ([role, label]) => (
              <span
                className={`body-map__legend-item body-map__legend-item--${role}`}
                key={role}
              >
                <i aria-hidden="true" />
                {label}
              </span>
            ),
          )}
        </div>
      )}
      {mode === 'bones' && (
        <div className="body-map__legend" aria-label="骨骼状态图例">
          <span className="body-map__legend-item body-map__legend-item--bone">
            <i aria-hidden="true" />
            骨骼
          </span>
        </div>
      )}
    </div>
  )
}
