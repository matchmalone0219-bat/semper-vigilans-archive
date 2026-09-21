import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { Still } from "@/lib/gallery";
import { cn } from "@/lib/cn";

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
  const stageRef = useRef<HTMLDivElement>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [index]);

  useEffect(() => {
    if (isZoomed && stageRef.current) {
      stageRef.current.scrollLeft =
        (stageRef.current.scrollWidth - stageRef.current.clientWidth) / 2;
      stageRef.current.scrollTop =
        (stageRef.current.scrollHeight - stageRef.current.clientHeight) / 2;
    }
  }, [isZoomed]);

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
      if ((ev.key === "ArrowLeft" || ev.key === "a") && hasPrev && !isZoomed) onIndex(index - 1);
      if ((ev.key === "ArrowRight" || ev.key === "d") && hasNext && !isZoomed) onIndex(index + 1);
      if (ev.key === "z" || ev.key === "Z") {
        ev.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasNext, hasPrev, index, isZoomed, onClose, onIndex]);

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
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            className="grid size-9 place-items-center text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
            aria-label={isZoomed ? "还原原始大小" : "放大查看"}
            title={isZoomed ? "还原原始大小 (Z)" : "放大查看细节 (Z)"}
          >
            {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
            aria-label="关闭"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        ref={stageRef}
        className={cn(
          "relative flex min-h-0 flex-1 items-center justify-center",
          isZoomed ? "overflow-auto p-4" : "overflow-hidden px-4 py-2 sm:px-16",
        )}
      >
        {hasPrev && !isZoomed ? (
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
          onClick={() => setIsZoomed((prev) => !prev)}
          className={cn(
            "select-none transition-all duration-200",
            isZoomed
              ? "my-auto h-auto max-h-none w-[170vw] max-w-[2200px] cursor-zoom-out object-contain sm:w-[130vw]"
              : "h-full w-full cursor-zoom-in object-contain",
          )}
          draggable={false}
        />
        {hasNext && !isZoomed ? (
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
