export default function PatientInfo() {
  return (
    <div className="flex flex-col gap-3 text-xs">
      <div className="flex flex-col">
        <div className="flex gap-3 items-center">
          <span className="font-semibold text-text-primary">
            Oakville Eye Care
          </span>
          <span className="text-text-secondary">
            Dr. Christine Yeung &amp; Associates
          </span>
        </div>
        <span className="text-text-secondary">
          8-225 Speers Road, Oakville, ON L6K 2E9 &middot; (905) 339-1222
        </span>
      </div>
      <div className="flex flex-col text-text-primary">
        <span className="font-semibold">Olivia Smith</span>
        <span>sampleemail@gmail.com</span>
        <span>Jun 10, 2013 (12.5yo)</span>
        <span>Asian / Female</span>
      </div>
    </div>
  )
}
