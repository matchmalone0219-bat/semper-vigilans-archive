import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BOARD, GOTHAM, RECAPS, TIMELINE } from "@/lib/recap";
import { PLACES } from "@/lib/places";
import { ROOTS, ROOT_KIND } from "@/lib/roots";
import { LOG, LOG_KIND, logImages, pageTitle, type LogKind } from "@/lib/film";
import { LogCarousel } from "@/components/log-carousel";
import { BiliPlayer } from "@/components/bili-player";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/recap")({
  head: () => ({
    meta: [{ title: pageTitle("前作回顾与双时间轴") }],
  }),
  component: Recap,
});

function Recap() {
  const [timelineMode, setTimelineMode] = useState<"universe" | "production">("universe");
  const [filterKind, setFilterKind] = useState<LogKind | "all">("all");
  const [prodSortAsc, setProdSortAsc] = useState<boolean>(true);

  const filteredLogs = LOG.filter((e) => filterKind === "all" || e.kind === filterKind);
  const displayedLogs = prodSortAsc ? [...filteredLogs] : [...filteredLogs].reverse();

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/flood.jpg"
          alt="大洪水过后的哥谭市"
          className="absolute inset-0 size-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            TIMELINES & RECAPS
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            前作与双时间轴
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            支持一键切换「故事宇宙编年史」与「现实制片时间线」，全景串联前传小说、限定漫画、电影正片、《企鹅人》剧集与续集最新进展。原著漫画致敬考据请查阅{" "}
            <Link to="/roots" className="text-fg underline-offset-4 hover:underline">
              原著渊源
            </Link>
            。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Timeline Section with Dual Switcher */}
        <section id="gotham-timeline" className="scroll-mt-24 pb-16 sm:pb-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                00 / Chronology
              </p>
              <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
                双轨编年史
              </h2>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">
                可自由切换查看「哥谭故事内部编年史」或「华纳现实制片拍摄历程」。
              </p>
            </div>

            {/* Switcher Buttons */}
            <div className="inline-flex rounded-none border border-fg/20 bg-surface/50 p-1">
              <button
                type="button"
                onClick={() => setTimelineMode("universe")}
                className={cn(
                  "px-4 py-2 text-xs font-semibold tracking-wider transition-colors",
                  timelineMode === "universe"
                    ? "bg-blood text-fg shadow-sm"
                    : "text-muted hover:text-fg",
                )}
              >
                故事宇宙编年史 (In-Universe)
              </button>
              <button
                type="button"
                onClick={() => setTimelineMode("production")}
                className={cn(
                  "px-4 py-2 text-xs font-semibold tracking-wider transition-colors",
                  timelineMode === "production"
                    ? "bg-blood text-fg shadow-sm"
                    : "text-muted hover:text-fg",
                )}
              >
                现实制片编年史 (Production)
              </button>
            </div>
          </div>

          {/* VIEW 1: IN-UNIVERSE TIMELINE */}
          {timelineMode === "universe" ? (
            <div className="mt-10">
              <div className="rounded-none border border-fg/10 bg-surface/30 p-4">
                <p className="text-xs font-semibold tracking-wider text-blood uppercase">
                  快捷作品导航
                </p>
                <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
                  {TIMELINE.map((beat, i) => (
                    <li key={beat.id} className="flex items-baseline gap-1.5 text-xs sm:text-sm">
                      {beat.href ? (
                        <Link to={beat.href} className="font-semibold text-fg hover:underline">
                          {beat.when}
                        </Link>
                      ) : (
                        <a href={`#${beat.id}`} className="font-semibold text-fg hover:underline">
                          {beat.when}
                        </a>
                      )}
                      <span className="text-muted">({beat.title})</span>
                      {i < TIMELINE.length - 1 ? (
                        <span className="hidden text-faint sm:inline" aria-hidden="true">
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 space-y-14">
                {GOTHAM.map((block) => (
                  <section key={block.era}>
                    <div className="border-b border-blood/40 pb-3">
                      <h3 className="font-sans text-2xl font-black tracking-tight">{block.era}</h3>
                      <p className="mt-1 text-sm text-faint">{block.note}</p>
                    </div>
                    <ol>
                      {block.beats.map((beat) => {
                        const sourceEl = beat.href ? (
                          <Link
                            to={beat.href}
                            className="text-faint underline-offset-4 hover:text-fg hover:underline"
                          >
                            {beat.source}
                          </Link>
                        ) : beat.recapId ? (
                          <a
                            href={`#${beat.recapId}`}
                            className="text-faint underline-offset-4 hover:text-fg hover:underline"
                          >
                            {beat.source}
                          </a>
                        ) : (
                          <span className="text-faint">{beat.source}</span>
                        );
                        return (
                          <li
                            key={beat.title}
                            className="grid gap-1 border-b border-fg/10 py-5 sm:grid-cols-12 sm:gap-6"
                          >
                            <p className="font-display text-sm font-semibold tracking-[0.12em] text-blood sm:col-span-3">
                              {beat.when}
                            </p>
                            <div className="sm:col-span-9">
                              <p className="font-sans text-lg font-black tracking-tight">
                                {beat.title}
                                <span className="ml-2 text-sm font-medium tracking-normal">
                                  [{sourceEl}]
                                </span>
                              </p>
                              <p className="mt-2 text-pretty text-muted leading-relaxed">{beat.line}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
          ) : null}

          {/* VIEW 2: REAL-WORLD PRODUCTION TIMELINE */}
          {timelineMode === "production" ? (
            <div className="mt-10">
              {/* Filter and Sort Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-fg/10 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold tracking-wider text-muted">分类筛选：</span>
                  {(["all", "slate", "shoot", "cast", "release"] as const).map((kind) => (
                    <button
                      key={kind}
                      type="button"
                      onClick={() => setFilterKind(kind)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-medium tracking-wider uppercase transition-colors",
                        filterKind === kind
                          ? "bg-blood text-fg"
                          : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
                      )}
                    >
                      {kind === "all" ? "全部" : LOG_KIND[kind]}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setProdSortAsc((prev) => !prev)}
                  className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  排序方式：{prodSortAsc ? "时间正序 (2017 → 2028)" : "时间倒序 (最新在前)"}
                </button>
              </div>

              {/* Production Events List */}
              <ol className="mt-10 border-l border-fg/15 pl-6">
                {displayedLogs.map((event) => (
                  <li
                    key={event.iso + event.title}
                    className={cn("relative pb-12 last:pb-0", event.upcoming && "opacity-60")}
                  >
                    <span className="absolute top-1.5 -left-[29px] size-2 rounded-full bg-blood" />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-display text-sm font-semibold tabular-nums tracking-widest text-blood">
                        {event.date}
                      </p>
                      <span className="border border-fg/20 px-1.5 py-0.5 text-[10px] tracking-wider text-muted uppercase">
                        {LOG_KIND[event.kind]}
                      </span>
                      {event.upcoming ? (
                        <span className="bg-blood/20 px-1.5 py-0.5 text-[10px] tracking-wider text-blood uppercase">
                          待上映
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-2 font-sans text-2xl font-black tracking-tight">{event.title}</h3>
                    <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                      {event.body}
                    </p>

                    {logImages(event).length ? (
                      <LogCarousel images={logImages(event)} className="mt-4 max-w-2xl" />
                    ) : null}

                    {event.video ? (
                      <BiliPlayer video={event.video} className="mt-4 max-w-2xl" />
                    ) : null}

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-faint">
                      {event.source ? <span>来源：{event.source}</span> : null}
                      {event.href ? (
                        <Link
                          to={event.href}
                          hash={event.hash}
                          className="font-display text-xs font-semibold tracking-wider text-blood uppercase hover:underline"
                        >
                          查看相关资料 →
                        </Link>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </section>

        {/* Places Section */}
        <section id="places" className="scroll-mt-24 border-t border-fg/10 py-16 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            01 / Places
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">关键地标</h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            时间轴涉及的核心建筑与重要据点，点击卡片可查看关联人物与历史背景。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLACES.map((place) => (
              <li key={place.id}>
                <Link to="/places/$id" params={{ id: place.id }} className="group block">
                  <div className="aspect-[16/9] overflow-hidden bg-elevated">
                    <img
                      src={place.image}
                      alt=""
                      className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                    />
                  </div>
                  <p className="mt-2 font-sans font-black tracking-tight">{place.name}</p>
                  <p className="text-sm text-faint">{place.status}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Detailed Works Recaps */}
        <div className="space-y-24 sm:space-y-28">
          {RECAPS.map((work) => (
            <article key={work.id} id={work.id} className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-5">
                  <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                    {work.kicker}
                  </p>
                  <h2 className="mt-3 font-sans text-4xl font-black tracking-tight sm:text-5xl">
                    {work.title}
                  </h2>
                  <p className="mt-2 font-display text-lg font-semibold tracking-wide text-muted">
                    {work.titleEn}
                  </p>
                  <dl className="mt-6 divide-y divide-fg/10 border-y border-fg/10 text-sm">
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <dt className="text-faint">故事时间线</dt>
                      <dd className="col-span-2">
                        {work.when}
                        <span className="mt-0.5 block text-faint">{work.whenNote}</span>
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <dt className="text-faint">出版形式</dt>
                      <dd className="col-span-2">
                        {work.published} · {work.form}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <dt className="text-faint">创作者 / 规格</dt>
                      <dd className="col-span-2">{work.meta}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-pretty text-fg leading-relaxed">{work.lede}</p>
                </div>
                <div className="lg:col-span-7">
                  <img
                    src={work.image}
                    alt={work.imageAlt}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-12 space-y-10">
                {work.sections.map((section) => (
                  <section key={section.heading} className="grid gap-3 sm:grid-cols-12 sm:gap-8">
                    <h3 className="font-sans text-lg font-black tracking-tight sm:col-span-4">
                      {section.heading}
                    </h3>
                    <p className="text-pretty text-base leading-relaxed text-muted sm:col-span-8">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>

              <div className="mt-12 border-y border-fg/10">
                <p className="pt-6 font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
                  本篇核心承接线索
                </p>
                <ul className="mt-4 divide-y divide-fg/10">
                  {work.leftover.map((item) => (
                    <li
                      key={item.label}
                      className="grid gap-1 py-4 sm:grid-cols-12 sm:gap-6"
                    >
                      <span className="text-sm tracking-widest text-muted sm:col-span-3">
                        {item.label}
                      </span>
                      <span className="text-pretty sm:col-span-9 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Comic Roots */}
        <section id="roots" className="scroll-mt-24 border-t border-fg/10 py-16 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            02 / Comic Roots
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            原著渊源与致敬考据
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            深度解析《蝙蝠侠：自我》、《漫长的万圣节》、《元年》与《零年》对电影创作的灵感启发。完整专题考据请查阅{" "}
            <Link to="/roots" className="text-fg underline-offset-4 hover:underline">
              原著渊源
            </Link>
            。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROOTS.map((work) => (
              <li key={work.id}>
                <Link to="/roots" hash={work.id} className="group block">
                  <div className="flex aspect-[3/4] items-center justify-center overflow-hidden bg-elevated">
                    <img
                      src={work.image}
                      alt=""
                      className="max-h-full object-contain transition-opacity duration-150 group-hover:opacity-90"
                    />
                  </div>
                  <p className="mt-2 font-display text-[10px] tracking-[0.2em] text-faint uppercase">
                    {ROOT_KIND[work.kind]}
                  </p>
                  <p className="font-sans font-black tracking-tight">{work.title}</p>
                  <p className="mt-1 text-pretty text-xs leading-relaxed text-muted">{work.thesis}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Strategic Landscape */}
        <section className="pt-16 sm:pt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            03 / Strategic Landscape
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            步入第二部的各方格局
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-muted">
            故事时间紧接《企鹅人》结局数周后的严冬，当前已确定的各方势力状态概览：
          </p>
          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2">
            {BOARD.map((row) => (
              <li key={row.who} className="bg-bg p-6">
                <p className="font-display text-sm font-semibold tracking-[0.22em] text-muted uppercase">
                  {row.who}
                </p>
                <p className="mt-3 text-pretty leading-relaxed text-fg/90">{row.state}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-faint">
            查看完整演职员名册与关系图谱，请前往{" "}
            <Link to="/dossier" hash="relations" className="text-fg underline-offset-4 hover:underline">
              电影档案
            </Link>
            ；体验谜语人暗号挑战，请前往{" "}
            <Link to="/rataalada" className="text-fg underline-offset-4 hover:underline">
              谜语人终端
            </Link>
            。
          </p>
        </section>
      </div>
    </main>
  );
}
