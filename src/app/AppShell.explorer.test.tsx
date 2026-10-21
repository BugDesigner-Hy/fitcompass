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
        返回
      </button>
      <button onClick={() => navigate(1)} type="button">
        前进
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
  it('restores a valid selection, mode, and view from the URL', () => {
    renderExplorer('/?mode=bones&view=back&type=bone&id=scapula')

    expect(screen.getByRole('radio', { name: '骨骼' })).toBeChecked()
    expect(screen.getByRole('button', { name: '背面' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(
      screen.getByRole('heading', { name: '肩胛骨', level: 2 }),
    ).toBeInTheDocument()
  })

  it('falls back to the welcome state for an invalid type or ID', () => {
    renderExplorer('/?mode=wrong&view=side&type=muscle&id=not-real')

    expect(screen.getByRole('radio', { name: '肌肉' })).toBeChecked()
    expect(
      screen.getByRole('heading', { name: '开始探索', level: 2 }),
    ).toBeInTheDocument()
  })

  it('pushes selections so back and forward restore details and highlighting', async () => {
    const user = userEvent.setup()
    renderExplorer()

    screen.getByRole('button', { name: '胸大肌' }).focus()
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
      document.querySelector('[data-entity-id="anterior-deltoid"]'),
    ).toHaveClass('body-map__entity--agonist')

    await user.click(screen.getByRole('button', { name: '返回' }))
    expect(
      screen.getByRole('heading', { name: '胸大肌', level: 2 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '前进' }))
    expect(
      screen.getByRole('heading', { name: '肩屈', level: 2 }),
    ).toBeInTheDocument()
  })
})

describe('AppShell local search', () => {
  it.each([
    ['胸大肌', '肌肉'],
    ['Scapula', '骨骼'],
    ['shoulder-flexion', '关节动作'],
    ['杠铃卧推', '训练动作'],
  ])('searches %s across the four entity types', async (query, typeLabel) => {
    const user = userEvent.setup()
    renderExplorer()

    await user.type(
      screen.getByRole('combobox', {
        name: '搜索肌肉、骨骼、关节动作或训练动作',
      }),
      query,
    )

    expect(
      within(screen.getByRole('listbox')).getByRole('option', {
        name: new RegExp(typeLabel),
      }),
    ).toBeInTheDocument()
  })

  it('supports keyboard selection, filters, clear, Escape, and no results', async () => {
    const user = userEvent.setup()
    renderExplorer()
    const search = screen.getByRole('combobox', {
      name: '搜索肌肉、骨骼、关节动作或训练动作',
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: '实体类型筛选' }),
      'exercise',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: '器械筛选' }),
      'barbell',
    )
    await user.type(search, 'press')
    expect(
      within(screen.getByRole('listbox')).getAllByRole('option').length,
    ).toBeGreaterThan(1)
    expect(
      within(screen.getByRole('listbox')).queryByRole('option', {
        name: /哑铃/,
      }),
    ).not.toBeInTheDocument()

    await user.keyboard('{ArrowDown}{Enter}')
    expect(
      screen.getByRole('heading', { name: '杠铃卧推', level: 2 }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '清除搜索' }))
    expect(search).toHaveValue('')

    await user.type(search, '绝对不存在')
    expect(screen.getByText('没有找到匹配结果')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
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

    const detail = screen.getByRole('region', { name: '解剖详情' })
    await user.click(within(detail).getByRole('button', { name: '胸大肌' }))
    await user.click(within(detail).getByRole('button', { name: '杠铃卧推' }))
    expect(
      screen.getByRole('heading', { name: '杠铃卧推', level: 2 }),
    ).toBeInTheDocument()
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

  it('shows collapsed ordered steps and every target muscle', async () => {
    const user = userEvent.setup()
    renderExplorer('/?type=exercise&id=barbell-bench-press')

    const detail = screen.getByRole('region', { name: '解剖详情' })
    expect(
      within(detail).queryByRole('list', { name: '动作步骤' }),
    ).not.toBeInTheDocument()
    await user.click(
      within(detail).getByRole('button', { name: '展开动作步骤' }),
    )
    const steps = within(detail).getByRole('list', { name: '动作步骤' })
    expect(steps.tagName).toBe('OL')
    expect(within(steps).getAllByRole('listitem')).toHaveLength(2)
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

  it('shows a bone and its related joints', () => {
    renderExplorer('/?type=bone&id=humerus')

    expect(
      screen.getByRole('heading', { name: '肱骨', level: 2 }),
    ).toBeInTheDocument()
    expect(screen.getByText('肩关节')).toBeInTheDocument()
    expect(screen.getByText('肘关节')).toBeInTheDocument()
  })

  it('provides three accessible mobile drawer states', async () => {
    const user = userEvent.setup()
    renderExplorer()
    const panel = screen.getByRole('region', { name: '解剖详情' })

    await user.click(screen.getByRole('button', { name: '折叠详情面板' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'collapsed')
    await user.click(screen.getByRole('button', { name: '半屏显示详情' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'half')
    await user.click(screen.getByRole('button', { name: '展开详情面板' }))
    expect(panel).toHaveAttribute('data-drawer-state', 'expanded')
  })
})
