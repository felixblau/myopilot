import { useRef, useState } from 'react'
import { OnboardingProvider, useOnboarding, type Step } from './OnboardingContext'
import Companion from './Companion'
import AppChrome from './AppChrome'
import Dashboard from './Dashboard'
import PatientSummary from './PatientSummary'
import Measurements from './Measurements'
import Report from '../components/report/Report'
import { samplePatient } from './sampleData'

type View = 'dashboard' | 'summary' | 'measurements' | 'report'

// The narrated sequence drives the pips and Prev/Next.
const SEQUENCE: Step[] = ['welcome', 'openPatient', 'summary', 'report']

// Copy transcribed verbatim from the Figma onboarding frames.
const COPY: Record<
  Exclude<Step, 'done'>,
  { title: string; body: React.ReactNode; button: string; back: boolean }
> = {
  welcome: {
    title: 'Welcome to Myopilot',
    body: 'MyoPilot turns a few eye measurements into a clear, patient-ready report on myopia risk and progression — the kind you can walk a parent through. Let’s see how, using a sample patient we’ve added for you.',
    button: 'Show me',
    back: false,
  },
  openPatient: {
    title: 'Open the sample patient',
    body: (
      <>
        <p className="mb-4">
          We have added a sample patient, “JANE DOE”, to your patient list.
          We’ve already pre-entered realistic sample values for this sample
          patient.
        </p>
        <p>
          <span className="font-semibold text-[#191b1e]">
            Click the patient record
          </span>{' '}
          to see the patient’s summary and generate a report.
        </p>
      </>
    ),
    button: 'Next',
    back: true,
  },
  summary: {
    title: 'The patient summary',
    body: (
      <>
        <p className="mb-4">
          Each of your patients has a summary like this, showing a risk score,
          hyperopic reserve, a progression and projection chart, and more. It’s
          all driven by their measurements.
        </p>
        <p>
          When you’re ready, hit{' '}
          <span className="font-semibold text-[#191b1e]">Generate report</span>{' '}
          to turn this patient’s data into a shareable report you can use to
          guide treatment conversations.
        </p>
      </>
    ),
    button: 'Next',
    back: true,
  },
  report: {
    title: 'Easy, personalized reports',
    body: (
      <>
        <p className="mb-4">
          Imagine sharing reports like this one with the parents during the
          consult, and emailing a copy to them as a take home.
        </p>
        <p className="mb-4">
          These reports are easy to create, explains myopia in terms that are
          easy to understand, and ultimately helps convert families into
          patients.
        </p>
        <p>Ready to create your own?</p>
      </>
    ),
    button: 'Create patient',
    back: false,
  },
}

function Flow() {
  const { step, active, setStep, finish } = useOnboarding()
  const [view, setView] = useState<View>('dashboard')

  const sampleRowRef = useRef<HTMLTableRowElement | null>(null)
  const generateRef = useRef<HTMLButtonElement | null>(null)

  // Real actions drive navigation AND keep the companion in sync.
  const openSample = () => {
    setView('summary')
    if (active && (step === 'welcome' || step === 'openPatient'))
      setStep('summary')
  }
  const openMeasurements = () => setView('measurements')
  const generate = () => {
    setView('report')
    if (active) setStep('report')
  }
  const createPatient = () => {
    setView('dashboard')
    finish()
  }

  const idx = SEQUENCE.indexOf(step)

  const onNext = () => {
    if (step === 'welcome') return setStep('openPatient')
    if (step === 'openPatient') return openSample()
    if (step === 'summary') return generate()
    if (step === 'report') return createPatient()
  }
  const onBack = () => {
    if (step === 'openPatient') return setStep('welcome')
    if (step === 'summary') {
      setView('dashboard')
      return setStep('openPatient')
    }
  }

  const selected = view === 'dashboard' ? null : samplePatient.displayName

  const showCompanion = active && step !== 'done'
  const highlightGenerate = active && step === 'summary'

  return (
    <>
      {view === 'report' ? (
        <Report />
      ) : (
        <AppChrome selectedPatient={selected}>
          {view === 'dashboard' && (
            <Dashboard
              sampleRowRef={sampleRowRef}
              onOpenSample={openSample}
              highlightSampleRow={active && step === 'openPatient'}
            />
          )}
          {view === 'summary' && (
            <PatientSummary
              generateRef={generateRef}
              onGenerate={generate}
              onOpenMeasurements={openMeasurements}
              highlightGenerate={highlightGenerate}
            />
          )}
          {view === 'measurements' && (
            <Measurements
              generateRef={generateRef}
              onGenerate={generate}
              highlightGenerate={false}
            />
          )}
        </AppChrome>
      )}

      {showCompanion && (
        <Companion
          title={COPY[step].title}
          body={COPY[step].body}
          buttonLabel={COPY[step].button}
          showBack={COPY[step].back}
          onBack={onBack}
          stepIndex={idx}
          stepCount={SEQUENCE.length}
          onNext={onNext}
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
