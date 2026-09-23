import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  MIN_WIDTH,
  classifyMedia,
  extractMediaRefs,
  readDimensions,
  runMediaCheck,
  sniffMime,
} from "./media-check.mjs";

const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

test("sniffMime reads PNG and JPEG magic bytes", () => {
  assert.equal(sniffMime(PNG_1X1), "image/png");
  assert.equal(sniffMime(Buffer.from([0xff, 0xd8, 0xff, 0xe0])), "image/jpeg");
});

test("readDimensions returns PNG IHDR size", () => {
  assert.deepEqual(readDimensions(PNG_1X1, "image/png"), { width: 1, height: 1 });
});

test("extractMediaRefs ignores trailing punctuation", () => {
  const refs = extractMediaRefs(`src: "/media/log/p2-16-load.jpg", extra /media/merch/hottoys.jpg.`);
  assert.equal(refs.has("/media/log/p2-16-load.jpg"), true);
  assert.equal(refs.has("/media/merch/hottoys.jpg"), true);
});

test("classifyMedia warns on duplicates, orphans, size, width, and mime mismatch", () => {
  const files = [
    {
      rel: "public/media/a.jpg",
      webPath: "/media/a.jpg",
      ext: ".jpg",
      bytes: 100,
      sha: "aaa",
      sniff: "image/png",
      mime: "image/png",
      expectedMime: "image/jpeg",
      width: 320,
      height: 240,
    },
    {
      rel: "public/media/b.jpg",
      webPath: "/media/b.jpg",
      ext: ".jpg",
      bytes: 3 * 1024 * 1024,
      sha: "aaa",
      sniff: "image/jpeg",
      mime: "image/jpeg",
      expectedMime: "image/jpeg",
      width: 1600,
      height: 900,
    },
    {
      rel: "public/media/used.jpg",
      webPath: "/media/used.jpg",
      ext: ".jpg",
      bytes: 10,
      sha: "bbb",
      sniff: "image/jpeg",
      mime: "image/jpeg",
      expectedMime: "image/jpeg",
      width: 800,
      height: 600,
    },
  ];
  const warnings = classifyMedia(files, new Set(["/media/used.jpg"]));
  const kinds = warnings.map((item) => item.kind).sort();
  assert.deepEqual(kinds, ["duplicate", "huge", "mime", "orphan", "orphan", "small"].sort());
  assert.equal(MIN_WIDTH, 600);
});

test("runMediaCheck reports an unreferenced fixture without deleting it", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "media-check-"));
  await mkdir(path.join(root, "public", "media"), { recursive: true });
  await mkdir(path.join(root, "src"), { recursive: true });
  await writeFile(path.join(root, "public", "media", "orphan.png"), PNG_1X1);
  await writeFile(path.join(root, "src", "page.ts"), `export const x = "/media/missing.jpg";\n`);

  const result = await runMediaCheck({ rootDir: root });
  assert.equal(result.files.length, 1);
  assert.equal(result.warnings.some((item) => item.kind === "orphan"), true);
  assert.equal(result.warnings.some((item) => item.kind === "small"), true);
});


test("repository has no duplicate, orphan, or MIME-mismatched media assets", async () => {
  const result = await runMediaCheck();
  const blockingKinds = new Set(["duplicate", "orphan", "mime"]);
  const blocking = result.warnings.filter((item) => blockingKinds.has(item.kind));
  assert.deepEqual(
    blocking,
    [],
    "Media hygiene regressions:\n" +
      blocking.map((item) => `${item.kind}: ${item.file} (${item.detail})`).join("\n"),
  );
});
