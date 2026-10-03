const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
    args: ["--disable-gpu"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:8894");
  await page.screenshot({
    path: "artifacts/discovery-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page
    .getByRole("button", {
      name: "Bookmark Design that speaks clearly",
      exact: true,
    })
    .click();
  await page.getByRole("link", { name: /My learning/ }).click();
  await page
    .getByRole("heading", { name: "Design that speaks clearly" })
    .waitFor();
  await page.reload();
  assert.equal(await page.locator(".course-card").count(), 1);
  await page.getByRole("link", { name: "Find a spark" }).count();
  await page.goto("http://127.0.0.1:8894/#course/hierarchy");
  await page.getByRole("button", { name: /Start learning/ }).click();
  for (let i = 0; i < 2; i++)
    await page
      .getByRole("button", { name: "Mark complete & continue" })
      .click();
  await page.locator("#size").fill("48");
  await page.locator("#space").fill("28");
  await page.reload();
  assert.equal(await page.locator("#size").inputValue(), "48");
  await page.screenshot({
    path: "artifacts/poster-lab-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("link", { name: "Previous lesson" }).click();
  await page.getByRole("button", { name: "Continue →", exact: true }).click();
  await page.getByRole("button", { name: "Mark complete & continue" }).click();
  await page.getByRole("button", { name: "Check my understanding" }).click();
  await page.getByText("Answer all three questions").waitFor();
  for (let i = 0; i < 3; i++)
    await page.locator(`[name=q${i}][value="2"]`).check();
  await page.getByRole("button", { name: "Check my understanding" }).click();
  await page.getByText("0 of 3 correct.", { exact: false }).waitFor();
  for (const [i, v] of [1, 0, 1].entries())
    await page.locator(`[name=q${i}][value="${v}"]`).check();
  await page.getByRole("button", { name: "Check my understanding" }).click();
  await page.getByText("A brighter eye for design.").waitFor();
  await page.reload();
  await page.getByText("A brighter eye for design.").waitFor();
  await page.getByRole("link", { name: "See my learning" }).click();
  await page.getByText("Course complete — beautifully done.").waitFor();
  await page.screenshot({
    path: "artifacts/dashboard-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Keep learning" }).click();
  await page.getByText("Course complete — beautifully done.").waitFor();
  await page.getByRole("button", { name: "Reset demo data" }).click();
  await page.getByRole("button", { name: "Reset everything" }).click();
  await page.reload();
  assert.equal(
    JSON.parse(
      await page.evaluate(() => localStorage.getItem("luma-academy-v1")),
    ).done.length,
    0,
  );
  await page.locator("#search").fill("zzzz");
  await page.getByText("No sparks here yet.").waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator(".course-card").count(), 3);
  await page.goto("http://127.0.0.1:8894/#course/type");
  await page
    .getByText("This course is a concept preview.", { exact: false })
    .waitFor();
  await page.goto("http://127.0.0.1:8894/#discover");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "artifacts/discovery-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Mobile overflow",
  );
  await page.goto("http://127.0.0.1:8894/#learn/2");
  await page.screenshot({
    path: "artifacts/poster-lab-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    "Lab overflow",
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: discovery, bookmarks, refresh persistence, lessons, back/repeat, exercise persistence, incomplete/wrong/correct quiz, certificate persistence, dashboard, reset cancel/confirm, empty search, preview course, mobile overflow, no runtime errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
