import { createFileRoute, Link } from "@tanstack/react-router";
import { CERTAINTY_LABEL, CAST, FACTS, FILM, LOG, LOG_KIND, PLOT, latestLog, logImages, pageTitle } from "@/lib/film";
import { RelationMap } from "@/components/relation-map";
import { LogCarousel } from "@/components/log-carousel";
import { PLACES } from "@/lib/places";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/dossier")({
  head: () => ({
    meta: [{ title: pageTitle("档案") }],
  }),
  component: Dossier,
});

function Dossier() {
  const latest = latestLog();
  const jump = [
    { href: "#facts", label: "信息" },
    { href: "#plot", label: "线索" },
    { href: "#cast", label: "演员" },
    { href: "#relations", label: "关系" },
    { href: "#places", label: "地点" },
    { href: "#log", label: "拍摄日志" },
  ];
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/signal.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            DOSSIER / {FILM.workingTitle}
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            档案
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            《{FILM.titleZh}》公开信息整理。官方确认、片场线索与传闻推测分栏存放，不混写。配乐、光影与实地取景见{" "}
            <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
              幕后与视听
            </Link>
            。
          </p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {jump.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.28em] text-muted uppercase hover:border-blood hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        <section id="facts" className="scroll-mt-24">
          <SectionKicker n="01" title="基本信息" />
          <dl className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6"
              >
                <dt className="text-sm tracking-widest text-muted sm:col-span-3">
                  {fact.label}
                </dt>
                <dd className="text-pretty sm:col-span-9">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="plot" className="scroll-mt-24">
          <SectionKicker n="02" title="故事线索" />
          <ul className="mt-8 space-y-4">
            {PLOT.map((item) => (
              <li
                key={item.text}
                className="border border-fg/10 bg-surface/40 p-5 sm:p-6"
              >
                <span
                  className={cn(
                    "inline-block text-[10px] tracking-[0.28em] uppercase",
                    item.tag === "confirmed" && "text-fg",
                    item.tag === "hint" && "text-muted",
                    item.tag === "rumor" && "text-faint",
                  )}
                >
                  {CERTAINTY_LABEL[item.tag]}
                </span>
                <p className="mt-3 text-pretty leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="cast" className="scroll-mt-24">
          <SectionKicker n="03" title="演职员" />
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2">
            {CAST.map((person) => {
              const inner = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] tracking-[0.22em] text-muted uppercase">
                      {person.roleEn}
                    </p>
                    <span className="shrink-0 text-[10px] tracking-[0.2em] text-faint uppercase">
                      {person.status === "confirmed" ? "确认" : "传闻"}
                    </span>
                  </div>
                  <h3 className="mt-3 font-sans text-2xl font-black leading-snug tracking-tight">
                    {person.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{person.note}</p>
                  {person.personId ? (
                    <p className="mt-3 font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase">
                      打开档案 →
                    </p>
                  ) : null}
                </>
              );
              return (
                <li key={person.roleEn + person.nameEn} className="bg-bg">
                  {person.personId ? (
                    <Link
                      to="/people/$id"
                      params={{ id: person.personId }}
                      className="block p-6 hover:bg-surface/60"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <div className="p-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section id="relations" className="scroll-mt-24">
          <SectionKicker n="04" title="人物关系" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            点名字，线和档案一起亮。每个人可以打开单独的档案。完整名册在{" "}
            <Link to="/people" className="text-fg underline-offset-4 hover:underline">
              人物
            </Link>
            。
          </p>
          <div className="mt-8">
            <RelationMap />
          </div>
        </section>

        <section id="places" className="scroll-mt-24">
          <SectionKicker n="05" title="高谭地点" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            主要地标与其在正史中的状态。完整列表见{" "}
            <Link to="/places" className="text-fg underline-offset-4 hover:underline">
              地点
            </Link>
            。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLACES.slice(0, 6).map((place) => (
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

        <section className="scroll-mt-24">
          <SectionKicker n="06" title="幕后与视听" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            第一部配乐与光影已经定调，第二部换了摄影指导。完整专题在{" "}
            <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
              幕后与视听
            </Link>
            。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/craft#score",
                image: "/media/gotham.jpg",
                kicker: "Score",
                title: "吉亚奇诺四主题",
                body: "四音符铜管、猫女弦乐、变奏《圣母颂》，以及选用曲 Nirvana。",
              },
              {
                href: "/craft#lens",
                image: "/media/street.jpg",
                kicker: "Cinematography",
                title: "弗雷泽 / 梅塞施密特",
                body: "第一部钠灯浅景深归弗雷泽。梅塞施密特接拍第二部，成片未公布。",
              },
              {
                href: "/craft#map",
                image: "/media/craft/st-georges.jpg",
                kicker: "Locations",
                title: "利物浦 · 格拉斯哥 · 伦敦",
                body: "市政厅、墓园、电车隧道与冬日封街，按可核对场记排列。",
              },
            ].map((card) => (
              <li key={card.href}>
                <Link to="/craft" hash={card.href.split("#")[1]} className="group block">
                  <div className="aspect-[16/9] overflow-hidden bg-elevated">
                    <img
                      src={card.image}
                      alt=""
                      className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                    />
                  </div>
                  <p className="mt-2 font-display text-[10px] tracking-[0.2em] text-faint uppercase">
                    {card.kicker}
                  </p>
                  <p className="font-sans font-black tracking-tight">{card.title}</p>
                  <p className="mt-1 text-pretty text-xs leading-relaxed text-muted">{card.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="log" className="scroll-mt-24">
          <SectionKicker n="07" title="拍摄日志" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            现实里的档期，按日期往下长。正在拍的标在最上。高谭城里发生的事在{" "}
            <Link to="/recap" hash="gotham-timeline" className="text-fg underline-offset-4 hover:underline">
              回顾 · 高谭时间轴
            </Link>
            。片场照片在{" "}
            <Link to="/gallery" hash="part2" className="text-fg underline-offset-4 hover:underline">
              剧照 · 第二部路透
            </Link>
            。
          </p>

          <article className="mt-8 border border-blood/40 bg-surface/40 p-5 sm:p-6">
            {logImages(latest).length ? (
              <LogCarousel images={logImages(latest)} className="mb-4" />
            ) : null}
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                最新 · {LOG_KIND[latest.kind]} · {latest.date}
              </p>
              <h3 className="mt-2 font-sans text-2xl font-black tracking-tight">{latest.title}</h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{latest.body}</p>
              {latest.source ? <p className="mt-2 text-xs text-faint">{latest.source}</p> : null}
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
          </article>

          <ol className="mt-10 border-l border-fg/15 pl-6">
            {[...LOG].reverse().map((event) => (
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
                  <span className="ml-3 tracking-[0.18em] text-faint">{LOG_KIND[event.kind]}</span>
                  {event.upcoming ? (
                    <span className="ml-2 tracking-[0.18em] text-faint">未到</span>
                  ) : null}
                </p>
                <h3 className="mt-1 font-sans text-2xl font-black tracking-tight">{event.title}</h3>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                  {event.body}
                </p>
                {logImages(event).length ? (
                  <LogCarousel images={logImages(event)} className="mt-3 max-w-2xl" />
                ) : null}
                {event.source ? (
                  <p className="mt-2 text-xs text-faint">{event.source}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

function SectionKicker({ n, title }: { n: string; title: string }) {
  return (
    <div>
      <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
        {n}
      </p>
      <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}
