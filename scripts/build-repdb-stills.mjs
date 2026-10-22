import fs from 'node:fs'

const catalogPath = 'tmp/repdb-exercises.json'
if (!fs.existsSync(catalogPath)) {
  throw new Error(
    'Missing tmp/repdb-exercises.json. Download it from https://github.com/RepDB/exercise-dataset and do not commit the catalog.',
  )
}

const exercisesSource = fs.readFileSync('src/data/exercises.ts', 'utf8')
const ours = [
  ...exercisesSource.matchAll(
    /\n\s{2}\[\n\s+'([^']+)',\n\s+'[^']+',\n\s+'([^']+)',/g,
  ),
].map((match) => ({ id: match[1], nameEn: match[2] }))

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
const byId = new Map(
  catalog.exercises.map((exercise) => [exercise.id, exercise]),
)
const byName = new Map()
for (const exercise of catalog.exercises) {
  const key = normalize(exercise.name_en)
  if (!byName.has(key)) byName.set(key, exercise)
}

const aliases = {
  'cable-chest-fly': 'cable-fly',
  'parallel-bar-dip': 'dips',
  'chin-up': 'chin-ups',
  'barbell-row': 'barbell-row',
  'one-arm-dumbbell-row': 'single-arm-db-row',
  'face-pull': 'face-pull',
  'dumbbell-overhead-press': 'dumbbell-shoulder-press',
  'reverse-fly': 'dumbbell-reverse-fly',
  'upright-row': 'upright-row',
  'dumbbell-curl': 'bicep-curl',
  'hammer-curl': 'hammer-curl',
  'triceps-pushdown': 'tricep-pushdown',
  'skull-crusher': 'skull-crusher',
  'overhead-triceps-extension': 'overhead-tricep-extension',
  'forearm-wrist-curl': 'dumbbell-wrist-curl',
  'reverse-wrist-curl': 'db-reverse-wrist-curl',
  'front-plank': 'plank',
  crunch: 'crunches',
  'reverse-crunch': 'reverse-crunches',
  'front-squat': 'front-squat',
  'step-up': 'step-ups',
  'conventional-deadlift': 'deadlift',
  'good-morning': 'good-morning',
  'hip-abduction-machine': 'hip-abduction',
  'hip-adduction-machine': 'hip-adduction',
}

const cdn = 'https://cdn.jsdelivr.net/gh/RepDB/exercise-dataset@main'
const records = {}
const unmatched = []

for (const exercise of ours) {
  const upstream =
    (aliases[exercise.id] && byId.get(aliases[exercise.id])) ||
    byName.get(normalize(exercise.nameEn))
  if (!upstream) {
    unmatched.push(`${exercise.id} | ${exercise.nameEn}`)
    continue
  }
  const flat = upstream.images?.flat ?? {}
  const relative = flat.peak ?? flat.main ?? flat.start
  if (!relative || relative.startsWith('premium-samples/')) {
    unmatched.push(`${exercise.id} | ${exercise.nameEn}`)
    continue
  }
  records[exercise.id] = {
    repdbId: upstream.id,
    upstreamName: upstream.name_en,
    src: `${cdn}/${relative}`,
    sourceUrl: `https://github.com/RepDB/exercise-dataset/blob/main/${relative}`,
  }
}

const body = Object.entries(records)
  .map(([id, record]) => {
    return `  '${id}': {
    repdbId: '${record.repdbId}',
    upstreamName: '${record.upstreamName.replaceAll("'", "\\'")}',
    src: '${record.src}',
    sourceUrl: '${record.sourceUrl}',
  },`
  })
  .join('\n')

const output = `export interface RepdbStill {
  repdbId: string
  upstreamName: string
  src: string
  sourceUrl: string
}

export const repdbStillsByExerciseId: Readonly<
  Record<string, RepdbStill>
> = {
${body}
}
`

fs.writeFileSync('src/data/repdbStills.ts', output)
console.log(`matched ${Object.keys(records).length}/${ours.length}`)
console.log(unmatched.join('\n'))

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}
