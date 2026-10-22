import fs from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bones } from '../../data/bones'
import { muscles } from '../../data/muscles'
import {
  anatomyFocusMembers,
  mapBoneLabel,
  mapMuscleConcept,
  preferredMuscleView,
} from './anatomyIndex'
import { skeletonLabels } from './skeletonLabels'

function readGlb(path: string) {
  const buffer = fs.readFileSync(path)
  const jsonLength = buffer.readUInt32LE(12)
  return JSON.parse(buffer.subarray(20, 20 + jsonLength).toString()) as {
    nodes: Array<{ extras?: { concept?: string; structureId?: string } }>
  }
}

describe('anatomy model mapping', () => {
  it('connects every seeded muscle to at least one real mesh', () => {
    const model = readGlb('public/models/muscles.glb')
    const represented = new Set(
      model.nodes
        .map((node) => mapMuscleConcept(node.extras?.concept ?? ''))
        .filter((id): id is string => id !== null),
    )

    muscles.forEach((muscle) => expect(represented).toContain(muscle.id))
  })

  it('connects every seeded bone to at least one skeleton mesh', () => {
    const model = readGlb('public/models/skeleton.glb')
    const represented = new Set(
      model.nodes
        .map((node) =>
          mapBoneLabel(skeletonLabels[node.extras?.structureId ?? ''] ?? ''),
        )
        .filter((id): id is string => id !== null),
    )

    bones.forEach((bone) => expect(represented).toContain(bone.id))
  })

  it('turns the model to the back for posterior muscles', () => {
    expect(preferredMuscleView('trapezius')).toBe('back')
    expect(preferredMuscleView('pectoralis-major')).toBe('front')
  })

  it('keeps the whole catalogue when the view is not limited to a region', () => {
    expect(anatomyFocusMembers('all', muscles)).toBeNull()
  })

  it('groups muscles into broad body regions', () => {
    const legs = anatomyFocusMembers('legs', muscles)?.map(
      (muscle) => muscle.id,
    )
    expect(legs).toContain('rectus-femoris')
    expect(legs).toContain('gastrocnemius')
    expect(legs).not.toContain('pectoralis-major')

    const shoulders = anatomyFocusMembers('shoulders', muscles)?.map(
      (muscle) => muscle.id,
    )
    expect(shoulders).toEqual([
      'anterior-deltoid',
      'lateral-deltoid',
      'posterior-deltoid',
      'supraspinatus',
      'infraspinatus',
    ])

    const chest = anatomyFocusMembers('chest', muscles)?.map(
      (muscle) => muscle.id,
    )
    expect(chest).toEqual([
      'pectoralis-major',
      'pectoralis-minor',
      'serratus-anterior',
    ])
  })

  it('uses the trunk bones for chest, back, and core views', () => {
    expect(anatomyFocusMembers('chest', bones)?.map((bone) => bone.id)).toEqual(
      ['sternum', 'ribs', 'vertebral-column'],
    )
    expect(anatomyFocusMembers('legs', bones)?.map((bone) => bone.id)).toEqual([
      'femur',
      'patella',
      'tibia',
      'fibula',
      'talus',
    ])
  })
})
