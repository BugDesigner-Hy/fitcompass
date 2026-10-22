import { describe, expect, it } from 'vitest'
import {
  muscleIdForOutline,
  muscleIdsForOutline,
  outlineIdsForMuscle,
} from './muscleOutlineMap'

describe('muscle outline map', () => {
  it('maps a chest region to pectoralis major', () => {
    expect(muscleIdForOutline('chest-upper-left')).toBe('pectoralis-major')
    expect(outlineIdsForMuscle('pectoralis-major')).toEqual(
      expect.arrayContaining(['chest-upper-left', 'chest-lower-right']),
    )
  })

  it('maps the quadriceps blob to rectus femoris and highlights both vastus muscles', () => {
    expect(muscleIdForOutline('quads-left')).toBe('rectus-femoris')
    expect(muscleIdsForOutline('quads-right')).toEqual(
      expect.arrayContaining([
        'rectus-femoris',
        'vastus-lateralis',
        'vastus-medialis',
      ]),
    )
  })

  it('leaves the head silhouette unmapped', () => {
    expect(muscleIdForOutline('head')).toBeNull()
    expect(muscleIdsForOutline('head')).toEqual([])
  })
})
