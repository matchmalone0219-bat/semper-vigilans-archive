import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock, Search, X } from "lucide-react";
import { SEARCH_ITEMS, searchSite, type SearchItem } from "@/lib/search";
import { searchLinkProps } from "@/components/site-search";
import { cn } from "@/lib/cn";
import { parseSearchState, SEARCH_PAGE_SIZE } from "@/lib/search-state";
import { useI18n } from "@/lib/i18n";

const SUGGESTED_TAGS_ZH = [
  "布鲁斯·韦恩",
  "猫头鹰法庭",
  "蝙蝠战车",
  "企鹅人",
  "急冻人",
  "缄默",
  "圣保罗大教堂",
  "格拉斯哥外景",
];

const SUGGESTED_TAGS_EN = [
  "Bruce Wayne",
  "Court of Owls",
  "Batmobile",
  "The Penguin",
  "Mr. Freeze",
  "Hush",
  "St. Paul's Cathedral",
  "Glasgow Exterior",
];

type SearchCategory =
  | "all"
  | "people"
  | "places"
  | "plot"
  | "log"
  | "gear"
  | "merch"
  | "craft";

const CATEGORIES: {
  id: SearchCategory;
  labelZh: string;
  labelEn: string;
  matches: (kind: string) => boolean;
}[] = [
  { id: "all", labelZh: "全部", labelEn: "All", matches: () => true },
  { id: "people", labelZh: "人物", labelEn: "People", matches: (k) => k === "人物" },
  { id: "places", labelZh: "地点", labelEn: "Places", matches: (k) => k === "地点" },
  { id: "plot", labelZh: "线索", labelEn: "Clues", matches: (k) => k === "线索" },
  { id: "log", labelZh: "日志", labelEn: "Logs", matches: (k) => k === "日志" },
  { id: "gear", labelZh: "装备", labelEn: "Gear", matches: (k) => k === "装备" },
  { id: "merch", labelZh: "周边", labelEn: "Merch", matches: (k) => k === "收藏" },
  {
    id: "craft",
    labelZh: "幕后视听",
    labelEn: "Craft",
    matches: (k) => k === "视听" || k === "取景" || k === "光影" || k === "溯源",
  },
];

const KIND_MAP_EN: Record<string, string> = {
  人物: "PEOPLE",
  地点: "PLACES",
  线索: "CLUES",
  日志: "LOGS",
  装备: "GEAR",
  收藏: "MERCH",
  视听: "SCORE",
  取景: "LOCATIONS",
  光影: "LENS",
  溯源: "ROOTS",
};

