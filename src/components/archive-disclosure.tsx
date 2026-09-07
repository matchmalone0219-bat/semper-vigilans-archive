import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function ArchiveDisclosure({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="group border border-fg/15 bg-surface/30"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm text-fg hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood [&::-webkit-details-marker]:hidden">
        <span className="flex-1 font-semibold">{title}</span>
        <span className="text-xs text-muted">{count} 条</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      {open ? <div className="border-t border-fg/10 px-4 pb-4 sm:px-6">{children}</div> : null}
    </details>
  );
}
