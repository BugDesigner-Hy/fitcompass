import fs from 'node:fs'

const exercisesSource = fs.readFileSync('src/data/exercises.ts', 'utf8')
const exerciseNames = exercisesSource
  .split(/\],\s*\[/)
  .map((block) => [...block.matchAll(/'([^']*)'/g)].map((match) => match[1]))
  .map((fields) => {
    const idIndex = fields.findIndex((field) =>
      /^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(field),
    )
    return idIndex === -1
      ? undefined
      : { id: fields[idIndex], nameEn: fields[idIndex + 2] }
  })
  .filter((exercise) => exercise?.nameEn)
const dataset = JSON.parse(fs.readFileSync('tmp/exercises.json', 'utf8'))

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const aliases = {
  'barbell-bench-press': 'barbell bench press',
  'incline-dumbbell-press': 'dumbbell incline bench press',
  'cable-chest-fly': 'cable standing fly',
  'parallel-bar-dip': 'chest dip',
  'lat-pulldown': 'cable lat pulldown full range of motion',
  'seated-cable-row': 'cable low seated row',
  'one-arm-dumbbell-row': 'dumbbell bent over row',
  'dumbbell-overhead-press': 'dumbbell standing overhead press',
  'barbell-overhead-press': 'barbell standing wide military press',
  'push-press': 'dumbbell push press',
  'reverse-fly': 'dumbbell one arm reverse fly (with support)',
  'upright-row': 'barbell upright row',
  'dumbbell-curl': 'dumbbell biceps curl',
  'hammer-curl': 'dumbbell alternate seated hammer curl',
  'preacher-curl': 'barbell preacher curl',
  'triceps-pushdown': 'cable triceps pushdown (v-bar)',
  'skull-crusher': 'barbell lying triceps extension',
  'close-grip-bench-press': 'barbell close-grip bench press',
  'overhead-triceps-extension': 'barbell standing overhead triceps extension',
  'forearm-wrist-curl': 'barbell wrist curl',
  'reverse-wrist-curl': 'barbell reverse wrist curl',
  'front-plank': 'weighted front plank',
  'side-plank': 'bodyweight incline side plank',
  'hanging-knee-raise': 'assisted hanging knee raise',
  'back-extension': 'hyperextension',
  'ab-wheel-rollout': 'barbell standing ab rollerout',
  'back-squat': 'barbell full squat',
  'goblet-squat': 'dumbbell goblet squat',
  'bulgarian-split-squat': 'barbell single leg split squat',
  'forward-lunge': 'barbell lunge',
  'step-up': 'barbell step-up',
  'leg-extension': 'lever leg extension',
  'romanian-deadlift': 'barbell romanian deadlift',
  'conventional-deadlift': 'barbell deadlift',
  'hip-thrust': 'barbell glute bridge',
  'glute-bridge': 'barbell glute bridge',
  'lying-leg-curl': 'lever lying leg curl',
  'single-leg-romanian-deadlift': 'barbell romanian deadlift',
  'sumo-deadlift': 'barbell sumo deadlift',
  'standing-calf-raise': 'barbell standing calf raise',
  'seated-calf-raise': 'lever seated calf raise',
  'single-leg-calf-raise': 'dumbbell single leg calf raise',
  'hip-abduction-machine': 'lever seated hip abduction',
  'hip-adduction-machine': 'lever seated hip adduction',
  'cable-glute-kickback': 'cable kickback',
}

const byName = new Map()
for (const exercise of dataset) {
  const key = normalize(exercise.name)
  if (!byName.has(key)) byName.set(key, exercise)
}

const commit = 'main'
const cdn = `https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@${commit}`
const records = {}
const unmatched = []

for (const exercise of exerciseNames) {
  const key = normalize(aliases[exercise.id] ?? exercise.nameEn)
  const source =
    exercise.id === 'leg-press'
      ? dataset.find(
          (item) =>
            /sled/i.test(item.name) &&
            /leg press/i.test(item.name) &&
            !/one leg|calf|pov/i.test(item.name),
        )
      : byName.get(key)
  if (!source?.gif_url) {
    unmatched.push(exercise.nameEn)
    continue
  }
  records[exercise.id] = {
    src: `${cdn}/${source.gif_url}`,
    stillSrc: source.image ? `${cdn}/${source.image}` : null,
    sourceUrl: `https://github.com/hasaneyldrm/exercises-dataset/blob/main/${source.gif_url}`,
    upstreamName: source.name,
  }
}

fs.writeFileSync(
  'src/data/datasetMotion.ts',
  `export interface DatasetMotion {\n  src: string\n  stillSrc: string | null\n  sourceUrl: string\n  upstreamName: string\n}\n\nexport const datasetMotionByExerciseId: Readonly<Record<string, DatasetMotion>> = ${JSON.stringify(records, null, 2)}\n`,
)

const structures = JSON.parse(fs.readFileSync('tmp/structures.json', 'utf8'))
const labels = {}
for (const structure of structures.filter((item) =>
  item.structureId.startsWith('STR-ESQ'),
)) {
  const concepts = structure.sourceConcepts ?? []
  const specific =
    concepts
      .filter((concept) =>
        /clavicle|scapula|humerus|radius|ulna|sternum|rib|vertebra|ilium|ischium|pubis|hip bone|sacrum|coccyx|femur|patella|tibia|fibula|talus/i.test(
          concept,
        ),
      )
      .sort((left, right) => left.length - right.length)[0] ?? ''
  if (specific) labels[structure.structureId] = specific
}

fs.writeFileSync(
  'src/features/body-map/skeletonLabels.ts',
  `export const skeletonLabels: Readonly<Record<string, string>> = ${JSON.stringify(labels, null, 2)}\n`,
)

console.log(
  `matched ${Object.keys(records).length}/${exerciseNames.length}; unmatched: ${unmatched.join(', ') || 'none'}`,
)
console.log(`skeleton labels ${Object.keys(labels).length}`)
