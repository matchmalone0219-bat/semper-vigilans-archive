import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/countdown";
import { Snow } from "@/components/atmosphere";
import { BiliPlayer } from "@/components/bili-player";
import { pageTitle } from "@/lib/film";
import { FILM, type LogVideo } from "@/data/film";
import { SignalsHub } from "@/components/home/signals-hub";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: pageTitle() }],
  }),
  component: Home,
});

function Home() {
  const [activeVideo, setActiveVideo] = useState<LogVideo | null>(null);
  const { locale, t } = useI18n();

  const coreLinks = [
    {
      to: "/dossier",
      kicker: "01 / Dossier",
      title: t.home.coreLinks.dossierTitle,
      description: t.home.coreLinks.dossierDesc,
      image: "/media/still-riddle-card.jpg",
    },
    {
      to: "/recap",
      kicker: "02 / Universe",
      title: t.home.coreLinks.universeTitle,
      description: t.home.coreLinks.universeDesc,
      image: "/media/still-riddler-lair.jpg",
    },
    {
      to: "/craft",
      kicker: "03 / Behind the Scenes",
      title: t.home.coreLinks.craftTitle,
      description: t.home.coreLinks.craftDesc,
      image: "/media/still-bts-monitor.jpg",
    },
    {
      to: "/merch",
      kicker: "04 / Collection",
      title: t.home.coreLinks.merchTitle,
      description: t.home.coreLinks.merchDesc,
      image: "/media/merch/p1s.jpg",
    },
  ] as const;

  useEffect(() => {
    if (!activeVideo) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative isolate min-h-svh overflow-hidden">
        <img
          src="/media/hero-winter.jpg"
          alt="蝙蝠侠立于屋顶，俯瞰暮色与积云下的哥谭"
          className="absolute inset-0 size-full object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/55 to-transparent" />
        <Snow />
        <div className="relative z-10 mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <div className="stagger-in max-w-3xl">
            <p className="font-display text-sm font-semibold tracking-[0.42em] text-fg/70 uppercase">
              Unofficial Fan Archive · Part II
            </p>
            <h1 className="mt-3 font-display font-extrabold leading-[0.88] tracking-[0.04em] text-blood uppercase">
              <span className="block text-6xl sm:text-7xl md:text-8xl">Semper</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl">Vigilans</span>
            </h1>
            <p className="mt-2 font-sans text-xl font-black tracking-tight text-fg sm:text-2xl">
              {locale === "zh" ? `《${FILM.titleZh}》非官方中文档案库` : t.home.archiveTitle}
            </p>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-fg/80 sm:text-base">
              {locale === "zh" ? (
                <>
                  {FILM.titleEn} / 《{FILM.titleZh}》
                  <br />
                  导演：马特·里夫斯 · 北美定档：{FILM.releaseLabel} · {FILM.format}
                </>
              ) : (
                <>
                  {FILM.titleEn}
                  <br />
                  Director: Matt Reeves · Theatrical Release: February 18, 2028 · Epic Crime Saga
                </>
              )}
            </p>
            <Countdown className="mt-8 max-w-lg" />
            <div className="mt-8 grid max-w-[26.75rem] grid-cols-2 gap-3 md:w-fit md:max-w-none md:grid-cols-[repeat(3,13rem)]">
              <Button asChild size="lg" className="h-14 w-full">
                <Link to="/dossier">
                  {t.home.viewDossier}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-14 w-full bg-bg/90"
              >
                <Link to="/places">
                  {locale === "zh" ? "打开互动地图" : "Interactive Map"}
                  <MapPin className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="phosphor" size="lg" className="h-14 w-full">
                <Link to="/rataalada">
                  rataalada
                  <Terminal className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 01 / Prologue · 完整背景序言（带暗调雪景氛围过渡） */}
      <section className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/p2-snow1.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-55 brightness-110 contrast-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/35 to-bg/85" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/20 to-transparent" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16 lg:py-20">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              01 / Prologue
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              {locale === "zh"
                ? "洪水退去，哥谭市即将迎来严苛寒冬。"
                : "As the floodwaters recede, Gotham faces a brutal winter."}
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-pretty leading-relaxed text-muted sm:text-base">
              {locale === "zh"
                ? "前作《新蝙蝠侠》（The Batman）以谜语人引爆防洪大坝、暴洪淹没哥谭落幕；而在衍生限定剧《企鹅人》（The Penguin）中，奥兹·科布（Oz Cobb）夺取地下黑道王座数周后，整座城市步入严酷凛冬，《新蝙蝠侠2》（The Batman: Part II）的故事由此正式拉开帷幕。目前剧组正以「Semper Vigilans」（永远警惕）为项目代号，在苏格兰格拉斯哥、英格兰伦敦等英国多地展开大规模实景拍摄。"
                : "The Batman (2022) concluded with the seawall breach submerging Gotham under catastrophic floods. Following Oz Cobb's rise to the underworld throne in The Penguin, the city plunges into a bitter winter as The Batman: Part II unfolds. Under the production codename 'Semper Vigilans', principal photography is underway across Glasgow, London, and Liverpool."}
            </p>
            <p className="text-pretty leading-relaxed text-muted sm:text-base">
              {locale === "zh"
                ? "本站为影迷自发建立的中文档案库，为您持续汇总官方公开新闻、演职员阵容、片场实拍线索与剧情推测。所有传闻均已明确标注出处与可信度，力求提供客观严谨的影视一手资讯。"
                : "An independent fan archive dedicated to compiling verified press reports, cast announcements, set dispatches, and narrative theories. Every leak and report is classified with strict source tiers and verification dates."}
            </p>
          </div>
        </div>
      </section>

      {/* 02 / Signals Hub · 三栏联动情报看板 */}
      <SignalsHub onSelectVideo={(video) => setActiveVideo(video)} />

      {/* 03 / Core Archives · 核心档案导航 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            {t.home.coreLinksKicker}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {t.home.coreLinksTitle}
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {coreLinks.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="archive-card group relative isolate block min-h-72 overflow-hidden border-t border-fg/25">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover brightness-90 transition-[filter] duration-200 ease-out group-hover:brightness-100 group-focus-visible:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-display text-xs font-semibold tracking-[0.26em] text-fg/70 uppercase">
                    {item.kicker}
                  </p>
                  <p className="mt-2 font-sans text-3xl font-black tracking-tight">{item.title}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg/75">
                    {item.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 预告片/视频模态播放弹窗 */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl border border-fg/20 bg-surface p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-fg/10 px-2 pb-2.5">
              <p className="truncate font-sans text-sm font-bold tracking-tight text-fg">
                {activeVideo.title}
              </p>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="grid size-8 place-items-center text-muted transition-colors hover:text-fg"
                aria-label="关闭视频"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-2">
              <BiliPlayer video={activeVideo} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
