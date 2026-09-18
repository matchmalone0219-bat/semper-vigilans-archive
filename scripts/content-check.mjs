#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(__dirname, "..");

export const VALID_SOURCE_TIERS = new Set(["official", "press", "set", "archive"]);
export const PRESS_URL_HOSTS = new Set([
  "ign.com",
  "comicbook.com",
  "variety.com",
  "rollingstone.com",
  "newsweek.com",
  "movieweb.com",
  "comingsoon.net",
  "superherohype.com",
  "gamesradar.com",
  "the-independent.com",
  "independent.co.uk",
  "stv.tv",
  "heraldscotland.com",
]);
export const VALID_PLOT_TAGS = new Set(["confirmed", "hint", "rumor", "debunked"]);
export const PLOT_ID_PATTERN = /^[a-z][a-z0-9-]*$/;
export const PLOT_DEBUNKED_FIELDS = [
  "debunkedNote",
  "debunkedSource",
  "debunkedSourceUrl",
  "debunkedAt",
  "debunkedSourceTier",
];
export const VALID_EDGE_KINDS = new Set(["blood", "bond", "ally", "foe", "kill", "rumor"]);
export const VALID_NODE_STATUS = new Set(["alive", "dead", "gone", "arkham", "rumor"]);
export const VALID_MERCH_VARIANT_TYPES = new Set(["movie", "cinema-exclusive", "film-inspiration"]);

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

export function urlHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function isPressHost(host) {
  if (!host) return false;
  for (const pressHost of PRESS_URL_HOSTS) {
    if (host === pressHost || host.endsWith(`.${pressHost}`)) return true;
  }
  return false;
}

export function checkTierMatchesUrl(url, tier, category, identifier, field, addError) {
  if (!url || !tier) return;
  const host = urlHost(url);
  if (isPressHost(host) && tier !== "press") {
    addError(
      category,
      `${identifier}: ${field} "${tier}" does not match linked page (${host}); use press`,
    );
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
    addError(category, `${identifier}: invalid sourceTier "${sourceTier}" (must be official | press | set | archive)`);
  }
  checkTierMatchesUrl(sourceUrl, sourceTier, category, identifier, "sourceTier", addError);
}

export function checkPlotItem(plot, identifier, addError) {
  if (!plot?.id) {
    addError("film/plot", `${identifier}: missing id`);
  } else if (!PLOT_ID_PATTERN.test(plot.id)) {
    addError(
      "film/plot",
      `${identifier}: invalid id "${plot.id}" (use kebab-case like debunked-hush-main-villain)`,
    );
  }

  if (!VALID_PLOT_TAGS.has(plot?.tag)) {
    addError(
      "film/plot",
      `${identifier}: invalid tag "${plot?.tag}" (must be confirmed | hint | rumor | debunked)`,
    );
  }

  checkSourceFields(plot, "film/plot", identifier, addError);

  const leaked = PLOT_DEBUNKED_FIELDS.filter((key) => plot?.[key] != null && plot[key] !== "");

  if (plot?.tag === "debunked") {
    if (!plot.debunkedNote) {
      addError("film/plot", `${identifier}: missing debunkedNote`);
    }
    if (!plot.debunkedSource) {
      addError("film/plot", `${identifier}: missing debunkedSource`);
    }
    if (!plot.debunkedSourceUrl) {
      addError("film/plot", `${identifier}: missing debunkedSourceUrl`);
    } else if (!/^https?:\/\//.test(plot.debunkedSourceUrl)) {
      addError(
        "film/plot",
        `${identifier}: invalid debunkedSourceUrl "${plot.debunkedSourceUrl}" (must start with http:// or https://)`,
      );
    }
    if (!plot.debunkedAt) {
      addError("film/plot", `${identifier}: missing debunkedAt`);
    } else if (!isValidDisplayDate(plot.debunkedAt)) {
      addError(
        "film/plot",
        `${identifier}: invalid debunkedAt "${plot.debunkedAt}" (expected YYYY.MM or YYYY.MM.DD)`,
      );
    }
    if (plot.debunkedSourceTier && !VALID_SOURCE_TIERS.has(plot.debunkedSourceTier)) {
      addError(
        "film/plot",
        `${identifier}: invalid debunkedSourceTier "${plot.debunkedSourceTier}" (must be official | press | set | archive)`,
      );
    }
    checkTierMatchesUrl(
      plot.debunkedSourceUrl,
      plot.debunkedSourceTier,
      "film/plot",
      identifier,
      "debunkedSourceTier",
      addError,
    );
    return;
  }

  if (leaked.length) {
    addError(
      "film/plot",
      `${identifier}: debunked fields (${leaked.join(", ")}) are only allowed when tag is "debunked"`,
    );
  }
}

