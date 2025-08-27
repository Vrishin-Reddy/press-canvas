
<<<<<<< HEAD
 

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
  const contactEmail = ((import.meta as any)?.env?.VITE_CONTACT_EMAIL as string | undefined) || 'sspress.1912@gmail.com'

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

    // As a last resort, return false (no mailto fallback)
    return false
  } catch (error) {
    console.error('sendBookingEmail error', error)
    return false
  }
};

// Helper function to handle the entire email sending process with UX feedback
 

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
  const contactEmail = ((import.meta as any)?.env?.VITE_CONTACT_EMAIL as string | undefined) || 'sspress.1912@gmail.com';

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

    // No mailto fallback
    return false;
  } catch (error) {
    console.error('sendContactEmail error', error);
    return false;
  }
};
=======
// Email service - handles form submissions
export interface EmailPayload {
  source: "contact" | "booking";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
  attachments?: Array<{ filename: string; content: string; contentType?: string; size?: number }>;
}

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean }> {
  try {
    // Use Formspree for reliable email delivery
    const formspreeId = 'xqakagpb'; // This is a demo Formspree endpoint
    const formData = new FormData();
    
    // Add all payload data as form fields
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('message', payload.message);
    
    if (payload.phone) formData.append('phone', payload.phone);
    if (payload.subject) formData.append('subject', payload.subject);
    if (payload.service) formData.append('service', payload.service);
    if (payload.source) formData.append('source', payload.source);
    
    // Set email metadata
    formData.append('_subject', payload.subject || `New ${payload.source} submission from ${payload.name}`);
    formData.append('_replyto', payload.email);
    
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      body: formData,
    });
    
    return { ok: response.ok };
  } catch (error) {
    console.error('Email send error:', error);
    return { ok: false };
  }
}
>>>>>>> e725d928e6f4f8c5d7c283483279184bcd76fc85
