import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/countdown";
import { Rain } from "@/components/atmosphere";
import { CAST, FILM, latestLog, pageTitle } from "@/lib/film";
import { STILL_TEASERS } from "@/lib/gallery";
import { RECAPS } from "@/lib/recap";
import { GEAR } from "@/lib/gear";
import { MERCH_TEASERS } from "@/lib/merch";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: pageTitle() }],
  }),
  component: Home,
});

function Home() {
  const leadCast = CAST.filter((c) => c.status === "confirmed").slice(0, 4);
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

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            01 / Prologue
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black leading-tight tracking-tight sm:text-5xl">
            洪水退去，哥谭市即将迎来严苛寒冬。
          </h2>
        </div>
        <div className="space-y-5 text-pretty text-base leading-relaxed text-muted lg:col-span-7">
          <p>
            前作《新蝙蝠侠》以谜语人引发的哥谭暴洪收尾，续集已公开冬季视觉元素。格拉斯哥片场出现人造雪与蝙蝠战车，制作标识可见「Semper
            Vigilans」（永远警惕）；华纳兄弟尚未单独公开说明该代号的性质。
          </p>
          <p>
            本站为影迷自发建立的中文资料库，持续汇总官方公开信息、可靠媒体报道、片场可见线索与影迷推测。重要更新尽可能附原始或可靠来源，无法核实的内容会明确降级为线索或传闻。
          </p>
          <Link
            to="/dossier"
            hash="log"
            className="mt-2 block border border-fg/15 p-4 hover:border-blood"
          >
            {latest.image ? (
              <img
                src={latest.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="mb-3 aspect-[16/8] w-full object-cover"
              />
            ) : null}
            <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
              最新拍摄动态 · {latest.date}
            </p>
            <p className="mt-2 font-sans text-xl font-black tracking-tight text-fg">
              {latest.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{latest.body}</p>
            <span className="mt-3 block font-display text-[10px] font-semibold tracking-[0.18em] text-blood uppercase">
              完整日志与来源 →
            </span>
          </Link>
          <Link
            to="/updates"
            className="text-xs tracking-[0.2em] text-muted uppercase hover:text-fg"
          >
            查看站点更新记录 →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              02 / Universe Timeline
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              宇宙作品时间线
            </h2>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <Link
              to="/recap"
              className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
            >
              查看完整回顾
            </Link>
            <Link
              to="/roots"
              className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
            >
              原著渊源
            </Link>
          </div>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {RECAPS.map((work) => (
            <li key={work.id}>
              <Link
                to="/recap"
                hash={work.id}
                className="group relative isolate block overflow-hidden"
              >
                <img
                  src={work.image}
                  alt={work.imageAlt}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xs font-semibold tracking-[0.28em] text-fg/70 uppercase">
                    {work.when} · {work.form}
                  </p>
                  <p className="mt-1 font-sans text-2xl font-black tracking-tight">{work.title}</p>
                  <p className="mt-2 max-w-md text-sm text-fg/80">{work.lede}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-fg/10 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
                03 / Cast & Characters
              </p>
              <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
                核心演职员与角色
              </h2>
            </div>
            <div className="hidden items-center gap-5 sm:flex">
              <Link
                to="/people"
                className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
              >
                人物名册
              </Link>
              <Link
                to="/craft"
                className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
              >
                幕后与视听
              </Link>
              <Link
                to="/dossier"
                hash="relations"
                className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
              >
                关系图谱
              </Link>
              <Link
                to="/dossier"
                className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
              >
                完整档案
              </Link>
            </div>
          </div>
          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {leadCast.map((person) => {
              const inner = (
                <>
                  <p className="font-display text-sm font-semibold tracking-[0.22em] text-muted uppercase">
                    {person.roleEn}
                  </p>
                  <p className="mt-3 font-sans text-2xl font-black leading-snug tracking-tight">
                    {person.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{person.role}</p>
                </>
              );
              return (
                <li key={person.roleEn} className="bg-bg">
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              04 / Gear & Tech
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              蝙蝠侠专属装备
            </h2>
          </div>
          <Link to="/gear" className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg">
            全部装备解析
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {GEAR.filter((g) => ["suit", "car", "grapnel"].includes(g.id)).map((item) => (
            <li key={item.id}>
              <Link
                to="/gear"
                hash={item.id}
                className="group relative isolate block overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-xs font-semibold tracking-[0.28em] text-fg/70 uppercase">
                    {item.nameEn}
                  </p>
                  <p className="mt-1 font-sans text-xl font-black tracking-tight">{item.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              05 / Stills Gallery
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              精选剧照与片场画廊
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
          >
            浏览全部剧照
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STILL_TEASERS.map((still) => (
            <Link
              key={still.src}
              to="/gallery"
              className="group relative isolate block aspect-[16/10] overflow-hidden"
            >
              <img
                src={still.src}
                alt={still.title}
                className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-xs font-semibold tracking-[0.28em] text-fg/70 uppercase">
                  {still.kicker}
                </p>
                <p className="mt-1 font-sans text-xl font-black tracking-tight">{still.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="crt-shell">
        <Link
          to="/rataalada"
          className="relative z-10 mx-auto block max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
        >
          <p className="text-sm font-medium tracking-[0.32em] text-phosphor/70 uppercase">
            YOU ARE EL RATA ALADA
          </p>
          <h2 className="mt-3 font-mono text-3xl font-medium tracking-wide sm:text-5xl">
            谜语人暗号挑战
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-phosphor/80 sm:text-base">
            复刻自 2021 年华纳官方解谜网站
            rataalada.com：黑底绿字经典黑客命令行终端，答对三条一组的谜语即可解密解锁专属剧照与彩蛋文件。
          </p>
          <p className="mt-6 text-sm tracking-[0.22em] uppercase">{">"} 输入 Y 开始挑战 →</p>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              06 / Collectibles
            </p>
            <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              官方周边与收藏品
            </h2>
          </div>
          <Link
            to="/merch"
            className="text-xs tracking-[0.28em] text-muted uppercase hover:text-fg"
          >
            查看全部分类
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {MERCH_TEASERS.map((item) => (
            <Link
              key={item.id}
              to="/merch"
              hash={item.id}
              className="group relative isolate block overflow-hidden bg-elevated"
            >
              <img
                src={item.image}
                alt={item.imageAlt}
                className="aspect-[16/10] w-full object-contain p-4 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="border-t border-fg/10 p-4">
                <p className="font-display text-xs font-semibold tracking-[0.28em] text-fg/70 uppercase">
                  {item.maker}
                </p>
                <p className="mt-1 font-sans text-xl font-black tracking-tight">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
