import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:4181";

test(
  "Downtown model preserves landmark navigation and degrades to the flat map",
  { timeout: 120000 },
  async (t) => {
    const server = spawn(
      process.execPath,
      ["node_modules/vite/bin/vite.js", "dev", "--host", "127.0.0.1", "--port", "4181"],
      { stdio: "pipe", detached: true },
    );
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
    for (let i = 0; i < 120; i++) {
      try {
        if ((await fetch(BASE)).ok) {
          ready = true;
          break;
        }
      } catch {
        /* Server booting. */
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    assert.ok(ready, "preview server starts");
    try {
      browser = await chromium.launch({ headless: true, args: ["--enable-unsafe-swiftshader"] });
    } catch (error) {
      if (String(error).includes("Executable doesn't exist")) {
        t.skip("Playwright browser not installed");
        return;
      }
      throw error;
    }
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${BASE}/places`);
    const model = page.locator("[data-city-model]");
    await model.locator("canvas").waitFor();
    const landmark = model.getByRole("button", { name: "查看哥谭市政厅", exact: true });
    await landmark.waitFor();

    await t.test("camera rotation, zoom and reset keep labels attached", async () => {
      const before = await landmark.evaluate((el) => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
      }));
      await page.getByRole("button", { name: "向右旋转沙盘", exact: true }).click();
      const after = await landmark.evaluate((el) => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
      }));
      assert.ok(Math.hypot(after.x - before.x, after.y - before.y) > 1);
      await page.getByRole("button", { name: "放大地图", exact: true }).click();
      assert.ok(await page.getByText("118%", { exact: true }).isVisible());
      await page.getByRole("button", { name: "重置地图视图", exact: true }).click();
      await page.waitForFunction(() =>
        document
          .querySelector('[aria-label="放大地图"]')
          ?.parentElement.textContent.includes("100%"),
      );
      const reset = await landmark.evaluate((el) => ({
        x: parseFloat(el.style.left),
        y: parseFloat(el.style.top),
      }));
      assert.ok(Math.hypot(reset.x - before.x, reset.y - before.y) < 2);
    });
    await t.test(
      "landmark keyboard details restore focus and open the existing dossier",
      async () => {
        await landmark.focus();
        await page.keyboard.press("Enter");
        await page.getByRole("heading", { name: "哥谭市政厅", exact: true }).waitFor();
        assert.equal(
          await page
            .getByRole("button", { name: "关闭地点介绍" })
            .evaluate((el) => el === document.activeElement),
          true,
        );
        await page.keyboard.press("Escape");
        assert.equal(await landmark.evaluate((el) => el === document.activeElement), true);
        await landmark.click();
        await page.getByRole("link", { name: "调阅完整地点档案" }).click();
        await page.waitForURL(/\/places\/city-hall\/?$/);
        await page.goBack();
        await model.locator("canvas").waitFor();
      },
    );
    await t.test(
      "all eight Downtown landmarks retain their detail links in both views",
      async () => {
        for (const view of ["3D 沙盘", "平面图"]) {
          await page.getByRole("button", { name: view, exact: true }).click();
          if (view === "平面图") {
            await page.locator("[data-transit-map=downtown]").waitFor();
            assert.equal(await page.locator("[data-gct-landmark]").count(), 8);
          } else await model.locator("canvas").waitFor();
          const markers = page.getByRole("button", { name: /^查看/ });
          assert.equal(await markers.count(), 8);
          const destinations = new Set();
          for (let index = 0; index < 8; index++) {
            const marker = markers.nth(index);
            await marker.press("Enter");
            const dialog = page.getByRole("dialog");
            const link = dialog.getByRole("link", { name: "调阅完整地点档案" });
            await link.waitFor();
            destinations.add(await link.getAttribute("href"));
            await page.keyboard.press("Escape");
            await dialog.waitFor({ state: "hidden" });
            const label = await marker.getAttribute("aria-label");
            try {
              await page.waitForFunction(
                (label) => document.activeElement?.getAttribute("aria-label") === label,
                label,
              );
            } catch (error) {
              console.error("Landmark focus restoration", {
                view,
                index,
                label,
                state: await page.evaluate(() => ({
                  active: document.activeElement?.outerHTML,
                  dialog: document.querySelector("[role=dialog]")?.textContent,
                })),
              });
              throw error;
            }
          }
          assert.equal(destinations.size, 8);
        }
        await page.getByRole("button", { name: "3D 沙盘", exact: true }).click();
        await model.locator("canvas").waitFor();
      },
    );
    await t.test(
      "Wayne Tower and Arkham are accessible in their boroughs rather than unlocated files",
      async () => {
        assert.equal(
          await model.getByRole("button", { name: "查看韦恩塔", exact: true }).count(),
          0,
        );
        const unlocated = page.locator("section").filter({ has: page.getByRole("heading", { name: "占地尚待确定的地点档案", exact: true }) });
        assert.equal(await unlocated.count(), 0, "all location dossiers are mapped or linked to their host building");
        for (const id of ["wayne-tower", "arkham", "falcone", "cave", "orphanage", "seawall"]) {
          assert.equal(await unlocated.locator(`a[href$="/places/${id}"]`).count(), 0);
        }
        await page.getByRole("button", { name: /Midtown/ }).click();
        assert.equal(
          await page.getByRole("button", { name: "查看韦恩塔", exact: true }).count(),
          0,
        );
        await page.getByRole("button", { name: "韦恩塔", exact: true }).click();
        assert.match(await page.getByRole("dialog").getByRole("link", { name: "调阅关联地点档案" }).getAttribute("href"), /\/places\/wayne-tower$/);
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: /Uptown/ }).click();
        await page.getByRole("button", { name: "阿卡姆州立医院/疯人院", exact: true }).click();
        assert.match(await page.getByRole("dialog").getByRole("link", { name: "调阅关联地点档案" }).getAttribute("href"), /\/places\/arkham$/);
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: /Downtown/ }).click();
        await model.locator("canvas").waitFor();
      },
    );
    await t.test("Gotham Orphanage opens its dossier from both Uptown views", async () => {
      await page.getByRole("button", { name: /Uptown/ }).click();
      const flat = page.locator("[data-transit-map=uptown]");
      await flat.waitFor();
      const markerBox = await page.getByRole("button", { name: "查看哥谭孤儿院", exact: true }).boundingBox();
      const buildingBox = await flat.locator("[data-gct-landmark=orphanage]").boundingBox();
      assert.ok(Math.hypot(markerBox.x + markerBox.width / 2 - buildingBox.x - buildingBox.width / 2, markerBox.y + markerBox.height / 2 - buildingBox.y - buildingBox.height / 2) < 15, "orphanage marker stays on the manor building through the SVG layout");
      await page.getByRole("button", { name: "查看哥谭孤儿院", exact: true }).press("Enter");
      const dossier = page.getByRole("dialog").getByRole("link", { name: "调阅完整地点档案" });
      await dossier.click();
      await page.waitForURL("**/places/orphanage");
      assert.match(await page.locator("main").innerText(), /哥谭高地/);
      await page.goBack();
      await page.getByRole("button", { name: /Uptown/ }).click();
      await page.getByRole("button", { name: "3D 沙盘", exact: true }).click();
      const uptownModel = page.locator("[data-city-model=uptown]");
      await uptownModel.locator("canvas").waitFor();
      await uptownModel.getByRole("button", { name: "查看哥谭孤儿院", exact: true }).press("Enter");
      assert.match(await page.getByRole("dialog").innerText(), /旧韦恩庄园|韦恩家族庄园/);
      await page.keyboard.press("Escape");
      await page.getByRole("button", { name: /Downtown/ }).click();
      await model.locator("canvas").waitFor();
    });
    await t.test("both GCT maps expose every location and restore keyboard focus", async () => {
      for (const [region, count] of [
        ["Uptown", 26],
        ["Midtown", 24],
      ]) {
        await page.getByRole("button", { name: new RegExp(region) }).click();
        const map = page.locator(`[data-transit-map=${region.toLowerCase()}]`);
        const stations = map.locator("[data-transit-station]");
        assert.equal(await stations.count(), count);
        assert.equal(
          await page.locator(`[data-transit-index=${region.toLowerCase()}] li`).count(),
          count,
        );
        for (let i = 0; i < count; i++) {
          const station = stations.nth(i);
          await station.press("Enter");
          const dialog = page.getByRole("dialog");
          await dialog.waitFor();
          assert.equal(await station.getAttribute("aria-expanded"), "true");
          await page.waitForFunction(
            () => document.activeElement?.getAttribute("aria-label") === "关闭交通地点介绍",
          );
          const id = await station.getAttribute("data-transit-station");
          if (id === "arkham" || id === "wayne-tower") {
            assert.match(
              await dialog.getByRole("link", { name: "调阅关联地点档案" }).getAttribute("href"),
              new RegExp(`/places/${id}/?$`),
            );
          }
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          await page.waitForFunction(
            (id) => document.activeElement?.getAttribute("data-transit-station") === id,
            id,
          );
        }
      }
      await page.getByRole("button", { name: /Downtown/ }).click();
      await model.locator("canvas").waitFor();
    });
    await t.test("Downtown transit is shared by plan and model and Falcone stays above Iceberg", async () => {
      await page.getByRole("button", { name: "平面图", exact: true }).click();
      const map = page.locator("[data-transit-map=downtown]");
      if (await page.getByRole("button", { name: "GCT 交通图层", exact: true }).getAttribute("aria-pressed") === "false") {
        await page.getByRole("button", { name: "GCT 交通图层", exact: true }).click();
      }
      assert.equal(await map.locator("[data-transit-station]").count(), 28);
      assert.equal(await map.locator("[data-gct-landmark]").count(), 8);
      for (const station of await map.locator("[data-transit-station]").all()) {
        await station.press("Enter");
        await page.getByRole("dialog").waitFor();
        await page.keyboard.press("Escape");
      }
      await page.getByRole("button", { name: "GCT 交通图层", exact: true }).click();
      assert.equal(await map.locator("[data-transit-station]").count(), 0);
      await page.getByRole("button", { name: "3D 沙盘", exact: true }).click();
      await model.locator("canvas").waitFor();
      assert.equal(await model.getByRole("button", { name: /^查看/ }).count(), 8);
      await model.getByRole("button", { name: "查看冰山俱乐部", exact: true }).press("Enter");
      await page.getByRole("dialog").getByRole("link", { name: /法尔科内顶层豪宅/ }).click();
      await page.waitForURL(/\/places\/falcone$/);
      const relation = page.locator("section").filter({ has: page.getByRole("heading", { name: "楼内空间", exact: true }) });
      await relation.getByRole("link", { name: /下方场所.*冰山俱乐部/ }).click();
      await page.waitForURL(/\/places\/iceberg$/);
      await page.getByRole("button", { name: "Switch to English", exact: true }).click();
      await page.locator("section").filter({ has: page.getByRole("heading", { name: "Within the Building", exact: true }) }).getByRole("link", { name: /Penthouse Above.*Falcone/ }).click();
      await page.waitForURL(/\/places\/falcone$/);
      await page.getByRole("button", { name: "切换为中文", exact: true }).click();
      await page.goto(`${BASE}/places`);
      await model.locator("canvas").waitFor();
    });
    await t.test("Batcave shares Wayne Tower's site and links both dossiers", async () => {
      const unlocated = page.locator("section").filter({
        has: page.getByRole("heading", { name: "占地尚待确定的地点档案", exact: true }),
      });
      assert.equal(await unlocated.locator('a[href$="/places/cave"]').count(), 0);
      await page.getByRole("button", { name: /Midtown/ }).click();
      for (const view of ["平面图", "3D 沙盘"]) {
        await page.getByRole("button", { name: view, exact: true }).click();
        if (view === "平面图") {
          await page.locator("[data-transit-station=wayne-tower]").press("Enter");
        } else {
          await model.locator("canvas").waitFor();
          await model.getByRole("button", { name: /查看韦恩塔/ }).press("Enter");
        }
        const caveLink = page.getByRole("dialog").getByRole("link", { name: /地下车间 \/ 蝙蝠洞/ });
        assert.match(await caveLink.getAttribute("href"), /\/places\/cave\/?$/);
        assert.match(await caveLink.textContent(), /韦恩塔正下方.*废弃韦恩终点站/s);
        await page.keyboard.press("Escape");
      }
      await page.locator("[data-transit-index=midtown]").getByRole("button", { name: /韦恩塔站/ }).click();
      await page.getByRole("dialog").getByRole("link", { name: /地下车间 \/ 蝙蝠洞/ }).click();
      await page.waitForURL(/\/places\/cave\/?$/);
      const relation = page.locator("section").filter({ has: page.getByRole("heading", { name: "地上与地下", exact: true }) });
      await relation.getByRole("link", { name: /上方建筑.*韦恩塔/ }).click();
      await page.waitForURL(/\/places\/wayne-tower\/?$/);
      await page.getByRole("button", { name: "Switch to English", exact: true }).click();
      const englishRelation = page.locator("section").filter({ has: page.getByRole("heading", { name: "Above and Below Ground", exact: true }) });
      await englishRelation.getByRole("link", { name: /Directly Beneath.*Batcave/ }).click();
      await page.waitForURL(/\/places\/cave\/?$/);
      await page.getByText("Beneath Wayne Tower · Abandoned Wayne Terminus", { exact: true }).waitFor();
      await page.getByRole("button", { name: "切换为中文", exact: true }).click();
      await page.goto(`${BASE}/places`);
      await model.locator("canvas").waitFor();
    });
    await t.test(
      "GCT index, pan and zoom work on narrow screens with closed-route details",
      async () => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.getByRole("button", { name: /中城区/ }).click();
        const map = page.locator("[data-transit-map=midtown]");
        const index = page.locator("[data-transit-index=midtown]");
        await index.getByRole("button", { name: /韦恩塔站/ }).click();
        const dialog = page.getByRole("dialog");
        await dialog.waitFor();
        assert.ok(await dialog.isVisible(), "index selection brings details into view");
        assert.match(await dialog.textContent(), /关闭.*替代巴士/s);
        await page.keyboard.press("Escape");
        const indexButton = index.getByRole("button", { name: /韦恩塔站/ });
        await page.waitForFunction(() => document.activeElement?.textContent.includes("韦恩塔站"));
        await page.getByRole("button", { name: "放大地图", exact: true }).click();
        assert.ok(await page.getByText("118%", { exact: true }).isVisible());
        const frame = map.locator("..");
        const before = await frame.getAttribute("style");
        const panRegion = page.getByRole("region", {
          name: "可拖动和缩放的哥谭中城区地图",
          exact: true,
        });
        await panRegion.scrollIntoViewIfNeeded();
        const bounds = await panRegion.boundingBox();
        await page.mouse.move(bounds.x + 12, bounds.y + 80);
        await page.mouse.down();
        await page.mouse.move(bounds.x + 42, bounds.y + 110, { steps: 6 });
        await page.mouse.up();
        assert.notEqual(await frame.getAttribute("style"), before, "dragging water pans the map");
        await page.getByRole("button", { name: "重置地图视图", exact: true }).click();
        assert.ok(await page.getByText("100%", { exact: true }).isVisible());
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
          false,
        );
        await indexButton.click();
        await dialog.getByRole("link", { name: "调阅关联地点档案" }).click();
        await page.waitForURL(/\/places\/wayne-tower\/?$/);
        await page.goBack();
        await page.getByRole("button", { name: /中城区/ }).click();
        await page.getByRole("button", { name: "Switch to English", exact: true }).click();
        await page.locator("[data-transit-station=wayne-tower]").press("Enter");
        await page.getByRole("heading", { name: "Wayne Tower (Closed)", exact: true }).waitFor();
        assert.ok(
          await page
            .getByRole("dialog")
            .getByRole("link", { name: "Open Related Dossier" })
            .isVisible(),
        );
        await page.keyboard.press("Escape");
        await page.getByRole("button", { name: "切换为中文", exact: true }).click();
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.getByRole("button", { name: /下城区/ }).click();
        await model.locator("canvas").waitFor();
      },
    );
    await t.test(
      "new borough models retain the building plan, optional transit layer and dossier links",
      async () => {
        for (const [region, count] of [
          ["Uptown", 716],
          ["Midtown", 729],
        ]) {
          const id = region.toLowerCase();
          await page.getByRole("button", { name: new RegExp(region) }).click();
          const flat = page.locator(`[data-transit-map=${id}]`);
          assert.equal(await flat.locator("[data-building-footprint]").count(), count);
          await page.getByRole("button", { name: "GCT 交通图层", exact: true }).click();
          assert.equal(await flat.locator("[data-transit-station]").count(), 0);
          await page.getByRole("button", { name: "3D 沙盘", exact: true }).click();
          const boroughModel = page.locator(`[data-city-model=${id}]`);
          await boroughModel.locator("canvas").waitFor();
          const label = boroughModel.getByRole("button", { name: /^查看/ });
          assert.equal(await label.count(), id === "uptown" ? 2 : 1);
          await boroughModel.getByRole("button", { name: id === "uptown" ? "查看阿卡姆州立医院/疯人院" : "查看韦恩塔", exact: true }).press("Enter");
          const dialog = page.getByRole("dialog");
          await dialog.getByRole("link", { name: "调阅关联地点档案" }).waitFor();
          await page.keyboard.press("Escape");
          assert.equal(
            await page
              .getByRole("button", { name: "GCT 交通图层", exact: true })
              .getAttribute("aria-pressed"),
            "false",
            "opening a model keeps the layer preference",
          );
          await page.getByRole("button", { name: "向右旋转沙盘", exact: true }).click();
          await page.getByRole("button", { name: "GCT 交通图层", exact: true }).click();
          await page.getByRole("button", { name: "平面图", exact: true }).click();
          assert.equal(await flat.locator("[data-building-footprint]").count(), count);
          assert.ok((await flat.locator("[data-transit-station]").count()) > 20);
        }
        await page.getByRole("button", { name: /Downtown/ }).click();
        await model.locator("canvas").waitFor();
      },
    );
    await t.test("flood mode shows seven markers and flat view can be restored", async () => {
      await page.getByRole("button", { name: "谜语人洪灾计划", exact: true }).click();
      assert.equal(await model.locator(":scope > span:visible").count(), 7);
      assert.equal(await model.locator(":scope > button:visible").count(), 0);
      await page.keyboard.press("Escape");
      await page.waitForFunction(
        () => document.querySelectorAll("[data-city-model] > button:not([hidden])").length === 8,
      );
      for (let i = 0; i < 3; i++) {
        await page.getByRole("button", { name: "平面图", exact: true }).click();
        assert.equal(await page.locator("[data-city-model]").count(), 0);
        await page.getByRole("button", { name: "3D 沙盘", exact: true }).click();
        await model.locator("canvas").waitFor();
      }
    });
    await t.test("narrow layout has readable labels without overlap or page overflow", async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole("button", { name: "重置地图视图", exact: true }).click();
      const layout = await model.evaluate((el) => {
        const boxes = [...el.querySelectorAll(":scope > button")]
          .filter((button) => getComputedStyle(button).visibility !== "hidden")
          .map((button) => button.getBoundingClientRect());
        return {
          count: boxes.length,
          overflow: document.documentElement.scrollWidth > innerWidth,
          overlap: boxes.some((a, i) =>
            boxes
              .slice(i + 1)
              .some(
                (b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top,
              ),
          ),
        };
      });
      assert.equal(layout.count, 8);
      assert.equal(layout.overflow, false);
      assert.equal(layout.overlap, false);
    });
    await t.test("WebGL context loss preserves access to the map", async () => {
      await model
        .locator("canvas")
        .evaluate((canvas) =>
          canvas.dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
        );
      await page.getByRole("status").filter({ hasText: "城市沙盘暂不可用" }).waitFor();
      assert.equal(await model.count(), 0);
      assert.equal(
        await page
          .getByRole("button", { name: "平面图", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      await page.getByRole("button", { name: "查看哥谭市政厅", exact: true }).focus();
      await page.keyboard.press("Enter");
      await page.getByRole("heading", { name: "哥谭市政厅", exact: true }).waitFor();
    });
    assert.deepEqual(errors, []);
  },
);
