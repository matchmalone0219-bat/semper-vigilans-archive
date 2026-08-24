import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function LogCarousel({ images, className }: { images: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn("aspect-[16/10] w-full object-cover", className)}
      />
    );
  }

  const total = images.length;
  const prev = () => setIndex((n) => (n - 1 + total) % total);
  const next = () => setIndex((n) => (n + 1) % total);

  return (
    <div className={cn("relative overflow-hidden bg-elevated", className)}>
      <img
        src={images[index]}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover"
      />
      <button
        type="button"
        onClick={prev}
        className="absolute top-1/2 left-2 z-10 grid size-10 -translate-y-1/2 place-items-center bg-bg/70 text-fg hover:bg-bg/90"
        aria-label="上一张"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute top-1/2 right-2 z-10 grid size-10 -translate-y-1/2 place-items-center bg-bg/70 text-fg hover:bg-bg/90"
        aria-label="下一张"
      >
        <ChevronRight className="size-5" />
      </button>
      <p className="pointer-events-none absolute right-3 bottom-3 bg-bg/70 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.22em] text-fg uppercase">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}
