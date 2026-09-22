import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Quote } from "lucide-react";
import { FILM, LOG, type LogVideo } from "@/data/film";
import { INTERVIEWS } from "@/data/interviews";
import { SPEAKER_MAP } from "@/lib/interviews";
import { logVideoPoster } from "@/lib/film";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function SignalsHub({
  onSelectVideo,
}: {
  onSelectVideo: (video: LogVideo) => void;
}) {
  // 2. 最新片场实拍（先算，避免和视频头条抢同一条、同一张图）
  const shootLogs = LOG.filter((e) => e.kind === "shoot" && !e.upcoming);
  const latestShoot = shootLogs[shootLogs.length - 1] ?? LOG[0];
  const recentShoots = shootLogs.slice(-4, -1).reverse();

  // 1. 预告与影音：官方测试/预告优先，且不复用片场头条的封面
  const videoLogs = LOG.filter((e) => e.video && !e.upcoming);
  const featuredVideoEntry =
    [...videoLogs].reverse().find((e) => e.kind === "slate" || e.kind === "release") ??
    [...videoLogs].reverse().find((e) => e !== latestShoot && e.kind !== "shoot") ??
    [...videoLogs].reverse().find((e) => e !== latestShoot) ??
    videoLogs[videoLogs.length - 1];
  const featuredVideo: LogVideo = featuredVideoEntry?.video ?? {
    platform: "bilibili",
    bvid: "BV1BTKG6mEUQ",
    title: "DC《新蝙蝠侠2》首曝镜头 · 定档 2028 年 2 月 18 日",
  };
  const featuredVideoPoster = featuredVideoEntry
    ? logVideoPoster(featuredVideoEntry)
    : "/media/log/p2-camera-test.jpg";
  const archiveVideos = videoLogs
    .filter((e) => e !== featuredVideoEntry)
    .slice(-3)
    .reverse();

  // 3. 最新人物访谈（头条专访 + 2条核心主创观点）
  const sortedInterviews = [...INTERVIEWS].sort((a, b) => b.iso.localeCompare(a.iso));
  const latestInterview = sortedInterviews[0];
  const interviewSpeaker = latestInterview ? SPEAKER_MAP[latestInterview.speakerId] : null;

  const secondaryInterviewIds = ["pattinson-mymovies-direction", "farrell-sr-part2"] as const;
  const secondaryInterviews = secondaryInterviewIds
    .map((id) => INTERVIEWS.find((q) => q.id === id))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <section className="overflow-x-hidden border-b border-fg/10 bg-surface/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="flex flex-col gap-4 border-b border-fg/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.32em] text-blood uppercase">
              02 / Signals Hub · 前线情报看板
            </p>
            <h2 className="mt-2 font-sans text-2xl font-black tracking-tight sm:text-4xl">
              预告影像 · 片场快讯 · 人物专访
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
            从英国多地外景实拍到主创深度专访，一站式同步《新蝙蝠侠2》最新官方公开线索。
          </p>
        </div>

        <div className="mt-8 grid min-w-0 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* 板块 1：预告与首曝影音 */}
          <Card
            variant="default"
            showCorners
            className="flex min-w-0 w-full max-w-full flex-col justify-between overflow-hidden p-4 sm:p-6"
          >
            <div>
              <div className="flex min-w-0 items-center justify-between gap-2">
                <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                  01 / Video · 预告与影音
                </span>
                <Badge variant="blood" size="sm">
                  官方物料
                </Badge>
              </div>

              <h3 className="mt-4 line-clamp-1 font-sans text-lg font-black tracking-tight text-fg sm:text-xl">
                {featuredVideoEntry?.title ?? "首曝镜头与定档前瞻"}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {featuredVideoEntry?.date ?? FILM.releaseLabel} · B 站高清转存
              </p>

              <div
                onClick={() => onSelectVideo(featuredVideo)}
                className="group/video relative mt-3 block h-40 w-full min-w-0 cursor-pointer overflow-hidden border border-fg/20 bg-elevated sm:mt-4 sm:h-auto sm:aspect-video"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectVideo(featuredVideo);
                  }
                }}
              >
                <img
                  src={featuredVideoPoster}
                  alt={featuredVideo.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover/video:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid size-9 place-items-center rounded-full border border-fg/40 bg-bg/85 text-fg shadow-lg backdrop-blur-sm transition-all duration-200 group-hover/video:scale-110 group-hover/video:border-blood group-hover/video:bg-blood group-hover/video:text-white sm:size-12">
                    <Play className="ml-0.5 size-4 fill-current sm:size-5" />
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

              {/* 更多视频列表 */}
              <div className="mt-3.5 border-t border-fg/10 pt-3">
                <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">
                  收录影像片段
                </p>
                <ul className="mt-2 space-y-1.5">
                  {archiveVideos.map((entry, i) => (
                    <li key={entry.iso} className={i >= 2 ? "hidden sm:block" : undefined}>
                      <button
                        type="button"
                        onClick={() => entry.video && onSelectVideo(entry.video)}
                        className="flex w-full items-center gap-2 border border-transparent px-1 py-1 text-left transition-colors hover:border-fg/15 hover:bg-elevated"
                      >
                        <Play className="size-3 shrink-0 fill-current text-blood" />
                        <span className="min-w-0 flex-1 truncate text-[11px] text-muted">
                          {entry.video?.title}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-faint">{entry.date.slice(5)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-fg/10 pt-4">
              <button
                type="button"
                onClick={() => onSelectVideo(featuredVideo)}
                className="flex w-full items-center justify-between font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-colors hover:text-fg"
              >
                <span>▶ 弹窗播放最新影像</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </Card>

          {/* 板块 2：片场实拍动态（图文结合与近期时间线） */}
          <Card
            variant="default"
            showCorners
            className="flex min-w-0 w-full max-w-full flex-col justify-between overflow-hidden p-4 sm:p-6"
          >
            <div>
              <div className="flex min-w-0 items-center justify-between gap-2">
                <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                  02 / Production · 片场实拍
                </span>
                <Badge variant="outline" size="sm">
                  {latestShoot.date}
                </Badge>
              </div>

              <h3 className="mt-4 line-clamp-1 font-sans text-lg font-black tracking-tight text-fg sm:text-xl">
                {latestShoot.title}
              </h3>
              <p className="mt-1 text-xs text-muted">
                {latestShoot.locationLabel}
              </p>

              {/* 片场高清配图缩略图 */}
              <Link
                to="/dossier"
                hash="log"
                className="group/shoot relative mt-3 block h-40 w-full min-w-0 overflow-hidden border border-fg/20 bg-elevated sm:mt-4 sm:h-auto sm:aspect-video"
              >
                <img
                  src={latestShoot.image ?? "/media/p2-snow1.jpg"}
                  alt={latestShoot.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-[center_28%] transition-transform duration-300 group-hover/shoot:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <span className="line-clamp-1 font-sans text-[11px] font-bold text-fg/90">
                    外景现场：{latestShoot.title}
                  </span>
                </div>
              </Link>

              {/* 核心段落摘要 */}
              <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted">
                {latestShoot.body}
              </p>

              {/* 近期关键进展列表 */}
              <div className="mt-3.5 border-t border-fg/10 pt-3">
                <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">
                  近期关键进展
                </p>
                <ul className="mt-2 space-y-1.5">
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
                <span>查阅完整拍摄日志</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>

          {/* 板块 3：人物访谈（头条金句 + 更多核心主创原话） */}
          <Card
            variant="default"
            showCorners
            className="flex min-w-0 w-full max-w-full flex-col justify-between overflow-hidden p-4 sm:p-6"
          >
            <div>
              <div className="flex min-w-0 items-center justify-between gap-2">
                <span className="font-display text-[11px] font-semibold tracking-[0.22em] text-blood uppercase">
                  03 / Voices · 人物专访
                </span>
                <Badge variant="outline" size="sm">
                  {latestInterview?.outlet} · {latestInterview?.date}
                </Badge>
              </div>

              {/* 头条人物卡片 */}
              {interviewSpeaker ? (
                <div className="mt-4 flex items-center gap-3 border-b border-fg/10 pb-3">
                  {interviewSpeaker.portrait ? (
                    <img
                      src={interviewSpeaker.portrait}
                      alt={interviewSpeaker.name}
                      className="size-11 shrink-0 border border-fg/20 object-cover"
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

              {/* 焦点核心金句 */}
              {latestInterview ? (
                <div className="mt-3">
                  <Quote className="size-3.5 fill-current text-blood/70" />
                  <blockquote className="mt-1.5 text-pretty text-xs leading-relaxed text-fg/90">
                    “{latestInterview.quoteZh.length > 76
                      ? `${latestInterview.quoteZh.slice(0, 76)}……`
                      : latestInterview.quoteZh}”
                  </blockquote>
                  <p className="mt-2 line-clamp-1 text-[11px] italic text-faint">
                    {latestInterview.quoteEn}
                  </p>
                </div>
              ) : null}

              {/* 更多主创观点精选 */}
              <div className="mt-3.5 border-t border-fg/10 pt-3">
                <p className="font-display text-[10px] font-semibold tracking-[0.2em] text-faint uppercase">
                  更多主创观点精选
                </p>
                <ul className="mt-2 space-y-2">
                  {secondaryInterviews.map((q) => {
                    const spk = SPEAKER_MAP[q.speakerId];
                    return (
                      <li key={q.id} className="text-xs">
                        <Link
                          to="/interviews"
                          hash={q.id}
                          className="group/voice block text-muted hover:text-fg"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-fg/90 transition-colors group-hover/voice:text-blood">
                              {spk?.name ?? "主创"}
                              <span className="ml-1.5 font-normal text-faint">
                                {spk?.role.split(" / ")[0]}
                              </span>
                            </span>
                            <span className="font-mono text-[10px] text-faint">{q.date.slice(2)}</span>
                          </div>
                          <p className="mt-0.5 truncate text-[11px] text-muted transition-colors group-hover/voice:text-fg">
                            “{q.quoteZh}”
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-6 border-t border-fg/10 pt-4">
              <Link
                to="/interviews"
                className="flex items-center justify-between font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-colors hover:text-fg"
              >
                <span>查阅全部人物专访</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
