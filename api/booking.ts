import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function parseBody(body: any) {
  if (!body) return {};
  if (typeof body === "string") {
    try { return JSON.parse(body); } catch { return {}; }
  }
  return body;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { name, email, phone, service, details } = parseBody(req.body);
    if (!name || !email || !service || !details) {
      return res.status(400).send("Missing required fields");
    }

    await resend.emails.send({
      from: "Sri Sharada Press <notifications@yourdomain.com>",
      to: ["sspress.1912@gmail.com"],
      reply_to: email,
      subject: `New Booking: ${service} — ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Details:</b><br/>${String(details).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).send(err?.message || "Internal Error");
  }
}


