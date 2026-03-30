import heroBg from '@/assets/hero-bg.png';
import heroScreenshot from '@/assets/hero-screenshot.jpg';

interface HeroProps {
  onRequestAccess: () => void;
}

export default function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="relative w-full overflow-clip">
      <img src={heroBg} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row gap-[32px] items-center pl-[16px] pr-[16px] py-[40px] lg:pl-[80px] lg:pr-0 lg:pt-[64px] lg:pb-[64px] lg:h-[579px] max-w-[1440px] mx-auto">
        <div className="w-full lg:w-[613px] lg:shrink-0 flex flex-col gap-[24px] items-start">
          <h1 className="font-['Inter'] font-semibold text-[36px] lg:text-[50px] leading-[1.25] text-[#282b2b]">
            All your myopia care.{' '}
            Finally in <em className="italic">one</em> place.
          </h1>
          <p className="font-['Inter'] font-medium text-[18px] lg:text-[24px] leading-[1.5] text-[#282b2b]">
            MyoPilot brings together clinical data, AI insights, and patient education int one seamless platform.
          </p>
          <button
            onClick={onRequestAccess}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] text-white rounded-[8px] px-[16px] py-[8px] text-[14px] font-['Inter'] font-medium leading-[1.25] hover:opacity-90 transition-opacity"
          >
            Request early access
          </button>
        </div>
        <div className="flex-1 relative hidden lg:block lg:h-[579px] overflow-visible">
          <img
            src={heroScreenshot}
            alt="MyoPilot app screenshots showing progression charts, risk scores, and lifestyle factors"
            className="absolute top-0 left-0 w-[793px] h-auto max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
