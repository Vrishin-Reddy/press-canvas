import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.post("/api/send", async ({ request }) => {
    const body = (await request.json()) as any;
    if (!body?.name || !body?.email || !body?.message) {
      return new HttpResponse("Missing required fields", { status: 400 });
    }
    return HttpResponse.json({ ok: true, id: "test-email-id" });
  }),
];

export const server = setupServer(...handlers);


