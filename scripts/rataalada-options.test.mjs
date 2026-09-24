import assert from "node:assert/strict";
import { test } from "node:test";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url, {
  alias: { "@": join(rootDir, "src") },
});
const {
  TESTS,
  normalizeAnswer,
  nextBeat,
  EMPTY_PROGRESS,
  isYes,
  isNo,
} = jiti(join(rootDir, "src/lib/rataalada.ts"));

test("every riddle across all tests has exactly 4 structured multiple-choice options", () => {
  let count = 0;
  for (const t of TESTS) {
    for (const r of t.riddles) {
      count++;
      assert.ok(r.options, `Riddle ${r.id} in test ${t.id} must have options defined`);
      assert.equal(r.options.length, 4, `Riddle ${r.id} must have exactly 4 options`);

      const keys = r.options.map((opt) => opt.key);
      assert.deepEqual(keys, ["A", "B", "C", "D"], `Riddle ${r.id} option keys must be A, B, C, D`);

      for (const opt of r.options) {
        assert.ok(opt.labelEn && opt.labelEn.trim().length > 0, `Option ${opt.key} must have English label`);
        assert.ok(opt.labelZh && opt.labelZh.trim().length > 0, `Option ${opt.key} must have Chinese label`);
        assert.ok(opt.value && opt.value.trim().length > 0, `Option ${opt.key} must have value`);
      }

      const correctOptions = r.options.filter((opt) =>
        r.answers.includes(normalizeAnswer(opt.value)),
      );
      assert.equal(
        correctOptions.length,
        1,
        `Riddle ${r.id} must have exactly 1 correct option matching answers, found: ${correctOptions.map((o) => o.key).join(", ")}`,
      );

      const wrongOptions = r.options.filter(
        (opt) => !r.answers.includes(normalizeAnswer(opt.value)),
      );
      assert.equal(wrongOptions.length, 3, `Riddle ${r.id} must have exactly 3 incorrect distractor options`);
    }
  }
  assert.equal(count, 21, "There must be 21 total riddles across all test suites");
});

test("nextBeat correctly produces invite beat then riddle beat with options", () => {
  const initial = nextBeat(EMPTY_PROGRESS);
  assert.equal(initial.kind, "invite");

  const started = nextBeat({ ...EMPTY_PROGRESS, started: true });
  assert.equal(started.kind, "riddle");
  if (started.kind === "riddle") {
    assert.equal(started.test.id, "w1");
    assert.equal(started.index, 0);
    assert.equal(started.riddle.id, "street");
    assert.equal(started.riddle.options?.length, 4);
  }
});

test("isYes and isNo helper functions recognize hotkey responses", () => {
  assert.equal(isYes("y"), true);
  assert.equal(isYes("yes"), true);
  assert.equal(isYes("Y"), true);
  assert.equal(isNo("n"), true);
  assert.equal(isNo("no"), true);
  assert.equal(isNo("N"), true);
});
