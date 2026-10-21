export interface ExerciseMotionMedia {
  kind: 'video'
  src: string
  mimeType: 'video/mp4' | 'video/webm'
  author: string
  license: string
  licenseUrl: string
  sourceUrl: string
}

const ccBySa4 = 'https://creativecommons.org/licenses/by-sa/4.0/'

export const exerciseMediaById: Readonly<Record<string, ExerciseMotionMedia>> =
  {
    'barbell-bench-press': {
      kind: 'video',
      src: 'https://wger.de/media/exercise-video/73/cfb72002-898f-443a-a124-a0bce8a2e6ad.MP4',
      mimeType: 'video/mp4',
      author: 'Goulart',
      license: 'CC BY-SA 4.0',
      licenseUrl: ccBySa4,
      sourceUrl: 'https://wger.de/api/v2/video/23/',
    },
    'parallel-bar-dip': {
      kind: 'video',
      src: 'https://wger.de/media/exercise-video/194/d039ec90-474d-47a9-a3ad-bf0b00828c82.MP4',
      mimeType: 'video/mp4',
      author: 'Goulart',
      license: 'CC BY-SA 4.0',
      licenseUrl: ccBySa4,
      sourceUrl: 'https://wger.de/api/v2/video/64/',
    },
    'skull-crusher': {
      kind: 'video',
      src: 'https://wger.de/media/exercise-video/246/75eb8c88-922e-45c5-8be3-ac073f62b63f.MP4',
      mimeType: 'video/mp4',
      author: 'Goulart',
      license: 'CC BY-SA 4.0',
      licenseUrl: ccBySa4,
      sourceUrl: 'https://wger.de/api/v2/video/61/',
    },
  }

export function getExerciseMedia(
  exerciseId: string,
): ExerciseMotionMedia | null {
  return exerciseMediaById[exerciseId] ?? null
}
