import { createFileRoute, Link } from "@tanstack/react-router";
import { GEAR, GEAR_INTRO } from "@/lib/gear";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/gear")({
  head: () => ({
    meta: [{ title: pageTitle("装备") }],
  }),
  component: Gear,
});

function Gear() {
  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10 bg-elevated">
        <img
          src="/media/gear-car.jpg"
          alt="战车概念稿"
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/50" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            Kit / Concept
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            装备
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{GEAR_INTRO}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        {GEAR.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-24">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              {item.kicker}
            </p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="font-sans text-4xl font-black tracking-tight sm:text-5xl">
                {item.name}
              </h2>
              <p className="font-display text-lg font-semibold tracking-wide text-muted">
                {item.nameEn}
              </p>
              <p className="text-sm text-faint">{item.seen}</p>
            </div>
            <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-fg">{item.lede}</p>
            <figure className="mt-8 border border-fg/10 bg-[#111]">
              <img
                src={item.image}
                alt={item.imageAlt}
                loading="lazy"
                decoding="async"
                className="mx-auto max-h-[70vh] w-full object-contain"
              />
            </figure>
            <div className="mt-8 max-w-3xl space-y-4 text-pretty leading-relaxed text-muted">
              {item.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </article>
        ))}

        <p className="text-sm text-faint">
          概念稿出自《The Art of The Batman》。剧照在{" "}
          <Link to="/gallery" className="text-fg underline-offset-4 hover:underline">
            剧照
          </Link>
          。这些东西在哥谭里怎么用过，在{" "}
          <Link to="/recap" className="text-fg underline-offset-4 hover:underline">
            回顾
          </Link>
          。
        </p>
      </div>
    </main>
  );
}
