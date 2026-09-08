import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Still } from "@/lib/gallery";

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Still[];
  index: number;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(ev: KeyboardEvent) {
      if (ev.key === "Escape") onClose();
      if (ev.key === "ArrowLeft" && hasPrev) onIndex(index - 1);
      if (ev.key === "ArrowRight" && hasNext) onIndex(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasNext, hasPrev, index, onClose, onIndex]);

  if (!item) return null;

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? null;
    if (touchEndX === null) return;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && hasNext) {
        onIndex(index + 1);
      } else if (diff < 0 && hasPrev) {
        onIndex(index - 1);
      }
    }
    touchStartX.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-bg/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-fg/10 px-4 py-3 sm:px-6">
        <p className="font-display text-xs font-semibold tracking-[0.24em] text-faint uppercase">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid size-9 place-items-center text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
          aria-label="关闭"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-2 sm:px-16">
        {hasPrev ? (
          <button
            type="button"
            onClick={() => onIndex(index - 1)}
            className="absolute left-2 z-10 grid size-11 place-items-center rounded-none bg-surface/50 text-muted backdrop-blur-sm transition-colors hover:bg-surface hover:text-fg sm:left-4"
            aria-label="上一张"
          >
            <ChevronLeft className="size-7" />
          </button>
        ) : null}
        <img
          key={item.src}
          src={item.src}
          alt={item.caption}
          className="h-full w-full select-none object-contain transition-opacity duration-200"
          draggable={false}
        />
        {hasNext ? (
          <button
            type="button"
            onClick={() => onIndex(index + 1)}
            className="absolute right-2 z-10 grid size-11 place-items-center rounded-none bg-surface/50 text-muted backdrop-blur-sm transition-colors hover:bg-surface hover:text-fg sm:right-4"
            aria-label="下一张"
          >
            <ChevronRight className="size-7" />
          </button>
        ) : null}
      </div>

      {/* Bottom Caption Bar */}
      <div className="shrink-0 border-t border-fg/10 bg-surface/40 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="font-sans text-base font-bold tracking-tight text-fg sm:text-lg">
              {item.title}
            </h2>
            <p className="font-mono text-[11px] tracking-wider text-faint uppercase">
              {item.source}
            </p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
