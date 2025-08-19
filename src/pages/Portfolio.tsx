import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: 'Royal Wedding Invitation Suite',
      category: 'wedding-cards',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
      description: 'Elegant wedding invitation with gold foiling and traditional motifs'
    },
    {
      id: 2,
      title: 'Corporate Business Cards',
      category: 'visiting-cards',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a',
      description: 'Professional business cards with embossed logo and premium finish'
    },
    {
      id: 3,
      title: 'Grand Opening Banner',
      category: 'flex-banners',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
      description: 'Large format flex banner for restaurant grand opening'
    },
    {
      id: 4,
      title: 'Corporate Letterhead Design',
      category: 'letter-pads',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
      description: 'Professional letterhead with company branding and watermark'
    },
    {
      id: 5,
      title: 'Product Label Stickers',
      category: 'stickers',
      image: 'https://images.unsplash.com/photo-1607461560627-96a8ad1b1060',
      description: 'Custom product labels with vibrant colors and waterproof coating'
    },
    {
      id: 6,
      title: 'Festival Greeting Cards',
      category: 'greeting-cards',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
      description: 'Traditional Diwali greeting cards with cultural designs'
    },
    {
      id: 7,
      title: 'Birthday Invitation',
      category: 'invitation-cards',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
      description: 'Colorful birthday party invitation with custom illustration'
    },
    {
      id: 8,
      title: 'Movie Promotional Poster',
      category: 'poster-printing',
      image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
      description: 'Large format movie poster with high-resolution graphics'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'visiting-cards', name: 'Visiting Cards' },
    { id: 'wedding-cards', name: 'Wedding Cards' },
    { id: 'flex-banners', name: 'Flex Banners' },
    { id: 'letter-pads', name: 'Letter Pads' },
    { id: 'stickers', name: 'Stickers' },
    { id: 'invitation-cards', name: 'Invitations' },
    { id: 'greeting-cards', name: 'Greeting Cards' },
    { id: 'poster-printing', name: 'Posters' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Our Portfolio</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Showcasing over 100 years of printing excellence. Browse through our finest work 
            and see the quality that has made us Hyderabad's trusted printing partner.
          </p>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section-container">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <Badge variant="secondary" className="text-xs">
                  {categories.find(cat => cat.id === item.category)?.name}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Next Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let our experienced team bring your vision to life with the same quality and craftsmanship 
              that has defined Sri Sharada Press for over 100 years.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/booking">Get Quote</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;