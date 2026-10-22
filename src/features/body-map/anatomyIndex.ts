import type { BodyRegion } from '../../domain/anatomy'

export function mapMuscleConcept(concept: string): string | null {
  const name = concept.toLowerCase()

  if (name.includes('pectoralis major')) return 'pectoralis-major'
  if (name.includes('pectoralis minor')) return 'pectoralis-minor'
  if (name.includes('serratus anterior')) return 'serratus-anterior'
  if (name.includes('latissimus dorsi')) return 'latissimus-dorsi'
  if (name.includes('trapezius')) return 'trapezius'
  if (name.includes('rhomboid major')) return 'rhomboid-major'
  if (
    name.includes('iliocostalis') ||
    name.includes('longissimus') ||
    name.includes('spinalis')
  ) {
    return 'erector-spinae'
  }
  if (name.includes('clavicular part of deltoid')) return 'anterior-deltoid'
  if (name.includes('acromial part of deltoid')) return 'lateral-deltoid'
  if (name.includes('spinal part of deltoid')) return 'posterior-deltoid'
  if (name.includes('supraspinatus')) return 'supraspinatus'
  if (name.includes('infraspinatus')) return 'infraspinatus'
  if (name.includes('biceps brachii')) return 'biceps-brachii'
  if (name.includes('brachialis')) return 'brachialis'
  if (name.includes('brachioradialis')) return 'brachioradialis'
  if (name.includes('triceps brachii')) return 'triceps-brachii'
  if (name.includes('flexor carpi') || name.includes('palmaris longus')) {
    return 'wrist-flexors'
  }
  if (name.includes('extensor carpi')) return 'wrist-extensors'
  if (name.includes('rectus abdominis')) return 'rectus-abdominis'
  if (name.includes('external abdominal oblique')) return 'external-oblique'
  if (name.includes('internal abdominal oblique')) return 'internal-oblique'
  if (name.includes('transversus abdominis')) return 'transversus-abdominis'
  if (name.includes('gluteus maximus')) return 'gluteus-maximus'
  if (name.includes('gluteus medius')) return 'gluteus-medius'
  if (
    name.includes('adductor longus') ||
    name.includes('adductor brevis') ||
    name.includes('adductor magnus') ||
    name.includes('adductor minimus') ||
    name.includes('gracilis muscle') ||
    name.includes('pectineus')
  ) {
    return 'hip-adductors'
  }
  if (name.includes('iliacus') || name.includes('psoas major')) {
    return 'iliopsoas'
  }
  if (name.includes('tensor fasciae latae')) return 'tensor-fasciae-latae'
  if (name.includes('rectus femoris')) return 'rectus-femoris'
  if (name.includes('vastus lateralis')) return 'vastus-lateralis'
  if (name.includes('vastus medialis')) return 'vastus-medialis'
  if (name.includes('biceps femoris')) return 'biceps-femoris'
  if (name.includes('semitendinosus')) return 'semitendinosus'
  if (name.includes('semimembranosus')) return 'semimembranosus'
  if (name.includes('gastrocnemius')) return 'gastrocnemius'
  if (name.includes('soleus')) return 'soleus'
  if (name.includes('tibialis anterior')) return 'tibialis-anterior'
  return null
}

export function mapBoneLabel(label: string): string | null {
  const name = label.toLowerCase()

  if (/\bclavicle\b/.test(name)) return 'clavicle'
  if (/\bscapula\b/.test(name)) return 'scapula'
  if (/\bhumerus\b/.test(name)) return 'humerus'
  if (/\bradius\b/.test(name)) return 'radius'
  if (/\bulna\b/.test(name)) return 'ulna'
  if (/\bsternum\b/.test(name)) return 'sternum'
  if (/\bribs?\b/.test(name)) return 'ribs'
  if (/\b(ilium|ischium|pubis|hip bone|sacrum|coccyx)\b/.test(name)) {
    return 'pelvis'
  }
  if (/\bfemur\b/.test(name)) return 'femur'
  if (/\bpatella\b/.test(name)) return 'patella'
  if (/\btibia\b/.test(name)) return 'tibia'
  if (/\bfibula\b/.test(name)) return 'fibula'
  if (/\btalus\b/.test(name)) return 'talus'
  if (/\bvertebra(?:e|l)?\b/.test(name)) return 'vertebral-column'
  return null
}

const backMuscles = new Set([
  'latissimus-dorsi',
  'trapezius',
  'rhomboid-major',
  'erector-spinae',
  'posterior-deltoid',
  'infraspinatus',
  'supraspinatus',
  'triceps-brachii',
  'gluteus-maximus',
  'gluteus-medius',
  'biceps-femoris',
  'semitendinosus',
  'semimembranosus',
  'gastrocnemius',
  'soleus',
])

export function preferredMuscleView(muscleId: string): 'front' | 'back' {
  return backMuscles.has(muscleId) ? 'back' : 'front'
}

export const anatomyRegions = [
  { id: 'chest', label: '胸', bodyRegions: ['chest', 'trunk'] },
  { id: 'back', label: '背', bodyRegions: ['back', 'trunk'] },
  { id: 'shoulders', label: '肩', bodyRegions: ['shoulders'] },
  { id: 'arms', label: '手臂', bodyRegions: ['arms'] },
  { id: 'core', label: '核心', bodyRegions: ['core', 'trunk'] },
  { id: 'hips', label: '髋臀', bodyRegions: ['hips'] },
  { id: 'legs', label: '腿', bodyRegions: ['thighs', 'lower-legs'] },
] as const satisfies ReadonlyArray<{
  id: string
  label: string
  bodyRegions: readonly BodyRegion[]
}>

export type AnatomyRegionId = (typeof anatomyRegions)[number]['id']
export type AnatomyFocus = 'all' | AnatomyRegionId

export function anatomyFocusMembers<
  T extends { id: string; bodyRegion: BodyRegion },
>(focus: AnatomyFocus, entities: readonly T[]): readonly T[] | null {
  if (focus === 'all') return null
  const region = anatomyRegions.find((item) => item.id === focus)
  if (!region) return null
  const allowed = new Set<BodyRegion>(region.bodyRegions)
  return entities.filter((entity) => allowed.has(entity.bodyRegion))
}
