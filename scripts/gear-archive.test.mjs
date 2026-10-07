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
const { GEAR_EN, getLocalizedGear } = jiti(join(root, "src/lib/i18n/gear-en.ts"));
const records = [SUIT_OVERVIEW, ...LOADOUT, ...VEHICLES];

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
