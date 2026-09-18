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

test("desktop, mobile, and keyboard search page", { timeout: 120000 }, async (t) => {
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

  await t.test("desktop 1720×900 nav search, type, and follow hash", async () => {
    const page = await browser.newPage({ viewport: { width: 1720, height: 900 } });
    page.setDefaultTimeout(8000);
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "搜索全站" }).click();
    await page.waitForURL(/\/search\/?$/);
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
    await page.waitForURL(/\/search\/?$/);
    await page.getByPlaceholder("搜索人物、地点、装备、日志、线索……").waitFor({ state: "visible" });
    await page.close();
  });

  await t.test("mobile click opens /search and shows results", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "搜索全站" }).click();
    await page.waitForURL(/\/search\/?$/);
    const input = page.getByPlaceholder("搜索人物、地点、装备、日志、线索……");
    await input.fill("蝙蝠战车");
    await assert.notEqual(await page.getByRole("listitem").count(), 0);
    await page.close();
  });
});
