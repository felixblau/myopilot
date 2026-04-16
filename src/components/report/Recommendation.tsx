export default function Recommendation() {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-2">
        Our Professional Recommendation for Your Child
      </h2>
      <p className="text-sm text-text-primary leading-relaxed mb-4">
        Based on today's findings, we recommend the following:
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border border-border rounded-md p-4">
          <p className="text-xs text-text-secondary mb-1">
            Primary recommendation
          </p>
          <p className="text-sm font-semibold text-text-primary">
            Orthokeratology
          </p>
        </div>
        <div className="border border-border rounded-md p-4">
          <p className="text-xs text-text-secondary mb-1">
            Secondary option (alternative)
          </p>
          <p className="text-sm font-semibold text-text-primary">
            Not available
          </p>
        </div>
      </div>

      <div className="bg-[rgba(42,76,123,0.08)] rounded-md p-4">
        <p className="text-sm text-text-primary leading-relaxed">
          This plan is chosen according to your child's risk level, age, growth
          pattern, and daily activities. Our goal is to provide a solution that
          fits their lifestyle while offering strong protection for long-term
          eye health.
        </p>
      </div>
    </section>
  )
}
