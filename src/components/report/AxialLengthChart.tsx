import { useState } from 'react'

export default function AxialLengthChart() {
  const [activeEye, setActiveEye] = useState<'left' | 'right'>('left')

  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-2 items-baseline">
          <h3 className="text-sm font-medium text-text-primary">
            Axial Length
          </h3>
          <span className="text-xs text-text-primary">
            {activeEye === 'left' ? 'Left: 25.70mm' : 'Right: 26.50mm'}
          </span>
          <span className="text-xs text-[#e53a36]">
            {activeEye === 'left' ? '+0.30/yr' : '+0.22/yr'}
          </span>
        </div>
        <div className="flex border border-border rounded overflow-hidden text-sm">
          <button
            onClick={() => setActiveEye('left')}
            className={`px-3 py-1.5 ${
              activeEye === 'left'
                ? 'bg-[#2a4c7c] text-white'
                : 'bg-white text-text-primary'
            }`}
          >
            Left
          </button>
          <button
            onClick={() => setActiveEye('right')}
            className={`px-3 py-1.5 border-l border-border ${
              activeEye === 'right'
                ? 'bg-[#2a4c7c] text-white'
                : 'bg-white text-text-primary'
            }`}
          >
            Right
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Y axis */}
        <div className="flex flex-col items-center justify-center pr-1 pb-7">
          <span className="text-xs text-text-secondary -rotate-90 whitespace-nowrap">
            Axial Length (mm)
          </span>
        </div>
        <div className="flex flex-col items-end justify-between text-xs text-text-primary pr-2 pb-7">
          <span>27.42</span>
          <span>26</span>
          <span>24</span>
          <span>22</span>
          <span>20.34</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          <div className="relative h-[400px] overflow-hidden">
            {/* Gradient background (percentile bands) */}
            <img
              src="/report-assets/grad-map.svg"
              alt=""
              className="absolute inset-0 w-full h-full"
            />
            {/* Vertical grid */}
            <img
              src="/report-assets/v-grid.svg"
              alt=""
              className="absolute inset-0 w-full h-full"
            />
            {/* Treatment period marker */}
            <div className="absolute left-[47%] top-0 bottom-0 w-4">
              <img
                src="/report-assets/treatment-period.svg"
                alt=""
                className="w-full h-full"
              />
            </div>
            {/* Projection lines */}
            <div className="absolute inset-0">
              <img
                src="/report-assets/all-lines.svg"
                alt=""
                className="absolute w-full bottom-0"
                style={{ height: '70%' }}
              />
            </div>
            {/* Labels */}
            <span className="absolute right-12 top-[40%] text-sm text-text-primary">
              Ortho-K treatment
            </span>
            <span className="absolute right-12 top-[62%] text-sm text-text-primary">
              No treatment
            </span>
            {/* Today marker */}
            <span className="absolute left-[44%] bottom-3 text-xs text-text-secondary opacity-70">
              Today (12.5yrs)
            </span>
          </div>
          {/* X axis */}
          <div className="flex justify-between px-6 text-xs text-text-primary">
            <span>6</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
          </div>
          <div className="text-center text-xs text-text-secondary mt-1">
            Age (Years)
          </div>
        </div>
      </div>
    </section>
  )
}
