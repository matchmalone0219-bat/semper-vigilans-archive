import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { searchSite } from "@/lib/search";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchSite(query);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center text-muted hover:text-fg md:size-auto md:gap-2 md:border md:border-fg/15 md:px-3 md:py-2"
        aria-label="搜索全站"
      >
        <Search className="size-4" />
        <span className="hidden font-display text-[10px] font-semibold tracking-[0.18em] uppercase md:inline">
          搜索
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="全站搜索"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setOpen(false);
          }}
        >
          <div className="mx-auto mt-12 max-w-2xl border border-fg/15 bg-surface shadow-2xl sm:mt-20">
            <div className="flex items-center gap-3 border-b border-fg/10 px-4">
              <Search className="size-5 text-blood" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索人物、地点、装备、日志……"
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-faint"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 place-items-center text-muted hover:text-fg"
                aria-label="关闭搜索"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length ? (
                <ul>
                  {results.map((result) => (
                    <li key={`${result.kind}-${result.href}-${result.title}`}>
                      <a
                        href={`${base}${result.href}`}
                        className="grid grid-cols-[4rem_1fr] gap-3 px-3 py-3 hover:bg-elevated"
                      >
                        <span className="pt-1 font-display text-[10px] font-semibold tracking-[0.16em] text-blood uppercase">
                          {result.kind}
                        </span>
                        <span>
                          <span className="block font-sans font-black tracking-tight text-fg">
                            {result.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted">{result.subtitle}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-10 text-center text-sm text-muted">
                  没有找到匹配内容，试试更短的关键词。
                </p>
              )}
            </div>
            <p className="border-t border-fg/10 px-4 py-3 text-[11px] text-faint">
              快捷键：⌘/Ctrl + K 或 / · Esc 关闭
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
