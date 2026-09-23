import { useState } from "react";
import { ChevronDown, ExternalLink, Quote, Sparkles, UserCheck, Film, Swords } from "lucide-react";
import { PRODUCTION_PHASES, SCRIPT_COMPARISONS, SCREEN_TEST_DUEL } from "@/data/production";
import {
  getLocalizedProductionPhase,
  SCRIPT_COMPARISONS_EN,
  SCREEN_TEST_DUEL_EN,
} from "@/lib/i18n/production-en";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function DossierProductionDrama() {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    "affleck-era": true,
    "creative-shift": true,
    "screen-test-reboot": true,
    "pandemic-crucible": true,
  });

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const comparisons = isZh ? SCRIPT_COMPARISONS : SCRIPT_COMPARISONS_EN;
  const screenTest = isZh ? SCREEN_TEST_DUEL : SCREEN_TEST_DUEL_EN;

  return (
    <div className="space-y-12">
      {/* 导语介绍 */}
      <div className="border border-fg/10 bg-fg/[0.02] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest text-blood uppercase">
            {isZh ? "十年立项长征 · 2013–2022" : "A DECADE IN THE MAKING · 2013–2022"}
          </span>
          <span className="classified-stamp">{isZh ? "绝密档案披露" : "DECLASSIFIED ARCHIVE"}</span>
        </div>
        <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {isZh ? (
            <>
              从 2013 年本·阿弗莱克签约加盟 DCEU，到 2022 年马特·里夫斯执导的独立新黑色悬疑巨制全球公映，《新蝙蝠侠》走过了长达近十年的制作演变。项目历经阿弗莱克以阿卡姆疯人院为舞台的“丧钟”复仇原案、主创健康危机与创作理念分歧、里夫斯接任后坚决推翻剧本的独立重构，以及帕丁森与尼古拉斯·霍尔特的世纪试镜决战，最终在疫情风暴与虚拟技术突破中破茧而出。
            </>
          ) : (
            <>
              From Ben Affleck's initial 2013 DCEU casting to Matt Reeves' 2022 neo-noir triumph, <em>The Batman</em> traversed a transformative decade of creative evolution. The production weathered Affleck's Arkham-set Deathstroke script, personal health crises, Reeves' absolute refusal to use the original screenplay, a legendary 35mm Batsuit screen test showdown between Robert Pattinson and Nicholas Hoult, and grueling pandemic halts before emerging into cinematic history.
            </>
          )}
        </p>
      </div>

      {/* 四大演进阶段手风琴 / 阶段卡片 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-fg/10 pb-3">
          <h3 className="font-display text-xs font-semibold tracking-[0.24em] text-blood uppercase">
            {isZh ? "四大演进阶段纪实" : "CHRONOLOGICAL STAGES OF EVOLUTION"}
          </h3>
          <span className="font-mono text-xs text-faint">
            {isZh ? "4 个关键历史节点" : "4 Critical Turning Points"}
          </span>
        </div>

        <div className="space-y-4">
          {PRODUCTION_PHASES.map((rawPhase, idx) => {
            const phase = getLocalizedProductionPhase(rawPhase, locale);
            const isOpen = !!expandedPhases[phase.id];

            return (
              <div
                key={phase.id}
                className={cn(
                  "border border-fg/10 bg-bg transition-colors",
                  isOpen ? "border-fg/20 shadow-sm" : "hover:border-fg/20",
                )}
              >
                <button
                  type="button"
                  onClick={() => togglePhase(phase.id)}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left sm:items-center sm:p-6"
                >
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blood">
                        {phase.period}
                      </span>
                      <span className="border border-fg/10 bg-elevated px-2 py-0.5 font-display text-[10px] tracking-wider text-muted uppercase">
                        {phase.tag}
                      </span>
                      <span className="font-mono text-[10px] text-faint">
                        PHASE 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-sans text-lg font-bold tracking-tight text-fg sm:text-xl">
                      {phase.title}
                    </h4>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-muted transition-transform duration-200",
                      isOpen && "rotate-180 text-fg",
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-fg/10 p-5 pt-4 sm:p-6 sm:pt-5">
                    <p className="text-pretty text-sm leading-relaxed text-muted">
                      {phase.summary}
                    </p>

                    {/* 核心事实列表 */}
                    <div className="mt-5 space-y-2.5 border-l-2 border-blood/50 pl-4">
                      {phase.bulletPoints.map((point, pIdx) => (
                        <p key={pIdx} className="text-pretty text-xs leading-relaxed text-muted">
                          {point}
                        </p>
                      ))}
                    </div>

                    {/* 主创一手原声引言 */}
                    {phase.keyQuotes && phase.keyQuotes.length > 0 && (
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {phase.keyQuotes.map((quote, qIdx) => (
                          <div
                            key={qIdx}
                            className="relative border border-fg/10 bg-fg/[0.015] p-4 text-xs"
                          >
                            <Quote className="absolute top-3 right-3 size-4 text-fg/10" />
                            <p className="italic leading-relaxed text-muted">
                              “{quote.text}”
                            </p>
                            <div className="mt-3 flex items-center justify-between border-t border-fg/10 pt-2 font-mono text-[10px] text-faint">
                              <span>
                                <strong className="text-fg">{quote.speaker}</strong>（{quote.role}）
                              </span>
                              {quote.sourceUrl ? (
                                <a
                                  href={quote.sourceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-blood hover:underline"
                                >
                                  {quote.source}
                                  <ExternalLink className="size-2.5" />
                                </a>
                              ) : (
                                <span>{quote.source}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 权威出处 */}
                    {phase.source && (
                      <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-faint">
                        <span>{isZh ? "核心事实来源：" : "Source:"}</span>
                        {phase.sourceUrl ? (
                          <a
                            href={phase.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-muted hover:text-fg hover:underline"
                          >
                            {phase.source}
                            <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          <span>{phase.source}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 原案 vs 重构对比视窗 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-fg/10 pb-3">
          <div className="flex items-center gap-2">
            <Swords className="size-4 text-blood" />
            <h3 className="font-display text-xs font-semibold tracking-[0.24em] text-blood uppercase">
              {isZh ? "原案剧本 vs 现行电影深度对比" : "ORIGINAL SCRIPT VS REEVES REBOOT MATRIX"}
            </h3>
          </div>
          <span className="font-mono text-xs text-faint">
            {isZh ? "大本 DCEU 方案与里夫斯新黑色宇宙差异" : "Affleck DCEU Concept vs Reeves Noir Universe"}
          </span>
        </div>

        <div className="overflow-x-auto border border-fg/10 bg-bg">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-fg/10 bg-elevated/60 font-mono text-[11px] uppercase">
                <th className="w-1/4 p-3 font-semibold text-faint">
                  {isZh ? "维度 / 考量" : "Dimension / Aspect"}
                </th>
                <th className="w-[37.5%] border-l border-fg/10 p-3 font-semibold text-blood">
                  {isZh ? "本·阿弗莱克 DCEU 废弃原案" : "Ben Affleck's Scrapped DCEU Script"}
                </th>
                <th className="w-[37.5%] border-l border-fg/10 p-3 font-semibold text-fg">
                  {isZh ? "马特·里夫斯现行重构版本" : "Matt Reeves' The Batman (2022)"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-fg/10">
              {comparisons.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-fg/[0.015]">
                  <td className="p-3 font-medium text-fg">{row.dimension}</td>
                  <td className="border-l border-fg/10 p-3 leading-relaxed text-muted">
                    {row.affleckScript}
                  </td>
                  <td className="border-l border-fg/10 p-3 leading-relaxed text-muted">
                    {row.reevesReboot}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2019 伯班克 35mm 决选试镜深度特辑 */}
      <div className="border border-blood/40 bg-fg/[0.02] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-blood">
            <Film className="size-4" />
            <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
              {screenTest.date}
            </span>
          </div>
          <span className="border border-fg/10 bg-elevated px-2 py-0.5 font-display text-[10px] tracking-widest text-faint uppercase">
            {screenTest.location}
          </span>
          <span className="classified-stamp">{isZh ? "试镜绝密复盘" : "SCREEN TEST DECLASSIFIED"}</span>
        </div>

        <h3 className="mt-4 font-sans text-xl font-bold tracking-tight text-fg sm:text-2xl">
          {screenTest.title}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
          {screenTest.summary}
        </p>

        {/* 候选双雄卡片 */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {screenTest.candidates.map((cand, cIdx) => (
            <div
              key={cIdx}
              className="border border-fg/10 bg-bg/80 p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-fg/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <UserCheck className="size-4 text-blood" />
                  <h4 className="font-sans text-base font-bold text-fg">{cand.name}</h4>
                </div>
                <span className="font-mono text-[10px] text-faint">{cand.suitWorn}</span>
              </div>

              <div className="space-y-1.5 text-xs leading-relaxed text-muted">
                <p>
                  <strong className="text-fg">{isZh ? "特质优势：" : "Key Strengths: "}</strong>
                  {cand.strengths}
                </p>
                <p>
                  <strong className="text-fg">{isZh ? "最终裁决：" : "Final Outcome: "}</strong>
                  <span className={cIdx === 0 ? "text-blood font-semibold" : ""}>
                    {cand.outcome}
                  </span>
                </p>
                <p className="border-t border-fg/10 pt-2 text-[11px] text-faint">
                  <strong>{isZh ? "后续 DC 宇宙轨迹：" : "Later DC Universe Path: "}</strong>
                  {cand.laterDcuFate}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 幕后细节列表 */}
        <div className="mt-6 space-y-2 rounded border border-fg/10 bg-elevated/40 p-4">
          <p className="font-display text-[10px] font-semibold tracking-widest text-faint uppercase">
            {isZh ? "胶片试镜未公开核心细节" : "UNRELEASED CAMERA TEST DETAILS"}
          </p>
          <ul className="space-y-1.5 text-xs text-muted list-disc pl-4">
            {screenTest.details.map((detail, dIdx) => (
              <li key={dIdx} className="leading-relaxed">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
