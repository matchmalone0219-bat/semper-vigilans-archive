import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type ChapterNavItem = {
  href: string;
  label: string;
  count?: string | number;
};

export function ChapterNav({
  label,
  items,
  className,
}: {
  label: string;
  items: ChapterNavItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const manualClickRef = useRef<boolean>(false);
  const manualTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const ids = items
      .map((item) => (item.href.startsWith("#") ? item.href.slice(1) : null))
      .filter((id): id is string => Boolean(id));

    if (ids.length === 0) return;

    // Set initial active from URL hash if available
    const initialHash = window.location.hash.replace(/^#/, "");
    if (initialHash && ids.includes(initialHash)) {
      setActiveId(initialHash);
    } else if (ids[0]) {
      setActiveId(ids[0]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (manualClickRef.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top),
          );
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onHashChange = () => {
      const currentHash = window.location.hash.replace(/^#/, "");
      if (currentHash && ids.includes(currentHash)) {
        setActiveId(currentHash);
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      if (manualTimerRef.current !== null) {
        clearTimeout(manualTimerRef.current);
      }
    };
  }, [items]);

  useEffect(() => {
    if (!activeId) return;
    const tabEl = tabRefs.current.get(activeId);
    if (tabEl && containerRef.current) {
      tabEl.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeId]);

  function handleTabClick(href: string) {
    if (!href.startsWith("#")) return;
    const targetId = href.slice(1);
    setActiveId(targetId);
    manualClickRef.current = true;
    if (manualTimerRef.current !== null) {
      clearTimeout(manualTimerRef.current);
    }
    manualTimerRef.current = window.setTimeout(() => {
      manualClickRef.current = false;
    }, 800);
  }

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-14 z-30 border-y border-fg/10 bg-bg/95 backdrop-blur-md sm:top-16",
        className,
      )}
    >
      <div
        ref={containerRef}
        className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-4 py-2 sm:gap-2 sm:px-6"
      >
        {items.map((item) => {
          const targetId = item.href.startsWith("#") ? item.href.slice(1) : "";
          const isActive = activeId === targetId;

          return (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => {
                if (el && targetId) {
                  tabRefs.current.set(targetId, el);
                } else if (targetId) {
                  tabRefs.current.delete(targetId);
                }
              }}
              onClick={() => handleTabClick(item.href)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative shrink-0 flex items-center gap-1.5 px-3.5 py-2 font-display text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-150 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood",
                isActive
                  ? "bg-surface text-fg shadow-sm after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blood"
                  : "text-muted hover:bg-surface/50 hover:text-fg",
              )}
            >
              <span>{item.label}</span>
              {item.count !== undefined ? (
                <span
                  className={cn(
                    "text-[10px] px-1 py-0.5 font-mono tracking-tight",
                    isActive ? "text-blood" : "text-faint",
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
