import {
  lazy,
  Suspense,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import { Bomb, LocateFixed, Minus, Plus, RotateCcw, X } from "lucide-react";
import { PLACE_MAP, PLACES, GOTHAM_CITY } from "@/lib/places";
import { PlaceMark } from "@/components/place-marks";
import { useI18n } from "@/lib/i18n";
import {
  getLocalizedPlace,
  REGION_MARKERS_NOTES_EN,
  REGIONS_EN,
  GOTHAM_CITY_EN,
} from "@/lib/i18n/places-en";

import { DOWNTOWN_SETTING_REFERENCE, GCT_REFERENCE } from "@/data/gotham-model";
import { GCT_LANDMARKS, gctPoint } from "@/lib/gct-building-plan";
import { GothamTransitMap, GothamTransitIndex, TransitLineBadges, TRANSIT_REGIONS } from "@/components/gotham-transit-map";

const GothamCityModel = lazy(() => import("@/components/gotham-city-model"));

type Evidence = "map" | "screen" | "theory";

type RegionId = "uptown" | "midtown" | "downtown";

type MapPlaceId =
  | "orphanage"
  | "wayne-tower"
  | "gsg"
  | "city-hall"
  | "gcpd"
  | "iceberg"
  | "riddler-room"
  | "seawall"
  | "crown-point"
  | "park-row";

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
      placeId: "orphanage",
      x: GCT_LANDMARKS.uptown.orphanage.x,
      y: GCT_LANDMARKS.uptown.orphanage.y,
      evidence: "theory",
      note: "位于上城区哥谭高地西站以北，前身为韦恩家族庄园。托马斯·韦恩捐出庄园后，这里改建为哥谭孤儿院。",
    },
  ],
  midtown: [],
  downtown: [
    {
      placeId: "gsg",
      x: GCT_LANDMARKS.downtown["gsg"].x,
      y: GCT_LANDMARKS.downtown["gsg"].y,
      evidence: "map",
      note: "官方制片工程图纸在哥谭广场北侧标有独立环形轨道及「Arena」场馆；成片终幕海水倒灌与市民避难伏击即发生于此。",
    },
    {
      placeId: "city-hall",
      x: GCT_LANDMARKS.downtown["city-hall"].x,
      y: GCT_LANDMARKS.downtown["city-hall"].y,
      evidence: "map",
      note: "官方图纸明确标有 City Hall 地铁站，坐落在横贯东西的主干轨道线上，位于 Arena 环线东南侧。",
    },
    {
      placeId: "park-row",
      x: GCT_LANDMARKS.downtown["park-row"].x,
      y: GCT_LANDMARKS.downtown["park-row"].y,
      evidence: "map",
      note: "官方图纸在下城中心标有 Theatre Row（剧院街区）；派克街即君主剧院后巷，托马斯与玛莎·韦恩遇刺的悲剧原点。",
    },
    {
      placeId: "gcpd",
      x: GCT_LANDMARKS.downtown["gcpd"].x,
      y: GCT_LANDMARKS.downtown["gcpd"].y,
      evidence: "theory",
      note: "总局位置参考下城市中心的警务调度街区与出警动线。",
    },
    {
      placeId: "iceberg",
      x: GCT_LANDMARKS.downtown["iceberg"].x,
      y: GCT_LANDMARKS.downtown["iceberg"].y,
      evidence: "screen",
      note: "依据制片设计与漫画《谜语人元年》，冰山俱乐部位于下城与三角区之间的运河大桥南侧桥头（Shoreline Lofts 地下）。",
    },
    {
      placeId: "riddler-room",
      x: GCT_LANDMARKS.downtown["riddler-room"].x,
      y: GCT_LANDMARKS.downtown["riddler-room"].y,
      evidence: "screen",
      note: "成片中谜语人廉租公寓窗户正对冰山俱乐部正门，架设长焦镜头越过街区监视法尔科内进出，两处隔街对望。",
    },
    {
      placeId: "crown-point",
      x: GCT_LANDMARKS.downtown["crown-point"].x,
      y: GCT_LANDMARKS.downtown["crown-point"].y,
      evidence: "theory",
      note: "皇冠角位于下城南部 Tricorner 区域，是《企鹅人》中洪灾重创后的帮派火拼主场。",
    },
    {
      placeId: "seawall",
      x: GCT_LANDMARKS.downtown.seawall.x,
      y: GCT_LANDMARKS.downtown.seawall.y,
      evidence: "theory",
      note: "位于皇冠角东南角海岸，沿三角区港湾布置的防洪大堤，是抵御海水倒灌的城市防线。",
    },
  ],
};

const FLOOD_POINTS = [[480,973], [620,921], [759,907], [859,1026], [829,1172], [694,1168], [568,1205]].map((point) => {
  const [x, y] = gctPoint("downtown", point);
  return { x, y };
});

const MAPPED_PLACE_IDS = new Set(
  Object.values(REGION_MARKERS)
    .flat()
    .map((marker) => marker.placeId),
);
for (const plans of Object.values(GCT_LANDMARKS)) {
  for (const id of Object.keys(plans)) MAPPED_PLACE_IDS.add(id as MapPlaceId);
}
const UNLOCATED_PLACES = PLACES.filter((place) => !place.beneath && !place.above && !MAPPED_PLACE_IDS.has(place.id as MapPlaceId));

const UNLOCATED_CATEGORIES: Record<string, { zh: string; en: string }> = {
  seawall: { zh: "沿海外围防洪大堤", en: "Metropolitan Perimeter · Outer Seawall" },
};

