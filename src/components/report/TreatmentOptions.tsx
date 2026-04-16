interface Treatment {
  name: string
  description: string
  efficacy: string
  icon: string
}

const treatments: Treatment[] = [
  {
    name: 'Orthokeratology (Ortho-K) Lenses',
    description:
      'Custom overnight retainers that reshape the front of the eye while your child sleeps, providing clear daytime vision without glasses. Ideal for active kids.',
    efficacy: '50–80% slower axial length growth',
    icon: '🌙',
  },
  {
    name: 'Daily Soft Myopia-Control Lenses',
    description:
      'Specialized soft contact lenses worn during the day that correct vision while reducing the stimulus for the eye to elongate. Comfortable and convenient.',
    efficacy: '59% slower progression',
    icon: '👁️',
  },
  {
    name: 'Atropine Eye Drops',
    description:
      'Low-dose atropine drops used nightly to help reduce the rate of eye growth. Simple, well-tolerated, with minimal side effects — often combined with other treatments.',
    efficacy: '50% slower progression',
    icon: '💧',
  },
  {
    name: 'Myopia-Control Glasses',
    description:
      'Specialty spectacle lenses designed to reduce progression while providing clear vision. A great option for younger children or those not ready for contact lenses.',
    efficacy: '59–67% slower progression',
    icon: '👓',
  },
]

export default function TreatmentOptions() {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-2">
        How We Can Help Protect Their Vision
      </h2>
      <p className="text-sm text-text-primary leading-relaxed mb-4">
        Below are the four scientifically supported ways to help slow myopia
        progression. Each option is safe, effective, and commonly used
        worldwide.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {treatments.map((t) => (
          <div
            key={t.name}
            className="border border-border rounded-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-start gap-2">
              <span className="text-xl">{t.icon}</span>
              <h3 className="text-sm font-semibold text-text-primary">
                {t.name}
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              {t.description}
            </p>
            <div className="mt-auto pt-2">
              <span className="inline-block text-xs font-medium text-[#2a4c7c] bg-[rgba(42,76,123,0.08)] px-2 py-1 rounded">
                {t.efficacy}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
