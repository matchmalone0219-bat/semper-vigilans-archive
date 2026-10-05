import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const bytes = (path) => readFile(new URL(path, root));
const hash = (value) => createHash("sha256").update(value).digest("hex");

test("all nine architectural templates survive the shared GCT redraw", async () => {
  const [planBytes, reference, supplied] = await Promise.all([
    bytes("src/data/gotham-landmarks.json"),
    bytes("public/media/maps/gct-citypass-reference.jpeg"),
    bytes("../C9D0E694-4E8A-43AA-B3DE-EF600403F870.jpeg").catch(() => null),
  ]);
  const plans = JSON.parse(planBytes);
  assert.deepEqual(
    Object.keys(plans).sort(),
    [
      "wayne-tower",
      "gsg",
      "city-hall",
      "gcpd",
      "iceberg",
      "riddler-room",
      "park-row",
      "crown-point",
      "seawall",
    ].sort(),
  );
  for (const [id, plan] of Object.entries(plans)) {
    assert.ok(plan.parts.length, `${id} retains a model`);
    assert.ok(
      plan.parts.every(
        (part) =>
          part.footprint.length >= 3 &&
          part.floors.length &&
          part.floors.every((floor) => floor.height > 0),
      ),
    );
  }
  assert.equal(plans["wayne-tower"].region, "midtown");
  assert.equal(plans["wayne-tower"].x, null, "do not reuse the old Downtown pin");
  assert.equal(
    plans["wayne-tower"].y,
    null,
    "no building footprint is inferred from a station label",
  );
  assert.equal(Object.values(plans).filter((plan) => plan.region === "downtown").length, 8);
  assert.equal(plans.gcpd.evidence, "theory", "retain the existing location uncertainty");
  assert.equal(plans["park-row"].adjustPlan, false, "street follows existing outlines");
  assert.equal(plans["crown-point"].adjustPlan, false, "district follows existing outlines");
  if (supplied) assert.equal(hash(reference), hash(supplied), "keep the supplied photo intact");
});
