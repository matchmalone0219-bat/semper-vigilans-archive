import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";

type SourceLinkProps = {
  label: string;
  href?: string;
  tier?: "official" | "press" | "set" | "archive";
  verifiedAt?: string;
  className?: string;
};

const TIER_META = {
  official: {
    label: "官方资料",
    dot: "bg-emerald-400",
    variant: "official" as const,
    tooltip: "官方信源 // 导演个人账号、制片厂公报或官方展陈实录",
  },
  press: {
    label: "媒体报道",
    dot: "bg-sky-400",
    variant: "press" as const,
    tooltip: "媒体信源 // 主流影视期刊采写、现场专访或官方通告",
  },
  set: {
    label: "片场记录",
    dot: "bg-amber-400",
    variant: "set" as const,
    tooltip: "片场记录 // 外景目击路透、特技拍摄影像或市政交通管制记录",
  },
  archive: {
    label: "实物记录",
    dot: "bg-violet-400",
    variant: "archive" as const,
    tooltip: "收藏档案 // 二手实物、藏家实拍、历史零售页或收藏目录",
  },
} as const;

export function SourceLink({ label, href, tier, className }: SourceLinkProps) {
  const meta = tier ? TIER_META[tier] : null;

  return (
    <div className={cn("mt-2 flex flex-wrap items-center gap-2 text-xs leading-relaxed text-muted", className)}>
      {meta ? (
        <span title={meta.tooltip}>
          <Badge variant={meta.variant} dotColor={meta.dot} size="sm">
            {meta.label}
          </Badge>
        </span>
      ) : null}
      <span className="text-faint">·</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-fg underline decoration-fg/40 underline-offset-4 transition-colors hover:decoration-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
        >
          {label}
          <ExternalLink className="size-3 shrink-0 opacity-70" aria-hidden="true" />
        </a>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}
