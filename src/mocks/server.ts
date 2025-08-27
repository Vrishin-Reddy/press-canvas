import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.post("/api/send", async ({ request }) => {
    const body = (await request.json()) as any;
    if (!body?.name || !body?.email || !body?.message) {
      return new HttpResponse("Missing required fields", { status: 400 });
    }
<<<<<<< HEAD
    return HttpResponse.json({ ok: true, id: "test-email-id" });
=======
    return HttpResponse.json({ ok: true });
>>>>>>> e725d928e6f4f8c5d7c283483279184bcd76fc85
  }),
];

export const server = setupServer(...handlers);


