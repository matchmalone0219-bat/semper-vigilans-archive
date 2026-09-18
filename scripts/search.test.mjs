import test from "node:test";
import assert from "node:assert/strict";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, { alias: { "@": join(rootDir, "src") } });
const film = jiti(join(rootDir, "src/data/film.ts"));
const search = jiti(join(rootDir, "src/lib/search.ts"));

const fakeDebunked = {
  id: "debunked-court-of-owls-test",
  tag: "debunked",
  text: "猫头鹰法庭将作为《新蝙蝠侠2》主反派出场。",
  source: "早期传闻汇总",
  sourceUrl: "https://example.com/court-of-owls-rumor",
  sourceTier: "press",
  debunkedNote: "后续官方公布的演员阵容与该说法冲突，因此该传闻已被证伪。",
  debunkedSource: "Warner Bros. 官方公告",
  debunkedSourceUrl: "https://www.warnerbros.com/movies",
  debunkedSourceTier: "official",
  debunkedAt: "2026.09.15",
};

test("search indexes every current PLOT clue", () => {
  const clues = search.SEARCH_ITEMS.filter((entry) => entry.kind === "线索");
  assert.equal(clues.length, film.PLOT.length);
});

test("a debunked clue stays searchable with an explicit 已证伪 subtitle", () => {
  const indexed = search.plotToSearchItem(fakeDebunked);
  assert.equal(indexed.kind, "线索");
  assert.equal(indexed.href, "/dossier#debunked-court-of-owls-test");
  assert.equal(indexed.subtitle, `${film.CERTAINTY_LABEL.debunked} · 故事线索`);
  assert.match(indexed.subtitle, /已证伪/);
  assert.ok(indexed.searchText.includes("猫头鹰法庭"));
  assert.ok(indexed.searchText.includes("已证伪"));
  assert.ok(indexed.searchText.includes("warner bros"));
  assert.ok(indexed.searchText.includes("后续官方公布的演员阵容"));
});

test("site search still returns current plot rumors", () => {
  const hits = search.searchSite("Semper Vigilans");
  assert.ok(hits.some((hit) => hit.kind === "线索" && hit.href === "/dossier#rumor-semper-vigilans-court"));
});

test("searching for 缄默, 静默, or Hush matches the debunked clue", () => {
  const hitsJianmo = search.searchSite("缄默");
  assert.ok(
    hitsJianmo.some((hit) => hit.kind === "线索" && hit.href === "/dossier#debunked-hush-main-villain"),
  );

  const hitsJingmo = search.searchSite("静默");
  assert.ok(hitsJingmo.some((hit) => hit.href === "/dossier#debunked-hush-main-villain"));

  const hitsHush = search.searchSite("Hush");
  assert.ok(hitsHush.some((hit) => hit.href === "/dossier#debunked-hush-main-villain"));
});
