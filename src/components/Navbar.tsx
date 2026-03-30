import { useState } from 'react';
import logo from '@/assets/logo.png';

interface NavbarProps {
  onRequestAccess: () => void;
}

export default function Navbar({ onRequestAccess }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="MyoPilot" className="h-8" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              About
            </a>
            <a href="#contact" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#login" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              Log in
            </a>
            <button
              onClick={onRequestAccess}
              className="bg-gradient-to-r from-navy to-teal text-white font-medium text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Request early access
            </button>
          </div>

          <button
            className="md:hidden text-text-primary"
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
          <div className="md:hidden mt-4 flex flex-col gap-4">
            <a href="#about" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              About
            </a>
            <a href="#contact" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              Contact
            </a>
            <a href="#login" className="text-text-primary font-medium text-sm hover:opacity-70 transition-opacity">
              Log in
            </a>
            <button
              onClick={onRequestAccess}
              className="bg-gradient-to-r from-navy to-teal text-white font-medium text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-left"
            >
              Request early access
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
