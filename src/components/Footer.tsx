
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, ExternalLink, BookOpen, Layers,
  ArrowUp
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const ADDRESS = "15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);

const Footer = () => {
  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <footer className="relative bg-background text-foreground">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-dark-cyan-500 via-brand-tangerine-500 to-brand-jasper-500 overflow-hidden">
        <span className="block h-full w-1/3 bg-white/30 blur-[2px] animate-[shine_6s_linear_infinite]" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.brand.dark-cyan.DEFAULT)/12,transparent_60%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=http://www.w3.org/2000/svg width=160 height=160 viewBox=0 0 160 160%3E%3Cfilter id=noise%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.8 stitchTiles=stitch/%3E%3CfeColorMatrix type=matrix values=0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23noise)/%3E%3C/svg%3E')" }} />

      <nav aria-label="Footer" className="relative container mx-auto px-4 py-12">
        <div className="hidden md:grid gap-8 md:grid-cols-4">
          <div className="rounded-2xl border border-muted/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md motion-safe:transition-all will-change-transform lg:p-5 hover:-translate-y-[2px]">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Sri Sharada Press logo"
                className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-1 ring-muted/30"
                loading="lazy"
                decoding="async"
              />
              <span className="text-2xl md:text-3xl font-semibold tracking-tight">Sri Sharada Press</span>
            </div>
            <p className="text-base text-muted-foreground">
              For more than a century, Sri Sharada Press has transformed ideas into print with integrity and innovation. Rooted in heritage, we continue to serve families and businesses with printing that endures.
            </p>
          </div>

          <div className="rounded-2xl border border-muted/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md motion-safe:transition-all will-change-transform lg:p-5 hover:-translate-y-[2px]">
            <h4 className="mb-4 text-lg md:text-xl font-semibold tracking-wide inline-flex items-center gap-2"><BookOpen className="h-4 w-4" aria-hidden />Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li><Link to="/" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Home</Link></li>
              <li><Link to="/services" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Services</Link></li>
              <li><Link to="/about" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">About Us</Link></li>
              <li><Link to="/contact" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Contact</Link></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-muted/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md motion-safe:transition-all will-change-transform lg:p-5 hover:-translate-y-[2px]">
            <h4 className="mb-4 text-lg md:text-xl font-semibold tracking-wide inline-flex items-center gap-2"><Layers className="h-4 w-4" aria-hidden />Our Services</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base">
              {[
                "Poster Printing","Foam Board Printing","Pullout Standees","Flex Banners","Wedding Cards Printing",
                "Invitation Cards","One Way Vision Stickers","Vinyl Printing","Flute Board Printing","Visiting Cards",
                "Letter Pads","Stickers","Greeting Cards",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/booking"
                    aria-label={`Book ${s}`}
                    className="relative inline-block transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-muted/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md motion-safe:transition-all will-change-transform lg:p-5 hover:-translate-y-[2px]">
            <h4 className="mb-4 text-lg md:text-xl font-semibold tracking-wide inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />Contact Us</h4>
            <address className="not-italic text-base space-y-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in Google Maps"
                className="group inline-flex items-start gap-2 hover:text-brand-dark-cyan transition-colors"
                aria-label={`Open ${ADDRESS} in Google Maps`}
              >
                <MapPin className="mt-0.5 h-4 w-4 opacity-80" aria-hidden="true" />
                <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all group-hover:after:w-full">
                  {ADDRESS}
                </span>
                <ExternalLink className="mt-0.5 h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
              </a>

              <a href="tel:+919391011520" className="inline-flex items-center gap-2 hover:underline">
                <Phone className="h-4 w-4 opacity-80" aria-hidden="true" /> +91 9391011520
              </a>

              <a href="mailto:venu.min@gmail.com" className="inline-flex items-center gap-2 hover:underline">
                <Mail className="h-4 w-4 opacity-80" aria-hidden="true" /> venu.min@gmail.com
              </a>
            </address>

            {null}
          </div>
        </div>

        <div className="md:hidden space-y-6">
          <div className="rounded-2xl border border-muted/15 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm hover:shadow-md motion-safe:transition-all will-change-transform p-5">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Sri Sharada Press logo" className="h-12 w-12 rounded-full object-cover ring-1 ring-muted/30" loading="lazy" decoding="async" />
              <span className="text-xl font-semibold tracking-tight">Sri Sharada Press</span>
            </div>
            <p className="text-base text-muted-foreground">
              For more than a century, Sri Sharada Press has transformed ideas into print with integrity and innovation. Rooted in heritage, we continue to serve families and businesses with printing that endures.
            </p>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="qlinks">
              <AccordionTrigger>Quick Links</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-base">
                  <li><Link to="/" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Home</Link></li>
                  <li><Link to="/services" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Services</Link></li>
                  <li><Link to="/about" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">About Us</Link></li>
                  <li><Link to="/contact" className="relative transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full">Contact</Link></li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="services">
              <AccordionTrigger>Our Services</AccordionTrigger>
              <AccordionContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-base">
                  {[
                    "Poster Printing","Foam Board Printing","Pullout Standees","Flex Banners","Wedding Cards Printing",
                    "Invitation Cards","One Way Vision Stickers","Vinyl Printing","Flute Board Printing","Visiting Cards",
                    "Letter Pads","Stickers","Greeting Cards",
                  ].map((s) => (
                    <li key={s}>
                      <Link
                        to="/booking"
                        aria-label={`Book ${s}`}
                        className="relative inline-block transition-colors hover:text-brand-dark-cyan after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all hover:after:w-full"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact">
              <AccordionTrigger>Contact Us</AccordionTrigger>
              <AccordionContent>
                <address className="not-italic text-base space-y-2 break-words">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open in Google Maps"
                    className="group inline-flex items-start gap-2 hover:text-brand-dark-cyan transition-colors"
                    aria-label={`Open ${ADDRESS} in Google Maps`}
                  >
                    <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-brand-dark-cyan after:transition-all group-hover:after:w-full break-words">
                      {ADDRESS}
                    </span>
                  </a>

                  <a href="tel:+919391011520" className="inline-flex items-center gap-2 hover:underline">
                    +91 9391011520
                  </a>

                  <a href="mailto:venu.min@gmail.com" className="inline-flex items-center gap-2 hover:underline">
                    venu.min@gmail.com
                  </a>
                </address>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-10">
          <Separator />
          <p className="py-6 text-center text-sm text-muted-foreground">© 2025 Sri Sharada Press. All rights reserved.</p>
        </div>
      </nav>

      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-10 w-10 rounded-full bg-brand-tangerine-500 text-brand-white shadow-md hover:bg-brand-tangerine-400 focus-visible:ring-2"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 mx-auto" aria-hidden />
      </button>

      <style>{`
@keyframes shine { 0% { transform: translateX(-100%);} 100% { transform: translateX(400%);} }
@media (prefers-reduced-motion: reduce) {
  .motion-safe\\:transition-all { transition: none !important; }
  .animate-[shine_6s_linear_infinite] { animation: none !important; }
}
      `}</style>
    </footer>
  );
};

export default Footer;


