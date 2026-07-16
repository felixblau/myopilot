import { createContext, useContext, useState, type ReactNode } from 'react'

// The designed 4-step onboarding sequence (see Figma "2. Onboarding").
// Steps advance on the REAL action (open patient, generate) so the tour
// teaches by doing; the companion also drives them via its button.
export type Step =
  | 'welcome' // intro on the patient list
  | 'openPatient' // nudge toward the seeded sample patient
  | 'summary' // patient summary: describes the view + generate report
  | 'report' // the payoff report: "ready to create your own?"
  | 'done' // tour finished

interface OnboardingState {
  step: Step
  active: boolean
  setStep: (s: Step) => void
  finish: () => void
}

const OnboardingCtx = createContext<OnboardingState | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('welcome')
  const [active, setActive] = useState(true)

  const finish = () => setActive(false)

  return (
    <OnboardingCtx.Provider value={{ step, active, setStep, finish }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx)
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider')
  return ctx
}
