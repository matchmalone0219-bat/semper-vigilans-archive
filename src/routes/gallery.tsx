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
          精选《新蝙蝠侠》宇宙官方高清剧照与片场纪实图集。支持点击查看大图与全屏画廊浏览，包含第一部电影剧照、HBO《企鹅人》限定剧剧照以及第二部格拉斯哥外景拍摄路透记录。
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
