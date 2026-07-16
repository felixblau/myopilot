// A passive, docked onboarding companion (bottom-left). Unlike a modal
// coachmark, it never dims the screen or blocks clicks — the user is free to
// explore the app and the card just rides along, narrating the next step.

interface CompanionProps {
  title: string
  body: string
  stepIndex: number // 0-based, for the pips
  stepCount: number
  onNext: () => void
  onPrev: () => void
  onDismiss: () => void
  nextLabel?: string
  canPrev: boolean
}

export default function Companion({
  title,
  body,
  stepIndex,
  stepCount,
  onNext,
  onPrev,
  onDismiss,
  nextLabel = 'Next',
  canPrev,
}: CompanionProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-[14px] shadow-2xl border border-[#e2e8f0] p-6 flex flex-col gap-3 transition-opacity">
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[#a0aec0] hover:bg-[#f7f8fc] hover:text-[#4a5568] transition-colors"
      >
        ✕
      </button>

      <h3 className="font-['Inter'] text-[18px] font-semibold text-[#00154f] pr-6">
        {title}
      </h3>
      <p className="font-['Source_Sans_3'] text-[14px] leading-[1.55] text-[#4a5568]">
        {body}
      </p>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className="rounded-[8px] px-4 py-2 text-[14px] font-medium font-['Inter'] border border-[#e2e8f0] text-[#4a5568] enabled:hover:bg-[#f7f8fc] transition-colors disabled:opacity-40 disabled:cursor-default"
        >
          Previous
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
          onClick={onNext}
          className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-4 py-2 text-[14px] font-medium text-white font-['Inter'] hover:opacity-90 transition-opacity"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}
