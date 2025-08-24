// api/booking.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type AttachmentIn = { filename: string; content: string; contentType?: string; size?: number };
type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
  attachments?: AttachmentIn[];
};

const MAX_TOTAL_BYTES = 8 * 1024 * 1024; // 8MB total cap for safety

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const data = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as Payload;

    const { name, email, message } = data || {};
    if (!name || !email || !message) {
      return res.status(400).send("Missing required fields: name, email, message");
    }

    // Validate attachments (optional)
    let total = 0;
    const attachments =
      (data.attachments || []).map((a) => {
        const b64 = a.content?.split(",").pop() || ""; // handle "data:*;base64,..." or raw base64
        const buf = Buffer.from(b64, "base64");
        total += buf.length;
        return {
          filename: a.filename || "attachment",
          content: buf,
          contentType: a.contentType || "application/octet-stream",
        };
      }) || [];

    if (total > MAX_TOTAL_BYTES) {
      return res.status(413).send("Attachments too large (total > 8MB).");
    }

    // Create Gmail transporter (App Password required)
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return res.status(500).send("Email is not configured.");

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: { user, pass },
    });

    const to = process.env.DEST_EMAIL || user; // default to your Gmail inbox
    const subject =
      data.subject ||
      (data.service ? `New Booking: ${data.service} — ${name}` : `New Message — ${name}`);

    const html = `
      <h2>New Website Submission</h2>
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      ${data.phone ? `<p><b>Phone:</b> ${escapeHtml(data.phone)}</p>` : ""}
      ${data.service ? `<p><b>Service:</b> ${escapeHtml(String(data.service))}</p>` : ""}
      <p><b>Subject:</b> ${escapeHtml(subject)}</p>
      <p><b>Message:</b><br/>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `"Sri Sharada Press" <${user}>`,
      to,
      replyTo: email,
      subject,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).send(err?.message || "Internal Error");
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
