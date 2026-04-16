import ReportHeader from './ReportHeader'
import PatientInfo from './PatientInfo'
import TodaysFindings from './TodaysFindings'
import AxialLengthChart from './AxialLengthChart'
import PercentileExplanation from './PercentileExplanation'
import GrowthProjection from './GrowthProjection'
import RiskFactors from './RiskFactors'
import TreatmentOptions from './TreatmentOptions'
import Recommendation from './Recommendation'
import NextSteps from './NextSteps'

export default function Report() {
  return (
    <div className="min-h-screen bg-bg-light flex justify-center py-8">
      <div className="bg-white w-full max-w-[600px] p-6 flex flex-col gap-6 shadow-sm">
        <ReportHeader />
        <PatientInfo />
        {/* 1. Results first */}
        <TodaysFindings />
        {/* 2. AXL chart and projections */}
        <AxialLengthChart />
        {/* 3. Percentile explanation + Why This Matters */}
        <PercentileExplanation />
        {/* 4. Growth projection with classroom blur images */}
        <GrowthProjection />
        {/* 5. Risk factors with emoji indicators */}
        <RiskFactors />
        {/* 6. Treatment options */}
        <TreatmentOptions />
        {/* 7. Professional recommendation */}
        <Recommendation />
        {/* 8. Next steps + closing */}
        <NextSteps />
      </div>
    </div>
  )
}
