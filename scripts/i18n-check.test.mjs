import test from "node:test";
import assert from "node:assert/strict";
import { runI18nCheck } from "./i18n-check.mjs";

test("all archive content has complete bilingual English coverage", () => {
  const result = runI18nCheck();
  assert.equal(
    result.success,
    true,
    `Missing translations: ${JSON.stringify(result.missing, null, 2)}`
  );
  assert.equal(result.totalMissing, 0);
});
