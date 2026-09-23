import { useEffect, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
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
import { useI18n } from "@/lib/i18n";
import {
  formatMonthHeading,
  getLocalizedLog,
  LOG_KIND_EN,
} from "@/lib/i18n/dossier-en";

export function DossierShootLog() {
  const { locale } = useI18n();
  const rawLatest = latestLog();
  const latest = getLocalizedLog(rawLatest, locale);
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [logFilter, setLogFilter] = useState<string>("all");
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const target = LOG.find((entry) => entry.id === hash);
    if (!target) return;
    setLogFilter("all");
    setOpenMonths((prev) => ({ ...prev, [target.iso.slice(0, 7)]: true }));
  }, [hash]);

  const filteredHistoryByMonth = useMemo(() => {
    const map = new Map<string, (typeof LOG)[number][]>();
    for (const event of [...LOG].sort((a, b) => b.iso.localeCompare(a.iso))) {
      if (event === rawLatest) continue;
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
  }, [rawLatest, logFilter]);

  const visibleMonths = [...filteredHistoryByMonth.keys()];
  const allMonthsExpanded =
    visibleMonths.length > 0 && visibleMonths.every((month) => openMonths[month]);

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
        {locale === "zh" ? (
          <>
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
          </>
        ) : (
          <>
            Chronicle of real-world production dispatches, casting notices, release calendar changes, and on-location filming across the UK. For narrative canon, explore{" "}
            <Link
              to="/recap"
              hash="gotham-timeline"
              className="text-fg underline-offset-4 hover:underline"
            >
              Recap · Gotham Chronicle
            </Link>
            . For set photos, visit{" "}
            <Link to="/gallery" hash="part2" className="text-fg underline-offset-4 hover:underline">
              Gallery · Part II Leaks
            </Link>
            .
          </>
        )}
      </p>

      {/* Latest Highlight Entry */}
      <Card id={latest.id} variant="dossier" showCorners className="scroll-mt-36 mt-8 border-blood/40 bg-surface/40 p-5 sm:p-6">
        {logCarouselImages(rawLatest).length ? (
          <LogCarousel images={logCarouselImages(rawLatest)} className="mb-4" />
        ) : null}
        {rawLatest.video ? (
          <BiliPlayer
            video={rawLatest.video}
            poster={logVideoPoster(rawLatest)}
            className="mb-4"
          />
        ) : null}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="blood">
              {locale === "zh" ? "最新动态" : "LATEST DISPATCH"}
            </Badge>
            <span className="font-mono text-xs text-muted">
              {locale === "zh" ? LOG_KIND[rawLatest.kind] : LOG_KIND_EN[rawLatest.kind]} · {latest.date}
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
                {locale === "zh" ? "查看物料 →" : "View Media Assets →"}
              </Link>
            </p>
          ) : null}
        </div>
      </Card>

      {/* Log Controls: Filter & Expand All */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-fg/10 pb-4">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-display font-semibold tracking-widest text-faint uppercase mr-1">
            {locale === "zh" ? "日志分类:" : "Category:"}
          </span>
          {[
            { id: "all", label: locale === "zh" ? "全部" : "All" },
            { id: "shoot", label: locale === "zh" ? "片场实拍" : "On Set" },
            { id: "release", label: locale === "zh" ? "官方公告" : "Official" },
            { id: "slate", label: locale === "zh" ? "档期变化" : "Release Date" },
            { id: "cast", label: locale === "zh" ? "演职员" : "Cast & Crew" },
            { id: "video", label: locale === "zh" ? "含视频" : "With Video" },
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
            {locale === "zh"
              ? `${totalFilteredLogs} 条历史记录`
              : `${totalFilteredLogs} archive entries`}
          </span>
          <button
            type="button"
            onClick={() =>
              setOpenMonths((prev) => ({
                ...prev,
                ...Object.fromEntries(visibleMonths.map((month) => [month, !allMonthsExpanded])),
              }))
            }
            className="flex items-center gap-1.5 border border-fg/15 px-3 py-1 font-display text-xs tracking-wider text-muted hover:text-fg hover:border-fg/40 uppercase transition-colors"
          >
            <ChevronsUpDown className="size-3.5 text-blood" />
            <span>
              {locale === "zh"
                ? allMonthsExpanded
                  ? "折叠全部月份"
                  : "展开全部月份"
                : allMonthsExpanded
                  ? "Collapse All Months"
                  : "Expand All Months"}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {[...filteredHistoryByMonth].map(([month, rawEvents]) => (
          <ArchiveDisclosure
            key={month}
            title={formatMonthHeading(month, locale)}
            count={rawEvents.length}
            open={openMonths[month] ?? false}
            onOpenChange={(open) =>
              setOpenMonths((prev) => ({ ...prev, [month]: open }))
            }
          >
            <ol className="mt-6 border-l border-fg/15 pl-6">
              {rawEvents.map((rawEvent) => {
                const event = getLocalizedLog(rawEvent, locale);
                return (
                  <li
                    key={event.id}
                    id={event.id}
                    className={cn("scroll-mt-36 relative pb-10 last:pb-0", event.upcoming && "opacity-50")}
                  >
                    <span
                      className={cn(
                        "absolute top-1.5 -left-[29px] size-2 rounded-full",
                        event.iso === rawLatest.iso ? "bg-blood" : "bg-fg",
                      )}
                    />
                    <p className="font-display text-sm font-semibold tabular-nums tracking-widest text-blood">
                      {event.date}
                      <span className="ml-3 tracking-[0.18em] text-faint">
                        {locale === "zh" ? LOG_KIND[event.kind] : LOG_KIND_EN[event.kind]}
                      </span>
                      {event.upcoming ? (
                        <span className="ml-2 tracking-[0.18em] text-faint">
                          {locale === "zh" ? "未到" : "Upcoming"}
                        </span>
                      ) : null}
                    </p>
                    <h3 className="mt-1 font-sans text-2xl font-black tracking-tight">
                      {event.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                      {event.body}
                    </p>
                    {logCarouselImages(rawEvent).length ? (
                      <LogCarousel images={logCarouselImages(rawEvent)} className="mt-3 max-w-2xl" />
                    ) : null}
                    {rawEvent.video ? (
                      <BiliPlayer
                        video={rawEvent.video}
                        poster={logVideoPoster(rawEvent)}
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
                );
              })}
            </ol>
          </ArchiveDisclosure>
        ))}
      </div>
    </div>
  );
}

