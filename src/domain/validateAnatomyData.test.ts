import { describe, expect, it } from 'vitest'
import type { AnatomyData } from './anatomy'
import { validateAnatomyData } from './validateAnatomyData'

function validData(): AnatomyData {
  return {
    muscles: [
      {
        id: 'biceps-brachii',
        nameZh: '肱二头肌',
        nameEn: 'Biceps brachii',
        bodyRegion: 'arms',
        summary: '上臂前侧肌群。',
        functions: ['屈肘'],
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
        relatedJointIds: ['elbow'],
        sourceIds: ['editorial'],
        reviewStatus: 'draft',
      },
      {
        id: 'ulna',
        nameZh: '尺骨',
        nameEn: 'Ulna',
        bodyRegion: 'arms',
        summary: '前臂内侧长骨。',
        relatedJointIds: ['elbow'],
        sourceIds: ['editorial'],
        reviewStatus: 'draft',
      },
    ],
    joints: [
      {
        id: 'elbow',
        nameZh: '肘关节',
        nameEn: 'Elbow',
        bodyRegion: 'arms',
        boneIds: ['humerus', 'ulna'],
        sourceIds: ['editorial'],
        reviewStatus: 'draft',
      },
    ],
    jointActions: [
      {
        id: 'elbow-flexion',
        nameZh: '屈肘',
        nameEn: 'Elbow flexion',
        jointId: 'elbow',
        description: '减小上臂与前臂夹角。',
        sourceIds: ['editorial'],
        reviewStatus: 'draft',
      },
    ],
    exercises: [
      {
        id: 'dumbbell-curl',
        nameZh: '哑铃弯举',
        nameEn: 'Dumbbell curl',
        equipment: 'dumbbell',
        difficulty: 'beginner',
        instructions: ['保持上臂稳定。', '屈肘举起哑铃后受控下放。'],
        illustration: null,
        sourceIds: ['editorial'],
        reviewStatus: 'draft',
      },
    ],
    muscleJointActionRelations: [
      {
        muscleId: 'biceps-brachii',
        jointActionId: 'elbow-flexion',
        role: 'agonist',
        reviewStatus: 'draft',
      },
    ],
    exerciseMuscleRelations: [
      {
        exerciseId: 'dumbbell-curl',
        muscleId: 'biceps-brachii',
        role: 'agonist',
        reviewStatus: 'draft',
      },
    ],
    sources: [
      {
        id: 'editorial',
        title: '项目编辑资料',
        url: 'https://example.com/fitness-guide/editorial',
        license: 'CC BY-SA 4.0',
        attribution: 'FitnessGuide contributors',
        accessedDate: '2026-10-21',
        notes: '发布到生产环境前需要专业解剖学审核。',
      },
    ],
  }
}

function issueCodes(data: AnatomyData) {
  return validateAnatomyData(data).map((issue) => issue.code)
}

describe('validateAnatomyData', () => {
  it('accepts a coherent graph', () => {
    expect(validateAnatomyData(validData())).toEqual([])
  })

  it('detects duplicate entity IDs and relation pairs', () => {
    const data = validData()
    data.muscles.push({ ...data.muscles[0] })
    data.muscleJointActionRelations.push({
      ...data.muscleJointActionRelations[0],
    })
    data.exerciseMuscleRelations.push({ ...data.exerciseMuscleRelations[0] })

    expect(issueCodes(data)).toEqual(
      expect.arrayContaining([
        'duplicate-id',
        'duplicate-muscle-joint-action-relation',
        'duplicate-exercise-muscle-relation',
      ]),
    )
  })

  it('detects missing source references', () => {
    const data = validData()
    data.muscles[0].sourceIds = ['missing-source']

    expect(issueCodes(data)).toContain('missing-source')
  })

  it('detects every dangling graph reference', () => {
    const data = validData()
    data.joints[0].boneIds = ['missing-bone']
    data.bones[0].relatedJointIds = ['missing-joint']
    data.jointActions[0].jointId = 'missing-joint'
    data.muscleJointActionRelations[0].muscleId = 'missing-muscle'
    data.muscleJointActionRelations[0].jointActionId = 'missing-action'
    data.exerciseMuscleRelations[0].exerciseId = 'missing-exercise'
    data.exerciseMuscleRelations[0].muscleId = 'missing-muscle'

    expect(issueCodes(data)).toEqual(
      expect.arrayContaining([
        'dangling-joint-bone',
        'dangling-bone-joint',
        'dangling-action-joint',
        'dangling-relation-muscle',
        'dangling-relation-action',
        'dangling-relation-exercise',
      ]),
    )
  })

  it('detects empty required localized text, functions, and instructions', () => {
    const data = validData()
    data.muscles[0].nameZh = ' '
    data.bones[0].nameEn = ''
    data.joints[0].nameZh = ''
    data.jointActions[0].description = ' '
    data.muscles[0].functions = []
    data.exercises[0].instructions = ['']

    expect(issueCodes(data)).toEqual(
      expect.arrayContaining([
        'empty-name',
        'empty-description',
        'empty-functions',
        'empty-instructions',
      ]),
    )
  })

  it('detects exercises without agonists', () => {
    const data = validData()
    data.exerciseMuscleRelations[0].role = 'synergist'

    expect(issueCodes(data)).toContain('exercise-without-agonist')
  })

  it('detects relation roles outside runtime valid sets', () => {
    const data = validData() as unknown as {
      muscleJointActionRelations: Array<Record<string, unknown>>
      exerciseMuscleRelations: Array<Record<string, unknown>>
    }
    data.muscleJointActionRelations[0].role = 'invalid'
    data.exerciseMuscleRelations[0].role = 'antagonist'

    expect(
      issueCodes(data as unknown as AnatomyData).filter(
        (code) => code === 'invalid-relation-role',
      ),
    ).toHaveLength(2)
  })
})
