import {
  Image,
  Disc,
  Square,
  PanelBottom,
  PanelsTopLeft,
  IdCard,
  Layout,
  FileText,
  Heart,
  Sticker,
  Mail,
  Gift,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

type Service = {
  name: string;
  description: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  slug?: string; // used to preselect on booking page
};

const services: Service[] = [
  {
    name: "Poster Printing",
    description:
      "Large format posters for events, advertising, and promotional campaigns.",
    features: [
      "Large format sizes",
      "High resolution",
      "UV resistant inks",
      "Mounting options",
    ],
    icon: Image,
  },
  {
    name: "Vinyl Printing",
    description:
      "Durable and vibrant vinyl prints for outdoor and indoor applications.",
    features: [
      "Weatherproof",
      "Glossy or matte finish",
      "Custom sizes",
      "Long-lasting",
    ],
    icon: Disc,
    slug: "vinyl-printing",
  },
  {
    name: "Foam Board Printing",
    description:
      "Lightweight yet sturdy foam board prints for displays and presentations.",
    features: [
      "High-quality prints",
      "Custom dimensions",
      "Ideal for exhibitions",
      "Professional finish",
    ],
    icon: Square,
    slug: "foam-board-printing",
  },
  {
    name: "Flute Board Printing",
    description:
      "Affordable and durable flute board prints, ideal for signs and boards.",
    features: [
      "No Parking boards",
      "To-Let boards",
      "Weather resistant",
      "Custom artwork",
    ],
    icon: PanelBottom,
    slug: "flute-board-printing",
  },
  {
    name: "Pullout Standees",
    description:
      "Portable pullout standees perfect for promotions, exhibitions, and events.",
    features: ["Easy setup", "Custom graphics", "Reusable", "Travel-friendly"],
    icon: PanelsTopLeft,
    slug: "pullout-standees",
  },
  {
    name: "Visiting Cards",
    description:
      "Professional visiting cards with premium finishes and elegant designs.",
    features: [
      "Premium paper stock",
      "Various finishes",
      "Custom designs",
      "Bulk pricing available",
    ],
    icon: IdCard,
    slug: "visiting-cards",
  },
  {
    name: "Flex Banners",
    description:
      "High-quality flex banners for outdoor and indoor advertising campaigns.",
    features: [
      "Weather resistant",
      "Custom sizes",
      "Vibrant colors",
      "Quick turnaround",
    ],
    icon: Layout,
    slug: "flex-banners",
  },
  {
    name: "Letter Pads",
    description:
      "Professional letterheads and letter pads for business correspondence.",
    features: [
      "Premium paper quality",
      "Custom designs",
      "Bulk quantities",
      "Corporate branding",
    ],
    icon: FileText,
    slug: "letter-pads",
  },
  {
    name: "Wedding Cards Printing",
    description:
      "Exquisite wedding invitations with traditional and modern designs.",
    features: [
      "Elegant designs",
      "Premium paper",
      "Gold foiling options",
      "Complete wedding sets",
    ],
    icon: Heart,
    slug: "wedding-cards",
  },
  {
    name: "Stickers",
    description:
      "Custom stickers and labels for products, promotions, and branding.",
    features: [
      "Waterproof options",
      "Die-cut shapes",
      "Various materials",
      "Small to large quantities",
    ],
    icon: Sticker,
    slug: "stickers",
  },
  {
    name: "Invitation Cards",
    description:
      "Beautiful invitation cards for all occasions and celebrations.",
    features: [
      "Custom occasions",
      "Premium finishes",
      "Embossing available",
      "RSVP options",
    ],
    icon: Mail,
    slug: "invitation-cards",
  },
  {
    name: "Greeting Cards",
    description:
      "Personalized greeting cards for festivals, birthdays, and special occasions.",
    features: [
      "Festival specials",
      "Personal messages",
      "Quality cardstock",
      "Custom artwork",
    ],
    icon: Gift,
    slug: "greeting-cards",
  },
];

export default function ServicesSection(): JSX.Element {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Icon‑centric, modern print solutions tailored to your needs — premium quality with fast turnaround.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <article
                key={svc.name}
                tabIndex={0}
                className="group relative h-full rounded-2xl border border-[#588B8B]/20 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 md:hover:shadow-xl md:hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#588B8B] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
              >
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  {/* Icon badge */}
                  <div className="mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-1 ring-[#588B8B]/30 bg-gradient-to-tr from-[#588B8B] via-[#F28F3B] to-[#C8553D] flex items-center justify-center">
                      <Icon aria-hidden="true" className="text-white h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-[#588B8B]">{svc.name}</h3>

                  {/* Description */}
                  <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {svc.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#588B8B] flex-none" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-6 md:mt-auto">
                    <Link
                      to={svc.slug ? `/booking?service=${svc.slug}` : "/booking"}
                      className="w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#588B8B] via-[#F28F3B] to-[#C8553D] shadow-sm transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#588B8B] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900"
                      aria-label={`Book ${svc.name}`}
                    >
                      Book This Service
                    </Link>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 md:group-hover:ring-2 ring-[#588B8B]/20 transition-all duration-300" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


