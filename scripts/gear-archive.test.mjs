import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@": join(root, "src") } });
const { LOADOUT, VEHICLES, SUIT_OVERVIEW, BODY_PLATE, GEAR_COPY } = jiti(
  join(root, "src/lib/gear-archive.ts"),
);
const { GEAR } = jiti(join(root, "src/lib/gear.ts"));
const { WORKSHOP } = jiti(join(root, "src/lib/gear-workshop.ts"));
const { TOOLS } = jiti(join(root, "src/lib/gear-tools.ts"));
const { searchSite } = jiti(join(root, "src/lib/search.ts"));
const { BODY_TURNTABLE_VIEWS, BODY_VIEW_HOTSPOTS } = jiti(
  join(root, "src/lib/gear-turntable-assets.ts"),
);
const { GEAR_EN, getLocalizedGear } = jiti(join(root, "src/lib/i18n/gear-en.ts"));
const records = [SUIT_OVERVIEW, ...LOADOUT, ...TOOLS, ...VEHICLES, ...WORKSHOP];

test("equipment archive preserves existing search anchors and adds a separate Drifter record", () => {
  const oldIds = [
    "suit",
    "cowl",
    "cape",
    "chest-blade",
    "belt",
    "contact-lens",
    "gauntlet",
    "grapnel",
    "sticky-bomb-gun",
    "car",
    "turbine",
    "batcycle",
    "corvette",
    "cave",
    "signal",
  ];
  const ids = GEAR.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of oldIds) assert.ok(ids.includes(id), id);
  assert.ok(ids.includes("drifter"));
  for (const item of records) {
    const searchItem = GEAR.find((gear) => gear.id === item.id);
    assert.equal(searchItem.lede, item.summary.zh);
    assert.equal(getLocalizedGear(searchItem, "en").lede, item.summary.en);
    assert.deepEqual(
      searchItem.body,
      [...item.filmDetails, ...item.designDetails].map((p) => p.zh),
    );
    assert.deepEqual(
      GEAR_EN[item.id].body,
      [...item.filmDetails, ...item.designDetails].map((p) => p.en),
    );
  }
});

test("art-book tools have distinct anchors and concept-aware usage labels", () => {
  for (const id of [
    "compact-nunchucks",
    "magnetic-charge",
    "finger-taser",
    "light-flare",
    "adrenaline-injector",
    "zip-tie-cuffs",
    "throwing-spikes",
    "lens-reader",
    "surveillance-earpiece",
    "drifter-kit",
  ]) {
    assert.ok(
      TOOLS.some((item) => item.id === id),
      id,
    );
    assert.ok(
      GEAR.some((item) => item.id === id),
      id,
    );
  }
  for (const id of ["compact-nunchucks", "throwing-spikes", "magnetic-charge"]) {
    const item = TOOLS.find((record) => record.id === id);
    assert.equal(item.usageLabel.zh, "用途与构想");
    assert.equal(item.hotspot, undefined);
  }
  assert.equal(
    LOADOUT.find((item) => item.id === "cape").plates.length,
    2,
  );
  assert.ok(
    LOADOUT.find((item) => item.id === "cape").plates.some((p) => p.src.includes("cape-real")),
  );
  assert.ok(
    LOADOUT.find((item) => item.id === "cape").plates.some((p) => p.src.includes("wingsuit-sketch")),
  );
  for (const query of ["双节棍", "nunchucks"]) {
    assert.ok(
      searchSite(query).some((item) => item.href === "/gear#compact-nunchucks"),
      query,
    );
  }
  assert.ok(searchSite("Batarang").some((item) => item.href === "/gear#batarang-launcher"));
});

test("workshop testing equipment preserves the Batarang anchor and Drifter kit is searchable", () => {
  for (const id of ["ballistics-bench", "batarang-launcher"]) {
    const item = WORKSHOP.find((record) => record.id === id);
    assert.ok(item, id);
    assert.equal(item.usageLabel.zh, "用途与构想");
    assert.equal(item.category.en, "Workshop equipment");
    assert.ok(!TOOLS.some((record) => record.id === id));
    assert.ok(!Object.values(BODY_VIEW_HOTSPOTS).some((view) => view[id]));
  }
  for (const [query, id] of [
    ["弹道", "ballistics-bench"],
    ["ballistics", "ballistics-bench"],
    ["侦查装束", "drifter-kit"],
    ["surveillance outfit", "drifter-kit"],
    ["CB750", "drifter"],
    ["磁吸", "chest-blade"],
  ]) {
    assert.ok(
      searchSite(query).some((item) => item.href === `/gear#${id}`),
      query,
    );
  }
});

