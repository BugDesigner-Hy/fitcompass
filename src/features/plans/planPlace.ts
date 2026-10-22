export type PlanPlace = {
  scrollY: number
  splitId: string
}

export function planPlaceFrom(state: unknown): PlanPlace | null {
  if (!state || typeof state !== 'object' || !('planPlace' in state))
    return null
  const place = (state as { planPlace?: unknown }).planPlace
  if (!place || typeof place !== 'object') return null
  const { scrollY, splitId } = place as { scrollY?: unknown; splitId?: unknown }
  if (typeof scrollY !== 'number' || !Number.isFinite(scrollY) || scrollY < 0) {
    return null
  }
  if (typeof splitId !== 'string' || splitId.length === 0) return null
  return { scrollY, splitId }
}
