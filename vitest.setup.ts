import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });

let server: any;
try {
  const mod = await import("./src/mocks/server");
  server = mod.server;
} catch {}

if (server) {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}


