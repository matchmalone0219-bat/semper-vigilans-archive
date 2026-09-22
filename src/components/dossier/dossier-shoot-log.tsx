import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronsUpDown } from "lucide-react";
import { latestLog, logCarouselImages, logVideoPoster } from "@/lib/film";
import { LOG, LOG_KIND } from "@/data/film";
import { LogCarousel } from "@/components/log-carousel";
import { BiliPlayer } from "@/components/bili-player";
import { SourceLink } from "@/components/source-link";
import { ArchiveDisclosure } from "@/components/archive-disclosure";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";

export function DossierShootLog() {
  const latest = latestLog();
  const [logFilter, setLogFilter] = useState<string>("all");
  const [expandAllMonths, setExpandAllMonths] = useState<boolean | null>(null);

  const filteredHistoryByMonth = useMemo(() => {
    const map = new Map<string, (typeof LOG)[number][]>();
    for (const event of [...LOG].sort((a, b) => b.iso.localeCompare(a.iso))) {
      if (event === latest) continue;
      if (logFilter === "shoot" && event.kind !== "shoot") continue;
      if (logFilter === "release" && event.kind !== "release") continue;
      if (logFilter === "slate" && event.kind !== "slate") continue;
      if (logFilter === "cast" && event.kind !== "cast") continue;
      if (logFilter === "video" && !event.video) continue;

      const month = event.iso.slice(0, 7);
      const entries = map.get(month) ?? [];
      entries.push(event);
      map.set(month, entries);
    }
    return map;
  }, [latest, logFilter]);

  const totalFilteredLogs = useMemo(() => {
    let count = 0;
    for (const list of filteredHistoryByMonth.values()) {
      count += list.length;
    }
    return count;
  }, [filteredHistoryByMonth]);

  return (
    <div>
      <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
        汇总影片从立项、演员确认、档期变化到实景拍摄的现实制作记录。查阅哥谭宇宙剧情故事线请前往{" "}
        <Link
          to="/recap"
          hash="gotham-timeline"
          className="text-fg underline-offset-4 hover:underline"
        >
          回顾 · 哥谭编年史
        </Link>
        。片场实拍图集请查阅{" "}
        <Link to="/gallery" hash="part2" className="text-fg underline-offset-4 hover:underline">
          剧照 · 第二部路透
        </Link>
        。
      </p>

      {/* Latest Highlight Entry */}
      <Card variant="dossier" showCorners className="mt-8 border-blood/40 bg-surface/40 p-5 sm:p-6">
        {logCarouselImages(latest).length ? (
          <LogCarousel images={logCarouselImages(latest)} className="mb-4" />
        ) : null}
        {latest.video ? (
          <BiliPlayer
            video={latest.video}
            poster={logVideoPoster(latest)}
            className="mb-4"
          />
        ) : null}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blood">最新动态</Badge>
            <span className="font-mono text-xs text-muted">
              {LOG_KIND[latest.kind]} · {latest.date}
            </span>
          </div>
          <h3 className="mt-2.5 font-sans text-2xl font-black tracking-tight">{latest.title}</h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{latest.body}</p>
          {latest.source ? (
            <SourceLink
              label={latest.source}
              href={latest.sourceUrl}
              tier={latest.sourceTier}
              verifiedAt={latest.verifiedAt}
            />
          ) : null}
          {latest.href ? (
            <p className="mt-3">
              <Link
                to={latest.href}
                hash={latest.hash}
                className="font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg"
              >
                查看物料 →
              </Link>
            </p>
          ) : null}
        </div>
      </Card>

      {/* Log Controls: Filter & Expand All */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-fg/10 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-display font-semibold tracking-widest text-faint uppercase mr-1">
            日志分类:
          </span>
          {[
            { id: "all", label: "全部" },
            { id: "shoot", label: "片场实拍" },
            { id: "release", label: "官方公告" },
            { id: "slate", label: "档期变化" },
            { id: "cast", label: "演职员" },
            { id: "video", label: "含视频" },
          ].map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setLogFilter(k.id)}
              className={cn(
                "px-2.5 py-1 font-display tracking-wider uppercase transition-colors",
                logFilter === k.id
                  ? "bg-blood text-fg font-bold"
                  : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-faint">
            {totalFilteredLogs} 条历史记录
          </span>
          <button
            type="button"
            onClick={() => setExpandAllMonths((prev) => (prev ? false : true))}
            className="flex items-center gap-1.5 border border-fg/15 px-3 py-1 font-display text-xs tracking-wider text-muted hover:text-fg hover:border-fg/40 uppercase transition-colors"
          >
            <ChevronsUpDown className="size-3.5 text-blood" />
            <span>{expandAllMonths ? "折叠全部月份" : "展开全部月份"}</span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {[...filteredHistoryByMonth].map(([month, events]) => (
          <ArchiveDisclosure
            key={month}
            title={`${month.slice(0, 4)} 年 ${Number(month.slice(5))} 月`}
            count={events.length}
            open={expandAllMonths !== null ? expandAllMonths : undefined}
          >
            <ol className="mt-6 border-l border-fg/15 pl-6">
              {events.map((event) => (
                <li
                  key={event.iso}
                  className={cn("relative pb-10 last:pb-0", event.upcoming && "opacity-50")}
                >
                  <span
                    className={cn(
                      "absolute top-1.5 -left-[29px] size-2 rounded-full",
                      event.iso === latest.iso ? "bg-blood" : "bg-fg",
                    )}
                  />
                  <p className="font-display text-sm font-semibold tabular-nums tracking-widest text-blood">
                    {event.date}
                    <span className="ml-3 tracking-[0.18em] text-faint">
                      {LOG_KIND[event.kind]}
                    </span>
                    {event.upcoming ? (
                      <span className="ml-2 tracking-[0.18em] text-faint">未到</span>
                    ) : null}
                  </p>
                  <h3 className="mt-1 font-sans text-2xl font-black tracking-tight">
                    {event.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                    {event.body}
                  </p>
                  {logCarouselImages(event).length ? (
                    <LogCarousel images={logCarouselImages(event)} className="mt-3 max-w-2xl" />
                  ) : null}
                  {event.video ? (
                    <BiliPlayer
                      video={event.video}
                      poster={logVideoPoster(event)}
                      className="mt-3 max-w-2xl"
                    />
                  ) : null}
                  {event.source ? (
                    <SourceLink
                      label={event.source}
                      href={event.sourceUrl}
                      tier={event.sourceTier}
                      verifiedAt={event.verifiedAt}
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </ArchiveDisclosure>
        ))}
      </div>
    </div>
  );
}
