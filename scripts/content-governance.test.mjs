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

test("curator notes on interview quotes are explicitly labeled", () => {
  for (const entry of interviews.INTERVIEWS) {
    if (!entry.note) continue;
    assert.match(
      entry.note,
      /^【本站整理】/,
      `${entry.id}: interview note must be separated from direct quotation with 【本站整理】`,
    );
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
