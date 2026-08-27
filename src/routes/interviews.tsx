import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageTitle } from "@/lib/film";
import {
  INTERVIEWS,
  SPEAKERS,
  SPEAKER_MAP,
  WORK_LABEL,
  type InterviewWork,
} from "@/lib/interviews";
import { SourceLink } from "@/components/source-link";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/interviews")({
  head: () => ({
    meta: [{ title: pageTitle("人物访谈") }],
  }),
  component: Interviews,
});

const WORKS: { id: "all" | InterviewWork; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "batman", label: "第一部" },
  { id: "penguin", label: "企鹅人" },
  { id: "part2", label: "第二部" },
];

function Interviews() {
  const [work, setWork] = useState<"all" | InterviewWork>("all");
  const [speaker, setSpeaker] = useState<string>("all");

  const quotes = useMemo(() => {
    return INTERVIEWS.filter((q) => (work === "all" || q.work === work) && (speaker === "all" || q.speakerId === speaker)).sort(
      (a, b) => a.iso.localeCompare(b.iso),
    );
  }, [work, speaker]);

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-bruce.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            CAST & CREW / IN THEIR WORDS
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            人物访谈
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            整理主演与主创在采访里谈第一部、《企鹅人》和续集的原话。中文为档案译文，以出处原文为准。角色尚未公开的新演员，暂不收录猜测。
          </p>
          <p className="mt-4 max-w-2xl border-l-2 border-blood pl-3 text-xs leading-relaxed text-faint">
            可按作品或发言人筛选。人物档案页也会链到对应条目。
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-6 border-b border-fg/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              Filter
            </p>
            <h2 className="mt-2 font-sans text-2xl font-black tracking-tight">按作品 / 发言人</h2>
          </div>
          <p className="text-sm text-faint">
            {quotes.length} 条
            {work !== "all" ? ` · ${WORK_LABEL[work]}` : null}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {WORKS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setWork(item.id)}
              className={cn(
                "border px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] uppercase",
                work === item.id
                  ? "border-blood bg-blood text-fg"
                  : "border-fg/20 text-muted hover:border-blood hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSpeaker("all")}
            className={cn(
              "border px-4 py-2 font-display text-xs font-semibold tracking-[0.18em] uppercase",
              speaker === "all"
                ? "border-fg bg-fg text-bg"
                : "border-fg/20 text-muted hover:border-fg hover:text-fg",
            )}
          >
            全部发言人
          </button>
          {SPEAKERS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSpeaker(s.id)}
              className={cn(
                "border px-4 py-2 font-display text-xs font-semibold tracking-[0.18em] uppercase",
                speaker === s.id
                  ? "border-fg bg-fg text-bg"
                  : "border-fg/20 text-muted hover:border-fg hover:text-fg",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        {quotes.length === 0 ? (
          <p className="mt-16 text-muted">这个筛选条件下没有条目。</p>
        ) : (
          <ul className="mt-12 space-y-12">
            {quotes.map((q) => {
              const who = SPEAKER_MAP[q.speakerId];
              return (
                <li key={q.id} id={q.id} className="scroll-mt-24 border-t border-fg/10 pt-8">
                  <div className="grid gap-6 lg:grid-cols-[8rem_1fr] lg:gap-10">
                    {who.portrait ? (
                      who.personId ? (
                        <Link to="/people/$id" params={{ id: who.personId }} className="shrink-0">
                          <img
                            src={who.portrait}
                            alt={who.name}
                            className="aspect-square w-24 object-cover lg:w-full"
                          />
                        </Link>
                      ) : (
                        <img
                          src={who.portrait}
                          alt=""
                          className="aspect-square w-24 object-cover lg:w-full"
                        />
                      )
                    ) : null}
                    <article>
                      <p className="font-display text-xs font-semibold tracking-[0.28em] text-blood uppercase">
                        {WORK_LABEL[q.work]} · {q.date}
                      </p>
                      <p className="mt-2 font-sans text-lg font-black tracking-tight">
                        {who.name}
                        <span className="ml-2 text-sm font-normal text-muted">{who.role}</span>
                      </p>
                      <blockquote className="mt-4 max-w-3xl text-pretty text-lg leading-relaxed">
                        {q.quoteZh}
                      </blockquote>
                      <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-faint italic">
                        {q.quoteEn}
                      </p>
                      {q.note ? <p className="mt-3 max-w-3xl text-sm text-muted">{q.note}</p> : null}
                      <SourceLink
                        label={q.outlet}
                        href={q.sourceUrl}
                        tier="press"
                        className="mt-4 text-xs text-faint"
                      />
                    </article>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
