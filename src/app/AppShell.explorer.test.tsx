import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

function RouterInspector() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <output aria-label="当前地址">{location.search}</output>
      <button onClick={() => navigate(-1)} type="button">
        历史后退
      </button>
      <button onClick={() => navigate(1)} type="button">
        历史向前
      </button>
    </>
  )
}

function renderExplorer(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppShell />
      <RouterInspector />
    </MemoryRouter>,
  )
}

describe('AppShell explorer URL state', () => {
  it('restores a valid muscle selection and view from the URL', () => {
    renderExplorer('/?view=back&type=muscle&id=latissimus-dorsi')

    expect(
      screen.queryByRole('radio', { name: '骨骼' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '背面' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('heading', { name: '背阔肌', level: 2 }),
    ).toBeInTheDocument()
  })

  it('falls back to the welcome state for an invalid type or ID', () => {
    renderExplorer('/?mode=wrong&view=side&type=muscle&id=not-real')

    expect(
      screen.getByRole('heading', { name: '开始探索', level: 2 }),
    ).toBeInTheDocument()
  })

  it('pushes selections so back and forward restore details and highlighting', async () => {
    const user = userEvent.setup()
    renderExplorer()

    const pectoralis = within(
      screen.getByRole('group', { name: '正面肌肉轮廓' }),
    ).getAllByRole('button', { name: '胸大肌' })[0]
    pectoralis.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('status', { name: '当前地址' })).toHaveTextContent(
      'type=muscle',
    )
    await user.click(screen.getByRole('button', { name: '肩屈' }))
    expect(screen.getByRole('status', { name: '当前地址' })).toHaveTextContent(
      'type=joint-action',
    )

    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
    expect(
      document.querySelector(
        '[aria-label="三角肌前束"][data-highlight-role="agonist"]',
      ),
    ).toBeTruthy()

    await user.click(screen.getByRole('button', { name: '历史后退' }))
    expect(
      screen.getByRole('heading', { name: '胸大肌', level: 2 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '历史向前' }))
    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
  })

  it('restores view, selection, details, and highlights across history', async () => {
    const user = userEvent.setup()
    renderExplorer('/?view=back')
    const address = screen.getByRole('status', { name: '当前地址' })

    await user.click(screen.getByRole('button', { name: '肩屈' }))
    expect(address).toHaveTextContent('mode=muscles')
    expect(address).toHaveTextContent('view=front')
    expect(address).toHaveTextContent('type=joint-action')
    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
    expect(
      document.querySelectorAll('[data-highlight-role]').length,
    ).toBeGreaterThan(1)

    await user.click(screen.getByRole('button', { name: '历史后退' }))
    expect(screen.getByRole('button', { name: '背面' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('heading', { name: '开始探索', level: 2 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '历史向前' }))
    expect(screen.getByRole('button', { name: '正面' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
    expect(
      document.querySelectorAll('[data-highlight-role]').length,
    ).toBeGreaterThan(1)
  })
})

describe('AppShell details and relationship highlighting', () => {
  it('navigates from a muscle to related actions and exercises', async () => {
    const user = userEvent.setup()
    renderExplorer('/?type=muscle&id=pectoralis-major')

    await user.click(screen.getByRole('button', { name: '肩屈' }))
    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
    expect(
      within(screen.getByRole('region', { name: '解剖详情' })).queryByRole(
        'button',
        { name: '返回' },
      ),
    ).not.toBeInTheDocument()

    const detail = screen.getByRole('region', { name: '解剖详情' })
    await user.click(within(detail).getByRole('button', { name: '胸大肌' }))
    await user.click(within(detail).getByRole('button', { name: '杠铃卧推' }))
    expect(
      screen.getByRole('heading', { name: '杠铃卧推', level: 2 }),
    ).toBeInTheDocument()
  })

  it('returns from an opened exercise to the muscle it came from', async () => {
    const user = userEvent.setup()
    renderExplorer('/?type=muscle&id=pectoralis-major')

    const detail = screen.getByRole('region', { name: '解剖详情' })
    expect(
      within(detail).queryByRole('button', { name: '返回' }),
    ).not.toBeInTheDocument()

    await user.click(within(detail).getByRole('button', { name: '杠铃卧推' }))
    expect(
      screen.getByRole('heading', { name: '杠铃卧推', level: 2 }),
    ).toBeInTheDocument()

    await user.click(within(detail).getByRole('button', { name: '返回' }))
    expect(
      screen.getByRole('heading', { name: '胸大肌', level: 2 }),
    ).toBeInTheDocument()
    expect(
      within(detail).queryByRole('button', { name: '返回' }),
    ).not.toBeInTheDocument()
  })

  it.each([
    ['shoulder-flexion', '肩屈'],
    ['elbow-extension', '伸肘'],
  ])(
    '%s presents and highlights multiple role-labelled muscles',
    (id, name) => {
      renderExplorer(`/?type=joint-action&id=${id}`)

      const detail = screen.getByRole('region', { name: '解剖详情' })
      expect(
        within(detail).getByRole('heading', { name, level: 2 }),
      ).toBeInTheDocument()
      expect(
        within(detail).getAllByText(/主动肌|协同肌|稳定肌|拮抗肌/).length,
      ).toBeGreaterThan(1)
      expect(
        document.querySelectorAll('[data-highlight-role]').length,
      ).toBeGreaterThan(1)
    },
  )

  it('shows ordered steps expanded by default and every target muscle', async () => {
    const user = userEvent.setup()
    renderExplorer('/?type=exercise&id=barbell-bench-press')

    const detail = screen.getByRole('region', { name: '解剖详情' })
    const steps = within(detail).getByRole('list', { name: '动作步骤' })
    expect(steps.tagName).toBe('OL')
    expect(within(steps).getAllByRole('listitem')).toHaveLength(2)
    expect(
      within(detail).getByRole('button', { name: '收起动作步骤' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(detail).toHaveAttribute('data-drawer-state', 'collapsed')
    const toggle = within(detail).getByRole('button', { name: '收起动作步骤' })
    await user.click(toggle)
    expect(
      within(detail).queryByRole('list', { name: '动作步骤' }),
    ).not.toBeInTheDocument()
    expect(
      within(detail).getByRole('button', { name: '胸大肌' }),
    ).toBeInTheDocument()
    expect(
      within(detail).getByRole('button', { name: '三角肌前束' }),
    ).toBeInTheDocument()
    expect(
      within(detail).getByRole('button', { name: '肱三头肌' }),
    ).toBeInTheDocument()
    expect(
      within(detail).getByRole('button', { name: '前锯肌' }),
    ).toBeInTheDocument()
  })

  it('ignores a bone address and stays on the muscle explorer', () => {
    renderExplorer('/?type=bone&id=humerus')

    expect(
      screen.queryByRole('heading', { name: '肱骨', level: 2 }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '开始探索', level: 2 }),
    ).toBeInTheDocument()
  })

  it('starts the mobile drawer collapsed and provides an explicit detail control', async () => {
    const user = userEvent.setup()
    renderExplorer()
    const panel = screen.getByRole('region', { name: '解剖详情' })

    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    const toggle = screen.getByRole('button', { name: '查看详情' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    await user.click(toggle)
    expect(panel).toHaveAttribute('data-drawer-state', 'half')
    await user.click(screen.getByRole('button', { name: '全屏显示详情' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'expanded')
    expect(
      screen.getByRole('button', { name: '收起详情面板' }),
    ).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: '收起详情面板' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    expect(screen.getByRole('button', { name: '查看详情' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })

  it('collapses the half and full drawers when the page outside is clicked', async () => {
    const user = userEvent.setup()
    renderExplorer('/?type=muscle&id=pectoralis-major')
    const panel = screen.getByRole('region', { name: '解剖详情' })
    const rectus = within(
      screen.getByRole('group', { name: '正面肌肉轮廓' }),
    ).getAllByRole('button', { name: '腹直肌' })[0]

    await user.click(screen.getByRole('button', { name: '查看详情' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'half')
    await user.click(within(panel).getByRole('button', { name: '肩屈' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'half')

    await user.click(rectus)
    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    expect(
      within(panel).getByRole('heading', { name: '腹直肌', level: 2 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '查看详情' }))
    await user.click(screen.getByRole('button', { name: '全屏显示详情' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'expanded')
    await user.click(screen.getByRole('button', { name: '背面' }))
    expect(screen.getByRole('button', { name: '背面' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(panel).toHaveAttribute('data-drawer-state', 'expanded')
    await user.click(screen.getByRole('heading', { name: '探索身体结构' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    expect(screen.getByRole('button', { name: '查看详情' })).toBeInTheDocument()
  })

  it('keeps the mobile drawer collapsed when an entity is selected', () => {
    renderExplorer('/?type=muscle&id=pectoralis-major')

    expect(screen.getByRole('region', { name: '解剖详情' })).toHaveAttribute(
      'data-drawer-state',
      'collapsed',
    )
    expect(screen.getByRole('button', { name: '查看详情' })).toBeInTheDocument()
  })

  it('keeps the body map operable while the mobile drawer is collapsed', async () => {
    const user = userEvent.setup()
    renderExplorer()
    const panel = screen.getByRole('region', { name: '解剖详情' })
    const pectoralis = within(
      screen.getByRole('group', { name: '正面肌肉轮廓' }),
    ).getAllByRole('button', { name: '胸大肌' })[0]

    expect(panel).toHaveAttribute('data-mobile-default', 'collapsed')
    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    pectoralis.focus()
    await user.keyboard('{Enter}')

    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    expect(
      within(panel).getByRole('heading', { name: '胸大肌', level: 2 }),
    ).toBeInTheDocument()
  })

  it('retains the desktop sticky-panel layout contract', () => {
    renderExplorer()

    expect(screen.getByRole('region', { name: '解剖详情' })).toHaveClass(
      'details-panel--desktop-sticky',
    )
  })
})
