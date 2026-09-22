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

export const Route = createFileRoute("/dossier")({
  head: () => ({
    meta: [{ title: pageTitle("档案") }],
  }),
  component: Dossier,
});

function Dossier() {
  const jump = useMemo(
    () => [
      { href: "#facts", label: "基本信息", count: FACTS.length },
      { href: "#plot", label: "故事线索", count: PLOT.length },
      { href: "#cast", label: "演员阵容", count: CAST.length },
      { href: "#relations", label: "人物关系" },
      { href: "#places", label: "哥谭地点", count: PLACES.length },
      { href: "#log", label: "拍摄日志", count: LOG.length },
    ],
    [],
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
            档案
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            系统整理《{FILM.titleZh}
            》相关的全方位资讯，涵盖官方公告、片场实拍动态与演职员阵容；深入了解配乐创作、摄影风格与取景地解析，请访问{" "}
            <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
              幕后与视听
            </Link>
            专题。
          </p>
          <p className="mt-4 max-w-xl border-l-2 border-blood pl-3 text-xs leading-relaxed text-faint">
            追踪影片最新动态：汇总官方公告、媒体报道与公开片场路透。包含现场解析与剧情背景整理，提供全方位的电影资料参考。
          </p>
        </div>
      </header>

      <ChapterNav label="电影档案章节" items={jump} />

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24 [&>section]:scroll-mt-36">
        {/* 01 / 基本信息 */}
        <section id="facts" className="scroll-mt-24">
          <SectionKicker n="01" title="基本信息" />
          <DossierFacts />
        </section>

        {/* 02 / 故事线索 */}
        <section id="plot" className="scroll-mt-24">
          <SectionKicker n="02" title="故事线索" />
          <DossierPlot />
        </section>

        {/* 03 / 演职员 */}
        <section id="cast" className="scroll-mt-24">
          <SectionKicker n="03" title="演职员" />
          <DossierCast />
        </section>

        {/* 04 / 人物关系 */}
        <section id="relations" className="scroll-mt-24">
          <SectionKicker n="04" title="人物关系" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            点击人物节点可查看彼此关联与简介，支持直接跳转至该角色的独立人物档案。完整人物列表请访问{" "}
            <Link to="/people" className="text-fg underline-offset-4 hover:underline">
              人物
            </Link>
            。
          </p>
          <div className="mt-8">
            <RelationMap />
          </div>
        </section>

        {/* 05 / 哥谭地点 */}
        <section id="places" className="scroll-mt-24">
          <SectionKicker n="05" title="哥谭地点" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            收录哥谭市核心地标及其在故事中的现状。查看全城地图与详细地点解析请访问{" "}
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
                      loading="lazy"
                      decoding="async"
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

        {/* 06 / 幕后与视听 */}
        <section className="scroll-mt-24">
          <SectionKicker n="06" title="幕后与视听" />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            深度解析系列电影的原创配乐动机、摄影视觉风格与现实取景地。完整专题请访问{" "}
            <Link to="/craft" className="text-fg underline-offset-4 hover:underline">
              幕后与视听
            </Link>
            。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                href: "/craft#score",
                image: "/media/craft/score.jpg",
                kicker: "Score",
                title: "吉亚奇诺四主题",
                body: "解析吉亚奇诺创作的核心主题动机、猫女弦乐与经典插曲。",
              },
              {
                href: "/craft#lens",
                image: "/media/street.jpg",
                kicker: "Cinematography",
                title: "弗雷泽 / 梅塞施密特",
                body: "格雷格·弗雷泽与埃里克·梅塞施密特的光影美学与摄影机镜头解析。",
              },
              {
                href: "/craft#map",
                image: "/media/craft/st-georges.jpg",
                kicker: "Locations",
                title: "利物浦 · 格拉斯哥 · 伦敦",
                body: "利物浦、格拉斯哥与伦敦等主要取景坐标与影迷巡礼打卡指南。",
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
          <SectionKicker n="07" title="拍摄日志" />
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
