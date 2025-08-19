import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { getWhatsAppLink } from '@/utils/whatsapp';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      company: 'Kumar Enterprises',
      rating: 5,
      text: 'Sri Sharada Press has been our trusted printing partner for over 15 years. Their quality is unmatched and delivery is always on time. The wedding cards they printed for my daughter\'s wedding were absolutely stunning!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      service: 'Wedding Cards'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Event Manager',
      company: 'Elite Events',
      rating: 5,
      text: 'Working with Sri Sharada Press for all our event printing needs has been amazing. From banners to invitation cards, everything is printed with perfection. Their 100+ years of experience really shows in their work.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
      service: 'Event Materials'
    },
    {
      id: 3,
      name: 'Mohammad Ali',
      role: 'Restaurant Owner',
      company: 'Spice Garden',
      rating: 5,
      text: 'The flex banners and visiting cards they created for our restaurant opening were incredible. The colors were vibrant and the quality was top-notch. Highly recommend their services!',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      service: 'Business Printing'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      role: 'Marketing Director',
      company: 'Tech Solutions',
      rating: 5,
      text: 'Sri Sharada Press understands our corporate needs perfectly. Their letterheads and business cards maintain our brand standards beautifully. The team is professional and efficient.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      service: 'Corporate Materials'
    },
    {
      id: 5,
      name: 'Venkat Rao',
      role: 'Shop Owner',
      company: 'Rao General Stores',
      rating: 5,
      text: 'Been getting my product stickers and promotional materials from Sri Sharada Press for years. M.V.G. Reddy and his team always deliver excellent quality at reasonable prices.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      service: 'Product Labels'
    },
    {
      id: 6,
      name: 'Lakshmi Devi',
      role: 'Social Worker',
      company: 'Community Center',
      rating: 5,
      text: 'For all our community events and social programs, Sri Sharada Press has been our go-to printing partner. They understand our requirements and always deliver beautiful work on time.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
      service: 'Community Events'
    }
  ];

  const stats = [
    { number: '100+', label: 'Years of Excellence' },
    { number: '50,000+', label: 'Happy Customers' },
    { number: '1M+', label: 'Orders Delivered' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">What Our Customers Say</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Over 100 years of satisfied customers across Hyderabad. 
            Read what they have to say about our quality and service.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why businesses and individuals across Hyderabad trust Sri Sharada Press 
            for all their printing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-tangerine-500 text-brand-tangerine-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Service Badge */}
                <Badge variant="secondary" className="mb-4">
                  {testimonial.service}
                </Badge>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Join Our Satisfied Customers</h2>
            <p className="mb-6 max-w-2xl mx-auto opacity-90">
              Experience the quality and service that has made Sri Sharada Press 
              the preferred choice for over 100 years.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/booking"
                className="bg-primary-foreground text-primary px-6 py-3 rounded-md font-medium hover:bg-primary-foreground/90 transition-colors"
              >
                Get Your Quote
              </a>
              <a
                href={getWhatsAppLink('Hi! I came from the testimonials page and want a quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary-foreground text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;