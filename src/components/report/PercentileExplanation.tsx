export default function PercentileExplanation() {
  return (
    <section className="flex flex-col gap-6">
      {/* Percentile explanation */}
      <div className="bg-[rgba(42,76,123,0.08)] rounded-md p-5">
        <p className="text-sm text-text-primary leading-relaxed">
          Your child's eyes are in the{' '}
          <span className="font-semibold">98th percentile</span> for length,
          meaning they are longer than{' '}
          <span className="font-semibold">98%</span> of children their
          age&mdash;one of the strongest signs of myopia progression. This
          helps us understand how their eyes are growing and whether additional
          steps may help protect their future vision.
        </p>
      </div>

      {/* Why This Matters */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-2">
          Why This Matters
        </h2>
        <p className="text-sm text-text-primary leading-relaxed">
          Myopia typically progresses as children grow, especially between the
          ages of 6&ndash;21. As the eye elongates, it can increase the
          likelihood of future conditions such as retinal detachment, glaucoma,
          or myopic maculopathy later in life.
        </p>
        <p className="text-sm text-text-primary leading-relaxed mt-3">
          <span className="font-semibold">The good news:</span> Myopia is
          common, manageable, and treatable. Early action gives your child the
          best chance for healthy, stable vision as they grow.
        </p>
      </div>
    </section>
  )
}
