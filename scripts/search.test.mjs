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



test("exact titles outrank keyword-only matches", () => {
  for (const title of ["蝙蝠侠装备库", "马特·里夫斯接任导演与编剧"]) {
    assert.equal(search.searchSite(title, 1000)[0].title, title);
  }
});

test("every log has a unique permanent anchor and exact search destination", () => {
  const ids = film.LOG.map(entry => entry.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const entry of film.LOG) {
    assert.match(entry.id, /^log-[a-z0-9-]+$/);
    assert.ok(search.SEARCH_ITEMS.some(item => item.kind === "日志" && item.href === `/dossier#${entry.id}` && item.title === entry.title));
  }
});

test("search URL state accepts valid filters and rejects malformed values", () => {
  const { parseSearchState } = jiti(join(rootDir, "src/lib/search-state.ts"));
  assert.deepEqual(parseSearchState({ q: "蝙蝠侠", category: "log", shown: "32" }), { q: "蝙蝠侠", category: "log", shown: 32 });
  assert.deepEqual(parseSearchState({ q: [], category: "invalid", shown: -1 }), { q: undefined, category: undefined, shown: undefined });
});
