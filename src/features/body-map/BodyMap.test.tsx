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

  it('exposes the front and back controls as a named group', () => {
    render(<BodyMap {...baseProps} />)

    const viewGroup = screen.getByRole('group', { name: '人体视图' })
    expect(viewGroup).toContainElement(
      screen.getByRole('button', { name: '正面' }),
    )
    expect(viewGroup).toContainElement(
      screen.getByRole('button', { name: '背面' }),
    )
  })

  it('uses unique title and description IDs for multiple instances', () => {
    const { container } = render(
      <>
        <BodyMap {...baseProps} />
        <BodyMap {...baseProps} view="back" />
      </>,
    )
    const maps = Array.from(container.querySelectorAll('.body-map__svg'))
    const labelledBy = maps.map((map) => map.getAttribute('aria-labelledby'))

    expect(new Set(labelledBy).size).toBe(2)
    labelledBy.forEach((ids) => {
      expect(ids).toBeTruthy()
      ids?.split(' ').forEach((id) => {
        expect(document.getElementById(id)).toBeInTheDocument()
      })
    })
  })

  it('provides practical independent hit areas at the 301px mobile width', () => {
    const mobileScale = 301 / 320
    const minimumCssTarget = 24
    const representedIds = new Set<string>()
    const { container, rerender } = render(<BodyMap {...baseProps} />)

    const collectHitAreas = () => {
      container
        .querySelectorAll<SVGRectElement>('.body-map__hit-area')
        .forEach((hitArea) => {
          const entityId = hitArea.dataset.hitAreaFor
          expect(entityId).toBeTruthy()
          representedIds.add(entityId as string)
          expect(
            Number(hitArea.getAttribute('width')) * mobileScale,
          ).toBeGreaterThanOrEqual(minimumCssTarget)
          expect(
            Number(hitArea.getAttribute('height')) * mobileScale,
          ).toBeGreaterThanOrEqual(minimumCssTarget)
        })
    }

    collectHitAreas()
    rerender(<BodyMap {...baseProps} view="back" />)
    collectHitAreas()
    rerender(<BodyMap {...baseProps} mode="bones" view="front" />)
    collectHitAreas()
    rerender(<BodyMap {...baseProps} mode="bones" view="back" />)
    collectHitAreas()

    expect(representedIds).toEqual(
      new Set([...muscles, ...bones].map(({ id }) => id)),
    )
  })

  it('routes hit-area activation to its entity without covering visible geometry', () => {
    const onEntitySelect = vi.fn()
    const { container } = render(
      <BodyMap {...baseProps} onEntitySelect={onEntitySelect} view="back" />,
    )
    const hitLayer = container.querySelector('.body-map__hit-layer')
    const entityLayer = container.querySelector('.body-map__entity-layer')
    const supraspinatusHitArea = container.querySelector(
      '[data-hit-area-for="supraspinatus"]',
    )

    expect(hitLayer).not.toBeNull()
    expect(entityLayer).not.toBeNull()
    expect(
      (hitLayer as Element).compareDocumentPosition(entityLayer as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    fireEvent.click(supraspinatusHitArea as Element)
    expect(onEntitySelect).toHaveBeenCalledWith('supraspinatus')
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
