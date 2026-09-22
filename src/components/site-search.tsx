import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function searchLinkProps(href: string) {
  const hashIndex = href.indexOf("#");
  const pathname = (hashIndex === -1 ? href : href.slice(0, hashIndex)) || "/";
  const hash = hashIndex === -1 ? undefined : href.slice(hashIndex + 1);
  return { to: pathname as "/", hash };
}

export function SiteSearchButton() {
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  return (
    <Link
      to="/search"
      className="group relative z-[91] inline-flex size-10 shrink-0 pointer-events-auto items-center justify-center border border-transparent text-muted transition-all duration-150 hover:border-fg/25 hover:bg-surface/80 hover:text-fg md:h-9 md:w-auto md:gap-2.5 md:border-fg/15 md:bg-surface/40 md:px-3 md:py-1.5"
      aria-label="搜索全站"
    >
      <Search className="size-3.5 text-blood transition-transform duration-150 group-hover:scale-110" />
      <span className="hidden font-display text-[10px] font-semibold tracking-[0.2em] text-fg/80 uppercase md:inline">
        搜索档案
      </span>
      <kbd className="ml-1 hidden items-center gap-0.5 border border-fg/15 bg-elevated/80 px-1.5 py-0.5 font-mono text-[9px] text-faint shadow-inner md:inline-flex">
        <span>{isMac ? "⌘" : "Ctrl"}</span>
        <span>K</span>
      </kbd>
    </Link>
  );
}
