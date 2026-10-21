import { describe, expect, it } from 'vitest'
import type { AnatomyData } from './anatomy'
import {
  getBoneById,
  getExerciseById,
  getExercisesForMuscle,
  getJointActionById,
  getJointActionsForMuscle,
  getMuscleById,
  getMusclesForExercise,
  getMusclesForJointAction,
} from './anatomyGraph'

const data = {
  muscles: [
    {
      id: 'anterior-deltoid',
      nameZh: '三角肌前束',
      nameEn: 'Anterior deltoid',
      bodyRegion: 'shoulders',
      summary: '位于肩部前侧。',
      functions: ['肩屈'],
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
    {
      id: 'pectoralis-major',
      nameZh: '胸大肌',
      nameEn: 'Pectoralis major',
      bodyRegion: 'chest',
      summary: '覆盖胸廓前侧。',
      functions: ['辅助肩屈'],
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
  ],
  bones: [
    {
      id: 'humerus',
      nameZh: '肱骨',
      nameEn: 'Humerus',
      bodyRegion: 'arms',
      summary: '上臂长骨。',
      relatedJointIds: ['shoulder'],
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
  ],
  joints: [],
  jointActions: [
    {
      id: 'shoulder-flexion',
      nameZh: '肩屈',
      nameEn: 'Shoulder flexion',
      jointId: 'shoulder',
      description: '上臂向身体前上方移动。',
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
    {
      id: 'shoulder-horizontal-adduction',
      nameZh: '肩水平内收',
      nameEn: 'Shoulder horizontal adduction',
      jointId: 'shoulder',
      description: '上臂在水平面靠近身体中线。',
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
  ],
  exercises: [
    {
      id: 'front-raise',
      nameZh: '哑铃前平举',
      nameEn: 'Dumbbell front raise',
      equipment: 'dumbbell',
      difficulty: 'beginner',
      instructions: ['站稳并握住哑铃。', '将手臂抬至肩高后受控下放。'],
      illustration: null,
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
    {
      id: 'overhead-press',
      nameZh: '哑铃推举',
      nameEn: 'Dumbbell overhead press',
      equipment: 'dumbbell',
      difficulty: 'intermediate',
      instructions: ['将哑铃置于肩侧。', '向上推起并受控还原。'],
      illustration: null,
      sourceIds: ['editorial'],
      reviewStatus: 'draft',
    },
  ],
  muscleJointActionRelations: [
    {
      muscleId: 'anterior-deltoid',
      jointActionId: 'shoulder-horizontal-adduction',
      role: 'synergist',
      reviewStatus: 'draft',
    },
    {
      muscleId: 'pectoralis-major',
      jointActionId: 'shoulder-flexion',
      role: 'synergist',
      reviewStatus: 'draft',
    },
    {
      muscleId: 'anterior-deltoid',
      jointActionId: 'shoulder-flexion',
      role: 'agonist',
      reviewStatus: 'draft',
    },
  ],
  exerciseMuscleRelations: [
    {
      exerciseId: 'overhead-press',
      muscleId: 'anterior-deltoid',
      role: 'synergist',
      reviewStatus: 'draft',
    },
    {
      exerciseId: 'front-raise',
      muscleId: 'pectoralis-major',
      role: 'synergist',
      reviewStatus: 'draft',
    },
    {
      exerciseId: 'front-raise',
      muscleId: 'anterior-deltoid',
      role: 'agonist',
      reviewStatus: 'draft',
    },
  ],
  sources: [],
} satisfies AnatomyData

describe('anatomy graph queries', () => {
  it('finds singular entities and returns undefined for unknown IDs', () => {
    expect(getMuscleById(data, 'anterior-deltoid')?.nameZh).toBe('三角肌前束')
    expect(getBoneById(data, 'humerus')?.nameZh).toBe('肱骨')
    expect(getJointActionById(data, 'shoulder-flexion')?.nameZh).toBe('肩屈')
    expect(getExerciseById(data, 'front-raise')?.nameZh).toBe('哑铃前平举')
    expect(getMuscleById(data, 'unknown')).toBeUndefined()
  })

  it('returns related records with roles in target entity seed order', () => {
    expect(getExercisesForMuscle(data, 'anterior-deltoid')).toEqual([
      { exercise: data.exercises[0], role: 'agonist' },
      { exercise: data.exercises[1], role: 'synergist' },
    ])
    expect(getMusclesForExercise(data, 'front-raise')).toEqual([
      { muscle: data.muscles[0], role: 'agonist' },
      { muscle: data.muscles[1], role: 'synergist' },
    ])
    expect(getMusclesForJointAction(data, 'shoulder-flexion')).toEqual([
      { muscle: data.muscles[0], role: 'agonist' },
      { muscle: data.muscles[1], role: 'synergist' },
    ])
    expect(getJointActionsForMuscle(data, 'anterior-deltoid')).toEqual([
      { jointAction: data.jointActions[0], role: 'agonist' },
      { jointAction: data.jointActions[1], role: 'synergist' },
    ])
  })

  it('returns empty arrays for unknown relation IDs', () => {
    expect(getExercisesForMuscle(data, 'unknown')).toEqual([])
    expect(getMusclesForExercise(data, 'unknown')).toEqual([])
    expect(getMusclesForJointAction(data, 'unknown')).toEqual([])
    expect(getJointActionsForMuscle(data, 'unknown')).toEqual([])
  })
})
