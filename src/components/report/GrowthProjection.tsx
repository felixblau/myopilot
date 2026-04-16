export default function GrowthProjection() {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-2">
        Your Child's Personalized Growth Projection
      </h2>
      <p className="text-sm text-text-primary leading-relaxed mb-4">
        Using your child's current measurements, age, and growth data, MyoPilot
        provides a personalized projection:
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Unmanaged */}
        <div className="flex flex-col">
          <div className="mb-1">
            <p className="text-sm font-medium text-text-primary">
              If unmanaged
            </p>
            <p className="text-xs text-text-primary">
              Refraction: -9.06D (OD/OS)
            </p>
            <p className="text-xs text-text-secondary">
              Axial length: OD 27.86 mm / OS 28.32 mm by age 25
            </p>
          </div>
          <div className="relative rounded overflow-hidden">
            <img
              src="/report-assets/classroom.png"
              alt="Classroom view without treatment — severely blurred"
              className="w-full aspect-[16/9] object-cover rounded"
              style={{ filter: 'blur(4px)' }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/40 px-2 py-1">
              <span className="text-[11px] text-white">
                Cannot drive unaided
              </span>
            </div>
          </div>
        </div>

        {/* With treatment */}
        <div className="flex flex-col">
          <div className="mb-1">
            <p className="text-sm font-medium text-text-primary">
              With active management
            </p>
            <p className="text-xs text-text-primary">
              Refraction: -6.10D (OD/OS)
            </p>
            <p className="text-xs text-text-secondary">
              Axial length: OD 26.98 mm / OS 27.50 mm by age 25
            </p>
          </div>
          <div className="relative rounded overflow-hidden">
            <img
              src="/report-assets/classroom.png"
              alt="Classroom view with treatment — mild blur"
              className="w-full aspect-[16/9] object-cover rounded"
              style={{ filter: 'blur(0.5px)' }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/40 px-2 py-1">
              <span className="text-[11px] text-white">
                Functional independence
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(42,76,123,0.08)] rounded-md p-4">
        <p className="text-sm text-text-primary leading-relaxed">
          These projections help guide treatment&mdash;not predict with
          certainty. Every child is unique, and we adjust the plan as their eyes
          grow.
        </p>
      </div>
    </section>
  )
}
