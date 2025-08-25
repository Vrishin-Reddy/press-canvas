import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from "@/components/BookingForm";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

describe("Booking form integration", () => {
  it("shows validation on empty submit", async () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit booking request/i }));
    await screen.findByText(/Please fill name, email, and service details/i);
  });

  it("happy path sends once and resets", async () => {
    render(<BookingForm />);
    (global as any).fetch = vi.fn(global.fetch);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/service type/i), { target: { value: "flyers" } });
    fireEvent.click(screen.getByRole("button", { name: /submit booking request/i }));
    await screen.findByText(/Thanks! Your booking request was sent/i);
    await waitFor(() => expect((global as any).fetch).toHaveBeenCalledTimes(1));
  });

  it("server 500 shows error toast and re-enables", async () => {
    server.use(http.post("/api/send", () => new HttpResponse("boom", { status: 500 })));
    render(<BookingForm />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText(/service type/i), { target: { value: "flyers" } });
    const submit = screen.getByRole("button", { name: /submit booking request/i });
    fireEvent.click(submit);
    await screen.findByText(/Failed to send/i);
    await waitFor(() => expect(submit).not.toBeDisabled());
  });
});


