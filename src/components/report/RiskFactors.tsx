type RiskLevel = 'low' | 'moderate' | 'high'

function RiskIndicator({ level }: { level: RiskLevel }) {
  const config = {
    low: { emoji: '😊', bg: 'bg-green-100', text: 'text-green-700', label: 'Low' },
    moderate: { emoji: '😐', bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Moderate' },
    high: { emoji: '😟', bg: 'bg-red-100', text: 'text-red-700', label: 'High' },
  }
  const c = config[level]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
      <span>{c.emoji}</span> {c.label}
    </span>
  )
}

interface Factor {
  label: string
  value: string
  detail: string
  level: RiskLevel
}

const factors: Factor[] = [
  {
    label: 'Family History',
    value: '2 myopic parents',
    detail: '2 parents = high, 1 parent = moderate, 0 = low',
    level: 'high',
  },
  {
    label: 'Growth Pattern',
    value: '+0.60 mm/yr (OD), +0.22 mm/yr (OS)',
    detail: 'Axial length change per year',
    level: 'high',
  },
  {
    label: 'Age of Onset',
    value: 'Age 7',
    detail: '≤10 = high, 11–15 = moderate, 16+ = low',
    level: 'high',
  },
  {
    label: 'Screen Time',
    value: '4 hrs/day',
    detail: '2+ = high, 1 = moderate, 0 = low',
    level: 'high',
  },
  {
    label: 'Outdoor Time',
    value: '0 hrs/day',
    detail: '<1 hr = high, 1–2 hrs = moderate, 2+ hrs = low',
    level: 'high',
  },
  {
    label: 'Axial Length Percentile',
    value: '98th percentile',
    detail: '>50th = high',
    level: 'high',
  },
]

export default function RiskFactors() {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-2">
        What's Unique About Your Child
      </h2>
      <p className="text-sm text-text-primary leading-relaxed mb-4">
        Today's exam identified specific factors that influence your child's
        myopia progression:
      </p>

      <div className="border border-border rounded-md overflow-hidden">
        {factors.map((f, i) => (
          <div
            key={f.label}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== factors.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">
                {f.label}
              </p>
              <p className="text-xs text-text-secondary">{f.value}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text-secondary hidden sm:block">
                {f.detail}
              </span>
              <RiskIndicator level={f.level} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-text-primary leading-relaxed mt-4">
        Understanding these elements helps us tailor a plan that fits your
        child's individual needs.
      </p>
    </section>
  )
}
