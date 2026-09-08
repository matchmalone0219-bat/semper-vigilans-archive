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
      className="group border border-fg/15 bg-surface/30 transition-colors duration-200 open:border-fg/25 open:bg-surface/50"
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="flex min-h-14 cursor-pointer list-none select-none items-center gap-3 px-4 py-3 text-sm text-fg transition-colors hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blood [&::-webkit-details-marker]:hidden">
        <span className="flex-1 font-semibold tracking-wide">{title}</span>
        <span className="font-mono text-xs text-muted">{count} 条</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform duration-250 ease-out group-open:rotate-180 group-open:text-blood"
        />
      </summary>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-fg/10 px-4 pt-3 pb-4 sm:px-6">
            {children}
          </div>
        </div>
      </div>
    </details>
  );
}
