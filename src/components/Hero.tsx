import heroBg from '@/assets/hero-bg.png';

interface HeroProps {
  onRequestAccess: () => void;
}

export default function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="relative overflow-clip w-full">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 object-cover size-full"
      />
      <div className="flex flex-col lg:flex-row gap-[32px] items-center overflow-clip px-[16px] py-[40px] lg:pl-[80px] lg:py-[64px] lg:h-[579px] relative">
        <div className="w-full lg:w-[613px] lg:shrink-0 flex flex-col gap-[24px] items-start">
          <h1 className="font-['Inter'] font-semibold text-[36px] lg:text-[50px] leading-[1.25] text-[#282b2b]">
            All your myopia care. Finally in <em className="italic">one</em> place.
          </h1>
          <p className="font-['Inter'] font-medium text-lg lg:text-[24px] leading-[1.5] text-[#282b2b]">
            MyoPilot brings together clinical data, AI insights, and patient education int one seamless platform.
          </p>
          <button
            onClick={onRequestAccess}
            className="bg-gradient-to-l from-[#05aad4] to-[#00154f] text-white rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium"
          >
            Request early access
          </button>
        </div>
        <div className="flex-1 relative lg:h-[579px]"></div>
      </div>
    </section>
  );
}
