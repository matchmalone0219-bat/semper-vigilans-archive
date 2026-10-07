import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Expand, Crosshair, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/lightbox";
import { GEAR } from "@/lib/gear";
import {
  GEAR_COPY,
  LOADOUT,
  SUIT_OVERVIEW,
  VEHICLES,
  type ArchiveGear,
  type Bilingual,
  type GearPlate,
} from "@/lib/gear-archive";
import { pageTitle } from "@/lib/film";
import { useI18n } from "@/lib/i18n";
import { getLocalizedGear } from "@/lib/i18n/gear-en";
import { BODY_TURNTABLE_VIEWS } from "@/lib/gear-turntable-assets";
import "@/components/gear-archive.css";

export const Route = createFileRoute("/gear")({
  head: () => ({ meta: [{ title: pageTitle("装备") }] }),
  component: Gear,
});
const BODY_RECORDS = [SUIT_OVERVIEW, ...LOADOUT];
const RELATED_IDS = ["turbine", "corvette", "cave", "signal"];

type BodyHotspot = { x: number; y: number };

const BODY_VIEW_HOTSPOTS: Record<number, Record<string, BodyHotspot>> = {
  0: {
    cowl: { x: 50, y: 11 },
    "chest-blade": { x: 50, y: 26 },
    cape: { x: 76, y: 24 },
    gauntlet: { x: 76, y: 43 },
    grapnel: { x: 24, y: 44 },
    belt: { x: 50, y: 48 },
  },
  1: {
    cowl: { x: 49, y: 11 },
    "chest-blade": { x: 48, y: 26 },
    cape: { x: 77, y: 25 },
    gauntlet: { x: 74, y: 44 },
    grapnel: { x: 27, y: 44 },
    belt: { x: 49, y: 48 },
  },
  2: {
    cowl: { x: 50, y: 12 },
    cape: { x: 67, y: 28 },
    gauntlet: { x: 68, y: 45 },
    grapnel: { x: 37, y: 45 },
    belt: { x: 49, y: 49 },
  },
  3: {
    cowl: { x: 50, y: 11 },
    cape: { x: 50, y: 31 },
    belt: { x: 50, y: 48 },
  },
};

