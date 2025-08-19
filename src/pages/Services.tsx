
import ServicesList from '@/components/ServicesList';

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Our Printing Services</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover our complete range of high-quality printing and design services.
            We offer solutions for businesses and individuals alike.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-container">
        <ServicesList />
      </section>

      {/* Process Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Printing Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From initial concept to final delivery, we ensure quality at every step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Line connecting the steps (only on desktop) */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-border z-0"></div>
            
            {/* Step 1 */}
            <div className="bg-card p-6 rounded-lg shadow-sm relative z-10">
              <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Consultation</h3>
              <p className="text-muted-foreground text-center">
                We discuss your needs and provide expert advice on materials and specifications.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-card p-6 rounded-lg shadow-sm relative z-10">
              <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Design</h3>
              <p className="text-muted-foreground text-center">
                Our designers create or optimize your artwork for the best print results.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-card p-6 rounded-lg shadow-sm relative z-10">
              <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Printing</h3>
              <p className="text-muted-foreground text-center">
                We use high-quality materials and advanced printing technology.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="bg-card p-6 rounded-lg shadow-sm relative z-10">
              <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                <span className="font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">Delivery</h3>
              <p className="text-muted-foreground text-center">
                Your printed products are carefully checked and delivered on time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
