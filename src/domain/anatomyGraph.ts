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
  return data.exercises.flatMap((exercise) => {
    const relation = data.exerciseMuscleRelations.find(
      (candidate) =>
        candidate.muscleId === muscleId && candidate.exerciseId === exercise.id,
    )
    return relation
      ? [{ exercise, role: relation.role satisfies ExerciseMuscleRole }]
      : []
  })
}

export function getMusclesForExercise(data: AnatomyData, exerciseId: string) {
  return data.muscles.flatMap((muscle) => {
    const relation = data.exerciseMuscleRelations.find(
      (candidate) =>
        candidate.exerciseId === exerciseId && candidate.muscleId === muscle.id,
    )
    return relation
      ? [{ muscle, role: relation.role satisfies ExerciseMuscleRole }]
      : []
  })
}

export function getMusclesForJointAction(
  data: AnatomyData,
  jointActionId: string,
) {
  return data.muscles.flatMap((muscle) => {
    const relation = data.muscleJointActionRelations.find(
      (candidate) =>
        candidate.jointActionId === jointActionId &&
        candidate.muscleId === muscle.id,
    )
    return relation
      ? [{ muscle, role: relation.role satisfies MuscleRole }]
      : []
  })
}

export function getJointActionsForMuscle(data: AnatomyData, muscleId: string) {
  return data.jointActions.flatMap((jointAction) => {
    const relation = data.muscleJointActionRelations.find(
      (candidate) =>
        candidate.muscleId === muscleId &&
        candidate.jointActionId === jointAction.id,
    )
    return relation
      ? [{ jointAction, role: relation.role satisfies MuscleRole }]
      : []
  })
}
