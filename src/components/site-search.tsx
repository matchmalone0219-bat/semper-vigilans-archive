import { createPortal } from "react-dom";
import { Search } from "lucide-react";

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
      className="relative z-[91] inline-flex size-10 shrink-0 pointer-events-auto items-center justify-center text-muted transition-colors hover:text-fg md:h-auto md:w-auto md:gap-2 md:border md:border-fg/15 md:px-3 md:py-2"
      aria-label="搜索全站"
      aria-expanded={open}
    >
      <Search className="size-4 text-blood" />
      <span className="hidden font-display text-[10px] font-semibold tracking-[0.18em] uppercase md:inline">
        搜索
      </span>
      <kbd className="ml-1 hidden border border-fg/15 px-1 py-0.5 font-mono text-[10px] text-faint md:inline">
        /
      </kbd>
    </button>
  );
}

export function SiteSearchModal({ onClose }: { onClose: () => void }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-bg"
      role="dialog"
      aria-modal="true"
      aria-label="全站搜索"
    >
      <button
        type="button"
        onClick={onClose}
        className="m-8 border border-fg/20 px-4 py-2 text-fg"
      >
        关闭搜索测试
      </button>
    </div>,
    document.body,
  );
}
