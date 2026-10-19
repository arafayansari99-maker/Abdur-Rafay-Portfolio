import { expect, test } from "@playwright/test";

test("page sections, project links, CV, and favicon are available", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByRole("heading", { level: 1, name: "Abdur Rafay" })).toBeVisible();
  for (const section of ["experience", "skills", "projects", "education", "resumes", "contact"]) {
    await expect(page.locator(`#${section}`)).toHaveCount(1);
  }
  await expect(page.locator('a[href*="email-threat-analyzer-beryl"]')).toHaveCount(0);

  const resume = await request.get("/Abdur-Rafay-CV.pdf");
  expect(resume.status()).toBe(200);
  expect(resume.headers()["content-type"]).toContain("application/pdf");

  const favicon = await request.get("/favicon.png?v=2");
  expect(favicon.status()).toBe(200);
  expect(favicon.headers()["content-type"]).toContain("image/png");

  await page.evaluate(() => {
    const top = document.querySelector("#education")?.getBoundingClientRect().top ?? 0;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, top);
  });
  await expect.poll(() => page.locator("#education img").evaluateAll(
    (images) => images.length === 5 && images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
  )).toBe(true);
});

test("mobile navigation is accessible and pages fit common viewport widths", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await page.setViewportSize({ width: 390, height: 844 });

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(width);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "/projects" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("reduced-motion preference disables smooth scrolling and role rotation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  const role = page.getByTestId("animated-role");
  const initialRole = await role.innerText();
  await page.waitForTimeout(3_200);
  await expect(role).toHaveText(initialRole);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("smooth");
});

test("contact form exposes errors and success without contacting the email provider", async ({ page }) => {
  let nextStatus = 400;
  let requests = 0;
  await page.route("http://localhost:5000/api/contact", async (route) => {
    requests += 1;
    await route.fulfill({
      status: nextStatus,
      contentType: "application/json",
      body: nextStatus === 200
        ? JSON.stringify({ ok: true })
        : JSON.stringify({ error: "Synthetic test error." }),
    });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByLabel("Sender_Name").fill("Portfolio Test");
  await page.getByLabel("Reply_Address").fill("invalid-email");
  await page.getByLabel("Payload").fill("Synthetic automated test; no email should be sent.");
  await page.getByRole("button", { name: "TRANSMIT_MESSAGE" }).click();
  await expect.poll(() => page.getByLabel("Reply_Address").evaluate(
    (input) => !(input as HTMLInputElement).validity.valid,
  )).toBe(true);
  expect(requests).toBe(0);

  await page.getByLabel("Reply_Address").fill("test@example.com");
  await page.getByRole("button", { name: "TRANSMIT_MESSAGE" }).click();
  await expect(page.getByRole("alert")).toContainText("Synthetic test error.");
  await expect(page.getByLabel("Sender_Name")).toHaveValue("Portfolio Test");

  nextStatus = 200;
  await page.getByRole("button", { name: "TRANSMIT_MESSAGE" }).click();
  await expect(page.getByRole("heading", { name: "TRANSMISSION_SENT" })).toBeVisible();
  await expect(page.getByText("Message received. Will respond shortly.")).toBeVisible();
});
