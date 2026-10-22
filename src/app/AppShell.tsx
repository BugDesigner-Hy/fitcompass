import { Link } from 'react-router-dom'
import { BodyMap } from '../features/body-map/BodyMap'
import { DetailsPanel } from '../features/details/DetailsPanel'
import { useExplorerState } from '../features/explorer/explorerState'

export function AppShell() {
  const { view, selection, highlightedMuscles, setView, select } =
    useExplorerState()
  const selectedEntityId =
    selection?.type === 'muscle' ? selection.id : undefined

  return (
    <div className="app-shell">
      <main className="anatomy-layout" aria-label="人体解剖浏览器">
        <section className="body-map" aria-labelledby="body-map-title">
          <header className="body-map__heading">
            <div className="brand-lockup">
              <Link className="brand" to="/" aria-label="健身指北首页">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <g fill="currentColor" transform="rotate(-16 16 16)">
                      <rect height="16" rx="3" width="6.2" x="2" y="8" />
                      <rect height="11" rx="1.5" width="2.6" x="8.4" y="10.5" />
                      <rect
                        height="4.2"
                        rx="2"
                        width="10.4"
                        x="10.8"
                        y="13.9"
                      />
                      <rect height="11" rx="1.5" width="2.6" x="21" y="10.5" />
                      <rect height="16" rx="3" width="6.2" x="23.8" y="8" />
                    </g>
                  </svg>
                </span>
                <span className="brand-copy">
                  <strong>健身指北</strong>
                  <small>FitCompass</small>
                </span>
              </Link>
              <p className="brand-subtitle">肌肉、关节与训练动作图谱</p>
            </div>
            <div className="body-map__title">
              <p className="eyebrow">交互式人体图谱</p>
              <h1 id="body-map-title">探索身体结构</h1>
            </div>
          </header>
          <BodyMap
            highlightedMuscles={highlightedMuscles}
            onEntitySelect={(id) => select({ type: 'muscle', id })}
            onViewChange={setView}
            selectedEntityId={selectedEntityId}
            view={view}
          />
        </section>

        <DetailsPanel onSelect={select} selection={selection} />
      </main>
    </div>
  )
}
