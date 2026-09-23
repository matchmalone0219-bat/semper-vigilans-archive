import { FACTS, CONTENT_REVIEWED_AT } from "@/data/film";
import { SourceLink } from "@/components/source-link";
import { useI18n } from "@/lib/i18n";
import { getLocalizedFact } from "@/lib/i18n/dossier-en";

export function DossierFacts() {
  const { locale } = useI18n();

  return (
    <div className="mt-8">
      {/* Box Office & Industry Accolades KPI Bar */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="border border-fg/10 bg-fg/[0.02] p-4 text-center">
          <div className="font-mono text-2xl font-black text-blood sm:text-3xl">$770.8M</div>
          <div className="mt-1 font-display text-[10px] tracking-[0.2em] text-muted uppercase">
            {locale === "zh" ? "全球院线票房" : "Global Box Office"}
          </div>
        </div>
        <div className="border border-fg/10 bg-fg/[0.02] p-4 text-center">
          <div className="font-mono text-2xl font-black text-fg sm:text-3xl">3 OSCARS</div>
          <div className="mt-1 font-display text-[10px] tracking-[0.2em] text-muted uppercase">
            {locale === "zh" ? "第95届奥斯卡提名" : "Academy Award Noms"}
          </div>
        </div>
        <div className="border border-fg/10 bg-fg/[0.02] p-4 text-center">
          <div className="font-mono text-2xl font-black text-fg sm:text-3xl">4 BAFTA</div>
          <div className="mt-1 font-display text-[10px] tracking-[0.2em] text-muted uppercase">
            {locale === "zh" ? "英国学院奖提名" : "BAFTA Nominations"}
          </div>
        </div>
        <div className="border border-fg/10 bg-fg/[0.02] p-4 text-center">
          <div className="font-mono text-2xl font-black text-fg sm:text-3xl">53 MIN</div>
          <div className="mt-1 font-display text-[10px] tracking-[0.2em] text-muted uppercase">
            {locale === "zh" ? "官方长篇制作纪录片" : "Making-Of Feature"}
          </div>
        </div>
      </div>

      <dl className="divide-y divide-fg/10 border-y border-fg/10">
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
    </div>
  );
}

