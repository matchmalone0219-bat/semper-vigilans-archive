import LANDMARK_DATA from "@/data/gotham-landmarks.json";
import { landmarkRoofDetails } from "@/lib/gotham-roof-details";

export type PlanFloor = { scale: number; height: number };
export type LandmarkPlan = {
  x: number;
  y: number;
  region: string;
  footprint: number[][];
  siteScale: number;
  roadScale: number;
  parts: { footprint: number[][]; floors: PlanFloor[] }[];
  adjustPlan: boolean;
  evidence: string;
};
type LandmarkModel = Omit<LandmarkPlan, "x" | "y"> & { x: number | null; y: number | null };
export const LANDMARK_MODELS: Record<string, LandmarkModel> = LANDMARK_DATA;
export const LANDMARKS: Record<string, LandmarkPlan> = Object.fromEntries(
  Object.entries(LANDMARK_MODELS).filter(
    (entry): entry is [string, LandmarkPlan] =>
      entry[1].region === "downtown" && entry[1].x !== null && entry[1].y !== null,
  ),
);

export function planPolygon(model: LandmarkPlan, scale = 1, footprint = model.footprint) {
  return footprint.map(([x, y]) => [model.x + x * scale, model.y + y * scale]);
}

export function planFloors(model: LandmarkPlan) {
  return model.parts.flatMap((part) =>
    part.floors.map((floor, index) => ({
      polygon: planPolygon(model, floor.scale, part.footprint),
      height: floor.height,
      elevation: part.floors.slice(0, index).reduce((total, item) => total + item.height, 0),
      color: index === 0 ? "#51544e" : "#696c63",
    })),
  );
}

export function planSurfaces(id: string, model: LandmarkPlan) {
  return [...planFloors(model), ...landmarkRoofDetails(id, model)].sort(
    (a, b) => a.elevation + a.height - b.elevation - b.height,
  );
}

export function drawLandmarkPlans(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  plans: Record<string, LandmarkPlan> = LANDMARKS,
) {
  function polygon(
    points: number[][],
    fill: string | null,
    stroke: string | null,
    lineWidth: number,
  ) {
    context.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) context.moveTo((x / 100) * width, (y / 100) * height);
      else context.lineTo((x / 100) * width, (y / 100) * height);
    });
    context.closePath();
    if (fill) {
      context.fillStyle = fill;
      context.fill();
    }
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = (lineWidth * width) / 100;
      context.stroke();
    }
  }
  for (const model of Object.values(plans))
    if (model.adjustPlan) polygon(planPolygon(model, model.siteScale), "#292b2c", null, 0);
  for (const model of Object.values(plans))
    if (model.adjustPlan) polygon(planPolygon(model, model.roadScale), null, "#9c9c94", 0.13);
  for (const [id, model] of Object.entries(plans)) {
    context.setLineDash(model.evidence === "theory" ? [width * 0.001, width * 0.001] : []);
    for (const surface of planSurfaces(id, model))
      polygon(surface.polygon, surface.color, "#babbb0", "profile" in surface ? 0.04 : 0.07);
  }
  context.setLineDash([]);
}
