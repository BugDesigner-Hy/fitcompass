import { useId } from 'react'
import { MuscleOutline } from './MuscleOutline'
import './BodyMap.css'

export type BodyMapMode = 'muscles' | 'bones'
export type BodyView = 'front' | 'back'

type MuscleRole = 'agonist' | 'synergist' | 'stabilizer' | 'antagonist'

export interface BodyMapProps {
  view: BodyView
  selectedEntityId?: string
  highlightedMuscles?: ReadonlyArray<{
    muscleId: string
    role: MuscleRole
  }>
  onViewChange: (view: BodyView) => void
  onEntitySelect: (entityId: string) => void
  onMuscleSelect?: (entityId: string) => void
}

const roleLabels: Record<MuscleRole, string> = {
  agonist: '主动肌',
  synergist: '协同肌',
  stabilizer: '稳定肌',
  antagonist: '拮抗肌',
}

export function BodyMap({
  view,
  selectedEntityId,
  highlightedMuscles = [],
  onViewChange,
  onEntitySelect,
  onMuscleSelect,
}: BodyMapProps) {
  const titleId = useId()

  return (
    <div className="body-map__explorer">
      <div className="body-map__toolbar">
        <div className="body-map__controls">
          <div className="body-map__switchers">
            <div
              aria-label="人体视图"
              className="body-map__view-control"
              role="group"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <span
                aria-hidden="true"
                className="body-map__view-thumb"
                data-active={view === 'back' ? '1' : '0'}
              />
              {(
                [
                  ['front', '正面'],
                  ['back', '背面'],
                ] as const
              ).map(([nextView, label]) => (
                <button
                  aria-pressed={view === nextView}
                  key={nextView}
                  onClick={() => onViewChange(nextView)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-describedby={titleId}
        aria-label="可点击的平面肌肉轮廓"
        className="body-map__viewport"
        role="region"
      >
        <p className="sr-only" id={titleId}>
          {view === 'front' ? '正面' : '背面'}肌肉图
        </p>
        <MuscleOutline
          highlightedMuscles={highlightedMuscles}
          onEntitySelect={onMuscleSelect ?? onEntitySelect}
          selectedEntityId={selectedEntityId}
          view={view}
          visibleMuscleIds={null}
        />
      </div>

      {highlightedMuscles.length > 0 ? (
        <div className="body-map__legend" aria-label="肌肉角色图例">
          {Object.entries(roleLabels).map(([role, label]) => (
            <span
              className={`body-map__legend-item body-map__legend-item--${role}`}
              key={role}
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
