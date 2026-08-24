import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
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
  type RelNode,
} from "@/lib/relations";
import { cn } from "@/lib/cn";

const W = 1100;
const H = 800;
const NW = 188;
const NH = 72;
const PH = 72;

const STROKE: Record<EdgeKind, string> = {
  blood: "var(--color-fg)",
  bond: "var(--color-fg)",
  ally: "var(--color-muted)",
  foe: "var(--color-blood)",
  kill: "var(--color-blood)",
  rumor: "var(--color-faint)",
};

function nodeBox(n: RelNode) {
  return { x: n.x - NW / 2, y: n.y - NH / 2, w: NW, h: NH };
}

export function RelationMap() {
  const [active, setActive] = useState<string | null>("bruce");

  const lit = useMemo(() => {
    if (!active) return null;
    const ids = new Set<string>([active]);
    const edgeIdx = new Set<number>();
    EDGES.forEach((e, i) => {
      if (e.a === active || e.b === active) {
        ids.add(e.a);
        ids.add(e.b);
        edgeIdx.add(i);
      }
    });
    return { ids, edgeIdx };
  }, [active]);

  const person = active ? NODE_MAP[active] : null;
  const related = person ? edgesOf(person.id) : [];
  const portrait = person ? PORTRAITS[person.id] : null;

  return (
    <div>
      <p className="max-w-2xl text-pretty text-sm text-muted">
        点击头像或名称可高亮查看人物关系网络。红线代表对立与敌对关系，白线代表血缘与同盟羁绊；已身亡或离城的角色均已特别标注，支持直接进入独立角色档案。
      </p>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] tracking-[0.18em] text-faint uppercase">
        <li>在世</li>
        <li className="line-through">已死</li>
        <li>离城</li>
        <li>阿卡姆</li>
        <li className="opacity-60">传闻</li>
      </ul>

      <div className="mt-8 hidden overflow-x-auto md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[760px] bg-surface text-fg"
          role="img"
          aria-label="哥谭人物关系图"
        >
          <defs>
            <filter id="rel-gray">
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>

          {FACTIONS.map((f) => (
            <text
              key={f.id}
              x={f.x}
              y={f.y}
              fill="var(--color-blood)"
              fontSize="12"
              letterSpacing="0.28em"
              fontFamily="var(--font-display)"
            >
              {f.label}
            </text>
          ))}

          {EDGES.map((e, i) => {
            const a = NODE_MAP[e.a];
            const b = NODE_MAP[e.b];
            if (!a || !b) return null;
            const on = !lit || lit.edgeIdx.has(i);
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2;
            const dup = EDGES.findIndex((x) => x.a === e.a && x.b === e.b) !== i;
            const ox = dup ? 10 : 0;
            const oy = dup ? -14 : 0;
            const dashed = e.kind === "rumor" || e.kind === "foe";
            return (
              <g
                key={`${e.a}-${e.b}-${e.label}`}
                opacity={on ? 1 : 0.12}
                className="transition-opacity duration-150"
              >
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={STROKE[e.kind]}
                  strokeWidth={e.kind === "kill" ? 2.2 : 1.2}
                  strokeDasharray={dashed ? "5 4" : undefined}
                />
                <text
                  x={mx + ox}
                  y={my + oy - 6}
                  textAnchor="middle"
                  fill={e.kind === "kill" || e.kind === "foe" ? "var(--color-blood)" : "var(--color-muted)"}
                  fontSize="11"
                  fontFamily="var(--font-sans)"
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {NODES.map((n) => {
            const box = nodeBox(n);
            const on = !lit || lit.ids.has(n.id);
            const selected = active === n.id;
            const pic = PORTRAITS[n.id];
            const muted = n.status === "dead" || n.status === "rumor";
            return (
              <g
                key={n.id}
                opacity={on ? 1 : 0.22}
                className="cursor-pointer transition-opacity duration-150"
                onClick={() => setActive(n.id)}
              >
                <rect
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  fill="var(--color-bg)"
                  stroke={selected ? "var(--color-blood)" : "var(--color-border)"}
                  strokeWidth={selected ? 2 : 1}
                />
                {pic ? (
                  <image
                    href={pic.src}
                    x={box.x}
                    y={box.y}
                    width={PH}
                    height={NH}
                    preserveAspectRatio="xMidYMid slice"
                    filter={muted ? "url(#rel-gray)" : undefined}
                  />
                ) : null}
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
                <text
                  x={box.x + PH + 10}
                  y={n.y + 14}
                  fill="var(--color-faint)"
                  fontSize="10"
                  fontFamily="var(--font-display)"
                  letterSpacing="0.06em"
                >
                  {STATUS_LABEL[n.status]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-8 md:hidden">
        <label className="sr-only" htmlFor="rel-select">
          选择人物
        </label>
        <select
          id="rel-select"
          className="h-11 w-full border border-fg/15 bg-bg px-3 text-sm"
          value={active ?? "bruce"}
          onChange={(ev) => setActive(ev.target.value)}
        >
          {NODES.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name} · {STATUS_LABEL[n.status]}
            </option>
          ))}
        </select>
      </div>

      {person ? (
        <div id={`person-${person.id}`} className="mt-6 scroll-mt-24 border border-fg/10 bg-bg p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row">
            {portrait ? (
              <div className="shrink-0">
                <img
                  src={portrait.src}
                  alt={person.name}
                  className={cn(
                    "aspect-square w-36 object-cover sm:w-44",
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
              <p className="font-display text-sm font-semibold tracking-[0.22em] text-blood uppercase">
                {person.sub}
                {person.actor ? ` · ${person.actor}` : null}
              </p>
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
                  to="/people/$id"
                  params={{ id: person.id }}
                  className="font-display text-sm font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg"
                >
                  打开档案 →
                </Link>
              </p>
            </div>
          </div>
          <ul className="mt-6 divide-y divide-fg/10 border-t border-fg/10">
            {related.map((e) => {
              const other = NODE_MAP[e.other];
              if (!other) return null;
              const op = PORTRAITS[other.id];
              return (
                <li key={`${e.a}-${e.b}-${e.label}`} className="flex items-center justify-between gap-4 py-3">
                  <button
                    type="button"
                    className="flex items-center gap-3 text-left font-sans font-black tracking-tight hover:text-blood"
                    onClick={() => setActive(other.id)}
                  >
                    {op ? (
                      <img
                        src={op.src}
                        alt=""
                        className={cn(
                          "size-10 object-cover",
                          (other.status === "dead" || other.status === "rumor") && "grayscale",
                        )}
                      />
                    ) : null}
                    <span>
                      {other.name}
                      <span className="ml-2 text-sm font-medium text-faint">
                        {STATUS_LABEL[other.status]}
                      </span>
                    </span>
                  </button>
                  <span
                    className={cn(
                      "shrink-0 text-sm",
                      e.kind === "kill" || e.kind === "foe" ? "text-blood" : "text-muted",
                    )}
                  >
                    {e.label}
                    <span className="ml-2 text-faint">{KIND_LABEL[e.kind]}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

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
                      onClick={() => setActive(n.id)}
                    >
                      {pic ? (
                        <img
                          src={pic.src}
                          alt={n.name}
                          className={cn(
                            "size-20 shrink-0 object-cover sm:size-24",
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
                        to="/people/$id"
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
