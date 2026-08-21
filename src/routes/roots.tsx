import { createFileRoute, Link } from "@tanstack/react-router";
import { CINEMA_ROOTS, ROOTS, ROOTS_INTRO, ROOT_KIND, ROOT_METHOD } from "@/lib/roots";
import { pageTitle } from "@/lib/film";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/roots")({
  head: () => ({
    meta: [{ title: pageTitle("艺术溯源 · 漫画考据与影史拉片") }],
  }),
  component: Roots,
});

function Roots() {
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-lair.jpg"
          alt="原著漫画与影史拉片"
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/45" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            CINEMATIC GENEALOGY & COMIC ROOTS
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            艺术溯源
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            四大漫画灵感 · 70年代新黑色电影拉片
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{ROOTS_INTRO}</p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {[
              { href: "#comics", label: "01 / 四大漫画考据" },
              { href: "#cinema", label: "02 / 70年代新好莱坞拉片" },
              { href: "#method", label: "03 / 考据分级标准" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        {/* Section 01: Comic Roots */}
        <section id="comics" className="scroll-mt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              01 / DC Comic Inspirations
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              四大核心原著漫画深度考据
            </h2>
            <p className="mt-2 text-sm text-muted">
              深入剖析《蝙蝠侠：自我》、《漫长的万圣节》、《元年》与《零年》对角色心理、黑帮叙事与灾难格局的基石作用。
            </p>
          </div>

          <div className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
            {ROOTS.map((work) => (
              <a
                key={work.id}
                href={`#${work.id}`}
                className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-surface/30"
              >
                <p className="font-display text-sm font-semibold tracking-[0.18em] text-blood sm:col-span-3">
                  {work.kicker} / {work.titleEn}
                </p>
                <div className="sm:col-span-9">
                  <p className="font-sans text-lg font-black tracking-tight">
                    {work.title}
                    <span className="ml-3 text-xs font-medium tracking-[0.18em] text-faint uppercase">
                      [{ROOT_KIND[work.kind]}]
                    </span>
                  </p>
                  <p className="mt-1 text-pretty text-sm text-muted">{work.thesis}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 space-y-20">
            {ROOTS.map((work) => (
              <article key={work.id} id={work.id} className="scroll-mt-24">
                <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                  {work.kicker} / {work.titleEn}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">
                    {work.title}
                  </h3>
                  <span
                    className={cn(
                      "text-[10px] tracking-[0.22em] uppercase font-semibold",
                      work.kind === "confirmed" && "text-blood",
                      work.kind === "cited" && "text-fg/80",
                      work.kind === "parallel" && "text-faint",
                    )}
                  >
                    [{ROOT_KIND[work.kind]}]
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {work.creators}
                  <span className="text-faint"> · {work.published}</span>
                </p>

                <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <img
                      src={work.image}
                      alt={work.imageAlt}
                      className="mx-auto max-h-[28rem] w-full bg-elevated object-contain"
                    />
                    {work.quote ? (
                      <blockquote className="mt-6 border-l border-blood/50 pl-4 text-sm leading-relaxed text-muted">
                        <p>“{work.quote}”</p>
                        {work.quoteZh ? (
                          <p className="mt-3 text-pretty text-fg font-medium">“{work.quoteZh}”</p>
                        ) : null}
                        {work.quoteSrc ? (
                          <footer className="mt-2 text-xs tracking-wide text-faint">—— {work.quoteSrc}</footer>
                        ) : null}
                      </blockquote>
                    ) : null}
                    <ul className="mt-6 space-y-3 border-t border-fg/10 pt-6">
                      {work.sources.map((source) => (
                        <li key={source.label}>
                          <p className="text-xs tracking-[0.16em] text-faint uppercase">{source.label}</p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">{source.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-pretty leading-relaxed text-fg">{work.lede}</p>
                    <div className="mt-8 space-y-8">
                      {work.sections.map((section) => (
                        <section key={section.heading}>
                          <h4 className="font-sans text-xl font-black tracking-tight">{section.heading}</h4>
                          <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{section.body}</p>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-12 border-t border-fg/10 pt-6">
                  <h4 className="font-sans text-lg font-black tracking-tight">漫画 vs 电影 经典致敬对照</h4>
                  <div className="mt-4 divide-y divide-fg/10 border-y border-fg/10">
                    <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-2">
                      <p>原著漫画设定</p>
                      <p className="hidden sm:block">电影影像化呈现</p>
                    </div>
                    {work.parallels.map((row) => (
                      <div key={row.comic} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-8">
                        <p className="text-pretty text-sm leading-relaxed text-muted">{row.comic}</p>
                        <p className="text-pretty text-sm leading-relaxed text-fg/90">
                          <span className="mb-1 block text-xs tracking-[0.2em] text-faint uppercase sm:hidden">
                            电影呈现
                          </span>
                          {row.film}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 02: 1970s Cinema Lineage */}
        <section id="cinema" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              02 / 70s Neo-Noir & Crime Cinema Lineage
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              1970年代新黑色电影拉片与致敬专栏
            </h2>
            <p className="mt-2 text-sm text-muted">
              马特·里夫斯多次强调，《新蝙蝠侠》的电影美学直接继承自 1970 年代新好莱坞与 90 年代硬汉派犯罪电影名作。
            </p>
          </div>

          <div className="mt-10 space-y-16">
            {CINEMA_ROOTS.map((film) => (
              <article key={film.id} id={film.id} className="scroll-mt-24 border border-fg/10 bg-surface/20 p-6 sm:p-8">
                <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                  {film.kicker}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-sans text-3xl font-black tracking-tight sm:text-4xl">
                    《{film.title}》
                  </h3>
                  <span className="text-sm font-medium text-muted">
                    {film.titleEn} ({film.year}) · 导演：{film.director}
                  </span>
                </div>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-fg">{film.lede}</p>

                <div className="mt-8 border-t border-fg/10 pt-6">
                  <h4 className="font-sans text-lg font-black tracking-tight text-blood">
                    影史经典 vs 《新蝙蝠侠》 镜头与母题对照
                  </h4>
                  <div className="mt-4 divide-y divide-fg/10 border-y border-fg/10">
                    <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-2">
                      <p>影史经典母题 / 桥段</p>
                      <p className="hidden sm:block">《新蝙蝠侠》的致敬与转译</p>
                    </div>
                    {film.parallels.map((p) => (
                      <div key={p.cinema} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-8">
                        <p className="text-pretty text-sm leading-relaxed text-muted">{p.cinema}</p>
                        <p className="text-pretty text-sm leading-relaxed text-fg/90">{p.batman}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {film.breakdown.map((b) => (
                    <div key={b.heading}>
                      <h5 className="font-sans text-base font-black tracking-tight">{b.heading}</h5>
                      <p className="mt-1 text-pretty text-sm leading-relaxed text-muted">{b.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 03: Reference Tiers */}
        <section id="method" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            03 / Reference Tiers
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            考据分级标准
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            按照导演公开发言、主创专访与经典情节对照进行分级梳理，严谨呈现漫画灵感与电影创作之间的互动关系：
          </p>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {ROOT_METHOD.map((item) => (
              <li key={item.kind} className="bg-bg p-6">
                <p
                  className={cn(
                    "font-display text-xs font-semibold tracking-[0.22em] uppercase",
                    item.kind === "confirmed" && "text-blood font-semibold",
                    item.kind === "cited" && "text-fg/80",
                    item.kind === "parallel" && "text-faint",
                  )}
                >
                  {item.title}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className="max-w-2xl text-sm leading-relaxed text-faint">
          查阅高谭历史编年史，请前往{" "}
          <Link to="/recap" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            前作回顾
          </Link>
          ；查阅重案卷宗与夜巡日记，请前往{" "}
          <Link to="/cases" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            重案卷宗
          </Link>
          ；查阅最新拍摄进展，请前往{" "}
          <Link to="/dossier" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            电影档案
          </Link>
          。
        </p>
      </div>
    </main>
  );
}
