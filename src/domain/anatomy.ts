export type ReviewStatus = 'draft' | 'reviewed'

export type BodyRegion =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'core'
  | 'hips'
  | 'thighs'
  | 'lower-legs'
  | 'trunk'

export interface Muscle {
  id: string
  nameZh: string
  nameEn: string
  bodyRegion: BodyRegion
  summary: string
  functions: string[]
  origin?: string
  insertion?: string
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export interface Bone {
  id: string
  nameZh: string
  nameEn: string
  bodyRegion: BodyRegion
  summary: string
  relatedJointIds: string[]
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export interface Joint {
  id: string
  nameZh: string
  nameEn: string
  bodyRegion: BodyRegion
  boneIds: string[]
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export interface JointAction {
  id: string
  nameZh: string
  nameEn: string
  jointId: string
  description: string
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export type ExerciseEquipment =
  | 'bodyweight'
  | 'barbell'
  | 'dumbbell'
  | 'cable'
  | 'machine'
  | 'kettlebell'
  | 'resistance-band'
  | 'bench'

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Exercise {
  id: string
  nameZh: string
  nameEn: string
  equipment: ExerciseEquipment
  difficulty: ExerciseDifficulty
  instructions: string[]
  illustration: string | null
  sourceIds: string[]
  reviewStatus: ReviewStatus
}

export type MuscleRole = 'agonist' | 'synergist' | 'stabilizer' | 'antagonist'
export type ExerciseMuscleRole = Exclude<MuscleRole, 'antagonist'>

export interface MuscleJointActionRelation {
  muscleId: string
  jointActionId: string
  role: MuscleRole
  reviewStatus: ReviewStatus
}

export interface ExerciseMuscleRelation {
  exerciseId: string
  muscleId: string
  role: ExerciseMuscleRole
  reviewStatus: ReviewStatus
}

export interface SourceRecord {
  id: string
  title: string
  url: string
  license: string
  attribution: string
  accessedDate: string
  notes: string
}

export interface AnatomyData {
  muscles: Muscle[]
  bones: Bone[]
  joints: Joint[]
  jointActions: JointAction[]
  exercises: Exercise[]
  muscleJointActionRelations: MuscleJointActionRelation[]
  exerciseMuscleRelations: ExerciseMuscleRelation[]
  sources: SourceRecord[]
}
