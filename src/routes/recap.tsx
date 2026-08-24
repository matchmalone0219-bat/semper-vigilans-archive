import { createFileRoute, Link } from "@tanstack/react-router";
import { BOARD, GOTHAM, RECAPS, TIMELINE } from "@/lib/recap";
import { PLACES } from "@/lib/places";
import { ROOTS, ROOT_KIND } from "@/lib/roots";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/recap")({
  head: () => ({
    meta: [{ title: pageTitle("前作回顾") }],
  }),
  component: Recap,
});

function Recap() {
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
            UNIVERSE TIMELINE & RECAPS
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            前作与宇宙回顾
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            按照哥谭宇宙内部事件发展顺序梳理（包含前传小说、漫画、电影《新蝙蝠侠》与剧集《企鹅人》）。原著漫画致敬考据请查阅{" "}
            <Link to="/roots" className="text-fg underline-offset-4 hover:underline">
              原著渊源
            </Link>
            。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section id="gotham-timeline" className="scroll-mt-24 pb-16 sm:pb-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            00 / Timeline
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            哥谭历史编年史
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            按故事内部时间线排列。相关地标详情可查阅{" "}
            <Link to="/places" className="text-fg underline-offset-4 hover:underline">
              哥谭地点总览
            </Link>
            ；最新续集资讯与拍摄日程可查阅{" "}
            <Link to="/dossier" className="text-fg underline-offset-4 hover:underline">
              电影档案库
            </Link>
            。
          </p>

          <ol className="mt-10 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-2">
            {TIMELINE.map((beat, i) => (
              <li key={beat.id} className="flex items-baseline gap-2 text-sm">
                {beat.href ? (
                  <Link to={beat.href} className="text-fg hover:underline">
                    {beat.when}
                  </Link>
                ) : (
                  <a href={`#${beat.id}`} className="text-fg hover:underline">
                    {beat.when}
                  </a>
                )}
                <span className="text-faint">({beat.title})</span>
                {i < TIMELINE.length - 1 ? (
                  <span className="hidden text-faint sm:inline" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

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
        </section>

        <section id="places" className="scroll-mt-24 border-t border-fg/10 py-16 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            00b / Places
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

        <section id="roots" className="scroll-mt-24 border-t border-fg/10 py-16 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            04 / Comic Roots
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

        <section className="pt-16 sm:pt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            05 / Strategic Landscape
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
