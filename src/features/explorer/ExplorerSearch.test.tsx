import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ExplorerSearch } from './ExplorerSearch'

describe('ExplorerSearch initial keyboard navigation', () => {
  it('selects the first result when ArrowDown is the first navigation key', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ExplorerSearch onSelect={onSelect} />)
    const search = screen.getByRole('combobox', {
      name: '搜索肌肉、骨骼、关节动作或训练动作',
    })

    await user.type(search, 'press')
    const options = within(screen.getByRole('listbox')).getAllByRole('option')
    await user.keyboard('{ArrowDown}')

    expect(options[0]).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('selects the last result when ArrowUp is the first navigation key', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<ExplorerSearch onSelect={onSelect} />)
    const search = screen.getByRole('combobox', {
      name: '搜索肌肉、骨骼、关节动作或训练动作',
    })

    await user.type(search, 'press')
    const options = within(screen.getByRole('listbox')).getAllByRole('option')
    await user.keyboard('{ArrowUp}')

    expect(options.at(-1)).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
