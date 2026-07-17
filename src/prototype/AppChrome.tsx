import type { ReactNode } from 'react'

interface AppChromeProps {
  selectedPatient?: string | null
  onOpenProfile?: () => void
  children: ReactNode
}

const TABS = [
  { label: 'Patients', icon: '👥', active: true },
  { label: 'Client Portal', icon: '🪪', active: false },
  { label: 'Communications', icon: '✉️', active: false },
]

// The product's top tab bar (see Figma frames): logo, section tabs,
// right-side utility icons + account.
export default function AppChrome({
  selectedPatient,
  onOpenProfile,
  children,
}: AppChromeProps) {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <header className="h-12 bg-white border-b border-[#e2e8f0] flex items-stretch text-[14px]">
        <div className="flex items-center gap-2 pl-4 pr-6">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00aad4] to-[#2a4c7c]" />
          <span className="font-['Inter'] font-bold text-[16px]">
            <span className="text-[#00aad4]">Myo</span>
            <span className="text-[#2a4c7c]">Pilot</span>
          </span>
        </div>

        {TABS.map((t) => (
          <button
            key={t.label}
            className={`h-full flex items-center gap-2 px-5 font-['Inter'] font-medium transition-colors ${
              t.active
                ? 'bg-[#2a4c7c] text-white'
                : 'text-[#4a5568] hover:bg-[#f7f8fc]'
            }`}
          >
            <span className="text-[13px]">{t.icon}</span>
            {t.label}
          </button>
        ))}

        <div className="flex-1" />

        <div className="flex items-center gap-4 pr-4 text-[#4a5568]">
          {selectedPatient && (
            <span className="font-['Source_Sans_3'] text-[13px]">
              ◎ Patient: {selectedPatient}
            </span>
          )}
          <span className="opacity-70">ⓘ</span>
          <button
            onClick={onOpenProfile}
            title="My Profile"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            👤
          </button>
          <span className="opacity-70">⚙</span>
          <button
            onClick={onOpenProfile}
            title="My Profile"
            className="flex items-center gap-2 pl-2 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-[#2a4c7c] text-white flex items-center justify-center font-['Inter'] text-[12px] font-semibold">
              CY
            </div>
            <div className="leading-tight text-left">
              <div className="font-['Inter'] text-[13px] font-semibold text-[#191b1e]">
                Christine Yeung
              </div>
              <div className="font-['Source_Sans_3'] text-[11px] text-[#71717a]">
                cyeung@cyeyecare.com
              </div>
            </div>
          </button>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
