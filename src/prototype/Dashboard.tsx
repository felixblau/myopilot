import { type RefObject } from 'react'
import { samplePatient } from './sampleData'

interface DashboardProps {
  sampleRowRef: RefObject<HTMLTableRowElement | null>
  addPatientRef: RefObject<HTMLButtonElement | null>
  onOpenSample: () => void
  highlightSampleRow: boolean
  highlightAddPatient: boolean
}

const inputCls =
  'h-10 px-3 rounded-[6px] border border-[#e2e8f0] bg-white text-[14px] font-["Source_Sans_3"] text-[#4a5568] placeholder:text-[#a0aec0] outline-none focus:border-[#05aad4]'

export default function Dashboard({
  sampleRowRef,
  addPatientRef,
  onOpenSample,
  highlightSampleRow,
  highlightAddPatient,
}: DashboardProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-6">
      <button
        ref={addPatientRef}
        className={`mb-5 rounded-[8px] px-5 py-2.5 text-[15px] font-medium text-white font-['Inter'] transition-all ${
          highlightAddPatient
            ? 'bg-gradient-to-l from-[#05aad4] to-[#00154f] ring-4 ring-[#06c4f0]/40'
            : 'bg-[#00154f] hover:bg-[#001a5e]'
        }`}
      >
        Add Patient
      </button>

      {/* Filter card */}
      <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-6 mb-6">
        <h2 className="font-['Inter'] text-[18px] font-semibold text-[#00154f] mb-4">
          Filter Patients
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <input className={inputCls} placeholder="Patient Number" />
          <input className={inputCls} placeholder="Name" />
          <input className={inputCls} placeholder="Preferred Name" />
          <input className={inputCls} placeholder="Birth Date" />
        </div>
        <div className="flex gap-3">
          <button className="rounded-[8px] px-5 py-2 text-[14px] font-medium text-white font-['Inter'] bg-[#00154f]">
            Apply
          </button>
          <button className="rounded-[8px] px-5 py-2 text-[14px] font-medium text-[#05aad4] font-['Inter'] border border-[#05aad4]">
            Clear
          </button>
        </div>
        <p className="mt-4 font-['Source_Sans_3'] text-[14px] text-[#4a5568]">
          1 patient found
        </p>
      </section>

      {/* Patient table */}
      <section className="bg-white rounded-[10px] border border-[#e2e8f0] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#00154f] text-white font-['Inter'] text-[14px]">
              <th className="py-3.5 px-5 font-semibold">Last Name</th>
              <th className="py-3.5 px-5 font-semibold">Preferred Name</th>
              <th className="py-3.5 px-5 font-semibold">First Name</th>
              <th className="py-3.5 px-5 font-semibold">Gender</th>
              <th className="py-3.5 px-5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              ref={sampleRowRef}
              onClick={onOpenSample}
              className={`border-b border-[#edf1f7] cursor-pointer transition-colors font-['Source_Sans_3'] text-[15px] text-[#282b2b] ${
                highlightSampleRow
                  ? 'bg-[#05aad4]/[0.07] shadow-[inset_3px_0_0_#05aad4]'
                  : 'hover:bg-[#f7f8fc]'
              }`}
            >
              <td className="py-4 px-5 flex items-center gap-2">
                {samplePatient.lastName}
                <span className="text-[11px] font-['Inter'] font-medium text-[#05aad4] bg-[#05aad4]/10 rounded-full px-2 py-0.5">
                  Sample
                </span>
              </td>
              <td className="py-4 px-5">{samplePatient.preferredName}</td>
              <td className="py-4 px-5">{samplePatient.firstName}</td>
              <td className="py-4 px-5">{samplePatient.gender}</td>
              <td className="py-4 px-5 text-right text-[#05aad4]">
                ✎&nbsp;&nbsp;🗑
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
