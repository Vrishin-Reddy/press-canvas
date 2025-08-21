import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import FileUpload from '@/components/FileUpload';
import { services } from '@/components/ServicesList';
 
import { toast } from 'sonner';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  service: z.string().min(1, { message: 'Please select a service' }),
  dimensions: z.string().optional(),
  quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1' }),
  preferredDate: z.date().optional(),
  additionalInfo: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const loadingToastIdRef = useRef<string | number | null>(null);
  const submittingRef = useRef(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: preselectedService,
      dimensions: '',
      quantity: 1,
      additionalInfo: '',
    },
  });

  

  const onSubmit = async (data: BookingFormValues) => {
    if (submittingRef.current || isSubmitting) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    
    const id = toast.loading('Sending your booking request…');
    loadingToastIdRef.current = id;

    try {
      const detailsParts = [
        `Quantity: ${data.quantity}`,
        data.dimensions ? `Dimensions: ${data.dimensions}` : undefined,
        selectedDate ? `Preferred Date: ${format(selectedDate, 'PPP')}` : undefined,
        data.additionalInfo ? `Notes: ${data.additionalInfo}` : undefined,
      ].filter(Boolean) as string[];

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: services.find((s) => s.id === data.service)?.title || data.service,
        details: detailsParts.join('. '),
      };

      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed (${res.status})`);
      }

      toast.dismiss(id);
      toast.success('Thanks! Your booking request was sent. We’ll reply shortly.');
      // Reset form on success
      form.reset();
      setFile(null);
      setSelectedDate(undefined);
    } catch (err: any) {
      toast.dismiss(id);
      toast.error(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      loadingToastIdRef.current = null;
      submittingRef.current = false;
    }
  };

  useEffect(() => {
    return () => {
      if (loadingToastIdRef.current != null) {
        toast.dismiss(loadingToastIdRef.current);
      }
    };
  }, []);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name" 
              placeholder="Your full name" 
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-brand-jasper-500 text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-brand-jasper-500 text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input 
              id="phone" 
              placeholder="Your phone number" 
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className="text-brand-jasper-500 text-sm">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service Type *</Label>
            <Select 
              defaultValue={preselectedService} 
              onValueChange={(value) => form.setValue('service', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.service && (
              <p className="text-brand-jasper-500 text-sm">{form.formState.errors.service.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions (if applicable)</Label>
            <Input 
              id="dimensions" 
              placeholder="e.g., 3ft x 2ft" 
              {...form.register('dimensions')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input 
              id="quantity" 
              type="number" 
              min="1" 
              {...form.register('quantity')}
            />
            {form.formState.errors.quantity && (
              <p className="text-brand-jasper-500 text-sm">{form.formState.errors.quantity.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Preferred Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Upload Your Design (optional)</h3>
          <p className="text-sm text-muted-foreground">
            Upload your design file or we can create a design for you.
          </p>
        </div>
        
        <FileUpload onFileChange={handleFileChange} />
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
        <Textarea 
          id="additionalInfo" 
          placeholder="Any specific requirements or instructions for your order?" 
          {...form.register('additionalInfo')}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
      </Button>
    </form>
  );
};

export default BookingForm;
