// api/send.ts — Edge runtime email relay via Resend REST API
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

const JSON_HEADERS = { "content-type": "application/json; charset=utf-8" };

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "GET") return new Response("OK", { status: 200 });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const data = (await req.json()) as Payload;

    if (!data?.name || !data?.email || !data?.message) {
      return new Response("Missing required fields: name, email, message", { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM; // e.g. "Sri Sharada Press <notifications@yourdomain.com>"
    const RESEND_TO = process.env.RESEND_TO || "sspress.1912@gmail.com";

    if (!RESEND_API_KEY || !RESEND_FROM) {
      return new Response("Email not configured (RESEND_API_KEY/RESEND_FROM).", { status: 500 });
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

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return new Response(errText || "Resend error", { status: 502, headers: JSON_HEADERS });
    }

    const json = await res.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, id: json?.id }), { status: 200, headers: JSON_HEADERS });
  } catch (e: any) {
    return new Response(e?.message || "Internal Error", { status: 500, headers: JSON_HEADERS });
  }
}

function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
