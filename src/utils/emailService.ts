
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
