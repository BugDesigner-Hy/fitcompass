import type { DatasetMotion } from './datasetMotion'
import { datasetMotionByExerciseId } from './datasetMotion'
import { repdbStillsByExerciseId, type RepdbStill } from './repdbStills'

export type ExerciseMotionMedia =
  | {
      kind: 'gif'
      src: string
      stillSrc: string | null
      author: string
      license: string
      licenseUrl: string
      sourceUrl: string
      stillAuthor?: string
      stillLicense?: string
      stillLicenseUrl?: string
      stillSourceUrl?: string
    }
  | {
      kind: 'video'
      src: string
      mimeType: 'video/mp4' | 'video/webm'
      author: string
      license: string
      licenseUrl: string
      sourceUrl: string
    }

const datasetAuthor = 'exercises-dataset'
const datasetLicense = '上游素材，仅随本地项目展示'
const repdbAuthor = 'RepDB'
const repdbLicense = 'Exercise data by RepDB (repdb.co)'
const repdbLicenseUrl = 'https://repdb.co'

type GifMotionMedia = Extract<ExerciseMotionMedia, { kind: 'gif' }>

function fromDataset(motion: DatasetMotion): GifMotionMedia {
  return {
    kind: 'gif',
    src: motion.src,
    stillSrc: motion.stillSrc,
    author: datasetAuthor,
    license: datasetLicense,
    licenseUrl: 'https://github.com/hasaneyldrm/exercises-dataset',
    sourceUrl: motion.sourceUrl,
  }
}

function fromRepdb(still: RepdbStill): GifMotionMedia {
  return {
    kind: 'gif',
    src: still.src,
    stillSrc: still.src,
    author: repdbAuthor,
    license: repdbLicense,
    licenseUrl: repdbLicenseUrl,
    sourceUrl: still.sourceUrl,
  }
}

export function getExerciseMedia(
  exerciseId: string,
): ExerciseMotionMedia | null {
  const motion = datasetMotionByExerciseId[exerciseId]
  const still = repdbStillsByExerciseId[exerciseId]
  if (motion) {
    const media = fromDataset(motion)
    if (!still) return media
    return {
      ...media,
      stillSrc: still.src,
      stillAuthor: repdbAuthor,
      stillLicense: repdbLicense,
      stillLicenseUrl: repdbLicenseUrl,
      stillSourceUrl: still.sourceUrl,
    }
  }
  return still ? fromRepdb(still) : null
}
