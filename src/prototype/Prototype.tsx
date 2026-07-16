import { useRef, useState } from 'react'
import { OnboardingProvider, useOnboarding, type Step } from './OnboardingContext'
import Companion from './Companion'
import AppChrome from './AppChrome'
import Dashboard from './Dashboard'
import Measurements from './Measurements'
import Report from '../components/report/Report'
import { samplePatient } from './sampleData'

type View = 'dashboard' | 'measurements' | 'report'

// The narrated sequence. Order drives the pips and Prev/Next.
const SEQUENCE: Step[] = [
  'welcome',
  'openPatient',
  'reviewMeasurements',
  'generate',
  'report',
]

const COPY: Record<
  Step,
  { title: string; body: string; nextLabel?: string }
> = {
  welcome: {
    title: 'Welcome to MyoPilot',
    body: 'MyoPilot turns a few eye measurements into a clear, patient-ready report on myopia risk and progression — the kind you can walk a parent through. Let’s see how, using a sample patient we’ve added for you.',
    nextLabel: 'Show me',
  },
  openPatient: {
    title: 'Open the sample patient',
    body: 'We’ve added “Olivia Smith” to your list. Open her record to see the measurements behind a report — or explore the rest of the app first, this guide will wait.',
  },
  reviewMeasurements: {
    title: 'Measurements are pre-filled',
    body: 'We’ve entered realistic sample values across each tab — refraction, keratometry, and axial length. Edit any of them, or leave them as they are.',
  },
  generate: {
    title: 'Generate the report',
    body: 'When you’re ready, hit Generate Report to turn these measurements into a report you can use to guide treatment conversations.',
  },
  report: {
    title: 'This is what MyoPilot produces',
    body: 'Every patient you add gets a report like this. Ready to create your own?',
    nextLabel: 'Add a patient',
  },
  done: { title: '', body: '' },
}

function Flow() {
  const { step, active, setStep, dismiss } = useOnboarding()
  const [view, setView] = useState<View>('dashboard')

  const sampleRowRef = useRef<HTMLTableRowElement | null>(null)
  const addPatientRef = useRef<HTMLButtonElement | null>(null)
  const generateRef = useRef<HTMLButtonElement | null>(null)

  // Real actions drive navigation AND keep the companion in sync, so a user
  // who ignores the card and just clicks around is still narrated correctly.
  const openSample = () => {
    setView('measurements')
    if (active && (step === 'welcome' || step === 'openPatient'))
      setStep('reviewMeasurements')
  }
  const generate = () => {
    setView('report')
    if (active) setStep('report')
  }
  const backToDashboard = () => {
    setView('dashboard')
    setStep('done')
  }

  const idx = SEQUENCE.indexOf(step)

  // Companion's Next button: advance the narration, moving the view when the
  // step implies it (welcome/openPatient → measurements, generate → report).
  const onNext = () => {
    if (step === 'welcome') return setStep('openPatient')
    if (step === 'openPatient') return openSample()
    if (step === 'reviewMeasurements') return setStep('generate')
    if (step === 'generate') return generate()
    if (step === 'report') return backToDashboard()
  }
  const onPrev = () => {
    if (step === 'openPatient') return setStep('welcome')
    if (step === 'reviewMeasurements') {
      setView('dashboard')
      return setStep('openPatient')
    }
    if (step === 'generate') return setStep('reviewMeasurements')
    if (step === 'report') {
      setView('measurements')
      return setStep('generate')
    }
  }

  const selected =
    view === 'dashboard'
      ? null
      : `${samplePatient.firstName} ${samplePatient.lastName}`

  const showCompanion = active && step !== 'done'

  return (
    <>
      {view === 'report' ? (
        <Report />
      ) : (
        <AppChrome selectedPatient={selected}>
          {view === 'dashboard' && (
            <Dashboard
              sampleRowRef={sampleRowRef}
              addPatientRef={addPatientRef}
              onOpenSample={openSample}
              highlightSampleRow={active && step === 'openPatient'}
              highlightAddPatient={step === 'done'}
            />
          )}
          {view === 'measurements' && (
            <Measurements
              generateRef={generateRef}
              onGenerate={generate}
              highlightGenerate={active && step === 'generate'}
            />
          )}
        </AppChrome>
      )}

      {showCompanion && (
        <Companion
          title={COPY[step].title}
          body={COPY[step].body}
          nextLabel={COPY[step].nextLabel}
          stepIndex={idx}
          stepCount={SEQUENCE.length}
          canPrev={idx > 0}
          onNext={onNext}
          onPrev={onPrev}
          onDismiss={dismiss}
        />
      )}
    </>
  )
}

export default function Prototype() {
  return (
    <OnboardingProvider>
      <Flow />
    </OnboardingProvider>
  )
}
