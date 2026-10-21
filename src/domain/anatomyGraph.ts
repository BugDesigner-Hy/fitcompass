import type { AnatomyData, ExerciseMuscleRole, MuscleRole } from './anatomy'

export function getMuscleById(data: AnatomyData, muscleId: string) {
  return data.muscles.find(({ id }) => id === muscleId)
}

export function getBoneById(data: AnatomyData, boneId: string) {
  return data.bones.find(({ id }) => id === boneId)
}

export function getJointActionById(data: AnatomyData, jointActionId: string) {
  return data.jointActions.find(({ id }) => id === jointActionId)
}

export function getExerciseById(data: AnatomyData, exerciseId: string) {
  return data.exercises.find(({ id }) => id === exerciseId)
}

export function getExercisesForMuscle(data: AnatomyData, muscleId: string) {
  return data.exerciseMuscleRelations.flatMap((relation) => {
    if (relation.muscleId !== muscleId) return []
    const exercise = getExerciseById(data, relation.exerciseId)
    return exercise
      ? [{ exercise, role: relation.role satisfies ExerciseMuscleRole }]
      : []
  })
}

export function getMusclesForExercise(data: AnatomyData, exerciseId: string) {
  return data.exerciseMuscleRelations.flatMap((relation) => {
    if (relation.exerciseId !== exerciseId) return []
    const muscle = getMuscleById(data, relation.muscleId)
    return muscle
      ? [{ muscle, role: relation.role satisfies ExerciseMuscleRole }]
      : []
  })
}

export function getMusclesForJointAction(
  data: AnatomyData,
  jointActionId: string,
) {
  return data.muscleJointActionRelations.flatMap((relation) => {
    if (relation.jointActionId !== jointActionId) return []
    const muscle = getMuscleById(data, relation.muscleId)
    return muscle ? [{ muscle, role: relation.role satisfies MuscleRole }] : []
  })
}

export function getJointActionsForMuscle(data: AnatomyData, muscleId: string) {
  return data.muscleJointActionRelations.flatMap((relation) => {
    if (relation.muscleId !== muscleId) return []
    const jointAction = getJointActionById(data, relation.jointActionId)
    return jointAction
      ? [{ jointAction, role: relation.role satisfies MuscleRole }]
      : []
  })
}
