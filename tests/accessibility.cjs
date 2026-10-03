const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:8894");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").textContent(), "Skip to content");
  await page
    .getByRole("button", {
      name: "Bookmark Design that speaks clearly",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "Remove bookmark for Design that speaks clearly",
      exact: true,
    })
    .click();
  assert.equal(
    JSON.parse(
      await page.evaluate(() => localStorage.getItem("luma-academy-v1")),
    ).saved.length,
    0,
  );
  await page.getByRole("button", { name: "Reset demo data" }).click();
  assert.equal(await page.locator("dialog").evaluate((x) => x.open), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("dialog").evaluate((x) => x.open), false);
  await page.goto("http://127.0.0.1:8894/#learn/2");
  await page.locator("#size").focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("#size").inputValue(), "37");
  assert.equal(
    await page
      .locator("main")
      .evaluate((x) => getComputedStyle(x).animationName),
    "none",
  );
  await page.goto("http://127.0.0.1:8894/#unknown");
  await page.getByRole("heading", { name: "Page not found." }).waitFor();
  await page.goto("http://127.0.0.1:8894/#learn/99");
  await page.getByRole("heading", { name: "Notice what matters" }).waitFor();
  await page.evaluate(() => localStorage.setItem("luma-academy-v1", "broken"));
  await page.reload();
  await page.goto("http://127.0.0.1:8894/#dashboard");
  await page
    .getByText("Device storage is unavailable or was unreadable.", {
      exact: false,
    })
    .waitFor();
  console.log(
    "PASS: keyboard skip link, bookmark removal, dialog Escape, keyboard exercise control, reduced motion, missing route, invalid lesson recovery and unreadable storage fallback.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
