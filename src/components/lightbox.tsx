import { useEffect } from "react";
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

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-bg/95"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-faint uppercase">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center text-fg"
          aria-label="关闭"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        {hasPrev ? (
          <button
            type="button"
            onClick={() => onIndex(index - 1)}
            className="absolute left-2 z-10 grid size-11 place-items-center text-fg sm:left-4"
            aria-label="上一张"
          >
            <ChevronLeft className="size-7" />
          </button>
        ) : null}
        <img
          src={item.src}
          alt={item.caption}
          className="h-full w-full object-contain"
        />
        {hasNext ? (
          <button
            type="button"
            onClick={() => onIndex(index + 1)}
            className="absolute right-2 z-10 grid size-11 place-items-center text-fg sm:right-4"
            aria-label="下一张"
          >
            <ChevronRight className="size-7" />
          </button>
        ) : null}
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="font-sans text-xl font-black tracking-tight">{item.title}</h2>
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
            {item.source}
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.caption}</p>
      </div>
    </div>
  );
}
