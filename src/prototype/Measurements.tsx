import { useState, type RefObject } from 'react'
import { measurements as seed, samplePatient } from './sampleData'

interface MeasurementsProps {
  generateRef: RefObject<HTMLButtonElement | null>
  onGenerate: () => void
  highlightGenerate: boolean
}

type TabKey = 'consolidated' | 'keratometry' | 'axial' | 'refraction'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'consolidated', label: 'Consolidated' },
  { key: 'keratometry', label: 'Keratometry' },
  { key: 'axial', label: 'Axial Length' },
  { key: 'refraction', label: 'Refraction Sphere' },
]

// Small controlled cell so every pre-filled value stays editable.
function Cell({
  value,
  onChange,
  suffix,
}: {
  value: string
  onChange: (v: string) => void
  suffix?: string
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-[6px] border border-[#e2e8f0] bg-white text-[14px] font-['Source_Sans_3'] text-[#282b2b] outline-none focus:border-[#05aad4]"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[#a0aec0] pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  )
}

export default function Measurements({
  generateRef,
  onGenerate,
  highlightGenerate,
}: MeasurementsProps) {
  const [tab, setTab] = useState<TabKey>('consolidated')
  const [data, setData] = useState(seed)

  // Generic setter for the nested eye-pair fields.
  const setPair = (
    group: 'refractionSphere' | 'keratometry' | 'axialLength',
    field: string,
    eye: 'od' | 'os',
    v: string,
  ) =>
    setData((d) => {
      const groupData = d[group] as unknown as Record<
        string,
        Record<string, string>
      >
      return {
        ...d,
        [group]: {
          ...groupData,
          [field]: { ...groupData[field], [eye]: v },
        },
      }
    })

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-6">
      <div className="flex items-baseline justify-between mb-1">
        <h1 className="font-['Inter'] text-[24px] font-bold text-[#282b2b]">
          Measurements
        </h1>
        <span className="font-['Source_Sans_3'] text-[14px] text-[#4a5568]">
          {samplePatient.firstName} {samplePatient.lastName} · Age{' '}
          {data.ageAtExam}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#e2e8f0] mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-3 -mb-px text-[15px] font-['Inter'] transition-colors border-b-2 ${
              tab === t.key
                ? 'border-[#05aad4] text-[#282b2b] font-semibold'
                : 'border-transparent text-[#4a5568] hover:text-[#282b2b]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[10px] border border-[#e2e8f0] p-6 mb-6">
        {tab === 'consolidated' && (
          <EyeTable
            columns={['Sphere (D)', 'Cylinder (D)', 'Axis (°)', 'SE (D)']}
            rows={(['od', 'os'] as const).map((eye) => ({
              label: eye === 'od' ? 'OD (Right)' : 'OS (Left)',
              cells: [
                <Cell key="s" value={data.refractionSphere.sphere[eye]} onChange={(v) => setPair('refractionSphere', 'sphere', eye, v)} />,
                <Cell key="c" value={data.refractionSphere.cylinder[eye]} onChange={(v) => setPair('refractionSphere', 'cylinder', eye, v)} />,
                <Cell key="a" value={data.refractionSphere.axis[eye]} onChange={(v) => setPair('refractionSphere', 'axis', eye, v)} />,
                <Cell key="e" value={data.refractionSphere.seCycloplegic[eye]} onChange={(v) => setPair('refractionSphere', 'seCycloplegic', eye, v)} />,
              ],
            }))}
          />
        )}

        {tab === 'keratometry' && (
          <EyeTable
            columns={['K1 Flat (D)', 'K2 Steep (D)']}
            rows={(['od', 'os'] as const).map((eye) => ({
              label: eye === 'od' ? 'OD (Right)' : 'OS (Left)',
              cells: [
                <Cell key="k1" value={data.keratometry.k1Flat[eye]} onChange={(v) => setPair('keratometry', 'k1Flat', eye, v)} />,
                <Cell key="k2" value={data.keratometry.k2Steep[eye]} onChange={(v) => setPair('keratometry', 'k2Steep', eye, v)} />,
              ],
            }))}
          />
        )}

        {tab === 'axial' && (
          <EyeTable
            columns={['Axial (mm)', 'AL/CR']}
            rows={(['od', 'os'] as const).map((eye) => ({
              label: eye === 'od' ? 'OD (Right)' : 'OS (Left)',
              cells: [
                <Cell key="ax" value={data.axialLength.axialMm[eye]} onChange={(v) => setPair('axialLength', 'axialMm', eye, v)} suffix="mm" />,
                <div key="cr" className="h-10 flex items-center px-3 rounded-[6px] bg-[#f7f8fc] text-[14px] font-['Source_Sans_3'] text-[#282b2b]">
                  {data.axialLength.alcr[eye]}
                </div>,
              ],
            }))}
          />
        )}

        {tab === 'refraction' && (
          <EyeTable
            columns={['Sphere (D)', 'Cylinder (D)', 'Axis (°)', 'Cycloplegic (SE, D)']}
            rows={(['od', 'os'] as const).map((eye) => ({
              label: eye === 'od' ? 'OD (Right)' : 'OS (Left)',
              cells: [
                <Cell key="s" value={data.refractionSphere.sphere[eye]} onChange={(v) => setPair('refractionSphere', 'sphere', eye, v)} />,
                <Cell key="c" value={data.refractionSphere.cylinder[eye]} onChange={(v) => setPair('refractionSphere', 'cylinder', eye, v)} />,
                <Cell key="a" value={data.refractionSphere.axis[eye]} onChange={(v) => setPair('refractionSphere', 'axis', eye, v)} />,
                <div key="e" className="h-10 flex items-center px-3 rounded-[6px] bg-[#f7f8fc] text-[14px] font-['Source_Sans_3'] text-[#282b2b]">
                  {data.refractionSphere.seCycloplegic[eye]}
                </div>,
              ],
            }))}
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          ref={generateRef}
          onClick={onGenerate}
          className={`rounded-[8px] px-6 py-3 text-[15px] font-medium text-white font-['Inter'] transition-all ${
            highlightGenerate
              ? 'bg-gradient-to-l from-[#05aad4] to-[#00154f] ring-4 ring-[#06c4f0]/40'
              : 'bg-[#00154f] hover:bg-[#001a5e]'
          }`}
        >
          Generate Report
        </button>
      </div>
    </div>
  )
}

function EyeTable({
  columns,
  rows,
}: {
  columns: string[]
  rows: { label: string; cells: React.ReactNode[] }[]
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left font-['Inter'] text-[13px] font-semibold text-[#4a5568]">
          <th className="pb-3 pr-4 w-[110px]">Eye</th>
          {columns.map((c) => (
            <th key={c} className="pb-3 pr-4">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="py-2 pr-4 font-['Source_Sans_3'] text-[14px] text-[#282b2b] align-middle">
              {r.label}
            </td>
            {r.cells.map((cell, i) => (
              <td key={i} className="py-2 pr-4 align-middle">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