const RECENT_KEY = "semper_vigilans_recent_searches";

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecentSearch(term: string) {
  const t = term.trim();
  if (!t) return;
  try {
    const prev = getRecentSearches().filter((x) => x.toLowerCase() !== t.toLowerCase());
    const next = [t, ...prev].slice(0, 8);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

function removeRecentSearch(term: string) {
  try {
    const prev = getRecentSearches().filter((x) => x !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify(prev));
  } catch {
    // ignore
  }
}

function clearAllRecentSearches() {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch {
    // ignore
  }
}

export const Route = createFileRoute("/search")({
  validateSearch: parseSearchState,
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
  const { locale } = useI18n();
  const isEn = locale === "en";

  const search = Route.useSearch();
  const query = search.q ?? "";
  const activeCategory = search.category ?? "all";
  const visibleCount = search.shown ?? SEARCH_PAGE_SIZE;
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const setQuery = (q: string) => {
    setSelectedIndex(0);
    void navigate({
      to: "/search",
      search: { ...search, q: q || undefined, shown: undefined },
      replace: true,
      resetScroll: false,
    });
  };

  const setActiveCategory = (category: SearchCategory) => {
    setSelectedIndex(0);
    void navigate({
      to: "/search",
      search: { ...search, category: category === "all" ? undefined : category, shown: undefined },
      replace: true,
      resetScroll: false,
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
    setRecentSearches(getRecentSearches());
  }, []);

  const trimmed = query.trim();
  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory) ?? CATEGORIES[0];

  const matches = useMemo(() => {
    if (trimmed) {
      const searched = searchSite(query, SEARCH_ITEMS.length);
      return activeCategory === "all"
        ? searched
        : searched.filter((item) => currentCategory.matches(item.kind));
    }
    if (activeCategory !== "all") {
      return SEARCH_ITEMS.filter((item) => currentCategory.matches(item.kind));
    }
    return [];
  }, [trimmed, query, activeCategory, currentCategory]);

  const results = matches.slice(0, visibleCount);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  const handleSelect = (item: SearchItem) => {
    saveRecentSearch(trimmed || item.title);
    setRecentSearches(getRecentSearches());

    const link = searchLinkProps(item.href);
    navigate({
      to: link.to,
      hash: link.hash,
    });
  };

  const pickSearchTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
    setRecentSearches(getRecentSearches());
    inputRef.current?.focus();
  };

  const removeSearchHistory = (term: string) => {
    removeRecentSearch(term);
    setRecentSearches(getRecentSearches());
  };

  const clearHistory = () => {
    clearAllRecentSearches();
    setRecentSearches([]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229) return;
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
      } else if (trimmed) {
        saveRecentSearch(trimmed);
        setRecentSearches(getRecentSearches());
      }
    }
  };

  const suggestedTags = isEn ? SUGGESTED_TAGS_EN : SUGGESTED_TAGS_ZH;

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10 bg-elevated">
        <div className="mx-auto flex max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative z-10 min-w-0 flex-1">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              SEARCH ARCHIVE
            </p>
            <h1 className="mt-4 font-sans text-4xl font-black leading-none tracking-tight whitespace-nowrap sm:text-5xl lg:text-6xl">
              {isEn ? "Archive Search" : "全站档案检索"}
            </h1>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              {isEn
                ? "Search people, places, gear, shoot logs, plot clues, and collectibles."
                : "检索人物、地点、装备、拍摄日志、剧情线索与收藏档案。"}
            </p>
          </div>
          <div className="relative hidden h-60 w-60 shrink-0 sm:block lg:h-72 lg:w-72">
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
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 border-b border-fg/10 px-4 py-3 sm:px-5">
            <Search className="size-5 shrink-0 text-blood" aria-hidden="true" />
            <input
              ref={inputRef}
              data-site-search-input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? "Search people, places, gear, logs, clues..." : "搜索人物、地点、装备、日志、线索……"}
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
                {isEn ? "Clear" : "清空"}
              </button>
            ) : null}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto border-b border-fg/10 px-3 py-2 scrollbar-none sm:px-4">
            <span className="mr-1 shrink-0 font-display text-[10px] font-semibold tracking-wider text-faint uppercase">
              {isEn ? "CATEGORY:" : "分类:"}
            </span>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "shrink-0 px-2.5 py-1 text-xs font-mono transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-blood font-bold text-bg"
                      : "text-muted hover:bg-elevated/80 hover:text-fg",
                  )}
                >
                  {isEn ? cat.labelEn : cat.labelZh}
                </button>
              );
            })}
          </div>

          {/* Body Content */}
          <div className="p-2">
            {!trimmed && activeCategory === "all" ? (
              <div className="space-y-6 px-4 py-8">
                {/* Recent Searches */}
                {recentSearches.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-faint">
                        <Clock className="size-3.5 text-blood" /> {isEn ? "Recent Searches" : "最近搜索"}
                      </span>
                      <button
                        type="button"
                        onClick={clearHistory}
                        className="font-mono text-[11px] text-faint hover:text-blood"
                      >
                        {isEn ? "Clear History" : "清空历史"}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {recentSearches.map((term) => (
                        <div
                          key={term}
                          className="group inline-flex items-center border border-fg/15 bg-elevated/80 text-xs text-muted transition-colors hover:border-blood hover:text-fg"
                        >
                          <button
                            type="button"
                            onClick={() => pickSearchTerm(term)}
                            className="px-2.5 py-1 text-left transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
                          >
                            {term}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSearchHistory(term)}
                            className="py-1 pl-0.5 pr-2 text-faint transition-colors hover:text-blood focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood"
                            aria-label={isEn ? `Remove ${term}` : `删除历史记录 ${term}`}
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Recommended Searches */}
                <div>
                  <div className="pb-2">
                    <span className="font-mono text-xs text-faint">
                      {isEn ? "Recommended Tags" : "推荐探索标签"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => pickSearchTerm(tag)}
                        className="border border-fg/15 bg-elevated/60 px-2.5 py-1 text-xs text-muted transition-colors hover:border-blood hover:text-fg"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="pt-2 text-center text-xs text-faint">
                  {isEn
                    ? "Enter keywords or select categories above to explore 260+ archive records"
                    : "输入关键词或点选上方分类检索档案库 260+ 项资料"}
                </p>
              </div>
            ) : results.length ? (
              <ul className="space-y-1">
                {!trimmed && (
                  <li className="border-b border-fg/5 px-3 py-1.5 font-mono text-[11px] text-faint">
                    {isEn
                      ? `Browsing "${currentCategory.labelEn}" category archives (enter keywords to filter directly)`
                      : `正在浏览「${currentCategory.labelZh}」分类档案（输入关键词可直接过滤）`}
                  </li>
                )}
                {results.map((result, idx) => {
                  const isSelected = idx === selectedIndex;
                  const kindLabel = isEn ? (KIND_MAP_EN[result.kind] ?? result.kind) : result.kind;

                  return (
                    <li key={`${result.kind}-${result.href}-${result.title}`}>
                      <button
                        type="button"
                        onClick={() => handleSelect(result)}
                        className={cn(
                          "grid w-full grid-cols-[4.5rem_1fr] items-start gap-3 px-3 py-3 text-left transition-colors",
                          isSelected
                            ? "border-l-2 border-blood bg-elevated text-fg"
                            : "border-l-2 border-transparent hover:bg-elevated/60",
                        )}
                      >
                        <span className="pt-0.5 font-display text-[10px] font-bold tracking-[0.16em] text-blood uppercase">
                          {kindLabel}
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
                {isEn ? (
                  <>
                    No records found in "{currentCategory.labelEn}" matching "
                    <span className="text-blood">{trimmed}</span>".
                  </>
                ) : (
                  <>
                    未在「{currentCategory.labelZh}」中找到与「
                    <span className="text-blood">{trimmed}</span>」匹配的档案内容。
                  </>
                )}
                {activeCategory !== "all" ? (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setActiveCategory("all")}
                      className="border border-blood px-3 py-1 text-xs text-blood transition-colors hover:bg-blood hover:text-bg"
                    >
                      {isEn ? "Switch to 'All' category and retry" : "切换至「全部」分类重试"}
                    </button>
                  </div>
                ) : null}
                <p className="mt-4 text-xs text-faint">
                  {isEn
                    ? "Tip: Supports character names, English titles, and keywords (e.g., 'Gordon', 'Court', 'Batmobile', 'Hush')."
                    : "提示：支持中文全名、角色英文名、缩写（如“戈登”、“法庭”、“战车”、“Hush”）。"}
                </p>
              </div>
            )}
          </div>

          {results.length < matches.length ? (
            <div className="px-4 pb-4 text-center">
              <button
                type="button"
                onClick={() =>
                  void navigate({
                    to: "/search",
                    search: {
                      ...search,
                      shown: Math.min(visibleCount + SEARCH_PAGE_SIZE, matches.length),
                    },
                    replace: true,
                    resetScroll: false,
                  })
                }
                className="border border-fg/20 px-4 py-2 text-sm text-muted hover:border-blood hover:text-fg"
              >
                {isEn ? "Load More" : "加载更多"}
              </button>
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t border-fg/10 px-4 py-2.5 font-mono text-[11px] text-faint">
            <span>
              {isEn
                ? `${matches.length} matching · showing ${results.length}`
                : `共 ${matches.length} 条匹配 · 已显示 ${results.length} 条`}
            </span>
            <span className="hidden sm:inline">
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↑</kbd>{" "}
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">↓</kbd>{" "}
              {isEn ? "Navigate · " : "切换 · "}
              <kbd className="border border-fg/15 bg-elevated px-1.5 py-0.5">Enter</kbd>{" "}
              {isEn ? "Open · " : "打开 · "}
              <kbd className="border border-fg/15 bg-elevated px-1 py-0.5">Esc</kbd>{" "}
              {isEn ? "Clear / Back" : "清空 / 返回"}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
