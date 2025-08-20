
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesList from '@/components/ServicesList';
import ServicesSection from '@/components/ServicesSection';
import HomeTestimonials from '@/components/HomeTestimonials';
import WhyChooseFlexPrint from '@/components/WhyChooseFlexPrint';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section (sits directly under Hero) */}
      <AboutSection />


      {/* Icon-centric Services Section (new) */}
      <ServicesSection />

      {/* Testimonials Preview */}
      <HomeTestimonials />

      {/* Why Choose Us Section (modernized) */}
      <WhyChooseFlexPrint />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your printing service today and experience the FlexPrint difference.
          </p>
          <Button size="lg" className="bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tangerine-500/40 focus-visible:ring-offset-2" asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
