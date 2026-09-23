import test from "node:test";
import assert from "node:assert/strict";
import { runI18nCheck } from "./i18n-check.mjs";
import { readFileSync } from "node:fs";

test("all archive content has complete bilingual English coverage", () => {
  const result = runI18nCheck();
  assert.equal(
    result.success,
    true,
    `Missing translations: ${JSON.stringify(result.missing, null, 2)}`
  );
  assert.equal(result.totalMissing, 0);
});

test("both PR checks and Pages deployments enforce bilingual coverage", () => {
  for (const workflow of ["check-pr.yml", "deploy-pages.yml"]) {
    const yaml = readFileSync(new URL("../.github/workflows/" + workflow, import.meta.url), "utf8");
    assert.match(
      yaml,
      /- run: npm run content:check\s+- run: npm run i18n:check\s+- run: npm run media:check/,
      workflow + " should run bilingual checks before publishing",
    );
  }
});
