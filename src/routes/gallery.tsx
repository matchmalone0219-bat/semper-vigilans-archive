import { createFileRoute } from "@tanstack/react-router";
import { GALLERIES } from "@/lib/gallery";
import { StillGrid } from "@/components/still-grid";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: pageTitle("剧照") }],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Stills / Public
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">剧照</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          按作品分开存放。点图看大图，左右键翻页。第一部和《企鹅人》是华纳、HBO 发给媒体的官方剧照；第二部还没有官方物料，只有格拉斯哥片场见报的照片。
        </p>
        <nav className="mt-8 flex flex-wrap gap-3">
          {GALLERIES.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.28em] text-muted uppercase hover:border-blood hover:text-fg"
            >
              {g.kicker} · {g.title}
            </a>
          ))}
        </nav>
      </header>

      {GALLERIES.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-20 border-t border-fg/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              {group.kicker} / {group.titleEn}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-black tracking-tight sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
              {group.intro}
            </p>
            <div className="mt-10">
              <StillGrid stills={group.stills} featuredFirst />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
