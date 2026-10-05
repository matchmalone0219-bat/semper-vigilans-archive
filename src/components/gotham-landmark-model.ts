import * as THREE from "three";
import { planFloors, type LandmarkPlan } from "@/lib/gotham-plan";
import { landmarkRoofDetails, type RoofDetail } from "@/lib/gotham-roof-details";

type Extrude = (points: number[][], height: number) => THREE.BufferGeometry;
type WorldPoint = (x: number, y: number, height: number) => THREE.Vector3;

const PALETTES: Record<string, [string, string, string]> = {
  seawall: ["#777e76", "#303b3a", "#a4a797"],
  orphanage: ["#82765f", "#303735", "#b1a28a"],
  arkham: ["#827e6d", "#303b36", "#aaa088"],
  "wayne-tower": ["#74766b", "#252e30", "#aaa58f"],
  gsg: ["#707970", "#263337", "#a3a68e"],
  "city-hall": ["#908c77", "#323935", "#bbb39b"],
  gcpd: ["#687069", "#2b3638", "#979b87"],
  iceberg: ["#736451", "#273534", "#a19477"],
  "riddler-room": ["#726858", "#263035", "#9b917c"],
  "park-row": ["#756d5c", "#303735", "#a69b84"],
  "crown-point": ["#706857", "#303b3a", "#968d78"],
};

