import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Terminal, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/countdown";
import { Rain } from "@/components/atmosphere";
import { BiliPlayer } from "@/components/bili-player";
import { pageTitle } from "@/lib/film";
import { FILM, LOG, type LogVideo } from "@/data/film";
import { INTERVIEWS } from "@/data/interviews";
import { SPEAKER_MAP } from "@/lib/interviews";

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
    description: "续集公开信息、演职员阵容与片场拍摄日志。",
    image: "/media/p2-snow1.jpg",
  },
  {
    to: "/recap",
    kicker: "02 / Universe",
    title: "世界观",
    description: "前作、衍生剧、漫画与哥谭时间线的完整串联。",
    image: "/media/still-fire.jpg",
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
    image: "/media/merch/p1s.jpg",
  },
] as const;

const QUICK_LINKS = [
  { to: "/people", label: "人物名册", detail: "角色与派系" },
  { to: "/places", label: "哥谭地点", detail: "互动地图与据点" },
  { to: "/cases", label: "重案卷宗", detail: "案件与物证" },
  { to: "/gear", label: "装备库", detail: "战衣与载具" },
  { to: "/gallery", label: "影像画廊", detail: "剧照与片场" },
  { to: "/interviews", label: "人物访谈", detail: "主演采访摘录" },
  { to: "/roots", label: "原著溯源", detail: "漫画与影史" },
] as const;

