import { describe, expect, it } from 'vitest'
import {
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
})
