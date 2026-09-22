import { useMemo, useState } from "react";
import { CERTAINTY_LABEL, CONTENT_REVIEWED_AT, PLOT } from "@/data/film";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SourceLink } from "@/components/source-link";

export function DossierPlot() {
  const [plotFilter, setPlotFilter] = useState<"all" | "confirmed" | "hint" | "rumor" | "debunked">("all");

  const plotCounts = useMemo(() => {
    const counts = { all: PLOT.length, confirmed: 0, hint: 0, rumor: 0, debunked: 0 };
    for (const p of PLOT) counts[p.tag]++;
    return counts;
  }, []);

  const filteredPlot = useMemo(() => {
    if (plotFilter === "all") return PLOT;
    return PLOT.filter((p) => p.tag === plotFilter);
  }, [plotFilter]);

  return (
    <div>
      {/* Plot Certainty Filter */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase mr-1">
          确信度筛选:
        </span>
        {(
          [
            { id: "all", label: "全部线索", count: plotCounts.all },
            { id: "confirmed", label: "已确认", count: plotCounts.confirmed },
            { id: "hint", label: "片场印证", count: plotCounts.hint },
            { id: "rumor", label: "传闻推测", count: plotCounts.rumor },
            { id: "debunked", label: "辟谣证伪", count: plotCounts.debunked },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPlotFilter(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 font-display text-xs tracking-[0.14em] uppercase transition-colors",
              plotFilter === tab.id
                ? "bg-blood text-fg font-bold shadow-[0_0_12px_color-mix(in_oklab,var(--color-blood)_30%,transparent)]"
                : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
            )}
          >
            <span>{tab.label}</span>
            <span className="font-mono text-[10px] opacity-75">({tab.count})</span>
          </button>
        ))}
      </div>

      <ul className="mt-6 space-y-4">
        {filteredPlot.map((item) => {
          const debunked = item.tag === "debunked";
          return (
            <li key={item.id} id={item.id} className="scroll-mt-24">
              <Card
                variant="dossier"
                showCorners
                evidenceTape={debunked}
                className={cn(
                  "p-5 sm:p-6",
                  debunked && "border-blood/25 bg-blood/[0.02]",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {debunked ? (
                      <span className="classified-stamp text-[10px] py-0.5 px-2">
                        VOID / 已证伪
                      </span>
                    ) : (
                      <Badge variant={item.tag}>
                        {CERTAINTY_LABEL[item.tag]}
                      </Badge>
                    )}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-faint select-none uppercase">
                    FILE // {item.id.replace(/-/g, "_").slice(0, 18)}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-3 text-pretty leading-relaxed",
                    debunked && "text-muted/80 decoration-fg/25 line-through",
                  )}
                >
                  {item.text}
                </p>

                {item.source ? (
                  <SourceLink
                    label={item.source}
                    href={item.sourceUrl}
                    tier={item.sourceTier}
                    verifiedAt={CONTENT_REVIEWED_AT}
                  />
                ) : null}

                {debunked ? (
                  <div className="mt-5 border-t border-dashed border-fg/15 pt-4">
                    <p className="font-display text-[10px] tracking-[0.28em] text-faint uppercase">
                      后续核验
                    </p>
                    {item.debunkedNote ? (
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                        {item.debunkedNote}
                      </p>
                    ) : null}
                    {item.debunkedSource ? (
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <SourceLink
                          label={item.debunkedSource}
                          href={item.debunkedSourceUrl}
                          tier={item.debunkedSourceTier}
                          className="mt-0"
                        />
                        {item.debunkedAt ? (
                          <span className="font-mono text-[10px] tracking-wider text-faint">
                            证伪 {item.debunkedAt}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
