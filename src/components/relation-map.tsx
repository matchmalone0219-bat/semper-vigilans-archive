import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  Crosshair,
  ExternalLink,
  Heart,
  HelpCircle,
  Maximize2,
  Minimize2,
  RotateCcw,
  Shield,
  Skull,
  Swords,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  EDGES,
  FACTIONS,
  KIND_LABEL,
  NODE_MAP,
  NODES,
  PORTRAITS,
  STATUS_LABEL,
  edgesOf,
  nodesIn,
  type EdgeKind,
  type RelEdge,
  type RelNode,
} from "@/lib/relations";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";

const W = 1100;
const H = 800;
const NW = 188;
const NH = 72;
const PH = 72;
const MIN_SCALE = 0.55;
const MAX_SCALE = 2.4;

const STROKE: Record<EdgeKind, string> = {
  blood: "#f4f4f5",
  bond: "#e4e4e7",
  ally: "#34d399",
  foe: "#fb923c",
  kill: "#ef4444",
  rumor: "#a1a1aa",
};

const KIND_META: Record<
  EdgeKind,
  {
    label: string;
    icon: typeof Heart;
    badgeVariant: "default" | "official" | "set" | "blood" | "rumor";
    dotClass: string;
  }
> = {
  blood: {
    label: "血缘",
    icon: Heart,
    badgeVariant: "default",
    dotClass: "bg-zinc-100",
  },
  bond: {
    label: "羁绊 / 密友",
    icon: Heart,
    badgeVariant: "default",
    dotClass: "bg-zinc-300",
  },
  ally: {
    label: "盟友 / 合作",
    icon: Shield,
    badgeVariant: "official",
    dotClass: "bg-emerald-400",
  },
  foe: {
    label: "敌对 / 腐败",
    icon: Swords,
    badgeVariant: "set",
    dotClass: "bg-amber-400",
  },
  kill: {
    label: "致命冲突 / 谋杀",
    icon: Skull,
    badgeVariant: "blood",
    dotClass: "bg-blood",
  },
  rumor: {
    label: "潜在关联",
    icon: HelpCircle,
    badgeVariant: "rumor",
    dotClass: "bg-zinc-400",
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function nodeBox(n: RelNode) {
  return { x: n.x - NW / 2, y: n.y - NH / 2, w: NW, h: NH };
}

/** Where the visible line leaves a card, heading toward the other node. */
function edgeAnchor(from: RelNode, to: RelNode) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const tx = Math.abs(dx) < 0.01 ? Number.POSITIVE_INFINITY : NW / 2 / Math.abs(dx);
  const ty = Math.abs(dy) < 0.01 ? Number.POSITIVE_INFINITY : NH / 2 / Math.abs(dy);
  const t = Math.min(tx, ty);
  return { x: from.x + dx * t, y: from.y + dy * t };
}

function labelAnchor(a: RelNode, b: RelNode, dup: boolean) {
  const p1 = edgeAnchor(a, b);
  const p2 = edgeAnchor(b, a);
  let x = (p1.x + p2.x) / 2;
  let y = (p1.y + p2.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dx) >= Math.abs(dy)) {
    y = Math.min(a.y, b.y) - NH / 2 - (dup ? 22 : 9);
  } else if (dup) {
    x += 16;
  }
  return { x, y };
}

