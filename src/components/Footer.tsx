import footerBg from '@/assets/footer-bg.png';
import logo from '@/assets/logo.png';

interface FooterProps {
  onRequestAccess: () => void;
}

export default function Footer({ onRequestAccess }: FooterProps) {
  return (
    <div
      className="bg-[#00154f]"
      style={{ backgroundImage: `url(${footerBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="max-w-[1440px] mx-auto py-16 px-6 lg:px-16">
        <div className="bg-white/5 backdrop-blur rounded-2xl p-12 max-w-[1000px] mx-auto">
          <h2 className="font-heading font-semibold text-[28px] md:text-[40px] text-text-primary mb-4">
            Start delivering smarter myopia care today
          </h2>
          <p className="font-body font-semibold text-lg text-text-primary mb-8">
            MyoPilot is software for optometrists, made by optometrists. Save hours of time navigating all your software – focus on delivering better quality care and growing your practice.
          </p>
          <button
            onClick={onRequestAccess}
            className="bg-gradient-to-r from-navy to-teal text-white rounded-lg px-4 py-2 text-sm font-medium"
          >
            Request early access
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-6">
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="MyoPilot" className="h-12" />
          <div className="flex gap-6">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between text-white/60 text-sm">
          <p>© 2026 myopilot.com</p>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-white/80">Terms of Service</a>
            <a href="/privacy" className="hover:text-white/80">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
