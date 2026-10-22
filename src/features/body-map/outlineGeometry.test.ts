import { describe, expect, it } from 'vitest'
import { pathBounds } from './outlineGeometry'

describe('pathBounds', () => {
  it('measures absolute line segments', () => {
    expect(pathBounds('M 0 0 L 10 0 L 10 4 Z')).toEqual({
      minX: 0,
      minY: 0,
      maxX: 10,
      maxY: 4,
    })
  })

  it('follows relative commands and separate subpaths', () => {
    expect(pathBounds('m 2 3 l 4 0 l 0 6 z m 10 1 l 2 2 z')).toEqual({
      minX: 2,
      minY: 3,
      maxX: 14,
      maxY: 9,
    })
  })
})