/** SVG Topology Canvas */
function RelationSvg({
  lit,
  active,
  activeEdge,
  hoveredEdge,
  activeKind,
  onSelectNode,
  onSelectEdge,
  onHoverEdge,
}: {
  lit: { ids: Set<string>; edgeIdx: Set<number> } | null;
  active: string | null;
  activeEdge: RelEdge | null;
  hoveredEdge: RelEdge | null;
  activeKind: EdgeKind | null;
  onSelectNode: (id: string) => void;
  onSelectEdge: (edge: RelEdge | null) => void;
  onHoverEdge: (edge: RelEdge | null) => void;
}) {
  const grayFilterId = useId();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="size-full select-none"
      role="img"
      aria-label="哥谭人物关系拓扑图"
    >
      <defs>
        <filter id={grayFilterId}>
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="var(--color-blood)" floodOpacity="0.85" />
        </filter>
        <pattern id="rel-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-fg/5" />
        </pattern>
      </defs>

      {/* Background Subtle Noir Grid */}
      <rect width={W} height={H} fill="url(#rel-grid)" />

      {/* Factions Territory Labels */}
      {FACTIONS.map((f) => (
        <g key={f.id} className="pointer-events-none">
          <text
            x={f.x}
            y={f.y}
            fill="var(--color-blood)"
            fontSize="12"
            letterSpacing="0.28em"
            fontFamily="var(--font-display)"
            fontWeight="bold"
            className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            {f.label}
          </text>
          <line
            x1={f.x}
            y1={f.y + 6}
            x2={f.x + f.label.length * 16}
            y2={f.y + 6}
            stroke="var(--color-blood)"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Relationship Edges */}
      {EDGES.map((e, i) => {
        const a = NODE_MAP[e.a];
        const b = NODE_MAP[e.b];
        if (!a || !b) return null;

        const isEdgeActive =
          activeEdge &&
          ((activeEdge.a === e.a && activeEdge.b === e.b) ||
            (activeEdge.a === e.b && activeEdge.b === e.a));

        const isEdgeHovered =
          hoveredEdge &&
          ((hoveredEdge.a === e.a && hoveredEdge.b === e.b) ||
            (hoveredEdge.a === e.b && hoveredEdge.b === e.a));

        const matchesKind = !activeKind || e.kind === activeKind;
        const matchesLit = !lit || lit.edgeIdx.has(i);
        const on = matchesKind && (isEdgeActive || isEdgeHovered || matchesLit);
        const dashed = e.kind === "rumor" || e.kind === "foe";

        const p1 = edgeAnchor(a, b);
        const p2 = edgeAnchor(b, a);

        return (
          <g
            key={`line-${e.a}-${e.b}-${e.label}-${i}`}
            className="transition-all duration-200"
            opacity={on ? 1 : 0.08}
          >
            {/* Wide transparent hit area for easy tapping/hovering */}
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="transparent"
              strokeWidth="24"
              className="cursor-pointer"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={(ev) => {
                ev.stopPropagation();
                onSelectEdge(isEdgeActive ? null : e);
              }}
              onPointerEnter={() => onHoverEdge(e)}
              onPointerLeave={() => onHoverEdge(null)}
            />

            {/* Visible styled line */}
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={isEdgeActive || isEdgeHovered ? "var(--color-blood)" : STROKE[e.kind]}
              strokeWidth={
                isEdgeActive || isEdgeHovered
                  ? 3.6
                  : e.kind === "kill"
                    ? 2.2
                    : 1.2
              }
              strokeDasharray={dashed ? "5 4" : undefined}
              filter={isEdgeActive ? "url(#edge-glow)" : undefined}
              className="pointer-events-none transition-all duration-150"
            />
          </g>
        );
      })}

      {/* Character Nodes */}
      {NODES.map((n) => {
        const box = nodeBox(n);
        const pic = PORTRAITS[n.id];
        const muted = n.status === "dead" || n.status === "rumor";
        const selected = active === n.id;
        const isConnectedToActiveEdge =
          activeEdge && (activeEdge.a === n.id || activeEdge.b === n.id);

        const matchesLit = !lit || lit.ids.has(n.id);
        const matchesEdge = Boolean(isConnectedToActiveEdge);
        const on = (activeEdge ? matchesEdge : matchesLit) && (!activeKind || matchesLit);

        const edgeCount = edgesOf(n.id).length;

        return (
          <g
            key={n.id}
            opacity={on ? 1 : 0.16}
            className="cursor-pointer transition-opacity duration-150"
            onPointerDown={(ev) => ev.stopPropagation()}
            onClick={() => onSelectNode(n.id)}
          >
            {/* Card Background Container */}
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              fill="var(--color-bg)"
              stroke={
                selected || isConnectedToActiveEdge
                  ? "var(--color-blood)"
                  : "var(--color-border)"
              }
              strokeWidth={selected ? 2.2 : isConnectedToActiveEdge ? 1.8 : 1}
              className="transition-colors duration-150"
            />

            {/* Tactical Corner Brackets for Selected State */}
            {(selected || isConnectedToActiveEdge) && (
              <g stroke="var(--color-blood)" strokeWidth="2" fill="none" className="pointer-events-none">
                <path d={`M ${box.x} ${box.y + 10} L ${box.x} ${box.y} L ${box.x + 10} ${box.y}`} />
                <path d={`M ${box.x + box.w - 10} ${box.y} L ${box.x + box.w} ${box.y} L ${box.x + box.w} ${box.y + 10}`} />
                <path d={`M ${box.x + box.w} ${box.y + box.h - 10} L ${box.x + box.w} ${box.y + box.h} L ${box.x + box.w - 10} ${box.y + box.h}`} />
                <path d={`M ${box.x + 10} ${box.y + box.h} L ${box.x} ${box.y + box.h} L ${box.x} ${box.y + box.h - 10}`} />
              </g>
            )}

            {/* Character Portrait */}
            {pic ? (
              <image
                href={pic.src}
                x={box.x}
                y={box.y}
                width={PH}
                height={NH}
                preserveAspectRatio="xMidYMid slice"
                filter={muted ? `url(#${grayFilterId})` : undefined}
              />
            ) : null}

            {/* Name */}
            <text
              x={box.x + PH + 10}
              y={n.y - 4}
              fill="var(--color-fg)"
              fontSize="13"
              fontWeight="800"
              fontFamily="var(--font-sans)"
              textDecoration={n.status === "dead" ? "line-through" : undefined}
            >
              {n.name}
            </text>

            {/* Role / Subtitle */}
            <text
              x={box.x + PH + 10}
              y={n.y + 11}
              fill="var(--color-faint)"
              fontSize="9.5"
              fontFamily="var(--font-display)"
              letterSpacing="0.04em"
            >
              {n.sub.split("/")[0]?.trim()}
            </text>

            {/* Status & Connection Count Badge */}
            <text
              x={box.x + PH + 10}
              y={n.y + 24}
              fill={selected ? "var(--color-blood)" : "var(--color-faint)"}
              fontSize="9"
              fontFamily="var(--font-mono)"
              letterSpacing="0.06em"
            >
              {STATUS_LABEL[n.status]} · {edgeCount}联
            </text>
          </g>
        );
      })}

      {/* Edge Labels */}
      {EDGES.map((e, i) => {
        const a = NODE_MAP[e.a];
        const b = NODE_MAP[e.b];
        if (!a || !b) return null;

        const isEdgeActive =
          activeEdge &&
          ((activeEdge.a === e.a && activeEdge.b === e.b) ||
            (activeEdge.a === e.b && activeEdge.b === e.a));

        const isEdgeHovered =
          hoveredEdge &&
          ((hoveredEdge.a === e.a && hoveredEdge.b === e.b) ||
            (hoveredEdge.a === e.b && hoveredEdge.b === e.a));

        const matchesKind = !activeKind || e.kind === activeKind;
        const matchesLit = !lit || lit.edgeIdx.has(i);
        const on = matchesKind && (isEdgeActive || isEdgeHovered || matchesLit);
        const dup = EDGES.findIndex((x) => x.a === e.a && x.b === e.b) !== i;
        const pos = labelAnchor(a, b, dup);
        const tw = e.label.length * 8.2 + 14;

        return (
          <g
            key={`label-${e.a}-${e.b}-${e.label}-${i}`}
            opacity={on ? 1 : 0.08}
            className="cursor-pointer transition-opacity duration-150"
            onPointerDown={(ev) => ev.stopPropagation()}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelectEdge(isEdgeActive ? null : e);
            }}
            onPointerEnter={() => onHoverEdge(e)}
            onPointerLeave={() => onHoverEdge(null)}
          >
            <rect
              x={pos.x - tw / 2}
              y={pos.y - 10}
              width={tw}
              height={18}
              fill={isEdgeActive ? "var(--color-blood)" : "var(--color-surface)"}
              stroke={isEdgeActive || isEdgeHovered ? "var(--color-blood)" : "var(--color-border)"}
              strokeWidth={isEdgeActive ? 1.5 : 0.8}
            />
            <text
              x={pos.x}
              y={pos.y + 3}
              textAnchor="middle"
              fill={
                isEdgeActive
                  ? "var(--color-bg)"
                  : e.kind === "kill" || e.kind === "foe"
                    ? "var(--color-blood)"
                    : "var(--color-fg)"
              }
              fontSize="10.5"
              fontWeight={isEdgeActive ? "800" : "600"}
              fontFamily="var(--font-sans)"
            >
              {e.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function RelationMap() {
  const [active, setActive] = useState<string | null>("bruce");
  const [activeFaction, setActiveFaction] = useState<string | null>(null);
  const [activeKind, setActiveKind] = useState<EdgeKind | null>(null);
  const [activeEdge, setActiveEdge] = useState<RelEdge | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<RelEdge | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  // Gesture & Viewport States
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const offsetRef = useRef(offset);
  offsetRef.current = offset;
  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const viewportRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    distance: number;
    scale: number;
    midpoint: { x: number; y: number };
    offset: { x: number; y: number };
  } | null>(null);
  const drag = useRef<{ x: number; y: number; offset: { x: number; y: number } } | null>(null);
  const hasMoved = useRef<boolean>(false);

  // Smooth Focus to Node
  const focusNode = useCallback(
    (nodeId: string, customScale = 1.2) => {
      const node = NODE_MAP[nodeId];
      if (!node) return;
      const targetScale = clamp(customScale, MIN_SCALE, MAX_SCALE);
      const newOffsetX = -(node.x - W / 2) * targetScale;
      const newOffsetY = -(node.y - H / 2) * targetScale;
      setScale(targetScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    },
    [],
  );

  const resetView = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const zoomBy = useCallback((factor: number) => {
    setScale((current) => clamp(current * factor, MIN_SCALE, MAX_SCALE));
  }, []);

  // Multi-touch & Pointer Gesture Handlers
  function pointerDistance() {
    const pts = [...pointers.current.values()];
    if (pts.length < 2) return 0;
    return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }

  function pointerMidpoint() {
    const pts = [...pointers.current.values()];
    return {
      x: (pts[0].x + pts[1].x) / 2,
      y: (pts[0].y + pts[1].y) / 2,
    };
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    hasMoved.current = false;

    if (pointers.current.size === 1) {
      drag.current = { x: event.clientX, y: event.clientY, offset: offsetRef.current };
      setIsDragging(true);
    } else if (pointers.current.size === 2) {
      drag.current = null;
      gesture.current = {
        distance: pointerDistance(),
        scale: scaleRef.current,
        midpoint: pointerMidpoint(),
        offset: offsetRef.current,
      };
      setIsDragging(true);
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    // Handle 2-finger pinch zoom + pan
    if (pointers.current.size === 2 && gesture.current) {
      hasMoved.current = true;
      const dist = pointerDistance();
      if (gesture.current.distance > 0) {
        const nextScale = clamp(
          gesture.current.scale * (dist / gesture.current.distance),
          MIN_SCALE,
          MAX_SCALE,
        );
        const midpoint = pointerMidpoint();
        setScale(nextScale);
        setOffset({
          x: gesture.current.offset.x + midpoint.x - gesture.current.midpoint.x,
          y: gesture.current.offset.y + midpoint.y - gesture.current.midpoint.y,
        });
      }
      return;
    }

    // Handle 1-finger / mouse pan
    if (pointers.current.size === 1 && drag.current) {
      const dx = event.clientX - drag.current.x;
      const dy = event.clientY - drag.current.y;
      if (Math.hypot(dx, dy) > 4) {
        hasMoved.current = true;
      }
      setOffset({
        x: drag.current.offset.x + dx,
        y: drag.current.offset.y + dy,
      });
    }
  }

  function endPointer(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    gesture.current = null;
    const remaining = [...pointers.current.values()][0];
    drag.current = remaining ? { ...remaining, offset: offsetRef.current } : null;
    if (pointers.current.size === 0) {
      setIsDragging(false);
    }
  }

  function onWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault();
    const next = clamp(scale * (event.deltaY < 0 ? 1.14 : 0.88), MIN_SCALE, MAX_SCALE);
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

  function onDoubleClick(event: ReactPointerEvent<HTMLDivElement>) {
    if (scale > 1.25) {
      resetView();
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      const point = {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
      };
      const next = 1.45;
      const ratio = next / scale;
      setOffset((current) => ({
        x: point.x - (point.x - current.x) * ratio,
        y: point.y - (point.y - current.y) * ratio,
      }));
      setScale(next);
    }
  }

  // Handle ESC key for fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const selectNode = useCallback(
    (id: string, autoFocus = false) => {
      setActive(id);
      setActiveEdge(null);
      setShowMobileDrawer(true);
      if (autoFocus) {
        focusNode(id);
      }
    },
    [focusNode],
  );

  // Compute active highlighting
  const lit = useMemo(() => {
    if (activeEdge) {
      const ids = new Set<string>([activeEdge.a, activeEdge.b]);
      const edgeIdx = new Set<number>();
      EDGES.forEach((e, i) => {
        if (
          (e.a === activeEdge.a && e.b === activeEdge.b) ||
          (e.a === activeEdge.b && e.b === activeEdge.a)
        ) {
          edgeIdx.add(i);
        }
      });
      return { ids, edgeIdx };
    }

    if (active) {
      const ids = new Set<string>([active]);
      const edgeIdx = new Set<number>();
      EDGES.forEach((e, i) => {
        const matchesKind = !activeKind || e.kind === activeKind;
        if (matchesKind && (e.a === active || e.b === active)) {
          ids.add(e.a);
          ids.add(e.b);
          edgeIdx.add(i);
        }
      });
      return { ids, edgeIdx };
    }

    if (activeFaction) {
      const factionNodes = nodesIn(activeFaction).map((n) => n.id);
      const ids = new Set<string>(factionNodes);
      const edgeIdx = new Set<number>();
      EDGES.forEach((e, i) => {
        const matchesKind = !activeKind || e.kind === activeKind;
        if (matchesKind && (ids.has(e.a) || ids.has(e.b))) {
          ids.add(e.a);
          ids.add(e.b);
          edgeIdx.add(i);
        }
      });
      return { ids, edgeIdx };
    }

    if (activeKind) {
      const ids = new Set<string>();
      const edgeIdx = new Set<number>();
      EDGES.forEach((e, i) => {
        if (e.kind === activeKind) {
          ids.add(e.a);
          ids.add(e.b);
          edgeIdx.add(i);
        }
      });
      return { ids, edgeIdx };
    }

    return null;
  }, [active, activeEdge, activeFaction, activeKind]);

  const visibleNodes = useMemo(() => {
    if (!activeFaction) return NODES;
    return nodesIn(activeFaction);
  }, [activeFaction]);

  const person = active ? NODE_MAP[active] : null;
  const related = person ? edgesOf(person.id) : [];
  const portrait = person ? PORTRAITS[person.id] : null;

  // Active Edge details
  const edgeDetail = activeEdge ?? hoveredEdge;
  const edgeNodeA = edgeDetail ? NODE_MAP[edgeDetail.a] : null;
  const edgeNodeB = edgeDetail ? NODE_MAP[edgeDetail.b] : null;
  const edgePortraitA = edgeDetail ? PORTRAITS[edgeDetail.a] : null;
  const edgePortraitB = edgeDetail ? PORTRAITS[edgeDetail.b] : null;

  // Canvas Viewport Component
  const canvasContent = (
    <div
      ref={viewportRef}
      className={cn(
        "relative flex h-full w-full select-none touch-none items-center justify-center overflow-hidden bg-[#07080b]",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onDoubleClick={onDoubleClick}
      role="application"
      aria-label="哥谭人物关系网络可漫游拓扑图"
    >
      {/* Transform Container */}
      <div
        className="relative shrink-0 pointer-events-auto"
        style={{
          width: W,
          height: H,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.12s cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <RelationSvg
          lit={lit}
          active={active}
          activeEdge={activeEdge}
          hoveredEdge={hoveredEdge}
          activeKind={activeKind}
          onSelectNode={(id) => selectNode(id, false)}
          onSelectEdge={(edge) => setActiveEdge(edge)}
          onHoverEdge={(edge) => setHoveredEdge(edge)}
        />
      </div>

      {/* Viewport Floating HUD Controls */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 border border-fg/15 bg-bg/85 p-1.5 backdrop-blur-md shadow-xl sm:right-4 sm:top-4">
        <button
          type="button"
          onClick={() => zoomBy(1.18)}
          className="grid size-8 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none"
          title="放大画布 (+)"
          aria-label="放大"
        >
          <ZoomIn className="size-4" />
        </button>
        <span className="text-center font-mono text-[11px] font-bold text-fg/80">
          {Math.round(scale * 100)}%
        </span>
        <button
          type="button"
          onClick={() => zoomBy(0.85)}
          className="grid size-8 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none"
          title="缩小画布 (-)"
          aria-label="缩小"
        >
          <ZoomOut className="size-4" />
        </button>
        <div className="my-0.5 h-px bg-fg/10" />
        {active ? (
          <button
            type="button"
            onClick={() => focusNode(active)}
            className="grid size-8 place-items-center text-muted hover:bg-elevated hover:text-blood focus-visible:outline-none"
            title="对焦当前人物"
            aria-label="对焦当前人物"
          >
            <Crosshair className="size-4" />
          </button>
        ) : null}
        <button
          type="button"
          onClick={resetView}
          className="grid size-8 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none"
          title="重置居中"
          aria-label="重置居中"
        >
          <RotateCcw className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          className="grid size-8 place-items-center text-muted hover:bg-elevated hover:text-fg focus-visible:outline-none"
          title={isFullscreen ? "退出全屏" : "全屏检视"}
          aria-label={isFullscreen ? "退出全屏" : "全屏检视"}
        >
          {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </button>
      </div>

      {/* Top Left Detective Compass HUD */}
      <div className="absolute left-3 top-3 pointer-events-none z-10 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase sm:left-4 sm:top-4">
        <span className="size-1.5 rounded-full bg-blood animate-pulse" />
        <span>GCPD INTEL // TOPOLOGY NET</span>
        <span className="hidden text-fg/20 sm:inline">|</span>
        <span className="hidden text-muted/70 sm:inline">双指缩放 · 拖拽漫游 · 双击对焦</span>
      </div>

      {/* Active Edge Relationship HUD Card */}
      {edgeDetail && edgeNodeA && edgeNodeB ? (
        <div className="absolute left-3 right-3 top-12 z-30 mx-auto max-w-lg border border-blood/50 bg-bg/95 p-3.5 backdrop-blur-md shadow-2xl sm:left-auto sm:right-16 sm:top-4 sm:w-96 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-start justify-between gap-2 border-b border-fg/10 pb-2">
            <div className="flex items-center gap-1.5">
              <Badge variant={KIND_META[edgeDetail.kind].badgeVariant} size="sm">
                {KIND_META[edgeDetail.kind].label}
              </Badge>
              <span className="font-sans text-xs font-black text-blood">
                {edgeDetail.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveEdge(null)}
              className="text-faint hover:text-fg"
              aria-label="关闭关系卡片"
            >
              <X className="size-3.5" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => selectNode(edgeNodeA.id, true)}
              className="flex items-center gap-2 group text-left min-w-0"
            >
              {edgePortraitA ? (
                <img src={edgePortraitA.src} alt="" className="size-9 object-cover shrink-0 border border-fg/10" />
              ) : null}
              <div className="truncate">
                <span className="block truncate font-sans text-xs font-bold group-hover:text-blood">
                  {edgeNodeA.name}
                </span>
                <span className="block text-[10px] text-faint truncate">{edgeNodeA.sub}</span>
              </div>
            </button>

            <span className="text-xs text-blood font-mono shrink-0">⟷</span>

            <button
              type="button"
              onClick={() => selectNode(edgeNodeB.id, true)}
              className="flex items-center gap-2 group text-right min-w-0 justify-end"
            >
              <div className="truncate">
                <span className="block truncate font-sans text-xs font-bold group-hover:text-blood">
                  {edgeNodeB.name}
                </span>
                <span className="block text-[10px] text-faint truncate">{edgeNodeB.sub}</span>
              </div>
              {edgePortraitB ? (
                <img src={edgePortraitB.src} alt="" className="size-9 object-cover shrink-0 border border-fg/10" />
              ) : null}
            </button>
          </div>

          {edgeDetail.desc ? (
            <p className="mt-2.5 text-pretty text-xs leading-relaxed text-muted border-t border-fg/5 pt-2">
              {edgeDetail.desc}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Floating Mobile Bottom Drawer for Active Node */}
      {person && (showMobileDrawer || isFullscreen) ? (
        <div className="absolute inset-x-2 bottom-2 z-30 border border-fg/20 bg-bg/95 p-3 backdrop-blur-md shadow-2xl sm:hidden animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {portrait ? (
                <img
                  src={portrait.src}
                  alt={person.name}
                  className={cn(
                    "size-12 shrink-0 object-cover border border-fg/10",
                    (person.status === "dead" || person.status === "rumor") && "grayscale",
                  )}
                />
              ) : null}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm font-black truncate">{person.name}</span>
                  <Badge variant="outline" size="sm">
                    {STATUS_LABEL[person.status]}
                  </Badge>
                </div>
                <p className="text-[11px] text-faint truncate">{person.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/people/"
                params={{ id: person.id }}
                className="inline-flex items-center gap-1 bg-blood/20 text-blood border border-blood/40 px-2 py-1 text-[11px] font-bold"
              >
                档案
                <ExternalLink className="size-2.5" />
              </Link>
              <button
                type="button"
                onClick={() => setShowMobileDrawer(false)}
                className="p-1 text-faint hover:text-fg"
                aria-label="收起抽屉"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Quick relation chips */}
          <div className="mt-2.5 flex snap-x gap-1.5 overflow-x-auto border-t border-fg/10 pt-2 pb-0.5">
            {related.slice(0, 6).map((e) => {
              const other = NODE_MAP[e.other];
              if (!other) return null;
              return (
                <button
                  key={`quick-${e.other}-${e.label}`}
                  type="button"
                  onClick={() => selectNode(other.id, true)}
                  className="flex shrink-0 items-center gap-1 border border-fg/10 bg-surface/80 px-2 py-0.5 text-[10px] text-muted hover:border-blood hover:text-fg"
                >
                  <span
                    className={cn(
                      "font-semibold",
                      e.kind === "kill" || e.kind === "foe" ? "text-blood" : "text-fg/80",
                    )}
                  >
                    {e.label}
                  </span>
                  <span>{other.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <p className="max-w-2xl text-pretty text-sm text-muted">
        全景交互式人物情报拓扑图。支持移动端触控双指捏合缩放、单指平移漫游；点击人物可高亮关联子网并快速居中，点击关系连线可探查剧情恩怨始末。
      </p>

      {/* Dual Dimension Filter Bar */}
      <div className="mt-5 space-y-3">
        {/* 1. Faction Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase mr-1 flex items-center gap-1">
            <Users className="size-3 text-blood" />
            阵营:
          </span>
          <button
            type="button"
            onClick={() => {
              setActiveFaction(null);
              if (!active) setActive("bruce");
            }}
            className={cn(
              "px-2.5 py-1 font-display text-xs tracking-[0.14em] uppercase transition-colors",
              !activeFaction
                ? "bg-blood text-fg font-bold shadow-[0_0_10px_-2px_var(--color-blood)]"
                : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
            )}
          >
            全部 ({NODES.length})
          </button>
          {FACTIONS.map((f) => {
            const count = nodesIn(f.id).length;
            const isSelected = activeFaction === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  const next = isSelected ? null : f.id;
                  setActiveFaction(next);
                  if (next) {
                    const firstNode = nodesIn(next)[0];
                    if (firstNode) selectNode(firstNode.id, true);
                  }
                }}
                className={cn(
                  "px-2.5 py-1 font-display text-xs tracking-[0.14em] uppercase transition-colors",
                  isSelected
                    ? "bg-blood text-fg font-bold shadow-[0_0_10px_-2px_var(--color-blood)]"
                    : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
                )}
              >
                {f.label} ({count})
              </button>
            );
          })}
        </div>

        {/* 2. Relationship Kind Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-fg/10">
          <span className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase mr-1 flex items-center gap-1">
            <Swords className="size-3 text-muted" />
            性质:
          </span>
          <button
            type="button"
            onClick={() => setActiveKind(null)}
            className={cn(
              "px-2 py-0.5 font-sans text-xs transition-colors",
              !activeKind
                ? "border border-fg/60 bg-surface font-bold text-fg"
                : "border border-fg/10 text-muted hover:border-fg/30 hover:text-fg",
            )}
          >
            全部关系 ({EDGES.length})
          </button>
          {(Object.keys(KIND_META) as EdgeKind[]).map((kind) => {
            const meta = KIND_META[kind];
            const count = EDGES.filter((e) => e.kind === kind).length;
            const isSelected = activeKind === kind;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => setActiveKind(isSelected ? null : kind)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5 text-xs transition-colors border",
                  isSelected
                    ? "border-blood bg-blood/20 font-bold text-fg ring-1 ring-blood/50"
                    : "border-fg/10 text-muted hover:border-fg/30 hover:text-fg",
                )}
              >
                <span className={cn("size-1.5 rounded-full", meta.dotClass)} />
                {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Canvas Box & Fullscreen Modal */}
      <div
        className={cn(
          isFullscreen
            ? "fixed inset-0 z-50 flex flex-col bg-[#08090c]"
            : "mt-6 border border-fg/15 shadow-2xl relative",
        )}
      >
        {isFullscreen && (
          <div className="flex items-center justify-between border-b border-fg/15 bg-bg/90 px-4 py-3 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="size-2 rounded-full bg-blood animate-pulse" />
              <h2 className="font-sans text-base font-black tracking-tight text-fg">
                GCPD 哥谭关系全景战术大盘
              </h2>
              <span className="hidden text-xs text-faint sm:inline">
                [按 ESC 键或右上角退出全屏]
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-1 border border-fg/20 px-2.5 py-1 text-xs text-muted hover:border-blood hover:text-blood"
            >
              <Minimize2 className="size-3.5" />
              退出全屏
            </button>
          </div>
        )}

        <div
          className={cn(
            isFullscreen
              ? "relative flex-1 overflow-hidden"
              : "h-[58svh] min-h-[420px] max-h-[720px] w-full",
          )}
        >
          {canvasContent}
        </div>
      </div>

      {/* Character Quick-Select Horizontal Ribbon */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-display font-semibold tracking-[0.16em] text-faint uppercase">
            人物快速对焦 ({visibleNodes.length})
          </span>
          <span className="text-[11px] text-faint">点击头像即时在拓扑图中居中</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 snap-x">
          {visibleNodes.map((n) => {
            const isSel = active === n.id;
            const pic = PORTRAITS[n.id];
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => selectNode(n.id, true)}
                className={cn(
                  "flex flex-col items-center shrink-0 w-24 p-2.5 border transition-all text-center snap-start",
                  isSel
                    ? "border-blood bg-surface shadow-md ring-1 ring-blood"
                    : "border-fg/10 bg-surface/40 hover:border-fg/30",
                )}
              >
                <div className="relative size-14 overflow-hidden bg-elevated">
                  {pic ? (
                    <img
                      src={pic.src}
                      alt={n.name}
                      className={cn(
                        "size-full object-cover",
                        (n.status === "dead" || n.status === "rumor") && "grayscale",
                      )}
                    />
                  ) : (
                    <div className="grid size-full place-items-center font-display text-xs text-muted">
                      {n.name.slice(0, 2)}
                    </div>
                  )}
                  {n.status === "dead" ? (
                    <span className="absolute inset-x-0 bottom-0 bg-black/80 py-0.5 text-[8px] text-faint">
                      已故
                    </span>
                  ) : null}
                </div>
                <span className="mt-2 font-sans text-xs font-bold truncate w-full text-fg">
                  {n.name}
                </span>
                <span className="mt-0.5 text-[10px] text-faint truncate w-full scale-95">
                  {STATUS_LABEL[n.status]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Person Detailed Dossier Card */}
      {person ? (
        <div
          id={`person-${person.id}`}
          className="mt-8 scroll-mt-24 border border-fg/10 bg-bg p-5 sm:p-6 crimson-glow-card"
        >
          <div className="flex flex-col gap-5 sm:flex-row">
            {portrait ? (
              <div className="shrink-0">
                <img
                  src={portrait.src}
                  alt={person.name}
                  className={cn(
                    "aspect-square w-36 object-cover sm:w-44 border border-fg/10",
                    (person.status === "dead" || person.status === "rumor") && "grayscale",
                  )}
                />
                {portrait.note ? (
                  <p className="mt-2 max-w-44 text-xs leading-relaxed text-faint">
                    {portrait.note}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-sm font-semibold tracking-[0.22em] text-blood uppercase">
                  {person.sub}
                  {person.actor ? ` · ${person.actor}` : null}
                </p>
                <button
                  type="button"
                  onClick={() => focusNode(person.id, 1.35)}
                  className="inline-flex items-center gap-1 text-xs text-muted hover:text-blood border border-fg/10 px-2 py-1"
                >
                  <Crosshair className="size-3.5" />
                  在拓扑图中对焦
                </button>
              </div>

              <h3 className="mt-2 font-sans text-2xl font-black tracking-tight">
                {person.name}
                <span className="ml-2 text-sm font-medium tracking-normal text-faint">
                  {STATUS_LABEL[person.status]}
                </span>
              </h3>
              <div className="mt-4 space-y-3 text-pretty text-base leading-relaxed text-muted">
                {person.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <p className="mt-5">
                <Link
                  to="/people/"
                  params={{ id: person.id }}
                  className="font-display text-sm font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg inline-flex items-center gap-1.5"
                >
                  打开完整人物档案 →
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-fg/10 pt-4">
            <h4 className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase">
              关联人物与恩怨链条 ({related.length})
            </h4>
            <ul className="mt-3 divide-y divide-fg/10 border-t border-fg/10">
              {related.map((e) => {
                const other = NODE_MAP[e.other];
                if (!other) return null;
                const op = PORTRAITS[other.id];
                return (
                  <li
                    key={`${e.other}-${e.label}`}
                    className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-3 text-left font-sans font-black tracking-tight hover:text-blood group"
                      onClick={() => selectNode(other.id, true)}
                    >
                      {op ? (
                        <img
                          src={op.src}
                          alt=""
                          className={cn(
                            "size-10 object-cover shrink-0 border border-fg/10",
                            (other.status === "dead" || other.status === "rumor") && "grayscale",
                          )}
                        />
                      ) : null}
                      <div>
                        <span className="group-hover:text-blood transition-colors">
                          {other.name}
                        </span>
                        <span className="ml-2 text-sm font-medium text-faint">
                          {STATUS_LABEL[other.status]}
                        </span>
                        <span className="block text-xs font-normal text-faint">{other.sub}</span>
                      </div>
                    </button>
                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-13 sm:pl-0">
                      {e.desc ? (
                        <span className="text-xs text-faint max-w-sm text-pretty hidden md:inline">
                          {e.desc}
                        </span>
                      ) : null}
                      <span
                        className={cn(
                          "shrink-0 text-sm font-semibold",
                          e.kind === "kill" || e.kind === "foe" ? "text-blood" : "text-muted",
                        )}
                      >
                        {e.label}
                        <span className="ml-2 text-xs font-normal text-faint">
                          {KIND_LABEL[e.kind]}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : null}

      {/* Cluster Directory by Factions */}
      <div className="mt-16 space-y-16">
        {FACTIONS.map((faction) => (
          <section key={faction.id} id={`cluster-${faction.id}`} className="scroll-mt-24">
            <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {faction.label}
            </p>
            <p className="mt-2 max-w-2xl text-pretty text-muted">{faction.note}</p>
            <ul className="mt-8 space-y-10">
              {nodesIn(faction.id).map((n) => {
                const pic = PORTRAITS[n.id];
                return (
                  <li key={n.id} className="border-t border-fg/10 pt-6">
                    <button
                      type="button"
                      className="flex w-full items-start gap-4 text-left"
                      onClick={() => selectNode(n.id, true)}
                    >
                      {pic ? (
                        <img
                          src={pic.src}
                          alt={n.name}
                          className={cn(
                            "size-20 shrink-0 object-cover sm:size-24 border border-fg/10",
                            (n.status === "dead" || n.status === "rumor") && "grayscale",
                          )}
                        />
                      ) : null}
                      <span>
                        <p className="text-sm text-faint">
                          {n.sub}
                          {n.actor ? ` · ${n.actor}` : null}
                          <span className="ml-2">{STATUS_LABEL[n.status]}</span>
                        </p>
                        <h4 className="mt-1 font-sans text-2xl font-black tracking-tight hover:text-blood">
                          {n.name}
                        </h4>
                        {pic?.note ? (
                          <p className="mt-1 text-xs text-faint">{pic.note}</p>
                        ) : null}
                      </span>
                    </button>
                    <p className="mt-3">
                      <Link
                        to="/people/"
                        params={{ id: n.id }}
                        className="font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg"
                      >
                        打开档案 →
                      </Link>
                    </p>
                    <div className="mt-3 max-w-3xl space-y-3 text-pretty text-sm leading-relaxed text-muted sm:text-base">
                      {n.bio.map((p) => (
                        <p key={p.slice(0, 24)}>{p}</p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
