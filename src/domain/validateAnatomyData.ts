import type { AnatomyData } from './anatomy'

export interface ValidationIssue {
  code: string
  message: string
  path: string
}

const muscleRoles = new Set([
  'agonist',
  'synergist',
  'stabilizer',
  'antagonist',
])
const exerciseRoles = new Set(['agonist', 'synergist', 'stabilizer'])

export function validateAnatomyData(data: AnatomyData): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const add = (code: string, message: string, path: string) =>
    issues.push({ code, message, path })
  const entityCollections = [
    ['muscles', data.muscles],
    ['bones', data.bones],
    ['joints', data.joints],
    ['jointActions', data.jointActions],
    ['exercises', data.exercises],
    ['sources', data.sources],
  ] as const

  for (const [collectionName, records] of entityCollections) {
    const seen = new Set<string>()
    records.forEach(({ id }, index) => {
      if (seen.has(id)) {
        add(
          'duplicate-id',
          `Duplicate ID "${id}" in ${collectionName}.`,
          `${collectionName}[${index}].id`,
        )
      }
      seen.add(id)
    })
  }

  const sourceIds = new Set(data.sources.map(({ id }) => id))
  const sourcedCollections = [
    ['muscles', data.muscles],
    ['bones', data.bones],
    ['joints', data.joints],
    ['jointActions', data.jointActions],
    ['exercises', data.exercises],
  ] as const
  for (const [collectionName, records] of sourcedCollections) {
    records.forEach((record, index) => {
      record.sourceIds.forEach((sourceId, sourceIndex) => {
        if (!sourceIds.has(sourceId)) {
          add(
            'missing-source',
            `Source "${sourceId}" does not exist.`,
            `${collectionName}[${index}].sourceIds[${sourceIndex}]`,
          )
        }
      })
    })
  }

  const checkNames = (
    collectionName: string,
    records: ReadonlyArray<{ nameZh: string; nameEn: string }>,
  ) => {
    records.forEach((record, index) => {
      for (const key of ['nameZh', 'nameEn'] as const) {
        if (!record[key].trim()) {
          add(
            'empty-name',
            `${key} is required.`,
            `${collectionName}[${index}].${key}`,
          )
        }
      }
    })
  }
  checkNames('muscles', data.muscles)
  checkNames('bones', data.bones)
  checkNames('joints', data.joints)
  checkNames('jointActions', data.jointActions)
  checkNames('exercises', data.exercises)

  data.muscles.forEach((muscle, index) => {
    if (!muscle.summary.trim()) {
      add(
        'empty-description',
        'Muscle summary is required.',
        `muscles[${index}].summary`,
      )
    }
    if (
      muscle.functions.length === 0 ||
      muscle.functions.some((value) => !value.trim())
    ) {
      add(
        'empty-functions',
        'Muscle functions are required.',
        `muscles[${index}].functions`,
      )
    }
  })
  data.bones.forEach((bone, index) => {
    if (!bone.summary.trim()) {
      add(
        'empty-description',
        'Bone summary is required.',
        `bones[${index}].summary`,
      )
    }
  })
  data.jointActions.forEach((action, index) => {
    if (!action.description.trim()) {
      add(
        'empty-description',
        'Joint action description is required.',
        `jointActions[${index}].description`,
      )
    }
  })
  data.exercises.forEach((exercise, index) => {
    if (
      exercise.instructions.length === 0 ||
      exercise.instructions.some((value) => !value.trim())
    ) {
      add(
        'empty-instructions',
        'Exercise instructions are required.',
        `exercises[${index}].instructions`,
      )
    }
  })

  const boneIds = new Set(data.bones.map(({ id }) => id))
  const jointIds = new Set(data.joints.map(({ id }) => id))
  const muscleIds = new Set(data.muscles.map(({ id }) => id))
  const actionIds = new Set(data.jointActions.map(({ id }) => id))
  const exerciseIds = new Set(data.exercises.map(({ id }) => id))

  data.joints.forEach((joint, index) =>
    joint.boneIds.forEach((boneId, refIndex) => {
      if (!boneIds.has(boneId)) {
        add(
          'dangling-joint-bone',
          `Bone "${boneId}" does not exist.`,
          `joints[${index}].boneIds[${refIndex}]`,
        )
      }
    }),
  )
  data.bones.forEach((bone, index) =>
    bone.relatedJointIds.forEach((jointId, refIndex) => {
      if (!jointIds.has(jointId)) {
        add(
          'dangling-bone-joint',
          `Joint "${jointId}" does not exist.`,
          `bones[${index}].relatedJointIds[${refIndex}]`,
        )
      }
    }),
  )
  data.jointActions.forEach((action, index) => {
    if (!jointIds.has(action.jointId)) {
      add(
        'dangling-action-joint',
        `Joint "${action.jointId}" does not exist.`,
        `jointActions[${index}].jointId`,
      )
    }
  })

  const muscleActionPairs = new Set<string>()
  data.muscleJointActionRelations.forEach((relation, index) => {
    const path = `muscleJointActionRelations[${index}]`
    if (!muscleIds.has(relation.muscleId)) {
      add(
        'dangling-relation-muscle',
        `Muscle "${relation.muscleId}" does not exist.`,
        `${path}.muscleId`,
      )
    }
    if (!actionIds.has(relation.jointActionId)) {
      add(
        'dangling-relation-action',
        `Joint action "${relation.jointActionId}" does not exist.`,
        `${path}.jointActionId`,
      )
    }
    const pair = `${relation.muscleId}\u0000${relation.jointActionId}`
    if (muscleActionPairs.has(pair)) {
      add(
        'duplicate-muscle-joint-action-relation',
        'Duplicate muscle/action relation.',
        path,
      )
    }
    muscleActionPairs.add(pair)
    if (!muscleRoles.has(relation.role)) {
      add(
        'invalid-relation-role',
        `Invalid muscle/action role "${relation.role}".`,
        `${path}.role`,
      )
    }
  })

  const exerciseMusclePairs = new Set<string>()
  data.exerciseMuscleRelations.forEach((relation, index) => {
    const path = `exerciseMuscleRelations[${index}]`
    if (!exerciseIds.has(relation.exerciseId)) {
      add(
        'dangling-relation-exercise',
        `Exercise "${relation.exerciseId}" does not exist.`,
        `${path}.exerciseId`,
      )
    }
    if (!muscleIds.has(relation.muscleId)) {
      add(
        'dangling-relation-muscle',
        `Muscle "${relation.muscleId}" does not exist.`,
        `${path}.muscleId`,
      )
    }
    const pair = `${relation.exerciseId}\u0000${relation.muscleId}`
    if (exerciseMusclePairs.has(pair)) {
      add(
        'duplicate-exercise-muscle-relation',
        'Duplicate exercise/muscle relation.',
        path,
      )
    }
    exerciseMusclePairs.add(pair)
    if (!exerciseRoles.has(relation.role)) {
      add(
        'invalid-relation-role',
        `Invalid exercise/muscle role "${relation.role}".`,
        `${path}.role`,
      )
    }
  })

  data.exercises.forEach((exercise, index) => {
    const hasAgonist = data.exerciseMuscleRelations.some(
      (relation) =>
        relation.exerciseId === exercise.id && relation.role === 'agonist',
    )
    if (!hasAgonist) {
      add(
        'exercise-without-agonist',
        `Exercise "${exercise.id}" has no agonist.`,
        `exercises[${index}]`,
      )
    }
  })

  return issues
}
