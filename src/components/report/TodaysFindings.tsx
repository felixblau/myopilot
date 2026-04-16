export default function TodaysFindings() {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-2">
        Today's Findings
      </h2>
      <p className="text-xs text-text-secondary mb-4">
        Based on today's exam, here is where your child's vision currently
        stands:
      </p>
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-border rounded-md p-4">
          <p className="text-xs font-semibold text-[#2a4c7c] mb-2">
            Refraction (SER)
          </p>
          <p className="text-sm text-text-primary">
            OD: -4.50D &bull; OS: -4.50D
          </p>
          <p className="text-sm text-text-primary">Average: -4.50D</p>
          <p className="text-xs text-text-secondary mt-1">
            Percentile (OD/OS): 75% / 75%
          </p>
        </div>
        <div className="border border-border rounded-md p-4">
          <p className="text-xs font-semibold text-[#2a4c7c] mb-2">
            Axial Length
          </p>
          <p className="text-sm text-text-primary">
            OD: 26.50 mm &bull; OS: 27.06 mm
          </p>
          <p className="text-sm text-text-primary">Average: 26.78 mm</p>
          <p className="text-xs text-text-secondary mt-1">
            Percentile (OD/OS): 95% / 98%
          </p>
        </div>
        <div className="border border-border rounded-md p-4">
          <p className="text-xs font-semibold text-[#2a4c7c] mb-2">
            Overall Risk Level
          </p>
          <p className="text-sm font-semibold text-[#e53a36]">High</p>
          <p className="text-xs text-text-secondary mt-1">Score: 75%</p>
        </div>
      </div>
    </section>
  )
}
