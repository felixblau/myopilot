import footerBg from '@/assets/footer-bg.png';
import logo from '@/assets/logo.png';

interface FooterProps {
  onRequestAccess: () => void;
}

export default function Footer({ onRequestAccess }: FooterProps) {
  return (
    <section className="relative overflow-clip">
      <img src={footerBg} alt="" className="absolute inset-0 size-full object-cover" />

      <div className="relative max-w-[1440px] mx-auto flex flex-col gap-[64px] items-center px-4 pt-10 pb-4 md:px-[64px] md:pt-[64px] md:pb-[24px]">
        <div className="bg-[rgba(255,255,255,0.05)] rounded-[16px] p-[48px] w-[1000px] max-w-full flex flex-col gap-[24px] items-start justify-center">
          <h2 className="font-['Inter'] font-semibold text-[28px] md:text-[40px] leading-[1.25] text-[#282b2b]">
            Start delivering smarter myopia care today
          </h2>
          <p className="font-['Source_Sans_Pro'] font-semibold text-[18px] leading-[1.25] text-[#282b2b]">
            MyoPilot is software for optemetrists, made by optemetrists. Save hours of time navigating all your software – focus on delivering better quality care and growing your practice.
          </p>
          <button
            onClick={onRequestAccess}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-white"
          >
            Request early access
          </button>
        </div>

        <footer className="flex flex-col gap-[32px] items-start w-full">
          <div className="flex items-center justify-between py-[16px] w-full">
            <img src={logo} alt="MyoPilot" className="h-[48px] w-[184.69px] object-cover" />

            <div className="flex gap-[16px] items-center">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-[32px] rounded-[6px] flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#282b2b" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="size-[32px] rounded-[6px] flex items-center justify-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#282b2b" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between w-full opacity-90 text-[#282b2b]">
            <div className="flex gap-[40px] items-center">
              <span className="text-[12px] font-normal font-['Inter']">© 2026 myopilot.com</span>
              <a href="/terms" className="text-[12px] font-normal font-['Inter']">Terms of Service</a>
              <a href="/privacy" className="text-[12px] font-normal font-['Inter']">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
