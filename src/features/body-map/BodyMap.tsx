import type { KeyboardEvent } from 'react'
import { bones } from '../../data/bones'
import { muscles } from '../../data/muscles'
import { FigureBackdrop, getRegions } from './bodyMapGeometry'
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

export function BodyMap({
  mode,
  view,
  selectedEntityId,
  highlightedMuscles = [],
  onViewChange,
  onEntitySelect,
}: BodyMapProps) {
  const entities = mode === 'muscles' ? muscles : bones
  const namesById = new Map(entities.map(({ id, nameZh }) => [id, nameZh]))
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

  return (
    <div className="body-map__explorer">
      <div className="body-map__toolbar">
        <div className="body-map__view-control" aria-label="人体视图">
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
          aria-labelledby="body-map-svg-title body-map-svg-description"
          className={`body-map__svg body-map__svg--${mode}`}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 320 710"
        >
          <title id="body-map-svg-title">
            {view === 'front' ? '正面' : '背面'}
            {mode === 'muscles' ? '肌肉' : '骨骼'}示意图
          </title>
          <desc id="body-map-svg-description">
            使用键盘 Tab 聚焦结构，并按 Enter 或空格键选择。
          </desc>
          <FigureBackdrop view={view} />
          {getRegions(mode, view).map(({ id, shape }) => {
            const role = rolesByMuscleId.get(id)
            const selected = selectedEntityId === id
            const classes = [
              'body-map__entity',
              `body-map__entity--${mode}`,
              selected && 'body-map__entity--selected',
              role && `body-map__entity--${role}`,
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
                onClick={() => onEntitySelect(id)}
                onKeyDown={(event) => selectWithKeyboard(event, id)}
                role="button"
                tabIndex={0}
              >
                {shape}
              </g>
            )
          })}
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
