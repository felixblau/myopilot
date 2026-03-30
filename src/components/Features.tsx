export default function Features() {
  const features = [
    {
      name: "Summary",
      title: "Summary",
      subtitle: "Everything. In a single dashboard",
      description: "Axial length, refraction history, and lifestyle risks. From overview to insight, in one elegant glance."
    },
    {
      name: "Risk Radar",
      title: "Risk Radar",
      subtitle: "Know the risk. Change the outcome.",
      description: "Distilling myopia risk and instantly see where your patient stands on the myopia risk spectrum. It's not just data. It's foresight."
    },
    {
      name: "Percentiles",
      title: "Percentiles",
      subtitle: "See the story behind the numbers",
      description: "Timeline visualization of refractive changes and axial length growth — so you can show parents what's happening. Because trends are more powerful than numbers."
    },
    {
      name: "Progression Pathway",
      title: "Progression Pathway",
      subtitle: "See what's coming. Change what's next",
      description: "Predicts where a child's myopia is headed — and shows how much can be avoided with timely treatment, turning uncertainty into clarity for families ready to take the next step."
    },
    {
      name: "Parent-Friendly Reports",
      title: "Parent-Friendly Reports",
      subtitle: "What parents see, changes what they do",
      description: "When parents understand, they act. MyoPilot turns complex myopia data into simple, visual reports. Because the better they see it, the better they follow through."
    },
    {
      name: "CoPilot AI",
      title: "CoPilot AI",
      subtitle: "Clinical confident, on demand",
      description: "Built on the world's leading myopia research and powered by expert logic. CoPilot AI works alongside you, giving you data-driven guidance you crave, so you can make confident treatment decisions without the guesswork. Experience meets intelligence."
    }
  ];

  return (
    <section className="bg-white">
      <div className="w-full px-4 py-10 md:px-[80px] md:py-[64px] max-w-[1440px] mx-auto">
        <h2 className="font-['Inter'] font-semibold text-[40px] leading-[1.25] text-[#282b2b] text-center mb-[32px]">
          MyoPilot helps you navigate myopia with confidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {features.map((feature) => (
            <div key={feature.name} className="bg-[#f7f8fc] rounded-[16px] overflow-hidden">
              <div className="h-[205px] bg-[#f0f2f8] rounded-t-[16px] overflow-hidden flex items-end justify-center">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{feature.name}</span>
                </div>
              </div>

              <div className="px-[24px] py-[24px] text-center">
                <h3 className="font-['Inter'] font-semibold text-[24px] text-[#282b2b] leading-[1.25] mb-[8px]">
                  {feature.title}
                </h3>
                <p className="font-['Inter'] font-semibold text-[18px] text-[#71717a] leading-[1.25] mb-[8px]">
                  {feature.subtitle}
                </p>
                <p className="font-['Source_Sans_3'] font-normal text-[16px] text-[#71717a] leading-[1.25]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
