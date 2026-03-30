import { useState } from 'react';
import logo from '@/assets/logo.png';

interface NavbarProps {
  onRequestAccess: () => void;
}

export default function Navbar({ onRequestAccess }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="w-full h-[72px] flex items-center justify-between pl-[64px] pr-[40px] max-md:px-4">
        <div className="flex gap-[24px] items-center py-[12px]">
          <div className="relative shrink-0 w-[184.69px] h-[48px]">
            <img src={logo} alt="MyoPilot" className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="hidden md:flex gap-[32px] items-center p-[12px] rounded-[8px]">
            <a href="#about" className="font-['Source_Sans_3'] text-[16px] font-normal text-[#282b2b] leading-[1.25] hover:opacity-70 transition-opacity">
              About
            </a>
            <a href="#contact" className="font-['Source_Sans_3'] text-[16px] font-normal text-[#282b2b] leading-[1.25] hover:opacity-70 transition-opacity">
              Contact
            </a>
          </div>
        </div>

        <div className="hidden md:flex gap-[12px] items-start">
          <a href="#login" className="bg-white border border-black/10 rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-[#282b2b] font-['Inter'] leading-[1.25] hover:bg-gray-50 transition-colors">
            Log in
          </a>
          <button
            onClick={onRequestAccess}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-white font-['Inter'] leading-[1.25] hover:opacity-90 transition-opacity"
          >
            Schedule a demo
          </button>
        </div>

        <button
          className="md:hidden text-[#282b2b]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white">
          <a href="#about" className="font-['Source_Sans_3'] text-[16px] text-[#282b2b]">About</a>
          <a href="#contact" className="font-['Source_Sans_3'] text-[16px] text-[#282b2b]">Contact</a>
          <a href="#login" className="bg-white border border-black/10 rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-[#282b2b] font-['Inter'] text-center">Log in</a>
          <button onClick={onRequestAccess} className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-white font-['Inter']">Schedule a demo</button>
        </div>
      )}
    </nav>
  );
}
