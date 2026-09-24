import assert from "node:assert/strict";
import test from "node:test";
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { createJiti } from "jiti";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {
  alias: { "@": join(rootDir, "src") },
});
const { TESTS, normalizeAnswer, nextBeat, EMPTY_PROGRESS } = jiti(
  join(rootDir, "src/lib/rataalada.ts"),
);

const PORT = 4180;
const BASE = `http://127.0.0.1:${PORT}`;
const STORAGE_KEY = "sv-rataalada-v2";
const riddles = TESTS.flatMap((phase) => phase.riddles);
const lastRiddle = riddles.at(-1);
const lastCorrectOption = lastRiddle?.options?.find((option) =>
  lastRiddle.answers.includes(normalizeAnswer(option.value)),
);

test("all riddles lead to the GCPD seizure beat", () => {
  const completed = {
    ...EMPTY_PROGRESS,
    started: true,
    solved: riddles.map((riddle) => riddle.id),
    lounge: true,
    loading: true,
  };
  assert.equal(nextBeat(completed).kind, "seizure");
  assert.equal(nextBeat({ ...completed, seizure: true }).kind, "done");
});

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`timed out waiting for ${url}`);
}

test("final puzzle reveals seizure page; files remain accessible; restart resets progress", { timeout: 180000 }, async (t) => {
  assert.ok(lastRiddle && lastCorrectOption, "final riddle needs exactly one correct option");
  const server = spawn("npx", ["vite", "dev", "--host", "127.0.0.1", "--port", String(PORT)], {
    stdio: "pipe",
    detached: true,
    env: { ...process.env, BROWSER: "none" },
  });
  let browser;
  t.after(async () => {
    await browser?.close();
    if (server.pid) {
      try { process.kill(-server.pid, "SIGKILL"); }
      catch { server.kill("SIGKILL"); }
    }
  });

  await waitForServer(BASE);
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    if (String(error).includes("Executable doesn't exist")) {
      t.skip("Playwright browser binary not installed");
      return;
    }
    throw error;
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.setDefaultTimeout(15000);
  await page.addInitScript(({ key, progress }) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(progress));
    }
  }, {
    key: STORAGE_KEY,
    progress: {
      started: true,
      solved: riddles.filter((riddle) => riddle.id !== lastRiddle.id).map((riddle) => riddle.id),
      lounge: true,
      loading: true,
      seizure: false,
    },
  });
  await page.goto(`${BASE}/rataalada`, { waitUntil: "domcontentloaded" });
  const answer = page.locator("button.group").filter({ hasText: lastCorrectOption.labelEn }).first();
  await answer.waitFor({ state: "visible" });
  await answer.click();

  const seizureScreenshot = page.getByRole("img", { name: /原 Rataalada.com 查封页面截图/ });
  await seizureScreenshot.waitFor({ state: "visible", timeout: 30000 });
  assert.match(await seizureScreenshot.getAttribute("src"), /gcpd-seized\.jpg$/);
  assert.equal(await page.locator('img[src$="gcpd-seal.svg"]').count(), 0);
  await page.getByRole("button", { name: "查看已解锁档案" }).click();
  await page.getByRole("button", { name: /已解锁文件/ }).waitFor({ state: "visible" });
  assert.ok(await page.locator("aside img").count() > 0, "unlocked files should still be available");
  await page.getByRole("button", { name: "关闭" }).click();

  await page.reload({ waitUntil: "domcontentloaded" });
  await seizureScreenshot.waitFor({ state: "visible" });
  const stored = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY);
  assert.equal(stored.seizure, true);

  // Leaving the GCPD ending must keep solved puzzles; only restart clears progress.
  await page.getByRole("link", { name: "返回档案站" }).click();
  await page.waitForURL((url) => url.pathname === "/");
  assert.deepEqual(
    await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), STORAGE_KEY),
    stored,
  );
  await page.goto(`${BASE}/rataalada`, { waitUntil: "domcontentloaded" });
  await seizureScreenshot.waitFor({ state: "visible" });

  await page.getByRole("button", { name: "重新启动档案" }).click();
  await page.getByText("RATAALADA.COM TERMINAL").waitFor({ state: "visible" });
  assert.equal(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), null);
  await page.close();

  // On a short mobile viewport the archival note and both controls must remain reachable.
  const mobile = await browser.newPage({ viewport: { width: 375, height: 640 } });
  await mobile.addInitScript(({ key, progress }) => localStorage.setItem(key, JSON.stringify(progress)), {
    key: STORAGE_KEY,
    progress: { started: true, solved: riddles.map((riddle) => riddle.id), lounge: true, loading: true, seizure: true },
  });
  await mobile.goto(`${BASE}/rataalada`, { waitUntil: "domcontentloaded" });
  await mobile.getByRole("img", { name: /原 Rataalada.com 查封页面截图/ }).waitFor({ state: "visible" });
  await mobile.getByRole("button", { name: "重新启动档案" }).click();
  await mobile.getByText("RATAALADA.COM TERMINAL").waitFor({ state: "visible" });
  await mobile.close();
});
