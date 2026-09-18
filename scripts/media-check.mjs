#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const DEFAULT_ROOT = path.resolve(path.dirname(__filename), "..");

export const LARGE_BYTES = 2 * 1024 * 1024;
export const HUGE_BYTES = 3 * 1024 * 1024;
export const MIN_WIDTH = 600;
export const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

const EXT_MIME = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

const SKIP_DIR = new Set(["node_modules", "dist", ".git", ".tanstack"]);

export function sniffMime(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "image/png";
  }
  if (buf.length >= 6) {
    const head = buf.subarray(0, 6).toString("ascii");
    if (head === "GIF87a" || head === "GIF89a") return "image/gif";
  }
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  if (buf.length >= 12 && buf.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buf.subarray(8, 12).toString("ascii");
    if (brand === "avif" || brand === "avis" || brand === "mif1") return "image/avif";
  }
  const text = buf.subarray(0, 256).toString("utf8").replace(/^\uFEFF/, "").trim();
  if (text.startsWith("<svg") || (text.startsWith("<?xml") && text.includes("<svg"))) {
    return "image/svg+xml";
  }
  return null;
}

function jpegSize(buf) {
  let offset = 2;
  while (offset + 8 < buf.length) {
    if (buf[offset] !== 0xff) return null;
    while (offset < buf.length && buf[offset] === 0xff) offset += 1;
    if (offset >= buf.length) return null;
    const marker = buf[offset];
    offset += 1;
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    if (marker === 0xda) return null;
    if (offset + 2 > buf.length) return null;
    const length = buf.readUInt16BE(offset);
    if (length < 2) return null;
    if (marker >= 0xc0 && marker <= 0xc3) {
      if (offset + 7 > buf.length) return null;
      return { width: buf.readUInt16BE(offset + 5), height: buf.readUInt16BE(offset + 3) };
    }
    offset += length;
  }
  return null;
}

