import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bomb, LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";
import { pageTitle } from "@/lib/film";
import { PLACE_MAP } from "@/lib/places";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [{ title: pageTitle("哥谭互动地图") }],
  }),
  component: GothamMap,
});

type Evidence = "map" | "screen" | "theory";

type RegionId = "uptown" | "midtown" | "downtown";

type MapPlaceId =
  "wayne-tower" | "gsg" | "city-hall" | "gcpd" | "iceberg" | "riddler-room" | "crown-point";

type Marker = {
  placeId: MapPlaceId;
  x: number;
  y: number;
  evidence: Evidence;
  note: string;
};

const REGION_MARKERS: Record<RegionId, Marker[]> = {
  uptown: [
    {
      placeId: "crown-point",
      x: 76,
      y: 58,
      evidence: "screen",
      note: "《企鹅人》确认 Crown Point 位于 Uptown 东部并临近通往 Bristol Township 的桥梁；标记按剧中地图关系落在东侧街区。",
    },
  ],
  midtown: [],
  downtown: [
    {
      placeId: "wayne-tower",
      x: 50.4,
      y: 42.2,
      evidence: "screen",
      note: "依据 Wayne Plaza 标注与电影中韦恩塔视线关系定位。",
    },
    {
      placeId: "gsg",
      x: 32.2,
      y: 25.8,
      evidence: "screen",
      note: "对应 Gotham Square 一带；体育馆的具体街区位置依据终幕场景推定。",
    },
    {
      placeId: "city-hall",
      x: 39.7,
      y: 31.1,
      evidence: "screen",
      note: "依据市政厅、Gotham Square Station 与电影外景关系定位。",
    },
    {
      placeId: "gcpd",
      x: 57.8,
      y: 35.2,
      evidence: "theory",
      note: "地图没有直接标出总部名称，位置按市中心警务线路作本站推测。",
    },
    {
      placeId: "iceberg",
      x: 56.2,
      y: 69.8,
      evidence: "theory",
      note: "暂放在 Tricorner 犯罪活动区；后续将以更清晰的剧中地图校正。",
    },
    {
      placeId: "riddler-room",
      x: 52.4,
      y: 65.7,
      evidence: "theory",
      note: "按照公寓可监视冰山俱乐部的剧情关系，作为相对位置展示。",
    },
  ],
};

const FLOOD_POINTS = [
  { x: 11, y: 27 },
  { x: 29, y: 11 },
  { x: 52, y: 8 },
  { x: 82, y: 17 },
  { x: 91, y: 43 },
  { x: 82, y: 76 },
  { x: 49, y: 91 },
] as const;

const EVIDENCE: Record<Evidence, { label: string; className: string }> = {
  map: { label: "地图标注", className: "bg-fg text-bg" },
  screen: { label: "影片定位", className: "bg-blood text-fg" },
  theory: { label: "本站推测", className: "bg-amber-400 text-bg" },
};

const REGIONS = [
  {
    id: "uptown",
    name: "Uptown",
    zh: "上城区",
    status: "1 个地点档案",
    image: "/media/gotham-uptown-map.webp",
    imageAlt: "依据哥谭全城轮廓与《企鹅人》剧中地图重绘的 Uptown 道路地图",
    aspectRatio: "1198 / 1313",
    emptyNote: "Uptown 底图已经开放，更多地点需要等待可核对的影视画面后再落点。",
  },
  {
    id: "midtown",
    name: "Midtown",
    zh: "中城区",
    status: "底图开放",
    image: "/media/gotham-midtown-map.webp",
    imageAlt: "依据哥谭全城轮廓与《企鹅人》剧中地图重绘的 Midtown 道路地图",
    aspectRatio: "1250 / 1372",
    emptyNote: "Midtown 的岛岸和道路结构已经重绘，但目前没有足够可靠的地点坐标，因此暂不添加标记。",
  },
  {
    id: "downtown",
    name: "Downtown",
    zh: "下城区",
    status: "6 个地点档案",
    image: "/media/gotham-downtown-map-v2.webp",
    imageAlt: "依据 Reeves 版哥谭 Downtown 地理结构重绘的暗色道路地图",
    aspectRatio: "1197 / 1314",
    emptyNote: "",
  },
] as const;

