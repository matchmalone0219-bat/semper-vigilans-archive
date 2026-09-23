import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CINEMA_ROOTS,
  LORE_EASTER_EGGS,
  RIDDLE_LORE,
  ROOTS,
  ROOTS_INTRO,
  ROOT_KIND,
  ROOT_METHOD,
} from "@/lib/roots";
import { pageTitle } from "@/lib/film";
import { cn } from "@/lib/cn";
import {
  useI18n,
  ROOTS_INTRO_EN,
  ROOT_KIND_EN,
  ROOT_METHOD_EN,
  ROOTS_EN,
  CINEMA_ROOTS_EN,
} from "@/lib/i18n";

export const Route = createFileRoute("/roots")({
  head: () => ({
    meta: [{ title: pageTitle("艺术溯源 · 漫画考据与影史拉片") }],
  }),
  component: Roots,
});

function Roots() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-lair.jpg"
          alt={isEn ? "Comic Roots & Cinema Lineage" : "原著漫画与影史拉片"}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/45" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            CINEMATIC GENEALOGY & COMIC ROOTS
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {isEn ? "Roots & Lineage" : "艺术溯源"}
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            {isEn
              ? "Four Core Comics · Film Lineage · Riddle Decodes · City Lore"
              : "四大漫画灵感 · 影史拉片 · 谜题语言考据 · 城市暗线"}
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            {isEn ? ROOTS_INTRO_EN : ROOTS_INTRO}
          </p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {[
              { hash: "comics", label: isEn ? "01 / Comic Inspirations" : "01 / 四大漫画考据" },
              { hash: "cinema", label: isEn ? "02 / Cinema Lineage" : "02 / 影史拉片" },
              { hash: "riddles", label: isEn ? "03 / Riddle Decodes" : "03 / 谜语人双关考据" },
              { hash: "lore", label: isEn ? "04 / City Lore & Clues" : "04 / 城市暗线与彩蛋" },
              { hash: "method", label: isEn ? "05 / Reference Tiers" : "05 / 考据分级标准" },
            ].map((item) => (
              <Link
                key={item.hash}
                to="/roots"
                hash={item.hash}
                className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
              >
                {item.label}
              </Link>
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
              {isEn ? "Deep Analysis of Four Core Comic Inspirations" : "四大核心原著漫画深度考据"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isEn
                ? "An in-depth analysis of Batman: Ego, The Long Halloween, Year One, and Zero Year as cornerstones of character psychology, mob narrative, and cataclysm."
                : "深入剖析《蝙蝠侠：自我》、《漫长的万圣节》、《元年》与《零年》对角色心理、黑帮叙事与灾难格局的基石作用。"}
            </p>
          </div>

          <div className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
            {ROOTS.map((work) => {
              const enWork = ROOTS_EN[work.id];
              const kicker = isEn && enWork?.kicker ? enWork.kicker : work.kicker;
              const title = isEn ? work.titleEn : work.title;
              const thesis = isEn && enWork?.thesis ? enWork.thesis : work.thesis;
              const kindBadge = isEn ? ROOT_KIND_EN[work.kind] : ROOT_KIND[work.kind];

              return (
                <Link
                  key={work.id}
                  to="/roots"
                  hash={work.id}
                  className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-surface/30"
                >
                  <p className="font-display text-sm font-semibold tracking-[0.18em] text-blood sm:col-span-3">
                    {kicker} / {work.titleEn}
                  </p>
                  <div className="sm:col-span-9">
                    <p className="font-sans text-lg font-black tracking-tight">
                      {title}
                      <span className="ml-3 text-xs font-medium tracking-[0.18em] text-faint uppercase">
                        [{kindBadge}]
                      </span>
                    </p>
                    <p className="mt-1 text-pretty text-sm text-muted">{thesis}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 space-y-20">
            {ROOTS.map((work) => {
              const enWork = ROOTS_EN[work.id];
              const kicker = isEn && enWork?.kicker ? enWork.kicker : work.kicker;
              const title = isEn ? work.titleEn : work.title;
              const creators = isEn && enWork?.creators ? enWork.creators : work.creators;
              const published = isEn && enWork?.published ? enWork.published : work.published;
              const lede = isEn && enWork?.lede ? enWork.lede : work.lede;
              const sections = isEn && enWork?.sections ? enWork.sections : work.sections;
              const parallels = isEn && enWork?.parallels ? enWork.parallels : work.parallels;
              const sources = isEn && enWork?.sources ? enWork.sources : work.sources;
              const kindBadge = isEn ? ROOT_KIND_EN[work.kind] : ROOT_KIND[work.kind];

              return (
                <article key={work.id} id={work.id} className="scroll-mt-24">
                  <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                    {kicker} / {work.titleEn}
                  </p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">
                      {title}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] tracking-[0.22em] uppercase font-semibold",
                        work.kind === "confirmed" && "text-blood",
                        work.kind === "cited" && "text-fg/80",
                        work.kind === "parallel" && "text-faint",
                      )}
                    >
                      [{kindBadge}]
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {creators}
                    <span className="text-faint"> · {published}</span>
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
                          {!isEn && work.quoteZh ? (
                            <p className="mt-3 text-pretty text-fg font-medium">“{work.quoteZh}”</p>
                          ) : null}
                          {work.quoteSrc ? (
                            <footer className="mt-2 text-xs tracking-wide text-faint">—— {work.quoteSrc}</footer>
                          ) : null}
                        </blockquote>
                      ) : null}
                      <ul className="mt-6 space-y-3 border-t border-fg/10 pt-6">
                        {sources.map((source) => (
                          <li key={source.label}>
                            <p className="text-xs tracking-[0.16em] text-faint uppercase">{source.label}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted">{source.note}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-8">
                      <p className="text-pretty leading-relaxed text-fg">{lede}</p>
                      <div className="mt-8 space-y-8">
                        {sections.map((section) => (
                          <section key={section.heading}>
                            <h4 className="font-sans text-xl font-black tracking-tight">{section.heading}</h4>
                            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{section.body}</p>
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 border-t border-fg/10 pt-6">
                    <h4 className="font-sans text-lg font-black tracking-tight">
                      {isEn ? "Comic vs. Film: Homage & Parallels" : "漫画 vs 电影 经典致敬对照"}
                    </h4>
                    <div className="mt-4 divide-y divide-fg/10 border-y border-fg/10">
                      <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-2">
                        <p>{isEn ? "Original Comic Lore" : "原著漫画设定"}</p>
                        <p className="hidden sm:block">{isEn ? "Film Cinematic Adaptation" : "电影影像化呈现"}</p>
                      </div>
                      {parallels.map((row) => (
                        <div key={row.comic} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-8">
                          <p className="text-pretty text-sm leading-relaxed text-muted">{row.comic}</p>
                          <p className="text-pretty text-sm leading-relaxed text-fg/90">
                            <span className="mb-1 block text-xs tracking-[0.2em] text-faint uppercase sm:hidden">
                              {isEn ? "Film Adaptation" : "电影呈现"}
                            </span>
                            {row.film}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 02: Cinema Lineage */}
        <section id="cinema" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              02 / Cinema Lineage
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {isEn
                ? "Cinema Lineage: New Hollywood, Animation & Vehicular Horror"
                : "影史拉片：新好莱坞、动画长片与恐怖载具"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isEn ? (
                <>
                  Systematic mapping of core cinematic influences cited by director Matt Reeves and star Robert Pattinson. Grounded in 1970s New Hollywood crime cinema, fused with Mask of the Phantasm and Stephen King's Christine. For Cobain and Nirvana's musical influence on Bruce's isolation, see{" "}
                  <Link to="/craft" hash="nirvana" className="text-fg underline-offset-4 hover:underline">
                    Craft & Score
                  </Link>
                  .
                </>
              ) : (
                <>
                  系统梳理导演马特·里夫斯与主演罗伯特·帕丁森在访谈中深度提及的核心影视灵感源流。以 1970 年代新好莱坞犯罪经典奠定写实侦探底色，融合动画经典《幻影的面具》与斯蒂芬·金《克里斯汀》的恐怖载具哲学。关于柯本与涅槃乐队对布鲁斯孤立心境的音乐塑造，详见{" "}
                  <Link to="/craft" hash="nirvana" className="text-fg underline-offset-4 hover:underline">
                    幕后视听
                  </Link>
                  。
                </>
              )}
            </p>
          </div>

          <div className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
            {CINEMA_ROOTS.map((film) => {
              const enFilm = CINEMA_ROOTS_EN[film.id];
              const kicker = isEn && enFilm?.kicker ? enFilm.kicker : film.kicker.split(" / ")[0];
              const title = isEn ? film.titleEn : film.title;
              const thesis = isEn && enFilm?.thesis ? enFilm.thesis : film.thesis;

              return (
                <Link
                  key={film.id}
                  to="/roots"
                  hash={film.id}
                  className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-surface/30"
                >
                  <p className="font-display text-sm font-semibold tracking-[0.18em] text-blood sm:col-span-3">
                    {kicker} / {film.titleEn}
                  </p>
                  <div className="sm:col-span-9">
                    <p className="font-sans text-lg font-black tracking-tight">
                      {title}
                      <span className="ml-3 text-xs font-medium tracking-[0.18em] text-faint uppercase">
                        {film.year}
                      </span>
                    </p>
                    <p className="mt-1 text-pretty text-sm text-muted">{thesis}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 space-y-20">
            {CINEMA_ROOTS.map((film) => {
              const enFilm = CINEMA_ROOTS_EN[film.id];
              const kicker = isEn && enFilm?.kicker ? enFilm.kicker : film.kicker;
              const title = isEn ? film.titleEn : film.title;
              const lede = isEn && enFilm?.lede ? enFilm.lede : film.lede;
              const parallels = isEn && enFilm?.parallels ? enFilm.parallels : film.parallels;
              const breakdown = isEn && enFilm?.breakdown ? enFilm.breakdown : film.breakdown;

              return (
                <article key={film.id} id={film.id} className="scroll-mt-24">
                  <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                    {kicker}
                  </p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">
                      {title}
                    </h3>
                    <span className="text-sm font-medium text-muted">
                      {film.titleEn} · {film.year}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    {isEn ? "Director: " : "导演："}{film.director}
                  </p>

                  <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
                    {film.image ? (
                      <div className="lg:col-span-4">
                        <img
                          src={film.image}
                          alt={film.imageAlt ?? film.title}
                          className="mx-auto max-h-[28rem] w-full bg-elevated object-contain"
                        />
                        {film.quote ? (
                          <blockquote className="mt-6 border-l border-blood/50 pl-4 text-sm leading-relaxed text-muted">
                            <p>“{film.quote}”</p>
                            {!isEn && film.quoteZh ? (
                              <p className="mt-3 text-pretty font-medium text-fg">“{film.quoteZh}”</p>
                            ) : null}
                            {film.quoteSrc ? (
                              <footer className="mt-2 text-xs tracking-wide text-faint">
                                —— {film.quoteSrc}
                              </footer>
                            ) : null}
                          </blockquote>
                        ) : null}
                      </div>
                    ) : null}
                    <div className={film.image ? "lg:col-span-8" : "lg:col-span-12"}>
                      <p className="text-pretty leading-relaxed text-fg">{lede}</p>
                      <div className="mt-8 space-y-6">
                        {breakdown.map((b) => (
                          <section key={b.heading}>
                            <h4 className="font-sans text-xl font-black tracking-tight">{b.heading}</h4>
                            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{b.body}</p>
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 border-t border-fg/10 pt-6">
                    <h4 className="font-sans text-lg font-black tracking-tight">
                      {isEn
                        ? "Classic Cinema vs. The Batman: Motifs & Parallels"
                        : "影史经典 vs 《新蝙蝠侠》 镜头与母题对照"}
                    </h4>
                    <div className="mt-4 divide-y divide-fg/10 border-y border-fg/10">
                      <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-2">
                        <p>{isEn ? "Classic Cinema Motif / Scene" : "影史经典母题 / 桥段"}</p>
                        <p className="hidden sm:block">
                          {isEn ? "Homage & Translation in The Batman" : "《新蝙蝠侠》的致敬与转译"}
                        </p>
                      </div>
                      {parallels.map((p) => (
                        <div key={p.cinema} className="grid gap-2 py-4 sm:grid-cols-2 sm:gap-8">
                          <p className="text-pretty text-sm leading-relaxed text-muted">{p.cinema}</p>
                          <p className="text-pretty text-sm leading-relaxed text-fg/90">
                            <span className="mb-1 block text-xs tracking-[0.2em] text-faint uppercase sm:hidden">
                              {isEn ? "Film Adaptation" : "电影呈现"}
                            </span>
                            {p.batman}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 03: The Riddler's Puzzles: Wordplay & Linguistic Lore */}
        <section id="riddles" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                03 / The Riddler's Puzzles · Linguistic & Cultural Decodes
              </p>
              <span className="border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs tracking-widest text-emerald-400 uppercase">
                [RATAALADA CIPHER VAULT]
              </span>
            </div>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {isEn ? "The Riddler's Wordplay & Linguistic Lore" : "谜语人迷局：双关语与语言学深度考据"}
            </h2>
            <p className="mt-2 max-w-3xl text-pretty text-sm text-muted">
              {isEn
                ? "In The Batman (2022), Edward Nashton's riddles are heavily nested with English homophones, mob argot, legal idioms, and deliberate grammatical misdirections. Because these wordplays break down in Chinese translation, here is the definitive breakdown of the film's eight central riddles:"
                : "《新蝙蝠侠》（2022）中，谜语人（爱德华·纳什顿）的系列杀人谜题深度嵌套了英语同音异形梗、黑帮黑话、法理典故以及西班牙语语法陷阱。在中文直译下极易丢失原味。在此全面还原 8 大主线谜语背后的语言学玄机与真实叙事暗涌："}
            </p>
          </div>

          <div className="mt-12 space-y-16">
            {RIDDLE_LORE.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-24 border border-fg/10 bg-fg/[0.015] p-6 transition-colors hover:border-blood/40 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fg/10 pb-4">
                  <div>
                    <p className="font-display text-xs font-semibold tracking-[0.24em] text-blood uppercase">
                      {isEn ? item.kickerEn : item.kicker}
                    </p>
                    <h3 className="mt-1 font-sans text-2xl font-black tracking-tight sm:text-3xl">
                      {isEn ? item.titleEn : item.title}
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest uppercase",
                      item.kind === "card"
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border-blood/40 bg-blood/10 text-blood",
                    )}
                  >
                    {item.kind === "card"
                      ? isEn
                        ? "PROP: RIDDLE CARD"
                        : "道具：谜语卡实拍"
                      : isEn
                      ? "SCENE: CRIME SITE"
                      : "场景：案件现场实拍"}
                  </span>
                </div>

                <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-5">
                    <div className="group relative overflow-hidden border border-fg/15 bg-elevated">
                      <img
                        src={item.image}
                        alt={isEn ? item.imageAltEn : item.imageAlt}
                        className="aspect-16/10 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted italic">
                      {isEn ? item.imageCaptionEn : item.imageCaption}
                    </p>
                    <div className="mt-4 border-l-2 border-blood/50 pl-3 text-xs leading-relaxed text-faint">
                      <span className="font-semibold text-fg/80">
                        {isEn ? "Scene Context: " : "涉及场次："}
                      </span>
                      {isEn ? item.targetSceneEn : item.targetScene}
                    </div>
                  </div>

                  <div className="space-y-6 lg:col-span-7">
                    {/* Terminal Prompt & Answer Box */}
                    <div className="border border-emerald-500/30 bg-[#051105] p-4 font-mono shadow-[inset_0_0_12px_rgba(16,185,129,0.1)]">
                      <p className="text-[11px] font-bold tracking-widest text-emerald-500/70 uppercase">
                        {isEn ? "RIDDLE PROMPT // ORIGINAL ENIGMA" : "谜面原句 // 现场原声"}
                      </p>
                      <p className="mt-1 text-sm font-semibold tracking-wide text-emerald-300 sm:text-base">
                        “{isEn ? item.promptEn : item.prompt}”
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-emerald-500/20 pt-2.5 text-xs">
                        <span className="text-emerald-500/80">
                          {isEn ? "DECODED ANSWER:" : "破译谜底："}
                        </span>
                        <span className="bg-emerald-500/20 px-2 py-0.5 font-bold tracking-wider text-emerald-200">
                          {isEn ? item.answerEn : item.answer}
                        </span>
                      </div>
                    </div>

                    {/* Three-Layer Analysis */}
                    <div className="space-y-4 text-xs leading-relaxed">
                      <div className="border-l border-fg/20 pl-3">
                        <p className="font-sans font-bold tracking-wide text-fg/90 uppercase">
                          {isEn ? "1. Literal Surface" : "1. 字面表象"}
                        </p>
                        <p className="mt-1 text-muted">
                          {isEn ? item.literalMeaningEn : item.literalMeaning}
                        </p>
                      </div>

                      <div className="border-l-2 border-blood bg-blood/[0.03] py-1.5 pr-2 pl-3">
                        <p className="font-sans font-bold tracking-wide text-blood uppercase">
                          {isEn ? "2. Linguistic Trap & Cultural Wordplay" : "2. 语言学陷阱与双关暗号"}
                        </p>
                        <p className="mt-1 leading-normal text-fg/95">
                          {isEn ? item.linguisticTrapEn : item.linguisticTrap}
                        </p>
                      </div>

                      <div className="border-l border-fg/20 pl-3">
                        <p className="font-sans font-bold tracking-wide text-fg/90 uppercase">
                          {isEn ? "3. Narrative Truth & DC Canon" : "3. 叙事真相与原著隐喻"}
                        </p>
                        <p className="mt-1 text-muted">
                          {isEn ? item.narrativeTruthEn : item.narrativeTruth}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 04: In-Universe Lore & Easter Eggs */}
        <section id="lore" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            04 / In-Universe City Lore & Clues
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {isEn ? "Gotham City Lore & Hidden Screen Clues" : "哥谭城市暗线与隐藏彩蛋"}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {isEn
              ? "Beyond the central murder investigation, Matt Reeves wove vital DC lore into background billboards, shipping manifests, and dialogue—planting deliberate seeds for Gotham's expanding rogue's gallery:"
              : "在主线侦探悬案之外，马特·里夫斯在哥谭街头海报、货运单据与角色台词中埋下了大量硬核原著彩蛋，勾勒出冰山一角下的宏大城市暗网："}
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {LORE_EASTER_EGGS.map((item) => (
              <div
                key={item.id}
                className="border border-fg/10 bg-fg/[0.02] p-6 transition-colors hover:border-blood/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold tracking-wider text-blood uppercase">
                    {isEn ? item.categoryEn : item.categoryZh}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-faint uppercase">
                    {item.id}
                  </span>
                </div>
                <h3 className="mt-3 font-sans text-xl font-bold tracking-tight">
                  {isEn ? item.nameEn : item.name}
                </h3>
                <div className="mt-4 space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="font-semibold text-fg/80">
                      {isEn ? "Screen Clue: " : "片中发现："}
                    </span>
                    <span className="text-muted">{isEn ? item.discoveryEn : item.discovery}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-fg/80">
                      {isEn ? "Comic Canon: " : "原著渊源："}
                    </span>
                    <span className="text-muted">
                      {isEn ? item.comicSignificanceEn : item.comicSignificance}
                    </span>
                  </div>
                  <div className="border-t border-fg/5 pt-2">
                    <span className="font-semibold text-blood/90">
                      {isEn ? "Narrative Significance: " : "暗线影响："}
                    </span>
                    <span className="text-muted">{isEn ? item.loreImpactEn : item.loreImpact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Reference Tiers */}
        <section id="method" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            05 / Reference Tiers
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {isEn ? "Reference Tier Standards" : "考据分级标准"}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {isEn
              ? "Graded and structured across director statements, creator interviews, and scene parallels to present the rigorous relationship between comic inspiration and cinema:"
              : "按照导演公开发言、主创专访与经典情节对照进行分级梳理，严谨呈现漫画灵感与电影创作之间的互动关系："}
          </p>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-3">
            {(isEn ? ROOT_METHOD_EN : ROOT_METHOD).map((item) => (
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
          {isEn ? "To explore Gotham chronological history, visit " : "查阅哥谭历史编年史，请前往 "}
          <Link to="/recap" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            {isEn ? "Recap & Universe" : "前作回顾"}
          </Link>
          {isEn ? "; for criminal evidence and night patrol logs, visit " : "；查阅重案卷宗与夜巡日记，请前往 "}
          <Link to="/cases" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            {isEn ? "Forensic Cases" : "重案卷宗"}
          </Link>
          {isEn ? "; for latest shoot updates, visit " : "；查阅最新拍摄进展，请前往 "}
          <Link to="/dossier" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            {isEn ? "Film Dossier" : "电影档案"}
          </Link>
          {isEn ? "." : "。"}
        </p>
      </div>
    </main>
  );
}
