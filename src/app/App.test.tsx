import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'

function renderRoute(route = '/') {
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders the product name', () => {
    renderRoute()

    expect(screen.getByText('健身指北')).toBeInTheDocument()
    expect(screen.getByText('肌肉、关节与训练动作图谱')).toBeInTheDocument()
    expect(screen.getByText('FitCompass')).toBeInTheDocument()
    expect(screen.queryByRole('search')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('radio', { name: '骨骼' }),
    ).not.toBeInTheDocument()
  })

  it('gives the main landmark and details region accessible names', () => {
    renderRoute()

    expect(
      screen.getByRole('main', { name: '人体解剖浏览器' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('region', { name: '解剖详情' })).toBeInTheDocument()
  })

  it('links the explorer to the theory page', () => {
    renderRoute()

    expect(screen.getByRole('link', { name: '理论知识' })).toHaveAttribute(
      'href',
      '/theory',
    )
    expect(screen.getByRole('link', { name: '训练计划' })).toHaveAttribute(
      'href',
      '/plans',
    )
  })

  it('explains the common training splits', async () => {
    const user = userEvent.setup()
    renderRoute('/plans')

    expect(
      screen.getByRole('heading', { name: '训练计划', level: 1 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('tab', { name: '三分化', selected: true }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '三分化', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '四分化', level: 2 }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '五分化', level: 2 }),
    ).not.toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: '杠铃深蹲' }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByText('周一推，周三拉，周五腿。周二、周四、周末休息。'),
    ).toBeInTheDocument()
    const pushDay = screen
      .getByRole('heading', { name: '第 1 天 · 推', level: 3 })
      .closest('article')
    expect(pushDay).not.toBeNull()
    expect(
      within(pushDay as HTMLElement).getAllByRole('listitem'),
    ).toHaveLength(6)
    expect(within(pushDay as HTMLElement).getAllByText('备选')).toHaveLength(6)
    expect(
      within(pushDay as HTMLElement).getAllByRole('link', { name: '俯卧撑' })
        .length,
    ).toBeGreaterThan(0)
    expect(
      within(pushDay as HTMLElement).getByText(/4 组 × 6–10 次/),
    ).toBeInTheDocument()

    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    await user.click(screen.getByRole('button', { name: '复制这份计划' }))
    expect(
      await screen.findByRole('button', { name: '已复制' }),
    ).toBeInTheDocument()
    const threeDay = String(writeText.mock.calls[0]?.[0])
    expect(threeDay).toContain('三分化')
    expect(threeDay).toContain('1. 杠铃卧推')
    expect(threeDay).toContain('备选：俯卧撑、双杠臂屈伸')
    expect(threeDay).not.toContain('四分化')

    await user.click(screen.getByRole('tab', { name: '四分化' }))
    expect(
      screen.getByRole('heading', { name: '四分化', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '第 1 天 · 推', level: 3 }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '第 1 天 · 胸', level: 3 }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '复制这份计划' }))
    expect(
      await screen.findByRole('button', { name: '已复制' }),
    ).toBeInTheDocument()
    const fourDay = String(writeText.mock.calls[1]?.[0])
    expect(fourDay).toContain('第 1 天 · 胸')
    expect(fourDay).not.toContain('第 1 天 · 推')

    await user.click(screen.getByRole('tab', { name: '五分化' }))
    expect(
      screen.getByRole('heading', { name: '五分化', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '第 5 天 · 手臂', level: 3 }),
    ).toBeInTheDocument()
  })

  it('opens a plan exercise fullscreen and returns to the plan', async () => {
    const user = userEvent.setup()
    renderRoute('/plans')

    await user.click(screen.getAllByRole('link', { name: '杠铃卧推' })[0])

    const detail = screen.getByRole('region', { name: '解剖详情' })
    expect(detail).toHaveAttribute('data-drawer-state', 'expanded')
    expect(
      within(detail).getByRole('heading', { name: '杠铃卧推', level: 2 }),
    ).toBeInTheDocument()

    await user.click(within(detail).getByRole('button', { name: '返回' }))
    expect(
      screen.getByRole('heading', { name: '训练计划', level: 1 }),
    ).toBeInTheDocument()
  })

  it('returns to the same split and scroll position in the plan', async () => {
    const user = userEvent.setup()
    let scrollY = 0
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      get: () => scrollY,
    })
    renderRoute('/plans')

    await user.click(screen.getByRole('tab', { name: '四分化' }))
    scrollY = 1280
    await user.click(screen.getAllByRole('link', { name: '杠铃卧推' })[0])

    const detail = screen.getByRole('region', { name: '解剖详情' })
    scrollTo.mockClear()
    await user.click(within(detail).getByRole('button', { name: '返回' }))

    expect(
      screen.getByRole('heading', { name: '四分化', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: '三分化', level: 2 }),
    ).not.toBeInTheDocument()
    expect(scrollTo).toHaveBeenCalledWith(0, 1280)
  })

  it('explains the three anatomical planes', () => {
    renderRoute('/theory')

    expect(
      screen.getByRole('heading', { name: '理论知识', level: 1 }),
    ).toBeInTheDocument()
    const index = screen.getByRole('navigation', { name: '知识索引' })
    expect(
      within(index).getByRole('link', { name: '三个平面' }),
    ).toHaveAttribute('href', '#planes')
    expect(
      within(index).getByRole('link', { name: '解剖姿势与方向' }),
    ).toHaveAttribute('href', '#directions')
    expect(
      within(index).getByRole('link', { name: '关节动作' }),
    ).toHaveAttribute('href', '#joint-actions')
    expect(
      within(index).getByRole('link', { name: '肌肉角色' }),
    ).toHaveAttribute('href', '#muscle-roles')
    expect(within(index).getByRole('link', { name: '起止点' })).toHaveAttribute(
      'href',
      '#attachments',
    )
    expect(
      within(index).getByRole('link', { name: '发力方式' }),
    ).toHaveAttribute('href', '#contractions')
    expect(
      screen.getByRole('heading', { name: '解剖姿势与方向', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '三个平面', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '矢状面', level: 3 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '冠状面', level: 3 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '水平面', level: 3 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '关节动作', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '肌肉角色', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '起止点', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '发力方式', level: 2 }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: '主动肌', level: 3 }),
    ).toHaveClass('theory-role--agonist')
    expect(screen.getAllByText(/额状面/).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('img', { name: /矢状面、冠状面和水平面/ }),
    ).toHaveAttribute('src', '/assets/planes-of-body.jpg')
    expect(screen.getByRole('link', { name: 'CC BY 4.0' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/',
    )
    for (const link of screen.getAllByRole('link', { name: '肩屈' })) {
      expect(link).toHaveAttribute(
        'href',
        '/?type=joint-action&id=shoulder-flexion',
      )
    }
    for (const link of screen.getAllByRole('link', { name: '肩外展' })) {
      expect(link).toHaveAttribute(
        'href',
        '/?type=joint-action&id=shoulder-abduction',
      )
    }
    for (const link of screen.getAllByRole('link', {
      name: '肩水平内收',
    })) {
      expect(link).toHaveAttribute(
        'href',
        '/?type=joint-action&id=shoulder-horizontal-adduction',
      )
    }
    expect(screen.getByRole('link', { name: '返回人体图谱' })).toHaveAttribute(
      'href',
      '/',
    )
  })

  it.each([
    ['/about', '关于健身指北'],
    ['/licenses', '开源许可'],
    ['/theory', '理论知识'],
  ])('renders the %s route heading', (route, heading) => {
    renderRoute(route)

    expect(
      screen.getByRole('heading', { name: heading, level: 1 }),
    ).toBeInTheDocument()
  })
})
