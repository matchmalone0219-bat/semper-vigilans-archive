import { SORTED_SOCIAL_DROPS } from "@/lib/social";
import { useI18n } from "@/lib/i18n";

export function DossierSocial() {
  const { locale } = useI18n();

  return (
    <ul className="mt-8 space-y-8">
      {SORTED_SOCIAL_DROPS.map((drop) => (
        <li
          key={drop.id}
          id={drop.id}
          className="scroll-mt-28 overflow-hidden border border-fg/15 bg-elevated/25"
        >
          {drop.image ? (
            <img
              src={drop.image}
              alt={locale === "en" ? (drop.imageAltEn ?? drop.imageAlt ?? "") : (drop.imageAlt ?? "")}
              loading="lazy"
              decoding="async"
              className="max-h-[36rem] w-full bg-bg object-contain"
            />
          ) : null}
          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="font-sans text-lg font-black tracking-tight">
                {locale === "en" ? drop.authorNameEn : drop.authorName}
                <span className="ml-2 font-mono text-xs font-normal text-faint">{drop.authorHandle}</span>
              </p>
              <p className="font-mono text-[11px] tracking-wide text-faint">
                {drop.platformLabel} · {drop.date}
              </p>
            </div>
            <p className="mt-1 text-xs text-muted">
              {locale === "en" ? drop.authorRoleEn : drop.authorRole}
            </p>
            <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-fg/90">
              {locale === "zh" ? `“${drop.textZh}”` : `“${drop.textEn}”`}
            </blockquote>
            {locale === "zh" ? (
              <p className="mt-2 font-mono text-xs italic text-faint">{drop.textEn}</p>
            ) : null}
            {drop.contextZh || drop.contextEn ? (
              <p className="mt-4 max-w-3xl border-l-2 border-blood/60 pl-3 text-sm leading-relaxed text-muted">
                {locale === "en" ? drop.contextEn : drop.contextZh}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
