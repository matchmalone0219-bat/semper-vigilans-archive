import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { searchSite, type SearchItem } from "@/lib/search";
import { cn } from "@/lib/cn";

export function searchLinkProps(href: string) {
  const hashIndex = href.indexOf("#");
  const pathname = (hashIndex === -1 ? href : href.slice(0, hashIndex)) || "/";
  const hash = hashIndex === -1 ? undefined : href.slice(hashIndex + 1);
  return { to: pathname as "/", hash };
}

export function SiteSearchButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex size-10 items-center justify-center text-muted transition-colors hover:text-fg md:h-auto md:w-auto md:gap-2 md:border md:border-fg/15 md:px-3 md:py-2"
      aria-label="搜索全站"
      aria-expanded={open}
    >
      <Search className="size-4 text-blood" />
      <span className="hidden font-display text-[10px] font-semibold tracking-[0.18em] uppercase md:inline">
        搜索
      </span>
      <kbd className="hidden font-mono text-[10px] text-faint md:inline border border-fg/15 px-1 py-0.5 ml-1">
        /
      </kbd>
    </button>
  );
}

const SUGGESTED_TAGS = [
  "布鲁斯·韦恩",
  "猫头鹰法庭",
  "蝙蝠战车",
  "企鹅人",
  "急冻人",
  "缄默",
  "圣保罗大教堂",
  "格拉斯哥外景",
];

export function SiteSearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchSite(query);
  const trimmed = query.trim();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    const link = searchLinkProps(item.href);
    navigate({
      to: link.to,
      hash: link.hash,
    });

    if (link.hash) {
      setTimeout(() => {
        const el = document.getElementById(link.hash!);
        if (el) {
          const details = el.closest("details");
          if (details && !details.open) {
            details.open = true;
          }
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-blood", "transition-all", "duration-300");
          setTimeout(() => el.classList.remove("ring-2", "ring-blood"), 2500);
        }
      }, 120);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % results.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="全站搜索"
      onKeyDown={onKeyDown}
    >
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-bg/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative z-10 flex max-h-[82vh] w-full max-w-2xl flex-col border border-fg/20 bg-surface shadow-2xl">
        {/* Input bar */}
        <div className="flex items-center gap-3 border-b border-fg/10 px-4 py-3 sm:px-5">
          <Search className="size-5 shrink-0 text-blood" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索人物、地点、装备、日志、线索……"
            className="h-9 min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-faint sm:text-lg"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="px-2 py-1 font-mono text-xs text-faint hover:text-fg"
            >
              清空
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center text-muted transition-colors hover:bg-elevated hover:text-fg"
            aria-label="关闭搜索"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-2">
          {!trimmed ? (
            <div className="px-4 py-8 text-center sm:py-10">
              <p className="text-sm font-medium text-muted">输入关键词检索档案库 260+ 项资料</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-faint">推荐搜索：</span>
                {SUGGESTED_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag);
                      inputRef.current?.focus();
                    }}
                    className="border border-fg/15 bg-elevated/60 px-2.5 py-1 text-xs text-muted transition-colors hover:border-blood hover:text-fg"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length ? (
            <ul className="space-y-1">
              {results.map((result, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <li key={`${result.kind}-${result.href}-${result.title}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "grid w-full grid-cols-[4.5rem_1fr] items-start gap-3 px-3 py-3 text-left transition-colors",
                        isSelected
                          ? "border-l-2 border-blood bg-elevated text-fg"
                          : "border-l-2 border-transparent hover:bg-elevated/60",
                      )}
                    >
                      <span className="pt-0.5 font-display text-[10px] font-bold tracking-[0.16em] text-blood uppercase">
                        {result.kind}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-sans font-bold tracking-tight text-fg">
                          {result.title}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          {result.subtitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center text-sm text-muted">
              未找到与「<span className="text-blood">{trimmed}</span>」匹配的档案内容。
              <p className="mt-2 text-xs text-faint">
                提示：支持中文全名、角色英文名、缩写（如“戈登”、“法庭”、“战车”、“Hush”）。
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between border-t border-fg/10 px-4 py-2.5 font-mono text-[11px] text-faint">
          <span>共 {trimmed ? results.length : 0} 条匹配</span>
          <span className="hidden sm:inline">
            <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↑</kbd>{" "}
            <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↓</kbd> 切换 ·{" "}
            <kbd className="border border-fg/15 bg-elevated px-1.5 py-0.5">Enter</kbd> 打开 ·{" "}
            <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">Esc</kbd> 关闭
          </span>
        </div>
      </div>
    </div>
  );
}

export function SiteSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <SiteSearchButton open={open} onClick={() => setOpen((prev) => !prev)} />
      {open ? <SiteSearchModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}
