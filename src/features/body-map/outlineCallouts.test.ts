import { describe, expect, it } from 'vitest'
import { outlineCallout } from './outlineCallouts'

describe('outlineCallout', () => {
  it('keeps the chest label on the left of the front figure', () => {
    const chest = outlineCallout('front', 'pectoralis-major')

    expect(chest?.side).toBe('left')
    expect(chest?.nameZh).toBe('胸大肌')
    expect(chest?.targetRegionId).toMatch(/^chest-/)
  })

  it('anchors the lat label on a middle or lower piece', () => {
    const lat = outlineCallout('back', 'latissimus-dorsi')

    expect(lat?.targetRegionId).toMatch(/lats-(mid|lower)-/)
  })

  it('returns nothing when the muscle is not on the current view', () => {
    expect(outlineCallout('back', 'pectoralis-major')).toBeNull()
  })
})
