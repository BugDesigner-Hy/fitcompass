export interface RepdbStill {
  repdbId: string
  upstreamName: string
  src: string
  sourceUrl: string
}

export const repdbStillsByExerciseId: Readonly<Record<string, RepdbStill>> = {
  'barbell-bench-press': {
    repdbId: 'bench-press',
    upstreamName: 'Barbell Bench Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/bench-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/bench-press-peak.webp',
  },
  'incline-dumbbell-press': {
    repdbId: 'incline-db-press',
    upstreamName: 'Incline Dumbbell Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/incline-db-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/incline-db-press-peak.webp',
  },
  'push-up': {
    repdbId: 'push-up',
    upstreamName: 'Push-Up',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/push-up-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/push-up-peak.webp',
  },
  'cable-chest-fly': {
    repdbId: 'cable-fly',
    upstreamName: 'Cable Fly',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/cable-fly-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/cable-fly-peak.webp',
  },
  'parallel-bar-dip': {
    repdbId: 'dips',
    upstreamName: 'Chest Dips',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/dips-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/dips-peak.webp',
  },
  'pull-up': {
    repdbId: 'pull-up',
    upstreamName: 'Pull-Up',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/pull-up-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/pull-up-peak.webp',
  },
  'chin-up': {
    repdbId: 'chin-ups',
    upstreamName: 'Chin-Ups',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/chin-ups-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/chin-ups-peak.webp',
  },
  'lat-pulldown': {
    repdbId: 'lat-pulldown',
    upstreamName: 'Lat Pulldown',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/lat-pulldown-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/lat-pulldown-peak.webp',
  },
  'barbell-row': {
    repdbId: 'barbell-row',
    upstreamName: 'Bent-Over Barbell Row',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/barbell-row-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/barbell-row-peak.webp',
  },
  'seated-cable-row': {
    repdbId: 'seated-cable-row',
    upstreamName: 'Seated Cable Row',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/seated-cable-row-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/seated-cable-row-peak.webp',
  },
  'one-arm-dumbbell-row': {
    repdbId: 'single-arm-db-row',
    upstreamName: 'Single-Arm Dumbbell Row',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/single-arm-db-row-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/single-arm-db-row-peak.webp',
  },
  'face-pull': {
    repdbId: 'face-pull',
    upstreamName: 'Cable Face Pull',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/face-pull-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/face-pull-peak.webp',
  },
  'dumbbell-pullover': {
    repdbId: 'db-pullover',
    upstreamName: 'Dumbbell Pullover',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/db-pullover-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/db-pullover-peak.webp',
  },
  'dumbbell-overhead-press': {
    repdbId: 'dumbbell-shoulder-press',
    upstreamName: 'Dumbbell Shoulder Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/dumbbell-shoulder-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/dumbbell-shoulder-press-peak.webp',
  },
  'barbell-overhead-press': {
    repdbId: 'ohp',
    upstreamName: 'Barbell Overhead Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/ohp-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/ohp-peak.webp',
  },
  'push-press': {
    repdbId: 'push-press',
    upstreamName: 'Push Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/push-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/push-press-peak.webp',
  },
  'dumbbell-lateral-raise': {
    repdbId: 'lateral-raise',
    upstreamName: 'Dumbbell Lateral Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/lateral-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/lateral-raise-peak.webp',
  },
  'dumbbell-front-raise': {
    repdbId: 'dumbbell-front-raise',
    upstreamName: 'Dumbbell Front Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/dumbbell-front-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/dumbbell-front-raise-peak.webp',
  },
  'reverse-fly': {
    repdbId: 'dumbbell-reverse-fly',
    upstreamName: 'Dumbbell Reverse Fly',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/dumbbell-reverse-fly-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/dumbbell-reverse-fly-peak.webp',
  },
  'upright-row': {
    repdbId: 'upright-row',
    upstreamName: 'Barbell Upright Row',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/upright-row-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/upright-row-peak.webp',
  },
  'barbell-curl': {
    repdbId: 'barbell-curl',
    upstreamName: 'Barbell Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/barbell-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/barbell-curl-peak.webp',
  },
  'dumbbell-curl': {
    repdbId: 'bicep-curl',
    upstreamName: 'Dumbbell Bicep Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/bicep-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/bicep-curl-peak.webp',
  },
  'hammer-curl': {
    repdbId: 'hammer-curl',
    upstreamName: 'Dumbbell Hammer Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/hammer-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/hammer-curl-peak.webp',
  },
  'preacher-curl': {
    repdbId: 'preacher-curl',
    upstreamName: 'Preacher Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/preacher-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/preacher-curl-peak.webp',
  },
  'triceps-pushdown': {
    repdbId: 'tricep-pushdown',
    upstreamName: 'Cable Tricep Pushdown',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/tricep-pushdown-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/tricep-pushdown-peak.webp',
  },
  'skull-crusher': {
    repdbId: 'skull-crusher',
    upstreamName: 'Skull Crusher',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/skull-crusher-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/skull-crusher-peak.webp',
  },
  'close-grip-bench-press': {
    repdbId: 'close-grip-bench-press',
    upstreamName: 'Close-Grip Bench Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/close-grip-bench-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/close-grip-bench-press-peak.webp',
  },
  'overhead-triceps-extension': {
    repdbId: 'overhead-tricep-extension',
    upstreamName: 'Overhead Tricep Extension',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/overhead-tricep-extension-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/overhead-tricep-extension-peak.webp',
  },
  'forearm-wrist-curl': {
    repdbId: 'dumbbell-wrist-curl',
    upstreamName: 'Dumbbell Wrist Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/dumbbell-wrist-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/dumbbell-wrist-curl-peak.webp',
  },
  'reverse-wrist-curl': {
    repdbId: 'db-reverse-wrist-curl',
    upstreamName: 'Dumbbell Reverse Wrist Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/db-reverse-wrist-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/db-reverse-wrist-curl-peak.webp',
  },
  'front-plank': {
    repdbId: 'plank',
    upstreamName: 'Plank',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/plank-main.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/plank-main.webp',
  },
  'side-plank': {
    repdbId: 'side-plank',
    upstreamName: 'Side Plank',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/side-plank-main.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/side-plank-main.webp',
  },
  crunch: {
    repdbId: 'crunches',
    upstreamName: 'Crunches',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/crunches-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/crunches-peak.webp',
  },
  'reverse-crunch': {
    repdbId: 'reverse-crunches',
    upstreamName: 'Reverse Crunches',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/reverse-crunches-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/reverse-crunches-peak.webp',
  },
  'hanging-knee-raise': {
    repdbId: 'hanging-knee-raise',
    upstreamName: 'Hanging Knee Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/hanging-knee-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/hanging-knee-raise-peak.webp',
  },
  'russian-twist': {
    repdbId: 'russian-twist',
    upstreamName: 'Russian Twist',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/russian-twist-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/russian-twist-peak.webp',
  },
  'ab-wheel-rollout': {
    repdbId: 'ab-wheel-rollout',
    upstreamName: 'Ab Wheel Rollout',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/ab-wheel-rollout-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/ab-wheel-rollout-peak.webp',
  },
  'back-extension': {
    repdbId: 'back-extension',
    upstreamName: 'Back Extension',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/back-extension-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/back-extension-peak.webp',
  },
  'back-squat': {
    repdbId: 'squat',
    upstreamName: 'Barbell Back Squat',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/squat-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/squat-peak.webp',
  },
  'front-squat': {
    repdbId: 'front-squat',
    upstreamName: 'Front Squat',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/front-squat-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/front-squat-peak.webp',
  },
  'goblet-squat': {
    repdbId: 'goblet-squat',
    upstreamName: 'Goblet Squat',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/goblet-squat-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/goblet-squat-peak.webp',
  },
  'leg-press': {
    repdbId: 'leg-press',
    upstreamName: 'Leg Press',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/leg-press-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/leg-press-peak.webp',
  },
  'bulgarian-split-squat': {
    repdbId: 'bulgarian-split-squat',
    upstreamName: 'Bulgarian Split Squat',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/bulgarian-split-squat-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/bulgarian-split-squat-peak.webp',
  },
  'step-up': {
    repdbId: 'step-ups',
    upstreamName: 'Step Ups',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/step-ups-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/step-ups-peak.webp',
  },
  'leg-extension': {
    repdbId: 'leg-extension',
    upstreamName: 'Leg Extension',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/leg-extension-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/leg-extension-peak.webp',
  },
  'conventional-deadlift': {
    repdbId: 'deadlift',
    upstreamName: 'Barbell Deadlift',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/deadlift-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/deadlift-peak.webp',
  },
  'romanian-deadlift': {
    repdbId: 'romanian-deadlift',
    upstreamName: 'Romanian Deadlift',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/romanian-deadlift-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/romanian-deadlift-peak.webp',
  },
  'hip-thrust': {
    repdbId: 'hip-thrust',
    upstreamName: 'Barbell Hip Thrust',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/hip-thrust-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/hip-thrust-peak.webp',
  },
  'glute-bridge': {
    repdbId: 'glute-bridge',
    upstreamName: 'Glute Bridge',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/glute-bridge-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/glute-bridge-peak.webp',
  },
  'lying-leg-curl': {
    repdbId: 'leg-curl',
    upstreamName: 'Lying Leg Curl',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/leg-curl-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/leg-curl-peak.webp',
  },
  'good-morning': {
    repdbId: 'good-morning',
    upstreamName: 'Good Morning',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/good-morning-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/good-morning-peak.webp',
  },
  'kettlebell-swing': {
    repdbId: 'kettlebell-swing',
    upstreamName: 'Kettlebell Swing',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/kettlebell-swing-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/kettlebell-swing-peak.webp',
  },
  'single-leg-romanian-deadlift': {
    repdbId: 'single-leg-romanian-deadlift',
    upstreamName: 'Single Leg Romanian Deadlift',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/single-leg-romanian-deadlift-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/single-leg-romanian-deadlift-peak.webp',
  },
  'sumo-deadlift': {
    repdbId: 'sumo-deadlift',
    upstreamName: 'Sumo Deadlift',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/sumo-deadlift-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/sumo-deadlift-peak.webp',
  },
  'standing-calf-raise': {
    repdbId: 'standing-calf-raise',
    upstreamName: 'Standing Calf Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/standing-calf-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/standing-calf-raise-peak.webp',
  },
  'seated-calf-raise': {
    repdbId: 'seated-calf-raise',
    upstreamName: 'Seated Calf Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/seated-calf-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/seated-calf-raise-peak.webp',
  },
  'single-leg-calf-raise': {
    repdbId: 'single-leg-calf-raise',
    upstreamName: 'Single Leg Calf Raise',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/single-leg-calf-raise-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/single-leg-calf-raise-peak.webp',
  },
  'hip-abduction-machine': {
    repdbId: 'hip-abduction',
    upstreamName: 'Machine Hip Abduction',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/hip-abduction-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/hip-abduction-peak.webp',
  },
  'hip-adduction-machine': {
    repdbId: 'hip-adduction',
    upstreamName: 'Hip Adduction',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/hip-adduction-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/hip-adduction-peak.webp',
  },
  'cable-glute-kickback': {
    repdbId: 'cable-kickback',
    upstreamName: 'Cable Glute Kickback',
    src: 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main/images/flat/cable-kickback-peak.webp',
    sourceUrl:
      'https://github.com/RepDB/exercise-dataset/blob/main/images/flat/cable-kickback-peak.webp',
  },
}
