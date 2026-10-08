// Crop bounds and body centres use 1200 × 771 reference coordinates on a shared 500 × 771 display canvas.
export const BODY_TURNTABLE_VIEWS = [
  { id: "front", zh: "正面", en: "Front", cropX: 0, cropWidth: 335, centerX: 170 },
  {
    id: "three-quarter",
    zh: "四分之三",
    en: "Three-quarter",
    cropX: 335,
    cropWidth: 300,
    centerX: 483,
  },
  { id: "side", zh: "侧面", en: "Side", cropX: 635, cropWidth: 205, centerX: 733 },
  { id: "back", zh: "背面", en: "Back", cropX: 840, cropWidth: 360, centerX: 1013 },
].map((view) => ({
  ...view,
  src:
    view.id === "back"
      ? "/media/gear-archive/turntable-cape.jpg"
      : "/media/gear-archive/turntable-armor.jpg",
}));

export const BODY_VIEW_HOTSPOTS: Record<number, Record<string, { x: number; y: number }>> = {
  0: {
    cowl: { x: 50, y: 12.7 },
    "chest-blade": { x: 50, y: 27.8 },
    belt: { x: 50, y: 44.9 },
    "magnetic-charge": { x: 59.2, y: 44.9 },
    "adrenaline-injector": { x: 41, y: 45.8 },
  },
  1: {
    cowl: { x: 46, y: 12 },
    "chest-blade": { x: 47.4, y: 27.2 },
    gauntlet: { x: 72.2, y: 44.6 },
    belt: { x: 46.4, y: 43.7 },
    "throwing-spikes": { x: 71, y: 37.6 },
  },
  2: {
    grapnel: { x: 51, y: 43.6 },
  },
  3: {
    cape: { x: 49.2, y: 27.4 },
    "light-flare": { x: 56.6, y: 43.3 },
    "sticky-bomb-gun": { x: 69.4, y: 58.4 },
  },
};

// Paths share the image's percentage coordinate system; each follows the visible equipment.
export const BODY_VIEW_OUTLINES: Record<number, Record<string, string>> = {
  0: {
    cowl: "M45.1 3.5 L46.4 10 Q50 8.5 54.5 10 L56.2 3.5 L57 14 Q57 18 54 21.8 L52 22.7 L46.5 22.7 Q42.5 20 42.8 15 L43.5 10 Z",
    "chest-blade":
      "M42 25.5 L46 26.4 L48.5 27.3 L50 26.3 L51.5 27.3 L55 26 L58 25.4 L55 28 L52 28.4 L50 29 L48 28.4 L45 28 Z",
    belt: "M46 43 L54.5 43 L54.5 47.3 L46 47.3 Z",
    "magnetic-charge": "M56 42.5 L63 42 L64 46.7 L57 47.4 Z",
    "adrenaline-injector": "M37 43 L44 43.4 L43.8 48.3 L36.7 48 Z",
  },
  1: {
    cowl: "M41.5 3.5 L42.5 9.4 Q46 8.2 49 9.5 L51 3.5 L53 14 Q53.8 18 51.5 20 L48.6 22 L44 21 L41 18.5 L39.8 13 Z",
    "chest-blade":
      "M35.5 25.4 L41 25.2 L45 26.7 L47.5 25.7 L50 26.7 L53.7 24.9 L54.3 24.7 L51.5 28 L48 28.6 L45 28.3 L40 28 Z",
    belt: "M42 42 L50 42 L51 46 L43 46.3 Z",
    gauntlet: "M69.3 34.5 L74.5 34 L76 45.7 L70.4 46.3 L68.3 41 Z",
    "throwing-spikes": "M70.5 35.6 L74.4 35.2 L75.1 42 L71.5 42.6 Z",
  },
  2: {
    grapnel: "M51 39 L58 38 L59 44.5 L56 46 L51 45.5 Z",
  },
  3: {
    cape: "M40 16.5 L60 16.5 L66 18.2 Q73 22 75.5 30 L77.5 82.7 L72 84.2 L71 87.8 Q49 93 31.5 88.6 L31.2 87.3 L22.5 86 L22.2 80 L19.1 79 L22.3 69 L23.8 31 Q25.7 22 40 16.5 Z",
    "light-flare": "M54 39 L58 39 L59.4 47.6 L54 48 Z",
    "sticky-bomb-gun": "M65.3 52.6 L69.6 52.4 L70.5 61.3 L68.3 62.4 L65.5 61.7 L64.5 56 Z",
  },
};
