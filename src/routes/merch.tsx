import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutGrid, LayoutList, RotateCcw, Search, X } from "lucide-react";
import { MERCH, type MerchCover, type MerchItem } from "@/lib/merch";
import type { Still } from "@/lib/gallery";
import { pageTitle } from "@/lib/film";
import { Lightbox } from "@/components/lightbox";
import { SourceLink } from "@/components/source-link";
import { ChapterNav } from "@/components/chapter-nav";
import { cn } from "@/lib/cn";
import { useI18n, MERCH_INTRO_EN, MERCH_GROUPS_EN } from "@/lib/i18n";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [{ title: pageTitle("周边与收藏品") }],
  }),
  component: Merch,
});

const TOP_MAKERS = [
  { labelZh: "Hot Toys", labelEn: "Hot Toys", match: "Hot Toys" },
  { labelZh: "InArt", labelEn: "InArt", match: "INART" },
  { labelZh: "Prime 1 Studio", labelEn: "Prime 1 Studio", match: "Prime 1 Studio" },
  { labelZh: "McFarlane", labelEn: "McFarlane", match: "McFarlane" },
  { labelZh: "乐高 LEGO", labelEn: "LEGO", match: "乐高" },
  { labelZh: "Knight Models", labelEn: "Knight Models", match: "Knight Models" },
  { labelZh: "Spin Master", labelEn: "Spin Master", match: "Spin Master" },
  { labelZh: "Factory Ent.", labelEn: "Factory Ent.", match: "Factory Entertainment" },
  { labelZh: "Mondo", labelEn: "Mondo", match: "Mondo" },
  { labelZh: "Fossil", labelEn: "Fossil", match: "Fossil" },
] as const;

function coversToStills(covers: MerchCover[], isEn: boolean): Still[] {
  return covers.map((cover) => ({
    src: cover.image,
    title: cover.title,
    caption: isEn
      ? `Cover by ${cover.coverArtist} · Released ${cover.releaseDate}`
      : `${cover.coverArtist} 绘制 · ${cover.releaseDate} 发售`,
    source: isEn ? "DC Comics · Theatrical Variant Cover" : "DC Comics · 电影变体封面",
  }));
}

