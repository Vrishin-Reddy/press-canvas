import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Rajesh Kumar',
    role: 'Business Owner',
    company: 'Kumar Enterprises',
    rating: 5,
    text:
      "Sri Sharada Press has been our trusted printing partner for years. Their quality is unmatched and delivery is always on time.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  },
  {
    name: 'Priya Sharma',
    role: 'Event Manager',
    company: 'Elite Events',
    rating: 5,
    text:
      "From banners to invitation cards, everything is printed with perfection. Their experience really shows in their work.",
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786',
  },
  {
    name: 'Mohammad Ali',
    role: 'Restaurant Owner',
    company: 'Spice Garden',
    rating: 5,
    text:
      "The flex banners and visiting cards for our opening were incredible — vibrant colors and top-notch quality.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by businesses and individuals across Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="h-full">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-tangerine-500 text-brand-tangerine-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">“{t.text}”</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={t.image} alt={t.name} />
                    <AvatarFallback>
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/testimonials"
            className="inline-flex items-center justify-center rounded-md px-5 py-3 font-medium text-white bg-brand-tangerine-500 hover:bg-brand-tangerine-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tangerine-500/40 focus-visible:ring-offset-2"
          >
            Read More Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}


