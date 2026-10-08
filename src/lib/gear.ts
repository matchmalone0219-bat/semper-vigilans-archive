import { GEAR_COPY, LOADOUT, SUIT_OVERVIEW, VEHICLES } from "./gear-archive";
import { WORKSHOP } from "./gear-workshop";
import { TOOLS } from "./gear-tools";

export type GearItem = {
  id: string;
  kicker: string;
  name: string;
  nameEn: string;
  seen: string;
  image: string;
  imageAlt: string;
  lede: string;
  body: string[];
};

export const GEAR_INTRO = GEAR_COPY.intro.zh;

export const GEAR: GearItem[] = [
  ...[SUIT_OVERVIEW, ...LOADOUT, ...TOOLS, ...VEHICLES, ...WORKSHOP].map((item, index) => ({
    id: item.id,
    kicker: `${String(index + 1).padStart(2, "0")} / ${item.category.zh}`,
    name: item.name.zh,
    nameEn: item.name.en,
    seen: "The Batman · 2022",
    image: item.plates[0]!.src,
    imageAlt: item.plates[0]!.title.zh,
    lede: item.summary.zh,
    body: [...(item.filmDetails ?? [item.film]), ...(item.designDetails ?? [item.design])].map(
      (paragraph) => paragraph.zh,
    ),
  })),
];
