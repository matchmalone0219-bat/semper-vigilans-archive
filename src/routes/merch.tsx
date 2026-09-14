import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MERCH, type MerchCover } from "@/lib/merch";
import type { Still } from "@/lib/gallery";
import { pageTitle } from "@/lib/film";
import { Lightbox } from "@/components/lightbox";
import { SourceLink } from "@/components/source-link";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [{ title: pageTitle("周边与收藏品") }],
  }),
  component: Merch,
});

function coversToStills(covers: MerchCover[]): Still[] {
  return covers.map((cover) => ({
    src: cover.image,
    title: cover.title,
    caption: `${cover.coverArtist} 绘制 · ${cover.releaseDate} 发售`,
    source: "DC Comics · 电影变体封面",
  }));
}

function MerchCoverGrid({ covers }: { covers: MerchCover[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const stills = coversToStills(covers);

  return (
    <>
      <ul className="grid grid-cols-3 gap-2 sm:gap-4">
        {covers.map((cover, i) => (
          <li key={cover.id} id={cover.id} className="scroll-mt-24">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={`查看大图：${cover.title}，${cover.coverArtist}`}
            >
              <div className="aspect-[2/3] overflow-hidden border border-fg/10 bg-[#111]">
                <img
                  src={cover.image}
                  alt={cover.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain transition-opacity duration-150 group-hover:opacity-90"
                />
              </div>
              <p className="mt-2 font-sans text-xs font-black tracking-tight sm:text-sm">
                {cover.title}
              </p>
              <p className="mt-0.5 font-display text-[10px] font-semibold tracking-[0.12em] text-faint uppercase sm:text-xs">
                {cover.coverArtist}
              </p>
              <p className="font-display text-[10px] tracking-[0.12em] text-faint uppercase sm:text-xs">
                {cover.releaseDate}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? (
        <Lightbox items={stills} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </>
  );
}

function Merch() {
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/merch/hottoys.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/50" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Merch / Licensed Collectibles
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">
          官方周边与收藏品
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          收录《新蝙蝠侠》上映期间及之后推出的官方授权衍生品，涵盖收藏级人偶与道具、雕像、载具、乐高、出版漫画、院线特典、授权印刷、时装首饰、生活方式联名，以及大众玩具与服装。只收 Reeves 版电影授权，不拿泛蝙蝠侠产品充数。第二部电影周边尚未公布。
        </p>
        <nav className="mt-8 flex flex-wrap gap-3">
          {MERCH.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.28em] text-muted uppercase hover:border-blood hover:text-fg"
            >
              {g.kicker} · {g.title}
            </a>
          ))}
        </nav>
        </div>
      </header>

      {MERCH.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-20 border-t border-fg/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              {group.kicker} / {group.titleEn}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-black tracking-tight sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{group.intro}</p>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {group.items.map((item, i) => {
                const hasCovers = Boolean(item.covers?.length);
                const featured = !hasCovers && i === 0 && group.items.length > 1;
                return (
                  <li
                    key={item.id}
                    id={item.id}
                    className={featured || hasCovers ? "sm:col-span-2" : undefined}
                  >
                    <article>
                      {hasCovers && item.covers ? (
                        <MerchCoverGrid covers={item.covers} />
                      ) : (
                        <figure className="border border-fg/10 bg-[#111]">
                          <img
                            src={item.image}
                            alt={item.imageAlt}
                            loading="lazy"
                            decoding="async"
                            className={
                              featured
                                ? "mx-auto max-h-[56vh] w-full object-contain"
                                : "mx-auto aspect-[4/3] w-full object-contain"
                            }
                          />
                        </figure>
                      )}
                      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-sans text-2xl font-black tracking-tight">{item.name}</h3>
                        <p className="font-display text-sm font-semibold tracking-wide text-muted">
                          {item.nameEn}
                        </p>
                      </div>
                      <p className="mt-1 font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                        {item.maker} · {item.year} · {item.spec}
                      </p>
                      <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                        {item.body}
                      </p>
                      {item.sourceUrl && item.sourceLabel ? (
                        <SourceLink
                          label={item.sourceLabel}
                          href={item.sourceUrl}
                          tier="official"
                          verifiedAt={item.verifiedAt}
                        />
                      ) : null}
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-faint sm:px-6">
        本站为影迷非商业资料库，不提供任何商品购买与销售服务。产品展示图与技术规格均整理自
        Medicom Toy、BANDAI SPIRITS、Mezco、Beast Kingdom、INART、良品制造、Hot Toys、McFarlane、
        Iron Studios、Infinity Studio、Prime 1 Studio、Factory Entertainment、Jazzinc、Spin Master、乐高、
        DC Comics、LANVIN、Carhartt、PUMA、Fossil、Police、Kross Studio、House of Sillage、Dr. Squatch、Rubies、Mondo、Abrams
        及华纳家庭娱乐等授权厂牌公开物料。查阅电影装备设定请前往{" "}
        <Link to="/gear" className="text-fg underline-offset-4 hover:underline">
          装备
        </Link>
        ，了解衍生小说与漫画在故事线中的承接关系请查阅{" "}
        <Link to="/recap" className="text-fg underline-offset-4 hover:underline">
          前作回顾
        </Link>
        。
      </p>
    </main>
  );
}