function Home() {
  const [activeVideo, setActiveVideo] = useState<LogVideo | null>(null);

  // 1. 最新视频/预告物料（优先官方首曝/预告片）
  const videoLogs = LOG.filter((e) => e.video);
  const featuredVideoEntry = videoLogs[videoLogs.length - 1];
  const featuredVideo: LogVideo = featuredVideoEntry?.video ?? {
    platform: "bilibili",
    bvid: "BV1BTKG6mEUQ",
    title: "DC《新蝙蝠侠2》首曝镜头 · 定档 2028 年 2 月 18 日",
  };

  // 2. 最新片场实拍日志（头条 + 最近两条精简动态）
  const shootLogs = LOG.filter((e) => e.kind === "shoot" && !e.upcoming);
  const latestShoot = shootLogs[shootLogs.length - 1] ?? LOG[0];
  const recentShoots = shootLogs.slice(-3, -1).reverse();

  // 3. 最新人物访谈
  const sortedInterviews = [...INTERVIEWS].sort((a, b) => b.iso.localeCompare(a.iso));
  const latestInterview = sortedInterviews[0];
  const interviewSpeaker = latestInterview ? SPEAKER_MAP[latestInterview.speakerId] : null;

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
            <div className="mt-8 grid max-w-[26.75rem] grid-cols-2 gap-3 md:w-fit md:max-w-none md:grid-cols-[repeat(3,13rem)]">
              <Button asChild size="lg" className="h-14 w-full">
                <Link to="/dossier">
                  查阅电影档案
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
                  打开互动地图
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

      {/* 01 / Signals Hub · 三栏联动情报看板 */}
      <section className="border-b border-fg/10 bg-surface/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <div className="flex flex-col gap-4 border-b border-fg/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.32em] text-blood uppercase">
                01 / Signals Hub · 前线情报看板
              </p>
              <h2 className="mt-2 font-sans text-2xl font-black tracking-tight sm:text-4xl">
                预告影像 · 片场快讯 · 人物专访
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
              从苏格兰雪景实拍现场到主创深度专访，一站式同步《新蝙蝠侠2》最新官方公开线索。
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* 板块 1：预告与首曝影音 */}
            <div className="flex flex-col justify-between border border-fg/15 bg-surface p-5 transition-colors hover:border-fg/30 sm:p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                    01 / Video · 预告与影音
                  </span>
                  <span className="border border-blood/40 bg-blood/10 px-2 py-0.5 font-display text-[10px] font-semibold tracking-[0.16em] text-blood uppercase">
                    首发物料
                  </span>
                </div>

                <h3 className="mt-4 font-sans text-xl font-black tracking-tight text-fg">
                  首曝镜头与定档前瞻
                </h3>
                <p className="mt-1 text-xs text-muted">
                  北美定档 {FILM.releaseLabel} · 全球公映
                </p>

                <div
                  onClick={() => setActiveVideo(featuredVideo)}
                  className="group/video relative mt-4 block aspect-video w-full cursor-pointer overflow-hidden border border-fg/20 bg-elevated"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveVideo(featuredVideo);
                    }
                  }}
                >
                  <img
                    src="/media/still-fire.jpg"
                    alt="DC《新蝙蝠侠2》首发影像封面"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid size-12 place-items-center rounded-full border border-fg/40 bg-bg/85 text-fg shadow-lg backdrop-blur-sm transition-all duration-200 group-hover/video:scale-110 group-hover/video:border-blood group-hover/video:bg-blood group-hover/video:text-white">
                      <Play className="ml-0.5 size-5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
                    <span className="truncate pr-2 font-mono text-[11px] text-fg/90">
                      {featuredVideo.title}
                    </span>
                    <span className="shrink-0 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-faint">
                      Bilibili
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-faint">
                  里夫斯公布帕丁森首组测试片段并确认长耳廓头套；后续官方先行预告片发布时将在此同步首播。
                </p>
              </div>

              <div className="mt-6 border-t border-fg/10 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveVideo(featuredVideo)}
                  className="flex w-full items-center justify-between font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-colors hover:text-fg"
                >
                  <span>▶ 弹窗播放测试镜头</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* 板块 2：片场实拍动态 */}
            <div className="flex flex-col justify-between border border-fg/15 bg-surface p-5 transition-colors hover:border-fg/30 sm:p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                    02 / Production · 片场实拍
                  </span>
                  <span className="border border-fg/20 bg-fg/5 px-2 py-0.5 font-display text-[10px] font-semibold tracking-[0.16em] text-fg/80 uppercase">
                    {latestShoot.date}
                  </span>
                </div>

                <Link
                  to="/dossier"
                  hash="log"
                  className="group/log mt-4 block"
                >
                  <h3 className="font-sans text-xl font-black tracking-tight text-fg transition-colors group-hover/log:text-blood">
                    {latestShoot.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-muted">
                    {latestShoot.body}
                  </p>
                </Link>

                <div className="mt-4 border-t border-fg/10 pt-3">
                  <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">
                    近期关键进展
                  </p>
                  <ul className="mt-2 space-y-2">
                    {recentShoots.map((entry) => (
                      <li key={entry.date + entry.title} className="text-xs">
                        <Link
                          to="/dossier"
                          hash="log"
                          className="group/sub flex items-baseline gap-2 text-muted hover:text-fg"
                        >
                          <span className="shrink-0 font-mono text-[11px] text-blood">
                            {entry.date.slice(5)}
                          </span>
                          <span className="truncate transition-colors group-hover/sub:text-fg">
                            {entry.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-fg/10 pt-4">
                <Link
                  to="/dossier"
                  hash="log"
                  className="flex items-center justify-between font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-colors hover:text-fg"
                >
                  <span>完整拍摄日志与来源</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* 板块 3：人物访谈与核心金句 */}
            <div className="flex flex-col justify-between border border-fg/15 bg-surface p-5 transition-colors hover:border-fg/30 sm:p-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                    03 / Voices · 人物专访
                  </span>
                  <span className="border border-fg/20 bg-fg/5 px-2 py-0.5 font-display text-[10px] font-semibold tracking-[0.16em] text-fg/80 uppercase">
                    {latestInterview?.outlet} · {latestInterview?.date}
                  </span>
                </div>

                {interviewSpeaker ? (
                  <div className="mt-4 flex items-center gap-3">
                    {interviewSpeaker.portrait ? (
                      <img
                        src={interviewSpeaker.portrait}
                        alt={interviewSpeaker.name}
                        className="size-11 shrink-0 object-cover border border-fg/20"
                      />
                    ) : null}
                    <div>
                      <h3 className="font-sans text-base font-black tracking-tight text-fg">
                        {interviewSpeaker.name}
                      </h3>
                      <p className="text-xs text-muted">{interviewSpeaker.role}</p>
                    </div>
                  </div>
                ) : null}

                {latestInterview ? (
                  <>
                    <blockquote className="mt-3 border-l-2 border-blood pl-3 text-pretty text-xs leading-relaxed text-fg/90">
                      “{latestInterview.quoteZh.length > 90
                        ? `${latestInterview.quoteZh.slice(0, 90)}……`
                        : latestInterview.quoteZh}”
                    </blockquote>

                    <p className="mt-2 line-clamp-2 text-[11px] italic text-faint">
                      {latestInterview.quoteEn}
                    </p>
                  </>
                ) : null}
              </div>

              <div className="mt-6 border-t border-fg/10 pt-4">
                <Link
                  to="/interviews"
                  className="flex items-center justify-between font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-colors hover:text-fg"
                >
                  <span>人物访谈库（{INTERVIEWS.length} 条原话）</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心档案导航 */}
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
