import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import { getPerson, PEOPLE, relatedPeople } from "@/lib/people";
import { PLACE_MAP } from "@/lib/places";
import { STATUS_LABEL, KIND_LABEL } from "@/lib/relations";
import { resolveStills } from "@/lib/gallery";
import { StillGrid } from "@/components/still-grid";
import { cn } from "@/lib/cn";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/people/$id")({
  head: ({ params }) => {
    const person = getPerson(params.id);
    return { meta: [{ title: pageTitle(person?.name ?? "人物") }] };
  },
  component: PersonPage,
});

function PersonPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const person = getPerson(id);
  if (!person) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
          Missing
        </p>
        <h1 className="mt-3 font-sans text-4xl font-black tracking-tight">没有这份档案</h1>
        <p className="mt-4">
          <Link to="/people" className="text-fg underline-offset-4 hover:underline">
            回到人物
          </Link>
        </p>
      </main>
    );
  }

  const related = relatedPeople(person.id);
  const stills = resolveStills(person.stills);
  const places = person.places.map((pid) => PLACE_MAP[pid]).filter(Boolean);
  const personIndex = PEOPLE.findIndex((entry) => entry.id === person.id);
  const previous = PEOPLE[(personIndex - 1 + PEOPLE.length) % PEOPLE.length];
  const next = PEOPLE[(personIndex + 1) % PEOPLE.length];

  const openRandomPerson = () => {
    const choices = PEOPLE.filter((entry) => entry.id !== person.id);
    const random = choices[Math.floor(Math.random() * choices.length)];
    if (random) void navigate({ to: "/people/$id", params: { id: random.id } });
  };

  return (
    <main>
      <header className="border-b border-fg/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-end sm:px-6 sm:py-16">
          {person.portrait ? (
            <img
              src={person.portrait.src}
              alt={person.name}
              className={cn(
                "aspect-square w-40 object-cover sm:w-56",
                (person.status === "dead" || person.status === "rumor") && "grayscale",
              )}
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              {person.factionLabel} · {STATUS_LABEL[person.status]}
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
                人物
              </Link>
              <span className="mx-2">/</span>
              <Link to="/dossier" hash="relations" className="hover:text-fg">
                关系图
              </Link>
            </p>
          </div>
        </div>
      </header>

      <nav aria-label="人物档案浏览" className="border-b border-fg/10 bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
          <Link
            to="/people/$id"
            params={{ id: previous.id }}
            className="flex items-center gap-3 border-r border-fg/10 py-4 pr-4 hover:text-blood"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                上一人物
              </span>
              <span className="block truncate font-sans text-sm font-black">{previous.name}</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={openRandomPerson}
            className="order-3 col-span-2 flex items-center justify-center gap-2 border-t border-fg/10 px-6 py-3 text-xs tracking-[0.16em] text-muted uppercase hover:text-fg sm:order-none sm:col-span-1 sm:border-x sm:border-t-0"
          >
            <Shuffle className="size-4" />
            随机档案
          </button>
          <Link
            to="/people/$id"
            params={{ id: next.id }}
            className="flex items-center justify-end gap-3 py-4 pl-4 text-right hover:text-blood"
          >
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                下一人物
              </span>
              <span className="block truncate font-sans text-sm font-black">{next.name}</span>
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <section className="max-w-3xl space-y-8">
          {person.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="font-sans text-2xl font-black tracking-tight">{s.heading}</h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </section>

        {person.appearances.length > 0 ? (
          <section>
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              出场
            </h2>
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              {person.appearances.map((a) => (
                <li
                  key={a.work}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <Link
                    to={a.href}
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

        {related.length > 0 ? (
          <section>
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              关系
            </h2>
            <ul className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              {related.map((e) => {
                const other = e.person!;
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
                          <span className="font-sans font-black tracking-tight">{other.name}</span>
                          <span className="ml-2 text-sm text-faint">
                            {STATUS_LABEL[other.status]}
                          </span>
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-sm",
                          e.kind === "kill" || e.kind === "foe" ? "text-blood" : "text-muted",
                        )}
                      >
                        {e.label}
                        <span className="ml-2 text-faint">{KIND_LABEL[e.kind]}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {places.length > 0 ? (
          <section>
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              地点
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {places.map((place) => (
                <li key={place.id}>
                  <Link to="/places/$id" params={{ id: place.id }} className="group block">
                    <div className="aspect-[3/2] overflow-hidden bg-elevated">
                      <img
                        src={place.image}
                        alt=""
                        className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                      />
                    </div>
                    <p className="mt-2 font-sans font-black tracking-tight">{place.name}</p>
                    <p className="text-sm text-faint">{place.also}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {stills.length > 0 ? (
          <section>
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              剧照
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
