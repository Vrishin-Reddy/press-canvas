import { test, expect } from "@playwright/test";
import { configureAxe, serializeRules } from "@axe-core/playwright";

test.describe("Page a11y", () => {
  test("contact has no serious/critical violations", async ({ page }) => {
    await page.goto("/contact");
    const axe = configureAxe({ rules: serializeRules({ severity: ["serious", "critical"] }) });
    const results = await axe.analyze(page);
    expect(results.violations).toEqual([]);
  });
});


