import type { ExerciseMotionMedia } from '../../data/exerciseMedia'

export function ExerciseMedia({
  exerciseName,
  media,
  compact = false,
}: {
  exerciseName: string
  media: ExerciseMotionMedia | null
  compact?: boolean
}) {
  if (!media) {
    return (
      <div
        className="exercise-media exercise-media--fallback"
        data-testid="exercise-media-fallback"
      >
        <strong>暂无授权动图</strong>
        {!compact && <span>动作步骤仍可在下方查看</span>}
      </div>
    )
  }

  return (
    <figure
      className={`exercise-media${compact ? ' exercise-media--compact' : ''}`}
    >
      <video
        aria-label={`${exerciseName}动作演示`}
        autoPlay
        loop
        muted
        playsInline
        preload={compact ? 'metadata' : 'auto'}
      >
        <source src={media.src} type={media.mimeType} />
        你的浏览器无法播放此动作视频。
      </video>
      <figcaption className={compact ? 'exercise-media__credit--compact' : ''}>
        {!compact && <span>循环动作演示</span>}
        <small>
          作者：{media.author} ·{' '}
          <a href={media.licenseUrl} rel="noreferrer" target="_blank">
            {media.license}
          </a>
          {' · '}
          <a href={media.sourceUrl} rel="noreferrer" target="_blank">
            {compact ? '媒体来源' : '查看媒体来源'}
          </a>
        </small>
      </figcaption>
    </figure>
  )
}
