import type { AnatomyData } from '../domain/anatomy'
import { bones } from './bones'
import { exercises } from './exercises'
import { jointActions } from './jointActions'
import { joints } from './joints'
import { muscles } from './muscles'
import {
  exerciseMuscleRelations,
  muscleJointActionRelations,
} from './relations'
import { sources } from './sources'

export const anatomyData: AnatomyData = {
  muscles,
  bones,
  joints,
  jointActions,
  exercises,
  muscleJointActionRelations,
  exerciseMuscleRelations,
  sources,
}
