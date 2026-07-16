import { useRef, useState } from 'react'
import { OnboardingProvider, useOnboarding } from './OnboardingContext'
import Coachmark from './Coachmark'
import AppChrome from './AppChrome'
import Dashboard from './Dashboard'
import Measurements from './Measurements'
import Report from '../components/report/Report'
import { samplePatient } from './sampleData'

type View = 'dashboard' | 'measurements' | 'report'
const TOUR_STEPS = 3 // dashboard, measurements, generate (report has its own closer)

function Flow() {
  const { step, active, setStep, skip } = useOnboarding()
  const [view, setView] = useState<View>('dashboard')

  const sampleRowRef = useRef<HTMLTableRowElement | null>(null)
  const addPatientRef = useRef<HTMLButtonElement | null>(null)
  const generateRef = useRef<HTMLButtonElement | null>(null)

  const openSample = () => {
    setView('measurements')
    setStep('measurements')
  }
  const generate = () => {
    setView('report')
    setStep('report')
  }
  const restart = () => {
    setView('dashboard')
    setStep('done')
  }

  const selected =
    view === 'dashboard'
      ? null
      : `${samplePatient.firstName} ${samplePatient.lastName}`

  return (
    <>
      {view === 'report' ? (
        <div className="relative">
          <Report />
          {active && step === 'report' && (
            <ReportCloser onAddOwn={restart} onSkip={skip} />
          )}
        </div>
      ) : (
        <AppChrome selectedPatient={selected}>
          {view === 'dashboard' && (
            <Dashboard
              sampleRowRef={sampleRowRef}
              addPatientRef={addPatientRef}
              onOpenSample={openSample}
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

      {/* Coachmarks */}
      {active && step === 'dashboard' && view === 'dashboard' && (
        <Coachmark
          targetRef={sampleRowRef}
          title="Start with a sample patient"
          body="We've added a sample patient so you can see what MyoPilot produces. Open it to continue."
          ctaLabel="Open patient"
          onCta={openSample}
          onSkip={skip}
          stepIndex={0}
          stepCount={TOUR_STEPS}
        />
      )}

      {active && step === 'measurements' && view === 'measurements' && (
        <Coachmark
          targetRef={generateRef}
          title="These measurements are pre-filled"
          body="We've entered realistic sample values across each tab — refraction, keratometry, and axial length. Edit any of them, or just continue."
          ctaLabel="Looks good"
          onCta={() => setStep('generate')}
          onSkip={skip}
          stepIndex={1}
          stepCount={TOUR_STEPS}
          placement="top"
        />
      )}

      {active && step === 'generate' && view === 'measurements' && (
        <Coachmark
          targetRef={generateRef}
          title="Generate the report"
          body="This turns the measurements into a patient-ready report you can use to guide treatment decisions."
          ctaLabel="Generate Report"
          onCta={generate}
          onSkip={skip}
          stepIndex={2}
          stepCount={TOUR_STEPS}
          placement="top"
        />
      )}
    </>
  )
}

// Final closer sits over the report — the actual conversion hook.
function ReportCloser({
  onAddOwn,
  onSkip,
}: {
  onAddOwn: () => void
  onSkip: () => void
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-[#00154f]/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-[14px] shadow-2xl max-w-[440px] w-full p-7 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#05aad4] to-[#00154f] flex items-center justify-center text-white text-[22px]">
          ✓
        </div>
        <h2 className="font-['Inter'] text-[22px] font-bold text-[#00154f]">
          This is what MyoPilot produces
        </h2>
        <p className="font-['Source_Sans_3'] text-[15px] leading-[1.55] text-[#4a5568]">
          Every patient you add gets a report like this — a clear, shareable
          picture of myopia risk and progression to guide treatment
          conversations. Ready to create your own?
        </p>
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onSkip}
            className="font-['Inter'] text-[14px] text-[#4a5568] hover:text-[#282b2b]"
          >
            Keep exploring
          </button>
          <button
            onClick={onAddOwn}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-5 py-2.5 text-[15px] font-medium text-white font-['Inter'] hover:opacity-90 transition-opacity"
          >
            Add your first patient
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Prototype() {
  return (
    <OnboardingProvider>
      <Flow />
    </OnboardingProvider>
  )
}