export function checkMerchSourceFields(item, identifier, addError) {
  const { sourceUrl, sourceLabel, sourceTier } = item;
  const hasAny = Boolean(sourceUrl || sourceLabel || sourceTier);
  if (!hasAny) return;

  if (!sourceUrl) {
    addError("merch/items", `${identifier}: missing sourceUrl`);
  } else if (!/^https?:\/\//.test(sourceUrl)) {
    addError("merch/items", `${identifier}: invalid sourceUrl "${sourceUrl}" (must start with http:// or https://)`);
  }
  if (!sourceLabel) {
    addError("merch/items", `${identifier}: missing sourceLabel`);
  }
  if (sourceTier && !VALID_SOURCE_TIERS.has(sourceTier)) {
    addError("merch/items", `${identifier}: invalid sourceTier "${sourceTier}" (must be official | press | set | archive)`);
  }
}

export function checkMerch(merchExport, rootDir, addError) {
  const groups = merchExport?.MERCH || [];
  const seenGroupIds = new Set();
  const seenIds = new Set();

  groups.forEach((group) => {
    if (group?.id) {
      if (seenGroupIds.has(group.id)) {
        addError("merch/groups", `duplicate merch group id: "${group.id}"`);
      }
      seenGroupIds.add(group.id);
    }

    (group?.items || []).forEach((item) => {
      const itemId = item?.id || "(missing-id)";
      if (item?.id) {
        if (seenIds.has(item.id)) {
          addError("merch/items", `duplicate merch item id: "${item.id}"`);
        }
        seenIds.add(item.id);
      }

      if (!item?.image) {
        addError("merch/items", `${itemId}: missing image`);
      } else {
        checkLocalMedia(item.image, "merch/items", itemId, rootDir, addError);
      }

      checkMerchSourceFields(item || {}, itemId, addError);

      (item?.covers || []).forEach((cover) => {
        const coverId = cover?.id || `${itemId}-cover`;
        if (cover?.id) {
          if (seenIds.has(cover.id)) {
            addError("merch/covers", `duplicate merch cover id: "${cover.id}"`);
          }
          seenIds.add(cover.id);
        }
        if (!cover?.image) {
          addError("merch/covers", `${coverId}: missing image`);
        } else {
          checkLocalMedia(cover.image, "merch/covers", coverId, rootDir, addError);
        }
        if (!cover?.iso) {
          addError("merch/covers", `${coverId}: missing iso date`);
        } else if (!isValidIsoDate(cover.iso)) {
          addError("merch/covers", `${coverId}: invalid iso date "${cover.iso}"`);
        }
        if (!cover?.releaseDate) {
          addError("merch/covers", `${coverId}: missing releaseDate`);
        } else if (!isValidDisplayDate(cover.releaseDate)) {
          addError("merch/covers", `${coverId}: invalid display date format "${cover.releaseDate}" (expected YYYY.MM or YYYY.MM.DD)`);
        }
        if (!VALID_MERCH_VARIANT_TYPES.has(cover?.variantType)) {
          addError("merch/covers", `${coverId}: invalid variantType "${cover?.variantType}"`);
        }
      });
    });
  });
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
  const merchMod = jiti(join(rootDir, "src/lib/merch.ts"));

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
  const seenPlotIds = new Set();
  (film.PLOT || []).forEach((p, idx) => {
    const plotId = p.id || `plot-${idx} (${p.tag})`;
    checkPlotItem(p, plotId, addError);
    if (p.id) {
      if (seenPlotIds.has(p.id)) {
        addError("film/plot", `${plotId}: duplicate plot id "${p.id}"`);
      }
      seenPlotIds.add(p.id);
    }
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

  // 5. Merch
  checkMerch(merchMod, rootDir, addError);

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
