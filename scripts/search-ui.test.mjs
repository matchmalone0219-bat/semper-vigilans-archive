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
});
