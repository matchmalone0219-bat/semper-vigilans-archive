import { createFileRoute, Link } from "@tanstack/react-router";
import { ARKHAM_SCENE, BRUCE_JOURNALS, CASE_FILES } from "@/lib/cases";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [{ title: pageTitle("重案卷宗与现场物证") }],
  }),
  component: Cases,
});

function Cases() {
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-lair.jpg"
          alt="高谭重案卷宗与调查物证"
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            GCPD FORENSIC ARCHIVE & DETECTIVE'S LOG
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            重案卷宗与物证
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            五大凶案物证室 · 布鲁斯夜巡日记 · 阿卡姆审讯纪要
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            以严密法医物证与警局侦查卷宗视角，全面复盘第一部连环暗杀大案的现场线索、致命凶器、录像密码与终局大坝决堤物证；同时收录布鲁斯·韦恩夜巡日记《高谭项目》全文与阿卡姆 5 分钟删减审讯深度拉片。
          </p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {[
              { href: "#case-files", label: "五大凶案卷宗" },
              { href: "#journal", label: "夜巡日记手稿" },
              { href: "#arkham", label: "阿卡姆审讯纪要" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        {/* Section 01: Case Files */}
        <section id="case-files" className="scroll-mt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              01 / Evidence Locker
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              五大重案现场物证卷宗
            </h2>
            <p className="mt-2 text-sm text-muted">
              高谭市警察局 (GCPD) 重案组与义警联合侦查案件归档。按案发时间先后顺序编排。
            </p>
          </div>

          <div className="mt-10 space-y-16">
            {CASE_FILES.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="scroll-mt-24 border border-fg/15 bg-surface/30 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-fg/10 pb-4">
                  <div>
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                      {c.caseNo}
                    </span>
                    <h3 className="mt-1 font-sans text-2xl font-black tracking-tight sm:text-3xl">
                      {c.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">{c.titleEn}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-fg font-medium">{c.date}</p>
                    <p className="text-faint">{c.location}</p>
                  </div>
                </div>

                <figure className="mt-6 overflow-hidden border border-fg/10 bg-bg">
                  <img
                    src={c.image}
                    alt={c.imageAlt}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </figure>

                <div className="mt-6 grid gap-6 sm:grid-cols-3 text-sm">
                  <div>
                    <p className="text-xs text-faint uppercase tracking-wider">受害者 / 目标</p>
                    <p className="mt-1 font-bold text-fg">{c.victim}</p>
                    <p className="text-xs text-muted">{c.victimRole}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-faint uppercase tracking-wider">作案手段与作案特征</p>
                    <p className="mt-1 text-muted leading-relaxed">{c.method}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-fg/10 pt-4">
                  <p className="text-xs text-faint uppercase tracking-wider">案情简述</p>
                  <p className="mt-2 text-pretty leading-relaxed text-fg/90">{c.summary}</p>
                </div>

                <div className="mt-8 border-t border-fg/10 pt-6">
                  <h4 className="font-display text-xs font-semibold tracking-[0.24em] text-blood uppercase">
                    现场提取关键物证清单 ({c.evidences.length})
                  </h4>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {c.evidences.map((ev) => (
                      <li key={ev.id} className="overflow-hidden border border-fg/10 bg-bg">
                        {ev.image ? (
                          <img
                            src={ev.image}
                            alt={ev.imageAlt ?? ev.name}
                            className="aspect-[16/10] w-full object-cover"
                          />
                        ) : null}
                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display text-[10px] tracking-widest text-blood uppercase">
                              {ev.type}
                            </span>
                          </div>
                          <h5 className="mt-2 font-sans text-base font-black tracking-tight">
                            {ev.name}
                          </h5>
                          <p className="text-[11px] text-faint">{ev.nameEn}</p>
                          <p className="mt-2 text-pretty text-xs leading-relaxed text-muted">
                            {ev.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-fg/10 pt-4 text-xs text-faint">
                  <span className="font-semibold text-fg">司法与历史揭秘：</span> {c.revelation}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 02: Bruce's Journal */}
        <section id="journal" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              02 / The Gotham Project
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              布鲁斯·韦恩夜巡日记《高谭项目》
            </h2>
            <p className="mt-2 text-sm text-muted">
              完整收录电影开场至终局成片中，布鲁斯在地下车间深夜手写日记的全部独白文本（中英对照）。
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {BRUCE_JOURNALS.map((j) => (
              <article key={j.id} className="border-l-2 border-blood bg-surface/20 p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-fg/10 pb-3">
                  <div>
                    <span className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                      {j.day}
                    </span>
                    <h3 className="mt-1 font-sans text-2xl font-black tracking-tight">{j.title}</h3>
                  </div>
                  <p className="font-display text-xs text-faint">{j.date}</p>
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-faint">中文独白文本</p>
                    <blockquote className="text-pretty text-sm leading-relaxed text-fg italic">
                      {j.excerptZh}
                    </blockquote>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-wider text-faint">Original Screenplay English</p>
                    <blockquote className="text-pretty text-xs leading-relaxed text-muted font-mono">
                      {j.excerptEn}
                    </blockquote>
                  </div>
                </div>
                <p className="mt-6 border-t border-fg/10 pt-4 text-xs text-faint leading-relaxed">
                  <span className="font-semibold text-fg">背景场景剖析：</span> {j.context}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Section 03: Arkham Deleted Scene */}
        <section id="arkham" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              03 / Arkham Dossier
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {ARKHAM_SCENE.title}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {ARKHAM_SCENE.titleEn} · {ARKHAM_SCENE.actors}
            </p>
          </div>

          <div className="mt-8 border border-fg/10 bg-surface/30 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <img
                  src="/media/riddler.jpg"
                  alt="阿卡姆疯人院病房"
                  className="aspect-[16/9] w-full object-cover"
                />
                <p className="mt-3 text-xs text-faint leading-relaxed">
                  场景设置：{ARKHAM_SCENE.setting}。华纳官方于电影上映后在病毒网站 rataalada.com 正式解密释出。
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="text-pretty text-sm leading-relaxed text-fg/90">
                  {ARKHAM_SCENE.overview}
                </p>
                <div className="mt-6 space-y-6">
                  {ARKHAM_SCENE.points.map((pt) => (
                    <div key={pt.heading} className="border-t border-fg/10 pt-4">
                      <h4 className="font-sans text-base font-black tracking-tight text-blood">
                        {pt.heading}
                      </h4>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                        {pt.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="max-w-2xl text-sm leading-relaxed text-faint">
          查阅高谭历史发展全景，请前往{" "}
          <Link to="/recap" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            前作与宇宙回顾
          </Link>
          ；体验谜语人互动暗号挑战，请前往{" "}
          <Link to="/rataalada" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            暗号终端
          </Link>
          。
        </p>
      </div>
    </main>
  );
}
