import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import handler from "../../../api/send";
import type { VercelRequest, VercelResponse } from "@vercel/node";

vi.mock("nodemailer", () => {
  const sendMail = vi.fn(async () => ({}));
  const createTransport = vi.fn(() => ({ sendMail }));
  return { default: { createTransport }, createTransport, __esModule: true } as any;
});

function mockReqRes(method: string, body?: any) {
  const req = { method, body } as unknown as VercelRequest;
  const res = {
    status: vi.fn(function (this: any, code: number) {
      // chainable
      this.statusCode = code;
      return this;
    }),
    send: vi.fn(function (this: any, data?: any) {
      this.sent = data;
      return this;
    }),
    json: vi.fn(function (this: any, data?: any) {
      this.jsonData = data;
      return this;
    }),
  } as unknown as VercelResponse & { statusCode?: number; sent?: any; jsonData?: any };
  return { req, res };
}

beforeEach(() => {
  process.env.GMAIL_USER = "u";
  process.env.GMAIL_APP_PASSWORD = "p";
  process.env.DEST_EMAIL = "to@example.com";
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("/api/send handler", () => {
  it("GET returns OK", async () => {
    const { req, res } = mockReqRes("GET");
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("400 when required fields missing", async () => {
    const { req, res } = mockReqRes("POST", { name: "", email: "", message: "" });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("413 when attachments too large", async () => {
    const big = Buffer.alloc(8 * 1024 * 1024 + 1).toString("base64");
    const { req, res } = mockReqRes("POST", { name: "n", email: "e@x.com", message: "m", attachments: [{ filename: "big.bin", content: big }] });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(413);
  });

  it("200 happy path", async () => {
    const { req, res } = mockReqRes("POST", { name: "n", email: "e@x.com", message: "m" });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it("500 when transporter throws", async () => {
    const nm = await import("nodemailer");
    // @ts-ignore
    nm.default.createTransport().sendMail.mockRejectedValueOnce(new Error("boom"));
    const { req, res } = mockReqRes("POST", { name: "n", email: "e@x.com", message: "m" });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});


