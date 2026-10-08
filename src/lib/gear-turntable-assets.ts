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
    gauntlet: { x: 29.3, y: 41.9 },
    belt: { x: 46.4, y: 43.7 },
    "throwing-spikes": { x: 74, y: 40 },
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
    cowl: "M45.6 1.8 L46.7 7 L50.9 6 L54.5 6.8 L56.9 2.1 L57.6 13 L55.9 17.7 L54.2 21.3 L52 22.7 L47.2 22.5 L45.6 20.4 L45.1 16.8 L43.7 11.9 Z",
    "chest-blade":
      "M37.6 27 L37.1 27.1 L39.9 24.8 L43.5 23.5 L44.4 24.4 L45.8 25.4 L50.2 25.9 L53.4 25.6 L55.1 24.7 L55.6 23.3 L59.8 24.5 L63.1 26.4 L61.7 26.2 L57.8 25.9 L57.6 27 L56.1 26.3 L52.6 27 L50.5 28.2 L48.1 28.1 L45.3 26.8 L42.1 26.4 L40.9 27.1 L40.3 26.2 Z",
    belt: "M47.5 43 L54.7 43.1 L54.4 47.3 L47 47.1 Z",
    "magnetic-charge": "M57.6 43 L61.3 42.5 L61.9 46.5 L58.2 46.8 Z",
    "adrenaline-injector": "M38.4 42.1 L45.4 42 L44.6 49.1 L36.6 48.3 Z",
  },
  1: {
    cowl: "M41.5 3.5 L43.9 7 L46.1 6.2 L49 6.2 L51.2 6.6 L51.6 2.4 L53.9 9.6 L53.4 15.7 L50.6 18.1 L47.9 19.5 L43.5 19.4 L42.9 18.1 L42 16.6 L40.6 14.4 L39.3 13.1 L39.5 10 L41.3 7.7 Z",
    "chest-blade":
      "M40.2 24.3 L41 25.2 L44.9 25.3 L48.2 24.5 L49.8 24 L50.6 22.8 L56 24.5 L57.5 25.9 L56.1 25.6 L52 25.5 L50.9 26.5 L47.1 26.3 L44.6 27.3 L42.3 27.4 L40.6 26.6 L38.4 26.2 L37.3 27 L37.4 25.8 L35.6 26.4 L40.3 23.3 Z",
    gauntlet: "M30.2 37.8 L32.1 36.7 L34.8 37.4 L30.8 44.9 L30 47 L27.7 46.1 L23.7 46.4 L27.4 36.9 Z",
    belt: "M39.4 41.9 L51.6 42 L51.5 45.4 L39.4 45.8 Z",
    "throwing-spikes": "M76 35.9 L73.3 35.2 L72.3 44.6 L75.3 45.1 Z",
  },
  2: {
    grapnel: "M58.4 33.1 L62.6 33.9 L64.4 35.4 L59 44.5 L57.8 46.8 L51 45.1 L52.4 38.3 L55.4 34.3 Z",
  },
  3: {
    cape: "M44.2 16.3 L55.9 16.2 L60.8 17.8 L67 18 L73.6 21 L76 30.1 L74.5 46.6 L77.5 82.7 L72 84.2 L71 87.8 L49 93 L31.5 88.6 L31.2 87.3 L22.5 86 L22.2 80 L19.1 79 L20.9 69.2 L22.6 45.2 L23.9 40.3 L22.6 36.4 L23.8 31 L25.7 25.8 L30.3 19.5 L34.4 18 L41.3 16.7 Z",
    "light-flare": "M54.4 38.2 L58.4 38.3 L59.4 47.6 L54 48 Z",
    "sticky-bomb-gun":
      "M66.4 53.8 L67.4 51.5 L70.1 51.7 L70.3 48.6 L72 50.9 L71 56.9 L71.1 62.4 L68.3 62.4 L65.5 61.7 L64.5 59.6 L63.8 54 Z",
  },
};
