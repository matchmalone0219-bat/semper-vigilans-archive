import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Expand, Crosshair, Minimize2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Lightbox } from "@/components/lightbox";
import { WORKSHOP } from "@/lib/gear-workshop";
import { TOOLS } from "@/lib/gear-tools";
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
import {
  BODY_TURNTABLE_VIEWS,
  BODY_VIEW_HOTSPOTS,
  BODY_VIEW_OUTLINES,
} from "@/lib/gear-turntable-assets";
import "@/components/gear-archive.css";

export const Route = createFileRoute("/gear")({
  head: () => ({ meta: [{ title: pageTitle("装备") }] }),
  component: Gear,
});
const BODY_TOOLS = ["light-flare", "magnetic-charge", "adrenaline-injector", "throwing-spikes"].map(
  (id) => TOOLS.find((item) => item.id === id)!,
);
const BODY_RECORDS = [SUIT_OVERVIEW, ...LOADOUT, ...BODY_TOOLS];
const BODY_MARKERS = [...LOADOUT, ...BODY_TOOLS];

function Gear() {
  const { locale } = useI18n();
  const text = (value: Bilingual) => value[locale];
  const [selectedId, setSelectedId] = useState("suit");
  const [dossierOpen, setDossierOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [bodyView, setBodyView] = useState(0);
  const [backCapeVisible, setBackCapeVisible] = useState(true);
  const [viewDimmed, setViewDimmed] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const bodyStage = useRef<HTMLDivElement>(null);
  const turntableTimers = useRef<number[]>([]);
  const [vehicleId, setVehicleId] = useState("car");
  const [workshopId, setWorkshopId] = useState("turbine");
  const [toolId, setToolId] = useState(TOOLS[0]!.id);
  const [viewer, setViewer] = useState<{ plates: GearPlate[]; index: number } | null>(null);
  const selected = BODY_RECORDS.find((item) => item.id === selectedId) ?? SUIT_OVERVIEW;
  const focusPoint = focusedId ? (BODY_VIEW_HOTSPOTS[bodyView]?.[focusedId] ?? null) : null;
  const bodyAngle = BODY_TURNTABLE_VIEWS[bodyView]!;
  const capeVisible = bodyView === 3 ? backCapeVisible : selectedId === "cape";
  const vehicle = VEHICLES.find((item) => item.id === vehicleId) ?? VEHICLES[0]!;
  const workshop = WORKSHOP.find((item) => item.id === workshopId) ?? WORKSHOP[0]!;
  const tool = TOOLS.find((item) => item.id === toolId) ?? TOOLS[0]!;
  const clearViewTimers = useCallback(() => {
    turntableTimers.current.forEach((timer) => window.clearTimeout(timer));
    turntableTimers.current = [];
  }, []);
  const selectBody = useCallback(
    (id: string, focus = false) => {
      clearViewTimers();
      setViewDimmed(false);
      setSelectedId(id);
      setFocusedId(focus && Object.values(BODY_VIEW_HOTSPOTS).some((view) => view[id]) ? id : null);
      if (id === "light-flare" || id === "sticky-bomb-gun") setBackCapeVisible(false);
      if (id === "cape") setBackCapeVisible(true);
      if (BODY_TOOLS.some((item) => item.id === id)) setToolId(id);
      setBodyView((current) =>
        BODY_VIEW_HOTSPOTS[current]?.[id]
          ? current
          : Math.max(
              0,
              BODY_TURNTABLE_VIEWS.findIndex((_, index) => BODY_VIEW_HOTSPOTS[index]?.[id]),
            ),
      );
    },
    [clearViewTimers],
  );
  function resetBodyFocus() {
    clearViewTimers();
    setFocusedId(null);
    requestAnimationFrame(() => {
      bodyStage.current
        ?.querySelector<SVGElement>('.gear-outline-hit[aria-pressed="true"]')
        ?.focus({ preventScroll: true });
    });
  }
  useEffect(() => {
    return clearViewTimers;
  }, [clearViewTimers]);

  function transitionBodyView(next: number) {
    const clamped = Math.max(0, Math.min(BODY_TURNTABLE_VIEWS.length - 1, next));
    if (clamped === bodyView || viewDimmed) return;

    clearViewTimers();
    setFocusedId(null);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBodyView(clamped);
      return;
    }
    setViewDimmed(true);

    const swapTimer = window.setTimeout(() => setBodyView(clamped), 60);
    const revealTimer = window.setTimeout(() => {
      setViewDimmed(false);
      turntableTimers.current = [];
    }, 140);
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
      clearViewTimers();
      setDossierOpen(false);
      setViewer(null);
      const bodyRecord = BODY_RECORDS.some((item) => item.id === id);
      if (bodyRecord) {
        selectBody(id, true);
        const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 360;
        turntableTimers.current.push(window.setTimeout(() => setDossierOpen(true), delay));
      } else if (!id || id === "loadout") selectBody("suit");
      else setFocusedId(null);
      if (VEHICLES.some((item) => item.id === id)) setVehicleId(id);
      if (WORKSHOP.some((item) => item.id === id)) setWorkshopId(id);
      if (TOOLS.some((item) => item.id === id)) setToolId(id);
      requestAnimationFrame(() => {
        document.getElementById(bodyRecord ? "loadout" : id)?.scrollIntoView({ block: "start" });
      });
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    window.addEventListener("popstate", readHash);
    return () => {
      window.removeEventListener("hashchange", readHash);
      window.removeEventListener("popstate", readHash);
    };
  }, [selectBody, clearViewTimers]);
  function select(id: string, kind: "body" | "vehicle" | "workshop" | "tool") {
    if (kind === "body") {
      selectBody(id, true);
      setIndexOpen(false);
      setDossierOpen(false);
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 360;
      turntableTimers.current.push(window.setTimeout(() => setDossierOpen(true), delay));
    } else if (kind === "vehicle") {
      setVehicleId(id);
    } else if (kind === "workshop") {
      setWorkshopId(id);
    } else {
      setToolId(id);
      if (BODY_TOOLS.some((item) => item.id === id)) {
        select(id, "body");
        bodyStage.current?.scrollIntoView({ block: "center" });
        return;
      }
    }
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    if (kind === "workshop" || kind === "tool") {
      requestAnimationFrame(() =>
        document
          .getElementById(kind === "tool" ? "tool-detail" : "workshop-detail")
          ?.scrollIntoView({ block: "start" }),
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
          <a href="#tools">{text(GEAR_COPY.tools)}</a>
          <a href="#vehicles">{text(GEAR_COPY.vehicles)}</a>
          <a href="#related">{text(GEAR_COPY.related)}</a>
        </nav>
      </header>
      <section id="loadout" className="gear-loadout" aria-label={text(GEAR_COPY.loadout)}>
        <nav className="gear-index" aria-label={text(GEAR_COPY.loadout)} data-open={indexOpen}>
          <button
            type="button"
            className="gear-index-toggle"
            aria-expanded={indexOpen}
            aria-controls="body-equipment-index"
            onClick={() => setIndexOpen(!indexOpen)}
          >
            {locale === "zh" ? "装备目录" : "Equipment index"}
          </button>
          <div id="body-equipment-index" hidden={!indexOpen}>
            <p className="gear-eyebrow">01 / LOADOUT</p>
            <button
              className="gear-overview"
              type="button"
              aria-pressed={selectedId === "suit"}
              aria-haspopup="dialog"
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
                  aria-haspopup="dialog"
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
          </div>
        </nav>
        <figure className="gear-body">
          <div
            ref={bodyStage}
            className="gear-body-stage"
            role="group"
            tabIndex={0}
            aria-label={
              locale === "zh"
                ? "战衣视角，使用左右方向键切换"
                : "Batsuit views, use left and right arrow keys to change angle"
            }
            data-focused={focusPoint ? "true" : "false"}
            data-dimmed={viewDimmed ? "true" : "false"}
            onKeyDown={(event) => {
              if (event.key === "Escape" && focusPoint) {
                event.preventDefault();
                event.stopPropagation();
                resetBodyFocus();
              } else if (!focusPoint && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
                event.preventDefault();
                transitionBodyView(bodyView + (event.key === "ArrowRight" ? 1 : -1));
              }
            }}
            onPointerDown={(event) => {
              if (focusPoint || viewDimmed || !event.isPrimary || event.button !== 0) return;
              dragStart.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!dragStart.current || focusPoint || viewDimmed) return;
              const dx = event.clientX - dragStart.current.x;
              const dy = event.clientY - dragStart.current.y;
              if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
                dragStart.current = null;
                return;
              }
              const threshold = Math.max(38, Math.min(64, event.currentTarget.clientWidth * 0.12));
              if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.25) return;
              dragStart.current = null;
              transitionBodyView(bodyView + (dx < 0 ? 1 : -1));
            }}
            onPointerUp={() => {
              dragStart.current = null;
            }}
            onPointerCancel={() => {
              dragStart.current = null;
            }}
            onLostPointerCapture={() => {
              dragStart.current = null;
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
                  transformOrigin: focusPoint ? `${focusPoint.x}% ${focusPoint.y}%` : "50% 50%",
                }}
              >
                <div
                  className="gear-turntable-frame"
                  style={{
                    left: `${(250 + bodyAngle.cropX - bodyAngle.centerX) / 5}%`,
                    width: `${bodyAngle.cropWidth / 5}%`,
                  }}
                >
                  <img
                    className="gear-turntable-image"
                    src={
                      capeVisible
                        ? "/media/gear-archive/turntable-cape.jpg"
                        : "/media/gear-archive/turntable-armor.jpg"
                    }
                    alt={
                      locale === "zh"
                        ? `蝙蝠战衣 · ${BODY_TURNTABLE_VIEWS[bodyView].zh}`
                        : `Batsuit · ${BODY_TURNTABLE_VIEWS[bodyView].en}`
                    }
                    width="1920"
                    height="1234"
                    style={{
                      width: `${(1200 / bodyAngle.cropWidth) * 100}%`,
                      transform: `translateX(-${(bodyAngle.cropX / 1200) * 100}%)`,
                    }}
                    draggable={false}
                  />
                </div>
                <div className="gear-body-shade" />
                <svg
                  className="gear-body-outlines"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-label={locale === "zh" ? "可探索的装备" : "Explore equipment"}
                >
                  {BODY_MARKERS.map((item) => {
                    const path = BODY_VIEW_OUTLINES[bodyView]?.[item.id];
                    const visible =
                      item.id === "light-flare" || item.id === "sticky-bomb-gun"
                        ? !capeVisible
                        : item.id === "cape"
                          ? capeVisible
                          : true;
                    if (!path || !visible || (focusPoint && focusedId !== item.id)) return null;
                    return (
                      <g
                        key={item.id}
                        className="gear-outline"
                        data-selected={selectedId === item.id}
                      >
                        <path
                          className="gear-outline-hit"
                          d={path}
                          role="button"
                          tabIndex={0}
                          aria-label={text(item.name)}
                          aria-pressed={selectedId === item.id}
                          aria-haspopup="dialog"
                          data-equipment={item.id}
                          onPointerDown={(event) => event.stopPropagation()}
                          onClick={() => select(item.id, "body")}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              event.stopPropagation();
                              select(item.id, "body");
                            }
                          }}
                        >
                          <title>{text(item.name)}</title>
                        </path>
                        <path
                          className="gear-outline-visible"
                          d={path}
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {bodyView === 3 && !focusPoint ? (
              <button
                type="button"
                className="gear-cape-toggle"
                aria-pressed={backCapeVisible}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setBackCapeVisible((visible) => !visible)}
              >
                {locale === "zh"
                  ? backCapeVisible
                    ? "隐藏披风"
                    : "显示披风"
                  : backCapeVisible
                    ? "Hide cape"
                    : "Show cape"}
              </button>
            ) : null}

            <div
              className="gear-view-controls"
              inert={Boolean(focusPoint)}
              aria-hidden={Boolean(focusPoint)}
            >
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
                onClick={resetBodyFocus}
                aria-label={locale === "zh" ? "返回全景" : "Return to full view"}
              >
                <Minimize2 size={14} aria-hidden="true" />
                <span>{locale === "zh" ? "返回全景" : "Full view"}</span>
              </button>
            ) : null}

            <div className="gear-body-note" aria-hidden={Boolean(focusPoint)}>
              <Crosshair size={13} aria-hidden="true" />
              {locale === "zh"
                ? "左右拖动切换视角 · 点击轮廓探索装备"
                : "Drag to rotate · Select an outline to explore"}
            </div>
          </div>
          <figcaption>
            {locale === "zh"
              ? "战衣四视图 · 拖动或使用箭头切换视角"
              : "Batsuit views · drag or use the arrows to change angle"}
          </figcaption>
        </figure>
      </section>
      <section id="tools" className="gear-tools">
        <div className="gear-section-heading">
          <p className="gear-eyebrow">02 / TOOLS</p>
          <h2>{text(GEAR_COPY.tools)}</h2>
          <p>{text(GEAR_COPY.toolIntro)}</p>
        </div>
        <nav className="gear-vehicle-tabs gear-tool-tabs" aria-label={text(GEAR_COPY.tools)}>
          {TOOLS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={toolId === item.id}
              aria-controls="tool-detail"
              onClick={() => select(item.id, "tool")}
            >
              <span className="gear-number">{String(index + 1).padStart(2, "0")}</span>
              {text(item.name)}
            </button>
          ))}
        </nav>
        <div id="tool-detail">
          <EquipmentRecord
            key={tool.id}
            item={tool}
            wide
            onOpen={(plates, index) => setViewer({ plates, index })}
          />
        </div>
      </section>
      <section id="vehicles" className="gear-vehicles">
        <div className="gear-section-heading">
          <p className="gear-eyebrow">03 / VEHICLES</p>
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
          <p className="gear-eyebrow">04 / WORKSHOP</p>
          <h2>{text(GEAR_COPY.related)}</h2>
          <p>{text(GEAR_COPY.relatedIntro)}</p>
        </div>
        <nav className="gear-related-grid" aria-label={text(GEAR_COPY.related)}>
          {WORKSHOP.map((item) => (
            <button
              key={item.id}
              type="button"
              className="gear-related-record"
              aria-pressed={workshopId === item.id}
              aria-controls="workshop-detail"
              onClick={() => select(item.id, "workshop")}
            >
              <img src={item.plates[0]!.src} alt="" loading="lazy" width="900" height="600" />
              <span className="gear-related-copy">
                <span className="gear-eyebrow">{text(item.category)}</span>
                <strong>{text(item.name)}</strong>
                <span className="gear-related-summary">{text(item.summary)}</span>
              </span>
            </button>
          ))}
        </nav>
        <div id="workshop-detail">
          <EquipmentRecord
            key={workshop.id}
            item={workshop}
            wide
            onOpen={(plates, index) => setViewer({ plates, index })}
          />
        </div>
        <div className="gear-footer-links">
          <Link to="/gallery">{locale === "zh" ? "电影剧照" : "Film gallery"}</Link>
          <Link to="/recap">{locale === "zh" ? "回顾第一部" : "Revisit The Batman"}</Link>
        </div>
      </section>
      {dossierOpen ? (
        <EquipmentDialog
          title={text(selected.name)}
          category={text(selected.category)}
          onClose={() => setDossierOpen(false)}
          imageOpen={Boolean(viewer)}
          onReturnFocus={() => {
            const target = bodyStage.current?.querySelector<SVGElement>(
              '.gear-outline-hit[aria-pressed="true"]',
            );
            if (target) target.focus({ preventScroll: true });
            else bodyStage.current?.focus({ preventScroll: true });
          }}
        >
          <EquipmentRecord
            key={selected.id}
            item={selected}
            sheet
            recordId={`body-${selected.id}`}
            onOpen={(plates, index) => setViewer({ plates, index })}
          />
          {viewer ? (
            <GearViewer
              plates={viewer.plates}
              index={viewer.index}
              onClose={() => setViewer(null)}
              onIndex={(index) => setViewer({ ...viewer, index })}
            />
          ) : null}
        </EquipmentDialog>
      ) : null}
      {viewer && !dossierOpen ? (
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

function EquipmentDialog({
  title,
  category,
  children,
  onClose,
  onReturnFocus,
  imageOpen,
}: {
  title: string;
  category: string;
  children: React.ReactNode;
  onClose: () => void;
  onReturnFocus: () => void;
  imageOpen: boolean;
}) {
  const { locale } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const overflow = document.body.style.overflow;
    const background: { element: HTMLElement; inert: boolean }[] = [];
    let ancestor: HTMLElement | null = root.current;
    while (ancestor && ancestor !== document.body) {
      for (const sibling of ancestor.parentElement?.children ?? []) {
        if (sibling instanceof HTMLElement && sibling !== ancestor) {
          background.push({ element: sibling, inert: sibling.inert });
        }
      }
      ancestor = ancestor.parentElement;
    }
    background.forEach(({ element }) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    root.current
      ?.querySelector<HTMLButtonElement>(".gear-dossier-close")
      ?.focus({ preventScroll: true });
    return () => {
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.body.style.overflow = overflow;
      onReturnFocus();
    };
  }, []);
  return (
    <div
      ref={root}
      onKeyDown={(event) => {
        if (imageOpen) return;
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }
        if (event.key === "Tab") {
          const buttons = Array.from(
            root.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [],
          ).filter((button) => button.getClientRects().length);
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
        }
      }}
    >
      <div className="gear-dossier-overlay" onClick={onClose} aria-hidden="true" />
      <div
        className="gear-dossier"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gear-dossier-title"
        aria-describedby="gear-dossier-description"
      >
        <header className="gear-dossier-bar">
          <div>
            <h2 id="gear-dossier-title">{title}</h2>
            <p id="gear-dossier-description">{category}</p>
          </div>
          <button
            type="button"
            className="gear-dossier-close"
            onClick={onClose}
            aria-label={locale === "zh" ? "返回人物" : "Return to Batman"}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

function EquipmentRecord({
  item,
  recordId = item.id,
  wide = false,
  sheet = false,
  onOpen,
}: {
  item: ArchiveGear;
  recordId?: string;
  wide?: boolean;
  sheet?: boolean;
  onOpen: (plates: GearPlate[], index: number) => void;
}) {
  const { locale } = useI18n();
  const text = (value: Bilingual) => value[locale];
  const [plateIndex, setPlateIndex] = useState(() =>
    sheet
      ? Math.max(
          0,
          item.plates.findIndex((p) => p.annotation),
        )
      : 0,
  );
  const [tab, setTab] = useState<"film" | "design">("film");
  const current = item.plates[plateIndex]!;
  return (
    <article
      id={recordId}
      className={`gear-record${wide ? " gear-record-wide" : ""}${sheet ? " gear-record-sheet" : ""}`}
    >
      <div className="gear-record-heading">
        <p className="gear-eyebrow">2022 / {text(item.category)}</p>
        <h3 aria-live="polite">{text(item.name)}</h3>
        {locale === "zh" ? <p className="gear-english-name">{item.name.en}</p> : null}
        <p className="gear-summary">{text(item.summary)}</p>
      </div>
      <div className="gear-record-media">
        {sheet ? (
          <AnnotatedPlate plate={current} onOpen={() => onOpen(item.plates, plateIndex)} />
        ) : (
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
        )}
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
              aria-controls={`record-text-${recordId}`}
              onClick={() => setTab(key)}
            >
              {text(key === "film" && item.usageLabel ? item.usageLabel : GEAR_COPY[key])}
            </button>
          ))}
        </div>
        <div id={`record-text-${recordId}`} className="gear-record-prose">
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

function AnnotatedPlate({ plate, onOpen }: { plate: GearPlate; onOpen: () => void }) {
  const { locale } = useI18n();
  const paper = useRef<HTMLButtonElement>(null);
  const reading = useRef<HTMLDialogElement>(null);
  const note = plate.annotation;
  return (
    <div className="gear-sheet">
      <div className="gear-sheet-page">
        <img src={plate.src} alt={plate.title[locale]} decoding="async" />
        {note ? (
          <div
            className="gear-sheet-cover"
            aria-hidden="true"
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              width: `${note.width}%`,
              height: `${note.height}%`,
            }}
          />
        ) : null}
        {note ? (
          <button
            ref={paper}
            type="button"
            className="gear-sheet-note"
            aria-label={locale === "zh" ? "放大说明纸条" : "Enlarge annotation"}
            aria-haspopup="dialog"
            onClick={() => reading.current?.showModal()}
            style={{
              left: `${note.x}%`,
              top: `${note.y}%`,
              width: `${note.width}%`,
              height: `${note.height}%`,
            }}
          >
            <span>{note.text[locale]}</span>
            <Expand className="gear-sheet-note-hint" size={12} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {note ? (
        <dialog
          ref={reading}
          className="gear-sheet-reading"
          aria-label={locale === "zh" ? "装备说明" : "Equipment annotation"}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === "Tab") {
              event.preventDefault();
              reading.current?.querySelector<HTMLButtonElement>("button")?.focus();
            }
          }}
          onClose={() => paper.current?.focus({ preventScroll: true })}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom
            ) event.currentTarget.close();
          }}
        >
          <header>
            <h3>{locale === "zh" ? "装备说明" : "Equipment annotation"}</h3>
            <button
              type="button"
              aria-label={locale === "zh" ? "收起说明纸条" : "Close annotation"}
              onClick={() => reading.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          <p>{note.text[locale]}</p>
        </dialog>
      ) : null}
      <button type="button" className="gear-sheet-enlarge" onClick={onOpen}>
        <Expand size={14} aria-hidden="true" />
        {locale === "zh" ? "查看原图" : "View original"}
      </button>
    </div>
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