function facadeTexture(id: string) {
  const [wall, window, trim] = PALETTES[id];
  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = wall;
  ctx.fillRect(0, 0, 96, 128);
  ctx.fillStyle = trim;
  ctx.fillRect(0, 0, 8, 128);
  ctx.fillRect(88, 0, 8, 128);
  ctx.fillRect(0, 118, 96, 5);
  if (["iceberg", "riddler-room", "park-row", "crown-point"].includes(id)) {
    ctx.strokeStyle = "#4d4b41";
    ctx.lineWidth = 1;
    for (let row = 0; row < 8; row++) {
      ctx.beginPath();
      ctx.moveTo(8, row * 16);
      ctx.lineTo(88, row * 16);
      for (let x = 8 + (row % 2) * 20; x < 88; x += 40) {
        ctx.moveTo(x, row * 16);
        ctx.lineTo(x, row * 16 + 16);
      }
      ctx.stroke();
    }
  }
  for (const x of [19, 54]) {
    ctx.fillStyle = "#4b5149";
    ctx.fillRect(x - 3, 17, 29, 89);
    ctx.fillStyle = window;
    if (id === "wayne-tower" || id === "city-hall" || id === "arkham" || id === "orphanage") {
      ctx.beginPath();
      ctx.moveTo(x, 98);
      ctx.lineTo(x, 36);
      ctx.quadraticCurveTo(x + 11, 8, x + 23, 36);
      ctx.lineTo(x + 23, 98);
      ctx.closePath();
      ctx.fill();
    } else ctx.fillRect(x, 26, 23, 72);
    ctx.fillStyle = trim;
    ctx.fillRect(x, 99, 23, 4);
    ctx.fillRect(x + 10, 30, 2, 67);
    ctx.fillRect(x, 65, 23, 3);
    ctx.fillStyle = "#657067";
    ctx.fillRect(x + 3, 37, 5, 20);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

// Surface detail changes the architecture, while all geometry remains in the
// same normalized plan frame used by the basemap and landmark markers.
export function createLandmarkModel(
  id: string,
  model: LandmarkPlan,
  extrude: Extrude,
  position: WorldPoint,
) {
  const group = new THREE.Group();
  const meshes: THREE.Mesh[] = [];
  const texture = id === "seawall" ? null : facadeTexture(id);
  const [, , trimColor] = PALETTES[id];
  const wall = new THREE.MeshStandardMaterial({
    ...(texture ? { map: texture } : { color: PALETTES[id][0] }),
    roughness: 0.95,
  });
  const stone = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.9 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x3b4846, roughness: 0.6, metalness: 0.3 });
  let top = 0;
  function addMesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material | THREE.Material[],
    elevation = 0,
  ) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.placeId = id;
    mesh.position.y = elevation;
    group.add(mesh);
    meshes.push(mesh);
    return mesh;
  }
  function box(
    x: number,
    y: number,
    w: number,
    d: number,
    elevation: number,
    height: number,
    material: THREE.Material = stone,
  ) {
    const polygon = [
      [model.x + x - w / 2, model.y + y - d / 2],
      [model.x + x + w / 2, model.y + y - d / 2],
      [model.x + x + w / 2, model.y + y + d / 2],
      [model.x + x - w / 2, model.y + y + d / 2],
    ];
    const geometry = extrude(polygon, height);
    geometry.rotateX(-Math.PI / 2);
    return addMesh(geometry, material, elevation);
  }
  function edge(geometry: THREE.BufferGeometry, elevation: number, color = 0xaca38d) {
    const line = new THREE.LineSegments(
      new THREE.EdgesGeometry(geometry, 25),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }),
    );
    line.position.y = elevation;
    group.add(line);
  }
  for (const floor of planFloors(model)) {
    const geometry = extrude(floor.polygon, floor.height);
    const vertices = geometry.getAttribute("position"),
      uv = geometry.getAttribute("uv");
    const pitch = id === "wayne-tower" ? 0.14 : id === "city-hall" ? 0.19 : 0.12;
    for (let i = 0; i < vertices.count; i++)
      uv.setXY(
        i,
        (vertices.getX(i) + vertices.getY(i)) / pitch,
        vertices.getZ(i) / (id === "wayne-tower" ? 0.2 : 0.22),
      );
    geometry.rotateX(-Math.PI / 2);
    const cap = new THREE.MeshStandardMaterial({ color: floor.color, roughness: 0.9 });
    addMesh(geometry, [cap, floor.height < 0.15 ? stone : wall], floor.elevation);
    edge(geometry, floor.elevation);
    top = Math.max(top, floor.elevation + floor.height);
  }
  function sculptedRoof(detail: RoofDetail) {
    const xs = detail.polygon.map((p) => p[0]),
      ys = detail.polygon.map((p) => p[1]);
    const x0 = Math.min(...xs),
      x1 = Math.max(...xs),
      y0 = Math.min(...ys),
      y1 = Math.max(...ys);
    const cx = (x0 + x1) / 2,
      cy = (y0 + y1) / 2;
    const corners = detail.polygon.map(([x, y]) => position(x, y, 0));
    const coords: number[] = [];
    function triangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
      coords.push(...a.toArray(), ...b.toArray(), ...c.toArray());
    }
    if (detail.profile === "pyramid") {
      const peak = position(cx, cy, detail.height);
      corners.forEach((point, i) => triangle(point, corners[(i + 1) % corners.length], peak));
    } else if (detail.profile === "gable-x" || detail.profile === "gable-y") {
      const a = position(x0, y0, 0),
        b = position(x1, y0, 0),
        c = position(x1, y1, 0),
        d = position(x0, y1, 0);
      const alongX = detail.profile === "gable-x";
      const left = position(alongX ? x0 : cx, alongX ? cy : y0, detail.height),
        right = position(alongX ? x1 : cx, alongX ? cy : y1, detail.height);
      if (alongX) {
        triangle(a, b, right);
        triangle(a, right, left);
        triangle(d, left, right);
        triangle(d, right, c);
        triangle(a, left, d);
        triangle(b, c, right);
      } else {
        triangle(a, left, right);
        triangle(a, right, d);
        triangle(b, c, right);
        triangle(b, right, left);
        triangle(a, b, left);
        triangle(d, right, c);
      }
    } else {
      // Low elliptical roof with a smooth crown and twenty visible radial ribs.
      const point = (theta: number, phi: number) =>
        position(
          cx + ((x1 - x0) / 2) * Math.cos(theta) * Math.cos(phi),
          cy + ((y1 - y0) / 2) * Math.sin(theta) * Math.cos(phi),
          detail.height * Math.sin(phi),
        );
      for (let ring = 0; ring < 12; ring++)
        for (let slice = 0; slice < 48; slice++) {
          const a = point((slice / 48) * Math.PI * 2, ((ring / 12) * Math.PI) / 2),
            b = point(((slice + 1) / 48) * Math.PI * 2, ((ring / 12) * Math.PI) / 2),
            c = point(((slice + 1) / 48) * Math.PI * 2, (((ring + 1) / 12) * Math.PI) / 2),
            d = point((slice / 48) * Math.PI * 2, (((ring + 1) / 12) * Math.PI) / 2);
          triangle(a, b, d);
          triangle(b, c, d);
        }
      for (let rib = 0; rib < 20; rib++) {
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(
            Array.from({ length: 25 }, (_, i) =>
              point((rib / 20) * Math.PI * 2, ((i / 24) * Math.PI) / 2),
            ),
          ),
          new THREE.LineBasicMaterial({ color: 0xb9b6a0 }),
        );
        line.position.y = detail.elevation + 0.003;
        group.add(line);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3));
    geometry.computeVertexNormals();
    return geometry;
  }
  for (const detail of landmarkRoofDetails(id, model)) {
    const material = new THREE.MeshStandardMaterial({
      color: detail.color,
      roughness: 0.85,
      side: THREE.DoubleSide,
    });
    if (detail.profile === "signal") {
      const xs = detail.polygon.map((p) => p[0]),
        ys = detail.polygon.map((p) => p[1]);
      const center = position(
        (Math.min(...xs) + Math.max(...xs)) / 2,
        (Math.min(...ys) + Math.max(...ys)) / 2,
        detail.elevation,
      );
      const support = addMesh(new THREE.CylinderGeometry(0.027, 0.04, 0.13, 12), metal);
      support.position.copy(center).y += 0.065;
      const bowl = addMesh(new THREE.CylinderGeometry(0.11, 0.052, 0.11, 24, 1, true), material);
      bowl.position.copy(center).y += 0.2;
      bowl.rotation.z = -0.65;
      const glass = addMesh(
        new THREE.CircleGeometry(0.104, 24),
        new THREE.MeshStandardMaterial({
          color: 0xbbb49b,
          roughness: 0.45,
          side: THREE.DoubleSide,
        }),
      );
      const normal = new THREE.Vector3(0, 1, 0).applyQuaternion(bowl.quaternion);
      glass.position.copy(bowl.position).addScaledVector(normal, 0.056);
      glass.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      // Dark bat-shaped mask on the unlit lens; no sky beam is added.
      const bat = new THREE.Shape();
      bat.moveTo(-0.065, 0);
      bat.lineTo(-0.04, 0.021);
      bat.lineTo(-0.013, 0.008);
      bat.lineTo(-0.008, 0.027);
      bat.lineTo(0, 0.012);
      bat.lineTo(0.008, 0.027);
      bat.lineTo(0.013, 0.008);
      bat.lineTo(0.04, 0.021);
      bat.lineTo(0.065, 0);
      bat.lineTo(0.022, -0.019);
      bat.lineTo(0, -0.03);
      bat.lineTo(-0.022, -0.019);
      bat.closePath();
      const mask = addMesh(new THREE.ShapeGeometry(bat), metal);
      mask.position.copy(glass.position).addScaledVector(normal, 0.002);
      mask.quaternion.copy(glass.quaternion);
    } else {
      const geometry =
        detail.profile === "box" ? extrude(detail.polygon, detail.height) : sculptedRoof(detail);
      if (detail.profile === "box") geometry.rotateX(-Math.PI / 2);
      addMesh(geometry, material, detail.elevation);
      if (detail.profile !== "dome") edge(geometry, detail.elevation);
    }
    top = Math.max(top, detail.elevation + detail.height);
  }
  if (id === "wayne-tower") {
    for (const x of [-1.42, 1.42]) for (const y of [-1.28, 1.28]) box(x, y, 0.15, 0.15, 0.35, 2.15);
    // Two strong vertical mullions per face read clearly when zoomed in.
    for (const x of [-0.53, 0.53])
      for (const y of [-1.34, 1.34]) box(x, y, 0.055, 0.065, 0.4, 2.05);
  } else if (id === "city-hall") {
    for (let i = 0; i < 8; i++) {
      const point = position(model.x - 2.12 + (i * 4.24) / 7, model.y + 1.33, 0.14 + 0.49 / 2);
      const column = addMesh(new THREE.CylinderGeometry(0.017, 0.021, 0.49, 12), stone);
      column.position.copy(point);
      box(-2.12 + (i * 4.24) / 7, 1.33, 0.24, 0.23, 0.14, 0.035);
      box(-2.12 + (i * 4.24) / 7, 1.33, 0.24, 0.23, 0.6, 0.03);
    }
  } else if (id === "iceberg") {
    const door = addMesh(new THREE.BoxGeometry(0.15, 0.16, 0.013), metal);
    door.position.copy(position(model.x, model.y + 0.794, 0.18));
    for (const x of [-0.63, 0.63]) box(x, 0.795, 0.09, 0.12, 0.1, 0.19);
  } else if (id === "riddler-room") {
    for (let i = 0; i < 3; i++) {
      const y = 0.2 + i * 0.18;
      box(0.34, 0.625, 0.26, 0.08, y, 0.014, metal);
      box(0.23, 0.645, 0.014, 0.018, y, 0.08, metal);
      box(0.45, 0.645, 0.014, 0.018, y, 0.08, metal);
      const stair = addMesh(new THREE.BoxGeometry(0.01, 0.22, 0.012), metal);
      stair.position.copy(position(model.x + 0.34, model.y + 0.635, y + 0.085));
      stair.rotation.z = 0.5;
    }
  }
  group.userData.placeId = id;
  // Materials shared by decorative meshes are disposed by the scene owner.
  // Return this texture separately because disposing a material doesn't free it.
  return { group, meshes, height: top, texture };
}
