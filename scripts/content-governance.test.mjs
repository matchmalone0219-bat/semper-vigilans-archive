import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {
  alias: { "@": join(rootDir, "src") },
});

const interviews = jiti(join(rootDir, "src/data/interviews.ts"));
const production = jiti(join(rootDir, "src/data/production.ts"));
const cases = jiti(join(rootDir, "src/lib/cases.ts"));
const rataalada = jiti(join(rootDir, "src/lib/rataalada.ts"));

test("interview notes stay structurally separate without public self-certifying prefixes", () => {
  for (const entry of interviews.INTERVIEWS) {
    assert.doesNotMatch(entry.quoteZh, /【本站整理】|ARCHIVE CURATOR NOTE|档案注记/);
    assert.doesNotMatch(entry.quoteEn, /【本站整理】|ARCHIVE CURATOR NOTE|档案注记/);
    if (!entry.note) continue;
    assert.doesNotMatch(
      entry.note,
      /^(?:【本站整理】|\[ARCHIVE CURATOR NOTE|档案注记)/,
      `${entry.id}: editorial note should remain a separate field without a public self-certifying prefix`,
    );
  }
});


test("public archive voice does not expose verification housekeeping", () => {
  const sourceLink = readFileSync(join(rootDir, "src/components/source-link.tsx"), "utf8");
  const signalsHub = readFileSync(join(rootDir, "src/components/home/signals-hub.tsx"), "utf8");
  const zh = readFileSync(join(rootDir, "src/lib/i18n/translations/zh.ts"), "utf8");
  const en = readFileSync(join(rootDir, "src/lib/i18n/translations/en.ts"), "utf8");

  assert.doesNotMatch(sourceLink, /核验\s*\{verifiedAt\}/);
  assert.doesNotMatch(signalsHub, /verified UK filming dispatches|最新官方公开线索/);
  assert.doesNotMatch(en, /verified set leaks/i);
  assert.doesNotMatch(zh, /传闻均已标明出处/);
});

test("user-facing copy avoids defensive self-certifying phrasing across primary copy files", () => {
  const targetFiles = [
    "src/components/home/signals-hub.tsx",
    "src/lib/i18n/translations/zh.ts",
    "src/lib/i18n/translations/en.ts",
    "src/data/interviews.ts",
    "src/lib/craft.ts",
    "src/lib/gallery.ts",
    "src/data/recap.ts",
    "src/lib/people.ts",
    "src/lib/rataalada.ts",
  ];

  const forbiddenPatterns = [
    { pattern: /【本站整理】/, label: "【本站整理】" },
    { pattern: /经核对/, label: "经核对" },
    { pattern: /本站判断/, label: "本站判断" },
    { pattern: /本站预计/, label: "本站预计" },
    { pattern: /以成片为准/, label: "以成片为准" },
    { pattern: /传闻均已标明出处/, label: "传闻均已标明出处" },
    { pattern: /verified set leaks/i, label: "verified set leaks" },
    { pattern: /verified UK filming/i, label: "verified UK filming" },
  ];

  for (const relPath of targetFiles) {
    const content = readFileSync(join(rootDir, relPath), "utf8");
    for (const { pattern, label } of forbiddenPatterns) {
      assert.doesNotMatch(
        content,
        pattern,
        `${relPath} should not contain defensive/self-certifying phrasing: "${label}"`,
      );
    }
  }
});
test("Bruce journal archive contains only authenticated opening and closing voiceovers", () => {
  assert.deepEqual(
    cases.BRUCE_JOURNALS.map((entry) => entry.id),
    ["journal-oct-31", "journal-nov-06"],
  );
});

test("production remarks are presented as sourced summaries rather than pseudo-quotes", () => {
  for (const phase of production.PRODUCTION_PHASES) {
    assert.equal("keyQuotes" in phase, false, `${phase.id}: legacy keyQuotes should not return`);
    for (const statement of phase.keyStatements ?? []) {
      assert.ok(statement.text, `${phase.id}: statement summary is empty`);
      assert.ok(statement.source, `${phase.id}: statement summary is missing source label`);
      assert.match(statement.sourceUrl ?? "", /^https?:\/\//, `${phase.id}: statement summary is missing source URL`);
    }
  }
  const component = readFileSync(
    join(rootDir, "src/components/dossier/dossier-production-drama.tsx"),
    "utf8",
  );
  assert.doesNotMatch(component, /“\{quote\.text\}”/);
  assert.match(component, /SOURCE-BACKED REMARK SUMMARY/);
});

test("Rataalada archive-made text defaults to extended provenance", () => {
  assert.equal(rataalada.LOUNGE_TEXT.provenance, "extended");
  assert.equal(rataalada.LOADING_TEXT.provenance, "extended");
  assert.equal(rataalada.PROMISE_TEXT.provenance, "extended");
  const arkham = rataalada.TESTS.flatMap((entry) => entry.texts ?? [])
    .find((entry) => entry.file === "ARKHAM.TXT");
  assert.equal(arkham?.provenance, "extended");

  assert.equal(rataalada.GCPD_TEXT.provenance, "historical");
  assert.equal(rataalada.GCPD_TEXT.body[0], "THIS DOMAIN HAS BEEN SEIZED");
  assert.equal(rataalada.GOODBYE_TEXT.provenance, "historical");
  assert.deepEqual(rataalada.GOODBYE_TEXT.body, ["GOOD BYE <?>"]);
  assert.equal(rataalada.TRIBUTE_TEXT.provenance, "extended");
});

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx)$/.test(name) ? [path] : [];
  });
}

test("release-date display values have one source of truth", () => {
  const filmPath = join(rootDir, "src/data/film.ts");
  const duplicates = [];
  for (const path of sourceFiles(join(rootDir, "src"))) {
    if (path === filmPath) continue;
    const source = readFileSync(path, "utf8");
    for (const literal of ["2028 年 2 月 18 日", "February 18, 2028"]) {
      if (source.includes(literal)) duplicates.push(`${path.replace(rootDir + "/", "")}: ${literal}`);
    }
  }
  assert.deepEqual(
    duplicates,
    [],
    "Release date literals outside src/data/film.ts:\n" + duplicates.join("\n"),
  );
});
