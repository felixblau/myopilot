import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

// Per-doctor projection defaults. In the product these would live on the user
// account; here we persist to localStorage so the preference feels account-level
// and survives reloads. See docs founder feedback: "set as preference … those
// projection lines just appear".

export type ScenarioKey = 'none' | 'ortho-k' | 'specs-cl' | 'atropine'

export interface Scenario {
  key: ScenarioKey
  label: string
  color: string // legend swatch / line color
}

// The scenarios a doctor can choose to project. Colors mirror the baked chart
// legend (No intervention = maroon, treatments = magenta/blue).
export const SCENARIOS: Scenario[] = [
  { key: 'none', label: 'No treatment', color: '#8b1a1a' },
  { key: 'ortho-k', label: 'Ortho-K', color: '#d946ef' },
  { key: 'specs-cl', label: 'Specs / CL', color: '#3b82f6' },
  { key: 'atropine', label: 'Atropine', color: '#f59e0b' },
]

export type TargetAge = 18 | 20 | 23 | 25
export type Eye = 'OD' | 'OS'

export interface ProjectionPrefs {
  targetAge: TargetAge
  scenarios: ScenarioKey[] // which lines appear by default
  autoShow: boolean // render automatically when measurements exist
  eye: Eye
}

// Sensible starting default — mirrors the founder's example ("project to 23",
// no treatment vs orthokeratology vs specs/CL).
const DEFAULT_PREFS: ProjectionPrefs = {
  targetAge: 23,
  scenarios: ['none', 'ortho-k', 'specs-cl'],
  autoShow: true,
  eye: 'OD',
}

const PREFS_KEY = 'myopilot:projectionDefaults'
const HIDDEN_KEY = 'myopilot:projectionHidden' // per-patient hidden scenarios

interface ProjectionPrefsState {
  prefs: ProjectionPrefs
  setPrefs: (p: ProjectionPrefs) => void
  // Per-patient hide/show, remembered across visits.
  hiddenFor: (patientId: string) => ScenarioKey[]
  toggleHidden: (patientId: string, key: ScenarioKey) => void
}

const Ctx = createContext<ProjectionPrefsState | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function ProjectionPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefsState] = useState<ProjectionPrefs>(() =>
    load(PREFS_KEY, DEFAULT_PREFS),
  )
  const [hidden, setHidden] = useState<Record<string, ScenarioKey[]>>(() =>
    load(HIDDEN_KEY, {}),
  )

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  }, [prefs])
  useEffect(() => {
    localStorage.setItem(HIDDEN_KEY, JSON.stringify(hidden))
  }, [hidden])

  const setPrefs = (p: ProjectionPrefs) => setPrefsState(p)

  const hiddenFor = (patientId: string) => hidden[patientId] ?? []

  const toggleHidden = (patientId: string, key: ScenarioKey) =>
    setHidden((h) => {
      const cur = h[patientId] ?? []
      const next = cur.includes(key)
        ? cur.filter((k) => k !== key)
        : [...cur, key]
      return { ...h, [patientId]: next }
    })

  return (
    <Ctx.Provider value={{ prefs, setPrefs, hiddenFor, toggleHidden }}>
      {children}
    </Ctx.Provider>
  )
}

export function useProjectionPrefs() {
  const ctx = useContext(Ctx)
  if (!ctx)
    throw new Error(
      'useProjectionPrefs must be used within ProjectionPrefsProvider',
    )
  return ctx
}
