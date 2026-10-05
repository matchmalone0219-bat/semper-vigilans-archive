import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const data = JSON.parse(await readFile(new URL("src/data/gct-regions.json", root)));
const inside = ([x, y], polygon) => {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) result = !result;
  }
  return result;
};

test("GCT reconstructions preserve the supplied photograph and its regional layout", async () => {
  const photo = await readFile(new URL(`public${data.source.image}`, root));
  assert.equal(createHash("sha256").update(photo).digest("hex"), data.source.sha256);
  assert.deepEqual(data.source.rectifiedSize, [900, 1360]);
  assert.equal(data.regions.uptown.stations.length, 26);
  assert.equal(data.regions.midtown.stations.length, 24);
  assert.equal(data.regions.downtown.stations.length, 28);
  const ids = new Set();
  for (const region of Object.values(data.regions)) {
    for (const station of region.stations) {
      assert.ok(!ids.has(station.id), "station ids are unique across both maps");
      ids.add(station.id);
      assert.ok(station.nameZh && station.nameEn && station.noteZh && station.noteEn);
      assert.ok(
        station.external || region.land.some((polygon) => inside(station.point, polygon)),
        `${station.id} lies on its borough's land`,
      );
      assert.ok(
        station.lines.every((id) => data.lines[id]),
        "line badges reference actual routes",
      );
    }
    for (const feature of region.features) {
      assert.ok(
        feature.polygon.every((point) => region.land.some((polygon) => inside(point, polygon))),
        `${feature.id} remains inside the coastline`,
      );
    }
  }
  const all = Object.values(data.regions).flatMap((region) => region.stations);
  assert.equal(
    all.filter((station) => station.uncertain).length,
    3,
    "preserve blurred labels as provisional readings",
  );
  assert.equal(
    all.filter((station) => station.kind === "parking").length,
    1,
    "parking is distinct from a rail station",
  );
});

test("Robinson Park, Arkham grounds and the closed Wayne Tower station retain distinct evidence", () => {
  const park = data.regions.midtown.features.find((feature) => feature.id === "robinson-park-land");
  assert.equal(park.kind, "park");
  const hospital = data.regions.uptown.features.find((feature) => feature.id === "arkham-grounds");
  assert.equal(hospital.kind, "inferred-campus");
  const arkham = data.regions.uptown.stations.find((station) => station.id === "arkham");
  assert.ok(
    hospital.polygon.every(([x]) => x < arkham.point[0]),
    "grounds are west of Arkham station",
  );
  const wayne = data.regions.midtown.stations.find((station) => station.id === "wayne-tower");
  const robinson = data.regions.midtown.stations.find((station) => station.id === "robinson-park");
  assert.ok(wayne.point[0] > robinson.point[0] && wayne.point[1] > robinson.point[1]);
  assert.equal(wayne.closed, true);
  assert.equal(wayne.archive, "wayne-tower");
  const closed = data.regions.midtown.routes.find((route) => route.closed);
  const diamond = data.regions.midtown.stations.find(
    (station) => station.id === "diamond-district",
  );
  assert.deepEqual(closed.points[0], diamond.point);
  assert.deepEqual(closed.points.at(-1), wayne.point);
  assert.equal(
    data.regions.uptown.stations.filter((station) => station.nameEn === "Gotham Heights").length,
    2,
    "retain both same-name stations",
  );
});

test("urban footprints follow street parcels and keep parks and landmark sites clear", async () => {
  const bytes = await readFile(new URL("src/data/gct-buildings.json", root));
  const buildings = JSON.parse(bytes);
  const sha = (value) => createHash("sha256").update(value).digest("hex");
  assert.equal(
    buildings.sourceSha256,
    sha(await readFile(new URL("src/data/gct-regions.json", root))),
  );
  assert.equal(
    buildings.generatorSha256,
    sha(await readFile(new URL("scripts/build-gct-basemaps.py", root))),
  );
  assert.equal(buildings.landmarkSha256, sha(await readFile(new URL("src/data/gotham-landmarks.json", root))));
  for (const [id, geometry] of Object.entries(buildings.regions)) {
    const region = data.regions[id];
    assert.ok(geometry.buildings.length > 500);
    assert.ok(geometry.roads.length);
    assert.ok(new Set(geometry.buildings.map((building) => building.height)).size > 20);
    assert.equal(new Set(geometry.buildings.map((building) => building.roof)).size, 4);
    for (const building of geometry.buildings) {
      assert.ok(building.height > 0 && building.polygon.length >= 3);
      assert.ok(
        building.polygon.every((point) => region.land.some((polygon) => inside(point, polygon))),
        `${building.id} stays on land`,
      );
      assert.ok(
        building.polygon.every(
          (point) => !region.features.some((feature) => feature.kind !== "residential-estate" && inside(point, feature.polygon)),
        ),
        `${building.id} leaves green space and hospital grounds clear`,
      );
      assert.ok(
        building.polygon.every((point) => !(geometry.sitePolygons ?? [geometry.sitePolygon]).some((site) => inside(point, site))),
        `${building.id} leaves the landmark's site clear`,
      );
    }
  }
  assert.ok(
    buildings.regions.uptown.hospitalParts.length > 3,
    "hospital complex has separate wings and a courtyard",
  );
});

