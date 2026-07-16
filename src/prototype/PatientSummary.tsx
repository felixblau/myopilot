import { type RefObject } from 'react'
import { samplePatient } from './sampleData'

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

// Mirrors the product's patient landing view: left nav, risk-score card, and
// the progression chart (reusing the report's chart assets).
export default function PatientSummary({
  generateRef,
  onGenerate,
  onOpenMeasurements,
  highlightGenerate,
}: PatientSummaryProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Left sidebar */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-[#e2e8f0] py-4">
        <div className="px-4 pb-4 border-b border-[#edf1f7]">
          <div className="font-['Inter'] font-bold text-[15px] text-[#282b2b]">
            {samplePatient.firstName.toUpperCase()} ({samplePatient.preferredName}){' '}
            {samplePatient.lastName.toUpperCase()}
          </div>
          <div className="mt-1 font-['Source_Sans_3'] text-[12px] text-[#4a5568] leading-relaxed">
            {samplePatient.patientId}
            <br />
            Jun 10, 2013 ({samplePatient.ageYears}yo)
            <br />
            {samplePatient.ethnicity} / {samplePatient.gender}
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
                    ? 'bg-[#00154f] text-white font-medium'
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
      <div className="flex-1 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-['Inter'] text-[24px] font-bold text-[#282b2b]">
            Patient Summary
          </h1>
          <button
            ref={generateRef}
            onClick={onGenerate}
            className={`rounded-[8px] px-5 py-2.5 text-[14px] font-medium font-['Inter'] transition-all ${
              highlightGenerate
                ? 'bg-gradient-to-l from-[#05aad4] to-[#00154f] text-white ring-4 ring-[#06c4f0]/40'
                : 'bg-white border border-[#00154f] text-[#00154f] hover:bg-[#f7f8fc]'
            }`}
          >
            Generate report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr] gap-6">
          {/* Risk score card */}
          <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-5">
            <p className="font-['Source_Sans_3'] text-[13px] text-[#4a5568]">
              Lipson/Koffler Guide's
            </p>
            <h2 className="font-['Inter'] text-[22px] font-bold text-[#282b2b] mb-1">
              Risk Score: 70{' '}
              <span className="text-[#e53a36]">(High)</span>
            </h2>
            <p className="font-['Inter'] text-[13px] text-[#05aad4] mb-4">
              ✦ AI Risk Score: 82 (Very High)
            </p>
            <p className="font-['Source_Sans_3'] text-[13px] leading-[1.55] text-[#4a5568]">
              The patient is already myopic with onset at age 9, contributing a
              moderate risk score. One myopic family member adds low risk. Close
              work of 3 hours daily contributes moderately, and outdoor activity
              of 1 hour is suboptimal.
            </p>
          </section>

          {/* Progression chart (reused report assets) */}
          <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Inter'] text-[16px] font-semibold text-[#282b2b]">
                Progression and Projections
              </h3>
              <span className="text-[12px] font-medium text-[#e53a36] bg-[#e53a36]/10 rounded-full px-3 py-1">
                Today: 75th percentile
              </span>
            </div>
            <div className="relative h-[320px] overflow-hidden rounded">
              <img src="/report-assets/grad-map.svg" alt="" className="absolute inset-0 w-full h-full" />
              <img src="/report-assets/v-grid.svg" alt="" className="absolute inset-0 w-full h-full" />
              <div className="absolute left-[47%] top-0 bottom-0 w-4">
                <img src="/report-assets/treatment-period.svg" alt="" className="w-full h-full" />
              </div>
              <img
                src="/report-assets/all-lines.svg"
                alt=""
                className="absolute w-full bottom-0"
                style={{ height: '70%' }}
              />
              <span className="absolute left-[44%] bottom-2 text-[11px] text-[#4a5568] opacity-70">
                Today (12.5yrs)
              </span>
            </div>
            <div className="flex justify-between px-4 mt-1 text-[11px] text-[#4a5568]">
              <span>6</span><span>10</span><span>15</span><span>20</span><span>25</span>
            </div>
            <p className="text-center text-[11px] text-[#4a5568] mt-1">Age (Years)</p>
          </section>
        </div>
      </div>
    </div>
  )
}
