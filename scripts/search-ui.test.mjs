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

test("desktop, mobile, and keyboard search interactions", { timeout: 120000 }, async (t) => {
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
  browser = await chromium.launch({ headless: true });

  await t.test("desktop 1280×800 click opens search, types, Esc closes", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    const dialog = page.getByRole("dialog", { name: "全站搜索" });
    await dialog.waitFor({ state: "visible" });
    await page.getByPlaceholder("搜索人物、地点、装备、日志、线索……").fill("蝙蝠侠");
    await assert.notEqual(await dialog.getByRole("listitem").count(), 0);
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await page.close();
  });

  await t.test("mobile 390×844 click opens search", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    await page.getByRole("dialog", { name: "全站搜索" }).waitFor({ state: "visible" });
    await page.close();
  });

  await t.test("desktop / opens search and Escape closes it", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.keyboard.press("/");
    const dialog = page.getByRole("dialog", { name: "全站搜索" });
    await dialog.waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    await page.close();
  });

  await t.test("search result click closes modal and follows hash deep link", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    const dialog = page.getByRole("dialog", { name: "全站搜索" });
    await dialog.waitFor({ state: "visible" });
    await page.getByPlaceholder("搜索人物、地点、装备、日志、线索……").fill("缄默");
    await dialog.getByRole("button").filter({ hasText: "缄默" }).first().click();
    await dialog.waitFor({ state: "hidden" });
    await page.waitForURL(/\/dossier#debunked-hush-main-villain/);
    await page.waitForSelector("#debunked-hush-main-villain");
    await page.close();
  });

  await t.test("desktop 1720×900 suggested tag, hover, and navigate stay responsive", async () => {
    const page = await browser.newPage({ viewport: { width: 1720, height: 900 } });
    page.setDefaultTimeout(5000);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    const dialog = page.getByRole("dialog", { name: "全站搜索" });
    await dialog.waitFor({ state: "visible" });

    const grainDisplay = await page.evaluate(() => {
      const el = document.querySelector(".grain-layer");
      return el ? getComputedStyle(el).display : "missing";
    });
    assert.equal(grainDisplay, "none");
    assert.equal(await page.evaluate(() => document.body.dataset.searchOpen), "true");

    await page.evaluate(() => {
      window.__searchLongTasks = [];
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            window.__searchLongTasks.push(entry.duration);
          }
        });
        observer.observe({ type: "longtask", buffered: true });
        window.__searchLongObserver = observer;
      } catch {
        /* longtask not available */
      }
    });

    const started = await page.evaluate(() => performance.now());
    await dialog.getByRole("button", { name: "蝙蝠战车" }).click();
    await dialog.getByRole("listitem").first().waitFor({ state: "visible" });
    const elapsed = await page.evaluate((mark) => performance.now() - mark, started);
    const longTasks = await page.evaluate(() => window.__searchLongTasks ?? []);
    console.log(
      JSON.stringify({
        suggestedTagToResultsMs: Math.round(elapsed),
        longTaskCount: longTasks.length,
        longestTaskMs: Math.round(Math.max(0, ...longTasks)),
      }),
    );
    assert.ok(elapsed < 500, `suggested tag → results took ${Math.round(elapsed)}ms`);

    const items = dialog.getByRole("listitem");
    const hoverCount = Math.min(await items.count(), 6);
    for (let i = 0; i < hoverCount; i++) {
      await items.nth(i).hover();
    }

    await items.first().getByRole("button").click();
    await dialog.waitFor({ state: "hidden" });
    await page.waitForFunction(() => location.pathname !== "/" || location.hash.length > 1);
    await page.close();
  });
});
