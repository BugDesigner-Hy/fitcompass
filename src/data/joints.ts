import type { Joint } from '../domain/anatomy'

const jointSeeds: Array<Omit<Joint, 'sourceIds' | 'reviewStatus'>> = [
  {
    id: 'shoulder',
    nameZh: '肩关节',
    nameEn: 'Shoulder joint',
    bodyRegion: 'shoulders',
    boneIds: ['clavicle', 'scapula', 'humerus'],
  },
  {
    id: 'elbow',
    nameZh: '肘关节',
    nameEn: 'Elbow joint',
    bodyRegion: 'arms',
    boneIds: ['humerus', 'radius', 'ulna'],
  },
  {
    id: 'trunk',
    nameZh: '躯干关节复合体',
    nameEn: 'Trunk joint complex',
    bodyRegion: 'trunk',
    boneIds: ['sternum', 'ribs', 'vertebral-column', 'pelvis'],
  },
  {
    id: 'hip',
    nameZh: '髋关节',
    nameEn: 'Hip joint',
    bodyRegion: 'hips',
    boneIds: ['pelvis', 'femur'],
  },
  {
    id: 'knee',
    nameZh: '膝关节',
    nameEn: 'Knee joint',
    bodyRegion: 'thighs',
    boneIds: ['femur', 'patella', 'tibia', 'fibula'],
  },
  {
    id: 'ankle',
    nameZh: '踝关节',
    nameEn: 'Ankle joint',
    bodyRegion: 'lower-legs',
    boneIds: ['tibia', 'fibula', 'talus'],
  },
]

export const joints: Joint[] = jointSeeds.map((joint) => ({
  ...joint,
  sourceIds: ['project-editorial'],
  reviewStatus: 'draft',
}))
