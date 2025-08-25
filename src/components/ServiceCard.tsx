
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface ServiceProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  features?: string[];
}

const ServiceCard = ({ id, title, description, imageUrl, features }: ServiceProps) => {
  return (
    <Card className="rounded-xl bg-brand-white shadow-sm border border-brand-dark-cyan-200 overflow-hidden h-full flex flex-col transition-all md:hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform md:hover:scale-105 duration-500"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-brand-dark-cyan-700">{title}</CardTitle>
        <CardDescription className="mt-2 text-brand-white-200 line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      {features && features.length > 0 && (
        <CardContent>
          <ul className="mt-1 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-apricot-400" />
                <span className="text-brand-white-200">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
      
      <CardFooter className="mt-auto pt-4">
        <Button asChild className="w-full bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
          <Link to={`/booking?service=${id}`}>Book This Service</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
