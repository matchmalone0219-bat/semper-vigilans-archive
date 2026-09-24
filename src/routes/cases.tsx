import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ARKHAM_SCENE, BRUCE_JOURNALS, CASE_FILES } from "@/lib/cases";
import { pageTitle } from "@/lib/film";
import { ChapterNav } from "@/components/chapter-nav";
import {
  useI18n,
  CASES_INTRO_EN,
  CASE_FILES_EN,
  BRUCE_JOURNALS_EN,
  ARKHAM_SCENE_EN,
} from "@/lib/i18n";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [{ title: pageTitle("重案卷宗与现场物证") }],
  }),
  component: Cases,
});

function CaseNumberButton({ caseNo, id, isEn }: { caseNo: string; id: string; isEn: boolean }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={isEn ? "Click to copy permanent case anchor link" : "点击复制案卷永久锚点链接"}
      className="group/btn inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
    >
      <span>{caseNo}</span>
      <span className="font-mono text-[10px] tracking-normal text-faint transition-colors group-hover/btn:text-muted">
        {copied ? (isEn ? "[COPIED]" : "[已复制锚点]") : isEn ? "[COPY LINK]" : "[复制链接]"}
      </span>
    </button>
  );
}

function Cases() {
  const { locale } = useI18n();
  const isEn = locale === "en";

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-lair.jpg"
          alt={isEn ? "Gotham Forensic Case Files & Evidence" : "哥谭重案卷宗与调查物证"}
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              GCPD FORENSIC ARCHIVE & DETECTIVE'S LOG
            </p>
            <span className="classified-stamp">CONFIDENTIAL / GCPD EYES ONLY</span>
          </div>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {isEn ? "Forensic Cases & Evidence" : "重案卷宗与物证"}
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            {isEn
              ? "Five Case Evidence Lockers · Bruce Wayne's Opening & Closing Journals · Arkham Interrogation"
              : "五大凶案物证室 · 布鲁斯开场与终局日记 · 阿卡姆审讯纪要"}
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            {isEn
              ? CASES_INTRO_EN
              : "以严密法医物证与警局侦查卷宗视角，全面复盘第一部连环暗杀大案的现场线索、致命凶器、录像密码与终局大坝决堤物证；同时收录电影开场与终局两段布鲁斯·韦恩《哥谭项目》日记旁白，以及阿卡姆 5 分钟删减审讯解析。"}
          </p>
        </div>
      </header>
      <ChapterNav
        label={isEn ? "Case Dossier Sections" : "重案卷宗章节"}
        items={[
          {
            href: "#case-files",
            label: isEn ? "Five Case Files" : "五大凶案卷宗",
            count: CASE_FILES.length,
          },
          {
            href: "#journal",
            label: isEn ? "Gotham Project Journal" : "夜巡日记手稿",
            count: BRUCE_JOURNALS.length,
          },
          {
            href: "#arkham",
            label: isEn ? "Arkham Interrogation" : "阿卡姆审讯纪要",
          },
        ]}
      />

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        {/* Section 01: Case Files */}
        <section id="case-files" className="scroll-mt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              01 / Evidence Locker
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {isEn ? "Five Homicide Forensic Case Files" : "五大重案现场物证卷宗"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isEn
                ? "Joint investigation archives between GCPD Homicide Division and the Vigilante. Arranged chronologically."
                : "哥谭市警察局 (GCPD) 重案组与义警联合侦查案件归档。按案发时间先后顺序编排。"}
            </p>
          </div>

          <div className="mt-10 space-y-16">
            {CASE_FILES.map((c) => {
              const enCase = CASE_FILES_EN[c.id];
              const title = isEn ? c.titleEn : c.title;
              const victim = isEn && enCase ? enCase.victim : c.victim;
              const victimRole = isEn && enCase ? enCase.victimRole : c.victimRole;
              const date = isEn && enCase ? enCase.date : c.date;
              const location = isEn && enCase ? enCase.location : c.location;
              const summary = isEn && enCase ? enCase.summary : c.summary;
              const method = isEn && enCase ? enCase.method : c.method;
              const revelation = isEn && enCase ? enCase.revelation : c.revelation;

              return (
                <article
                  key={c.id}
                  id={c.id}
                  className="scroll-mt-28 border border-fg/15 bg-surface/30 p-6 sm:p-8 crimson-glow-card evidence-tape"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-fg/10 pb-4">
                    <div>
                      <CaseNumberButton caseNo={c.caseNo} id={c.id} isEn={isEn} />
                      <h3 className="mt-1 font-sans text-2xl font-black tracking-tight sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted">{c.titleEn}</p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-fg font-medium">{date}</p>
                      <p className="text-faint">{location}</p>
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
                      <p className="text-xs text-faint uppercase tracking-wider">
                        {isEn ? "Victim / Target" : "受害者 / 目标"}
                      </p>
                      <p className="mt-1 font-bold text-fg">{victim}</p>
                      <p className="text-xs text-muted">{victimRole}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-xs text-faint uppercase tracking-wider">
                        {isEn ? "Modus Operandi & Signatures" : "作案手段与作案特征"}
                      </p>
                      <p className="mt-1 text-muted leading-relaxed">{method}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-fg/10 pt-4">
                    <p className="text-xs text-faint uppercase tracking-wider">
                      {isEn ? "Case Briefing" : "案情简述"}
                    </p>
                    <p className="mt-2 text-pretty leading-relaxed text-fg/90">{summary}</p>
                  </div>

                  <div className="mt-8 border-t border-fg/10 pt-6">
                    <h4 className="font-display text-xs font-semibold tracking-[0.24em] text-blood uppercase">
                      {isEn
                        ? `Key Evidence Inventory (${c.evidences.length})`
                        : `现场提取关键物证清单 (${c.evidences.length})`}
                    </h4>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {c.evidences.map((ev) => {
                        const enEv = enCase?.evidences[ev.id];
                        const evName = isEn ? ev.nameEn : ev.name;
                        const evType = isEn && enEv ? enEv.type : ev.type;
                        const evDesc = isEn && enEv ? enEv.desc : ev.desc;

                        return (
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
                                  {evType}
                                </span>
                              </div>
                              <h5 className="mt-2 font-sans text-base font-black tracking-tight">
                                {evName}
                              </h5>
                              <p className="text-[11px] text-faint">{ev.nameEn}</p>
                              <p className="mt-2 text-pretty text-xs leading-relaxed text-muted">
                                {evDesc}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-fg/10 pt-4 text-xs text-faint">
                    <span className="font-semibold text-fg">
                      {isEn ? "Forensic & Historical Revelations: " : "司法与历史揭秘："}
                    </span>{" "}
                    {revelation}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 02: Bruce's Journal */}
        <section id="journal" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              02 / The Gotham Project
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {isEn ? "Bruce Wayne's Nocturnal Journal: The Gotham Project" : "布鲁斯·韦恩夜巡日记《哥谭项目》"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isEn
                ? "The two authenticated Bruce Wayne journal voiceovers heard at the film's opening and conclusion, presented in Chinese and English."
                : "收录成片中可直接核对的两段布鲁斯日记旁白：开场万圣节夜巡与终局洪灾后的希望独白（中英对照）。"}
            </p>
          </div>

          <div className="mt-10 space-y-12">
            {BRUCE_JOURNALS.map((j) => {
              const enJ = BRUCE_JOURNALS_EN[j.id];
              const title = isEn && enJ ? enJ.title : j.title;
              const day = isEn && enJ ? enJ.day : j.day;
              const context = isEn && enJ ? enJ.context : j.context;

              return (
                <article key={j.id} id={j.id} className="scroll-mt-28 border-l-2 border-blood bg-surface/20 p-6 sm:p-8 crimson-glow-card">
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-fg/10 pb-3">
                    <div>
                      <span className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                        {day}
                      </span>
                      <h3 className="mt-1 font-sans text-2xl font-black tracking-tight">{title}</h3>
                    </div>
                    <p className="font-display text-xs text-faint">{j.date}</p>
                  </div>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-faint">
                        {isEn ? "Chinese Voiceover Text" : "中文独白文本"}
                      </p>
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
                    <span className="font-semibold text-fg">
                      {isEn ? "Scene Context & Analysis: " : "背景场景剖析："}
                    </span>{" "}
                    {context}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 03: Arkham Deleted Scene */}
        <section id="arkham" className="scroll-mt-24 border-t border-fg/10 pt-16 sm:pt-24">
          <div className="border-b border-blood/40 pb-4">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              03 / Arkham Dossier
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black tracking-tight sm:text-4xl">
              {isEn ? ARKHAM_SCENE_EN.title : ARKHAM_SCENE.title}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {isEn ? ARKHAM_SCENE_EN.actors : `${ARKHAM_SCENE.titleEn} · ${ARKHAM_SCENE.actors}`}
            </p>
          </div>

          <div className="mt-8 border border-fg/10 bg-surface/30 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <img
                  src="/media/places/arkham.jpg"
                  alt={isEn ? "Arkham State Hospital: Inmate and Batman" : "阿卡姆州立医院：神秘囚犯背影与隔着铁丝防暴玻璃的蝙蝠侠"}
                  className="aspect-[16/9] w-full object-cover"
                />
                <p className="mt-3 text-xs text-faint leading-relaxed">
                  {isEn
                    ? `Scene Setting: ${ARKHAM_SCENE_EN.setting}. Officially released by Warner Bros. on rataalada.com following theatrical run.`
                    : `场景设置：${ARKHAM_SCENE.setting}。华纳官方于电影上映后在病毒网站 rataalada.com 正式解密释出。`}
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="text-pretty text-sm leading-relaxed text-fg/90">
                  {isEn ? ARKHAM_SCENE_EN.overview : ARKHAM_SCENE.overview}
                </p>
                <div className="mt-6 space-y-6">
                  {(isEn ? ARKHAM_SCENE_EN.points : ARKHAM_SCENE.points).map((pt) => (
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
          {isEn ? "To explore Gotham chronological history, visit " : "查阅哥谭历史发展全景，请前往 "}
          <Link to="/recap" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            {isEn ? "Recap & Universe" : "前作与宇宙回顾"}
          </Link>
          {isEn ? "; to experience the interactive Riddler challenge, visit " : "；体验谜语人互动暗号挑战，请前往 "}
          <Link to="/rataalada" className="text-muted underline-offset-4 hover:text-fg hover:underline">
            {isEn ? "Riddler Terminal" : "暗号终端"}
          </Link>
          {isEn ? "." : "。"}
        </p>
      </div>
    </main>
  );
}
