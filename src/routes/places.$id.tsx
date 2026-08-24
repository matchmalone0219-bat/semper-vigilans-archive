import { createFileRoute, Link } from "@tanstack/react-router";
import { PLACE_MAP } from "@/lib/places";
import { getPerson } from "@/lib/people";
import { STATUS_LABEL } from "@/lib/relations";
import { cn } from "@/lib/cn";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/places/$id")({
  head: ({ params }) => {
    const place = PLACE_MAP[params.id];
    return { meta: [{ title: pageTitle(place?.name ?? "地点") }] };
  },
  component: PlacePage,
});

function PlacePage() {
  const { id } = Route.useParams();
  const place = PLACE_MAP[id];
  if (!place) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
          Missing
        </p>
        <h1 className="mt-3 font-sans text-4xl font-black tracking-tight">没有这个地点</h1>
        <p className="mt-4">
          <Link to="/places" className="text-fg underline-offset-4 hover:underline">
            回到地点
          </Link>
        </p>
      </main>
    );
  }

  const people = place.people.map((pid) => getPerson(pid)).filter(Boolean);

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img src={place.image} alt="" className="absolute inset-0 size-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
            {place.status} · {place.nameEn}
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black tracking-tight sm:text-6xl">{place.name}</h1>
          <p className="mt-3 text-lg text-muted">{place.also}</p>
          <p className="mt-6 text-sm text-faint">
            <Link to="/places" className="hover:text-fg">
              地点
            </Link>
            <span className="mx-2">/</span>
            <span>{place.works}</span>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <section className="max-w-3xl space-y-5">
          {place.body.map((p) => (
            <p key={p.slice(0, 20)} className="text-pretty leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>

        {people.length > 0 ? (
          <section>
            <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
              相关人物
            </h2>
            <ul className="mt-6 grid gap-px bg-border sm:grid-cols-2">
              {people.map((p) =>
                p ? (
                  <li key={p.id} className="bg-bg">
                    <Link
                      to="/people/$id"
                      params={{ id: p.id }}
                      className="flex items-center gap-4 p-5 hover:bg-surface/60"
                    >
                      {p.portrait ? (
                        <img
                          src={p.portrait.src}
                          alt=""
                          className={cn(
                            "size-16 object-cover",
                            (p.status === "dead" || p.status === "rumor") && "grayscale",
                          )}
                        />
                      ) : null}
                      <span>
                        <p className="font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                          {STATUS_LABEL[p.status]}
                        </p>
                        <p className="mt-1 font-sans text-xl font-black tracking-tight">{p.name}</p>
                        <p className="text-sm text-muted">{p.sub}</p>
                      </span>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        <p className="text-sm text-faint">
          城里的事先按发生顺序写在{" "}
          <Link to="/recap" hash="gotham-timeline" className="text-fg underline-offset-4 hover:underline">
            哥谭时间轴
          </Link>
          。
        </p>
      </div>
    </main>
  );
}
