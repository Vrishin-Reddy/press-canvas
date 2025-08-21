
import { toast } from 'sonner';

// Email service interface
export interface EmailData {
  name: string;
  email: string;
  phone: string;
  service: string;
  dimensions?: string;
  quantity: number;
  
  preferredDate?: Date;
  additionalInfo?: string;
  file?: File | null;
}

// This is a mock email service for the front-end
// In a real application, this would connect to a backend API
export const sendBookingEmail = async (data: EmailData): Promise<boolean> => {
  const formspreeEndpoint = (import.meta as any)?.env?.VITE_FORMSPREE_ENDPOINT as string | undefined
  const customWebhook = (import.meta as any)?.env?.VITE_EMAIL_WEBHOOK as string | undefined
  const contactEmail = ((import.meta as any)?.env?.VITE_CONTACT_EMAIL as string | undefined) || 'venu.min@gmail.com'

  try {
    // Prefer Formspree if configured (supports direct email forwarding)
    if (formspreeEndpoint) {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('service', data.service)
      formData.append('quantity', String(data.quantity))
      if (data.dimensions) formData.append('dimensions', data.dimensions)
      if (data.preferredDate) formData.append('preferredDate', data.preferredDate.toISOString())
      if (data.additionalInfo) formData.append('additionalInfo', data.additionalInfo)
      // Optional: include a target email if your Formspree setup uses it
      formData.append('_subject', `New Booking Request: ${data.service}`)
      formData.append('_replyto', data.email)
      formData.append('_to', contactEmail)
      if (data.file) formData.append('file', data.file)

      const response = await fetch(formspreeEndpoint, { method: 'POST', body: formData })
      return response.ok
    }

    // Fallback to custom webhook (your backend) if provided
    if (customWebhook) {
      const response = await fetch(customWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, to: contactEmail })
      })
      return response.ok
    }

    // As a last resort, attempt to open a mailto link (no attachments)
    const mailto = new URL(`mailto:${encodeURIComponent(contactEmail)}`)
    const bodyLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      `Quantity: ${data.quantity}`,
      data.dimensions ? `Dimensions: ${data.dimensions}` : undefined,
      data.preferredDate ? `Preferred Date: ${data.preferredDate.toDateString()}` : undefined,
      data.additionalInfo ? `Additional Info: ${data.additionalInfo}` : undefined,
    ].filter(Boolean)
    mailto.searchParams.set('subject', `New Booking Request: ${data.service}`)
    mailto.searchParams.set('body', bodyLines.join('%0D%0A'))
    window.location.href = mailto.toString()
    return true
  } catch (error) {
    console.error('sendBookingEmail error', error)
    return false
  }
};

// Helper function to handle the entire email sending process with UX feedback
export const sendBookingEmailWithFeedback = async (data: EmailData): Promise<boolean> => {
  try {
    // Show loading toast
    toast.loading('Sending your booking request...');
    
    // Attempt to send the email
    const success = await sendBookingEmail(data);
    
    // Show success or error message based on result
    if (success) {
      toast.success('Booking request sent successfully! We will contact you shortly.');
      return true;
    } else {
      toast.error('Failed to send booking request. Please try again.');
      return false;
    }
  } catch (error) {
    console.error('Error sending booking email:', error);
    toast.error('An unexpected error occurred. Please try again later.');
    return false;
  }
};

// Contact form email payload
export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  subject: 'General Inquiry' | 'Quote Request' | 'Support' | 'Feedback';
  message: string;
  deadline?: Date;
  allowWhatsApp?: boolean;
  attachment?: File | undefined;
}

// Generic contact email sender. Uses Formspree if configured, then webhook, else mailto fallback.
export const sendContactEmail = async (data: ContactEmailData): Promise<boolean> => {
  const formspreeEndpoint =
    ((import.meta as any)?.env?.VITE_FORMSPREE_CONTACT_ENDPOINT as string | undefined) ||
    ((import.meta as any)?.env?.VITE_FORMSPREE_ENDPOINT as string | undefined);
  const customWebhook = (import.meta as any)?.env?.VITE_EMAIL_WEBHOOK as string | undefined;
  const contactEmail = ((import.meta as any)?.env?.VITE_CONTACT_EMAIL as string | undefined) || 'venu.min@gmail.com';

  try {
    if (formspreeEndpoint) {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      if (data.deadline) formData.append('deadline', data.deadline.toISOString());
      if (typeof data.allowWhatsApp === 'boolean') formData.append('allowWhatsApp', data.allowWhatsApp ? 'yes' : 'no');
      formData.append('_subject', `New Contact: ${data.subject} — ${data.name}`);
      formData.append('_replyto', data.email);
      formData.append('_to', contactEmail);
      if (data.attachment) formData.append('attachment', data.attachment);

      const response = await fetch(formspreeEndpoint, { method: 'POST', body: formData });
      return response.ok;
    }

    if (customWebhook) {
      const response = await fetch(customWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, to: contactEmail, context: 'contact' }),
      });
      return response.ok;
    }

    // mailto fallback (no attachments)
    const mailto = new URL(`mailto:${encodeURIComponent(contactEmail)}`);
    const subject = `New Contact: ${data.subject} — ${data.name}`;
    const bodyLines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : undefined,
      `Subject: ${data.subject}`,
      data.deadline ? `Deadline: ${data.deadline.toDateString()}` : undefined,
      typeof data.allowWhatsApp === 'boolean' ? `Allow WhatsApp: ${data.allowWhatsApp ? 'Yes' : 'No'}` : undefined,
      '',
      data.message,
    ].filter(Boolean);
    mailto.searchParams.set('subject', subject);
    mailto.searchParams.set('body', bodyLines.join('%0D%0A'));
    window.location.href = mailto.toString();
    return true;
  } catch (error) {
    console.error('sendContactEmail error', error);
    return false;
  }
};
