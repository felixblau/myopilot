export default function NextSteps() {
  return (
    <section className="flex flex-col gap-6">
      {/* What to Expect Next */}
      <div>
        <h2 className="text-base font-semibold text-text-primary mb-2">
          What to Expect Next
        </h2>
        <p className="text-sm text-text-primary leading-relaxed">
          Starting myopia management is simple. Once you're ready to move
          forward, we'll take care of the details and walk you through each step
          so your child can get started smoothly and with confidence.
        </p>
      </div>

      {/* Closing message */}
      <div className="bg-[rgba(42,76,123,0.08)] rounded-md p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          You're Taking the Right Steps
        </h3>
        <p className="text-sm text-text-primary leading-relaxed">
          Myopia is very manageable, especially when monitored closely. By
          learning about your child's eyes today, you're already making a
          powerful decision to protect their future vision. Thank you for
          trusting us with your child's care. Together, we can give them the
          clearest future possible.{' '}
          <span className="font-semibold">
            Early action leads to the best outcomes.
          </span>
        </p>
      </div>

      {/* CTA */}
      <div className="relative rounded-md overflow-hidden">
        <img
          src="/report-assets/bottom-bar.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative flex items-center justify-between p-4">
          <div>
            <p className="text-base font-semibold text-text-primary">
              Start Olivia's treatment
            </p>
            <p className="text-sm text-text-secondary">
              Schedule your next appointment now
            </p>
          </div>
          <button className="bg-[#2a4c7c] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#1e3a5f] transition-colors">
            Book appointment
          </button>
        </div>
      </div>
    </section>
  )
}
