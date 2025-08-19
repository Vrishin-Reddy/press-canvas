
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">About Sri Sharada Press</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Learn about our company, our mission, and why customers choose us for their printing needs.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, FlexPrint started as a small family business with a passion for quality printing and design. 
              Over the years, we've grown to become a trusted name in the printing industry, serving businesses and individuals alike.
            </p>
            <p className="text-muted-foreground">
              We believe in combining traditional printing expertise with modern technology to deliver exceptional results. 
              Our team of skilled professionals is dedicated to bringing your ideas to life through vibrant colors, sharp details, and durable materials.
            </p>
          </div>
          <div className="bg-muted rounded-lg overflow-hidden h-80">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Our printing shop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            "To provide high-quality printing solutions with exceptional customer service, 
            helping our clients communicate their message effectively through print."
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the skilled professionals behind FlexPrint who make your printing projects come to life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500673922987-e212871fec22" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-primary">Founder & CEO</p>
          </div>
          
          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-primary">Lead Designer</p>
          </div>
          
          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Mike Johnson</h3>
            <p className="text-primary">Print Specialist</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to Work With Us?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience quality printing services from a team that cares about your success.
          </p>
          <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
