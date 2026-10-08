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
