import { createContext, useContext, useState, type ReactNode } from 'react'

// The onboarding walks the user across the value path. Steps advance on the
// REAL action (open patient, hit generate) so the tour teaches by doing.
export type Step =
  | 'welcome' // intro card; purpose of MyoPilot
  | 'openPatient' // nudge toward the seeded sample patient
  | 'reviewMeasurements' // measurements are pre-filled; review/continue
  | 'generate' // nudge toward Generate Report
  | 'report' // final: "this is the payoff — add your own"
  | 'done' // companion dismissed / finished

interface OnboardingState {
  step: Step
  active: boolean
  setStep: (s: Step) => void
  dismiss: () => void
}

const OnboardingCtx = createContext<OnboardingState | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('welcome')
  const [active, setActive] = useState(true)

  const dismiss = () => setActive(false)

  return (
    <OnboardingCtx.Provider value={{ step, active, setStep, dismiss }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
