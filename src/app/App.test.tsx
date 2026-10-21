import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from './App'

function renderRoute(route = '/') {
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App', () => {
  it('renders the product name, search, and anatomy modes', () => {
    renderRoute()

    expect(screen.getByText('肌动指南')).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', {
        name: '搜索肌肉、骨骼、关节动作或训练动作',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '肌肉' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '骨骼' })).toBeInTheDocument()
  })

  it('gives the main landmark and details region accessible names', () => {
    renderRoute()

    expect(
      screen.getByRole('main', { name: '人体解剖浏览器' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('region', { name: '解剖详情' })).toBeInTheDocument()
  })

  it.each([
    ['/about', '关于肌动指南'],
    ['/licenses', '开源许可'],
  ])('renders the %s route heading', (route, heading) => {
    renderRoute(route)

    expect(
      screen.getByRole('heading', { name: heading, level: 1 }),
    ).toBeInTheDocument()
  })
})