function pngSize(buf) {
  if (buf.length < 24) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function gifSize(buf) {
  if (buf.length < 10) return null;
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
}

function webpSize(buf) {
  if (buf.length < 30) return null;
  const kind = buf.subarray(12, 16).toString("ascii");
  if (kind === "VP8X") {
    const width = 1 + buf[24] + (buf[25] << 8) + ((buf[26] & 0x0f) << 16);
    const height = 1 + buf[27] + (buf[28] << 8) + ((buf[29] & 0x0f) << 16);
    return { width, height };
  }
  if (kind === "VP8 " && buf.length >= 30) {
    const width = buf.readUInt16LE(26) & 0x3fff;
    const height = buf.readUInt16LE(28) & 0x3fff;
    return { width, height };
  }
  if (kind === "VP8L" && buf.length >= 25) {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  return null;
}

export function readDimensions(buf, mime) {
  if (mime === "image/jpeg") return jpegSize(buf);
  if (mime === "image/png") return pngSize(buf);
  if (mime === "image/gif") return gifSize(buf);
  if (mime === "image/webp") return webpSize(buf);
  return null;
}

export function webPathFor(relFromPublic) {
  return `/${relFromPublic.split(path.sep).join("/")}`;
}

async function walkFiles(dir, filter, acc = []) {
  if (!existsSync(dir)) return acc;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIR.has(entry.name)) continue;
      await walkFiles(full, filter, acc);
    } else if (filter(full, entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

export function extractMediaRefs(source) {
  const refs = new Set();
  const pattern = /\/media\/[A-Za-z0-9._\-/]+/g;
  for (const match of source.matchAll(pattern)) {
    refs.add(match[0].replace(/[.,;:]+$/, ""));
  }
  return refs;
}

export function classifyMedia(files, referenced) {
  /** @type {{ kind: string, file: string, detail: string }[]} */
  const warnings = [];

  const byHash = new Map();
  for (const file of files) {
    if (!byHash.has(file.sha)) byHash.set(file.sha, []);
    byHash.get(file.sha).push(file);
  }
  for (const [sha, group] of byHash) {
    if (group.length < 2) continue;
    warnings.push({
      kind: "duplicate",
      file: group.map((item) => item.rel).join("\n           "),
      detail: `${group.length} copies · sha256 ${sha.slice(0, 12)}…`,
    });
  }

  for (const file of files) {
    if (!referenced.has(file.webPath)) {
      warnings.push({ kind: "orphan", file: file.rel, detail: "not referenced in src/ or scripts/" });
    }
    if (file.bytes >= LARGE_BYTES) {
      const mb = (file.bytes / (1024 * 1024)).toFixed(1);
      warnings.push({
        kind: file.bytes >= HUGE_BYTES ? "huge" : "oversized",
        file: file.rel,
        detail: `${mb} MB`,
      });
    }
    if (file.mime !== "image/svg+xml" && file.width && file.width < MIN_WIDTH) {
      warnings.push({
        kind: "small",
        file: file.rel,
        detail: `${file.width}×${file.height ?? "?"}`,
      });
    }
    if (file.expectedMime && file.sniff && file.expectedMime !== file.sniff) {
      warnings.push({
        kind: "mime",
        file: file.rel,
        detail: `extension=${file.ext} sniff=${file.sniff}`,
      });
    }
  }

  return warnings;
}

export async function runMediaCheck(options = {}) {
  const rootDir = path.resolve(options.rootDir || DEFAULT_ROOT);
  const mediaDir = path.join(rootDir, "public", "media");
  const srcDir = path.join(rootDir, "src");
  const scriptsDir = path.join(rootDir, "scripts");

  const imagePaths = await walkFiles(mediaDir, (_full, name) => IMAGE_EXT.has(path.extname(name).toLowerCase()));
  const files = [];

  for (const full of imagePaths) {
    const buf = await readFile(full);
    const info = await stat(full);
    const ext = path.extname(full).toLowerCase();
    const sniff = sniffMime(buf);
    const mime = sniff || EXT_MIME[ext] || null;
    const size = mime ? readDimensions(buf, mime) : null;
    const rel = path.relative(rootDir, full).split(path.sep).join("/");
    files.push({
      full,
      rel,
      webPath: webPathFor(path.relative(path.join(rootDir, "public"), full)),
      ext,
      bytes: info.size,
      sha: createHash("sha256").update(buf).digest("hex"),
      sniff,
      mime,
      expectedMime: EXT_MIME[ext] ?? null,
      width: size?.width ?? null,
      height: size?.height ?? null,
    });
  }

  const referenced = new Set();
  const codeFiles = [
    ...(await walkFiles(srcDir, (_full, name) => /\.(?:ts|tsx|js|jsx|css|html|md)$/.test(name))),
    ...(await walkFiles(scriptsDir, (_full, name) => /\.(?:mjs|js|ts)$/.test(name))),
  ];
  for (const full of codeFiles) {
    const source = await readFile(full, "utf8");
    for (const ref of extractMediaRefs(source)) referenced.add(ref);
  }

  const warnings = classifyMedia(files, referenced);
  return { files, referenced, warnings };
}

export function formatMediaReport(result) {
  const lines = [`Media check: ${result.files.length} files`];
  if (!result.warnings.length) {
    lines.push("No warnings.");
    return lines.join("\n");
  }

  lines.push("");
  for (const warning of result.warnings) {
    lines.push(`WARN  ${warning.kind.padEnd(10)} ${warning.file}  ${warning.detail}`);
  }
  lines.push("");
  lines.push(`${result.warnings.length} warning${result.warnings.length === 1 ? "" : "s"} · files are not deleted.`);
  return lines.join("\n");
}

if (path.resolve(process.argv[1] ?? "") === __filename) {
  const result = await runMediaCheck();
  console.log(formatMediaReport(result));
  process.exit(0);
}
