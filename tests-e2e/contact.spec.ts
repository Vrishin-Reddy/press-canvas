import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("/api/send", async (route, request) => {
      const body = request.postData() ? JSON.parse(request.postData()!) : {};
      if (!body?.name || !body?.email || !body?.message) {
        return route.fulfill({ status: 400, body: "Missing" });
      }
      return route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) });
    });
  });

  test("empty submit shows validation", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/Please fill name, email, and message/i)).toBeVisible();
  });

  test("happy path makes one call and shows success", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/full name/i).fill("John");
    await page.getByLabel(/email/i).fill("john@example.com");
    await page.getByLabel(/message/i).fill("Hello");
    const [req] = await Promise.all([
      page.waitForRequest("/api/send"),
      page.getByRole("button", { name: /send message/i }).click(),
    ]);
    await expect(page.getByText(/Thanks! Your message was sent/i)).toBeVisible();
    expect(req).toBeTruthy();
  });

  test("server error shows error toast and re-enables", async ({ page }) => {
    await page.route("/api/send", async (route) => route.fulfill({ status: 500, body: "boom" }));
    await page.goto("/contact");
    await page.getByLabel(/full name/i).fill("John");
    await page.getByLabel(/email/i).fill("john@example.com");
    await page.getByLabel(/message/i).fill("Hello");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/Failed to send/i)).toBeVisible();
  });
});


