import { describe, expect, it } from 'vitest'
import {
  getMusclesForExercise,
  getMusclesForJointAction,
  getJointActionById,
} from '../domain/anatomyGraph'
import { validateAnatomyData } from '../domain/validateAnatomyData'
import { anatomyData } from './anatomyData'

describe('checked-in anatomy seed data', () => {
  it('contains the required entity counts', () => {
    expect(anatomyData.muscles.length).toBeGreaterThanOrEqual(30)
    expect(anatomyData.muscles.length).toBeLessThanOrEqual(40)
    expect(anatomyData.exercises.length).toBeGreaterThanOrEqual(50)
    expect(anatomyData.exercises.length).toBeLessThanOrEqual(80)
    expect(anatomyData.jointActions.length).toBeGreaterThanOrEqual(10)
  })

  it('validates without issues', () => {
    expect(validateAnatomyData(anatomyData)).toEqual([])
  })

  it.each(['shoulder-flexion', 'elbow-flexion'])(
    '%s maps to multiple muscles with roles',
    (actionId) => {
      expect(getJointActionById(anatomyData, actionId)).toBeDefined()
      const mappings = getMusclesForJointAction(anatomyData, actionId)
      expect(mappings.length).toBeGreaterThan(1)
      expect(mappings.every(({ role }) => role.length > 0)).toBe(true)
    },
  )

  it('includes every required action', () => {
    const ids = anatomyData.jointActions.map(({ id }) => id)
    expect(ids).toEqual(
      expect.arrayContaining([
        'shoulder-flexion',
        'shoulder-extension',
        'shoulder-abduction',
        'elbow-flexion',
        'elbow-extension',
        'hip-flexion',
        'hip-extension',
        'knee-flexion',
        'knee-extension',
        'ankle-plantarflexion',
      ]),
    )
  })

  it('keeps all seed records in draft review status', () => {
    const reviewedRecords = [
      ...anatomyData.muscles,
      ...anatomyData.bones,
      ...anatomyData.joints,
      ...anatomyData.jointActions,
      ...anatomyData.exercises,
      ...anatomyData.muscleJointActionRelations,
      ...anatomyData.exerciseMuscleRelations,
    ]
    expect(
      reviewedRecords.every(({ reviewStatus }) => reviewStatus === 'draft'),
    ).toBe(true)
  })

  it.each([
    'barbell-bench-press',
    'incline-dumbbell-press',
    'push-up',
    'parallel-bar-dip',
    'pull-up',
    'chin-up',
    'lat-pulldown',
    'barbell-row',
    'seated-cable-row',
    'one-arm-dumbbell-row',
    'dumbbell-pullover',
    'dumbbell-overhead-press',
    'barbell-overhead-press',
    'push-press',
    'close-grip-bench-press',
    'back-squat',
    'front-squat',
    'goblet-squat',
    'leg-press',
    'forward-lunge',
    'bulgarian-split-squat',
    'step-up',
    'conventional-deadlift',
    'romanian-deadlift',
    'hip-thrust',
    'good-morning',
    'kettlebell-swing',
    'single-leg-romanian-deadlift',
    'sumo-deadlift',
  ])('%s includes a synergist or stabilizer', (exerciseId) => {
    expect(
      getMusclesForExercise(anatomyData, exerciseId).some(
        ({ role }) => role === 'synergist' || role === 'stabilizer',
      ),
    ).toBe(true)
  })

  it.each([
    'barbell-overhead-press',
    'push-press',
    'chin-up',
    'lat-pulldown',
    'goblet-squat',
    'leg-press',
    'bulgarian-split-squat',
  ])('%s includes both synergist and stabilizer roles', (exerciseId) => {
    const roles = getMusclesForExercise(anatomyData, exerciseId).map(
      ({ role }) => role,
    )
    expect(roles).toContain('synergist')
    expect(roles).toContain('stabilizer')
  })
})