const EVIDENCE: Record<Evidence, { label: string; labelEn: string; className: string }> = {
  map: { label: "地图标注", labelEn: "Production Map", className: "bg-fg text-bg" },
  screen: { label: "影片定位", labelEn: "On-screen Location", className: "bg-blood text-fg" },
  theory: { label: "专题考证", labelEn: "Research Theory", className: "bg-amber-400 text-bg" },
};

const REGIONS = [
  {
    id: "uptown",
    name: "Uptown",
    zh: "上城区",
    status: "交通图重绘 · 26 处地点",
    image: "/media/gotham-uptown-map.webp",
    imageAlt: "依据 GCT CityPass 交通道具图重绘的上城区地图",
    aspectRatio: "1198 / 1313",
    description:
      "依据 GCT CityPass 交通道具图重绘岛岸、四条线路和 26 处交通地点，包含跨河接续站及一个未署名换乘点。Arkham 站西侧的阿卡姆州立医院/疯人院以斜纹区分。哥谭高地西站以北为低密度庄园住宅区，旧韦恩庄园现为哥谭孤儿院。平面图与沙盘共用岸线和建筑轮廓。",
  },
  {
    id: "midtown",
    name: "Midtown",
    zh: "中城区",
    status: "交通图重绘 · 24 处地点",
    image: "/media/gotham-midtown-map.webp",
    imageAlt: "依据 GCT CityPass 交通道具图重绘的中城区地图",
    aspectRatio: "1250 / 1372",
    description:
      "中城以 Robinson Park 为中央绿地，交通线路环绕公园延伸至伯恩利港与芬格河枢纽。24 处交通地点包含跨河接续站及一个停车标注。Wayne Tower (Closed) 站位于公园东南侧；钻石区至该站的关闭路段以虚线表示。韦恩塔位于站点附近，地面建筑与沙盘相互对应。",
  },
  {
    id: "downtown",
    name: "Downtown",
    zh: "下城区",
    status: "设定图与交通图 · 28 处地点",
    image: "/media/gotham-downtown-map-v2.webp",
    imageAlt: "依据电影《新蝙蝠侠》Downtown 设定地图重绘的暗色道路地图",
    aspectRatio: "1 / 1",
    description:
      "结合电影 Downtown 设定图与 GCT CityPass 交通图，完整展示下城核心、河道与南部三角区港区。28 处交通地点与五种线路共用同一张底图；皇冠角位于南部三角区，体育馆、市政厅等八处地标均可调阅地点档案。",
  },
] as const;

