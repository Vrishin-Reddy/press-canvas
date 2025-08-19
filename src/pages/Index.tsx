
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import ServicesList from '@/components/ServicesList';
import WhyChooseFlexPrint from '@/components/WhyChooseFlexPrint';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Printing Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From visiting cards to wedding invitations, experience our complete range of premium printing services.
          </p>
        </div>
        
        <ServicesList limit={3} />
        
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* Why Choose Us Section (modernized) */}
      <WhyChooseFlexPrint />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your printing service today and experience the FlexPrint difference.
          </p>
          <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
