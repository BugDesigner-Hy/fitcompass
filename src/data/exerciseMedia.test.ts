import { describe, expect, it } from 'vitest'
import { exercises } from './exercises'
import { getExerciseMedia } from './exerciseMedia'

describe('exercise media sources', () => {
  it('keeps the remote motion gif and uses a RepDB still for reduced motion', () => {
    const media = getExerciseMedia('barbell-bench-press')
    if (media?.kind !== 'gif') throw new Error('expected a still image')

    expect(media.src).toContain('hasaneyldrm/exercises-dataset')
    expect(media.stillSrc).toContain('RepDB/exercise-dataset')
    expect(media.stillLicense).toBe('Exercise data by RepDB (repdb.co)')
    expect(media.stillLicenseUrl).toBe('https://repdb.co')
  })

  it('shows a RepDB still when the motion dataset has no gif', () => {
    const media = getExerciseMedia('face-pull')

    expect(media?.src).toContain('face-pull-peak.webp')
    expect(media?.author).toBe('RepDB')
    expect(media?.license).toBe('Exercise data by RepDB (repdb.co)')
    expect(
      exercises.find((exercise) => exercise.id === 'face-pull')?.sourceIds,
    ).toContain('repdb')
  })

  it('does not invent a still for exercises RepDB does not match', () => {
    expect(getExerciseMedia('tibialis-raise')).toBeNull()
    const lunge = getExerciseMedia('forward-lunge')
    expect(
      lunge?.kind === 'gif' ? lunge.stillLicense : undefined,
    ).toBeUndefined()
  })
})
