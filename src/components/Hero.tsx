
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-brand-dark-cyan-500 to-brand-tangerine-500 text-brand-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(hsl(var(--primary-foreground))_1px,transparent_1px)] [background-size:16px_16px]"></div>
      {/* Subtle printing lines animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient( to bottom, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 1px, transparent 1px, transparent 8px )',
          animation: 'print-move 2.5s linear infinite',
        }}
      />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">SSP</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Sri Sharada Press</h2>
                <p className="text-sm opacity-90">Est. 1912</p>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Celebrating 100+ Years of Craftsmanship in Print
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              Since 1912, we've been delivering exceptional multicolour offset printing services 
              with unmatched quality and precision in Hyderabad.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
                <Link to="/booking">Get Quote</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-lg">
              {/* Decorative elements */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <div className="bg-card shadow-lg rounded-lg p-6 h-80 flex items-center justify-center">
                  <img 
                    src="/printing_machine.jpg" 
                    alt="Large digital printing machine in a print workshop" 
                    className="h-full w-full object-cover rounded"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
