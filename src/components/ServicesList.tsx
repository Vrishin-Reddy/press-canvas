
import ServiceCard, { ServiceProps } from './ServiceCard';

// Sample services data
export const services: ServiceProps[] = [
  {
    id: 'poster-printing',
    title: 'Poster Printing',
    description: 'Large format posters for events, advertising, and promotional campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
    features: ['Large format sizes', 'High resolution', 'UV resistant inks', 'Mounting options']
  },
  {
    id: 'vinyl-printing',
    title: 'Vinyl Printing',
    description: 'Durable and vibrant vinyl prints for outdoor and indoor applications.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    features: ['Weatherproof', 'Glossy or matte finish', 'Custom sizes', 'Long-lasting']
  },
  {
    id: 'foam-board-printing',
    title: 'Foam Board Printing',
    description: 'Lightweight yet sturdy foam board prints for displays and presentations.',
    imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f',
    features: ['High-quality prints', 'Custom dimensions', 'Ideal for exhibitions', 'Professional finish']
  },
  {
    id: 'flute-board-printing',
    title: 'Flute Board Printing',
    description: 'Affordable and durable flute board prints, ideal for signs and boards.',
    imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7',
    features: ['No Parking boards', 'To-Let boards', 'Weather resistant', 'Custom artwork']
  },
  {
    id: 'pullout-standees',
    title: 'Pullout Standees',
    description: 'Portable pullout standees perfect for promotions, exhibitions, and events.',
    imageUrl: 'https://images.unsplash.com/photo-1520974735194-17139d00a0d6',
    features: ['Easy setup', 'Custom graphics', 'Reusable', 'Travel-friendly']
  },
  {
    id: 'visiting-cards',
    title: 'Visiting Cards',
    description: 'Professional visiting cards with premium finishes and elegant designs.',
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a',
    features: ['Premium paper stock', 'Various finishes', 'Custom designs', 'Bulk pricing available']
  },
  {
    id: 'flex-banners',
    title: 'Flex Banners',
    description: 'High-quality flex banners for outdoor and indoor advertising campaigns.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    features: ['Weather resistant', 'Custom sizes', 'Vibrant colors', 'Quick turnaround']
  },
  {
    id: 'letter-pads',
    title: 'Letter Pads',
    description: 'Professional letterheads and letter pads for business correspondence.',
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
    features: ['Premium paper quality', 'Custom designs', 'Bulk quantities', 'Corporate branding']
  },
  {
    id: 'wedding-cards',
    title: 'Wedding Cards Printing',
    description: 'Exquisite wedding invitations with traditional and modern designs.',
    imageUrl: 'https://images.unsplash.com/photo-1559163407-254a04c6b9ef',
    features: ['Elegant designs', 'Premium paper', 'Gold foiling options', 'Complete wedding sets']
  },
  {
    id: 'stickers',
    title: 'Stickers',
    description: 'Custom stickers and labels for products, promotions, and branding.',
    imageUrl: 'https://images.unsplash.com/photo-1607461560627-96a8ad1b1060',
    features: ['Waterproof options', 'Die-cut shapes', 'Various materials', 'Small to large quantities']
  },
  {
    id: 'invitation-cards',
    title: 'Invitation Cards',
    description: 'Beautiful invitation cards for all occasions and celebrations.',
    imageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
    features: ['Custom occasions', 'Premium finishes', 'Embossing available', 'RSVP options']
  },
  {
    id: 'greeting-cards',
    title: 'Greeting Cards',
    description: 'Personalized greeting cards for festivals, birthdays, and special occasions.',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
    features: ['Festival specials', 'Personal messages', 'Quality cardstock', 'Custom artwork']
  },
  {
    id: 'one-way-vision',
    title: 'One Way Vision Stickers',
    description: 'Perforated window graphics that allow one-way visibility with striking storefront branding.',
    imageUrl: 'https://images.unsplash.com/photo-1520974735194-17139d00a0d6',
    features: ['Perforated film', 'Weather resistant', 'Custom sizes', 'High-opacity print']
  }
];

interface ServicesListProps {
  limit?: number;
  columns?: number;
}

const ServicesList = ({ limit, columns = 3 }: ServicesListProps) => {
  const displayServices = limit ? services.slice(0, limit) : services;
  
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 sm:gap-8`}>
      {displayServices.map((service) => (
        <ServiceCard key={service.id} {...service} />
      ))}
    </div>
  );
};

export default ServicesList;
