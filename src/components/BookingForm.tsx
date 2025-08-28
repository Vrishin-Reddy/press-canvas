import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
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
import PhoneInput from '@/components/PhoneInput';
import { sendBookingEmail } from '@/utils/emailService';

const BookingForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = formRef.current!;
    const fd = new FormData(form);

    // Honeypot (spam) check
    const botcheck = String(fd.get("botcheck") || "");
    if (botcheck) {
      toast.error("Spam detected. Please try again.");
      return;
    }

    // Collect files (optional) and validate total size (<= 8MB)
    const fileInput = form.querySelector<HTMLInputElement>('input[name="attachment"]');
    const files = fileInput?.files ? Array.from(fileInput.files) : [];
    const total = files.reduce((s, f) => s + f.size, 0);
    if (total > 8 * 1024 * 1024) {
      toast.error("Attachments too large (limit 8MB total).");
      return;
    }

    // Get values from form data
    const name = String(fd.get("name") || "");
    const service = String(fd.get("service") || "");
    const quantity = String(fd.get("quantity") || "1");
    const dimensions = String(fd.get("dimensions") || "");
    const additionalInfo = String(fd.get("additionalInfo") || "");
    
    // Build details message
    const detailsParts = [
      `Quantity: ${quantity}`,
      dimensions ? `Dimensions: ${dimensions}` : undefined,
      selectedDate ? `Preferred Date: ${format(selectedDate, 'PPP')}` : undefined,
      additionalInfo ? `Notes: ${additionalInfo}` : undefined,
    ].filter(Boolean) as string[];

    // Find service title
    const serviceTitle = services.find((s) => s.id === service)?.title || service;

    // Build payload for email service
    const firstFile = files[0] ?? null;
    const payload = {
      name,
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: serviceTitle,
      dimensions: dimensions || undefined,
      quantity: parseInt(quantity, 10) || 1,
      preferredDate: selectedDate,
      additionalInfo: additionalInfo || undefined,
      file: firstFile,
    };

    if (!payload.name || !payload.email || !payload.phone || !payload.service) {
      toast.error("Please fill name, email, phone, and service details.");
      return;
    }

    setIsSubmitting(true);
    const tid = toast.loading("Sending your booking request…");
    try {
      const ok = await sendBookingEmail(payload);
      if (!ok) throw new Error("Failed to send booking request");
      toast.dismiss(tid);
      toast.success("Thanks! Your booking request was sent.");
      form.reset();
      setSelectedDate(undefined);
    } catch (err: any) {
      toast.dismiss(tid);
      toast.error(err?.message || "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6" noValidate>
      {/* Honeypot */}
      <div className="hidden">
        <label htmlFor="botcheck">Bot Check</label>
        <input id="botcheck" name="botcheck" placeholder="Leave empty" aria-hidden="true" tabIndex={-1} />
      </div>
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="Your full name" 
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="your.email@example.com" 
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <PhoneInput 
              id="phone" 
              name="phone"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Order Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service Type *</Label>
            <select 
              id="service"
              name="service" 
              defaultValue={preselectedService}
              required
              disabled={isSubmitting}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions (if applicable)</Label>
            <Input 
              id="dimensions" 
              name="dimensions"
              placeholder="e.g., 3ft x 2ft" 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input 
              id="quantity" 
              name="quantity"
              type="number" 
              min="1" 
              defaultValue="1"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Preferred Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
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
        
        <input 
          name="attachment" 
          type="file" 
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.svg,.tiff"
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Additional Information */}
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
        <Textarea 
          id="additionalInfo" 
          name="additionalInfo"
          placeholder="Any specific requirements or instructions for your order?" 
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
      </Button>
    </form>
  );
};

export default BookingForm;
