import { useState, type ReactNode } from 'react'

// Docked onboarding companion — faithful to the Figma "0.1 Intro Modal"
// and its collapsed "Take a product tour" state. Never dims or blocks the app.
// The × collapses the card to a corner bar (it does not hard-dismiss the tour).

interface CompanionProps {
  title: string
  body: ReactNode
  stepIndex: number // 0-based
  stepCount: number
  buttonLabel: string
  onNext: () => void
  showBack: boolean
  onBack: () => void
  // Tailwind anchor classes placing the card near what the step discusses
  // (see Figma "2. Onboarding" — the modal repositions per step).
  positionClass: string
}

const PRIMARY = '#2a4c7c'
const SECONDARY = '#00aad4'

function Pips({ index, count }: { index: number; count: number }) {
  return (
    <div className="flex gap-2 items-center h-[10px]">
      {Array.from({ length: count }).map((_, i) => {
        if (i === index)
          return (
            <span
              key={i}
              className="h-[10px] w-[34px] rounded-full"
              style={{ background: PRIMARY }}
            />
          )
        if (i < index)
          return (
            <span
              key={i}
              className="h-[10px] w-[10px] rounded-full"
              style={{ background: SECONDARY }}
            />
          )
        return (
          <span
            key={i}
            className="h-[10px] w-[10px] rounded-full border border-[#d9d9d9]"
          />
        )
      })}
    </div>
  )
}

export default function Companion({
  title,
  body,
  stepIndex,
  stepCount,
  buttonLabel,
  onNext,
  showBack,
  onBack,
  positionClass,
}: CompanionProps) {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-6 left-6 z-50 w-[442px] max-w-[calc(100vw-3rem)] bg-white border rounded-[8px] p-6 flex items-center justify-between drop-shadow-[0px_8px_12px_rgba(0,0,0,0.1)] hover:bg-[#fafbfc] transition-colors"
        style={{ borderColor: PRIMARY }}
        aria-label="Expand product tour"
      >
        <span className="flex items-baseline gap-2">
          <span className="font-['Inter'] font-semibold text-[20px] leading-[1.25] text-[#191b1e]">
            Take a product tour
          </span>
          <span className="font-['Inter'] text-[14px] text-[#71717a]">
            3 mins.
          </span>
        </span>
        <ChevronUp />
      </button>
    )
  }

  return (
    <div
      className={`fixed z-50 w-[442px] max-w-[calc(100vw-3rem)] bg-white border rounded-[8px] p-6 flex flex-col gap-4 drop-shadow-[0px_8px_12px_rgba(0,0,0,0.1)] transition-[top,left,right,bottom] duration-500 ease-out ${positionClass}`}
      style={{ borderColor: PRIMARY }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={onBack} aria-label="Back" className="shrink-0">
              <ArrowLeft />
            </button>
          )}
          <h3 className="font-['Inter'] font-semibold text-[20px] leading-[1.25] text-[#191b1e]">
            {title}
          </h3>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          aria-label="Minimize"
          className="shrink-0 w-6 h-6 flex items-center justify-center text-[#2c1f45] hover:opacity-60 transition-opacity"
        >
          <Times />
        </button>
      </div>

      {/* Body */}
      <div className="font-['Inter'] text-[16px] leading-[1.5] text-[#71717a] w-full">
        {body}
      </div>

      {/* Footer: pips + button */}
      <div className="flex items-center justify-between w-full">
        <Pips index={stepIndex} count={stepCount} />
        <button
          onClick={onNext}
          className="h-[36px] px-3 rounded-[6px] flex items-center justify-center font-['Inter'] font-medium text-[14px] text-white hover:opacity-90 transition-opacity"
          style={{ background: PRIMARY }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

function ArrowLeft() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="text-[#191b1e]">
      <path d="M6 1L1 6l5 5M1 6h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Times() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#2c1f45]">
      <path d="M5 12l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
