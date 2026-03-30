export default function Features() {
  const features = [
    {
      name: "Summary",
      title: "Summary",
      subtitle: "Everything, in a single dashboard",
      description: "Axial length, refraction history, and lifestyle risks. From overview to insight, in one elegant glance."
    },
    {
      name: "Risk Radar",
      title: "Risk Radar",
      subtitle: "Know the risk. Change the outcome.",
      description: "Grading myopia risk and instantly see where your patient stands on the myopia risk spectrum. It's not just data. It's foresight."
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
    <section className="bg-bg-light py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <h2 className="font-heading text-center text-text-primary font-semibold text-[28px] md:text-[40px] mb-12">
          MyoPilot helps you navigate myopia with confidence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="h-[205px] bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-medium">{feature.name}</span>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-[24px] text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="font-semibold text-lg text-gray-500 mb-3">
                  {feature.subtitle}
                </p>
                <p className="text-base text-gray-500 font-['Source_Sans_3']">
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