function Gear() {
  const { locale } = useI18n();
  const text = (value: Bilingual) => value[locale];
  const [selectedId, setSelectedId] = useState("gauntlet");
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [bodyView, setBodyView] = useState(0);
  const [viewDimmed, setViewDimmed] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const turntableTimers = useRef<number[]>([]);
  const [vehicleId, setVehicleId] = useState("car");
  const [viewer, setViewer] = useState<{ plates: GearPlate[]; index: number } | null>(null);
  const selected = BODY_RECORDS.find((item) => item.id === selectedId) ?? SUIT_OVERVIEW;
  const focusPoint = focusedId ? (BODY_VIEW_HOTSPOTS[bodyView]?.[focusedId] ?? null) : null;
  const vehicle = VEHICLES.find((item) => item.id === vehicleId) ?? VEHICLES[0]!;
  useEffect(() => {
    return () => {
      turntableTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function transitionBodyView(next: number) {
    const clamped = Math.max(0, Math.min(BODY_TURNTABLE_VIEWS.length - 1, next));
    if (clamped === bodyView || viewDimmed) return;

    setFocusedId(null);
    setViewDimmed(true);

    const swapTimer = window.setTimeout(() => setBodyView(clamped), 90);
    const revealTimer = window.setTimeout(() => setViewDimmed(false), 190);
    turntableTimers.current.push(swapTimer, revealTimer);
  }

  useEffect(() => {
    function readHash() {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      if (BODY_RECORDS.some((item) => item.id === id)) setSelectedId(id);
      if (VEHICLES.some((item) => item.id === id)) setVehicleId(id);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, []);
  function select(
    id: string,
    kind: "body" | "vehicle",
    options: { focus?: boolean; scrollDetail?: boolean } = {},
  ) {
    if (kind === "body") {
      setSelectedId(id);
      const record = BODY_RECORDS.find((item) => item.id === id);
      setFocusedId(options.focus && record?.hotspot ? id : null);
    } else {
      setVehicleId(id);
    }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    if (
      kind === "body" &&
      options.scrollDetail !== false &&
      window.matchMedia("(max-width: 700px)").matches
    ) {
      requestAnimationFrame(() =>
        document.getElementById("gear-detail")?.scrollIntoView({ block: "start" }),
      );
    }
  }
  return (
    <main className="gear-page" data-manual-hash-scroll>
      <header className="gear-heading">
        <div>
          <p className="gear-eyebrow">{text(GEAR_COPY.eyebrow)} / EQUIPMENT</p>
          <h1>{text(GEAR_COPY.title)}</h1>
          <p className="gear-intro">{text(GEAR_COPY.intro)}</p>
        </div>
        <nav
          className="gear-section-links"
          aria-label={locale === "zh" ? "装备栏目" : "Equipment sections"}
        >
          <a href="#loadout">{text(GEAR_COPY.loadout)}</a>
          <a href="#vehicles">{text(GEAR_COPY.vehicles)}</a>
          <a href="#related">{text(GEAR_COPY.related)}</a>
        </nav>
      </header>
      <section id="loadout" className="gear-loadout" aria-label={text(GEAR_COPY.loadout)}>
        <nav className="gear-index" aria-label={text(GEAR_COPY.loadout)}>
          <p className="gear-eyebrow">01 / LOADOUT</p>
          <button
            className="gear-overview"
            type="button"
            aria-pressed={selectedId === "suit"}
            aria-controls="gear-detail"
            onClick={() => select("suit", "body")}
          >
            {text(GEAR_COPY.overview)}
          </button>
          <div className="gear-index-items">
            {LOADOUT.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedId === item.id}
                aria-controls="gear-detail"
                onClick={() => select(item.id, "body")}
              >
                <span className="gear-number">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{text(item.name)}</strong>
                  <small>{text(item.category)}</small>
                </span>
              </button>
            ))}
          </div>
        </nav>
        <figure className="gear-body">
          <div
            className="gear-body-stage"
            data-focused={focusPoint ? "true" : "false"}
            data-dimmed={viewDimmed ? "true" : "false"}
            onPointerDown={(event) => {
              if (focusPoint) return;
              dragStartX.current = event.clientX;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (dragStartX.current === null || focusPoint || viewDimmed) return;
              const delta = event.clientX - dragStartX.current;
              if (Math.abs(delta) < 46) return;
              transitionBodyView(bodyView + (delta < 0 ? 1 : -1));
              dragStartX.current = event.clientX;
            }}
            onPointerUp={() => {
              dragStartX.current = null;
            }}
            onPointerCancel={() => {
              dragStartX.current = null;
            }}
          >
            <div
              className="gear-body-pan"
              style={{
                transform: focusPoint
                  ? `translate(${50 - focusPoint.x}%, ${50 - focusPoint.y}%)`
                  : "translate(0, 0)",
              }}
            >
              <div
                className="gear-body-zoom"
                style={{
                  transformOrigin: focusPoint
                    ? `${focusPoint.x}% ${focusPoint.y}%`
                    : "50% 50%",
                }}
              >
                <img
                  key={BODY_TURNTABLE_VIEWS[bodyView].id}
                  className="gear-turntable-image"
                  src={BODY_TURNTABLE_VIEWS[bodyView].src}
                  alt={
                    locale === "zh"
                      ? `蝙蝠战衣 · ${BODY_TURNTABLE_VIEWS[bodyView].zh}`
                      : `Batsuit · ${BODY_TURNTABLE_VIEWS[bodyView].en}`
                  }
                  width="120"
                  height="185"
                  draggable={false}
                />
                <div className="gear-body-shade" />
                {LOADOUT.map((item, index) => {
                  const hotspot = BODY_VIEW_HOTSPOTS[bodyView]?.[item.id];
                  return hotspot ? (
                    <button
                      key={item.id}
                      type="button"
                      className="gear-hotspot"
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      aria-label={`${String(index + 1).padStart(2, "0")} · ${text(item.name)}`}
                      aria-pressed={selectedId === item.id}
                      aria-controls="gear-detail"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() =>
                        select(item.id, "body", {
                          focus: focusedId !== item.id,
                          scrollDetail: false,
                        })
                      }
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="gear-hotspot-label">{text(item.name)}</span>
                    </button>
                  ) : null;
                })}
              </div>
            </div>

            <div className="gear-view-controls">
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => transitionBodyView(bodyView - 1)}
                disabled={bodyView === 0 || viewDimmed}
                aria-label={locale === "zh" ? "上一视角" : "Previous angle"}
              >
                <ChevronLeft size={14} aria-hidden="true" />
              </button>
              <span>
                {locale === "zh"
                  ? BODY_TURNTABLE_VIEWS[bodyView].zh
                  : BODY_TURNTABLE_VIEWS[bodyView].en}
              </span>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => transitionBodyView(bodyView + 1)}
                disabled={bodyView === BODY_TURNTABLE_VIEWS.length - 1 || viewDimmed}
                aria-label={locale === "zh" ? "下一视角" : "Next angle"}
              >
                <ChevronRight size={14} aria-hidden="true" />
              </button>
            </div>

            {focusPoint ? (
              <button
                type="button"
                className="gear-focus-reset"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setFocusedId(null)}
                aria-label={locale === "zh" ? "返回全景" : "Return to full view"}
              >
                <Minimize2 size={14} aria-hidden="true" />
                <span>{locale === "zh" ? "返回全景" : "Full view"}</span>
              </button>
            ) : null}

            <div className="gear-body-note" aria-hidden={Boolean(focusPoint)}>
              <Crosshair size={13} aria-hidden="true" />
              {locale === "zh"
                ? "左右拖动切换视角 · 点击节点聚焦装备"
                : "Drag to rotate · Select a marker to focus"}
            </div>
          </div>
          <figcaption>
            {locale === "zh"
              ? "四视图原型 · 拖动或使用箭头切换视角"
              : "Four-view prototype · drag or use the arrows to change angle"}
          </figcaption>
        </figure>
        <div id="gear-detail" className="gear-detail">
          <EquipmentRecord
            key={selected.id}
            item={selected}
            onOpen={(plates, index) => setViewer({ plates, index })}
          />
        </div>
      </section>
      <section id="vehicles" className="gear-vehicles">
        <div className="gear-section-heading">
          <p className="gear-eyebrow">02 / VEHICLES</p>
          <h2>{text(GEAR_COPY.vehicles)}</h2>
          <p>{text(GEAR_COPY.vehicleIntro)}</p>
        </div>
        <nav className="gear-vehicle-tabs" aria-label={text(GEAR_COPY.vehicles)}>
          {VEHICLES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={vehicleId === item.id}
              aria-controls="vehicle-detail"
              onClick={() => select(item.id, "vehicle")}
            >
              <span className="gear-number">0{index + 1}</span>
              {text(item.name)}
            </button>
          ))}
        </nav>
        <div id="vehicle-detail">
          <EquipmentRecord
            key={vehicle.id}
            item={vehicle}
            wide
            onOpen={(plates, index) => setViewer({ plates, index })}
          />
        </div>
      </section>
      <section id="related" className="gear-related">
        <div className="gear-section-heading">
          <p className="gear-eyebrow">03 / WORKSHOP</p>
          <h2>{text(GEAR_COPY.related)}</h2>
          <p>{text(GEAR_COPY.relatedIntro)}</p>
        </div>
        <div className="gear-related-grid">
          {GEAR.filter((item) => RELATED_IDS.includes(item.id)).map((rawItem) => {
            const item = getLocalizedGear(rawItem, locale);
            return (
              <article id={item.id} key={item.id} className="gear-related-record">
                <img src={item.image} alt={item.imageAlt} loading="lazy" width="900" height="600" />
                <div>
                  <p className="gear-eyebrow">{item.nameEn}</p>
                  <h3>{item.name}</h3>
                  <p>{item.lede}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="gear-footer-links">
          <Link to="/gallery">{locale === "zh" ? "电影剧照" : "Film gallery"}</Link>
          <Link to="/recap">{locale === "zh" ? "回顾第一部" : "Revisit The Batman"}</Link>
        </div>
      </section>
      {viewer ? (
        <GearViewer
          plates={viewer.plates}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onIndex={(index) => setViewer({ ...viewer, index })}
        />
      ) : null}
    </main>
  );
}

function EquipmentRecord({
  item,
  wide = false,
  onOpen,
}: {
  item: ArchiveGear;
  wide?: boolean;
  onOpen: (plates: GearPlate[], index: number) => void;
}) {
  const { locale } = useI18n();
  const text = (value: Bilingual) => value[locale];
  const [plateIndex, setPlateIndex] = useState(0);
  const [tab, setTab] = useState<"film" | "design">("film");
  const current = item.plates[plateIndex]!;
  return (
    <article id={item.id} className={`gear-record${wide ? " gear-record-wide" : ""}`}>
      <div className="gear-record-heading">
        <p className="gear-eyebrow">2022 / {text(item.category)}</p>
        <h3 aria-live="polite">{text(item.name)}</h3>
        {locale === "zh" ? <p className="gear-english-name">{item.name.en}</p> : null}
        <p className="gear-summary">{text(item.summary)}</p>
      </div>
      <div className="gear-record-media">
        <button
          type="button"
          className="gear-plate"
          onClick={() => onOpen(item.plates, plateIndex)}
          aria-label={`${text(GEAR_COPY.enlarge)} · ${text(current.title)}`}
        >
          <img
            src={current.preview ?? current.src}
            alt={text(current.title)}
            loading="lazy"
            decoding="async"
          />
          <span className="gear-plate-expand">
            <Expand size={14} aria-hidden="true" />
            {text(GEAR_COPY.enlarge)}
          </span>
        </button>
        {item.plates.length > 1 ? (
          <div
            className="gear-plate-options"
            aria-label={locale === "zh" ? "选择图版" : "Select plate"}
          >
            {item.plates.map((p, index) => (
              <button
                key={p.src}
                type="button"
                aria-pressed={plateIndex === index}
                onClick={() => setPlateIndex(index)}
              >
                <span>0{index + 1}</span>
                {text(p.title)}
              </button>
            ))}
          </div>
        ) : null}
        <p className="gear-plate-caption">{text(current.caption)}</p>
      </div>
      <div className="gear-record-text">
        <div
          className="gear-record-tabs"
          aria-label={locale === "zh" ? "档案内容" : "Record content"}
        >
          {(["film", "design"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={tab === key}
              aria-controls={`record-text-${item.id}`}
              onClick={() => setTab(key)}
            >
              {text(GEAR_COPY[key])}
            </button>
          ))}
        </div>
        <div id={`record-text-${item.id}`} className="gear-record-prose">
          {(tab === "film"
            ? (item.filmDetails ?? [item.film])
            : (item.designDetails ?? [item.design])
          ).map((paragraph, index) => (
            <p key={`${item.id}-${tab}-${index}`}>{text(paragraph)}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function GearViewer({
  plates,
  index,
  onClose,
  onIndex,
}: {
  plates: GearPlate[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const { locale } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    root.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => previous?.focus();
  }, []);
  return (
    <div
      ref={root}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const buttons = Array.from(
          root.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [],
        );
        const first = buttons[0],
          last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <Lightbox
        locale={locale}
        items={plates.map((p) => ({
          src: p.src,
          title: p.title[locale],
          caption: p.caption[locale],
          source: "",
        }))}
        index={index}
        onClose={onClose}
        onIndex={onIndex}
      />
    </div>
  );
}
