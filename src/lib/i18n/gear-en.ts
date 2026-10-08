import type { Locale } from "./types";
import type { GearItem } from "@/lib/gear";
import { GEAR_COPY, LOADOUT, SUIT_OVERVIEW, VEHICLES } from "@/lib/gear-archive";
import { WORKSHOP } from "@/lib/gear-workshop";
import { TOOLS } from "@/lib/gear-tools";

export const GEAR_INTRO_EN = GEAR_COPY.intro.en;
type EnglishGear = Pick<GearItem, "kicker" | "name" | "seen" | "imageAlt" | "lede" | "body">;
export const GEAR_EN: Record<string, EnglishGear> = {
  ...Object.fromEntries(
    [SUIT_OVERVIEW, ...LOADOUT, ...TOOLS, ...VEHICLES, ...WORKSHOP].map((item, index) => [
      item.id,
      {
        kicker: `${String(index + 1).padStart(2, "0")} / ${item.category.en}`,
        name: item.name.en,
        seen: "The Batman · 2022",
        imageAlt: item.plates[0]!.title.en,
        lede: item.summary.en,
        body: [...(item.filmDetails ?? [item.film]), ...(item.designDetails ?? [item.design])].map(
          (paragraph) => paragraph.en,
        ),
      },
    ]),
  ),
};

export function getLocalizedGear(item: GearItem, locale: Locale): GearItem {
  return locale === "en" && GEAR_EN[item.id] ? { ...item, ...GEAR_EN[item.id] } : item;
}
