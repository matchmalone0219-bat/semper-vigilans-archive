import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {
  alias: { "@": join(rootDir, "src") },
});
const { LOG } = jiti(join(rootDir, "src/data/film.ts"));
const { LOG_EN, getLocalizedLog, getLocalizedLogVideoTitle } = jiti(
  join(rootDir, "src/lib/i18n/dossier-en.ts"),
);

function log(id) {
  const entry = LOG.find((item) => item.id === id);
  assert.ok(entry, `Missing test log: ${id}`);
  return entry;
}

test("home and dossier display the same translated log title, body and location", () => {
  const featured = log("log-2026-07-15");
  const latestShoot = log("log-2026-09-20");

  for (const entry of [featured, latestShoot]) {
    const localized = getLocalizedLog(entry, "en");
    assert.equal(localized.title, LOG_EN[entry.id].title);
    assert.equal(localized.body, LOG_EN[entry.id].body);
    assert.deepEqual(getLocalizedLog(entry, "zh"), entry);
  }
  assert.equal(
    getLocalizedLog(latestShoot, "en").locationLabel,
    "London · Night Action Vehicle Unit",
  );
});

test("short English video labels are optional and fall back to the translated log title", () => {
  const featured = log("log-2026-07-15");
  assert.equal(
    getLocalizedLogVideoTitle(featured, "en"),
    LOG_EN[featured.id].videoTitle,
  );
  assert.equal(
    getLocalizedLogVideoTitle(featured, "zh"),
    featured.video.title,
  );

  const ordinary = LOG.find(
    (entry) => entry.video && LOG_EN[entry.id] && !LOG_EN[entry.id].videoTitle,
  );
  assert.ok(ordinary, "Expected a video without a special short English label");
  assert.equal(getLocalizedLogVideoTitle(ordinary, "en"), LOG_EN[ordinary.id].title);
  assert.equal(getLocalizedLogVideoTitle(ordinary, "zh"), ordinary.video.title);
});

test("homepage no longer maintains its own log translation map", () => {
  const homepage = readFileSync(
    join(rootDir, "src/components/home/signals-hub.tsx"),
    "utf8",
  );
  assert.doesNotMatch(homepage, /LOG_EN_MAP/);
  assert.match(homepage, /getLocalizedLog\(latestShoot, locale\)/);
  assert.match(homepage, /getLocalizedLogVideoTitle\(entry, locale\)/);
});
