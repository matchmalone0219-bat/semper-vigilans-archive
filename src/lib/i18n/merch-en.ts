export const MERCH_INTRO_EN =
  "A comprehensive catalog of officially licensed merchandise and collectibles released during and following the premiere of The Batman. Encompassing master-grade figures, 1:1 prop replicas, museum-scale statues, iconic vehicles, LEGO sets, comic box sets, theatrical prints, haute couture, lifestyle collaborations, and Knight Models miniature tabletop games. Documenting the official material archive of Matt Reeves' Bat-Verse, with Part II collectibles to be added upon future announcements.";

export interface MerchGroupEn {
  kicker: string;
  title: string;
  intro: string;
}

export const MERCH_GROUPS_EN: Record<string, MerchGroupEn> = {
  figures: {
    kicker: "01",
    title: "Action Figures",
    intro:
      "Officially licensed 1/6 collectible articulated figures, 1/12 scale import figures, 1/9 mid-tier production runs, and 7-inch retail figures emphasizing authentic likeness sculpts, bespoke fabric tailoring, and interchangeable accessories.",
  },
  props: {
    kicker: "02",
    title: "Prop Replicas",
    intro:
      "Die-cast metal replicas and display pieces crafted directly from Warner Bros. production team 3D scans and master prop files, including 1:1 limited editions and scaled desk replicas.",
  },
  statues: {
    kicker: "03",
    title: "Statues & Busts",
    intro:
      "1:1 life-size silicone busts, museum-grade polystone full-body statues, and 1/10 to 1/6 scale retail collectibles capturing key cinematic stances and keyart silhouettes.",
  },
  vehicles: {
    kicker: "04",
    title: "Vehicles & Batmobiles",
    intro:
      "Officially licensed Batmobiles, Batcycles, and helicopter models spanning massive 1/6 scale vehicle centers, die-cast models, RC units, and blind boxes.",
  },
  lego: {
    kicker: "05",
    title: "LEGO Sets",
    intro:
      "Official LEGO building sets themed around The Batman, including the large-scale Technic Batmobile and DC minifigure crime-fighting dioramas.",
  },
  print: {
    kicker: "06",
    title: "Comics & Box Sets",
    intro:
      "Official slipcase comic box sets curated by DC Comics, tie-in prequel novels, and behind-the-scenes literature published alongside the theatrical release.",
  },
  media: {
    kicker: "07",
    title: "Physical Media & Vinyl",
    intro:
      "The Batman 4K Ultra HD Blu-ray steelbooks, collector's gift sets, and Mondo's official 3xLP deluxe gatefold vinyl soundtrack release.",
  },
  posters: {
    kicker: "08",
    title: "Theatrical Posters & Variants",
    intro:
      "Official theatrical one-sheets, character teasers, Dolby Cinema and IMAX exclusive artworks commissioned during the worldwide marketing campaign.",
  },
  prints: {
    kicker: "09",
    title: "Screenprints & Fine Art",
    intro:
      "Officially licensed limited edition screenprints and archival pigment prints produced in partnership with Mondo, Bottleneck Gallery, and renowned poster artists.",
  },
  fashion: {
    kicker: "10",
    title: "Fashion & Jewelry",
    intro:
      "Haute couture collaborations, luxury timepieces, tailored apparel, and bespoke accessories produced with international fashion houses and horology ateliers.",
  },
  lifestyle: {
    kicker: "11",
    title: "Lifestyle Collaborations",
    intro:
      "Grooming collections, luxury fragrances, limited-run consumer goods, and digital lifestyle accessories celebrating the film's iconography.",
  },
  toys: {
    kicker: "12",
    title: "Mass Retail & Apparel",
    intro:
      "Mass retail licensed merchandise including youth roleplay gear, licensed Halloween costumes, and fast-fashion graphic tees.",
  },
  miniatures: {
    kicker: "13",
    title: "Tabletop Miniatures",
    intro:
      "Officially licensed 35mm resin miniatures and tabletop expansion packs produced by Knight Models for the Batman Miniature Game.",
  },
};
