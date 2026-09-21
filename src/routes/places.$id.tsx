import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin, Shuffle } from "lucide-react";
import { PLACE_MAP, PLACES } from "@/lib/places";
import { getPerson } from "@/lib/people";
import { STATUS_LABEL } from "@/lib/relations";
import { cn } from "@/lib/cn";
import { pageTitle } from "@/lib/film";
import { CITIES } from "@/lib/craft";

export const Route = createFileRoute("/places/$id")({
  head: ({ params }) => {
    const place = PLACE_MAP[params.id];
    return { meta: [{ title: pageTitle(place?.name ?? "地点") }] };
  },
  component: PlacePage,
});

function PlacePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
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
  const placeIndex = PLACES.findIndex((p) => p.id === place.id);
  const previous = PLACES[(placeIndex - 1 + PLACES.length) % PLACES.length];
  const next = PLACES[(placeIndex + 1) % PLACES.length];

  const openRandomPlace = () => {
    const choices = PLACES.filter((entry) => entry.id !== place.id);
    const random = choices[Math.floor(Math.random() * choices.length)];
    if (random) void navigate({ to: "/places/$id", params: { id: random.id } });
  };

  const filmingLocations = CITIES.flatMap((city) =>
    city.pins
      .filter((pin) => pin.placeId === place.id)
      .map((pin) => ({ ...pin, cityName: city.city, cityEn: city.cityEn })),
  );

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
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-faint">
            <span>
              <Link to="/places" className="hover:text-fg">
                地点
              </Link>
              <span className="mx-2">/</span>
              <span>{place.works}</span>
            </span>
            <span className="text-fg/20">|</span>
            <Link
              to="/craft"
              hash="map"
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-blood"
            >
              <MapPin className="size-3.5" />
              英国取景巡礼地图
            </Link>
          </div>
        </div>
      </header>

      <nav aria-label="地点档案浏览" className="border-b border-fg/10 bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-6">
          <Link
            to="/places/$id"
            params={{ id: previous.id }}
            className="flex items-center gap-3 border-r border-fg/10 py-4 pr-4 hover:text-blood"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                上一地点
              </span>
              <span className="block truncate font-sans text-sm font-black">{previous.name}</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={openRandomPlace}
            className="order-3 col-span-2 flex items-center justify-center gap-2 border-t border-fg/10 px-6 py-3 text-xs tracking-[0.16em] text-muted uppercase hover:text-fg sm:order-none sm:col-span-1 sm:border-x sm:border-t-0"
          >
            <Shuffle className="size-4" />
            随机地点
          </button>
          <Link
            to="/places/$id"
            params={{ id: next.id }}
            className="flex items-center justify-end gap-3 py-4 pl-4 text-right hover:text-blood"
          >
            <span className="min-w-0">
              <span className="block text-[10px] tracking-[0.18em] text-faint uppercase">
                下一地点
              </span>
              <span className="block truncate font-sans text-sm font-black">{next.name}</span>
            </span>
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>
      </nav>

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

        {filmingLocations.length > 0 ? (
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
                英国实景取景巡礼
              </h2>
              <Link
                to="/craft"
                hash="map"
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg"
              >
                <MapPin className="size-3.5" /> 查看完整巡礼地图
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {filmingLocations.map((loc) => (
                <li
                  key={loc.id}
                  className="border border-fg/10 bg-surface/40 p-5 transition-colors hover:border-fg/25"
                >
                  <Link to="/craft" hash={loc.id} className="group block">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-xs font-semibold tracking-wider text-blood uppercase">
                        {loc.cityName} · {loc.cityEn}
                      </span>
                      <span className="font-mono text-[10px] text-faint">{loc.work}</span>
                    </div>
                    <h3 className="mt-2 font-sans text-lg font-black tracking-tight group-hover:text-blood">
                      {loc.name}
                      <span className="ml-2 text-sm font-normal text-muted">({loc.nameEn})</span>
                    </h3>
                    <p className="mt-1 font-mono text-xs text-faint">戏中设定：{loc.filmAs}</p>
                    <p className="mt-3 line-clamp-3 text-pretty text-xs leading-relaxed text-muted">
                      {loc.body}
                    </p>
                    <p className="mt-3 text-[11px] text-faint">📍 {loc.visit}</p>
                  </Link>
                </li>
              ))}
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
