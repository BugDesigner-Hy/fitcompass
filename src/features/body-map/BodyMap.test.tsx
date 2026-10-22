import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AppShell } from '../../app/AppShell'
import { BodyMap, type BodyMapProps } from './BodyMap'

const baseProps: BodyMapProps = {
  view: 'front',
  onViewChange: () => undefined,
  onEntitySelect: () => undefined,
}

function outlineMuscle(name: string) {
  const outline = screen.getByRole('group', { name: '正面肌肉轮廓' })
  const match = within(outline)
    .getAllByRole('button', { name })
    .find((button) => button.tagName.toLowerCase() === 'path')
  if (!match) throw new Error(`missing outline for ${name}`)
  return match
}

describe('BodyMap', () => {
  it('requests front and back view changes', async () => {
    const user = userEvent.setup()
    const onViewChange = vi.fn()
    render(<BodyMap {...baseProps} onViewChange={onViewChange} />)

    await user.click(screen.getByRole('button', { name: '背面' }))
    expect(onViewChange).toHaveBeenCalledWith('back')
  })

  it('exposes the front and back controls as a named group', () => {
    render(<BodyMap {...baseProps} />)

    expect(screen.getByRole('group', { name: '人体视图' })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '简图' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '详解' }),
    ).not.toBeInTheDocument()
  })

  it('keeps source credits inside the attribution button', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <BodyMap {...baseProps} />
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole('link', { name: 'Body Muscles' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: '素材许可' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: 'Exercise data by RepDB (repdb.co)' }),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '素材与署名' }))

    expect(screen.getByRole('link', { name: 'Body Muscles' })).toHaveAttribute(
      'href',
      'https://github.com/vulovix/body-muscles',
    )
    expect(screen.getByRole('link', { name: '素材许可' })).toHaveAttribute(
      'href',
      '/licenses',
    )
    expect(
      screen.getByRole('link', { name: 'Exercise data by RepDB (repdb.co)' }),
    ).toHaveAttribute('href', 'https://repdb.co')
  })

  it('selects a mapped muscle from the outline with click and keyboard', async () => {
    const user = userEvent.setup()
    const onEntitySelect = vi.fn()
    render(<BodyMap {...baseProps} onEntitySelect={onEntitySelect} />)

    const pectoral = outlineMuscle('胸大肌')
    await user.click(pectoral)
    pectoral.focus()
    await user.keyboard('{Enter}')
    expect(onEntitySelect).toHaveBeenCalledWith('pectoralis-major')
    expect(screen.queryByLabelText('结构列表')).not.toBeInTheDocument()
  })

  it('does not render a muscle chip list', () => {
    render(<BodyMap {...baseProps} />)

    expect(screen.queryByLabelText('结构列表')).not.toBeInTheDocument()
    expect(outlineMuscle('胸大肌')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: '胸骨' }),
    ).not.toBeInTheDocument()
  })

  it('marks the selected outline and its highlighted role', () => {
    render(
      <BodyMap
        {...baseProps}
        highlightedMuscles={[{ muscleId: 'pectoralis-major', role: 'agonist' }]}
        selectedEntityId="pectoralis-major"
      />,
    )

    const pectoral = outlineMuscle('胸大肌')
    expect(pectoral).toHaveAttribute('aria-pressed', 'true')
    expect(pectoral).toHaveAttribute('data-highlight-role', 'agonist')
    expect(pectoral).toHaveAttribute('fill', '#f04438')
  })

  it('keeps every outlined muscle visible after a click', async () => {
    const user = userEvent.setup()
    const onEntitySelect = vi.fn()
    render(
      <BodyMap
        {...baseProps}
        onEntitySelect={onEntitySelect}
        selectedEntityId="pectoralis-major"
      />,
    )

    expect(
      screen.queryByRole('button', { name: '全身' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '腿' })).not.toBeInTheDocument()
    expect(screen.queryByLabelText('结构列表')).not.toBeInTheDocument()

    await user.click(outlineMuscle('胸大肌'))
    expect(onEntitySelect).toHaveBeenCalledWith('pectoralis-major')
    expect(outlineMuscle('股直肌')).toBeInTheDocument()
  })

  it('shows the flat muscle outline and highlights a mapped muscle without a selection ring', async () => {
    const user = userEvent.setup()
    const onEntitySelect = vi.fn()
    const { rerender } = render(
      <BodyMap {...baseProps} onEntitySelect={onEntitySelect} />,
    )

    expect(
      screen.queryByRole('button', { name: '三维' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('group', { name: '正面肌肉轮廓' }),
    ).toBeInTheDocument()

    const chest = screen
      .getAllByRole('button', { name: '胸大肌' })
      .find((button) => button.tagName.toLowerCase() === 'path')
    expect(chest).toBeDefined()
    await user.click(chest!)
    expect(onEntitySelect).toHaveBeenCalledWith('pectoralis-major')

    rerender(
      <BodyMap
        {...baseProps}
        onEntitySelect={onEntitySelect}
        selectedEntityId="pectoralis-major"
      />,
    )
    const selected = screen
      .getAllByRole('button', { name: '胸大肌' })
      .find((button) => button.tagName.toLowerCase() === 'path')
    expect(selected).toHaveAttribute('stroke', '#f04438')
    expect(selected).toHaveAttribute('stroke-width', '0.04')
    expect(selected).toHaveAttribute('fill', '#f04438')
  })

  it('shows only the selected muscle name on the figure', async () => {
    const user = userEvent.setup()
    const onEntitySelect = vi.fn()
    const { rerender } = render(
      <BodyMap {...baseProps} onEntitySelect={onEntitySelect} />,
    )

    expect(
      screen.queryByRole('group', { name: '肌肉名称' }),
    ).not.toBeInTheDocument()

    rerender(
      <BodyMap
        {...baseProps}
        onEntitySelect={onEntitySelect}
        selectedEntityId="pectoralis-major"
      />,
    )

    const label = screen.getByRole('group', { name: '肌肉名称' })
    expect(within(label).getAllByRole('button')).toHaveLength(1)
    const chest = within(label).getByRole('button', { name: '胸大肌' })
    expect(chest).toHaveTextContent('胸大肌')
    expect(chest).not.toHaveTextContent('杠铃卧推')
    await user.click(chest)
    expect(onEntitySelect).toHaveBeenCalledWith('pectoralis-major')

    rerender(
      <BodyMap
        {...baseProps}
        onEntitySelect={onEntitySelect}
        selectedEntityId="pectoralis-major"
        view="back"
      />,
    )
    expect(
      screen.queryByRole('group', { name: '肌肉名称' }),
    ).not.toBeInTheDocument()
  })
})

describe('AppShell body map integration', () => {
  it('keeps the outline without a bone mode or muscle chip list', () => {
    render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole('radio', { name: '骨骼' }),
    ).not.toBeInTheDocument()
    expect(screen.queryByLabelText('结构列表')).not.toBeInTheDocument()
    expect(outlineMuscle('胸大肌')).toBeInTheDocument()
  })
})
