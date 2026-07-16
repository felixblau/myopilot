// Seeded sample patient for the onboarding prototype.
// Realistic values for a ~13yo myope so the generated report reads as plausible.

export interface EyePair<T> {
  od: T // right
  os: T // left
}

export interface SamplePatient {
  patientId: string
  firstName: string
  lastName: string
  preferredName: string
  displayName: string
  parentFirstName: string
  parentLastName: string
  phone: string
  email: string
  status: string
  dateOfBirth: string // ISO
  ageYears: number
  gender: string
  ethnicity: string
  location: string
  doctor: string
}

// Sample patient per the Figma onboarding frames: JANE (Jane) DOE.
export const samplePatient: SamplePatient = {
  patientId: 'PT-2025-03-0001',
  firstName: 'JANE',
  lastName: 'DOE',
  preferredName: 'Jane',
  displayName: 'Jane Doe',
  parentFirstName: 'Parent',
  parentLastName: 'Example',
  phone: '123-456-7890',
  email: 'sampleemail@gmail.com',
  status: 'Active',
  dateOfBirth: '2013-06-10',
  ageYears: 12.5,
  gender: 'F',
  ethnicity: 'Asian',
  location: 'Oakville Eye Care',
  doctor: 'Christine Yeung',
}

// Pre-filled measurements. Each tab mirrors the product's fields.
export const measurements = {
  examDate: '2026-07-16',
  ageAtExam: 12.5,

  // Aligned with the generated report: SER -4.50 both eyes, Axial 26.50/27.06.
  refractionSphere: {
    sphere: { od: '-4.25', os: '-4.25' } as EyePair<string>,
    cylinder: { od: '-0.50', os: '-0.50' } as EyePair<string>,
    axis: { od: '175', os: '10' } as EyePair<string>,
    seCycloplegic: { od: '-4.50', os: '-4.50' } as EyePair<string>, // spherical equivalent
  },

  keratometry: {
    k1Flat: { od: '43.00', os: '43.25' } as EyePair<string>,
    k2Steep: { od: '44.00', os: '44.25' } as EyePair<string>,
  },

  axialLength: {
    axialMm: { od: '26.50', os: '27.06' } as EyePair<string>,
    alcr: { od: 'High', os: 'High' } as EyePair<string>, // axial length / corneal radius ratio band
    estimated: false,
  },
}

export type Measurements = typeof measurements
