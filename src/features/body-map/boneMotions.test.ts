import { describe, expect, it } from 'vitest'
import { jointActionsForBone, motionSpecFor, samplePose } from './boneMotions'

describe('bone motions', () => {
  it('lists the joint actions that can move a selected bone', () => {
    const names = jointActionsForBone('humerus').map((action) => action.nameZh)

    expect(names).toContain('肩伸')
    expect(names).toContain('肩屈')
    expect(names).toContain('屈肘')
    expect(names).not.toContain('屈膝')
  })

  it('plays shoulder extension backward from the resting pose and returns', () => {
    const spec = motionSpecFor('shoulder-extension')
    if (!spec) throw new Error('missing shoulder extension')

    expect(samplePose(spec, 0).sagittal).toBe(0)
    expect(samplePose(spec, 0.5).sagittal).toBeGreaterThan(0.5)
    expect(samplePose(spec, 1).sagittal).toBe(0)
  })

  it('starts elbow extension from a flexed forearm', () => {
    const spec = motionSpecFor('elbow-extension')
    if (!spec) throw new Error('missing elbow extension')

    expect(samplePose(spec, 0.1).sagittal).toBeLessThan(-0.8)
    expect(samplePose(spec, 0.68).sagittal).toBeGreaterThan(-0.5)
  })
})
