// api/send.ts — Vercel Node.js runtime email relay via Resend REST API
import type { VercelRequest, VercelResponse } from '@vercel/node';

type AttachIn = { filename: string; content: string; content_type?: string };
type Payload = {
  source?: "contact" | "booking";
  name: string;
  email: string;
  phone?: string;
  service?: string;
  subject?: string;
  message: string;
  attachments?: AttachIn[];
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") return res.status(200).send("OK");
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const data = req.body as Payload;

    if (!data?.name || !data?.email || !data?.message) {
      return res.status(400).send("Missing required fields: name, email, message");
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM; // e.g. "Sri Sharada Press <notifications@yourdomain.com>"
    const RESEND_TO = process.env.RESEND_TO || "sspress.1912@gmail.com";

    if (!RESEND_API_KEY || !RESEND_FROM) {
      return res.status(500).send("Email not configured (RESEND_API_KEY/RESEND_FROM).");
    }

    const subj =
      data.subject ||
      (data.service ? `New Booking: ${data.service} — ${data.name}` : `New Message — ${data.name}`);

    const html = `
      <h2>New Website Submission${data.source ? ` (${data.source})` : ""}</h2>
      <p><b>Name:</b> ${escapeHtml(data.name)}</p>
      <p><b>Email:</b> ${escapeHtml(data.email)}</p>
      ${data.phone ? `<p><b>Phone:</b> ${escapeHtml(data.phone)}</p>` : ""}
      ${data.service ? `<p><b>Service:</b> ${escapeHtml(String(data.service))}</p>` : ""}
      <p><b>Subject:</b> ${escapeHtml(subj)}</p>
      <p><b>Message:</b><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    // Build Resend payload for Edge-safe fetch
    const body = {
      from: RESEND_FROM,
      to: [RESEND_TO],
      reply_to: data.email,
      subject: subj,
      html,
      attachments: (data.attachments || []).map(a => ({
        filename: a.filename,
        content: a.content,           // base64 string (no data: prefix)
        content_type: a.content_type, // optional
      })),
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => "");
      return res.status(502).send(errText || "Resend error");
    }

    const json = await resendRes.json().catch(() => ({}));
    return res.status(200).json({ ok: true, id: json?.id });
  } catch (e: any) {
    return res.status(500).send(e?.message || "Internal Error");
  }
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
