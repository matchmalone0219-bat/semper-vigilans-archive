import type { LandmarkPlan } from "@/lib/gotham-plan";

export type RoofDetail = {
  polygon: number[][];
  elevation: number;
  height: number;
  color: string;
  profile: "box" | "pyramid" | "gable-x" | "gable-y" | "dome" | "signal";
};

// Decorative forms stay inside the accepted landmark footprint. These are
// schematic silhouettes, shared by the flat plan and the architectural model.
export function landmarkRoofDetails(id: string, model: LandmarkPlan): RoofDetail[] {
  const details: RoofDetail[] = [];
  function add(
    polygon: number[][],
    elevation: number,
    height: number,
    color: string,
    profile: RoofDetail["profile"] = "box",
  ) {
    details.push({
      polygon: polygon.map(([x, y]) => [model.x + x, model.y + y]),
      elevation,
      height,
      color,
      profile,
    });
  }
  function rect(x: number, y: number, w: number, d: number) {
    return [
      [x - w / 2, y - d / 2],
      [x + w / 2, y - d / 2],
      [x + w / 2, y + d / 2],
      [x - w / 2, y + d / 2],
    ];
  }
  function oval(x: number, y: number, rx: number, ry: number) {
    return Array.from({ length: 32 }, (_, i) => [
      x + Math.cos((i / 32) * Math.PI * 2) * rx,
      y + Math.sin((i / 32) * Math.PI * 2) * ry,
    ]);
  }
  if (id === "seawall") {
    const [start, end] = model.parts[0].footprint;
    const angle = Math.atan2(end[1] - start[1], end[0] - start[0]);
    const alongDam = (polygon: number[][]) => polygon.map(([x, y]) => [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle),
    ]);
    add(alongDam(rect(0, 0, 6.3, 0.46)), 0.48, 0.04, "#a4a797");
    for (const y of [-0.24, 0.24])
      add(alongDam(rect(0, y, 6.3, 0.035)), 0.52, 0.09, "#545f5c");
  } else if (id === "arkham" || id === "orphanage") {
    for (const part of model.parts) {
      add(
        part.footprint.map(([x, y]) => [x * 0.94, y * 0.94]),
        part.floors.reduce((sum, floor) => sum + floor.height, 0),
        0.23,
        "#777363",
        Math.max(...part.footprint.map(([x]) => x)) - Math.min(...part.footprint.map(([x]) => x)) >
          Math.max(...part.footprint.map(([, y]) => y)) -
            Math.min(...part.footprint.map(([, y]) => y))
          ? "gable-x"
          : "gable-y",
      );
    }
  } else if (id === "wayne-tower") {
    add(rect(0, 0, 0.88, 0.8), 3.6, 0.3, "#b0aa95", "pyramid");
    for (const x of [-0.76, 0.76])
      for (const y of [-0.68, 0.68]) {
        add(rect(x, y, 0.32, 0.32), 3.15, 0.13, "#8b8879");
        add(rect(x, y, 0.32, 0.32), 3.28, 0.38, "#b0aa95", "pyramid");
      }
  } else if (id === "gsg") {
    add(oval(0, 0, 4.13, 3.75), 0.55, 0.34, "#96988a", "dome");
    add(oval(0, 0, 0.74, 0.67), 0.875, 0.018, "#28383c");
    // Low entrance vestibules remain within the oval base, north and south.
    for (const y of [-3.81, 3.81]) add(rect(0, y, 1.1, 0.22), 0.12, 0.23, "#747a72");
  } else if (id === "city-hall") {
    add(rect(0, 0, 4.6, 2.42), 0.69, 0.25, "#777967", "gable-x");
    add(rect(0, 1.19, 4.85, 0.48), 0.63, 0.22, "#b4ad95", "gable-y");
    for (const x of [-2.02, 2.02]) add(rect(x, 0, 0.27, 0.34), 0.84, 0.15, "#9a9683");
  } else if (id === "gcpd") {
    add(rect(-0.57, -0.22, 0.78, 0.63), 1.45, 0.18, "#858980");
    add(rect(0.49, 0.15, 0.6, 0.46), 1.45, 0.31, "#969c8b", "signal");
    for (const x of [-0.48, 0.04]) add(rect(x, 0.52, 0.28, 0.2), 1.39, 0.1, "#585f59");
  } else if (id === "iceberg") {
    add(rect(0.18, -0.1, 1.08, 0.8), 1.1, 0.18, "#7d7461");
    add(rect(-0.67, -0.38, 0.23, 0.23), 1, 0.2, "#585449");
    add(rect(0, 0.74, 1.32, 0.18), 0.22, 0.055, "#9c927a");
  } else if (id === "riddler-room") {
    add(rect(-0.3, -0.38, 0.17, 0.17), 0.71, 0.22, "#8a7863");
    add(rect(0.2, -0.15, 0.23, 0.32), 0.8, 0.055, "#39484a");
  } else {
    // Follow the irregular source roofs with small equipment placed in their
    // interiors, rather than replacing the street/district with a new tower.
    model.parts.forEach((part, index) => {
      const poly = part.footprint;
      const xs = poly.map((p) => p[0]),
        ys = poly.map((p) => p[1]);
      const minX = Math.min(...xs),
        maxX = Math.max(...xs),
        minY = Math.min(...ys),
        maxY = Math.max(...ys);
      function inside(x: number, y: number) {
        let result = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const a = poly[i],
            b = poly[j];
          if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0])
            result = !result;
        }
        return result;
      }
      const size = Math.min(maxX - minX, maxY - minY) * 0.15;
      for (let row = 1; row < 8; row++)
        for (let col = 1; col < 8; col++) {
          const x = minX + ((maxX - minX) * col) / 8,
            y = minY + ((maxY - minY) * row) / 8;
          const polygon = rect(x, y, size, size);
          if (!polygon.every(([px, py]) => inside(px, py))) continue;
          add(
            polygon,
            part.floors.reduce((sum, f) => sum + f.height, 0),
            0.04 + index * 0.015,
            id === "park-row" ? "#7c7769" : "#8a806d",
          );
          return;
        }
    });
  }
  return details;
}
