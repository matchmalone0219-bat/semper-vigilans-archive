import type { ReactNode } from "react";

export function GcpdSeizurePage({
  isEn,
  onReviewFiles,
  onRestart,
}: {
  isEn: boolean;
  onReviewFiles: () => void;
  onRestart: () => void;
}) {
  return (
    <section
      className="gcpd-seizure-stage relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 py-10 text-white sm:px-8"
      aria-labelledby="gcpd-seizure-title"
    >
      <div className="gcpd-seizure-noise" aria-hidden="true" />
      <div className="gcpd-seizure-vignette" aria-hidden="true" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <p className="mb-3 font-sans text-[10px] font-semibold tracking-[0.34em] text-white/55 uppercase sm:text-xs">
          Gotham City Police Department · Cybercrime Division
        </p>

        <h1
          id="gcpd-seizure-title"
          className="font-sans text-3xl font-black leading-none tracking-[-0.035em] text-white uppercase sm:text-5xl lg:text-6xl"
        >
          This Domain Has Been Seized
        </h1>

        <p className="mt-5 max-w-4xl font-sans text-[10px] font-semibold leading-relaxed tracking-[0.025em] text-white/75 uppercase sm:text-xs">
          RATAALADA.COM AND YOUAREELRATAALADA.COM ARE UNDER GCPD CONTROL FOLLOWING A GOTHAM
          CITY DISTRICT COURT SEIZURE WARRANT. FEDERAL FORFEITURE AUTHORITIES INCLUDE
          18 U.S.C. §§ 981 AND 982.
        </p>

        <div className="mt-9 flex flex-col items-center sm:mt-12">
          <img
            src="/media/rataalada/gcpd-seal.svg"
            alt="City of Gotham Police Department emblem"
            className="h-36 w-32 object-contain outline-none sm:h-44 sm:w-40"
          />
          <p className="mt-4 font-sans text-3xl font-black tracking-[0.2em] text-white uppercase sm:text-4xl">
            GCPD
          </p>
          <p className="mt-1 font-sans text-[10px] font-semibold tracking-[0.08em] text-white/75">
            Gotham City Police Department
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-12">
          <ActionButton onClick={onReviewFiles}>
            {isEn ? "Review Unlocked Files" : "查看已解锁档案"}
          </ActionButton>
          <ActionButton onClick={onRestart}>
            {isEn ? "Restart Archive" : "重新启动档案"}
          </ActionButton>
        </div>

        <p className="mt-7 max-w-2xl font-mono text-[9px] leading-relaxed tracking-[0.14em] text-white/40 uppercase sm:text-[10px]">
          {isEn
            ? "Archived reconstruction · Original Rataalada shutdown: 29 Mar 2022 · Fan archive recreation"
            : "历史档案复原 · 原 Rataalada 网站于 2022-03-29 进入查封状态 · 本页为影迷档案重构"}
        </p>
      </div>
    </section>
  );
}

function ActionButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-white/25 bg-black/20 px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-white/75 uppercase transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
    >
      {children}
    </button>
  );
}
