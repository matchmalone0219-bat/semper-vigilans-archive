import test from "node:test";
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

test("search mount diagnosis", { timeout: 120000 }, async (t) => {
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

  await t.test("desktop click opens dialog then close hides it", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    const dialog = page.getByRole("dialog", { name: "全站搜索" });
    await dialog.waitFor({ state: "visible" });
    await dialog.getByRole("button", { name: "关闭搜索测试" }).click();
    await dialog.waitFor({ state: "hidden" });
    await page.close();
  });

  await t.test("desktop / opens dialog", async () => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.keyboard.press("/");
    await page.getByRole("dialog", { name: "全站搜索" }).waitFor({ state: "visible" });
    await page.close();
  });

  await t.test("mobile click opens dialog", async () => {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "搜索全站" }).click();
    await page.getByRole("dialog", { name: "全站搜索" }).waitFor({ state: "visible" });
    await page.close();
  });
});
