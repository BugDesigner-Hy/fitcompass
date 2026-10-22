import { useEffect, useRef, useState } from 'react'
import type { ExerciseMotionMedia } from '../../data/exerciseMedia'

function getPrefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getPrefersReducedMotion,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(query.matches)
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return prefersReducedMotion
}

export function ExerciseMedia({
  exerciseName,
  media,
  compact = false,
  showCredit = true,
}: {
  exerciseName: string
  media: ExerciseMotionMedia | null
  compact?: boolean
  showCredit?: boolean
}) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const previousReducedMotion = useRef(prefersReducedMotion)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const visibleSrc =
    media?.kind === 'gif' && prefersReducedMotion && media.stillSrc
      ? media.stillSrc
      : media?.src
  const mediaFailed = Boolean(media && visibleSrc && failedSrc === visibleSrc)
  const showingLicensedStill = Boolean(
    media?.kind === 'gif' &&
    prefersReducedMotion &&
    media.stillLicense &&
    media.stillSrc,
  )
  const credit =
    media?.kind === 'gif' && showingLicensedStill
      ? {
          author: media.stillAuthor ?? media.author,
          license: media.stillLicense ?? media.license,
          licenseUrl: media.stillLicenseUrl ?? media.licenseUrl,
          sourceUrl: media.stillSourceUrl ?? media.sourceUrl,
        }
      : media

  useEffect(() => {
    if (previousReducedMotion.current === prefersReducedMotion) return
    previousReducedMotion.current = prefersReducedMotion

    const video = videoRef.current
    if (!video) return

    if (prefersReducedMotion) {
      video.pause()
      return
    }

    void video.play().catch(() => undefined)
  }, [prefersReducedMotion])

  if (!media || mediaFailed || !visibleSrc) {
    return (
      <div
        aria-label={`${exerciseName}动作演示`}
        className="exercise-media exercise-media--fallback"
        data-testid="exercise-media-fallback"
        role="img"
      >
        <strong>{mediaFailed ? '动作演示加载失败' : '暂无动作动图'}</strong>
        {!compact && <span>动作步骤仍可在下方查看</span>}
      </div>
    )
  }

  return (
    <figure
      className={`exercise-media${compact ? ' exercise-media--compact' : ''}`}
    >
      {media.kind === 'gif' ? (
        <img
          alt={`${exerciseName}动作演示`}
          onError={() => setFailedSrc(visibleSrc ?? null)}
          src={visibleSrc}
        />
      ) : (
        <video
          ref={videoRef}
          aria-label={`${exerciseName}动作演示`}
          autoPlay={!prefersReducedMotion}
          controls={prefersReducedMotion}
          loop
          muted
          onError={() => setFailedSrc(visibleSrc ?? null)}
          playsInline
          preload={compact ? 'metadata' : 'auto'}
        >
          <source src={media.src} type={media.mimeType} />
          你的浏览器无法播放此动作视频。
        </video>
      )}
      <span className="motion-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        {!compact && <span>演示中</span>}
      </span>
      {showCredit ? (
        <figcaption
          className={compact ? 'exercise-media__credit--compact' : ''}
        >
          {!compact && <span>动作演示</span>}
          <small>
            来源：{credit?.author} ·{' '}
            <a href={credit?.licenseUrl} rel="noreferrer" target="_blank">
              {credit?.license}
            </a>
            {' · '}
            <a href={credit?.sourceUrl} rel="noreferrer" target="_blank">
              {compact ? '媒体来源' : '查看媒体来源'}
            </a>
          </small>
        </figcaption>
      ) : null}
    </figure>
  )
}
