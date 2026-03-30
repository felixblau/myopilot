export default function Testimonials() {
  const testimonials = [
    {
      quote: "\u201cIt\u2019s like having a clinical assistant who knows every paper I\u2019ve read.\u201d",
      authorLine1: "Doctor Name,",
      authorLine2: "Clinic Name",
      bg: "bg-[#2a4c7c]"
    },
    {
      quote: "\u201cI was able to get the severity of my child\u2019s myopia with the easy, simple charts Dr. Yeung provided me\u201d",
      authorLine1: "Patient",
      authorLine2: "",
      bg: "bg-[#00aad4]"
    },
    {
      quote: "\u201cI finally feel confident explaining axial length to parents.\u201d",
      authorLine1: "Doctor Name,",
      authorLine2: "Clinic Name",
      bg: "bg-[#2a4c7c]"
    }
  ];

  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[80px] py-10 md:py-[64px] flex flex-col items-center gap-[40px]">
        <div className="flex flex-col md:flex-row gap-[24px] items-center w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-1 min-w-0 h-auto md:h-[316px] rounded-[13px] overflow-clip p-[40px] flex flex-col gap-[8px] items-start ${testimonial.bg}`}
            >
              <p className="flex-1 font-['Inter'] font-semibold text-[24px] leading-[1.5] text-white">
                {testimonial.quote}
              </p>
              <div className="font-['Source_Sans_3'] font-normal text-[16px] text-white leading-[1.25]">
                <p>{testimonial.authorLine1}</p>
                {testimonial.authorLine2 && <p>{testimonial.authorLine2}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
