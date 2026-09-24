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
import { DossierProductionDrama } from "@/components/dossier/dossier-production-drama";
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
      { href: "#craft", label: locale === "zh" ? "幕后视听" : "Craft & Cinema" },
      { href: "#features", label: locale === "zh" ? "实体收录与特辑" : "Home Video & Extras" },
      { href: "#drama", label: locale === "zh" ? "制作演变与原案" : "Production Odyssey" },
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
                Comprehensive production archive for <em>{FILM.titleEn}</em>, spanning announcements, on-set reports, and cast updates. For in-depth analysis of the score, cinematography, and filming locations, visit the{" "}
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
              : "Live production surveillance: tracking press disclosures, director dispatches, and on-location reports across the UK."}
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
        <section id="craft" className="scroll-mt-24">
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

        {/* 07 / 实体典藏与幕后特辑 */}
        <section id="features" className="scroll-mt-24">
          <SectionKicker
            n="07"
            title={locale === "zh" ? "实体典藏与官方特辑" : "Home Media & Bonus Featurettes"}
          />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {locale === "zh"
              ? "《新蝙蝠侠》4K UHD 蓝光与数字典藏版收录了超过两小时的高清制作花絮、未公映删减片段与主创逐帧视听讲评，是研究本片电影工业与幕后工艺的重要视听档案："
              : "The Batman 4K UHD Blu-ray and digital editions include over two hours of exclusive making-of documentaries, unreleased deleted scenes, and full-length filmmaker commentary:"}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-fg/10 bg-fg/[0.02] p-5">
              <span className="font-mono text-[10px] tracking-widest text-blood uppercase">
                DOCUMENTARY · 53 MIN
              </span>
              <h3 className="mt-2 font-sans text-base font-bold tracking-tight">
                {locale === "zh" ? "《复仇诞生：完整长片特辑》" : "Vengeance In The Making"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {locale === "zh"
                  ? "53 分钟重磅长片，全景记录从剧本重构、疫情两度停摆到利维斯登与芝加哥实拍的全过程。"
                  : "53-minute deep-dive doc tracing script origins, pandemic halts, Leavesden volume shoots, and Chicago stunts."}
              </p>
            </div>

            <div className="border border-fg/10 bg-fg/[0.02] p-5">
              <span className="font-mono text-[10px] tracking-widest text-blood uppercase">
                DELETED SCENE · 5 MIN
              </span>
              <h3 className="mt-2 font-sans text-base font-bold tracking-tight">
                {locale === "zh" ? "《场景 52：阿卡姆小丑对谈》" : "Scene 52: Arkham Joker Scene"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {locale === "zh"
                  ? "蝙蝠侠携谜语人档案赴阿卡姆审讯巴里·基奥甘饰演的小丑，包含马特·里夫斯随片导演讲评。"
                  : "Batman visits Arkham to profile the Riddler with Barry Keoghan's Joker, featuring Matt Reeves' audio commentary."}
              </p>
            </div>

            <div className="border border-fg/10 bg-fg/[0.02] p-5">
              <span className="font-mono text-[10px] tracking-widest text-blood uppercase">
                PROSTHETICS & FX
              </span>
              <h3 className="mt-2 font-sans text-base font-bold tracking-tight">
                {locale === "zh" ? "《企鹅人蜕变：特效化妆实录》" : "A Transformation: The Penguin"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {locale === "zh"
                  ? "好莱坞顶级特效化妆师 Mike Marino 记录单次 4 小时将科林·法瑞尔塑造成奥兹·科布的全流程。"
                  : "Mike Marino's Oscar-nominated prosthetic artistry documenting Colin Farrell's 4-hour daily transformation."}
              </p>
            </div>

            <div className="border border-fg/10 bg-fg/[0.02] p-5">
              <span className="font-mono text-[10px] tracking-widest text-blood uppercase">
                ACTION CHOREOGRAPHY
              </span>
              <h3 className="mt-2 font-sans text-base font-bold tracking-tight">
                {locale === "zh" ? "《雨夜追车场面解构》" : "Anatomy of the Car Chase"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {locale === "zh"
                  ? "实拍撞击机位、特技驾驶员视角与火焰喷射器战车在高速雨夜实测的惊险机位拆解。"
                  : "Practical collision rigs, stunt driver perspective, and the flame-throwing Batmobile's rain-slicked highway chase."}
              </p>
            </div>
          </div>
        </section>

        {/* 08 / 制作坎坷实录 */}
        <section id="drama" className="scroll-mt-24">
          <SectionKicker
            n="08"
            title={locale === "zh" ? "制作演变史与废弃原案" : "Production Odyssey & Scrapped Script"}
          />
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {locale === "zh"
              ? "回顾《新蝙蝠侠》十年漫长演进：从本·阿弗莱克 DCEU 丧钟复仇原案、主创健康危机与创作理念分歧，到马特·里夫斯全面推翻重构独立新黑色侦探宇宙，以及罗伯特·帕丁森与尼古拉斯·霍尔特的终极胶片试镜决战："
              : "Tracing the decade-long odyssey of The Batman: from Ben Affleck's Arkham-set Deathstroke script and creative crossroads to Matt Reeves' grounded Elseworlds reboot and the historic 35mm screen test between Pattinson and Hoult:"}
          </p>
          <div className="mt-8">
            <DossierProductionDrama />
          </div>
        </section>

        {/* 09 / 拍摄日志 */}
        <section id="log" className="scroll-mt-24">
          <SectionKicker n="09" title={locale === "zh" ? "拍摄日志" : "Production Log"} />
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
