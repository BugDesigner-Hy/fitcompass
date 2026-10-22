/** Surface regions from Body Muscles, mapped onto this app's muscle ids. */
const outlineToMuscle: Record<string, string> = {
  'chest-upper-left': 'pectoralis-major',
  'chest-upper-right': 'pectoralis-major',
  'chest-lower-left': 'pectoralis-major',
  'chest-lower-right': 'pectoralis-major',
  'serratus-anterior-left': 'serratus-anterior',
  'serratus-anterior-right': 'serratus-anterior',
  'shoulder-front-left': 'anterior-deltoid',
  'shoulder-front-right': 'anterior-deltoid',
  'shoulder-side-left': 'lateral-deltoid',
  'shoulder-side-right': 'lateral-deltoid',
  'biceps-left': 'biceps-brachii',
  'biceps-right': 'biceps-brachii',
  'forearm-left': 'wrist-flexors',
  'forearm-right': 'wrist-flexors',
  'forearm-flexors-left': 'wrist-flexors',
  'forearm-flexors-right': 'wrist-flexors',
  'abs-upper-left': 'rectus-abdominis',
  'abs-upper-right': 'rectus-abdominis',
  'abs-lower-left': 'rectus-abdominis',
  'abs-lower-right': 'rectus-abdominis',
  'obliques-left': 'external-oblique',
  'obliques-right': 'external-oblique',
  'quads-left': 'rectus-femoris',
  'quads-right': 'rectus-femoris',
  'adductors-left': 'hip-adductors',
  'adductors-right': 'hip-adductors',
  'tibialis-anterior-left': 'tibialis-anterior',
  'tibialis-anterior-right': 'tibialis-anterior',
  'hip-flexor-left': 'iliopsoas',
  'hip-flexor-right': 'iliopsoas',
  'traps-upper-left': 'trapezius',
  'traps-mid-left': 'trapezius',
  'traps-lower-left': 'trapezius',
  'traps-upper-right': 'trapezius',
  'traps-mid-right': 'trapezius',
  'traps-lower-right': 'trapezius',
  'deltoid-rear-left': 'posterior-deltoid',
  'deltoid-rear-right': 'posterior-deltoid',
  'lats-upper-left': 'latissimus-dorsi',
  'lats-mid-left': 'latissimus-dorsi',
  'lats-lower-left': 'latissimus-dorsi',
  'lats-upper-right': 'latissimus-dorsi',
  'lats-mid-right': 'latissimus-dorsi',
  'lats-lower-right': 'latissimus-dorsi',
  'lower-back-erectors-left': 'erector-spinae',
  'lower-back-erectors-right': 'erector-spinae',
  'lower-back-ql-left': 'erector-spinae',
  'lower-back-ql-right': 'erector-spinae',
  spine: 'erector-spinae',
  'gluteus-medius-left': 'gluteus-medius',
  'gluteus-medius-right': 'gluteus-medius',
  'gluteus-maximus-left': 'gluteus-maximus',
  'gluteus-maximus-right': 'gluteus-maximus',
  'hamstrings-medial-left': 'semitendinosus',
  'hamstrings-medial-right': 'semitendinosus',
  'hamstrings-lateral-left': 'biceps-femoris',
  'hamstrings-lateral-right': 'biceps-femoris',
  'triceps-long-left': 'triceps-brachii',
  'triceps-lateral-left': 'triceps-brachii',
  'triceps-long-right': 'triceps-brachii',
  'triceps-lateral-right': 'triceps-brachii',
  'forearm-extensors-left': 'wrist-extensors',
  'forearm-extensors-right': 'wrist-extensors',
  'calves-gastroc-medial-left': 'gastrocnemius',
  'calves-gastroc-lateral-left': 'gastrocnemius',
  'calves-gastroc-medial-right': 'gastrocnemius',
  'calves-gastroc-lateral-right': 'gastrocnemius',
  'calves-soleus-left': 'soleus',
  'calves-soleus-right': 'soleus',
}

/** Deeper muscles that share a visible outline region. */
const extraOutlineIds: Record<string, readonly string[]> = {
  'pectoralis-minor': [
    'chest-upper-left',
    'chest-upper-right',
    'chest-lower-left',
    'chest-lower-right',
  ],
  'rhomboid-major': ['traps-mid-left', 'traps-mid-right'],
  supraspinatus: ['traps-upper-left', 'traps-upper-right'],
  infraspinatus: ['deltoid-rear-left', 'deltoid-rear-right'],
  brachialis: ['biceps-left', 'biceps-right'],
  brachioradialis: [
    'forearm-flexors-left',
    'forearm-flexors-right',
    'forearm-extensors-left',
    'forearm-extensors-right',
  ],
  'internal-oblique': ['obliques-left', 'obliques-right'],
  'transversus-abdominis': [
    'abs-upper-left',
    'abs-upper-right',
    'abs-lower-left',
    'abs-lower-right',
  ],
  'vastus-lateralis': ['quads-left', 'quads-right'],
  'vastus-medialis': ['quads-left', 'quads-right'],
  semimembranosus: ['hamstrings-medial-left', 'hamstrings-medial-right'],
}

const outlineIdsByMuscle = new Map<string, string[]>()

for (const [outlineId, muscleId] of Object.entries(outlineToMuscle)) {
  const ids = outlineIdsByMuscle.get(muscleId) ?? []
  ids.push(outlineId)
  outlineIdsByMuscle.set(muscleId, ids)
}

for (const [muscleId, outlineIds] of Object.entries(extraOutlineIds)) {
  const ids = outlineIdsByMuscle.get(muscleId) ?? []
  outlineIdsByMuscle.set(muscleId, [...ids, ...outlineIds])
}

const muscleIdsByOutline = new Map<string, string[]>()

for (const [muscleId, outlineIds] of outlineIdsByMuscle) {
  for (const outlineId of outlineIds) {
    const ids = muscleIdsByOutline.get(outlineId) ?? []
    ids.push(muscleId)
    muscleIdsByOutline.set(outlineId, ids)
  }
}

export function muscleIdForOutline(outlineId: string) {
  return outlineToMuscle[outlineId] ?? null
}

export function outlineIdsForMuscle(muscleId: string) {
  return outlineIdsByMuscle.get(muscleId) ?? []
}

export function muscleIdsForOutline(outlineId: string) {
  return muscleIdsByOutline.get(outlineId) ?? []
}
