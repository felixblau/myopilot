import heroBg from '@/assets/hero-bg.png';

interface HeroProps {
  onRequestAccess: () => void;
}

export default function Hero({ onRequestAccess }: HeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 lg:max-w-[45%]">
            <h1 className="font-heading text-[36px] lg:text-[50px] leading-[1.25] font-semibold text-text-primary mb-6">
              All your myopia care. Finally in <em className="italic">one</em> place.
            </h1>
            <p className="text-lg lg:text-2xl font-medium text-text-secondary mb-8">
              MyoPilot brings together clinical data, AI insights, and patient education in one seamless platform.
            </p>
            <button
              onClick={onRequestAccess}
              className="bg-gradient-to-r from-navy to-teal text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Request early access
            </button>
          </div>
          <div className="flex-1 lg:max-w-[55%] w-full">
            <img
              src={heroBg}
              alt="MyoPilot platform screenshots"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
