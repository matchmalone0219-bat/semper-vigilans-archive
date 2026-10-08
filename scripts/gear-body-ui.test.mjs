import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const base = "http://127.0.0.1:4184";

test(
  "body equipment opens art-book dialogs without losing the viewing position",
  { timeout: 180000 },
  async (t) => {
    const server = spawn("npx", ["vite", "dev", "--host", "127.0.0.1", "--port", "4184"], {
      cwd: root,
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
    let ready = false;
    for (let attempt = 0; attempt < 120; attempt++) {
      try {
        ready = (await fetch(base)).ok;
      } catch {
        /* wait for Vite */
      }
      if (ready) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, "local gear preview starts");
    browser = await chromium.launch({ headless: true });

    for (const [name, viewport] of [
      ["desktop", { width: 1440, height: 1000 }],
      ["mobile", { width: 390, height: 844 }],
    ]) {
      await t.test(name, async () => {
        const page = await browser.newPage({ viewport });
        page.setDefaultTimeout(12000);
        const errors = [];
        page.on("pageerror", (e) => errors.push(e.message));
        page.on("response", (response) => {
          if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
        });
        await page.goto(`${base}/gear#loadout`, { waitUntil: "networkidle" });
        const stage = page.locator(".gear-body-stage");
        const blade = stage.locator('[data-equipment="chest-blade"]');
        await stage.scrollIntoViewIfNeeded();
        const scrollY = await page.evaluate(() => window.scrollY);
        await blade.click();
        const dossier = page.locator(".gear-dossier");
        await dossier.waitFor();
        assert.equal(await page.locator(".gear-page .gear-dossier").count(), 1);
        assert.ok(await page.locator(".gear-loadout").evaluate((el) => el.inert));
        assert.equal(await dossier.evaluate((el) => Boolean(el.closest("[inert]"))), false);
        assert.equal(
          await page.evaluate(() => window.scrollY),
          scrollY,
          "opening a hotspot keeps page position",
        );
        assert.equal(await stage.getAttribute("data-focused"), "true");
        assert.match(page.url(), /#chest-blade$/);
        await dossier.locator(".gear-sheet-page img").evaluate((img) => img.decode());
        assert.match(await dossier.locator(".gear-sheet-note").textContent(), /磁吸/);
        const paper = dossier.getByRole("button", { name: "放大说明纸条", exact: true });
        const note = await paper.boundingBox();
        const cover = await dossier.locator(".gear-sheet-cover").boundingBox();
        assert.ok(note.height <= cover.height + 1, "paper stays in the original text block");
        assert.equal(await dossier.locator(".gear-sheet-mobile-note").count(), 0);
        const recordScroll = await dossier.evaluate((el) => el.scrollTop);
        await paper.click();
        const reading = page.getByRole("dialog", { name: "装备说明", exact: true });
        await reading.waitFor();
        assert.match(await reading.locator("p").textContent(), /磁吸/);
        assert.ok(await reading.locator("p").evaluate((el) => parseFloat(getComputedStyle(el).fontSize) >= 16));
        await page.keyboard.press("Tab");
        assert.ok(await reading.evaluate((el) => el.contains(document.activeElement)));
        await page.keyboard.press("Escape");
        await reading.waitFor({ state: "hidden" });
        assert.ok(await paper.evaluate((el) => el === document.activeElement));
        assert.equal(await dossier.evaluate((el) => el.scrollTop), recordScroll);
        assert.ok(await dossier.isVisible(), "closing the paper returns to the art-book page");
        await paper.click();
        await reading.getByRole("button", { name: "收起说明纸条", exact: true }).click();
        await reading.waitFor({ state: "hidden" });
        await dossier.getByRole("button", { name: "查看原图", exact: true }).click();
        await page.getByRole("dialog", { name: "胸前刀的折叠与握持研究", exact: true }).waitFor();
        assert.equal(await page.getByRole("dialog").count(), 2);
        await page.keyboard.press("Escape");
        await page.waitForFunction(() => document.querySelectorAll('[role="dialog"]').length === 1);
        assert.ok(await dossier.isVisible(), "closing the original returns to the record");
        await dossier.getByRole("button", { name: "返回人物", exact: true }).click();
        await dossier.waitFor({ state: "hidden" });
        assert.equal(
          await stage.getAttribute("data-focused"),
          "true",
          "record close preserves the camera",
        );
        await page.waitForFunction(
          () => document.activeElement?.getAttribute("data-equipment") === "chest-blade",
        );
        assert.ok(
          await blade.evaluate((el) => el === document.activeElement),
          "focus returns to the contour",
        );
        assert.equal(
          await page.evaluate(() => window.scrollY),
          scrollY,
          "closing keeps page position",
        );
        assert.equal(await page.locator(".gear-loadout").evaluate((el) => el.inert), false);
        assert.equal(await page.evaluate(() => document.body.style.overflow), "");
        await page.getByRole("button", { name: "返回全景", exact: true }).click();
        await blade.click();
        await page.keyboard.press("Escape");
        await page.waitForTimeout(450);
        assert.equal(await dossier.count(), 0, "Escape cancels the pending record open");
        assert.equal(await stage.getAttribute("data-focused"), "false");
        for (let angle = 1; angle <= 3; angle++) {
          await page.getByRole("button", { name: "下一视角", exact: true }).click();
          await page.waitForFunction(
            () => document.querySelector(".gear-body-stage")?.dataset.dimmed === "false",
          );
        }
        await page.getByRole("button", { name: "隐藏披风", exact: true }).click();
        const light = stage.locator('[data-equipment="light-flare"]');
        await light.click();
        await dossier.waitFor();
        assert.match(await dossier.locator("h2").textContent(), /照明/);
        await page.keyboard.press("Escape");
        await dossier.waitFor({ state: "hidden" });
        assert.match(await page.locator(".gear-turntable-image").getAttribute("alt"), /背面/);
        assert.match(
          await page.locator(".gear-turntable-image").getAttribute("src"),
          /turntable-armor/,
        );
        await page.goBack();
        await dossier.waitFor();
        assert.match(await dossier.locator("h2").textContent(), /胸前/);
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: "Switch to English", exact: true }).click();
        await page.goto(`${base}/gear#chest-blade`, { waitUntil: "networkidle" });
        await dossier.waitFor();
        assert.match(await dossier.locator(".gear-sheet-note").textContent(), /Magnets/);
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
          ),
        );
        const ids = await page
          .locator("[id]")
          .evaluateAll((elements) => elements.map((el) => el.id));
        assert.equal(new Set(ids).size, ids.length, "record and portable-tool IDs stay unique");
        assert.deepEqual(errors, []);
        await page.close();
      });
    }
  },
);
