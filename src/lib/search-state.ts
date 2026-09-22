export const SEARCH_PAGE_SIZE = 16;
const SEARCH_CATEGORIES = ["all", "people", "places", "plot", "log", "gear", "merch", "craft"] as const;
type Category = (typeof SEARCH_CATEGORIES)[number];

export function parseSearchState(raw: Record<string, unknown>): {
  q?: string;
  category?: Category;
  shown?: number;
} {
  const category = SEARCH_CATEGORIES.find((value) => value === raw.category);
  const shown = typeof raw.shown === "number" || typeof raw.shown === "string" ? Number(raw.shown) : NaN;
  return {
    q: typeof raw.q === "string" && raw.q.length ? raw.q : undefined,
    category: category && category !== "all" ? category : undefined,
    shown: Number.isSafeInteger(shown) && shown > SEARCH_PAGE_SIZE ? Math.min(shown, 10000) : undefined,
  };
}
