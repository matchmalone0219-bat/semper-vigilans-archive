import test from "node:test";
import assert from "node:assert/strict";
import {
  isValidIsoDate,
  isValidDisplayDate,
  checkSourceFields,
  checkLocalMedia,
  checkMerch,
  formatReport,
} from "./content-check.mjs";

test("isValidIsoDate validates proper calendar dates", () => {
  assert.equal(isValidIsoDate("2026-02-28"), true);
  assert.equal(isValidIsoDate("2024-02-29"), true); // leap year
  assert.equal(isValidIsoDate("2026-02-29"), false); // non-leap year
  assert.equal(isValidIsoDate("2026-02-30"), false); // invalid day
  assert.equal(isValidIsoDate("2026-09-31"), false); // September has 30 days
  assert.equal(isValidIsoDate("2026-13-01"), false); // invalid month
  assert.equal(isValidIsoDate("2026-00-10"), false); // invalid month
  assert.equal(isValidIsoDate("2026/05/01"), false); // wrong delimiter
  assert.equal(isValidIsoDate("not-a-date"), false);
  assert.equal(isValidIsoDate(null), false);
  assert.equal(isValidIsoDate(undefined), false);
});

test("isValidDisplayDate validates YYYY.MM and YYYY.MM.DD", () => {
  assert.equal(isValidDisplayDate("2026.09.04"), true);
  assert.equal(isValidDisplayDate("2025.12"), true);
  assert.equal(isValidDisplayDate("2026-09-04"), false);
  assert.equal(isValidDisplayDate("invalid"), false);
});

test("checkSourceFields reports missing fields when any source field is present", () => {
  const errors = [];
  const addError = (cat, msg) => errors.push({ cat, msg });

  // None present -> OK
  checkSourceFields({}, "film/log", "entry-1", addError);
  assert.equal(errors.length, 0);

  // Source present, but missing url and tier
  checkSourceFields({ source: "Variety" }, "film/log", "entry-2", addError);
  assert.equal(errors.length, 2);
  assert.match(errors[0].msg, /missing sourceUrl/);
  assert.match(errors[1].msg, /missing sourceTier/);

  // Invalid source tier
  errors.length = 0;
  checkSourceFields(
    { source: "Blog", sourceUrl: "https://example.com", sourceTier: "rumor" },
    "film/log",
    "entry-3",
    addError
  );
  assert.equal(errors.length, 1);
  assert.match(errors[0].msg, /invalid sourceTier/);

  // Invalid sourceUrl scheme
  errors.length = 0;
  checkSourceFields(
    { source: "Blog", sourceUrl: "ftp://example.com", sourceTier: "press" },
    "film/log",
    "entry-4",
    addError
  );
  assert.equal(errors.length, 1);
  assert.match(errors[0].msg, /invalid sourceUrl/);

  // Complete valid source info
  errors.length = 0;
  checkSourceFields(
    { source: "Variety", sourceUrl: "https://variety.com/123", sourceTier: "press" },
    "film/log",
    "entry-5",
    addError
  );
  assert.equal(errors.length, 0);
});

test("checkLocalMedia verifies existing files and ignores external urls", () => {
  const errors = [];
  const addError = (cat, msg) => errors.push({ cat, msg });

  // External URL -> ignored
  checkLocalMedia("https://example.com/test.jpg", "film/log", "test-ext", ".", addError);
  assert.equal(errors.length, 0);

  // Existing file
  checkLocalMedia("/media/signal.jpg", "film/log", "test-signal", ".", addError);
  assert.equal(errors.length, 0);

  // Missing file
  checkLocalMedia("/media/log/non-existent-image-12345.jpg", "film/log", "test-missing", ".", addError);
  assert.equal(errors.length, 1);
  assert.match(errors[0].msg, /missing media file/);
});

