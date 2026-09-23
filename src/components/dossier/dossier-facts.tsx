import { FACTS, CONTENT_REVIEWED_AT } from "@/data/film";
import { SourceLink } from "@/components/source-link";
import { useI18n } from "@/lib/i18n";
import { getLocalizedFact } from "@/lib/i18n/dossier-en";

export function DossierFacts() {
  const { locale } = useI18n();

  return (
    <dl className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
      {FACTS.map((rawFact) => {
        const fact = getLocalizedFact(rawFact, locale);
        return (
          <div key={rawFact.label} className="grid gap-2 py-4 sm:grid-cols-12 sm:gap-6">
            <dt className="text-sm tracking-widest text-muted sm:col-span-3">{fact.label}</dt>
            <dd className="text-pretty sm:col-span-9">
              {fact.value}
              {fact.source ? (
                <SourceLink
                  label={fact.source}
                  href={fact.sourceUrl}
                  tier={fact.sourceTier}
                  verifiedAt={CONTENT_REVIEWED_AT}
                />
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

