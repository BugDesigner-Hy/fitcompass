import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import type { ExplorerSelection } from '../explorer/explorerState'
import { planPlaceFrom } from '../plans/planPlace'
import { DetailsView } from './DetailsViews'

function useCanGoBack() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const indexRef = useRef(0)
  const seenKey = useRef<string | null>(null)

  if (seenKey.current !== location.key) {
    if (seenKey.current !== null) {
      if (navigationType === 'PUSH') indexRef.current += 1
      else if (navigationType === 'POP') {
        indexRef.current = Math.max(0, indexRef.current - 1)
      }
    }
    seenKey.current = location.key
  }

  const historyIndex = window.history.state?.idx
  if (typeof historyIndex === 'number') return historyIndex > 0
  return indexRef.current > 0
}

type DrawerState = 'collapsed' | 'half' | 'expanded'

const drawerControl: Record<
  DrawerState,
  { label: string; name: string; next: DrawerState }
> = {
  collapsed: { label: '查看详情', name: '查看详情', next: 'half' },
  half: { label: '全屏', name: '全屏显示详情', next: 'expanded' },
  expanded: { label: '收起', name: '收起详情面板', next: 'collapsed' },
}

function openedFromPlan(state: unknown) {
  return Boolean(
    state &&
    typeof state === 'object' &&
    'fromPlan' in state &&
    (state as { fromPlan?: boolean }).fromPlan,
  )
}

export function DetailsPanel({
  selection,
  onSelect,
}: {
  selection?: ExplorerSelection
  onSelect: (selection: ExplorerSelection) => void
}) {
  const canGoBack = useCanGoBack()
  const location = useLocation()
  const fromPlan = openedFromPlan(location.state)
  const navigate = useNavigate()
  const panelRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [drawerState, setDrawerState] = useState<DrawerState>(
    fromPlan && selection?.type === 'exercise' ? 'expanded' : 'collapsed',
  )
  const control = drawerControl[drawerState]

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [selection?.type, selection?.id])

  useEffect(() => {
    if (drawerState === 'collapsed') return

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (panelRef.current?.contains(target)) return
      setDrawerState('collapsed')
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [drawerState])

  return (
    <section
      aria-label="解剖详情"
      className="details-panel details-panel--desktop-sticky"
      data-drawer-state={drawerState}
      data-mobile-default="collapsed"
      ref={panelRef}
    >
      <div className="details-panel__drawer-controls">
        <button
          aria-expanded={drawerState === 'expanded'}
          aria-label={control.name}
          onClick={() => setDrawerState(control.next)}
          type="button"
        >
          <span aria-hidden="true" className="drawer-chevron" />
          {control.label}
        </button>
      </div>
      <div className="details-panel__scroll" ref={scrollRef}>
        {selection?.type === 'exercise' && (canGoBack || fromPlan) ? (
          <button
            className="detail-back"
            onClick={() => {
              if (fromPlan) {
                navigate('/plans', {
                  state: { planPlace: planPlaceFrom(location.state) },
                })
                return
              }
              navigate(-1)
            }}
            type="button"
          >
            返回
          </button>
        ) : null}
        <div
          className="detail-stage"
          key={selection ? `${selection.type}:${selection.id}` : 'welcome'}
        >
          <DetailsView onSelect={onSelect} selection={selection} />
        </div>
      </div>
    </section>
  )
}
