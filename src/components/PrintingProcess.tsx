const steps = [
  {
    n: 1,
    title: "Consultation",
    desc: "We discuss your needs and provide expert advice on materials and specifications.",
  },
  {
    n: 2,
    title: "Design",
    desc: "Our designers create or optimize your artwork for the best print results.",
  },
  {
    n: 3,
    title: "Printing",
    desc: "We use high-quality materials and advanced printing technology.",
  },
  {
    n: 4,
    title: "Delivery",
    desc: "Your printed products are carefully checked and delivered on time.",
  },
];

export default function PrintingProcess(): JSX.Element {
  return (
    <section aria-labelledby="process-heading" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Printing Process
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#588B8B]/80 max-w-2xl mx-auto leading-relaxed">
            From initial concept to final delivery, we ensure quality at every step.
          </p>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Connector line (desktop only) */}
          <div className="pointer-events-none hidden lg:block absolute left-0 right-0 top-[56px] lg:top-[60px] border-t border-[#588B8B]/30 z-0" />

          {steps.map((step) => {
            const titleId = `process-step-${step.n}`;
            return (
              <article
                key={step.n}
                aria-labelledby={titleId}
                className="relative z-10 h-full flex flex-col items-center text-center justify-between bg-white border border-[#FFD5C2] rounded-2xl shadow-md p-6 md:p-7 lg:p-8 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg focus-within:shadow-lg focus-within:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[#588B8B] focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none motion-reduce:transform-none"
              >
                {/* Number badge */}
                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-white font-bold bg-[conic-gradient(at_50%_50%,#588B8B,#F28F3B,#C8553D,#588B8B)] transition-transform duration-200 ease-out hover:rotate-6 hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none after:absolute after:inset-[-10px] after:rounded-full after:bg-[radial-gradient(circle,#FFD5C2_0%,transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity"
                  aria-hidden="true"
                >
                  {step.n}
                </div>

                {/* Title */}
                <h3
                  id={titleId}
                  className="mt-4 text-xl font-semibold tracking-tight text-[#588B8B] relative after:content-[''] after:block after:w-0 hover:after:w-full after:h-[2px] after:bg-[#F28F3B] after:transition-all after:duration-300"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-[#588B8B]/70 leading-relaxed">
                  {step.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


