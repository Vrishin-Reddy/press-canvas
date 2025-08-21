
import { useRef } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Phone, Mail, MapPin, CalendarDays, Send, Paperclip } from 'lucide-react';
import { getWhatsAppLink } from '@/utils/whatsapp';
import { sendContactEmail } from '@/utils/emailService';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(8, 'Enter a valid phone').optional(),
  subject: z.enum(['General Inquiry','Quote Request','Support','Feedback']).default('General Inquiry'),
  message: z.string().min(10, 'Please include a few details (min 10 chars)').max(1000),
  deadline: z.date().optional(),
  allowWhatsApp: z.boolean().default(false),
  attachment: z.any().optional(),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

// Removed custom WhatsApp SVG; using public/whatsapp_logo.png instead

const Contact = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
      deadline: undefined,
      allowWhatsApp: false,
      attachment: undefined,
      website: '',
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, control, register, watch, reset, setValue, setFocus, formState } = methods;
  const { errors, isSubmitting } = formState;

  const values = watch();
  const messageLength = (values.message ?? '').length;

  const onSubmit = async (data: FormValues) => {
    if (data.website && data.website.trim().length > 0) {
      // Honeypot filled: silently abort
      return;
    }

    const success = await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      deadline: data.deadline,
      allowWhatsApp: data.allowWhatsApp,
      attachment: data.attachment as File | undefined,
    });

    if (success) {
      if (data.phone && data.phone.trim().length >= 8) {
        const whatsappText = `Hello! I would like to inquire about ${data.subject}. My name is ${data.name}. Phone: ${data.phone}. ${data.message}`;
        const waUrl = getWhatsAppLink(whatsappText);
        try {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        } catch {}
      }
      toast.success('Message sent successfully! We will get back to you soon.');
      reset({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
        deadline: undefined,
        allowWhatsApp: false,
        attachment: undefined,
        website: '',
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      toast.error('Failed to send your message. Please try again.');
    }
  };

  const onError = () => {
    const firstErrorField = Object.keys(errors)[0] as keyof FormValues | undefined;
    if (firstErrorField) {
      toast.error((errors[firstErrorField]?.message as string) || 'Please fix the highlighted field.');
      setFocus(firstErrorField as any);
    }
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

      {/* Main Section: Form + Info/Map */}
      <section className="section-container">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] gap-8">
            {/* LEFT: Form Card (RHF + zod) */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit, onError)} className="contents">
                <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" /> Send Us a Message
                    </CardTitle>
                    <CardDescription>We usually reply within a few business hours.</CardDescription>
                    {/* Subtle progress bar */}
                    <div className="mt-4 h-1 w-full rounded bg-muted">
                      {(() => {
                        const total = 4; // name, email, subject, message
                        let filled = 0;
                        if (values.name && values.name.length >= 2) filled += 1;
                        if (values.email) filled += 1;
                        if (values.subject) filled += 1;
                        if (values.message && values.message.length >= 10) filled += 1;
                        const percent = Math.round((filled / total) * 100);
                        return (
                          <div className="h-1 rounded bg-brand-dark-cyan-500 transition-all" style={{ width: `${percent}%` }} />
                        );
                      })()}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Honeypot */}
                    <div className="sr-only">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" placeholder="Your website" aria-hidden="true" tabIndex={-1} {...register('website')} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name<span className="text-destructive"> *</span></Label>
                        <Input id="name" placeholder="Enter your full name" aria-invalid={!!errors.name} disabled={isSubmitting} className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2" {...register('name')} />
                        {errors.name && <p className="text-sm text-destructive">{String(errors.name.message)}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email<span className="text-destructive"> *</span></Label>
                        <Input id="email" type="email" placeholder="you@example.com" aria-invalid={!!errors.email} disabled={isSubmitting} className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2" {...register('email')} />
                        {errors.email && <p className="text-sm text-destructive">{String(errors.email.message)}</p>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input id="phone" type="tel" placeholder="e.g., +91 9391011520" aria-invalid={!!errors.phone} disabled={isSubmitting} className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2" {...register('phone')} />
                        {errors.phone && <p className="text-sm text-destructive">{String(errors.phone.message)}</p>}
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Controller
                          control={control}
                          name="subject"
                          render={({ field }) => (
                            <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                <SelectItem value="Quote Request">Quote Request</SelectItem>
                                <SelectItem value="Support">Support</SelectItem>
                                <SelectItem value="Feedback">Feedback</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.subject && <p className="text-sm text-destructive">{String(errors.subject.message)}</p>}
                      </div>

                      {/* Deadline + WhatsApp */}
                      <div className="space-y-2">
                        <Label>Deadline (optional)</Label>
                        <Controller
                          control={control}
                          name="deadline"
                          render={({ field }) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button type="button" variant="outline" className="w-full justify-start text-left font-normal">
                                  <CalendarDays className="mr-2 h-4 w-4" />
                                  {field.value ? field.value.toLocaleDateString() : 'Pick a date'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={(d) => field.onChange(d)} initialFocus />
                              </PopoverContent>
                            </Popover>
                          )}
                        />
                        {errors.deadline && <p className="text-sm text-destructive">{String(errors.deadline.message)}</p>}
                      </div>

                      <div className="space-y-2 md:mt-6">
                        <Label>Allow WhatsApp follow-up</Label>
                        <Controller
                          control={control}
                          name="allowWhatsApp"
                          render={({ field }) => (
                            <RadioGroup
                              value={field.value ? 'yes' : 'no'}
                              onValueChange={(val) => field.onChange(val === 'yes')}
                              className="flex items-center gap-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="allowWhatsApp-yes" disabled={isSubmitting} />
                                <Label htmlFor="allowWhatsApp-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="allowWhatsApp-no" disabled={isSubmitting} />
                                <Label htmlFor="allowWhatsApp-no">No</Label>
                              </div>
                            </RadioGroup>
                          )}
                        />
                        {errors.allowWhatsApp && <p className="text-sm text-destructive">{String(errors.allowWhatsApp.message)}</p>}
                      </div>

                      {/* Message (spans 2 cols) */}
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="message">Message<span className="text-destructive"> *</span></Label>
                        <Textarea id="message" rows={6} placeholder="Please include a few details..." aria-invalid={!!errors.message} disabled={isSubmitting} className="w-full focus-visible:ring-2 focus-visible:ring-brand-dark-cyan/40 focus-visible:ring-offset-2" {...register('message')} />
                        <div className="flex items-center justify-between">
                          {errors.message ? (
                            <p className="text-sm text-destructive">{String(errors.message.message)}</p>
                          ) : (
                            <span className="text-xs text-muted-foreground">{messageLength}/1000</span>
                          )}
                        </div>
                      </div>

                      {/* Attachment */}
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="attachment">Attachment (optional)</Label>
                        <div className="flex items-center gap-3">
                          <Input id="attachment" type="file" accept=".pdf,.png,.jpg,.jpeg,.svg" ref={fileInputRef} disabled={isSubmitting} onChange={(e) => setValue('attachment', e.target.files?.[0])} className="w-full" />
                          <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">Accepted: PDF, PNG, JPG, SVG</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="flex-1"
                      onClick={() => {
                        reset({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: '',
                          deadline: undefined,
                          allowWhatsApp: false,
                          attachment: undefined,
                          website: '',
                        });
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      Clear form
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </FormProvider>

            {/* RIGHT: Info & Map stack (sticky) */}
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Actions */}
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Reach us instantly using any method below.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a href="tel:+919391011520">
                    <Button className="w-full h-11" variant="secondary"><Phone className="h-4 w-4 mr-2" /> Call</Button>
                  </a>
                  <a href="mailto:venu.min@gmail.com">
                    <Button className="w-full h-11" variant="secondary"><Mail className="h-4 w-4 mr-2" /> Email</Button>
                  </a>
                  <a
                    href={getWhatsAppLink(`Hello! I would like to inquire about ${values.subject || 'your printing services'}. My name is ${values.name || ''}. ${values.message || ''}`)}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button className="w-full h-11 bg-[#25D366] hover:bg-[#1EBE59] text-white">
                      <img src="/whatsapp_logo.png" alt="WhatsApp" className="h-5 w-5" />
                      WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Business Info */}
              <Card className="rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><MapPin className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Our Location</div>
                      <div className="text-muted-foreground">
                        15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India.
                      </div>
                      <div className="text-muted-foreground">Business Hours: Mon-Sat, 9:30am - 9:30pm</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><Phone className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">+91 9391011520</div>
                      <div className="text-muted-foreground">M.V.G. Reddy - Owner</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-3 rounded-full"><Mail className="w-5 h-5 text-primary" /></div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">venu.min@gmail.com</div>
                      <div className="text-muted-foreground">For quotes and inquiries</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="overflow-hidden rounded-2xl border border-muted/20 bg-background/60 backdrop-blur shadow-sm">
                <div className="relative w-full h-72 md:h-96">
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
                  <span className="text-sm text-muted-foreground truncate">
                    15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('15-9-248-258, Pampati Plaza, Gowliguda, Hyderabad, Telangana 500012, India')}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    <Button className="bg-brand-tangerine-500 text-brand-white hover:bg-brand-tangerine-400">
                      <MapPin className="h-4 w-4 mr-2" /> Open in Google Maps
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
