import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmailLink from "@/components/EmailLink";

describe("EmailLink", () => {
  beforeEach(() => {
    vi.spyOn(window, "open").mockImplementation(() => null as any);
    // @ts-expect-error mock
    delete window.location;
    // @ts-expect-error mock
    window.location = { href: "" };
  });

  it("renders mailto href", () => {
    render(<EmailLink email="a@b.com" subject="Hi" />);
    const a = screen.getByRole("link");
    expect(a).toHaveAttribute("href", expect.stringContaining("mailto:a@b.com"));
    expect(a.getAttribute("href")).toContain("subject=");
  });

  it("on desktop choice 1 opens Gmail compose", () => {
    vi.spyOn(window, "prompt").mockReturnValue("1");
    render(<EmailLink email="a@b.com" subject="Hi" />);
    const a = screen.getByRole("link");
    fireEvent.click(a);
    expect(window.open).toHaveBeenCalledWith(expect.stringContaining("mail.google.com"), "_blank", expect.any(String));
  });
});


