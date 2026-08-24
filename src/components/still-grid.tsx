import { useState } from "react";
import type { Still } from "@/lib/gallery";
import { Lightbox } from "@/components/lightbox";
import { cn } from "@/lib/cn";

export function StillGrid({
  stills,
  featuredFirst = false,
}: {
  stills: Still[];
  featuredFirst?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid gap-8 sm:grid-cols-2">
        {stills.map((still, i) => (
          <li key={still.src} className={featuredFirst && i === 0 ? "sm:col-span-2" : undefined}>
            <figure>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="block w-full text-left"
                aria-label={`查看大图：${still.title}`}
              >
                <div
                  className={cn(
                    "overflow-hidden bg-elevated",
                    featuredFirst && i === 0 ? "aspect-[16/8]" : "aspect-[3/2]",
                  )}
                >
                  <img
                    src={still.src}
                    alt={still.caption}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-opacity duration-150 hover:opacity-90"
                  />
                </div>
              </button>
              <figcaption className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <span className="font-sans text-xl font-black tracking-tight">{still.title}</span>
                <span className="font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                  {still.source}
                </span>
              </figcaption>
              <p className="mt-1 text-sm leading-relaxed text-muted">{still.caption}</p>
            </figure>
          </li>
        ))}
      </ul>
      {open !== null ? (
        <Lightbox items={stills} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      ) : null}
    </>
  );
}
