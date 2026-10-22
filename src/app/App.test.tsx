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

  it.each([
    ['/about', '关于健身指北'],
    ['/licenses', '开源许可'],
  ])('renders the %s route heading', (route, heading) => {
    renderRoute(route)

    expect(
      screen.getByRole('heading', { name: heading, level: 1 }),
    ).toBeInTheDocument()
  })
})
