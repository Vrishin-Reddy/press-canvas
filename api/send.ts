// api/send.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

type AttachIn = { filename: string; content: string; contentType?: string; size?: number };
type Payload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
  sources?: string;           // "contact" or "booking" (optional)
  attachments?: AttachIn[];   // base64 content
};

const MAX_TOTAL_BYTES = 8 * 1024 * 1024; // 8MB combined

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") return res.status(200).send("OK"); // health check

  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body as Payload;
    if (!data || !data.name || !data.email || !data.message) {
      return res.status(400).send("Missing required fields: name, email, message");
    }

    // Validate & convert attachments
    let total = 0;
    const attachments =
      (data.attachments || []).map((a) => {
        const b64 = (a.content || "").split(",").pop() || a.content || "";
        const buf = Buffer.from(b64, "base64");
        total += buf.length;
        return {
          filename: a.filename || "attachment",
          content: buf,
          contentType: a.contentType || "application/octet-stream",
        };
      }) || [];
    if (total > MAX_TOTAL_BYTES) return res.status(413).send("Attachments too large (total > 8MB).");

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.DEST_EMAIL || user;
    if (!user || !pass || !to) return res.status(500).send("Email is not configured.");

    const transporter = nodemailer.createTransporter({ service: "gmail", auth: { user, pass } });

    const subj = data.subject || (data.service ? `New Booking: ${data.service} — ${data.name}` : `New Message — ${data.name}`);
    const origin = data.sources ? ` (${data.sources})` : "";

    const html = `
      <h2>New Website Submission${origin}</h2>
      <p><b>Name:</b> ${esc(data.name)}</p>
      <p><b>Email:</b> ${esc(data.email)}</p>
      ${data.phone ? `<p><b>Phone:</b> ${esc(data.phone)}</p>` : ""}
      ${data.service ? `<p><b>Service:</b> ${esc(String(data.service))}</p>` : ""}
      <p><b>Subject:</b> ${esc(subj)}</p>
      <p><b>Message:</b><br/>${esc(data.message).replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `"Sri Sharada Press" <${user}>`,
      to,
      replyTo: data.email,
      subject: subj,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).send(err?.message || "Internal Error");
  }
}

function esc(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