const NO_FLOOD_POINTS: readonly { x: number; y: number }[] = [];
const MIN_SCALE = 1;
const MAX_SCALE = 3.4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function GothamPlacesMap() {
  const { locale } = useI18n();
  const isZh = locale === "zh";
  const [regionId, setRegionId] = useState<RegionId>("downtown");
  const [viewMode, setViewMode] = useState<"model" | "flat">("model");
  const [transitViewMode, setTransitViewMode] = useState<"flat" | "model">("flat");
  const [transitLayer, setTransitLayer] = useState(false);
  const [modelReset, setModelReset] = useState(0);
  const [modelUnavailable, setModelUnavailable] = useState(false);
  const [floodPlan, setFloodPlan] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedId, setSelectedId] = useState<MapPlaceId | null>(null);
  const [selectedTransitId, setSelectedTransitId] = useState<string | null>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);
  const panelTriggerRef = useRef<HTMLElement | SVGElement | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    distance: number;
    scale: number;
    midpoint: { x: number; y: number };
    offset: { x: number; y: number };
  } | null>(null);
  const drag = useRef<{ x: number; y: number; offset: { x: number; y: number } } | null>(null);

  const region = REGIONS.find((item) => item.id === regionId) ?? REGIONS[2];
  const activeRegionEn = REGIONS_EN[regionId] ?? REGIONS_EN.downtown;
  const markers = REGION_MARKERS[regionId];
  const activeViewMode = regionId === "downtown" ? viewMode : transitViewMode;
  const modelView = activeViewMode === "model";
  const modelMarkers = useMemo(
    () =>
      regionId !== "downtown" ? Object.entries(GCT_LANDMARKS[regionId]).map(([id, plan]) => ({
        placeId: id, x: plan.x, y: plan.y,
        name: getLocalizedPlace(PLACE_MAP[id], locale).name,
      })) : markers.map((marker) => ({
        placeId: marker.placeId,
        x: marker.x,
        y: marker.y,
        name: getLocalizedPlace(PLACE_MAP[marker.placeId], locale).name,
      })),
    [markers, locale, regionId, isZh],
  );
  const fallBackToMap = useCallback(() => {
    setViewMode("flat");
    setTransitViewMode("flat");
    setModelUnavailable(true);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);
  const selectedMarker = markers.find((marker) => marker.placeId === selectedId);
  const selectedPlace = selectedMarker ? PLACE_MAP[selectedMarker.placeId] : null;
  const transitRegion = TRANSIT_REGIONS[regionId];
  const selectedStation = transitRegion?.stations.find((station) => station.id === selectedTransitId);
  const rooftopPlaces = selectedPlace ? PLACES.filter((place) => place.above === selectedPlace.id) : [];
  const undergroundPlaces = selectedStation?.archive
    ? PLACES.filter((place) => place.beneath === selectedStation.archive)
    : [];

  const closePanel = useCallback(() => {
    setSelectedId(null);
    setSelectedTransitId(null);
    setFloodPlan(false);
    const trigger = panelTriggerRef.current;
    panelTriggerRef.current = null;
    window.requestAnimationFrame(() => trigger?.focus());
  }, []);

  useEffect(() => {
    if (!selectedId && !selectedTransitId && !floodPlan) return;

    const focusFrame = window.requestAnimationFrame(() => panelCloseRef.current?.focus());
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closePanel();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closePanel, floodPlan, selectedId, selectedTransitId]);

  function resetView() {
    setModelReset((current) => current + 1);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }

  function selectRegion(nextRegion: RegionId) {
    setRegionId(nextRegion);
    setTransitViewMode("flat");
    setTransitLayer(true);
    setSelectedTransitId(null);
    if (nextRegion !== "downtown") setFloodPlan(false);
    setSelectedId(null);
    panelTriggerRef.current = null;
    pointers.current.clear();
    gesture.current = null;
    drag.current = null;
    resetView();
  }

  function openTransit(id: string, trigger: HTMLElement | SVGElement, revealLayer = true) {
    if (revealLayer) setTransitLayer(true);
    panelTriggerRef.current = trigger;
    setSelectedId(null);
    setSelectedTransitId(id);
    setFloodPlan(false);
  }

  function openPlace(placeId: MapPlaceId, trigger: HTMLButtonElement) {
    setSelectedTransitId(null);
    panelTriggerRef.current = trigger;
    setFloodPlan(false);
    setSelectedId(placeId);
  }

  function toggleFloodPlan(trigger: HTMLButtonElement) {
    setSelectedTransitId(null);
    if (floodPlan) {
      closePanel();
      return;
    }
    panelTriggerRef.current = trigger;
    setSelectedId(null);
    setFloodPlan(true);
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
      <header className="mx-auto max-w-7xl px-4 pb-3 pt-4 sm:px-6 sm:pb-8 sm:pt-10">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Gotham Places / Interactive Map
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">
              {isZh ? "哥谭地点" : "Gotham Landmarks"}
            </h1>
            <p className="mt-3 hidden max-w-3xl text-pretty text-base leading-relaxed text-muted sm:block">
              {isZh
                ? "探索哥谭三城区的平面地图与 3D 沙盘，查看地标建筑、交通线路和关联地点档案。"
                : "Explore Gotham’s three boroughs in plan and 3D, with landmark buildings, transit routes and linked location dossiers."}
            </p>
          </div>
          <div className="hidden gap-2 text-xs sm:flex sm:flex-wrap">
            {Object.entries(EVIDENCE).map(([key, item]) => (
              <span
                key={key}
                className="inline-flex shrink-0 items-center gap-2 border border-fg/10 bg-surface px-2.5 py-1.5 text-muted sm:px-3 sm:py-2"
              >
                <span className={`size-2 ${item.className}`} />
                {isZh ? item.label : item.labelEn}
              </span>
            ))}
          </div>
        </div>

        <ul aria-label={isZh ? "地图区域" : "Map regions"} className="mt-3 grid grid-cols-3 gap-2 sm:mt-6">
          {REGIONS.map((item) => {
            const regEn = REGIONS_EN[item.id];
            return (
              <li key={item.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => selectRegion(item.id)}
                  aria-pressed={item.id === regionId}
                  className={`min-h-11 w-full px-2 py-2 text-center transition-colors sm:p-4 sm:text-left ${
                    item.id === regionId
                      ? "border border-blood bg-blood text-fg"
                      : "border border-fg/20 bg-surface text-muted hover:border-fg/40 hover:text-fg"
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/70`}
                >
                  <p className="hidden font-display text-xs font-semibold tracking-[0.24em] uppercase sm:block">
                    {item.name}
                  </p>
                  <span className="flex items-end justify-center gap-3 sm:mt-1 sm:justify-between">
                    <span className="font-sans text-base font-black tracking-tight sm:text-xl">
                      {isZh ? item.zh : item.name}
                    </span>
                    <span className="hidden text-xs sm:inline">
                      {isZh ? item.status : (regEn?.status ?? item.status)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {(
          <ul className="mt-3 flex snap-x gap-2 overflow-x-auto pb-1 sm:mt-5 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {modelMarkers.map((marker) => {
              const rawPlace = PLACE_MAP[marker.placeId];
              const place = getLocalizedPlace(rawPlace, locale);
              const active = marker.placeId === (selectedId ?? selectedTransitId);
              return (
                <li key={marker.placeId} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={(event) => regionId === "downtown" || marker.placeId === "orphanage" ? openPlace(marker.placeId as MapPlaceId, event.currentTarget) : openTransit(marker.placeId, event.currentTarget, false)}
                    aria-pressed={active}
                    aria-expanded={active}
                    aria-controls="map-detail-card"
                    className={`flex items-center gap-2 border px-2 py-1.5 text-left transition-colors ${
                      active
                        ? "border-blood bg-blood text-fg"
                        : "border-fg/10 bg-surface text-muted hover:border-fg/30 hover:text-fg"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/70`}
                  >
                    <PlaceMark id={marker.placeId} className="size-7 shrink-0" />
                    <span className="font-sans text-xs font-bold tracking-tight">{place.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </header>

      <section className="border-y border-fg/10 bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div>
            <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="hidden font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase sm:block">
                  Map of Gotham City {region.name}
                </p>
                <div className="hidden flex-wrap items-baseline gap-x-3 gap-y-1 sm:mt-1 sm:flex">
                  <h2 className="font-sans text-2xl font-black tracking-tight">
                    {isZh ? region.zh : region.name}
                  </h2>
                  <span className="text-xs text-faint">
                    {isZh ? region.status : activeRegionEn.status}
                  </span>
                </div>
                <p className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">
                  {isZh ? region.description : activeRegionEn.description}
                </p>
                <details key={regionId} className="text-sm text-muted sm:hidden">
                  <summary className="cursor-pointer py-1 font-semibold text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg">
                    {isZh
                      ? `${region.zh} · 区域介绍与地图说明`
                      : `${region.name} · Overview & Map Notes`}
                  </summary>
                  <p className="mt-2 leading-relaxed">
                    {isZh ? region.description : activeRegionEn.description}
                  </p>
                  <p className="mt-2 leading-relaxed">
                    {isZh
                      ? "探索哥谭三城区的平面地图与 3D 沙盘，查看地标建筑、交通线路和关联地点档案。"
                      : "Explore Gotham’s three boroughs in plan and 3D, with landmark buildings, transit routes and linked location dossiers."}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-3 text-xs">
                    {Object.entries(EVIDENCE).map(([key, item]) => (
                      <li key={key} className="inline-flex items-center gap-2">
                        <span className={`size-2 ${item.className}`} />
                        {isZh ? item.label : item.labelEn}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                {(
                  <div
                    className="flex border border-fg/15 bg-bg"
                    aria-label={isZh ? "地图展现方式" : "Map view"}
                  >
                    {(["model", "flat"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        aria-pressed={activeViewMode === mode}
                        onClick={() => {
                          if (regionId === "downtown") setViewMode(mode);
                          else setTransitViewMode(mode);
                          setModelUnavailable(false);
                          resetView();
                        }}
                        className={`h-11 px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-fg ${activeViewMode === mode ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
                      >
                        {mode === "model"
                          ? isZh
                            ? "3D 沙盘"
                            : "3D Model"
                          : isZh
                            ? "平面图"
                            : "Flat Map"}
                      </button>
                    ))}
                  </div>
                )}
                <button type="button" aria-pressed={transitLayer} onClick={() => setTransitLayer((value) => !value)} className={`h-11 border px-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-fg ${transitLayer ? "border-fg/30 bg-fg text-bg" : "border-fg/15 text-muted"}`}>{isZh ? "GCT 交通图层" : "GCT Transit Layer"}</button>
                {regionId === "downtown" ? (
                  <button
                    type="button"
                    onClick={(event) => toggleFloodPlan(event.currentTarget)}
                    aria-pressed={floodPlan}
                    aria-expanded={floodPlan}
                    aria-controls="map-detail-card"
                    className={`flex h-11 items-center gap-2 border px-2 font-sans text-sm font-semibold transition-colors ${
                      floodPlan
                        ? "border-blood bg-blood text-fg"
                        : "border-fg/10 bg-bg text-muted hover:border-blood hover:text-blood"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/70`}
                  >
                    <Bomb className="size-4" />
                    {isZh ? "谜语人洪灾计划" : "Riddler Flood Plan"}
                  </button>
                ) : null}
                <div className="flex items-center border border-fg/10 bg-bg">
                  <button
                    type="button"
                    onClick={() => zoomBy(0.84)}
                    className="grid size-10 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood/70"
                    aria-label={isZh ? "缩小地图" : "Zoom out"}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-sm text-muted">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => zoomBy(1.18)}
                    className="grid size-10 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood/70"
                    aria-label={isZh ? "放大地图" : "Zoom in"}
                  >
                    <Plus className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={resetView}
                    className="grid size-10 place-items-center border-l border-fg/10 text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood/70"
                    aria-label={isZh ? "重置地图视图" : "Reset map view"}
                  >
                    <RotateCcw className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className="relative flex h-[52svh] min-h-80 max-h-[760px] touch-none select-none items-center justify-center overflow-hidden border border-fg/15 bg-[#08090b] sm:h-[68svh] sm:min-h-96"
              style={{ background: "#11191e" }}
              onWheel={modelView ? undefined : onWheel}
              onPointerDown={modelView ? undefined : onPointerDown}
              onPointerMove={modelView ? undefined : onPointerMove}
              onPointerUp={modelView ? undefined : endPointer}
              onPointerCancel={modelView ? undefined : endPointer}
              role="region"
              aria-label={
                modelView
                  ? isZh
                    ? `哥谭${region.zh} 3D 沙盘`
                    : `${region.name} 3D city model`
                  : isZh
                    ? `可拖动和缩放的哥谭${region.zh}地图` : `Interactive pan-and-zoom map of Gotham ${region.name}`
              }
            >
              {modelView ? (
                <Suspense
                  fallback={
                    <p className="text-sm text-muted" role="status">
                      {isZh ? "正在载入城市沙盘…" : "Loading city model…"}
                    </p>
                  }
                >
                  <GothamCityModel
                    regionId={regionId}
                    transit={transitLayer}
                    markers={modelMarkers}
                    selectedId={selectedId ?? selectedTransitId}
                    flood={floodPlan}
                    floodPoints={regionId === "downtown" ? FLOOD_POINTS : NO_FLOOD_POINTS}
                    scale={scale}
                    reset={modelReset}
                    isZh={isZh}
                    onSelect={(id, trigger) => regionId === "downtown" || id === "orphanage" ? openPlace(id as MapPlaceId, trigger) : openTransit(id, trigger, false)}
                    onScale={setScale}
                    onUnavailable={fallBackToMap}
                  />
                </Suspense>
              ) : (
                <div
                className={`relative shrink-0 cursor-grab active:cursor-grabbing ${regionId === "downtown" ? "w-[min(100%,692px)]" : "w-[min(100%,calc(min(52svh,760px)*var(--map-aspect)))] sm:w-[min(100%,calc(min(68svh,760px)*var(--map-aspect)))]"}`}
                style={{
                  ...{ "--map-aspect": transitRegion.frame[2] / transitRegion.frame[3] },
                  aspectRatio: `${transitRegion.frame[2]} / ${transitRegion.frame[3]}`,
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                  transformOrigin: "center",
                }}
              >
                <GothamTransitMap regionId={regionId} isZh={isZh} selectedId={selectedTransitId} onSelect={openTransit} transit={transitLayer && !floodPlan} />
                {(!floodPlan || regionId !== "downtown") &&
                  markers.map((marker) => {
                    const rawPlace = PLACE_MAP[marker.placeId];
                    const place = getLocalizedPlace(rawPlace, locale);
                    const evidence = EVIDENCE[marker.evidence];
                    const active = marker.placeId === selectedId;
                    return (
                      <button
                        key={marker.placeId}
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={(event) => openPlace(marker.placeId, event.currentTarget)}
                        className="group absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/80"
                        style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                        aria-label={isZh ? `查看${place.name}` : `View ${place.name}`}
                        aria-expanded={active}
                        aria-controls="map-detail-card"
                      >
                        {active ? (
                          <span
                            className="pointer-events-none absolute inset-0 -m-3 animate-ping rounded-full border border-blood bg-blood/25"
                            aria-hidden="true"
                          />
                        ) : null}
                        <span
                          className={`relative block ${transitLayer ? "size-6" : "size-9"} text-fg drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] transition-transform group-hover:scale-110 ${
                            active ? "scale-110 text-blood" : ""
                          }`}
                        >
                          <PlaceMark id={marker.placeId} className={transitLayer ? "size-6" : "size-9"} />
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 size-2 border border-bg ${evidence.className}`}
                          />
                        </span>
                        <span
                          className={`absolute left-1/2 top-10 hidden -translate-x-1/2 whitespace-nowrap border border-fg/15 bg-bg/95 px-2 py-1 font-sans text-[10px] font-bold text-fg shadow-xl group-hover:block ${
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
              )}
              <div className="pointer-events-none absolute bottom-3 left-3 border border-fg/10 bg-bg/90 px-2.5 py-1.5 backdrop-blur-xs">
                <p className="text-xs text-muted">
                  {modelView
                    ? isZh
                      ? "拖动旋转 · 右键或单指平移 · 滚轮或双指缩放"
                      : "Drag to orbit · Right drag / one finger to pan · Scroll / pinch to zoom"
                    : isZh
                      ? "拖动地图 · 滚轮或双指缩放" : "Drag to pan · Scroll or pinch to zoom"}
                </p>
                <p className="mt-0.5 font-mono text-[9px] tracking-wider text-faint uppercase">
                  {modelView
                    ? isZh
                      ? regionId === "downtown" ? "DOWNTOWN · 城市沙盘" : `${region.name.toUpperCase()} · 城市沙盘`
                      : regionId === "downtown" ? "DOWNTOWN · CITY MODEL" : `${region.name.toUpperCase()} · CITY MODEL`
                    : regionId === "downtown" ? "GOTHAM BASIN // ELEV: -4.2M · HUD COORD LOCK" : "GCT CITYPASS // TRANSIT PLAN"}
                </p>
              </div>
              {regionId === "downtown" && floodPlan ? (
                <p className="pointer-events-none absolute bottom-3 right-3 bg-blood px-2 py-1 font-display text-[10px] font-semibold tracking-[0.14em] text-fg uppercase">
                  7 points / film reconstruction
                </p>
              ) : null}
              {selectedMarker && selectedPlace && !floodPlan ? (() => {
                const localizedSelectedPlace = getLocalizedPlace(selectedPlace, locale);
                const markerNote = isZh
                  ? selectedMarker.note
                  : (REGION_MARKERS_NOTES_EN[selectedMarker.placeId] ?? selectedMarker.note);
                return (
                  <aside
                    id="map-detail-card"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="map-detail-title"
                    className="absolute inset-x-3 bottom-12 z-20 max-h-[calc(100%-4rem)] select-text overflow-y-auto border border-fg/20 bg-bg/95 shadow-2xl backdrop-blur-md sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:w-80"
                    onPointerDown={(event) => event.stopPropagation()}
                    onWheel={(event) => event.stopPropagation()}
                  >
                    <div className="relative h-24 overflow-hidden bg-elevated sm:h-28">
                      <img
                        src={localizedSelectedPlace.image}
                        alt={localizedSelectedPlace.imageAlt}
                        className="size-full object-cover"
                      />
                      <span className="absolute left-3 top-3 size-10 text-fg drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                        <PlaceMark id={localizedSelectedPlace.id} className="size-10" />
                      </span>
                      <span
                        className={`absolute bottom-3 left-3 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.16em] uppercase ${EVIDENCE[selectedMarker.evidence].className}`}
                      >
                        {isZh ? EVIDENCE[selectedMarker.evidence].label : EVIDENCE[selectedMarker.evidence].labelEn}
                      </span>
                      <button
                        ref={panelCloseRef}
                        type="button"
                        onClick={closePanel}
                        className="absolute right-3 top-3 grid size-8 place-items-center border border-fg/20 bg-bg/90 text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/80"
                        aria-label={isZh ? "关闭地点介绍" : "Close landmark details"}
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-blood uppercase">
                        {localizedSelectedPlace.nameEn}
                      </p>
                      <h3
                        id="map-detail-title"
                        className="mt-1 font-sans text-xl font-black tracking-tight"
                      >
                        {localizedSelectedPlace.name}
                      </h3>
                      <p className="mt-1 text-xs text-faint">{localizedSelectedPlace.also}</p>
                      <p className="mt-3 text-xs leading-relaxed text-muted">{markerNote}</p>
                      <p className="mt-3 hidden border-t border-fg/10 pt-3 text-xs leading-relaxed text-faint sm:block">
                        {localizedSelectedPlace.body[0]}
                      </p>
                      <Link
                        to="/places/$id"
                        params={{ id: localizedSelectedPlace.id }}
                        className="mt-4 flex items-center justify-between border border-blood bg-blood px-3 py-2.5 font-display text-[10px] font-semibold tracking-[0.18em] text-fg uppercase hover:bg-blood/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/80"
                      >
                        {isZh ? "调阅完整地点档案" : "Open Landmark Dossier →"}
                        <LocateFixed className="size-4" />
                      </Link>
                      {rooftopPlaces.map((place) => {
                        const rooftop = getLocalizedPlace(place, locale);
                        return (
                          <Link key={place.id} to="/places/$id" params={{ id: place.id }} className="mt-3 block border border-fg/15 bg-surface p-3 hover:border-blood">
                            <span className="block text-[10px] tracking-wider text-blood uppercase">{isZh ? "顶部空间 · 影片定位" : "Above · On-screen Location"}</span>
                            <span className="mt-1 block text-sm font-semibold">{rooftop.name}</span>
                            <span className="mt-1 block text-xs text-muted">{isZh ? "冰山俱乐部顶部的私人豪宅" : "Private penthouse above the Iceberg Lounge"}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </aside>
                );
              })() : null}
              {selectedStation ? (
                <aside
                  id="map-detail-card"
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby="map-detail-title"
                  className="absolute inset-x-3 bottom-12 z-20 max-h-[calc(100%-4rem)] select-text overflow-y-auto border border-fg/20 bg-bg/95 p-4 shadow-2xl backdrop-blur-md sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:w-80"
                  onPointerDown={(event) => event.stopPropagation()}
                  onWheel={(event) => event.stopPropagation()}
                >
                  <button ref={panelCloseRef} type="button" onClick={closePanel} className="absolute right-3 top-3 grid size-8 place-items-center border border-fg/20 text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-fg" aria-label={isZh ? "关闭交通地点介绍" : "Close transit details"}><X className="size-4" /></button>
                  <p className="pr-8 font-display text-[10px] tracking-[0.2em] text-blood">GCT CITYPASS · {region.name.toUpperCase()}</p>
                  <h3 id="map-detail-title" className="mt-2 pr-8 text-lg font-black">{isZh ? selectedStation.nameZh : selectedStation.nameEn}</h3>
                  {isZh ? <p className="mt-1 text-xs text-faint">{selectedStation.nameEn}</p> : null}
                  <p className="mt-3 text-xs text-muted"><TransitLineBadges station={selectedStation} isZh={isZh} /></p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {isZh ? selectedStation.noteZh : selectedStation.noteEn}
                  </p>
                  {selectedStation.kind === "transfer" ? <p className="mt-2 text-xs text-faint">{isZh ? "六边形：换乘点" : "Hexagon: transfer point"}</p> : null}
                  {selectedStation.external ? <p className="mt-2 text-xs text-faint">{isZh ? "跨河接续站，保留以显示本区线路去向。" : "A cross-river connection retained to show the route beyond this borough."}</p> : null}
                  {selectedStation.uncertain ? <p className="mt-2 text-xs text-faint">{isZh ? "站名待辨，详见原始交通图。" : "Station name pending verification; see the original transit map."}</p> : null}
                  {selectedStation.archive ? (
                    <Link to="/places/$id" params={{ id: selectedStation.archive }} className="mt-4 block border border-blood bg-blood px-3 py-2 text-xs font-semibold text-fg focus-visible:outline-2 focus-visible:outline-fg">{isZh ? "调阅关联地点档案" : "Open Related Dossier"}</Link>
                  ) : null}
                  {undergroundPlaces.map((place) => {
                    const underground = getLocalizedPlace(place, locale);
                    return (
                      <Link key={place.id} to="/places/$id" params={{ id: place.id }} className="mt-3 block border border-fg/15 bg-surface p-3 hover:border-blood focus-visible:outline-2 focus-visible:outline-fg">
                        <span className="block text-[10px] tracking-wider text-blood uppercase">{isZh ? "地下空间 · 影片定位" : "Below Ground · On-screen Location"}</span>
                        <span className="mt-1 block text-sm font-semibold">{underground.name}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted">{underground.also}</span>
                      </Link>
                    );
                  })}
                </aside>
              ) : null}
              {regionId === "downtown" && floodPlan ? (
                <aside
                  id="map-detail-card"
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby="map-detail-title"
                  className="absolute inset-x-3 bottom-12 z-20 max-h-[calc(100%-4rem)] select-text overflow-y-auto border border-blood bg-bg/95 p-4 shadow-2xl backdrop-blur-md sm:bottom-auto sm:left-auto sm:right-3 sm:top-3 sm:w-80"
                  onPointerDown={(event) => event.stopPropagation()}
                  onWheel={(event) => event.stopPropagation()}
                >
                  <button
                    ref={panelCloseRef}
                    type="button"
                    onClick={closePanel}
                    className="absolute right-3 top-3 grid size-8 place-items-center border border-blood/50 text-blood hover:bg-blood hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/80"
                    aria-label={isZh ? "关闭洪灾计划介绍" : "Close flood plan details"}
                  >
                    <X className="size-4" />
                  </button>
                  <Bomb className="size-10 text-blood" strokeWidth={1.4} />
                  <p className="mt-4 font-display text-[10px] font-semibold tracking-[0.2em] text-blood uppercase">
                    A Real Change / Final Plan
                  </p>
                  <h3
                    id="map-detail-title"
                    className="mt-1 pr-8 font-sans text-xl font-black tracking-tight"
                  >
                    {isZh ? "谜语人海堤爆破计划" : "Riddler Seawall Demolition Plan"}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    <div className="border border-fg/10 bg-surface p-2">
                      <p className="font-display text-lg font-black text-blood">07</p>
                      <p className="text-[10px] text-faint">{isZh ? "爆破车辆" : "Bomb Vans"}</p>
                    </div>
                    <div className="border border-fg/10 bg-surface p-2">
                      <p className="font-display text-lg font-black text-blood">SEA WALL</p>
                      <p className="text-[10px] text-faint">{isZh ? "目标设施" : "Target Facility"}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted">
                    {isZh
                      ? "蝙蝠侠在谜语人公寓地板地图上发现七个 X；随后的视频确认，七辆爆破车被部署在城市海堤沿线。图层按电影画面还原七处爆破点的分布。"
                      : "Batman discovered seven 'X' markings on the floor map in Riddler's apartment; subsequent video confirmed seven explosive-laden vans deployed along the city seawall. This layer follows the seven blast points shown in the film."}
                  </p>
                  <a
                    href="https://movies.fandom.com/wiki/The_Batman/Transcript"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-between border border-blood px-3 py-2.5 font-display text-[10px] font-semibold tracking-[0.18em] text-blood uppercase hover:bg-blood hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/80"
                  >
                    {isZh ? "查看电影文字稿" : "View Film Transcript"}
                    <LocateFixed className="size-4" />
                  </a>
                </aside>
              ) : null}
            </div>
            <GothamTransitIndex regionId={regionId} isZh={isZh} selectedId={selectedTransitId} onSelect={openTransit} />
          </div>
        </div>
      </section>

      {modelUnavailable ? (
        <p role="status" className="mx-auto max-w-7xl px-4 pt-3 text-sm text-muted sm:px-6">
          {isZh
            ? "城市沙盘暂不可用，已切换至平面图。"
            : "City model unavailable; switched to the flat map."}
        </p>
      ) : null}

      {UNLOCATED_PLACES.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                Unlocated Files
              </p>
              <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">
                {isZh ? "占地尚待确定的地点档案" : "Sites Awaiting Confirmation"}
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-relaxed text-faint">
              {isZh
                ? "这些地点已有档案，具体占地尚待确定。已归入区域地图或关联至现有建筑的地点，可从相应地图调阅。"
                : "These dossiers await a defined site. Locations assigned to a borough or an existing building are accessible from their regional maps."}
            </p>
          </div>
          <ul className="mt-5 flex snap-x gap-3 overflow-x-auto pb-3">
            {UNLOCATED_PLACES.map((place) => {
              const localizedPlace = getLocalizedPlace(place, locale);
              return (
                <li key={place.id} className="w-64 shrink-0 snap-start">
                  <Link
                    to="/places/$id"
                    params={{ id: place.id }}
                    className="group relative flex h-full items-center gap-3 border border-fg/10 bg-surface p-3 hover:border-blood"
                  >
                    <img
                      src={localizedPlace.image}
                      alt=""
                      loading="lazy"
                      className="size-16 shrink-0 object-cover"
                    />
                    <span className="absolute left-2 top-2 size-7 text-fg drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                      <PlaceMark id={localizedPlace.id} className="size-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-sans text-sm font-black tracking-tight group-hover:text-blood">
                        {localizedPlace.name}
                      </span>
                      {UNLOCATED_CATEGORIES[place.id] ? (
                        <span className="mt-1 inline-block border border-fg/10 bg-bg/80 px-1.5 py-0.5 font-display text-[9px] font-semibold tracking-wider text-blood uppercase">
                          {isZh
                            ? UNLOCATED_CATEGORIES[place.id].zh
                            : UNLOCATED_CATEGORIES[place.id].en}
                        </span>
                      ) : null}
                      <span className="mt-1 block truncate text-[11px] text-faint">{localizedPlace.also}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-10">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
              Cartography Note
            </p>
            <h2 className="mt-2 font-sans text-2xl font-black tracking-tight">
              {isZh ? "地图资料说明" : "Cartography & Reference Notes"}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted">
            {isZh
              ? "上城与中城依据 GCT CityPass 交通图重绘，下城结合电影 Downtown 设定图，包含皇冠角与南部港区。平面图和沙盘共用岸线、交通与建筑数据。道路和建筑体量采用模型化设计，阿卡姆州立医院/疯人院与皇冠角的位置参考专题考证；地点来源以地图标注、影片定位、专题考证三类标签区分。"
              : "Uptown and Midtown follow GCT CityPass; Downtown also draws on the production setting map, including Crown Point and the southern harbor. Plan and model share coastlines, transit and buildings. Streets and building forms are adapted for the city model; Arkham grounds and Crown Point follow archive research. Source badges distinguish Production Map, On-screen Location and Research Theory."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <details className="border-y border-fg/15 py-4">
          <summary className="cursor-pointer font-sans text-sm font-semibold focus-visible:outline-2 focus-visible:outline-fg">
            {isZh ? GCT_REFERENCE.titleZh : GCT_REFERENCE.titleEn}
          </summary>
          <p className="my-4 max-w-3xl text-sm leading-relaxed text-muted">
            {isZh ? GCT_REFERENCE.noteZh : GCT_REFERENCE.noteEn}
          </p>
          <a
            href={GCT_REFERENCE.image}
            target="_blank"
            rel="noreferrer"
            className="block max-w-xl focus-visible:outline-2 focus-visible:outline-fg"
          >
            <img
              src={GCT_REFERENCE.image}
              alt={
                isZh
                  ? "GCT CityPass 交通道具地图照片，显示上城、中城、下城和 Tricorner 的线路与站点"
                  : "Photograph of the GCT CityPass transit prop showing routes and stations in Uptown, Midtown, Downtown and Tricorner"
              }
              loading="lazy"
              className="h-auto w-full"
            />
          </a>
        </details>
        <details className="border-b border-fg/15 py-4">
          <summary className="cursor-pointer font-sans text-sm font-semibold focus-visible:outline-2 focus-visible:outline-fg">
            {isZh ? "电影 Downtown 设定图" : "Downtown Production Setting Map"}
          </summary>
          <p className="my-4 max-w-3xl text-sm leading-relaxed text-muted">
            {isZh ? "下城岸线、河道与港区结合这张设定图绘制，交通线色与站点再对照 GCT CityPass。皇冠角与下城核心同属这一张区域地图。" : "Downtown shorelines, river and harbor follow this setting sheet, with transit colors and stations cross-referenced to GCT CityPass. Crown Point is included in this Downtown map."}
          </p>
          <a href={DOWNTOWN_SETTING_REFERENCE.image} target="_blank" rel="noreferrer" className="block max-w-3xl focus-visible:outline-2 focus-visible:outline-fg">
            <img src={DOWNTOWN_SETTING_REFERENCE.image} alt={isZh ? "哥谭 Downtown 电影设定图，包含下城核心、欣克利河与三角区港区" : "Downtown production setting map including the core, Hinckley River and Tricorner harbor"} loading="lazy" className="h-auto w-full" />
          </a>
        </details>
      </section>

      <section className="border-t border-fg/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
            City File · {GOTHAM_CITY.motto} {isZh ? `(${GOTHAM_CITY.mottoZh})` : `(${GOTHAM_CITY_EN.mottoZh})`}
          </p>
          <h2 className="mt-2 font-sans text-2xl font-black tracking-tight">
            {isZh ? "哥谭市档案" : "Gotham City Dossier"}
          </h2>
          <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted">
            {isZh ? GOTHAM_CITY.lede : GOTHAM_CITY_EN.lede}
          </p>
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {GOTHAM_CITY.boroughs.map((b, index) => {
              const bEn = GOTHAM_CITY_EN.boroughs[index];
              return (
                <div key={b.nameEn} className="bg-bg p-5">
                  <p className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase">
                    {isZh ? b.source : (bEn?.source ?? b.source)}
                  </p>
                  <p className="mt-2 font-sans text-lg font-black tracking-tight">
                    {isZh ? b.name : b.nameEn}{" "}
                    {isZh ? (
                      <span className="font-display text-xs font-semibold tracking-wide text-muted">
                        {b.nameEn}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-muted">{isZh ? b.note : (bEn?.note ?? b.note)}</p>
                </div>
              );
            })}
          </div>
          <dl className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {GOTHAM_CITY.facts.map((fact, index) => {
              const fEn = GOTHAM_CITY_EN.facts[index];
              return (
                <div key={fact.label} className="bg-bg p-5">
                  <dt className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase">
                    {isZh ? fact.label : (fEn?.label ?? fact.label)}
                  </dt>
                  <dd className="mt-2 text-pretty text-sm leading-relaxed">
                    {isZh ? fact.value : (fEn?.value ?? fact.value)}
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                {isZh ? "成片点名的区划" : "Districts Named in Film & Series"}
              </h3>
              <ul className="mt-4 space-y-3">
                {GOTHAM_CITY.districts.map((d, index) => {
                  const dEn = GOTHAM_CITY_EN.districts[index];
                  return (
                    <li key={d.nameEn}>
                      <p className="font-sans text-base font-black tracking-tight">
                        {isZh ? d.name : d.nameEn}{" "}
                        {isZh ? (
                          <span className="font-display text-xs font-semibold tracking-wide text-muted">
                            {d.nameEn}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {isZh ? d.note : (dEn?.note ?? d.note)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                {isZh ? "旧豪门与地下秩序" : "Dynasties & Underworld Order"}
              </h3>
              <ul className="mt-4 space-y-3">
                {GOTHAM_CITY.families.map((f, index) => {
                  const fEn = GOTHAM_CITY_EN.families[index];
                  return (
                    <li key={f.name}>
                      <p className="font-sans text-base font-black tracking-tight">
                        {isZh ? f.name : (fEn?.name ?? f.name)}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {isZh ? f.note : (fEn?.note ?? f.note)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
