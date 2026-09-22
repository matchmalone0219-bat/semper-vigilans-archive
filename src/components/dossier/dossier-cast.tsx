import { Link } from "@tanstack/react-router";
import { CAST, CONTENT_REVIEWED_AT } from "@/data/film";
import { SourceLink } from "@/components/source-link";
import { Badge } from "@/components/ui/badge";

export function DossierCast() {
  return (
    <div>
      <SourceLink
        label="Variety · 导演公开确认回归与新加盟阵容"
        href="https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/"
        tier="press"
        verifiedAt={CONTENT_REVIEWED_AT}
        className="mt-3 text-xs text-faint"
      />
      <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2">
        {CAST.map((person) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
                  {person.roleEn}
                </p>
                <Badge
                  variant={person.status === "confirmed" ? "confirmed" : "rumor"}
                  size="sm"
                >
                  {person.status === "confirmed" ? "确认" : "传闻"}
                </Badge>
              </div>
              <h3 className="mt-3 font-sans text-2xl font-black leading-snug tracking-tight">
                {person.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{person.note}</p>
              {person.personId ? (
                <p className="mt-4 font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-transform duration-150 group-hover:translate-x-1">
                  打开人物档案 →
                </p>
              ) : null}
            </>
          );
          return (
            <li key={person.roleEn + person.nameEn} className="bg-bg">
              {person.personId ? (
                <Link
                  to="/people/$id"
                  params={{ id: person.personId }}
                  className="archive-card group block p-6 transition-colors"
                >
                  {inner}
                </Link>
              ) : (
                <div className="p-6">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