test("formatReport formats success and failure outputs correctly", () => {
  assert.equal(formatReport({ success: true, totalErrors: 0, errorsByCategory: {} }), "Content check passed.");

  const failResult = {
    success: false,
    totalErrors: 2,
    errorsByCategory: {
      "film/log": ["2026-09-31: invalid iso date"],
      people: ['bruce: unknown place id "wayne-cave-x"'],
    },
  };
  const formatted = formatReport(failResult);
  assert.match(formatted, /^Content check failed:/);
  assert.match(formatted, /\[film\/log\]/);
  assert.match(formatted, /- 2026-09-31: invalid iso date/);
  assert.match(formatted, /\[people\]/);
  assert.match(formatted, /- bruce: unknown place id "wayne-cave-x"/);
  assert.match(formatted, /Total errors: 2/);
});

function collectMerchErrors(merch) {
  const errors = [];
  checkMerch(merch, ".", (cat, msg) => errors.push(`${cat}: ${msg}`));
  return errors;
}

const validCover = {
  id: "movie-variant-sample",
  title: "Batman #1",
  issue: "#1",
  coverArtist: "Test",
  releaseDate: "2022.03.01",
  iso: "2022-03-01",
  image: "/media/signal.jpg",
  imageAlt: "test",
  variantType: "movie",
};

const validItem = {
  id: "sample-item",
  name: "Sample",
  image: "/media/signal.jpg",
  sourceUrl: "https://example.com/item",
  sourceLabel: "Example",
  sourceTier: "press",
};

test("checkMerch flags duplicate group, item, and cover ids plus invalid fields", () => {
  const errors = collectMerchErrors({
    MERCH: [
      {
        id: "fashion",
        items: [
          { ...validItem, id: "dup-item", covers: [validCover] },
          {
            ...validItem,
            id: "dup-item",
            image: "/media/merch/does-not-exist.jpg",
            sourceUrl: "ftp://example.com/bad",
            sourceTier: "rumor",
          },
        ],
      },
      {
        id: "fashion",
        items: [
          {
            ...validItem,
            id: "cover-collision",
            covers: [
              { ...validCover, id: "dup-item" },
              {
                ...validCover,
                id: "bad-cover",
                iso: "2022-13-40",
                releaseDate: "March 1",
                variantType: "reprint",
                image: "/media/merch/missing-cover.jpg",
              },
            ],
          },
        ],
      },
    ],
  });

  assert.ok(errors.some((e) => e.includes('merch/groups: duplicate merch group id: "fashion"')));
  assert.ok(errors.some((e) => e.includes('merch/items: duplicate merch item id: "dup-item"')));
  assert.ok(errors.some((e) => e.includes("merch/items: dup-item: missing media file")));
  assert.ok(errors.some((e) => e.includes("invalid sourceUrl")));
  assert.ok(errors.some((e) => e.includes('invalid sourceTier "rumor"')));
  assert.ok(errors.some((e) => e.includes('merch/covers: duplicate merch cover id: "dup-item"')));
  assert.ok(errors.some((e) => e.includes("bad-cover: invalid iso date")));
  assert.ok(errors.some((e) => e.includes("bad-cover: invalid display date format")));
  assert.ok(errors.some((e) => e.includes("bad-cover: missing media file")));
  assert.ok(errors.some((e) => e.includes('invalid variantType "reprint"')));
});

test("checkMerch accepts a valid catalog and treats sourceTier as optional", () => {
  const errors = collectMerchErrors({
    MERCH: [
      {
        id: "print",
        items: [
          {
            id: "with-tier",
            image: "/media/signal.jpg",
            sourceUrl: "https://www.dc.com/blog",
            sourceLabel: "DC",
            sourceTier: "official",
            covers: [validCover],
          },
          {
            id: "no-source",
            image: "/media/signal.jpg",
          },
          {
            id: "label-only-needs-url",
            image: "/media/signal.jpg",
            sourceLabel: "Retailer",
          },
        ],
      },
    ],
  });

  assert.ok(errors.some((e) => e.includes("label-only-needs-url: missing sourceUrl")));
  assert.equal(errors.some((e) => e.includes("no-source")), false);
  assert.equal(errors.some((e) => e.includes("with-tier")), false);
});
