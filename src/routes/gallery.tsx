import { createFileRoute } from "@tanstack/react-router";
import { GALLERIES } from "@/lib/gallery";
import { StillGrid } from "@/components/still-grid";
import { pageTitle } from "@/lib/film";
import { ChapterNav } from "@/components/chapter-nav";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: pageTitle("剧照") }],
  }),
  component: Gallery,
});

const GALLERY_INTROS_EN: Record<string, string> = {
  film: "Official press photography for The Batman (2022). Directed by Matt Reeves and shot by Oscar-winning cinematographer Greig Fraser, establishing a cold, visceral neo-noir aesthetic.",
  penguin: "Production stills for the HBO original limited series The Penguin (2024), chronicling Oz Cobb's ruthless rise through Gotham's flooded underworld following Carmine Falcone's demise.",
  part2: "Set photography from on-location practical shoots for The Batman: Part II in Glasgow, Liverpool, and London, featuring winter snow conditions and the modified Batsuit.",
};

function Gallery() {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/still-rain2.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            Stills / Public
          </p>
          <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">
            {isZh ? "剧照" : "Film Stills"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            {isZh
              ? "精选《新蝙蝠侠》宇宙官方高清剧照与片场纪实图集。支持点击查看大图与全屏画廊浏览，包含第一部电影剧照、HBO《企鹅人》限定剧剧照以及第二部格拉斯哥外景拍摄路透记录。"
              : "Curated official high-resolution film photography and on-set production chronicles across The Batman Epic Crime Saga. Supports full-screen lightbox viewing, encompassing The Batman theatrical stills, HBO's The Penguin limited series, and Part II Glasgow winter set footage."}
          </p>
        </div>
      </header>

      <ChapterNav
        label={isZh ? "剧照画廊章节" : "Gallery Chapters"}
        items={GALLERIES.map((g) => ({
          href: `#${g.id}`,
          label: `${g.kicker} · ${isZh ? g.title : g.titleEn}`,
          count: g.stills.length,
        }))}
      />

      {GALLERIES.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="scroll-mt-28 border-t border-fg/10"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              {group.kicker} / {group.titleEn}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-black tracking-tight sm:text-5xl">
              {isZh ? group.title : group.titleEn}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
              {isZh ? group.intro : (GALLERY_INTROS_EN[group.id] ?? group.intro)}
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
