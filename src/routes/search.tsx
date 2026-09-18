import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { searchSite, type SearchItem } from "@/lib/search";
import { searchLinkProps } from "@/components/site-search";
import { cn } from "@/lib/cn";

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

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "全站搜索 · Semper Vigilans" },
      {
        name: "description",
        content: "检索人物、地点、装备、拍摄日志、剧情线索与收藏档案。",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
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
    const link = searchLinkProps(item.href);
    navigate({
      to: link.to,
      hash: link.hash,
    });

    if (link.hash) {
      setTimeout(() => {
        const el = document.getElementById(link.hash!);
        if (!el) return;
        const details = el.closest("details");
        if (details && !details.open) details.open = true;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-blood");
        setTimeout(() => el.classList.remove("ring-2", "ring-blood"), 2500);
      }, 120);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (query) {
        setQuery("");
        return;
      }
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate({ to: "/" });
      }
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
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10 bg-elevated">
        <div className="mx-auto flex max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative z-10 min-w-0 flex-1">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              SEARCH ARCHIVE
            </p>
            <h1 className="mt-4 font-sans text-4xl font-black leading-none tracking-tight whitespace-nowrap sm:text-5xl lg:text-6xl">
              全站档案检索
            </h1>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              检索人物、地点、装备、拍摄日志、剧情线索与收藏档案。
            </p>
          </div>
          <div className="relative hidden h-40 w-40 shrink-0 sm:block lg:h-48 lg:w-48">
            <img
              src="/media/search-gazette.jpg"
              alt="《新蝙蝠侠》片中哥谭公报头版：Gotham Terrorized / Who is the Batman?"
              width={736}
              height={736}
              className="search-gazette absolute inset-0 size-full object-cover object-[center_42%] opacity-85"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="border border-fg/20 bg-surface" onKeyDown={onKeyDown}>
          <div className="flex items-center gap-3 border-b border-fg/10 px-4 py-3 sm:px-5">
            <Search className="size-5 shrink-0 text-blood" aria-hidden="true" />
            <input
              ref={inputRef}
              data-site-search-input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索人物、地点、装备、日志、线索……"
              className="h-9 min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-faint sm:text-lg"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
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
          </div>

          <div className="p-2">
            {!trimmed ? (
              <div className="px-4 py-8 text-center">
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
                      className="border border-fg/15 bg-elevated/60 px-2.5 py-1 text-xs text-muted hover:border-blood hover:text-fg"
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
                        className={cn(
                          "grid w-full grid-cols-[4.5rem_1fr] items-start gap-3 px-3 py-3 text-left",
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

          <div className="flex items-center justify-between border-t border-fg/10 px-4 py-2.5 font-mono text-[11px] text-faint">
            <span>共 {trimmed ? results.length : 0} 条匹配</span>
            <span className="hidden sm:inline">
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↑</kbd>{" "}
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↓</kbd> 切换 ·{" "}
              <kbd className="border border-fg/15 bg-elevated px-1.5 py-0.5">Enter</kbd> 打开 ·{" "}
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">Esc</kbd> 清空 / 返回
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
