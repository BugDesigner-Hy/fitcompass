import { BACK_MUSCLES, FRONT_MUSCLES } from 'body-muscles'
import { muscles } from '../../data/muscles'
import type { BodyView } from './BodyMap'
import { outlineIdsForMuscle } from './muscleOutlineMap'
import { boundsArea, boundsCenter, pathBounds } from './outlineGeometry'

export interface OutlineCallout {
  muscleId: string
  nameZh: string
  side: 'left' | 'right'
  targetRegionId: string
}

export function outlineCallout(
  view: BodyView,
  muscleId: string,
): OutlineCallout | null {
  const nameZh = muscles.find((muscle) => muscle.id === muscleId)?.nameZh
  if (!nameZh) return null

  const regions = view === 'front' ? FRONT_MUSCLES : BACK_MUSCLES
  const byId = new Map(regions.map((region) => [region.id, region]))
  const midpoint = view === 'front' ? 17.5 : 54.5
  const pieces = outlineIdsForMuscle(muscleId).flatMap((id) => {
    const region = byId.get(id)
    if (!region) return []
    const bounds = pathBounds(region.path)
    if (!bounds) return []
    return [
      {
        id,
        bounds,
        center: boundsCenter(bounds),
        area: boundsArea(bounds),
      },
    ]
  })
  if (pieces.length === 0) return null

  const largest = pieces.reduce((best, piece) => {
    if (piece.area > best.area) return piece
    if (piece.area < best.area) return best
    return piece.center.x <= best.center.x ? piece : best
  })
  const side = largest.center.x < midpoint ? 'left' : 'right'
  const sameSide = pieces.filter(
    (piece) => piece.center.x < midpoint === (side === 'left'),
  )
  const midY =
    (Math.min(...sameSide.map((piece) => piece.bounds.minY)) +
      Math.max(...sameSide.map((piece) => piece.bounds.maxY))) /
    2
  const target = sameSide.reduce((best, piece) => {
    const distance = Math.abs(piece.center.y - midY)
    const bestDistance = Math.abs(best.center.y - midY)
    if (Math.abs(distance - bestDistance) <= 0.2) {
      return piece.area >= best.area ? piece : best
    }
    return distance < bestDistance ? piece : best
  })

  return {
    muscleId,
    nameZh,
    side,
    targetRegionId: target.id,
  }
}
