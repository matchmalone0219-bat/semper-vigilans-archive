import regions from "@/data/gct-regions.json";
import geometry from "@/data/gct-buildings.json";
import { LANDMARK_MODELS, drawLandmarkPlans, type LandmarkPlan } from "@/lib/gotham-plan";

export type GCTRegionId = keyof typeof regions.regions;
export const GCT_BUILDINGS = geometry.regions;
export function gctPoint(regionId: GCTRegionId, [x, y]: number[]) {
  const [left, top, width, height] = regions.regions[regionId].frame;
  return [((x - left) / width) * 100, ((y - top) / height) * 100];
}
const [wx, wy] = gctPoint("midtown", geometry.regions.midtown.landmarkCenter);
const [ax, ay] = gctPoint("uptown", geometry.regions.uptown.landmarkCenter);
const [ox, oy] = gctPoint("uptown", geometry.regions.uptown.orphanageCenter);
export const GCT_LANDMARKS: Record<GCTRegionId, Record<string, LandmarkPlan>> = {
  downtown: Object.fromEntries(Object.entries(geometry.regions.downtown.landmarkCenters).map(([id, center]) => {
    const [x, y] = gctPoint("downtown", center);
    return [id, { ...LANDMARK_MODELS[id], x, y }];
  })),
  midtown: {
    "wayne-tower": {
      ...LANDMARK_MODELS["wayne-tower"],
      x: wx,
      y: wy,
      evidence: "theory",
    },
  },
  uptown: {
    orphanage: {
      region: "uptown",
      x: ox,
      y: oy,
      footprint: geometry.regions.uptown.orphanageSite.map((point) => {
        const [x, y] = gctPoint("uptown", point);
        return [x - ox, y - oy];
      }),
      siteScale: 1,
      roadScale: 1,
      adjustPlan: false,
      evidence: "theory",
      parts: geometry.regions.uptown.orphanageParts.map((polygon, index) => ({
        footprint: polygon.map((point) => {
          const [x, y] = gctPoint("uptown", point);
          return [x - ox, y - oy];
        }),
        floors: [
          { scale: 1, height: 0.14 },
          { scale: 0.97, height: index === 0 ? 0.6 : 0.4 },
          { scale: 0.9, height: 0.12 },
        ],
      })),
    },
    arkham: {
      region: "uptown",
      x: ax,
      y: ay,
      footprint: geometry.regions.uptown.sitePolygon.map((point) => {
        const [x, y] = gctPoint("uptown", point);
        return [x - ax, y - ay];
      }),
      siteScale: 1,
      roadScale: 1,
      adjustPlan: false,
      evidence: "theory",
      parts: geometry.regions.uptown.hospitalParts.map((polygon, index) => ({
        footprint: polygon.map((point) => {
          const [x, y] = gctPoint("uptown", point);
          return [x - ax, y - ay];
        }),
        floors: [
          { scale: 1, height: 0.15 },
          { scale: 0.94, height: index === 4 ? 1.15 : 0.7 },
        ],
      })),
    },
  },
};

export function gctModelGeometry(regionId: GCTRegionId) {
  return {
    aspect: regions.regions[regionId].frame[3] / regions.regions[regionId].frame[2],
    islands: regions.regions[regionId].land.map((polygon) => ({
      outline: polygon.map((point) => gctPoint(regionId, point)),
      holes: [],
    })),
    footprints: geometry.regions[regionId].buildings.map((building) => ({
      ...building,
      polygon: building.polygon.map((point) => gctPoint(regionId, point)),
    })),
  };
}

// Canvas textures use the exact SVG plan polygons, including the same roads
// and site clearances. Building height is illustrative in both views.
export function drawGCTGround(
  ctx: CanvasRenderingContext2D,
  regionId: GCTRegionId,
  transit: boolean,
) {
  const region = regions.regions[regionId];
  const model = geometry.regions[regionId];
  const width = ctx.canvas.width,
    height = ctx.canvas.height;
  function path(polygon: number[][], fill: string, holes: number[][][] = []) {
    ctx.beginPath();
    for (const ring of [polygon, ...holes]) {
      ring.forEach((point, index) => {
        const [x, y] = gctPoint(regionId, point);
        if (index) ctx.lineTo((x * width) / 100, (y * height) / 100);
        else ctx.moveTo((x * width) / 100, (y * height) / 100);
      });
      ctx.closePath();
    }
    ctx.fillStyle = fill;
    ctx.fill("evenodd");
  }
  ctx.fillStyle = "#11191e";
  ctx.fillRect(0, 0, width, height);
  region.land.forEach((polygon) => path(polygon, "#303436"));
  region.features.forEach((feature) =>
    path(feature.polygon, feature.kind === "inferred-campus" ? "#4e4840" : "#43513e"),
  );
  model.roads.forEach((road) => path(road.polygon, "#76766c", road.holes));
  model.buildings.forEach((building) => path(building.polygon, "#727469"));
  drawLandmarkPlans(ctx, width, height, GCT_LANDMARKS[regionId]);
  if (transit) {
    for (const route of region.routes) {
      ctx.beginPath();
      route.points.forEach((point, index) => {
        const [x, y] = gctPoint(regionId, point);
        if (index) ctx.lineTo((x * width) / 100, (y * height) / 100);
        else ctx.moveTo((x * width) / 100, (y * height) / 100);
      });
      ctx.strokeStyle = regions.lines[route.line as keyof typeof regions.lines].color;
      ctx.lineWidth = width * 0.0038;
      ctx.setLineDash(route.closed ? [4, 5] : []);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
}
