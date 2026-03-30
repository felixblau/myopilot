export default function Testimonials() {
  const testimonials = [
    {
      quote: "It's like having a clinical assistant who knows every paper I've read.",
      author: "Doctor Name,",
      role: "Clinic Name"
    },
    {
      quote: "I was able to get the severity of my child's myopia with the easy, simple charts Dr. Yeung provided me",
      author: "Patient",
      role: ""
    },
    {
      quote: "I finally feel confident explaining axial length to parents.",
      author: "Doctor Name,",
      role: "Clinic Name"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-1 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 p-10 min-h-[316px] flex flex-col justify-between"
            >
              <p className="font-heading font-semibold text-2xl text-text-primary leading-[1.5]">
                {testimonial.quote}
              </p>
              <div className="font-source-sans text-base text-text-secondary">
                <div>{testimonial.author}</div>
                {testimonial.role && <div>{testimonial.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