const MIN_SCALE = 1;
const MAX_SCALE = 3.4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function GothamMap() {
  const [regionId, setRegionId] = useState<RegionId>("downtown");
  const [floodPlan, setFloodPlan] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<MapPlaceId | null>(
    REGION_MARKERS.downtown[0].placeId,
  );
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    distance: number;
    scale: number;
    midpoint: { x: number; y: number };
    offset: { x: number; y: number };
  } | null>(null);
  const drag = useRef<{ x: number; y: number; offset: { x: number; y: number } } | null>(null);

  const region = REGIONS.find((item) => item.id === regionId) ?? REGIONS[2];
  const markers = REGION_MARKERS[regionId];
  const selectedMarker = markers.find((marker) => marker.placeId === selectedId);
  const selectedPlace = selectedMarker ? PLACE_MAP[selectedMarker.placeId] : null;

  function resetView() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function selectRegion(nextRegion: RegionId) {
    setRegionId(nextRegion);
    if (nextRegion !== "downtown") setFloodPlan(false);
    setSelectedId(REGION_MARKERS[nextRegion][0]?.placeId ?? null);
    pointers.current.clear();
    gesture.current = null;
    drag.current = null;
    resetView();
  }

  function zoomBy(factor: number) {
    setScale((current) => clamp(current * factor, MIN_SCALE, MAX_SCALE));
  }

  function onWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const next = clamp(scale * (event.deltaY < 0 ? 1.13 : 0.88), MIN_SCALE, MAX_SCALE);
    if (next === scale) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const point = {
      x: event.clientX - rect.left - rect.width / 2,
      y: event.clientY - rect.top - rect.height / 2,
    };
    const ratio = next / scale;
    setOffset((current) => ({
      x: point.x - (point.x - current.x) * ratio,
      y: point.y - (point.y - current.y) * ratio,
    }));
    setScale(next);
  }

  function pointerDistance() {
    const points = [...pointers.current.values()];
    if (points.length < 2) return 0;
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }

  function pointerMidpoint() {
    const points = [...pointers.current.values()];
    return {
      x: (points[0].x + points[1].x) / 2,
      y: (points[0].y + points[1].y) / 2,
    };
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 1) {
      drag.current = { x: event.clientX, y: event.clientY, offset };
    } else if (pointers.current.size === 2) {
      drag.current = null;
      gesture.current = {
        distance: pointerDistance(),
        scale,
        midpoint: pointerMidpoint(),
        offset,
      };
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2 && gesture.current) {
      const next = clamp(
        gesture.current.scale * (pointerDistance() / gesture.current.distance),
        MIN_SCALE,
        MAX_SCALE,
      );
      const midpoint = pointerMidpoint();
      setScale(next);
      setOffset({
        x: gesture.current.offset.x + midpoint.x - gesture.current.midpoint.x,
        y: gesture.current.offset.y + midpoint.y - gesture.current.midpoint.y,
      });
      return;
    }

    if (pointers.current.size === 1 && drag.current) {
      setOffset({
        x: drag.current.offset.x + event.clientX - drag.current.x,
        y: drag.current.offset.y + event.clientY - drag.current.y,
      });
    }
  }

  function endPointer(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    gesture.current = null;
    const remaining = [...pointers.current.values()][0];
    drag.current = remaining ? { ...remaining, offset } : null;
  }

  return (
    <main className="min-h-svh bg-bg">
      <header className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Gotham Cartography / 01
        </p>
        <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-sans text-4xl font-black tracking-tight sm:text-6xl">
              哥谭互动地图
            </h1>
            <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-muted">
              结合 Reeves 宇宙公开的 Downtown
              地图、哥谭全城轮廓与《企鹅人》剧中地图重新绘制。切换三大城区，拖动探索街区，缩放查看道路；推测位置会与影视画面可对应位置明确区分。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(EVIDENCE).map(([key, item]) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 border border-fg/10 bg-surface px-3 py-2 text-muted"
              >
                <span className={`size-2 ${item.className}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-8 grid gap-2 sm:grid-cols-3">
          {REGIONS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => selectRegion(item.id)}
                aria-pressed={item.id === regionId}
                className={`w-full p-4 text-left transition-colors ${
                  item.id === regionId
                    ? "border border-blood bg-blood/10 text-fg"
                    : "border border-fg/10 bg-surface text-faint hover:border-fg/30 hover:text-muted"
                }`}
              >
                <p className="font-display text-xs font-semibold tracking-[0.24em] uppercase">
                  {item.name}
                </p>
                <span className="mt-1 flex items-end justify-between gap-3">
                  <span className="font-sans text-xl font-black tracking-tight">{item.zh}</span>
                  <span className="text-[11px]">{item.status}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </header>

      <section className="border-y border-fg/10 bg-surface/40">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-faint uppercase">
                Map of Gotham City {region.name}
              </p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {regionId === "downtown" ? (
                  <button
                    type="button"
                    onClick={() => setFloodPlan((current) => !current)}
                    aria-pressed={floodPlan}
                    className={`flex h-10 items-center gap-2 border px-3 font-display text-[10px] font-semibold tracking-[0.16em] uppercase transition-colors ${
                      floodPlan
                        ? "border-blood bg-blood text-fg"
                        : "border-fg/10 bg-bg text-muted hover:border-blood hover:text-blood"
                    }`}
                  >
                    <Bomb className="size-4" />
                    谜语人洪灾计划
                  </button>
                ) : null}
                <div className="flex items-center border border-fg/10 bg-bg">
                  <button
                    type="button"
                    onClick={() => zoomBy(0.84)}
                    className="grid size-10 place-items-center text-muted hover:bg-elevated hover:text-fg"
                    aria-label="缩小地图"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-14 text-center font-mono text-xs text-faint">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => zoomBy(1.18)}
                    className="grid size-10 place-items-center text-muted hover:bg-elevated hover:text-fg"
                    aria-label="放大地图"
                  >
                    <Plus className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={resetView}
                    className="grid size-10 place-items-center border-l border-fg/10 text-muted hover:bg-elevated hover:text-fg"
                    aria-label="重置地图视图"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className="relative flex h-[68svh] min-h-96 max-h-[760px] touch-none select-none items-center justify-center overflow-hidden border border-fg/15 bg-[#08090b]"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endPointer}
              onPointerCancel={endPointer}
              role="application"
              aria-label={`可拖动和缩放的哥谭${region.zh}地图`}
            >
              <div
                className="relative w-[min(100%,692px)] shrink-0 cursor-grab active:cursor-grabbing"
                style={{
                  aspectRatio: region.aspectRatio,
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transformOrigin: "center",
                }}
              >
                <img
                  src={region.image}
                  alt={region.imageAlt}
                  draggable={false}
                  className="pointer-events-none size-full object-contain"
                />
                {(!floodPlan || regionId !== "downtown") &&
                  markers.map((marker) => {
                    const place = PLACE_MAP[marker.placeId];
                    const evidence = EVIDENCE[marker.evidence];
                    const active = marker.placeId === selectedId;
                    return (
                      <button
                        key={marker.placeId}
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={() => setSelectedId(marker.placeId)}
                        className="group absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                        aria-label={`查看${place.name}`}
                      >
                        <span
                          className={`relative grid size-5 place-items-center border-2 border-bg shadow-[0_0_0_1px_rgba(255,255,255,0.3)] transition-transform group-hover:scale-125 ${evidence.className} ${
                            active ? "scale-125 ring-2 ring-fg/70 ring-offset-2 ring-offset-bg" : ""
                          }`}
                        >
                          <span className="size-1 bg-current opacity-70" />
                        </span>
                        <span
                          className={`absolute left-1/2 top-7 hidden -translate-x-1/2 whitespace-nowrap border border-fg/15 bg-bg/95 px-2 py-1 font-sans text-[10px] font-bold text-fg shadow-xl group-hover:block ${
                            active ? "sm:block" : ""
                          }`}
                        >
                          {place.name}
                        </span>
                      </button>
                    );
                  })}
                {regionId === "downtown" && floodPlan
                  ? FLOOD_POINTS.map((point, index) => (
                      <span
                        key={`${point.x}-${point.y}`}
                        className="pointer-events-none absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center"
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        aria-hidden="true"
                      >
                        <span
                          className="absolute inset-0 animate-ping border border-blood/80 bg-blood/20"
                          style={{ animationDelay: `${index * 160}ms` }}
                        />
                        <span className="relative font-display text-2xl font-black leading-none text-blood drop-shadow-[0_0_5px_rgba(190,24,35,0.9)]">
                          ×
                        </span>
                      </span>
                    ))
                  : null}
              </div>
              <p className="pointer-events-none absolute bottom-3 left-3 bg-bg/80 px-2 py-1 text-[10px] text-faint">
                拖动地图 · 滚轮或双指缩放
              </p>
              {regionId === "downtown" && floodPlan ? (
                <p className="pointer-events-none absolute bottom-3 right-3 bg-blood px-2 py-1 font-display text-[10px] font-semibold tracking-[0.14em] text-fg uppercase">
                  7 points / film reconstruction
                </p>
              ) : null}
            </div>
          </div>

          {regionId === "downtown" && floodPlan ? (
            <aside className="border border-blood bg-bg lg:sticky lg:top-20 lg:self-start">
              <div className="relative grid aspect-[16/9] place-items-center overflow-hidden bg-blood/10">
                <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-blood/50" />
                <Bomb className="relative size-14 text-blood" strokeWidth={1.4} />
                <span className="absolute left-3 top-3 bg-blood px-2 py-1 font-display text-[10px] font-semibold tracking-[0.16em] text-fg uppercase">
                  Film reconstruction
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                  A Real Change / Final Plan
                </p>
                <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">
                  谜语人海堤爆破计划
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-2 text-center">
                  <div className="border border-fg/10 bg-surface p-3">
                    <p className="font-display text-xl font-black text-blood">07</p>
                    <p className="mt-1 text-[10px] text-faint">爆破车辆</p>
                  </div>
                  <div className="border border-fg/10 bg-surface p-3">
                    <p className="font-display text-xl font-black text-blood">SEA WALL</p>
                    <p className="mt-1 text-[10px] text-faint">目标设施</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  蝙蝠侠在谜语人公寓地板地图上发现七个
                  X；随后的视频确认，七辆爆破车被部署在城市海堤沿线。图层依据电影画面复原分布关系，并非官方精确坐标。
                </p>
                <a
                  href="https://movies.fandom.com/wiki/The_Batman/Transcript"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex items-center justify-between border border-blood px-4 py-3 font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase hover:bg-blood hover:text-fg"
                >
                  查看电影文字稿
                  <LocateFixed className="size-4" />
                </a>
              </div>
            </aside>
          ) : selectedMarker && selectedPlace ? (
            <aside className="border border-fg/15 bg-bg lg:sticky lg:top-20 lg:self-start">
              <div className="relative aspect-[16/9] overflow-hidden bg-elevated">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.imageAlt}
                  className="size-full object-cover"
                />
                <span
                  className={`absolute left-3 top-3 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.16em] uppercase ${EVIDENCE[selectedMarker.evidence].className}`}
                >
                  {EVIDENCE[selectedMarker.evidence].label}
                </span>
              </div>
              <div className="p-5">
                <p className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                  {selectedPlace.nameEn}
                </p>
                <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">
                  {selectedPlace.name}
                </h2>
                <p className="mt-1 text-sm text-faint">{selectedPlace.also}</p>
                <p className="mt-5 text-sm leading-relaxed text-muted">{selectedMarker.note}</p>
                <p className="mt-4 border-t border-fg/10 pt-4 text-xs leading-relaxed text-faint">
                  {selectedPlace.body[0]}
                </p>
                <Link
                  to="/places/$id"
                  params={{ id: selectedPlace.id }}
                  className="mt-5 flex items-center justify-between border border-blood px-4 py-3 font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase hover:bg-blood hover:text-fg"
                >
                  调阅完整地点档案
                  <LocateFixed className="size-4" />
                </Link>
              </div>
            </aside>
          ) : (
            <aside className="border border-fg/15 bg-bg p-5 lg:sticky lg:top-20 lg:self-start">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                {region.name} / Map Layer
              </p>
              <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">{region.zh}</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted">{region.emptyNote}</p>
              <Link
                to="/places"
                className="mt-6 flex items-center justify-between border border-fg/15 px-4 py-3 font-display text-xs font-semibold tracking-[0.18em] text-muted uppercase hover:border-blood hover:text-blood"
              >
                浏览全部地点档案
                <LocateFixed className="size-4" />
              </Link>
            </aside>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 border-l-2 border-blood pl-5 sm:grid-cols-2 sm:gap-10">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
              Cartography Note
            </p>
            <h2 className="mt-2 font-sans text-2xl font-black tracking-tight">地图资料说明</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            Downtown 依据电影设定资料重绘；Uptown 与 Midtown
            结合全城小图和《企鹅人》剧中交通地图画面重构，并校正了画面透视。三张底图均只保留岛岸、水系和道路结构，不复刻标题、文字、图例或标尺；它们属于影迷地图重构，并非官方制图。互动标记仍按影视定位与本站推测分层展示。Downtown
            的“谜语人洪灾计划”图层按照电影中七个 X
            与海堤沿线关系复原，爆破点为近似分布而非官方精确坐标。
          </p>
        </div>
      </section>
    </main>
  );
}
