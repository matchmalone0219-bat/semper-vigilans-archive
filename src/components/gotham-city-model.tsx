import { useEffect, useRef } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DOWNTOWN_MODEL } from "@/data/gotham-model";
import { createLandmarkModel } from "@/components/gotham-landmark-model";
import GCT_DATA from "@/data/gct-regions.json";
import { GCT_LANDMARKS, gctPoint, gctModelGeometry, drawGCTGround } from "@/lib/gct-building-plan";

export type ModelMarker = { placeId: string; x: number; y: number; name: string };
type Props = {
  markers: readonly ModelMarker[];
  regionId?: "downtown" | "uptown" | "midtown";
  transit?: boolean;
  selectedId: string | null;
  flood: boolean;
  floodPoints: readonly { x: number; y: number }[];
  scale: number;
  reset: number;
  isZh: boolean;
  onSelect: (id: string, trigger: HTMLButtonElement) => void;
  onScale: (scale: number) => void;
  onUnavailable: () => void;
};

function inside(x: number, y: number, polygon: readonly (readonly number[])[]) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i],
      b = polygon[j];
    if (a[1] > y !== b[1] > y && x < ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]) + a[0])
      result = !result;
  }
  return result;
}

export default function GothamCityModel(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const labels = useRef(new Map<string, HTMLButtonElement>());
  const leaders = useRef(new Map<string, SVGLineElement>());
  const signals = useRef(new Map<number, HTMLSpanElement>());
  const current = useRef(props);
  const actions = useRef<{
    sync: () => void;
    reset: () => void;
    rotate: (angle: number) => void;
    overhead: () => void;
  } | null>(null);
  current.current = props;

  useEffect(() => {
    const regionId = props.regionId ?? "downtown";
    const footprints = gctModelGeometry(regionId);
    const plans = GCT_LANDMARKS[regionId];
    const modelDepth = DOWNTOWN_MODEL.width * footprints.aspect;
    function position(x: number, y: number, height: number) {
      return new THREE.Vector3(
        (x / 100 - 0.5) * DOWNTOWN_MODEL.width,
        height,
        (y / 100 - 0.5) * modelDepth,
      );
    }
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      current.current.onUnavailable();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x0b0d0f);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xe9e3d5, 0x30353b, 2.7));
    const light = new THREE.DirectionalLight(0xffedd4, 3.2);
    light.position.set(-12, 20, 8);
    scene.add(light);
    const camera = new THREE.OrthographicCamera(-20, 20, 14, -14, 0.1, 120);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI * 0.32;
    controls.minAzimuthAngle = -Math.PI / 7;
    controls.maxAzimuthAngle = Math.PI / 7;
    controls.minZoom = 1;
    controls.maxZoom = 3.4;
    controls.touches.ONE = THREE.TOUCH.PAN;
    controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
    controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
    controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
    const landHeight = DOWNTOWN_MODEL.landHeight;
    let disposed = false;
    let width = 1,
      height = 1;
    const buildings: THREE.Mesh[] = [];
    const markerHeights = new Map<string, number>();
    const landmarkTextures: THREE.Texture[] = [];
    const coastlines: THREE.LineLoop[] = [];
    const floodGroup = new THREE.Group();
    const project = new THREE.Vector3();

    const texture = new THREE.CanvasTexture(document.createElement("canvas"));
    {
      const canvas = texture.image as HTMLCanvasElement;
      canvas.width = 1200;
      canvas.height = Math.round((1200 * modelDepth) / DOWNTOWN_MODEL.width);
      const context = canvas.getContext("2d");
      if (context) drawGCTGround(context, regionId, false);
      texture.needsUpdate = true;
    }
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
    const ground = new THREE.MeshStandardMaterial({ map: texture, color: 0xc5c1b5, roughness: 1 });
    const sides = new THREE.MeshStandardMaterial({ color: 0x393a38, roughness: 1 });

    function outline(points: readonly (readonly number[])[], target: THREE.Path) {
      points.forEach(([x, y], index) => {
        const point = position(x, y, 0);
        if (index === 0) target.moveTo(point.x, -point.z);
        else target.lineTo(point.x, -point.z);
      });
      target.closePath();
    }
    function extrude(
      points: readonly (readonly number[])[],
      height: number,
      holes: readonly (readonly (readonly number[])[])[] = [],
    ) {
      const shape = new THREE.Shape();
      outline(points, shape);
      for (const hole of holes) {
        const path = new THREE.Path();
        outline(hole, path);
        shape.holes.push(path);
      }
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: height,
        bevelEnabled: false,
        steps: 1,
      });
      const vertices = geometry.getAttribute("position"),
        uv = geometry.getAttribute("uv");
      for (let i = 0; i < vertices.count; i++)
        uv.setXY(
          i,
          vertices.getX(i) / DOWNTOWN_MODEL.width + 0.5,
          vertices.getY(i) / modelDepth + 0.5,
        );
      return geometry;
    }
    for (const island of footprints.islands) {
      const mesh = new THREE.Mesh(extrude(island.outline, landHeight, island.holes), [
        ground,
        sides,
      ]);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
      for (const polygon of [island.outline, ...island.holes]) {
        const coast = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(
            polygon.map(([x, y]) => position(x, y, landHeight + 0.01)),
          ),
          new THREE.LineBasicMaterial({ color: 0x85877e }),
        );
        coastlines.push(coast);
        scene.add(coast);
      }
    }
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: 0x141c22, roughness: 0.65, metalness: 0.2 }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.3;
    scene.add(water);
    const backgroundGeometries: THREE.BufferGeometry[] = [];
    const reliefMaterial = ground.clone();
    reliefMaterial.color.setHex(0xe5e3d9);
    for (const footprint of footprints.footprints) {
      const geometry = extrude(footprint.polygon, footprint.height);
      geometry.rotateX(-Math.PI / 2);
      geometry.translate(0, landHeight, 0);
      const marker = props.markers.find((candidate) =>
        inside(candidate.x, candidate.y, footprint.polygon),
      );
      if (marker) {
        const mesh = new THREE.Mesh(geometry, reliefMaterial.clone());
        mesh.userData.placeId = marker.placeId;
        buildings.push(mesh);
        markerHeights.set(marker.placeId, footprint.height);
        scene.add(mesh);
      } else backgroundGeometries.push(geometry);
    }
    if (backgroundGeometries.length) {
      const geometry = mergeGeometries(backgroundGeometries, false);
      if (geometry) scene.add(new THREE.Mesh(geometry, reliefMaterial));
      backgroundGeometries.forEach((item) => item.dispose());
    }
    for (const [placeId, model] of Object.entries(plans)) {
      const landmark = createLandmarkModel(placeId, model, extrude, position);
      landmark.group.position.y = landHeight;
      buildings.push(...landmark.meshes);
      if (landmark.texture) landmarkTextures.push(landmark.texture);
      scene.add(landmark.group);
      markerHeights.set(placeId, landmark.height);
    }
    for (const marker of props.markers) {
      const pin = new THREE.Mesh(
        new THREE.RingGeometry(0.08, 0.12, 24),
        new THREE.MeshBasicMaterial({ color: 0xd9d4c4, side: THREE.DoubleSide }),
      );
      pin.rotation.x = -Math.PI / 2;
      pin.position.copy(
        position(marker.x, marker.y, landHeight + (markerHeights.get(marker.placeId) ?? 0) + 0.025),
      );
      pin.userData.placeId = marker.placeId;
      buildings.push(pin);
      scene.add(pin);
    }
    for (const point of props.floodPoints) {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 0.9, 8),
        new THREE.MeshStandardMaterial({
          color: 0xa92e35,
          emissive: 0x65131a,
          emissiveIntensity: 0.5,
        }),
      );
      mesh.position.copy(position(point.x, point.y, landHeight + 0.45));
      floodGroup.add(mesh);
    }
    scene.add(floodGroup);
    const transitGroup = new THREE.Group();
    {
      for (const route of GCT_DATA.regions[regionId].routes) {
        const points = route.points.map((point) => {
          const [x, y] = gctPoint(regionId, point);
          return position(x, y, landHeight + 0.08);
        });
        const material = route.closed
          ? new THREE.LineDashedMaterial({
              color: GCT_DATA.lines[route.line as keyof typeof GCT_DATA.lines].color,
              dashSize: 0.08,
              gapSize: 0.08,
              depthTest: false,
            })
          : new THREE.LineBasicMaterial({
              color: GCT_DATA.lines[route.line as keyof typeof GCT_DATA.lines].color,
              depthTest: false,
            });
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
        line.computeLineDistances();
        line.renderOrder = 2;
        transitGroup.add(line);
      }
      for (const station of GCT_DATA.regions[regionId].stations) {
        const [x, y] = gctPoint(regionId, station.point);
        const dot = new THREE.Mesh(
          new THREE.RingGeometry(0.04, 0.075, station.kind === "transfer" ? 6 : 12),
          new THREE.MeshBasicMaterial({
            color: station.closed ? 0xd29455 : 0xd2cdbb,
            side: THREE.DoubleSide,
            depthTest: false,
          }),
        );
        dot.rotation.x = -Math.PI / 2;
        dot.position.copy(position(x, y, landHeight + 0.09));
        dot.renderOrder = 3;
        transitGroup.add(dot);
      }
      scene.add(transitGroup);
    }

    function placeLabel(element: HTMLElement | undefined, point: THREE.Vector3) {
      if (!element) return;
      project.copy(point).project(camera);
      const visible =
        project.z > -1 && project.z < 1 && Math.abs(project.x) < 1.08 && Math.abs(project.y) < 1.08;
      element.style.visibility = visible ? "visible" : "hidden";
      element.style.left = `${(project.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-project.y * 0.5 + 0.5) * height}px`;
    }
    function render() {
      if (disposed) return;
      renderer.render(scene, camera);
      const occupied: { x: number; y: number; w: number; h: number }[] = [];
      for (const marker of props.markers) {
        const label = labels.current.get(marker.placeId);
        const leader = leaders.current.get(marker.placeId);
        if (!label || !leader || current.current.flood) continue;
        project
          .copy(
            position(
              marker.x,
              marker.y,
              landHeight + (markerHeights.get(marker.placeId) ?? 0) + 0.35,
            ),
          )
          .project(camera);
        const visible =
          project.z > -1 && project.z < 1 && Math.abs(project.x) < 1 && Math.abs(project.y) < 1;
        label.style.visibility = visible ? "visible" : "hidden";
        leader.style.visibility = visible ? "visible" : "hidden";
        if (!visible) continue;
        const x = (project.x * 0.5 + 0.5) * width;
        const y = (-project.y * 0.5 + 0.5) * height;
        const w = label.offsetWidth,
          h = label.offsetHeight;
        let box = { x: x - w / 2, y: y - h, w, h };
        const offsets = [
          [0, 0],
          [-35, 0],
          [35, 0],
          [0, -40],
          [0, 40],
          [-70, -40],
          [70, -40],
          [-70, 40],
          [70, 40],
          [0, -80],
          [0, 80],
          [-100, -80],
          [100, 80],
        ];
        for (const [dx, dy] of offsets) {
          const candidate = {
            x: THREE.MathUtils.clamp(x - w / 2 + dx, 6, width - w - 6),
            y: THREE.MathUtils.clamp(y - h + dy, 6, height - h - 65),
            w,
            h,
          };
          box = candidate;
          if (
            !occupied.some(
              (other) =>
                candidate.x < other.x + other.w + 6 &&
                candidate.x + w + 6 > other.x &&
                candidate.y < other.y + other.h + 6 &&
                candidate.y + h + 6 > other.y,
            )
          )
            break;
        }
        occupied.push(box);
        label.style.left = `${box.x + w / 2}px`;
        label.style.top = `${box.y + h}px`;
        leader.setAttribute("x1", String(x));
        leader.setAttribute("y1", String(y));
        leader.setAttribute("x2", String(box.x + w / 2));
        leader.setAttribute("y2", String(box.y + h / 2));
      }
      props.floodPoints.forEach((point, index) =>
        placeLabel(signals.current.get(index), position(point.x, point.y, landHeight + 1.1)),
      );
    }
    function reset() {
      camera.position.set(0, 25, 23);
      controls.target.set(0, 0, 0);
      camera.zoom = current.current.scale;
      camera.updateProjectionMatrix();
      controls.update();
      render();
    }
    function sync() {
      camera.zoom = current.current.scale;
      camera.updateProjectionMatrix();
      floodGroup.visible = current.current.flood;
      transitGroup.visible = (current.current.transit ?? true) && !current.current.flood;
      for (const mesh of buildings) {
        const selected = mesh.userData.placeId === current.current.selectedId;
        for (const item of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
          const material = item as THREE.MeshStandardMaterial;
          if (material.emissive) {
            material.emissive.setHex(selected ? 0x9c1f29 : 0x000000);
            material.emissiveIntensity = selected ? 0.7 : 0;
          } else material.color.setHex(selected ? 0xa92e35 : 0xd9d4c4);
        }
      }
      for (const coast of coastlines)
        (coast.material as THREE.LineBasicMaterial).color.setHex(
          current.current.flood ? 0xa92e35 : 0x9c998c,
        );
      render();
    }
    function resize() {
      width = Math.max(1, element!.clientWidth);
      height = Math.max(1, element!.clientHeight);
      const aspect = width / height;
      const half = Math.max(modelDepth / 2 + 0.8, 12 / aspect);
      camera.left = -half * aspect;
      camera.right = half * aspect;
      camera.top = half;
      camera.bottom = -half;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      render();
    }
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    controls.addEventListener("change", () => {
      render();
      if (Math.abs(camera.zoom - current.current.scale) > 0.001)
        current.current.onScale(camera.zoom);
    });
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let down: { x: number; y: number; id: number } | null = null;
    const onDown = (event: PointerEvent) => {
      down = { x: event.clientX, y: event.clientY, id: event.pointerId };
    };
    const onUp = (event: PointerEvent) => {
      if (
        !down ||
        down.id !== event.pointerId ||
        Math.hypot(event.clientX - down.x, event.clientY - down.y) > 6 ||
        current.current.flood
      ) {
        down = null;
        return;
      }
      down = null;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      ray.setFromCamera(pointer, camera);
      const hit = ray.intersectObjects(buildings, false)[0];
      const id = hit?.object.userData.placeId as string | undefined;
      const trigger = id ? labels.current.get(id) : undefined;
      if (id && trigger) current.current.onSelect(id, trigger);
    };
    const onCancel = () => {
      down = null;
    };
    const onLost = (event: Event) => {
      event.preventDefault();
      current.current.onUnavailable();
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointercancel", onCancel);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    actions.current = {
      sync,
      reset,
      rotate: (angle) => {
        const offset = camera.position.clone().sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        spherical.theta = THREE.MathUtils.clamp(
          spherical.theta + angle,
          controls.minAzimuthAngle,
          controls.maxAzimuthAngle,
        );
        spherical.phi = Math.max(spherical.phi, 0.4);
        camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));
        controls.update();
        render();
      },
      overhead: () => {
        camera.position.copy(controls.target).add(new THREE.Vector3(0, 34, 0.001));
        controls.update();
        render();
      },
    };
    reset();
    resize();
    sync();

    return () => {
      disposed = true;
      actions.current = null;
      observer.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointercancel", onCancel);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material)
          (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((material) =>
            materials.add(material),
          );
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      texture.dispose();
      landmarkTextures.forEach((item) => item.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [props.markers, props.floodPoints, props.regionId]);

  useEffect(() => {
    actions.current?.sync();
  }, [props.scale, props.selectedId, props.flood, props.transit]);
  useEffect(() => {
    actions.current?.reset();
  }, [props.reset]);

  return (
    <div ref={host} className="absolute inset-0" data-city-model={props.regionId ?? "downtown"}>
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden="true"
        style={{ display: props.flood ? "none" : undefined }}
      >
        {props.markers.map((marker) => (
          <line
            key={marker.placeId}
            ref={(element) => {
              if (element) leaders.current.set(marker.placeId, element);
              else leaders.current.delete(marker.placeId);
            }}
            stroke="#c5bba3"
            strokeWidth="1"
            opacity="0.55"
          />
        ))}
      </svg>
      {props.markers.map((marker) => (
        <button
          key={marker.placeId}
          ref={(element) => {
            if (element) labels.current.set(marker.placeId, element);
            else labels.current.delete(marker.placeId);
          }}
          type="button"
          hidden={props.flood}
          aria-label={props.isZh ? `查看${marker.name}` : `View ${marker.name}`}
          aria-expanded={props.selectedId === marker.placeId}
          aria-controls="map-detail-card"
          onClick={(event) => props.onSelect(marker.placeId, event.currentTarget)}
          className={`absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap border px-2 py-2 font-sans text-[10px] font-semibold shadow-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg sm:text-xs ${props.selectedId === marker.placeId ? "border-blood bg-blood text-fg" : "border-fg/25 bg-bg/90 text-fg hover:border-blood hover:text-blood"}`}
        >
          <span
            className="mr-1.5 inline-block size-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
          {(() => {
            const label =
              DOWNTOWN_MODEL.labels[marker.placeId as keyof typeof DOWNTOWN_MODEL.labels];
            return (props.regionId ?? "downtown") === "downtown" && label
              ? props.isZh
                ? label.zh
                : label.en
              : marker.name;
          })()}
        </button>
      ))}
      {props.floodPoints.map((_, index) => (
        <span
          key={index}
          ref={(element) => {
            if (element) signals.current.set(index, element);
            else signals.current.delete(index);
          }}
          hidden={!props.flood}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full border border-blood bg-bg/90 px-2 py-1 font-mono text-xs text-blood"
        >
          {String(index + 1).padStart(2, "0")} ×
        </span>
      ))}
      <div className="absolute bottom-12 right-3 z-10 flex border border-fg/15 bg-bg/95 sm:bottom-3">
        <button
          type="button"
          onClick={() => actions.current?.rotate(-0.15)}
          aria-label={props.isZh ? "向左旋转沙盘" : "Rotate model left"}
          className="size-11 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => actions.current?.overhead()}
          className="px-3 text-xs text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
        >
          {props.isZh ? "俯视" : "Top view"}
        </button>
        <button
          type="button"
          onClick={() => actions.current?.rotate(0.15)}
          aria-label={props.isZh ? "向右旋转沙盘" : "Rotate model right"}
          className="size-11 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-fg"
        >
          ↷
        </button>
      </div>
    </div>
  );
}
