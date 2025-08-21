import BookingForm from '@/components/BookingForm';

const Booking = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Book Your Printing Service</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Fill out the form below to request a quote or place an order. We'll
            get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
