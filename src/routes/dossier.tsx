import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/film";
import { CAST, FACTS, FILM, LOG, PLOT } from "@/data/film";
import { RelationMap } from "@/components/relation-map";
import { PLACES } from "@/lib/places";
import { ChapterNav } from "@/components/chapter-nav";
import { DossierFacts } from "@/components/dossier/dossier-facts";
import { DossierPlot } from "@/components/dossier/dossier-plot";
import { DossierCast } from "@/components/dossier/dossier-cast";
import { DossierShootLog } from "@/components/dossier/dossier-shoot-log";
import { useI18n } from "@/lib/i18n";
import { PLACES_EN } from "@/lib/i18n/places-en";

export const Route = createFileRoute("/dossier")({
  head: () => ({
    meta: [{ title: pageTitle("档案") }],
  }),
  component: Dossier,
});

function Dossier() {
  const { locale } = useI18n();
  const jump = useMemo(
    () => [
      { href: "#facts", label: locale === "zh" ? "基本信息" : "Key Facts", count: FACTS.length },
      { href: "#plot", label: locale === "zh" ? "故事线索" : "Plot Clues", count: PLOT.length },
      { href: "#cast", label: locale === "zh" ? "演员阵容" : "Cast Roster", count: CAST.length },
      { href: "#relations", label: locale === "zh" ? "人物关系" : "Character Network" },
      { href: "#places", label: locale === "zh" ? "哥谭地点" : "Gotham Locations", count: PLACES.length },
      { href: "#log", label: locale === "zh" ? "拍摄日志" : "Shoot Log", count: LOG.length },
    ],
    [locale],
  );

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
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              DOSSIER / {FILM.workingTitle}
            </p>
            <span className="classified-stamp">ACTIVE INVESTIGATION</span>
          </div>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {locale === "zh" ? "档案" : "Film Dossier"}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            {locale === "zh" ? (
              <>
                系统整理《{FILM.titleZh}
                》相关的全方位资讯，涵盖官方公告、片场实拍动态与演职员阵容；深入了解配乐创作、摄影风格与取景地解析，请访问{" "}
                <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
                  幕后与视听
                </Link>
                专题。
              </>
            ) : (
              <>
                Comprehensive archive of verified intel for <em>{FILM.titleEn}</em>, spanning official announcements, on-set leaks, and full cast rosters. For in-depth analysis of the score, cinematography, and filming locations, visit the{" "}
                <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
                  Craft & Visuals
                </Link>{" "}
                dossier.
              </>
            )}
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-blood pl-3 text-xs leading-relaxed text-faint">
            {locale === "zh"
              ? "追踪影片最新动态：汇总官方公告、媒体报道与公开片场路透。包含现场解析与剧情背景整理，提供全方位的电影资料参考。"
              : "Live production surveillance: tracking press disclosures, director dispatches, and on-location reports across the UK with verified background context."}
          </p>
        </div>
      </header>

      <ChapterNav label={locale === "zh" ? "电影档案章节" : "Dossier Chapters"} items={jump} />

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24 [&>section]:scroll-mt-36">
        {/* 01 / 基本信息 */}
        <section id="facts" className="scroll-mt-24">
          <SectionKicker n="01" title={locale === "zh" ? "基本信息" : "Key Facts"} />
          <DossierFacts />
        </section>

        {/* 02 / 故事线索 */}
        <section id="plot" className="scroll-mt-24">
          <SectionKicker n="02" title={locale === "zh" ? "故事线索" : "Plot Clues"} />
          <DossierPlot />
        </section>

        {/* 03 / 演职员 */}
        <section id="cast" className="scroll-mt-24">
          <SectionKicker n="03" title={locale === "zh" ? "演职员" : "Cast & Crew"} />
          <DossierCast />
        </section>

        {/* 04 / 人物关系 */}
        <section id="relations" className="scroll-mt-24">
          <SectionKicker n="04" title={locale === "zh" ? "人物关系" : "Character Relations"} />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {locale === "zh" ? (
              <>
                点击人物节点可查看彼此关联与简介，支持直接跳转至该角色的独立人物档案。完整人物列表请访问{" "}
                <Link to="/people" className="text-fg underline-offset-4 hover:underline">
                  人物
                </Link>
                。
              </>
            ) : (
              <>
                Click character nodes to inspect alliances, rivalries, and dossier briefs. View full character dossiers at{" "}
                <Link to="/people" className="text-fg underline-offset-4 hover:underline">
                  Characters
                </Link>
                .
              </>
            )}
          </p>
          <div className="mt-8">
            <RelationMap />
          </div>
        </section>

        {/* 05 / 哥谭地点 */}
        <section id="places" className="scroll-mt-24">
          <SectionKicker n="05" title={locale === "zh" ? "哥谭地点" : "Gotham Locations"} />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {locale === "zh" ? (
              <>
                收录哥谭市核心地标及其在故事中的现状。查看全城地图与详细地点解析请访问{" "}
                <Link to="/places" className="text-fg underline-offset-4 hover:underline">
                  地点
                </Link>
                。
              </>
            ) : (
              <>
                Key Gotham landmarks and their narrative status in the aftermath of the flood. For the tactical map, explore{" "}
                <Link to="/places" className="text-fg underline-offset-4 hover:underline">
                  Locations
                </Link>
                .
              </>
            )}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {PLACES.slice(0, 6).map((place) => {
              const enPlace = PLACES_EN[place.id];
              return (
                <li key={place.id}>
                  <Link to="/places/$id" params={{ id: place.id }} className="group block">
                    <div className="aspect-[16/9] overflow-hidden bg-elevated">
                      <img
                        src={place.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                      />
                    </div>
                    <p className="mt-2 font-sans font-black tracking-tight">
                      {locale === "zh" ? place.name : (enPlace?.name ?? place.name)}
                    </p>
                    <p className="text-sm text-faint">
                      {locale === "zh" ? place.status : (enPlace?.status ?? place.status)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 06 / 幕后与视听 */}
        <section className="scroll-mt-24">
          <SectionKicker n="06" title={locale === "zh" ? "幕后与视听" : "Behind the Scenes"} />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {locale === "zh" ? (
              <>
                深度解析系列电影的原创配乐动机、摄影视觉风格与现实取景地。完整专题请访问{" "}
                <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
                  幕后与视听
                </Link>
                。
              </>
            ) : (
              <>
                In-depth breakdown of Giacchino's original motifs, noir cinematography, and UK location scout. Visit{" "}
                <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
                  Craft & Visuals
                </Link>{" "}
                for the full dossier.
              </>
            )}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/craft#score",
                image: "/media/craft/score.jpg",
                kicker: "Score",
                title: locale === "zh" ? "吉亚奇诺四主题" : "Giacchino's Four Themes",
                body:
                  locale === "zh"
                    ? "解析吉亚奇诺创作的核心主题动机、猫女弦乐与经典插曲。"
                    : "Analysis of Giacchino's core character motifs, Catwoman strings, and licensed tracks.",
              },
              {
                href: "/craft#lens",
                image: "/media/street.jpg",
                kicker: "Cinematography",
                title: locale === "zh" ? "弗雷泽 / 梅塞施密特" : "Fraser / Messerschmidt",
                body:
                  locale === "zh"
                    ? "格雷格·弗雷泽与埃里克·梅塞施密特的光影美学与摄影机镜头解析。"
                    : "Lighting aesthetics and camera optics of Greig Fraser and Erik Messerschmidt.",
              },
              {
                href: "/craft#map",
                image: "/media/craft/st-georges.jpg",
                kicker: "Locations",
                title: locale === "zh" ? "利物浦 · 格拉斯哥 · 伦敦" : "Liverpool · Glasgow · London",
                body:
                  locale === "zh"
                    ? "利物浦、格拉斯哥与伦敦等主要取景坐标与影迷巡礼打卡指南。"
                    : "Major UK filming coordinates and cinematic walking guide across key locations.",
              },
            ].map((card) => (
              <li key={card.href}>
                <Link to="/craft" hash={card.href.split("#")[1]} className="group block">
                  <div className="aspect-[16/9] overflow-hidden bg-elevated">
                    <img
                      src={card.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
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

        {/* 07 / 拍摄日志 */}
        <section id="log" className="scroll-mt-24">
          <SectionKicker n="07" title={locale === "zh" ? "拍摄日志" : "Production Log"} />
          <DossierShootLog />
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
