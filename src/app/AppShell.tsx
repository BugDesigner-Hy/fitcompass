import { BodyMap } from '../features/body-map/BodyMap'
import { DetailsPanel } from '../features/details/DetailsPanel'
import { ExplorerSearch } from '../features/explorer/ExplorerSearch'
import { useExplorerState } from '../features/explorer/explorerState'

export function AppShell() {
  const {
    mode,
    view,
    selection,
    highlightedMuscles,
    setMode,
    setView,
    select,
  } = useExplorerState()
  const selectedEntityId =
    selection?.type === (mode === 'muscles' ? 'muscle' : 'bone')
      ? selection.id
      : undefined

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-lockup">
          <a className="brand" href="/" aria-label="健身指北首页">
            <span className="brand-mark" aria-hidden="true">
              北
            </span>
            <span className="brand-copy">
              <strong>健身指北</strong>
              <small>FitCompass</small>
            </span>
          </a>
          <p className="brand-subtitle">肌肉、关节与训练动作图谱</p>
        </div>

        <ExplorerSearch onSelect={select} />

        <fieldset className="mode-control">
          <legend className="sr-only">解剖浏览模式</legend>
          <label>
            <input
              checked={mode === 'muscles'}
              name="mode"
              onChange={() => setMode('muscles')}
              type="radio"
              value="muscles"
            />
            <span>肌肉</span>
          </label>
          <label>
            <input
              checked={mode === 'bones'}
              name="mode"
              onChange={() => setMode('bones')}
              type="radio"
              value="bones"
            />
            <span>骨骼</span>
          </label>
        </fieldset>
      </header>

      <main className="anatomy-layout" aria-label="人体解剖浏览器">
        <section className="body-map" aria-labelledby="body-map-title">
          <header className="body-map__heading">
            <p className="eyebrow">交互式人体图谱</p>
            <h1 id="body-map-title">探索身体结构</h1>
          </header>
          <BodyMap
            highlightedMuscles={highlightedMuscles}
            mode={mode}
            onEntitySelect={(id) =>
              select({ type: mode === 'muscles' ? 'muscle' : 'bone', id })
            }
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
