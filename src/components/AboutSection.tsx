import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const highlights = [
  'First Telugu printing press in Hyderabad',
  '113 years of craftsmanship across 3 generations',
  'Trusted by families and businesses since 1912',
];

export default function AboutSection() {
  return (
    <section aria-labelledby="about-title" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 id="about-title" className="text-3xl md:text-4xl font-extrabold tracking-tight">
            About Us
          </h2>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground">
            113 Years of Printing Heritage
          </p>
          <div className="mx-auto mt-3 h-[2px] w-28 md:w-36 rounded-full bg-gradient-to-r from-brand-dark-cyan-500 to-brand-tangerine-500 opacity-90" />
        </div>

        {/* Body copy */}
        <div className="mt-8 md:mt-10 text-balance leading-relaxed text-foreground/90 max-w-3xl mx-auto md:text-left text-center">
          <p>
            Founded in 1912 during the glorious reign of the 7th Nizam of Hyderabad, Sri Sharada Press was a pioneer in Telugu printing—at a time when printing was rare and mostly dominated by Urdu and Persian. What began as a humble letterpress has today grown into a modern printing powerhouse, offering offset, digital, and flex solutions for families, businesses, and institutions.
          </p>
          <p className="mt-4">
            Through three generations, one promise has remained constant: quality, trust, and innovation.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {highlights.map((item) => (
            <div
              key={item}
              className="h-full rounded-2xl border border-muted/30 bg-background shadow-sm p-5 flex items-start gap-3 transition-shadow md:hover:shadow-md"
            >
              <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                <Check className="h-4 w-4" aria-hidden="true" />
              </div>
              <p className="text-foreground/90">{item}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tangerine-500/40 focus-visible:ring-offset-2"
          >
            <Link to="/about">Know More About Us →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}


