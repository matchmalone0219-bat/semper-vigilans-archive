import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { getPerson, PEOPLE, relatedPeople } from "@/lib/people";
import { PLACE_MAP } from "@/lib/places";
import { STATUS_LABEL, KIND_LABEL } from "@/lib/relations";
import { resolveStills } from "@/lib/gallery";
import { StillGrid } from "@/components/still-grid";
import { cn } from "@/lib/cn";
import { pageTitle } from "@/lib/film";
import { interviewsByPerson } from "@/lib/interviews";
import { WORK_LABEL } from "@/data/interviews";
import { ChapterNav } from "@/components/chapter-nav";
import { ArchiveDisclosure } from "@/components/archive-disclosure";
import { useI18n } from "@/lib/i18n";
import {
  FACTIONS_EN,
  getLocalizedPerson,
  PEOPLE_EN,
  RELATION_LABELS_EN,
} from "@/lib/i18n/people-en";
import { PLACES_EN } from "@/lib/i18n/places-en";

export const Route = createFileRoute("/people/$id")({
  beforeLoad: ({ params }) => {
    if (params.id === "waynes") throw redirect({ to: "/people/$id", params: { id: "thomas" } });
  },
  head: ({ params }) => {
    const person = getPerson(params.id);
    return { meta: [{ title: pageTitle(person?.name ?? "人物") }] };
  },
  component: PersonPage,
});

function PersonPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const rawPerson = getPerson(id);

  if (!rawPerson) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
          Missing
        </p>
        <h1 className="mt-3 font-sans text-4xl font-black tracking-tight">
          {locale === "zh" ? "没有这份档案" : "Dossier Not Found"}
        </h1>
        <p className="mt-4">
          <Link to="/people" className="text-fg underline-offset-4 hover:underline">
            {locale === "zh" ? "回到人物" : "Return to Characters"}
          </Link>
        </p>
      </main>
    );
  }

  const person = getLocalizedPerson(rawPerson, locale);
  const enFaction = FACTIONS_EN[rawPerson.faction];
  const factionLabel =
    locale === "zh" ? rawPerson.factionLabel : (enFaction?.label ?? rawPerson.factionLabel);
  const statusLabel =
    locale === "zh" ? STATUS_LABEL[rawPerson.status] : t.meta.status[rawPerson.status];

  const related = relatedPeople(person.id);
  const stills = resolveStills(person.stills);
  const places = rawPerson.places.map((pid) => PLACE_MAP[pid]).filter(Boolean);
  const quotes = interviewsByPerson(person.id);

  const chapters = [
    { href: "#biography", label: locale === "zh" ? "生平" : "Biography" },
    ...(person.appearances.length
      ? [{ href: "#appearances", label: locale === "zh" ? "出场" : "Appearances" }]
      : []),
    ...(quotes.length
      ? [{ href: "#quotes", label: locale === "zh" ? "访谈" : "Interviews" }]
      : []),
    ...(related.length
      ? [{ href: "#relations", label: locale === "zh" ? "关系" : "Relations" }]
      : []),
    ...(places.length
      ? [{ href: "#places", label: locale === "zh" ? "地点" : "Locations" }]
      : []),
    ...(stills.length
      ? [{ href: "#stills", label: locale === "zh" ? "剧照" : "Stills" }]
      : []),
  ];

  const renderQuote = (q: (typeof quotes)[number]) => (
    <li key={q.id} className="py-4">
      <p className="text-xs tracking-[0.18em] text-faint uppercase">
        {WORK_LABEL[q.work]} · {q.outlet} · {q.date}
      </p>
      <p className="mt-2 text-pretty leading-relaxed text-muted">
        {locale === "zh" ? q.quoteZh : q.quoteEn}
      </p>
      <Link
        to="/interviews"
        hash={q.id}
        className="mt-2 inline-block text-xs text-fg underline-offset-4 hover:underline"
      >
        {locale === "zh" ? "查看原文与出处" : "View Quote in Archive →"}
      </Link>
    </li>
  );

  const personIndex = PEOPLE.findIndex((entry) => entry.id === rawPerson.id);
  const previous = PEOPLE[(personIndex - 1 + PEOPLE.length) % PEOPLE.length];
  const next = PEOPLE[(personIndex + 1) % PEOPLE.length];
  const prevName = locale === "zh" ? previous.name : (PEOPLE_EN[previous.id]?.name ?? previous.name);
  const nextName = locale === "zh" ? next.name : (PEOPLE_EN[next.id]?.name ?? next.name);

  const openRandomPerson = () => {
    const choices = PEOPLE.filter((entry) => entry.id !== rawPerson.id);
    const random = choices[Math.floor(Math.random() * choices.length)];
    if (random) void navigate({ to: "/people/$id", params: { id: random.id } });
  };

  const hero = person.stills[0] ?? person.portrait?.src;

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        {hero ? (
          <>
            <img src={hero} alt="" className="absolute inset-0 size-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/45" />
          </>
        ) : null}
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:px-6 sm:py-16">
          {person.portrait ? (
            <img
              src={person.portrait.src}
              alt={person.name}
              className={cn(
                "aspect-square w-40 object-cover sm:w-56",
                (rawPerson.status === "dead" || rawPerson.status === "rumor") && "grayscale",
              )}
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {factionLabel} · {statusLabel}
            </p>
            <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">
              {person.name}
            </h1>
            <p className="mt-2 text-lg text-muted">
              {person.sub}
              {person.actor ? ` · ${person.actor}` : null}
            </p>
            {person.portrait?.note ? (
              <p className="mt-3 max-w-xl text-sm text-faint">{person.portrait.note}</p>
            ) : null}
            <p className="mt-6 text-sm text-faint">
              <Link to="/people" className="hover:text-fg">
                {locale === "zh" ? "人物" : "Characters"}
              </Link>
              <span className="mx-2">/</span>
              <Link to="/dossier" hash="relations" className="hover:text-fg">
                {locale === "zh" ? "关系图" : "Topology Map"}
              </Link>
            </p>
          </div>
        </div>
      </header>

      <nav
        aria-label={locale === "zh" ? "人物档案浏览" : "Character dossier navigation"}
        className="border-b border-fg/10 bg-surface/50"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
          <Link
            to="/people/$id"
            params={{ id: previous.id }}
            className="flex items-center gap-3 border-r border-fg/10 py-4 pr-4 hover:text-blood"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                {locale === "zh" ? "上一人物" : "Previous"}
              </span>
              <span className="block truncate font-sans text-sm font-black">{prevName}</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={openRandomPerson}
            className="order-3 col-span-2 flex items-center justify-center gap-2 border-t border-fg/10 px-6 py-3 text-xs tracking-[0.16em] text-muted uppercase hover:text-fg sm:order-none sm:col-span-1 sm:border-x sm:border-t-0"
          >
            <Shuffle className="size-4" />
            {locale === "zh" ? "随机档案" : "Random File"}
          </button>
          <Link
            to="/people/$id"
            params={{ id: next.id }}
            className="flex items-center justify-end gap-3 py-4 pl-4 text-right hover:text-blood"
          >
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                {locale === "zh" ? "下一人物" : "Next"}
              </span>
              <span className="block truncate font-sans text-sm font-black">{nextName}</span>
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>
      </nav>
      <ChapterNav
        label={locale === "zh" ? "人物档案章节" : "Dossier Chapters"}
        items={chapters}
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16 [&>section]:scroll-mt-36">
        <section id="biography" className="max-w-3xl space-y-8">
          {person.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-sans text-2xl font-black tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </section>

        {person.appearances.length > 0 ? (
          <section id="appearances">
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {locale === "zh" ? "出场" : "Appearances"}
            </h2>
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              {person.appearances.map((a) => (
                <li
                  key={a.work}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <Link
                    to={a.href as any}
                    hash={a.hash}
                    className="shrink-0 font-sans font-black tracking-tight hover:text-blood sm:w-36"
                  >
                    {a.work}
                  </Link>
                  <p className="text-sm text-muted">{a.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {quotes.length > 0 ? (
          <section id="quotes">
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {locale === "zh" ? "访谈摘录" : "Interview Excerpts"}
            </h2>
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              {quotes.slice(0, 3).map(renderQuote)}
            </ul>
            {quotes.length > 3 ? (
              <div className="mt-4">
                <ArchiveDisclosure
                  key={person.id}
                  title={locale === "zh" ? "更多访谈摘录" : "More Interview Excerpts"}
                  count={quotes.length - 3}
                >
                  <ul className="divide-y divide-fg/10">{quotes.slice(3).map(renderQuote)}</ul>
                </ArchiveDisclosure>
              </div>
            ) : null}
          </section>
        ) : null}

        {related.length > 0 ? (
          <section id="relations">
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {locale === "zh" ? "关系" : "Known Connections"}
            </h2>
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              {related.map((e) => {
                const other = e.person!;
                const otherEn = PEOPLE_EN[other.id];
                const otherName = locale === "zh" ? other.name : (otherEn?.name ?? other.name);
                const otherStatus =
                  locale === "zh" ? STATUS_LABEL[other.status] : t.meta.status[other.status];
                const relLabel =
                  locale === "zh" ? e.label : (RELATION_LABELS_EN[e.label] ?? e.label);
                const kindLabel =
                  locale === "zh" ? KIND_LABEL[e.kind] : t.relations.kinds[e.kind];

                return (
                  <li key={`${e.a}-${e.b}-${e.label}`}>
                    <Link
                      to="/people/$id"
                      params={{ id: other.id }}
                      className="flex items-center justify-between gap-4 py-3 hover:bg-surface/40"
                    >
                      <span className="flex items-center gap-3">
                        {other.portrait ? (
                          <img
                            src={other.portrait.src}
                            alt=""
                            className={cn(
                              "size-12 object-cover",
                              (other.status === "dead" || other.status === "rumor") && "grayscale",
                            )}
                          />
                        ) : null}
                        <span>
                          <span className="font-sans font-black tracking-tight">{otherName}</span>
                          <span className="ml-2 text-sm text-faint">{otherStatus}</span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-sm",
                          e.kind === "kill" || e.kind === "foe" ? "text-blood" : "text-muted",
                        )}
                      >
                        {relLabel}
                        <span className="ml-2 text-faint">{kindLabel}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {places.length > 0 ? (
          <section id="places">
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {locale === "zh" ? "地点" : "Connected Locations"}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {places.map((place) => {
                const enPlace = PLACES_EN[place.id];
                const placeName = locale === "zh" ? place.name : (enPlace?.name ?? place.name);
                const placeAlso = locale === "zh" ? place.also : (enPlace?.also ?? place.also);

                return (
                  <li key={place.id}>
                    <Link to="/places/$id" params={{ id: place.id }} className="group block">
                      <div className="aspect-[3/2] overflow-hidden bg-elevated">
                        <img
                          src={place.image}
                          alt=""
                          className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                        />
                      </div>
                      <p className="mt-2 font-sans font-black tracking-tight">{placeName}</p>
                      <p className="text-sm text-faint">{placeAlso}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {stills.length > 0 ? (
          <section id="stills">
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {locale === "zh" ? "剧照" : "Archival Stills"}
            </h2>
            <div className="mt-6">
              <StillGrid stills={stills} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

