import { ExternalLink } from "lucide-react";

type SourceLinkProps = {
  label: string;
  href?: string;
  tier?: "official" | "press" | "set";
  verifiedAt?: string;
  className?: string;
};

const TIER_LABEL = {
  official: "官方资料",
  press: "媒体报道",
  set: "片场记录",
} as const;

export function SourceLink({ label, href, tier, verifiedAt, className }: SourceLinkProps) {
  const detail = [tier ? TIER_LABEL[tier] : null, verifiedAt ? `核验 ${verifiedAt}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <p className={className ?? "mt-2 text-xs text-faint"}>
      <span>{detail ? `${detail} · ` : "来源 · "}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted underline decoration-fg/30 underline-offset-4 hover:text-fg"
        >
          {label}
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      ) : (
        <span>{label}</span>
      )}
    </p>
  );
}