test("Gotham Heights has spacious low-rise estates and the former Wayne Manor", async () => {
  const region = data.regions.uptown;
  const geometry = JSON.parse(await readFile(new URL("src/data/gct-buildings.json", root))).regions.uptown;
  const district = region.features.find((feature) => feature.id === "gotham-heights-estates");
  const area = (polygon) => Math.abs(polygon.reduce((sum, [x, y], i) => {
    const [nx, ny] = polygon[(i + 1) % polygon.length];
    return sum + x * ny - nx * y;
  }, 0)) / 2;
  const homes = geometry.buildings.filter((building) => building.polygon.some((point) => inside(point, district.polygon)));
  assert.ok(homes.length >= 5 && homes.length <= 15, "estate district has detached homes with open grounds");
  assert.ok(homes.every((home) => home.height <= 0.25));
  assert.ok(homes.reduce((sum, home) => sum + area(home.polygon), 0) / area(district.polygon) < 0.12, "homes occupy a small share of the residential green space");
  assert.ok(geometry.orphanageSite.every((point) => inside(point, district.polygon)));
  assert.ok(inside(geometry.orphanageCenter, geometry.orphanageSite));
  assert.ok(geometry.orphanageCenter[1] < region.stations.find((station) => station.id === "gotham-heights-west").point[1], "former manor lies north of the west station");
  assert.ok(geometry.orphanageParts.length >= 3);
  assert.equal(region.stations.find((station) => station.id === "gotham-heights-west").archive, "orphanage");
  assert.equal(region.stations.find((station) => station.id === "arkham").nameZh, "阿卡姆州立医院/疯人院");
});

test("Downtown retains its eight landmarks and five transit lines without a Wayne Tower pin", async () => {
  const geometry = JSON.parse(await readFile(new URL("src/data/gct-buildings.json", root))).regions.downtown;
  assert.deepEqual(Object.keys(geometry.landmarkCenters).sort(), ["gsg", "city-hall", "park-row", "gcpd", "iceberg", "riddler-room", "crown-point", "seawall"].sort());
  assert.equal(geometry.sitePolygons.length, 8);
  const region = data.regions.downtown;
  assert.deepEqual([...new Set(region.routes.map((route) => route.line))].sort(), ["red", "orange", "green", "blue", "gold"].sort());
  assert.ok(region.stations.some((station) => station.id === "clocktower"));
  assert.ok(!region.stations.some((station) => station.id === "wayne-tower"));
  const closed = region.routes.find((route) => route.closed);
  assert.deepEqual(closed.points[0], region.stations.find((station) => station.id === "theater-row").point);
  assert.deepEqual(closed.points.at(-1), region.stations.find((station) => station.id === "battergate").point);
  const source = region.settingSource;
  assert.equal(createHash("sha256").update(await readFile(new URL(`public${source.image}`, root))).digest("hex"), source.sha256);
  assert.equal(region.land.length, 2, "core and harbor share a single Downtown view across the river");
  assert.ok(inside(geometry.landmarkCenters["crown-point"], region.land[1]), "Crown Point retains the user-confirmed Tricorner site within Downtown");
  assert.deepEqual(Object.keys(data.regions).sort(), ["uptown", "midtown", "downtown"].sort());
});

test("Hinckley River remains open through the production map's bend", async () => {
  const region = data.regions.downtown;
  const geometry = JSON.parse(await readFile(new URL("src/data/gct-buildings.json", root))).regions.downtown;
  const [a, b, c, d, e, f] = region.settingSource.transform;
  for (const [x, y] of [[430, 613], [510, 578], [550, 541], [570, 507], [610, 520], [660, 540], [715, 562]]) {
    const point = [a * x + b * y + c, d * x + e * y + f];
    assert.ok(!region.land.some((polygon) => inside(point, polygon)), "river reference samples stay in water");
    assert.ok(!geometry.buildings.some((building) => inside(point, building.polygon)), "river is clear of buildings");
  }
  for (const [index, polygon] of region.land.entries()) {
    assert.ok(polygon.every((point) => !inside(point, region.land[1 - index])), "opposing riverbanks do not overlap");
  }
});


test("seawall protects the southeastern Crown Point coast with a long, low dam", async () => {
  const region = data.regions.downtown;
  const geometry = JSON.parse(await readFile(new URL("src/data/gct-buildings.json", root))).regions.downtown;
  const plans = JSON.parse(await readFile(new URL("src/data/gotham-landmarks.json", root)));
  const center = geometry.landmarkCenters.seawall;
  const crown = geometry.landmarkCenters["crown-point"];
  assert.ok(center[0] > crown[0] && center[1] > crown[1], "dam is southeast of Crown Point");
  assert.ok(inside(center, region.land[1]), "dam belongs to the Tricorner coast");
  const distance = Math.min(...region.land[1].map(([x, y], i, coast) => {
    const [nx, ny] = coast[(i + 1) % coast.length];
    const dx = nx - x, dy = ny - y;
    const t = Math.max(0, Math.min(1, ((center[0] - x) * dx + (center[1] - y) * dy) / (dx * dx + dy * dy)));
    return Math.hypot(center[0] - x - t * dx, center[1] - y - t * dy);
  }));
  assert.ok(distance < 5, "dam follows the sea edge rather than an inland block");
  const base = plans.seawall.parts[0].footprint;
  const edge = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  assert.ok(edge(base[0], base[1]) / edge(base[1], base[2]) > 5, "long continuous seawall foundation");
  assert.ok(plans.seawall.parts.every((part) => part.floors.reduce((height, floor) => height + floor.height, 0) < 0.7), "dam stays low rather than forming another tower");
});
