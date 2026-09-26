import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

// Contemporary screenshot of the original 2022 Rataalada GCPD seizure notice.
// Source: https://www.gamesradar.com/the-batman-rataalada-website-GCPD/
// Image credited to Warner Bros. on the source page.
const ORIGINAL_SEIZURE_SCREENSHOT = "/media/gcpd-seized.jpg";

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
      className="gcpd-seizure-stage relative flex min-h-0 flex-1 items-center justify-center overflow-x-hidden overflow-y-auto px-3 py-6 text-white sm:px-6 sm:py-8"
      aria-label={isEn ? "Original GCPD seizure notice archive" : "GCPD 原始查封公告存档"}
    >
      <div className="my-auto flex w-full max-w-[1000px] shrink-0 flex-col items-center">
        <figure className="w-full">
          <img
            src={ORIGINAL_SEIZURE_SCREENSHOT}
            alt={
              isEn
                ? "Original Rataalada.com screenshot: This Domain Has Been Seized, with the GCPD shield and original footer."
                : "原 Rataalada.com 查封页面截图，包含 THIS DOMAIN HAS BEEN SEIZED、GCPD 盾徽及原始页脚。"
            }
            className="block h-auto w-full outline-none"
            width={1000}
            height={563}
            decoding="async"
          />
          <figcaption className="sr-only">
            {isEn ? "The original 2022 GCPD seizure page" : "2022 年 GCPD 原始查封页面"}
          </figcaption>
        </figure>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <ActionButton onClick={onReviewFiles}>
            {isEn ? "Review Unlocked Files" : "查看已解锁档案"}
          </ActionButton>
          <ActionButton onClick={onRestart}>
            {isEn ? "Restart Archive" : "重新启动档案"}
          </ActionButton>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-white/25 bg-white/5 px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-white/75 uppercase transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
          >
            {isEn ? "Return to Semper Vigilans" : "返回 Semper Vigilans"}
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-center font-mono text-[9px] leading-relaxed tracking-wide text-white/50 sm:text-[10px]">
          {isEn
            ? "Historical screenshot of the 2022 Rataalada shutdown · Fan archive"
            : "2022 年 Rataalada 查封页面历史截图 · 影迷档案存档"}
          {" · "}
          <a
            href="https://www.gamesradar.com/the-batman-rataalada-website-GCPD/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
          >
            {isEn ? "Image: Warner Bros. via GamesRadar+" : "图片来源：Warner Bros. / GamesRadar+"}
          </a>
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
      className="border border-white/25 bg-white/5 px-4 py-2.5 font-mono text-[10px] tracking-[0.14em] text-white/75 uppercase transition-colors hover:border-white/55 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xs"
    >
      {children}
    </button>
  );
}
