import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../app/AppShell'
import { bones } from '../../data/bones'
import { muscles } from '../../data/muscles'
import { BodyMap, type BodyMapProps } from './BodyMap'

const baseProps: BodyMapProps = {
  mode: 'muscles',
  view: 'front',
  onViewChange: vi.fn(),
  onEntitySelect: vi.fn(),
}

describe('BodyMap', () => {
  it('requests front and back view changes', async () => {
    const user = userEvent.setup()
    const onViewChange = vi.fn()
    render(<BodyMap {...baseProps} onViewChange={onViewChange} />)

    await user.click(screen.getByRole('button', { name: '背面' }))
    await user.click(screen.getByRole('button', { name: '正面' }))

    expect(onViewChange).toHaveBeenNthCalledWith(1, 'back')
    expect(onViewChange).toHaveBeenNthCalledWith(2, 'front')
  })

  it('selects an entity with click, Enter, and Space', async () => {
    const user = userEvent.setup()
    const onEntitySelect = vi.fn()
    render(<BodyMap {...baseProps} onEntitySelect={onEntitySelect} />)
    const pectoralis = screen.getByRole('button', { name: '胸大肌' })

    await user.click(pectoralis)
    fireEvent.keyDown(pectoralis, { key: 'Enter' })
    fireEvent.keyDown(pectoralis, { key: ' ' })

    expect(onEntitySelect).toHaveBeenCalledTimes(3)
    expect(onEntitySelect).toHaveBeenNthCalledWith(1, 'pectoralis-major')
    expect(onEntitySelect).toHaveBeenNthCalledWith(2, 'pectoralis-major')
    expect(onEntitySelect).toHaveBeenNthCalledWith(3, 'pectoralis-major')
  })

  it('only exposes entities from the active mode to interaction', () => {
    const { rerender } = render(<BodyMap {...baseProps} />)

    expect(screen.getByRole('button', { name: '胸大肌' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '胸骨' }),
    ).not.toBeInTheDocument()

    rerender(<BodyMap {...baseProps} mode="bones" />)

    expect(screen.getByRole('button', { name: '胸骨' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '胸大肌' }),
    ).not.toBeInTheDocument()
  })

  it.each([
    ['agonist', 'body-map__entity--agonist'],
    ['synergist', 'body-map__entity--synergist'],
    ['stabilizer', 'body-map__entity--stabilizer'],
    ['antagonist', 'body-map__entity--antagonist'],
  ] as const)('exposes the %s highlight state', (role, className) => {
    render(
      <BodyMap
        {...baseProps}
        highlightedMuscles={[{ muscleId: 'pectoralis-major', role }]}
      />,
    )

    expect(screen.getByRole('button', { name: '胸大肌' })).toHaveClass(
      className,
    )
  })

  it('exposes selected state independently from highlights', () => {
    render(<BodyMap {...baseProps} selectedEntityId="pectoralis-major" />)

    expect(screen.getByRole('button', { name: '胸大肌' })).toHaveClass(
      'body-map__entity--selected',
    )
    expect(screen.getByRole('button', { name: '胸大肌' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('represents every seeded muscle in front or back geometry', () => {
    const { rerender } = render(<BodyMap {...baseProps} view="front" />)
    const representedIds = new Set(
      screen
        .getAllByRole('button')
        .map((entity) => entity.getAttribute('data-entity-id'))
        .filter(Boolean),
    )

    rerender(<BodyMap {...baseProps} view="back" />)
    screen
      .getAllByRole('button')
      .map((entity) => entity.getAttribute('data-entity-id'))
      .filter((id): id is string => id !== null)
      .forEach((id) => representedIds.add(id))

    expect(representedIds).toEqual(new Set(muscles.map(({ id }) => id)))
  })

  it('represents every seeded bone in front or back geometry', () => {
    const { rerender } = render(
      <BodyMap {...baseProps} mode="bones" view="front" />,
    )
    const representedIds = new Set(
      screen
        .getAllByRole('button')
        .map((entity) => entity.getAttribute('data-entity-id'))
        .filter(Boolean),
    )

    rerender(<BodyMap {...baseProps} mode="bones" view="back" />)
    screen
      .getAllByRole('button')
      .map((entity) => entity.getAttribute('data-entity-id'))
      .filter((id): id is string => id !== null)
      .forEach((id) => representedIds.add(id))

    expect(representedIds).toEqual(new Set(bones.map(({ id }) => id)))
  })
})

describe('AppShell body map integration', () => {
  it('changes the rendered body-map layer with the anatomy mode control', async () => {
    const user = userEvent.setup()
    render(<AppShell />)

    expect(screen.getByRole('button', { name: '胸大肌' })).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: '骨骼' }))

    expect(screen.getByRole('button', { name: '胸骨' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '胸大肌' }),
    ).not.toBeInTheDocument()
  })
})
