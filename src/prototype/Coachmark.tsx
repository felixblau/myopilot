import { useEffect, useLayoutEffect, useState, type RefObject } from 'react'

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

interface CoachmarkProps {
  targetRef: RefObject<HTMLElement | null>
  title: string
  body: string
  ctaLabel: string
  onCta: () => void
  onSkip: () => void
  stepIndex: number // 0-based, for the pips
  stepCount: number
  placement?: 'bottom' | 'top'
}

const PAD = 8 // spotlight padding around the target

export default function Coachmark({
  targetRef,
  title,
  body,
  ctaLabel,
  onCta,
  onSkip,
  stepIndex,
  stepCount,
  placement = 'bottom',
}: CoachmarkProps) {
  const [rect, setRect] = useState<Rect | null>(null)

  // Track the target's position; re-measure on scroll/resize so the
  // spotlight stays glued to it even as the page moves.
  useLayoutEffect(() => {
    const measure = () => {
      const el = targetRef.current
      if (!el) return setRect(null)
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [targetRef])

  // Small delay re-measure to catch layout settling after mount.
  useEffect(() => {
    const t = setTimeout(() => {
      const el = targetRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
      }
    }, 60)
    return () => clearTimeout(t)
  }, [targetRef])

  if (!rect) return null

  const spot = {
    top: rect.top - PAD,
    left: rect.left - PAD,
    width: rect.width + PAD * 2,
    height: rect.height + PAD * 2,
  }

  const cardWidth = 360
  const cardLeft = Math.min(
    Math.max(12, rect.left + rect.width / 2 - cardWidth / 2),
    window.innerWidth - cardWidth - 12,
  )
  const cardTop =
    placement === 'bottom' ? spot.top + spot.height + 14 : spot.top - 14

  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite">
      {/* Dim overlay with a spotlight cutout via a huge box-shadow. */}
      <div
        className="absolute rounded-[10px] transition-all duration-300 pointer-events-none"
        style={{
          top: spot.top,
          left: spot.left,
          width: spot.width,
          height: spot.height,
          boxShadow: '0 0 0 9999px rgba(0, 21, 79, 0.55)',
          outline: '2px solid #06c4f0',
        }}
      />

      {/* Tooltip card */}
      <div
        className="absolute bg-white rounded-[12px] shadow-2xl p-5 flex flex-col gap-3"
        style={{
          width: cardWidth,
          left: cardLeft,
          top: placement === 'bottom' ? cardTop : undefined,
          bottom:
            placement === 'top'
              ? window.innerHeight - cardTop
              : undefined,
        }}
      >
        <h3 className="font-['Inter'] text-[17px] font-semibold text-[#00154f]">
          {title}
        </h3>
        <p className="font-['Source_Sans_3'] text-[14px] leading-[1.5] text-[#4a5568]">
          {body}
        </p>
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onSkip}
            className="font-['Inter'] text-[13px] text-[#4a5568] hover:text-[#282b2b] transition-colors"
          >
            Skip tour
          </button>

          <div className="flex items-center gap-1.5" aria-hidden>
            {Array.from({ length: stepCount }).map((_, i) => (
              <span
                key={i}
                className="h-[5px] rounded-full transition-all"
                style={{
                  width: i === stepIndex ? 22 : 6,
                  background: i === stepIndex ? '#00154f' : '#cbd5e0',
                }}
              />
            ))}
          </div>

          <button
            onClick={onCta}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-4 py-2 text-[14px] font-medium text-white font-['Inter'] hover:opacity-90 transition-opacity"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
