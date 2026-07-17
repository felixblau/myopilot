import { useState } from 'react'
import {
  SCENARIOS,
  useProjectionPrefs,
  type Eye,
  type ProjectionPrefs,
  type ScenarioKey,
  type TargetAge,
} from './ProjectionPrefsContext'

const TARGET_AGES: TargetAge[] = [18, 20, 23, 25]

// Mirrors the product's "My Profile" page: heading + white section cards.
// Projection Preferences is a new section directly under User Information.
export default function Profile() {
  const { prefs, setPrefs } = useProjectionPrefs()

  // Local draft so edits only persist to the account default on Save.
  const [draft, setDraft] = useState<ProjectionPrefs>(prefs)
  const [saved, setSaved] = useState(false)

  const dirty = JSON.stringify(draft) !== JSON.stringify(prefs)

  const toggleScenario = (key: ScenarioKey) =>
    setDraft((d) => ({
      ...d,
      scenarios: d.scenarios.includes(key)
        ? d.scenarios.filter((k) => k !== key)
        : [...d.scenarios, key],
    }))

  const save = () => {
    setPrefs(draft)
    setSaved(true)
    setTimeout(() => setSaved(false), 1800)
  }

  return (
    <div className="max-w-[1100px] mx-auto px-8 py-6">
      <h1 className="font-['Inter'] text-[28px] font-bold text-[#1e3a5f] mb-6">
        My Profile
      </h1>

      {/* User Information (static — mirrors the real page) */}
      <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-6 mb-4">
        <h2 className="font-['Inter'] text-[16px] font-semibold text-[#1e3a5f] mb-5">
          User Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Last Name" value="Yeung" />
          <Field label="First Name" value="Christine" />
          <Field label="Email" value="cyeung@cyeyecare.com" muted />
          <Field label="Phone Number" value="" placeholder="Phone Number" />
        </div>
      </section>

      {/* Projection Preferences — the new section */}
      <section className="bg-white rounded-[10px] border border-[#e2e8f0] p-6 mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <h2 className="font-['Inter'] text-[16px] font-semibold text-[#1e3a5f]">
            Projection Preferences
          </h2>
        </div>
        <p className="font-['Source_Sans_3'] text-[13px] text-[#71717a] mb-5">
          Set how projection lines appear on the progression chart by default.
          These apply to every patient — you can still hide individual lines per
          patient.
        </p>

        {/* Target age */}
        <div className="mb-5">
          <label className="block font-['Inter'] text-[13px] font-medium text-[#4a5568] mb-2">
            Project to age
          </label>
          <Segmented
            options={TARGET_AGES.map((a) => ({ value: a, label: `${a} yrs` }))}
            value={draft.targetAge}
            onChange={(v) => setDraft((d) => ({ ...d, targetAge: v }))}
          />
        </div>

        {/* Scenarios */}
        <div className="mb-5">
          <label className="block font-['Inter'] text-[13px] font-medium text-[#4a5568] mb-2">
            Default projection lines
          </label>
          <div className="flex flex-wrap gap-2">
            {SCENARIOS.map((s) => {
              const on = draft.scenarios.includes(s.key)
              return (
                <button
                  key={s.key}
                  onClick={() => toggleScenario(s.key)}
                  className={`flex items-center gap-2 h-9 px-3 rounded-[8px] border text-[13px] font-['Inter'] transition-colors ${
                    on
                      ? 'border-[#2a4c7c] bg-[#2a4c7c]/5 text-[#191b1e]'
                      : 'border-[#e2e8f0] bg-white text-[#71717a] hover:border-[#cbd5e0]'
                  }`}
                >
                  <span
                    className="inline-block w-3 h-0 border-t-2 border-dashed"
                    style={{ borderColor: on ? s.color : '#cbd5e0' }}
                  />
                  {s.label}
                  <span className="text-[13px]">{on ? '✓' : '+'}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Default eye */}
        <div className="mb-5">
          <label className="block font-['Inter'] text-[13px] font-medium text-[#4a5568] mb-2">
            Default eye
          </label>
          <Segmented
            options={(['OD', 'OS'] as Eye[]).map((e) => ({
              value: e,
              label: e === 'OD' ? 'OD (Right)' : 'OS (Left)',
            }))}
            value={draft.eye}
            onChange={(v) => setDraft((d) => ({ ...d, eye: v }))}
          />
        </div>

        {/* Auto-show */}
        <label className="flex items-center gap-3 mb-6 cursor-pointer select-none">
          <button
            type="button"
            onClick={() => setDraft((d) => ({ ...d, autoShow: !d.autoShow }))}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              draft.autoShow ? 'bg-[#2a4c7c]' : 'bg-[#cbd5e0]'
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                draft.autoShow ? 'left-[18px]' : 'left-0.5'
              }`}
            />
          </button>
          <span className="font-['Inter'] text-[14px] text-[#191b1e]">
            Show projections automatically when measurements exist
          </span>
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            disabled={!dirty}
            className={`h-9 px-5 rounded-[6px] font-['Inter'] text-[13px] font-medium transition-colors ${
              dirty
                ? 'bg-[#2a4c7c] text-white hover:opacity-90'
                : 'bg-[#e2e8f0] text-[#a0aec0] cursor-not-allowed'
            }`}
          >
            Save
          </button>
          {saved && (
            <span className="font-['Source_Sans_3'] text-[13px] text-[#16a34a]">
              ✓ Preferences saved
            </span>
          )}
        </div>
      </section>

      {/* Collapsed stubs to match the real page */}
      <CollapsedSection title="Org Memberships" />
      <CollapsedSection title="Assign Patients" badge="Assigned: 21" />
    </div>
  )
}

function Field({
  label,
  value,
  placeholder,
  muted,
}: {
  label: string
  value: string
  placeholder?: string
  muted?: boolean
}) {
  return (
    <div>
      <label className="block font-['Inter'] text-[11px] text-[#a0aec0] mb-1">
        {label}
      </label>
      <div
        className={`h-11 flex items-center px-3 rounded-[6px] border border-[#e2e8f0] text-[14px] font-['Source_Sans_3'] ${
          muted ? 'text-[#a0aec0] bg-[#f7f8fc]' : 'text-[#282b2b] bg-white'
        }`}
      >
        {value || (
          <span className="text-[#cbd5e0]">{placeholder}</span>
        )}
      </div>
    </div>
  )
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-[8px] border border-[#e2e8f0] overflow-hidden">
      {options.map((o, i) => (
        <button
          key={String(o.value)}
          onClick={() => onChange(o.value)}
          className={`h-9 px-4 text-[13px] font-['Inter'] transition-colors ${
            i > 0 ? 'border-l border-[#e2e8f0]' : ''
          } ${
            value === o.value
              ? 'bg-[#2a4c7c] text-white font-medium'
              : 'bg-white text-[#4a5568] hover:bg-[#f7f8fc]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function CollapsedSection({ title, badge }: { title: string; badge?: string }) {
  return (
    <section className="bg-white rounded-[10px] border border-[#e2e8f0] px-6 py-5 mb-4 flex items-center justify-between">
      <h2 className="font-['Inter'] text-[16px] font-semibold text-[#1e3a5f]">
        {title}
      </h2>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="font-['Source_Sans_3'] text-[12px] text-[#71717a] bg-[#f7f8fc] rounded-full px-3 py-1">
            {badge}
          </span>
        )}
        <span className="font-['Source_Sans_3'] text-[13px] text-[#a0aec0]">
          Show
        </span>
      </div>
    </section>
  )
}
