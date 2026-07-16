import { createContext, useContext, useState, type ReactNode } from 'react'

// The onboarding walks the user across the value path. Steps advance on the
// REAL action (open patient, hit generate) so the tour teaches by doing.
export type Step =
  | 'dashboard' // point at the seeded sample patient row
  | 'measurements' // measurements are pre-filled; nudge to review/continue
  | 'generate' // point at Generate Report
  | 'report' // final: "this is the payoff — add your own"
  | 'done' // tour dismissed / finished

interface OnboardingState {
  step: Step
  active: boolean
  setStep: (s: Step) => void
  skip: () => void
}

const OnboardingCtx = createContext<OnboardingState | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('dashboard')
  const [active, setActive] = useState(true)

  const skip = () => setActive(false)

  return (
    <OnboardingCtx.Provider value={{ step, active, setStep, skip }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
