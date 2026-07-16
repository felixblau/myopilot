import type { ReactNode } from 'react'

interface AppChromeProps {
  selectedPatient?: string | null
  children: ReactNode
}

// Mimics the product's top navigation bar (see dashboard screenshot):
// logo, Patients tab, "Patient: <name>", account cluster.
export default function AppChrome({ selectedPatient, children }: AppChromeProps) {
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <header className="h-[64px] bg-white border-b border-[#e2e8f0] flex items-stretch">
        <div className="flex items-center gap-1 pl-4">
          <div className="flex items-center gap-2 pr-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#05aad4] to-[#00154f]" />
            <span className="font-['Inter'] font-bold text-[18px] text-[#00154f]">
              MyoPilot
            </span>
          </div>
          <div className="h-full flex items-center px-5 bg-[#00154f] text-white gap-2 font-['Inter'] text-[15px] font-medium">
            <span>👥</span> Patients
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-5 pr-5">
          <div className="flex items-center gap-2 font-['Source_Sans_3'] text-[15px] text-[#282b2b]">
            <span className="text-[#4a5568]">◎</span>
            Patient: {selectedPatient ?? 'Not Selected'}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#00154f] text-white flex items-center justify-center font-['Inter'] text-[13px] font-semibold">
              CY
            </div>
            <div className="leading-tight">
              <div className="font-['Inter'] text-[14px] font-semibold text-[#282b2b]">
                Christine Yeung
              </div>
              <div className="font-['Source_Sans_3'] text-[12px] text-[#4a5568]">
                cyeung@cyeyecare.com
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}
