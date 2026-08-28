import { createFileRoute, Link } from "@tanstack/react-router";
import { PLACES } from "@/lib/places";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/places/")({
  head: () => ({
    meta: [{ title: pageTitle("地点") }],
  }),
  component: PlacesIndex,
});

function PlacesIndex() {
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/places/wayne-tower.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Files / Places
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">地点</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          收录哥谭市核心地标建筑与关键历史场景，包含各据点的当前状态与关联剧情。按故事发生时间梳理的完整脉络请查看{" "}
          <Link
            to="/recap"
            hash="gotham-timeline"
            className="text-fg underline-offset-4 hover:underline"
          >
            回顾 · 哥谭历史编年史
          </Link>
          。
        </p>
        </div>
      </header>

      <section className="border-t border-fg/10">
        <ul className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 sm:py-16">
          {PLACES.map((place) => (
            <li key={place.id}>
              <Link to="/places/$id" params={{ id: place.id }} className="group block">
                <div className="aspect-[16/9] overflow-hidden bg-elevated">
                  <img
                    src={place.image}
                    alt={place.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-opacity duration-150 group-hover:opacity-90"
                  />
                </div>
                <p className="mt-3 font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase">
                  {place.status} · {place.works}
                </p>
                <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">{place.name}</h2>
                <p className="text-sm text-muted">{place.also}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
