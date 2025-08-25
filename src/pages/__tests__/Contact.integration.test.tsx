import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "@/pages/Contact";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("Contact form integration", () => {
  it("shows validation on empty submit", async () => {
    render(<Contact />);
    const submit = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submit);
    await screen.findByText(/Please fill name, email, and message/i);
  });

  it("happy path sends once and resets", async () => {
    render(<Contact />);
    const name = screen.getByLabelText(/full name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submit = screen.getByRole("button", { name: /send message/i });

    (global as any).fetch = vi.fn(global.fetch);
    fireEvent.change(name, { target: { value: "John" } });
    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(message, { target: { value: "Hello" } });
    fireEvent.click(submit);

    expect(submit).toBeDisabled();
    await screen.findByText(/Thanks! Your message was sent/i);
    await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(1));
  });

  it("server 500 shows error toast and re-enables", async () => {
    server.use(
      http.post("/api/send", () => new HttpResponse("boom", { status: 500 }))
    );
    render(<Contact />);
    const name = screen.getByLabelText(/full name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submit = screen.getByRole("button", { name: /send message/i });

    fireEvent.change(name, { target: { value: "John" } });
    fireEvent.change(email, { target: { value: "john@example.com" } });
    fireEvent.change(message, { target: { value: "Hello" } });
    fireEvent.click(submit);

    await screen.findByText(/Failed to send/i);
    await waitFor(() => expect(submit).not.toBeDisabled());
  });
});


