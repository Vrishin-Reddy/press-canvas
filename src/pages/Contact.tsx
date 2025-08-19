
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { toast } from 'sonner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    toast.success('Message sent successfully! We will get back to you soon.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-brand-dark-cyan-500 to-brand-jasper-500 text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Get in touch with our team for inquiries, support, or to discuss your printing needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Location</h3>
                  <p className="text-muted-foreground">15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India.</p>
                  <p className="text-muted-foreground">Business Hours: Mon-Sat, 9:30am - 9:30pm</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+91 9391011520</p>
                  <p className="text-muted-foreground">M.V.G. Reddy - Owner</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-muted-foreground">venu.min@gmail.com</p>
                  <p className="text-muted-foreground">For quotes and inquiries</p>
                </div>
              </div>
              
              {/* WhatsApp Link */}
              <div className="mt-8">
                <a
                  href={getWhatsAppLink('Hello! I would like to inquire about your printing services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#25D366] text-white px-4 py-2 font-semibold hover:bg-[#1EBE59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="relative w-full h-96">
              <iframe
                title="Sri Sharada Press Location"
                src={`https://www.google.com/maps?q=${encodeURIComponent('15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India')}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-background border-t">
              <span className="text-sm text-muted-foreground truncate">15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India</span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-brand-tangerine-500 px-4 py-2 text-sm font-semibold text-brand-white hover:bg-brand-tangerine-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-tangerine-500/40 focus-visible:ring-offset-2"
              >
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
