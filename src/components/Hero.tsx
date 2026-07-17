import heroBg from '@/assets/hero-bg.png';
import heroImage from '@/assets/hero-image.png';

interface HeroProps {
  onRequestAccess: () => void;
}

export default function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="relative w-full">
      <img src={heroBg} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
      <div className="relative flex flex-col lg:flex-row gap-[32px] items-center overflow-clip pl-[16px] pr-[16px] py-[40px] lg:px-[80px] lg:py-[64px] lg:h-[579px] w-full">
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
            className="flex items-center justify-center overflow-clip bg-gradient-to-l from-[#05aad4] to-[#00154f] text-white rounded-[8px] px-[16px] py-[8px] text-[14px] font-['Inter'] font-medium leading-[1.25] hover:opacity-90 transition-opacity"
          >
            Request early access
          </button>
        </div>
        <div className="flex-[1_0_0] relative hidden lg:block lg:h-[579px] min-h-px min-w-px">
          <img
            src={heroImage}
            alt="MyoPilot app screenshots showing progression charts, risk scores, and lifestyle factors"
            className="absolute top-0 right-0 h-full w-auto max-w-none object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
}
