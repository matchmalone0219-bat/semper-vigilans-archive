import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}`;

function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url, { redirect: "manual" });
        if (res.ok || (res.status >= 300 && res.status < 500)) {
          resolve(undefined);
          return;
        }
      } catch {
        /* still booting */
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`timed out waiting for ${url}`));
        return;
      }
      setTimeout(tick, 250);
    };
    tick();
  });
}

test("desktop, mobile, and keyboard search page", { timeout: 180000 }, async (t) => {
  const server = spawn("npx", ["vite", "dev", "--host", "127.0.0.1", "--port", String(PORT)], {
    stdio: "pipe",
    detached: true,
    env: { ...process.env, BROWSER: "none" },
  });
  let browser;
  t.after(async () => {
    await browser?.close();
    if (server.pid) {
      try {
        process.kill(-server.pid, "SIGKILL");
      } catch {
        server.kill("SIGKILL");
      }
    }
  });

  await waitForServer(BASE);
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    if (String(err).includes("Executable doesn't exist")) {
      t.skip("Playwright browser binary not installed in environment");
      return;
    }
    throw err;
  }

  await t.test("desktop 1720×900 nav search, type, and follow hash", async () => {
    const page = await browser.newPage({ viewport: { width: 1720, height: 900 } });
    page.setDefaultTimeout(8000);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "搜索全站" }).click();
    await page.waitForURL(/\/search\/?(?:\?.*)?$/);
    const input = page.getByPlaceholder("搜索人物、地点、装备、日志、线索……");
    await input.waitFor({ state: "visible" });
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), "hidden");
    assert.equal(
      await page.evaluate(() => document.querySelector("[role=dialog]")),
      null,
    );
    await input.fill("缄默");
    const hush = page.getByRole("button").filter({ hasText: "缄默" }).first();
    await hush.waitFor({ state: "visible" });
    await hush.click();
    await page.waitForURL(/\/dossier#debunked-hush-main-villain/);
    await page.waitForSelector("#debunked-hush-main-villain");
    await page.close();
  });

  await t.test("desktop / from any page opens /search", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(`${BASE}/dossier`, { waitUntil: "networkidle" });
    await page.keyboard.press("/");
    await page.waitForURL(/\/search\/?(?:\?.*)?$/);
    await page.getByPlaceholder("搜索人物、地点、装备、日志、线索……").waitFor({ state: "visible" });
    await page.close();
  });

  await t.test("mobile click opens /search and shows results", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "搜索全站" }).click();
    await page.waitForURL(/\/search\/?(?:\?.*)?$/);
    const input = page.getByPlaceholder("搜索人物、地点、装备、日志、线索……");
    await input.fill("蝙蝠战车");
    await assert.notEqual(await page.getByRole("listitem").count(), 0);
    await page.close();
  });

  await t.test("category search includes matches beyond the first 50 global results", async () => {
    const page = await browser.newPage();
    await page.goto(`${BASE}/search`, { waitUntil: "networkidle" });
    await page.locator("[data-site-search-input]").fill("蝙蝠侠");
    await page.getByRole("button", { name: "日志", exact: true }).click();
    await page.getByRole("button").filter({ hasText: "马特·里夫斯接任导演与编剧" }).waitFor();
    assert.ok(await page.locator("main li button").count() > 0);
    await page.close();
  });

  await t.test("IME candidate keys do not navigate or consume input", async () => {
    const page = await browser.newPage();
    await page.goto(`${BASE}/search`, { waitUntil: "networkidle" });
    const input = page.locator("[data-site-search-input]");
    await input.fill("缄默");
    await page.getByRole("button").filter({ hasText: "缄默" }).first().waitFor();
    for (const init of [
      { key: "Enter", isComposing: true },
      { key: "ArrowDown", isComposing: true },
      { key: "Escape", isComposing: true },
      { key: "Enter", keyCode: 229 },
    ]) {
      const allowed = await input.evaluate((el, init) =>
        el.dispatchEvent(new KeyboardEvent("keydown", { ...init, bubbles: true, cancelable: true })), init);
      assert.equal(allowed, true);
      assert.match(page.url(), /\/search\/?(?:\?.*)?$/);
      assert.equal(await input.inputValue(), "缄默");
    }
    await input.press("Enter");
    await page.waitForURL(/\/dossier#debunked-hush-main-villain/);
    await page.close();
  });

  await t.test("individual months remain usable after expand-all and collapse-all", async () => {
    const page = await browser.newPage();
    await page.goto(`${BASE}/dossier`, { waitUntil: "networkidle" });
    const month = page.locator("#log details").first();
    await page.getByRole("button", { name: "展开全部月份" }).click();
    await page.waitForFunction(() => [...document.querySelectorAll("#log details")].every(el => el.open));
    await page.getByRole("button", { name: "折叠全部月份" }).click();
    await page.waitForFunction(() => [...document.querySelectorAll("#log details")].every(el => !el.open));
    await month.locator("summary").click();
    await page.waitForFunction(() => {
      const el = document.querySelector("#log details");
      return el?.open && getComputedStyle(el.querySelector(":scope > div")).opacity === "1";
    });
    assert.ok(await month.locator("li").first().isVisible());
    await month.locator("summary").click();
    await page.waitForFunction(() => !document.querySelector("#log details").open);
    await page.getByRole("button", { name: "展开全部月份" }).click();
    await page.waitForFunction(() => [...document.querySelectorAll("#log details")].every(el => el.open));
    await month.locator("summary").click();
    await page.waitForFunction(() => !document.querySelector("#log details").open);
    await page.close();
  });

  await t.test("zoomed mobile image pans without changing image; unzoomed swipe still works", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
    await page.goto(`${BASE}/gallery`, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^查看大图：/ }).first().click();
    const dialog = page.getByRole("dialog");
    const image = dialog.locator("img");
    const original = await image.getAttribute("src");
    await dialog.getByRole("button", { name: "放大查看", exact: true }).click();
    const swipe = () => image.evaluate(el => {
      for (const [type, property, clientX] of [
        ["touchstart", "touches", 250],
        ["touchend", "changedTouches", 100],
      ]) {
        const event = new Event(type, { bubbles: true });
        Object.defineProperty(event, property, { value: [{ clientX }] });
        el.dispatchEvent(event);
      }
    });
    await swipe();
    assert.equal(await image.getAttribute("src"), original);
    await dialog.getByRole("button", { name: "还原原始大小", exact: true }).waitFor();
    await dialog.getByRole("button", { name: "还原原始大小", exact: true }).click();
    await swipe();
    await page.waitForFunction(src => document.querySelector('[role="dialog"] img')?.getAttribute("src") !== src, original);
    await page.close();
  });


  await t.test("search totals, pagination, reload, and back preserve URL state", async () => {
    const page = await browser.newPage();
    await page.goto(`${BASE}/search?q=蝙蝠侠&category=merch`, { waitUntil: "networkidle" });
    const rows = page.locator("main li button");
    assert.equal(await rows.count(), 16);
    const total = Number((await page.getByText(/^共 \d+ 条匹配/).innerText()).match(/共 (\d+)/)[1]);
    assert.ok(total > 16);
    await page.getByRole("button", { name: "加载更多", exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll("main li button").length === 32);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await rows.count(), 32);
    await rows.first().click();
    await page.waitForURL(/\/merch#/);
    await page.goBack({ waitUntil: "networkidle" });
    assert.equal(await page.locator("[data-site-search-input]").inputValue(), "蝙蝠侠");
    assert.equal(await rows.count(), 32);
    while (await page.getByRole("button", { name: "加载更多", exact: true }).count()) {
      const previousCount = await rows.count();
      await page.getByRole("button", { name: "加载更多", exact: true }).click();
      await page.waitForFunction(count => document.querySelectorAll("main li button").length > count, previousCount);
    }
    assert.equal(await rows.count(), total);
    await page.close();
  });

  await t.test("historical log search opens its month and direct links survive reload", async () => {
    const page = await browser.newPage();
    await page.goto(`${BASE}/search?q=马特·里夫斯接任导演与编剧&category=log`, { waitUntil: "networkidle" });
    await page.locator("main li button").first().click();
    await page.waitForURL(/#log-2017-02-23$/);
    const checkTarget = () => page.waitForFunction(() => {
      const el = document.getElementById("log-2017-02-23");
      return el?.closest("details")?.open && el.classList.contains("ring-blood") && el.getBoundingClientRect().height > 0;
    });
    await checkTarget();
    await page.reload({ waitUntil: "domcontentloaded" });
    await checkTarget();
    await page.close();
  });

});
