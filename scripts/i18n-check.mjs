#!/usr/bin/env node
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const jiti = createJiti(rootDir, {
  alias: { "@": join(rootDir, "src") },
});

export function runI18nCheck() {
  const film = jiti(join(rootDir, "src/data/film.ts"));
  const people = jiti(join(rootDir, "src/lib/people.ts"));
  const places = jiti(join(rootDir, "src/lib/places.ts"));
  const cases = jiti(join(rootDir, "src/lib/cases.ts"));
  const roots = jiti(join(rootDir, "src/lib/roots.ts"));
  const merch = jiti(join(rootDir, "src/lib/merch.ts"));
  const production = jiti(join(rootDir, "src/data/production.ts"));
  const rataalada = jiti(join(rootDir, "src/lib/rataalada.ts"));

  const dossierEn = jiti(join(rootDir, "src/lib/i18n/dossier-en.ts"));
  const peopleEn = jiti(join(rootDir, "src/lib/i18n/people-en.ts"));
  const placesEn = jiti(join(rootDir, "src/lib/i18n/places-en.ts"));
  const casesEn = jiti(join(rootDir, "src/lib/i18n/cases-en.ts"));
  const rootsEn = jiti(join(rootDir, "src/lib/i18n/roots-en.ts"));
  const merchEn = jiti(join(rootDir, "src/lib/i18n/merch-en.ts"));
  const productionEn = jiti(join(rootDir, "src/lib/i18n/production-en.ts"));
  const rataaladaEn = jiti(join(rootDir, "src/lib/i18n/rataalada-en.ts"));

  const missing = {};
  const addMissing = (category, id) => {
    if (!missing[category]) missing[category] = [];
    missing[category].push(id);
  };

  // 1. Shoot logs
  (film.LOG || []).forEach((log) => {
    if (log.id && !dossierEn.LOG_EN?.[log.id]) {
      addMissing("Shoot Logs (film.LOG -> LOG_EN)", log.id);
    }
  });

  // 2. Plot clues
  (film.PLOT || []).forEach((plot) => {
    if (plot.id && !dossierEn.PLOT_EN?.[plot.id]) {
      addMissing("Plot Clues (film.PLOT -> PLOT_EN)", plot.id);
    }
  });

  // 3. Facts
  (film.FACTS || []).forEach((fact) => {
    if (fact.label && !dossierEn.FACTS_EN?.[fact.label]) {
      addMissing("Facts (film.FACTS -> FACTS_EN)", fact.label);
    }
  });

  // 4. People
  (people.PEOPLE || []).forEach((p) => {
    if (p.id && !peopleEn.PEOPLE_EN?.[p.id]) {
      addMissing("People (people.PEOPLE -> PEOPLE_EN)", p.id);
    }
  });

  // 5. Places
  (places.PLACES || []).forEach((p) => {
    if (p.id && !placesEn.PLACES_EN?.[p.id]) {
      addMissing("Places (places.PLACES -> PLACES_EN)", p.id);
    }
  });

  // 6. Cases
  (cases.CASE_FILES || []).forEach((c) => {
    if (c.id && !casesEn.CASE_FILES_EN?.[c.id]) {
      addMissing("Cases (cases.CASE_FILES -> CASE_FILES_EN)", c.id);
    }
  });

  // 7. Roots
  (roots.ROOTS || []).forEach((r) => {
    if (r.id && !rootsEn.ROOTS_EN?.[r.id]) {
      addMissing("Comic Roots (roots.ROOTS -> ROOTS_EN)", r.id);
    }
  });
  (roots.CINEMA_ROOTS || []).forEach((c) => {
    if (c.id && !rootsEn.CINEMA_ROOTS_EN?.[c.id]) {
      addMissing("Cinema Lineage (roots.CINEMA_ROOTS -> CINEMA_ROOTS_EN)", c.id);
    }
  });

  // 8. Merch groups
  (merch.MERCH || []).forEach((g) => {
    if (g.id && !merchEn.MERCH_GROUPS_EN?.[g.id]) {
      addMissing("Merch Groups (merch.MERCH -> MERCH_GROUPS_EN)", g.id);
    }
  });

  // 9. Production phases
  (production.PRODUCTION_PHASES || []).forEach((p) => {
    if (p.id && !productionEn.PRODUCTION_PHASES_EN?.[p.id]) {
      addMissing("Production Phases (production.PRODUCTION_PHASES -> PRODUCTION_PHASES_EN)", p.id);
    }
  });

  // 10. Rataalada unlocked image metadata
  const rataStills = [
    ...(rataalada.TESTS || []).flatMap((test) => test.stills || []),
    ...(rataalada.LOUNGE_STILLS || []),
  ];
  rataStills.forEach((still) => {
    const en = rataaladaEn.RATA_STILLS_EN?.[still.file];
    if (!en?.title?.trim() || !en?.caption?.trim()) {
      addMissing("Rataalada Stills (PrizeStill -> RATA_STILLS_EN)", still.file);
    }
  });

  // 11. Inline bilingual riddle-lore fields
  (roots.RIDDLE_LORE || []).forEach((item) => {
    const required = [
      ["kickerEn", item.kickerEn],
      ["titleEn", item.titleEn],
      ["promptEn", item.promptEn],
      ["answerEn", item.answerEn],
      ["targetSceneEn", item.targetSceneEn],
      ["literalMeaningEn", item.literalMeaningEn],
      ["linguisticTrapEn", item.linguisticTrapEn],
      ["narrativeTruthEn", item.narrativeTruthEn],
      ["imageAltEn", item.imageAltEn],
      ["imageCaptionEn", item.imageCaptionEn],
    ];
    for (const [field, value] of required) {
      if (!value || !String(value).trim()) {
        addMissing("Riddle Lore inline English fields", `${item.id}.${field}`);
      }
    }
  });

  const totalMissing = Object.values(missing).reduce((acc, list) => acc + list.length, 0);

  return {
    success: totalMissing === 0,
    totalMissing,
    missing,
  };
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  const result = runI18nCheck();
  if (result.success) {
    console.log("i18n check passed: configured bilingual archive coverage checks passed.");
    process.exit(0);
  } else {
    console.error(`i18n check failed: ${result.totalMissing} missing English translation(s):`);
    for (const [category, items] of Object.entries(result.missing)) {
      console.error(`\n[${category}]:`);
      items.forEach((item) => console.error(`  - ${item}`));
    }
    process.exit(1);
  }
}