function MerchCoverGrid({ covers, isEn }: { covers: MerchCover[]; isEn: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const stills = coversToStills(covers, isEn);

  return (
    <>
      <ul className="grid grid-cols-3 gap-2 sm:gap-4">
        {covers.map((cover, i) => (
          <li key={cover.id} id={cover.id} className="scroll-mt-24">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left"
              aria-label={
                isEn
                  ? `View full image: ${cover.title}, ${cover.coverArtist}`
                  : `查看大图：${cover.title}，${cover.coverArtist}`
              }
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
  const { locale } = useI18n();
  const isEn = locale === "en";

  const [query, setQuery] = useState("");
  const [selectedMaker, setSelectedMaker] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");
  const [gridLightbox, setGridLightbox] = useState<Still | null>(null);

  const totalItems = useMemo(
    () => MERCH.reduce((sum, g) => sum + g.items.length, 0),
    [],
  );

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MERCH.map((group) => {
      const filteredItems = group.items.filter((item) => {
        const matchMaker =
          !selectedMaker || item.maker.toLowerCase().includes(selectedMaker.toLowerCase());
        if (!matchMaker) return false;
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.nameEn.toLowerCase().includes(q) ||
          item.maker.toLowerCase().includes(q) ||
          item.spec.toLowerCase().includes(q) ||
          item.body.toLowerCase().includes(q)
        );
      });
      return {
        ...group,
        items: filteredItems,
      };
    }).filter((group) => group.items.length > 0);
  }, [query, selectedMaker]);

  const totalMatches = useMemo(
    () => filteredGroups.reduce((sum, g) => sum + g.items.length, 0),
    [filteredGroups],
  );

  const isFiltered = Boolean(query.trim() || selectedMaker);

  function handleReset() {
    setQuery("");
    setSelectedMaker(null);
  }

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
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              Merch / Licensed Collectibles
            </p>
            <span className="classified-stamp">OFFICIAL VAULT · {totalItems} ITEMS</span>
          </div>
          <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">
            {isEn ? "Licensed Merchandise & Collectibles" : "官方周边与收藏品"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            {isEn ? MERCH_INTRO_EN : (
              "收录《新蝙蝠侠》上映期间及之后推出的官方授权衍生品，涵盖收藏级人偶与道具、高端雕像、经典载具、乐高套组、出版漫画、院线特典、艺术印刷、时装首饰、生活方式联名、大众玩具与服装，以及 Knight Models 电影线桌游战棋。系统整理马特·里夫斯电影宇宙的官方实体物料，第二部电影周边将在官方公布后持续补充。"
            )}
          </p>
        </div>
      </header>

      {/* Control Console: Search, Maker Filter, & View Mode */}
      <div className="sticky top-14 z-30 border-b border-fg/10 bg-bg/95 backdrop-blur-md sm:top-16">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isEn ? "Search collectibles by name / maker / specs..." : "检索藏品名称 / 厂牌 / 规格..."}
                className="h-9 w-full border border-fg/15 bg-surface/70 pl-9 pr-8 text-xs text-fg placeholder:text-faint focus:border-blood focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-faint hover:text-fg"
                  aria-label={isEn ? "Clear search" : "清除搜索词"}
                >
                  <X className="size-3.5" />
                </button>
              ) : null}
            </div>

            {/* View Mode Switcher & Stats */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="font-mono text-xs text-faint">
                {isFiltered ? (
                  isEn ? (
                    <>
                      Matching <span className="text-blood font-semibold">{totalMatches}</span> / {totalItems} items
                    </>
                  ) : (
                    <>
                      匹配 <span className="text-blood font-semibold">{totalMatches}</span> / {totalItems} 件
                    </>
                  )
                ) : (
                  isEn ? (
                    <>{totalItems} items cataloged</>
                  ) : (
                    <>共收录 {totalItems} 件藏品</>
                  )
                )}
              </span>

              <div className="flex items-center border border-fg/15 bg-surface/60">
                <button
                  type="button"
                  onClick={() => setViewMode("showcase")}
                  title={isEn ? "Showcase Mode (Detailed View)" : "展柜模式（详尽大图）"}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 font-display text-xs tracking-wider uppercase transition-colors",
                    viewMode === "showcase"
                      ? "bg-blood text-fg font-bold"
                      : "text-muted hover:text-fg",
                  )}
                >
                  <LayoutList className="size-3.5" />
                  <span className="hidden xs:inline">{isEn ? "Showcase" : "展柜"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  title={isEn ? "Grid Mode (Compact View)" : "网格模式（紧凑对比）"}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1.5 font-display text-xs tracking-wider uppercase transition-colors",
                    viewMode === "grid"
                      ? "bg-blood text-fg font-bold"
                      : "text-muted hover:text-fg",
                  )}
                >
                  <LayoutGrid className="size-3.5" />
                  <span className="hidden xs:inline">{isEn ? "Grid" : "网格"}</span>
                </button>
              </div>

              {isFiltered ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 px-2 py-1 font-display text-xs tracking-wider text-muted hover:text-blood uppercase transition-colors"
                  title={isEn ? "Reset all filters" : "重置所有筛选"}
                >
                  <RotateCcw className="size-3.5" />
                  <span>{isEn ? "Reset" : "重置"}</span>
                </button>
              ) : null}
            </div>
          </div>

          {/* Maker Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="shrink-0 font-display tracking-widest text-[11px] text-faint uppercase mr-1">
              {isEn ? "MAKER:" : "厂牌:"}
            </span>
            <button
              type="button"
              onClick={() => setSelectedMaker(null)}
              className={cn(
                "shrink-0 px-2.5 py-1 font-display text-[11px] tracking-wider uppercase transition-colors",
                !selectedMaker
                  ? "bg-fg text-bg font-bold"
                  : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
              )}
            >
              {isEn ? "ALL" : "全部"}
            </button>
            {TOP_MAKERS.map((m) => {
              const isSel = selectedMaker === m.match;
              return (
                <button
                  key={m.match}
                  type="button"
                  onClick={() => setSelectedMaker(isSel ? null : m.match)}
                  className={cn(
                    "shrink-0 px-2.5 py-1 font-display text-[11px] tracking-wider uppercase transition-colors",
                    isSel
                      ? "bg-blood text-fg font-bold"
                      : "border border-fg/15 text-muted hover:border-fg/40 hover:text-fg",
                  )}
                >
                  {isEn ? m.labelEn : m.labelZh}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic ChapterNav based on filtered results */}
      {filteredGroups.length > 0 ? (
        <ChapterNav
          label={isEn ? "Collectibles Sections" : "周边品类章节"}
          className="top-[7.25rem] sm:top-[7.5rem]"
          items={filteredGroups.map((g) => {
            const enG = MERCH_GROUPS_EN[g.id];
            return {
              href: `#${g.id}`,
              label: isEn
                ? `${enG?.kicker ?? g.kicker} · ${enG?.title ?? g.titleEn}`
                : `${g.kicker} · ${g.title}`,
              count: g.items.length,
            };
          })}
        />
      ) : null}

      {/* Main Content List */}
      {filteredGroups.length > 0 ? (
        filteredGroups.map((group) => {
          const enGroup = MERCH_GROUPS_EN[group.id];
          const kicker = isEn && enGroup ? enGroup.kicker : group.kicker;
          const title = isEn ? group.titleEn : group.title;
          const intro = isEn && enGroup ? enGroup.intro : group.intro;

          return (
            <section key={group.id} id={group.id} className="scroll-mt-36 border-t border-fg/10">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
                      {kicker} / {group.titleEn}
                    </p>
                    <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
                      {title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-faint">
                    {isEn ? `${group.items.length} items` : `${group.items.length} 件藏品`}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">{intro}</p>

                {/* Showcase Mode */}
                {viewMode === "showcase" ? (
                  <ul className="mt-10 grid gap-10 sm:grid-cols-2">
                    {group.items.map((item, i) => {
                      const hasCovers = Boolean(item.covers?.length);
                      const featured = !hasCovers && i === 0 && group.items.length > 1;
                      const itemName = isEn ? item.nameEn : item.name;
                      const itemSub = isEn ? item.name : item.nameEn;

                      return (
                        <li
                          key={item.id}
                          id={item.id}
                          className={featured || hasCovers ? "sm:col-span-2" : undefined}
                        >
                          <article>
                            {hasCovers && item.covers ? (
                              <MerchCoverGrid covers={item.covers} isEn={isEn} />
                            ) : (
                              <figure className="border border-fg/10 bg-[#111] crimson-glow-card">
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
                              <h3 className="font-sans text-2xl font-black tracking-tight">{itemName}</h3>
                              <p className="font-display text-sm font-semibold tracking-wide text-muted">
                                {itemSub}
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
                                tier={item.sourceTier}
                                verifiedAt={item.verifiedAt}
                              />
                            ) : null}
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  /* Compact Grid Mode */
                  <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {group.items.map((item) => {
                      const itemName = isEn ? item.nameEn : item.name;
                      const itemSub = isEn ? item.name : item.nameEn;

                      return (
                        <li
                          key={item.id}
                          id={item.id}
                          className="group flex flex-col border border-fg/10 bg-surface/40 p-3 crimson-glow-card transition-all"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setGridLightbox({
                                src: item.image,
                                title: item.name,
                                caption: `${item.maker} · ${item.year} · ${item.spec}`,
                                source: item.sourceLabel ?? (isEn ? "Official Material Archive" : "官方物料档案"),
                              })
                            }
                            className="relative aspect-square w-full overflow-hidden bg-[#111] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
                            aria-label={isEn ? `View full image for ${itemName}` : `查看 ${itemName} 大图`}
                          >
                            <img
                              src={item.image}
                              alt={item.imageAlt}
                              loading="lazy"
                              decoding="async"
                              className="size-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
                            />
                          </button>
                          <div className="mt-3 flex flex-1 flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1 text-[10px] text-faint font-display uppercase tracking-wider">
                                <span className="truncate text-blood font-semibold">{item.maker}</span>
                                <span>{item.year}</span>
                              </div>
                              <h4 className="mt-1.5 font-sans text-sm font-bold leading-snug tracking-tight text-fg group-hover:text-blood transition-colors">
                                {itemName}
                              </h4>
                              <p className="mt-0.5 line-clamp-1 text-[11px] text-faint font-display">
                                {itemSub}
                              </p>
                            </div>
                            <p className="mt-2 text-[11px] text-muted line-clamp-2 leading-relaxed">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </section>
          );
        })
      ) : (
        /* Empty State */
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="inline-flex size-14 items-center justify-center border border-fg/20 bg-surface text-faint mb-4">
            <Search className="size-6 text-blood" />
          </div>
          <h2 className="font-sans text-2xl font-black tracking-tight text-fg">
            {isEn ? "No matching collectibles found" : "未检索到匹配的周边藏品"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {isEn ? (
              <>
                No official material matched “<span className="text-fg">{query || selectedMaker}</span>”. Try different keywords or clear maker filters.
              </>
            ) : (
              <>
                没有找到与 “<span className="text-fg">{query || selectedMaker}</span>” 相关的官方物料，请尝试更换关键词或清除厂牌标签。
              </>
            )}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 border border-blood bg-blood/10 px-4 py-2 font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase hover:bg-blood hover:text-fg transition-colors"
          >
            <RotateCcw className="size-3.5" />
            <span>{isEn ? "Reset All Filters" : "重置所有筛选"}</span>
          </button>
        </div>
      )}

      {/* Grid mode Lightbox */}
      {gridLightbox ? (
        <Lightbox
          items={[gridLightbox]}
          index={0}
          onClose={() => setGridLightbox(null)}
          onIndex={() => {}}
        />
      ) : null}

      <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-faint sm:px-6">
        {isEn ? (
          <>
            The BatcaveCN The Batman Part II special archive is a non-commercial fan database and does not offer items for sale. Product imagery and specifications are curated from public materials published by Medicom Toy, BANDAI SPIRITS, Mezco, Beast Kingdom, INART, Hot Toys, McFarlane, Iron Studios, Infinity Studio, Prime 1 Studio, Factory Entertainment, Jazzinc, Spin Master, LEGO, DC Comics, LANVIN, Carhartt, PUMA, Fossil, Police, Kross Studio, House of Sillage, Dr. Squatch, Rubies, Mondo, Abrams, and Warner Bros. Home Entertainment. For film gear specifications, see{" "}
            <Link to="/gear" className="text-fg underline-offset-4 hover:underline">
              Tactical Gear
            </Link>
            ; to understand prequel novel and comic canon placements, see{" "}
            <Link to="/recap" className="text-fg underline-offset-4 hover:underline">
              Recap & Universe
            </Link>
            .
          </>
        ) : (
          <>
            Batman小站《新蝙蝠侠2》专题档案为非商业资料库，不提供任何商品购买与销售服务。产品展示图与技术规格均整理自
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
          </>
        )}
      </p>
    </main>
  );
}
