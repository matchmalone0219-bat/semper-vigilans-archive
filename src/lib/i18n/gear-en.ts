import type { Locale } from "./types";
import type { GearItem } from "@/lib/gear";
import { GEAR_COPY, LOADOUT, SUIT_OVERVIEW, VEHICLES } from "@/lib/gear-archive";

export const GEAR_INTRO_EN = GEAR_COPY.intro.en;
type EnglishGear = Pick<GearItem, "kicker" | "name" | "seen" | "imageAlt" | "lede" | "body">;
export const GEAR_EN: Record<string, EnglishGear> = {
  ...Object.fromEntries(
    [SUIT_OVERVIEW, ...LOADOUT, ...VEHICLES].map((item, index) => [
      item.id,
      {
        kicker: `${String(index + 1).padStart(2, "0")} / ${item.category.en}`,
        name: item.name.en,
        seen: "The Batman · 2022",
        imageAlt: item.plates[0]!.title.en,
        lede: item.summary.en,
        body: [item.film.en, item.design.en],
      },
    ]),
  ),
  turbine: {
    kicker: "Engine design",
    name: "Rear engine design",
    seen: "The Batman · 2022",
    imageAlt: "Batmobile rear and exposed-engine concept design",
    lede: "Exposed machinery and exhaust structures at the rear are among the Batmobile's most recognizable mechanical details.",
    body: [
      "Models and construction studies isolate this assembly for comparison with the overall vehicle designs.",
    ],
  },
  corvette: {
    kicker: "Civilian car",
    name: "Chevrolet Corvette Stingray",
    seen: "The Batman · 2022",
    imageAlt: "Bruce's black Corvette",
    lede: "Bruce drives a black sports car to the mayor's memorial, extending the family wealth associated with his public identity.",
    body: [
      "Its long body and the Batmobile's rough silhouette reflect the different vehicles of Bruce's two identities.",
    ],
  },
  cave: {
    kicker: "Underground workshop",
    name: "The workshop / Batcave",
    seen: "The Batman · 2022",
    imageAlt: "Workshop and tunnel space beneath Wayne Tower",
    lede: "An underground railway space becomes a workshop and investigation area, where Bruce replays recordings, studies evidence and maintains his equipment.",
    body: ["Vehicles, workbenches and screens form Bruce's working environment."],
  },
  signal: {
    kicker: "Gotham signal",
    name: "Bat-Signal",
    seen: "The Batman · 2022",
    imageAlt: "The bat silhouette on a rainy night",
    lede: "The bat silhouette in the night sky connects Gordon and Batman and becomes a recognizable signal on Gotham's streets.",
    body: ["Its appearance over the city evokes cooperation, intimidation and hope."],
  },
};

export function getLocalizedGear(item: GearItem, locale: Locale): GearItem {
  return locale === "en" && GEAR_EN[item.id] ? { ...item, ...GEAR_EN[item.id] } : item;
}
