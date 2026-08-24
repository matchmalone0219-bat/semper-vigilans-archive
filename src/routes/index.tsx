import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/countdown";
import { Rain } from "@/components/atmosphere";
import { FILM, latestLog, pageTitle } from "@/lib/film";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: pageTitle() }],
  }),
  component: Home,
});

const CORE_LINKS = [
  {
    to: "/dossier",
    kicker: "01 / Dossier",
    title: "电影档案",
    description: "续集公开信息、演员阵容、拍摄日志与来源核验。",
    image: "/media/p2-snow1.jpg",
  },
  {
    to: "/recap",
    kicker: "02 / Universe",
    title: "世界观",
    description: "前作、衍生剧、漫画与哥谭时间线的完整串联。",
    image: "/media/signal.jpg",
  },
  {
    to: "/craft",
    kicker: "03 / Behind the Scenes",
    title: "幕后",
    description: "摄影、配乐、声音设计与英伦实景取景巡礼。",
    image: "/media/still-bruce.jpg",
  },
  {
    to: "/merch",
    kicker: "04 / Collection",
    title: "收藏",
    description: "官方授权人偶、载具、出版物与艺术收藏品。",
    image: "/media/merch/inart.jpg",
  },
] as const;

const QUICK_LINKS = [
  { to: "/people", label: "人物名册", detail: "角色与派系" },
  { to: "/places", label: "哥谭地点", detail: "地标与据点" },
  { to: "/cases", label: "重案卷宗", detail: "案件与物证" },
  { to: "/gear", label: "装备库", detail: "战衣与载具" },
  { to: "/gallery", label: "影像画廊", detail: "剧照与片场" },
  { to: "/roots", label: "原著溯源", detail: "漫画与影史" },
] as const;

function Home() {
  const latest = latestLog();

  return (
    <main>
      <section className="relative isolate min-h-svh overflow-hidden">
        <img
          src="/media/gotham.jpg"
          alt="雨夜中的哥谭市全景"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/55 to-transparent" />
        <Rain />
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
              《{FILM.titleZh}》非官方中文档案库
            </p>
            <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-fg/80 sm:text-base">
              {FILM.titleEn} / 《{FILM.titleZh}》
              <br />
              导演：马特·里夫斯 · 北美定档：{FILM.releaseLabel} · {FILM.format}
            </p>
            <Countdown className="mt-8 max-w-lg" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/dossier">
                  查阅电影档案
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/rataalada">进入暗号终端</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-fg/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16 lg:py-20">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              01 / Prologue
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black leading-tight tracking-tight sm:text-5xl">
              洪水退去，哥谭市即将迎来严苛寒冬。
            </h2>
            <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted">
              前作《The Batman》以谜语人引爆炸坝、洪水漫灌哥谭落幕；而衍生剧《The Penguin》中奥兹·科布（Oz Cobb）夺取黑道王座数周后，整座城市步入寒冬，《The Batman Part II》的故事由此正式拉开帷幕。目前剧组正以「Semper Vigilans」（永远警惕）为项目代号，在苏格兰格拉斯哥展开大规模雪景实拍。
            </p>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
              本站为影迷自发建立的中文资料库，为您持续汇总官方公开新闻、演职员名单、片场实拍线索与剧情推测。所有传闻均已明确标注来源，力求提供客观严谨的影视资讯。
            </p>
          </div>
          <div>
            <p className="mb-3 font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
              Latest Signal · {latest.date}
            </p>
            <Link
              to="/dossier"
              hash="log"
              className="group block overflow-hidden border border-fg/15 bg-surface hover:border-blood"
            >
              {latest.image ? (
                <img
                  src={latest.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/8] w-full object-cover"
                />
              ) : null}
              <div className="p-5 sm:p-7">
                <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                  最新拍摄动态 · {latest.date}
                </p>
                <p className="mt-2 font-sans text-xl font-black tracking-tight text-fg sm:text-2xl">
                  {latest.title}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{latest.body}</p>
                <span className="mt-5 block font-display text-[10px] font-semibold tracking-[0.18em] text-blood uppercase">
                  完整日志与来源 →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div>
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            Core Archives
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            核心档案
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {CORE_LINKS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="group relative isolate block min-h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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

        <div className="mt-8 border-y border-fg/10 py-4">
          <p className="mb-3 font-display text-[10px] font-semibold tracking-[0.22em] text-faint uppercase">
            Quick Access · 横向浏览
          </p>
          <ul className="flex snap-x gap-3 overflow-x-auto pb-2">
            {QUICK_LINKS.map((item) => (
              <li key={item.to} className="min-w-48 flex-1 snap-start">
                <Link
                  to={item.to}
                  className="flex h-full items-center justify-between gap-4 border border-fg/10 bg-surface p-4 hover:border-blood"
                >
                  <span>
                    <span className="block font-sans font-black tracking-tight">{item.label}</span>
                    <span className="mt-1 block text-xs text-faint">{item.detail}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-blood" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
