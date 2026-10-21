import { useState } from 'react'
import type { ExplorerSelection } from '../explorer/explorerState'
import { DetailsView } from './DetailsViews'

type DrawerState = 'collapsed' | 'half' | 'expanded'

export function DetailsPanel({
  selection,
  onSelect,
}: {
  selection?: ExplorerSelection
  onSelect: (selection: ExplorerSelection) => void
}) {
  const [drawerState, setDrawerState] = useState<DrawerState>('half')

  return (
    <section
      aria-label="解剖详情"
      className="details-panel"
      data-drawer-state={drawerState}
    >
      <div
        className="details-panel__drawer-controls"
        role="group"
        aria-label="详情面板大小"
      >
        <button
          aria-label="折叠详情面板"
          aria-pressed={drawerState === 'collapsed'}
          onClick={() => setDrawerState('collapsed')}
          type="button"
        >
          收起
        </button>
        <button
          aria-label="半屏显示详情"
          aria-pressed={drawerState === 'half'}
          onClick={() => setDrawerState('half')}
          type="button"
        >
          半屏
        </button>
        <button
          aria-label="展开详情面板"
          aria-pressed={drawerState === 'expanded'}
          onClick={() => setDrawerState('expanded')}
          type="button"
        >
          展开
        </button>
      </div>
      <div className="details-panel__scroll">
        <DetailsView onSelect={onSelect} selection={selection} />
      </div>
    </section>
  )
}
