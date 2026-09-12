#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(__dirname, "..");

export const VALID_SOURCE_TIERS = new Set(["official", "press", "set"]);
export const VALID_EDGE_KINDS = new Set(["blood", "bond", "ally", "foe", "kill", "rumor"]);
export const VALID_NODE_STATUS = new Set(["alive", "dead", "gone", "arkham", "rumor"]);

export function isValidIsoDate(str) {
  if (typeof str !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const [year, month, day] = str.split("-").map(Number);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

export function isValidDisplayDate(str) {
  if (typeof str !== "string") return false;
  return /^\d{4}\.\d{2}(\.\d{2})?$/.test(str);
}

export function checkLocalMedia(mediaPath, category, identifier, rootDir, addError) {
  if (typeof mediaPath !== "string") return;
  if (!mediaPath.startsWith("/media/")) return;
  const relPath = join("public", mediaPath.slice(1));
  const fullPath = join(rootDir, relPath);
  if (!existsSync(fullPath)) {
    addError(category, `${identifier}: missing media file ${relPath}`);
  }
}

export function checkSourceFields(item, category, identifier, addError) {
  const { source, sourceUrl, sourceTier } = item;
  const hasAny = Boolean(source || sourceUrl || sourceTier);
  if (!hasAny) return;

  if (!source) {
    addError(category, `${identifier}: missing source`);
  }
  if (!sourceUrl) {
    addError(category, `${identifier}: missing sourceUrl`);
  } else if (!/^https?:\/\//.test(sourceUrl)) {
    addError(category, `${identifier}: invalid sourceUrl "${sourceUrl}" (must start with http:// or https://)`);
  }
  if (!sourceTier) {
    addError(category, `${identifier}: missing sourceTier`);
  } else if (!VALID_SOURCE_TIERS.has(sourceTier)) {
    addError(category, `${identifier}: invalid sourceTier "${sourceTier}" (must be official | press | set)`);
  }
}

export function runContentCheck(options = {}) {
  const rootDir = resolve(options.rootDir || DEFAULT_ROOT);
  const jiti = createJiti(import.meta.url, {
    alias: { "@": join(rootDir, "src") },
  });

  const film = jiti(join(rootDir, "src/data/film.ts"));
  const people = jiti(join(rootDir, "src/lib/people.ts"));
  const places = jiti(join(rootDir, "src/lib/places.ts"));
  const relations = jiti(join(rootDir, "src/lib/relations.ts"));

  /** @type {Record<string, string[]>} */
  const errorsByCategory = {};

  const addError = (category, msg) => {
    if (!errorsByCategory[category]) {
      errorsByCategory[category] = [];
    }
    errorsByCategory[category].push(msg);
  };

  // Pre-calculate reference sets
  const nodeIds = new Set();
  (relations.NODES || []).forEach((node) => {
    if (nodeIds.has(node.id)) {
      addError("people", `duplicate person node id: "${node.id}"`);
    }
    nodeIds.add(node.id);
  });

  const placeIds = new Set();
  (places.PLACES || []).forEach((place) => {
    if (placeIds.has(place.id)) {
      addError("places", `duplicate place id: "${place.id}"`);
    }
    placeIds.add(place.id);
  });

  // 1. Film / Shooting Log
  const seenLogIds = new Set();
  (film.LOG || []).forEach((entry, idx) => {
    const locId = entry.id || entry.iso || entry.date || `#${idx}`;

    if (entry.id) {
      if (seenLogIds.has(entry.id)) {
        addError("film/log", `${locId}: duplicate log id "${entry.id}"`);
      }
      seenLogIds.add(entry.id);
    }

    if (!entry.iso) {
      addError("film/log", `${locId}: missing iso date`);
    } else if (!isValidIsoDate(entry.iso)) {
      addError("film/log", `${locId}: invalid iso date "${entry.iso}"`);
    }

    if (entry.date && !isValidDisplayDate(entry.date)) {
      addError("film/log", `${locId}: invalid display date format "${entry.date}" (expected YYYY.MM or YYYY.MM.DD)`);
    }

    checkSourceFields(entry, "film/log", locId, addError);

    if (entry.image) {
      checkLocalMedia(entry.image, "film/log", locId, rootDir, addError);
    }
    if (Array.isArray(entry.images)) {
      entry.images.forEach((img) => checkLocalMedia(img, "film/log", locId, rootDir, addError));
    }
  });

  // CAST checks
  (film.CAST || []).forEach((c) => {
    const castId = c.roleEn || c.role || c.name;
    if (c.personId && !nodeIds.has(c.personId)) {
      addError("film/cast", `${castId} (${c.name}): unknown personId "${c.personId}"`);
    }
  });

  // FACTS & PLOT checks
  (film.FACTS || []).forEach((f) => {
    checkSourceFields(f, "film/facts", f.label, addError);
  });
  (film.PLOT || []).forEach((p, idx) => {
    const plotId = `plot-${idx} (${p.tag})`;
    checkSourceFields(p, "film/plot", plotId, addError);
  });

  // 2. People
  Object.entries(people.FILES || {}).forEach(([id, f]) => {
    if (!nodeIds.has(id)) {
      addError("people", `${id}: person file not declared in relations.NODES`);
    }
    if (Array.isArray(f.places)) {
      f.places.forEach((pId) => {
        if (!placeIds.has(pId)) {
          addError("people", `${id}: unknown place id: ${pId}`);
        }
      });
    }
    if (Array.isArray(f.stills)) {
      f.stills.forEach((still) => checkLocalMedia(still, "people", id, rootDir, addError));
    }
  });

  // 3. Places
  (places.PLACES || []).forEach((p) => {
    if (Array.isArray(p.people)) {
      p.people.forEach((personId) => {
        if (!nodeIds.has(personId)) {
          addError("places", `${p.id}: unknown person id: ${personId}`);
        }
      });
    }
    if (p.image) {
      checkLocalMedia(p.image, "places", p.id, rootDir, addError);
    }
  });

  // 4. Relations
  (relations.EDGES || []).forEach((edge, idx) => {
    const edgeLabel = `${edge.a} -> ${edge.b}`;
    if (!nodeIds.has(edge.a)) {
      addError("relations", `edge #${idx} (${edgeLabel}): unknown source id: ${edge.a}`);
    }
    if (!nodeIds.has(edge.b)) {
      addError("relations", `edge #${idx} (${edgeLabel}): unknown target id: ${edge.b}`);
    }
    if (edge.kind && !VALID_EDGE_KINDS.has(edge.kind)) {
      addError("relations", `edge #${idx} (${edgeLabel}): invalid edge kind "${edge.kind}"`);
    }
  });

  const totalErrors = Object.values(errorsByCategory).reduce((acc, list) => acc + list.length, 0);

  return {
    success: totalErrors === 0,
    totalErrors,
    errorsByCategory,
  };
}

export function formatReport(result) {
  if (result.success) {
    return "Content check passed.";
  }

  const lines = ["Content check failed:", ""];
  for (const [category, errs] of Object.entries(result.errorsByCategory)) {
    if (errs.length === 0) continue;
    lines.push(`[${category}]`);
    for (const err of errs) {
      lines.push(`- ${err}`);
    }
    lines.push("");
  }
  lines.push(`Total errors: ${result.totalErrors}`);
  return lines.join("\n");
}

// CLI execution
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const result = runContentCheck();
  const output = formatReport(result);
  if (result.success) {
    console.log(output);
    process.exit(0);
  } else {
    console.error(output);
    process.exit(1);
  }
}
