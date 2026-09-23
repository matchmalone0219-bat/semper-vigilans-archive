import { Link } from "@tanstack/react-router";
import { CAST, CONTENT_REVIEWED_AT } from "@/data/film";
import { SourceLink } from "@/components/source-link";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { getLocalizedCast } from "@/lib/i18n/dossier-en";

export function DossierCast() {
  const { locale } = useI18n();

  return (
    <div>
      <SourceLink
        label={
          locale === "zh"
            ? "Variety · 导演公开确认回归与新加盟阵容"
            : "Variety · Matt Reeves Confirms Returning & New Cast"
        }
        href="https://au.variety.com/2026/film/news/the-batman-part-2-scarlett-johansson-sebastian-stan-36609/"
        tier="press"
        verifiedAt={CONTENT_REVIEWED_AT}
        className="mt-3 text-xs text-faint"
      />
      <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2">
        {CAST.map((rawPerson) => {
          const person = getLocalizedCast(rawPerson, locale);
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
                  {rawPerson.roleEn}
                </p>
                <Badge
                  variant={rawPerson.status === "confirmed" ? "confirmed" : "rumor"}
                  size="sm"
                >
                  {rawPerson.status === "confirmed"
                    ? locale === "zh"
                      ? "确认"
                      : "CONFIRMED"
                    : locale === "zh"
                      ? "传闻"
                      : "RUMORED"}
                </Badge>
              </div>
              <h3 className="mt-3 font-sans text-2xl font-black leading-snug tracking-tight">
                {locale === "zh" ? rawPerson.name : rawPerson.nameEn}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {locale === "zh" ? rawPerson.role : rawPerson.roleEn}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{person.note}</p>
              {rawPerson.personId ? (
                <p className="mt-4 font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase transition-transform duration-150 group-hover:translate-x-1">
                  {locale === "zh" ? "打开人物档案 →" : "Open Character Dossier →"}
                </p>
              ) : null}
            </>
          );
          return (
            <li key={rawPerson.roleEn + rawPerson.nameEn} className="bg-bg">
              {rawPerson.personId ? (
                <Link
                  to="/people/$id"
                  params={{ id: rawPerson.personId }}
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

