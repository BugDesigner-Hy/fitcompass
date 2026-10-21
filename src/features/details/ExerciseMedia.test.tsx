import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ExerciseMotionMedia } from '../../data/exerciseMedia'
import { ExerciseMedia } from './ExerciseMedia'

const licensedVideo = {
  kind: 'video' as const,
  src: 'https://wger.de/media/exercise-video/example.MP4',
  mimeType: 'video/mp4',
  author: 'Goulart',
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  sourceUrl: 'https://wger.de/api/v2/video/23/',
} satisfies ExerciseMotionMedia

describe('ExerciseMedia', () => {
  it('renders licensed motion media as a muted looping inline video', () => {
    const { container } = render(
      <ExerciseMedia exerciseName="杠铃卧推" media={licensedVideo} />,
    )

    const video = container.querySelector('video')
    expect(video).toHaveAttribute('autoplay')
    expect(video).toHaveAttribute('loop')
    expect(video).toHaveProperty('muted', true)
    expect(video).toHaveAttribute('playsinline')
    expect(video).toHaveAccessibleName('杠铃卧推动作演示')
    expect(video?.querySelector('source')).toHaveAttribute(
      'src',
      licensedVideo.src,
    )
  })

  it('shows media attribution beside the demonstration', () => {
    render(<ExerciseMedia exerciseName="杠铃卧推" media={licensedVideo} />)

    expect(screen.getByText(/Goulart/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute(
      'href',
      licensedVideo.licenseUrl,
    )
    expect(screen.getByRole('link', { name: '查看媒体来源' })).toHaveAttribute(
      'href',
      licensedVideo.sourceUrl,
    )
  })

  it('keeps author, source, and license visible in compact mode', () => {
    render(
      <ExerciseMedia compact exerciseName="杠铃卧推" media={licensedVideo} />,
    )

    expect(screen.getByText(/Goulart/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute(
      'href',
      licensedVideo.licenseUrl,
    )
    expect(screen.getByRole('link', { name: '媒体来源' })).toHaveAttribute(
      'href',
      licensedVideo.sourceUrl,
    )
  })

  it('uses an honest fallback and never renders a stick-figure SVG', () => {
    const { container } = render(
      <ExerciseMedia exerciseName="深蹲" media={null} />,
    )

    expect(screen.getByText('暂无授权动图')).toBeInTheDocument()
    expect(screen.getByText('动作步骤仍可在下方查看')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect(container.querySelector('video')).not.toBeInTheDocument()
  })
})
