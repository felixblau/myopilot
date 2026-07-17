import { type RefObject } from 'react'
import { samplePatient as p } from './sampleData'

interface DashboardProps {
  sampleRowRef: RefObject<HTMLTableRowElement | null>
  onOpenSample: () => void
  highlightSampleRow: boolean
}

const COLS = [
  'Patient FN',
  'Patient LN',
  'Preferred Name',
  'Gender',
  'Age',
  'Ethnicity',
  'Parent FN',
  'Parent LN',
  'Phone',
  'Email',
  'Status',
]

// Matches the Figma "1.1 Patient Home": page title + Add Patients, a collapsed
// Filter Patients divider, and the wide patient table with a single sample row.
export default function Dashboard({
  sampleRowRef,
  onOpenSample,
  highlightSampleRow,
}: DashboardProps) {
  const cells = [
    p.firstName,
    p.lastName,
    p.preferredName,
    p.gender,
    String(p.ageYears),
    p.ethnicity,
    p.parentFirstName,
    p.parentLastName,
    p.phone,
    p.email,
  ]

  return (
    <div className="px-20 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-['Inter'] text-[20px] font-semibold text-[#191b1e]">
          Patients
        </h1>
        <button className="h-9 px-4 rounded-[6px] bg-[#2a4c7c] text-white font-['Inter'] text-[14px] font-medium hover:opacity-90 transition-opacity">
          Add Patients
        </button>
      </div>

      {/* Collapsed filter divider */}
      <div className="flex items-center gap-2 mb-4 text-[#2a4c7c]">
        <div className="flex-1 h-px bg-[#e2e8f0]" />
        <span className="font-['Inter'] text-[14px] font-medium">
          Filter Patients
        </span>
        <ChevronDown />
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>

      {/* Table */}
      <div className="border border-[#e2e8f0] rounded-[6px] overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f7f8fc] font-['Inter'] text-[12px] font-semibold text-[#191b1e]">
              {COLS.map((c) => (
                <th key={c} className="py-2.5 px-3 whitespace-nowrap">
                  {c}
                </th>
              ))}
              <th className="py-2.5 px-3 w-10" />
            </tr>
          </thead>
          <tbody>
            <tr
              ref={sampleRowRef}
              onClick={onOpenSample}
              className={`cursor-pointer transition-colors font-['Source_Sans_3'] text-[14px] text-[#282b2b] ${
                highlightSampleRow
                  ? 'relative z-10 myo-row-attention'
                  : 'hover:bg-[#f7f8fc]'
              }`}
            >
              {cells.map((v, i) => (
                <td key={i} className="py-3 px-3 whitespace-nowrap">
                  {v}
                </td>
              ))}
              <td className="py-3 px-3 text-[#22c55e] font-medium">{p.status}</td>
              <td className="py-3 px-3 text-[#71717a]">⋯</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer / pagination */}
      <div className="flex items-center justify-between mt-4 font-['Inter'] text-[13px] text-[#71717a]">
        <span>20 results per page ⌄</span>
        <span className="flex items-center gap-3">
          ‹ 1-1 of 1 ›
        </span>
        <span>10 results per page ⌄</span>
      </div>
    </div>
  )
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