test("new records have bilingual copy, source attribution and existing local plates", () => {
  for (const item of records) {
    for (const field of ["name", "category", "summary", "film", "design"]) {
      assert.ok(item[field].zh.trim(), `${item.id}.${field}.zh`);
      assert.ok(item[field].en.trim(), `${item.id}.${field}.en`);
    }
    assert.ok(item.filmDetails?.length >= 2, `${item.id}.filmDetails`);
    assert.ok(item.designDetails?.length >= 2, `${item.id}.designDetails`);
    assert.ok(item.plates.length);
  }
  for (const p of [BODY_PLATE, ...records.flatMap((item) => item.plates)]) {
    assert.ok(existsSync(join(root, "public", p.src)), p.src);
    if (p.preview) assert.ok(existsSync(join(root, "public", p.preview)), p.preview);
    assert.ok(p.title.zh && p.title.en && p.caption.zh && p.caption.en && p.stage.zh && p.stage.en);
    assert.ok(p.credit && p.provenance.source);
    assert.match(p.provenance.sourceUrl, /^https:\/\//);
    assert.ok(["archive", "official"].includes(p.provenance.sourceTier));
  }
  for (const copy of Object.values(GEAR_COPY)) assert.ok(copy.zh && copy.en);
  for (const item of GEAR) assert.ok(GEAR_EN[item.id], item.id);
});

test("body markers stay within the illustration and portable tools remain independent", () => {
  assert.equal(LOADOUT.length, 8);
  assert.equal(VEHICLES.length, 3);
  for (const item of LOADOUT.filter((record) => record.hotspot)) {
    assert.ok(item.hotspot.x > 0 && item.hotspot.x < 100, item.id);
    assert.ok(item.hotspot.y > 0 && item.hotspot.y < 100, item.id);
  }
  for (const id of ["contact-lens", "sticky-bomb-gun"])
    assert.equal(LOADOUT.find((record) => record.id === id).hotspot, undefined);
});

test("body equipment is distributed across visible angles", () => {
  assert.deepEqual(Object.keys(BODY_VIEW_HOTSPOTS[0]).sort(), [
    "adrenaline-injector",
    "belt",
    "chest-blade",
    "cowl",
    "magnetic-charge",
  ]);
  assert.ok(BODY_VIEW_HOTSPOTS[1].gauntlet);
  assert.ok(BODY_VIEW_HOTSPOTS[1]["throwing-spikes"]);
  assert.deepEqual(Object.keys(BODY_VIEW_HOTSPOTS[2]), ["grapnel"]);
  assert.deepEqual(Object.keys(BODY_VIEW_HOTSPOTS[3]), ["cape", "light-flare", "sticky-bomb-gun"]);
  assert.ok(BODY_TURNTABLE_VIEWS[3].src.endsWith("turntable-cape.jpg"));
  for (const item of LOADOUT.filter((record) => record.hotspot)) {
    assert.ok(
      Object.values(BODY_VIEW_HOTSPOTS).some((view) => view[item.id]),
      item.id,
    );
  }
  for (const view of Object.values(BODY_VIEW_HOTSPOTS)) {
    for (const point of Object.values(view)) {
      assert.ok(point.x > 0 && point.x < 100 && point.y > 0 && point.y < 100);
    }
  }
});

test("each visible body attachment has a contour and sheet annotations stay within the page", () => {
  const { BODY_VIEW_OUTLINES } = jiti(join(root, "src/lib/gear-turntable-assets.ts"));
  for (const [view, hotspots] of Object.entries(BODY_VIEW_HOTSPOTS)) {
    assert.deepEqual(Object.keys(BODY_VIEW_OUTLINES[view]).sort(), Object.keys(hotspots).sort());
  }
  const blade = LOADOUT.find((item) => item.id === "chest-blade");
  const sheet = blade.plates.find((p) => p.annotation);
  assert.ok(sheet.src.endsWith("chest-knife-sketch.jpg"));
  const note = sheet.annotation;
  for (const { annotation } of records.flatMap((item) => item.plates)) {
    if (!annotation) continue;
    const { x, y, width, height } = annotation;
    assert.ok(x >= 0 && y >= 0 && width > 0 && height > 0);
    assert.ok(x + width <= 100 && y + height <= 100);
  }
  assert.ok(note.text.zh.includes("磁吸") && note.text.en.includes("Magnets"));
});
