import { Award, Rocket, PenTool } from "lucide-react";

const WhyChooseFlexPrint = () => {
  const features = [
    {
      title: "Quality Guaranteed",
      description:
        "We use premium materials and state-of-the-art printing to deliver consistently excellent results.",
      Icon: Award,
      iconClass: "text-[#C8553D]",
    },
    {
      title: "Fast Turnaround",
      description:
        "Need it quickly? Our optimized workflow ensures your jobs are completed on time, every time.",
      Icon: Rocket,
      iconClass: "text-[#588B8B]",
    },
    {
      title: "Custom Design",
      description:
        "Our designers bring your ideas to life with tailor‑made artwork perfectly suited to your brand.",
      Icon: PenTool,
      iconClass: "text-[#C8553D]",
    },
  ];

  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#588B8B] via-[#F28F3B] to-[#C8553D]">
              FlexPrint?
            </span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We're committed to providing exceptional printing services with quick turnaround times and outstanding customer service.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-28 sm:w-36 rounded-full bg-gradient-to-r from-[#588B8B] via-[#F28F3B] to-[#C8553D]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map(({ title, description, Icon, iconClass }) => (
            <div
              key={title}
              role="article"
              tabIndex={0}
              className="group relative h-full rounded-2xl p-[1.5px] bg-gradient-to-br from-[#588B8B] via-[#F28F3B] to-[#C8553D] transition-all duration-300 md:hover:shadow-xl md:hover:translate-y-1 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#588B8B] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
            >
              <div className="h-full rounded-2xl bg-white dark:bg-slate-900 ring-[1px] ring-[#588B8B]/20 dark:ring-white/10 shadow-sm p-6 sm:p-8 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#FFD5C2]/60 dark:bg-slate-800 ring-[1px] ring-[#588B8B]/25 flex items-center justify-center mb-4">
                  <Icon aria-hidden="true" className={`h-6 w-6 ${iconClass}`} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
                <div className="mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#588B8B] via-[#F28F3B] to-[#C8553D]" />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(100deg,rgba(255,255,255,0)_20%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_80%)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseFlexPrint;


