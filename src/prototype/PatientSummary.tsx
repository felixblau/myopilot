import { useState, type RefObject } from 'react'
import { samplePatient as p } from './sampleData'
import {
  SCENARIOS,
  useProjectionPrefs,
  type Eye,
} from './ProjectionPrefsContext'

interface PatientSummaryProps {
  generateRef: RefObject<HTMLButtonElement | null>
  onGenerate: () => void
  onOpenMeasurements: () => void
  highlightGenerate: boolean
}

const NAV = [
  'Summary',
  'Measurements',
  'Charts',
  'Risk Assessments',
  'Treatments',
  'Chat with MyoPilot',
  'Myopia Projection',
  'Doctor Visits',
]

// Mirrors the product's patient landing (Figma "1.1.1 Patient loaded"):
// left nav, risk-score + AI gauges, and the progression chart.
export default function PatientSummary({
  generateRef,
  onGenerate,
  onOpenMeasurements,
  highlightGenerate,
}: PatientSummaryProps) {
  return (
    <div className="flex min-h-[calc(100vh-48px)]">
      {/* Sidebar */}
      <aside className="w-[264px] shrink-0 bg-white border-r border-[#e2e8f0] py-4">
        <div className="px-4 pb-4 border-b border-[#edf1f7]">
          <div className="flex items-center justify-between">
            <div className="font-['Inter'] font-bold text-[15px] text-[#191b1e]">
              {p.firstName} ({p.preferredName}) {p.lastName}
            </div>
          </div>
          <div className="mt-2 font-['Source_Sans_3'] text-[12px] text-[#71717a] leading-[1.6]">
            ✉ {p.email}
            <br />
            🪪 {p.patientId}
            <br />
            📅 Jun 10, 2013 ({p.ageYears}yo)
            <br />
            👤 {p.ethnicity} / Female
          </div>
        </div>
        <nav className="pt-3">
          {NAV.map((item) => {
            const active = item === 'Summary'
            return (
              <button
                key={item}
                onClick={item === 'Measurements' ? onOpenMeasurements : undefined}
                className={`w-full text-left px-4 py-2.5 font-['Inter'] text-[14px] transition-colors ${
                  active
                    ? 'bg-[#2a4c7c] text-white font-medium'
                    : 'text-[#4a5568] hover:bg-[#f7f8fc]'
                }`}
              >
                {item}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 px-8 py-6 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-['Inter'] text-[22px] font-bold text-[#191b1e]">
            Patient Summary
          </h1>
          <div className="flex items-center gap-3">
            <button className="h-9 px-4 rounded-[6px] border border-[#e2e8f0] bg-white text-[#71717a] font-['Inter'] text-[13px] font-medium">
              Schedule new appointment 📅
            </button>
            <button
              ref={generateRef}
              onClick={onGenerate}
              className={`h-9 px-4 rounded-[6px] bg-[#2a4c7c] text-white font-['Inter'] text-[13px] font-medium flex items-center gap-2 transition-all hover:opacity-90 ${
                highlightGenerate ? 'myo-cta-pulse' : ''
              }`}
            >
              Generate report 📄
            </button>
            <button className="h-9 px-4 rounded-[6px] border border-[#e2e8f0] bg-white text-[#a0aec0] font-['Inter'] text-[13px] font-medium">
              Prior reports
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-6">
          {/* Risk card */}
          <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-5">
            <p className="font-['Source_Sans_3'] text-[13px] text-[#71717a]">
              Lipson/Koffler Guide's
            </p>
            <h2 className="font-['Inter'] text-[20px] font-bold text-[#191b1e]">
              Risk Score: 70 <span className="text-[#e53a36]">(High)</span>
            </h2>
            <p className="font-['Inter'] text-[13px] text-[#00aad4] mb-4">
              ✦ AI Risk Score: 82 (Very High)
            </p>
            <div className="flex gap-6 mb-4">
              <Gauge label="Low" rightLabel="V. High" />
              <Gauge label="Low" rightLabel="V. High" ai />
            </div>
            <p className="font-['Source_Sans_3'] text-[13px] leading-[1.55] text-[#4a5568]">
              The patient is already myopic with onset at age 9, contributing a
              moderate risk score of 30. Having one myopic family member adds a
              low risk score of 10. Close work of 3 hours daily contributes
              moderately (15), and outdoor activity of 1 hour is suboptimal.
            </p>
          </section>

          {/* Progression chart — driven by saved projection preferences */}
          <ProjectionChart patientId={p.patientId} />
        </div>
      </div>
    </div>
  )
}

function Gauge({
  label,
  rightLabel,
  ai,
}: {
  label: string
  rightLabel: string
  ai?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-[110px] h-[56px] overflow-hidden">
        <div className="absolute inset-0 rounded-t-full bg-[conic-gradient(from_270deg_at_50%_100%,#22c55e_0deg,#eab308_60deg,#f97316_100deg,#e53a36_160deg,transparent_180deg)]" />
        <div className="absolute inset-[14px_14px_0] rounded-t-full bg-white" />
        {ai && (
          <span className="absolute inset-x-0 top-3 text-center text-[11px] font-semibold text-[#4a5568]">
            AI
          </span>
        )}
        <div className="absolute left-1/2 bottom-0 w-[2px] h-[38px] bg-[#191b1e] origin-bottom -translate-x-1/2 rotate-[55deg]" />
      </div>
      <div className="flex justify-between w-[110px] text-[9px] text-[#71717a]">
        <span>{label}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

// Progression + projections chart. Lines auto-appear from the doctor's saved
// projection preferences; individual lines can be hidden per patient (remembered
// across visits). "Set as my default" writes the current view back to the
// account preference.
function ProjectionChart({ patientId }: { patientId: string }) {
  const { prefs, setPrefs, hiddenFor, toggleHidden } = useProjectionPrefs()
  const [eye, setEye] = useState<Eye>(prefs.eye)
  const [shown, setShown] = useState(prefs.autoShow)
  const [savedFlash, setSavedFlash] = useState(false)

  const hidden = hiddenFor(patientId)
  // The scenarios the doctor prefers, in canonical order.
  const chosen = SCENARIOS.filter((s) => prefs.scenarios.includes(s.key))
  const anyVisible = chosen.some((s) => !hidden.includes(s.key))

  const setAsDefault = () => {
    // Persist the currently-visible scenarios + eye as the new account default.
    const visible = chosen
      .filter((s) => !hidden.includes(s.key))
      .map((s) => s.key)
    setPrefs({ ...prefs, eye, scenarios: visible.length ? visible : prefs.scenarios })
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
  }

  return (
    <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-5 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-['Inter'] text-[16px] font-semibold text-[#191b1e]">
          Progression and Projections
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-['Source_Sans_3'] text-[12px] text-[#71717a]">
            Today:
          </span>
          <span className="text-[12px] font-medium text-[#e53a36] bg-[#e53a36]/10 rounded-full px-3 py-1">
            75th percentile
          </span>
          <div className="flex rounded overflow-hidden border border-[#e2e8f0] text-[12px]">
            {(['OD', 'OS'] as Eye[]).map((e) => (
              <button
                key={e}
                onClick={() => setEye(e)}
                className={`px-3 py-1 transition-colors ${
                  eye === e ? 'bg-[#2a4c7c] text-white' : 'bg-white text-[#4a5568]'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center font-['Inter'] text-[13px] font-medium text-[#191b1e] mb-1">
        Axial Length
      </p>

      {shown ? (
        <>
          <div className="relative h-[320px] overflow-hidden rounded">
            <img src="/report-assets/grad-map.svg" alt="" className="absolute inset-0 w-full h-full" />
            <img src="/report-assets/v-grid.svg" alt="" className="absolute inset-0 w-full h-full" />
            <div className="absolute left-[47%] top-0 bottom-0 w-4">
              <img src="/report-assets/treatment-period.svg" alt="" className="w-full h-full" />
            </div>
            {anyVisible && (
              <img
                src="/report-assets/all-lines.svg"
                alt=""
                className="absolute w-full bottom-0"
                style={{ height: '70%' }}
              />
            )}
            <span className="absolute left-[44%] bottom-2 text-[11px] text-[#71717a] opacity-70">
              Today (12.5yrs)
            </span>
            <span className="absolute right-3 top-2 text-[11px] text-[#71717a]">
              Projected to age {prefs.targetAge}
            </span>
          </div>
          <div className="flex justify-between px-4 mt-1 text-[11px] text-[#71717a]">
            <span>6</span><span>10</span><span>15</span><span>20</span><span>25</span>
          </div>
          <p className="text-center text-[11px] text-[#71717a] mt-1">Age (Years)</p>

          {/* Interactive legend — click to hide/show a line for this patient */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
            {chosen.map((s) => {
              const off = hidden.includes(s.key)
              return (
                <button
                  key={s.key}
                  onClick={() => toggleHidden(patientId, s.key)}
                  title={off ? 'Show this line' : 'Hide this line'}
                  className={`flex items-center gap-1.5 text-[11px] font-['Source_Sans_3'] transition-opacity ${
                    off ? 'opacity-40 line-through' : 'opacity-100'
                  }`}
                >
                  <span
                    className="inline-block w-4 h-0 border-t-2 border-dashed"
                    style={{ borderColor: s.color }}
                  />
                  {s.label}
                </button>
              )
            })}
            <span className="text-[11px] text-[#a0aec0]">· click a line to hide</span>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#edf1f7]">
            <button
              onClick={setAsDefault}
              className="text-[12px] font-['Inter'] font-medium text-[#2a4c7c] hover:underline"
            >
              ⚙ Set as my default
            </button>
            {savedFlash && (
              <span className="text-[12px] text-[#16a34a]">✓ Saved as default</span>
            )}
          </div>
        </>
      ) : (
        <div className="h-[320px] flex flex-col items-center justify-center gap-3 rounded border border-dashed border-[#e2e8f0] bg-[#f7f8fc]">
          <p className="font-['Source_Sans_3'] text-[13px] text-[#71717a]">
            Projections are hidden.
          </p>
          <button
            onClick={() => setShown(true)}
            className="h-9 px-4 rounded-[6px] bg-[#2a4c7c] text-white font-['Inter'] text-[13px] font-medium hover:opacity-90"
          >
            Show projections
          </button>
        </div>
      )}
    </section>
  )
}
