import { createFileRoute, Link } from "@tanstack/react-router";
import { ALIASES, CITIES, CRAFT_INTRO, LENS, SOUNDTRACK_TRACKS, THEMES } from "@/lib/craft";
import { pageTitle } from "@/lib/film";
import { ChapterNav } from "@/components/chapter-nav";
import { useI18n } from "@/lib/i18n";
import {
  CRAFT_INTRO_EN,
  getLocalizedTheme,
  TRACK_SCENES_EN,
  LENS_EN,
  CITIES_EN,
  ALIASES_EN,
} from "@/lib/i18n/craft-en";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [{ title: pageTitle("幕后视听与取景巡礼") }],
  }),
  component: Craft,
});

function Craft() {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <main>
      <header className="relative isolate overflow-hidden border-b border-fg/10">
        <img
          src="/media/street.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
            BEHIND-THE-SCENES & CINEMATIC ARTISTRY
          </p>
          <h1 className="mt-4 font-sans text-5xl font-black leading-none tracking-tight sm:text-7xl">
            {isZh ? "幕后与视听" : "Craft & Cinema Artistry"}
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            {isZh ? "电影配乐 · 光影摄影 · 英国取景巡礼" : "Original Score · Cinematography · UK Filming Locations"}
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
            {isZh ? CRAFT_INTRO : CRAFT_INTRO_EN}{" "}
            {isZh ? "主演与主创如何谈这三部作品，见 " : "For in-depth conversations with cast and filmmakers, see "}
            <Link to="/interviews" className="text-fg underline-offset-4 hover:underline">
              {isZh ? "人物访谈" : "Interviews"}
            </Link>
            {isZh ? "。" : "."}
          </p>
        </div>
      </header>
      <ChapterNav
        label={isZh ? "幕后视听章节" : "Craft Chapters"}
        items={[
          { href: "#score", label: isZh ? "电影配乐" : "Original Score" },
          { href: "#soundtrack-list", label: isZh ? "插曲与古典乐" : "Source Music & Classics", count: SOUNDTRACK_TRACKS.length },
          { href: "#lens", label: isZh ? "光影摄影" : "Cinematography" },
          { href: "#map", label: isZh ? "取景巡礼地图" : "Filming Locations Map", count: CITIES.length },
        ]}
      />

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        <section id="score" className="scroll-mt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            01 / Original Score
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {isZh ? "迈克尔·吉亚奇诺 配乐解析" : "Michael Giacchino Original Score Analysis"}
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <img
              src="/media/craft/score.jpg"
              alt={isZh ? "《新蝙蝠侠》官方原声大碟封面" : "The Batman (Original Motion Picture Soundtrack) Cover"}
              className="w-full bg-elevated object-contain lg:col-span-4"
            />
            <div className="lg:col-span-8">
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                {isZh
                  ? "电影配乐于伦敦阿比路录音室完成录制。以下为全片最具代表性的三大原创核心主题动机与 Nirvana 经典插曲的深度视听解析。实体原声唱片与数字专辑信息可查阅 "
                  : "Recorded at London's historic Abbey Road Studios. Below is a deep acoustic analysis of the film's three signature recurring themes and Nirvana's seminal track. For physical vinyl editions and digital releases, visit "}
                <Link to="/merch" hash="media" className="text-fg underline-offset-4 hover:underline">
                  {isZh ? "官方周边 · 影音专区" : "Official Merch · Media & Vinyl"}
                </Link>
                {isZh ? "。" : "."}
              </p>
              <nav className="mt-6 flex flex-wrap gap-3">
                {THEMES.map((rawTheme) => {
                  const theme = getLocalizedTheme(rawTheme, locale);
                  return (
                    <a
                      key={theme.id}
                      href={`#${theme.id}`}
                      className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
                    >
                      {theme.jump}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
                {THEMES.map((rawTheme) => {
                  const theme = getLocalizedTheme(rawTheme, locale);
                  return (
                    <a
                      key={theme.id}
                      href={`#${theme.id}`}
                      className="grid gap-2 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-6 hover:bg-surface/30"
                    >
                      <p className="font-display text-xs font-semibold tracking-[0.18em] text-blood sm:col-span-3">
                        {theme.kind}
                      </p>
                      <div className="sm:col-span-9">
                        <p className="font-sans text-lg font-black tracking-tight">{theme.title}</p>
                        <p className="mt-1 text-pretty text-sm text-muted">
                          {isZh ? theme.titleEn : ""}
                          <span className="text-faint"> · {theme.when}</span>
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-20">
            {THEMES.map((rawTheme) => {
              const theme = getLocalizedTheme(rawTheme, locale);
              return (
                <article key={theme.id} id={theme.id} className="scroll-mt-24">
                  <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                    {theme.kind}
                  </p>
                  <h3 className="mt-2 font-sans text-3xl font-black tracking-tight">{theme.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {isZh ? theme.titleEn : ""}
                    <span className="text-faint"> · {theme.when}</span>
                  </p>
                  <div className="mt-6 grid gap-8 lg:grid-cols-12">
                    {theme.image ? (
                      <img
                        src={theme.image}
                        alt={theme.imageAlt ?? ""}
                        className="aspect-[16/9] w-full object-cover lg:col-span-5"
                      />
                    ) : null}
                    <div className={theme.image ? "lg:col-span-7" : "lg:col-span-12"}>
                      <p className="text-pretty leading-relaxed text-fg">{theme.lede}</p>
                      {theme.quote ? (
                        <blockquote className="mt-6 border-l border-blood/50 pl-4 text-sm leading-relaxed text-muted">
                          <p>“{isZh && theme.quoteZh ? theme.quoteZh : theme.quote}”</p>
                          {isZh && theme.quoteZh ? (
                            <p className="mt-3 text-pretty font-medium text-fg">“{theme.quote}”</p>
                          ) : null}
                          {theme.quoteSrc ? (
                            <footer className="mt-2 text-xs tracking-wide text-faint">
                              —— {isZh ? theme.quoteSrc : (theme.id === "nirvana" ? "Matt Reeves, Empire Magazine Interview" : theme.quoteSrc)}
                            </footer>
                          ) : null}
                        </blockquote>
                      ) : null}
                      <div className="mt-6 space-y-6">
                        {theme.sections.map((section) => (
                          <div key={section.heading}>
                            <h4 className="font-sans text-lg font-black tracking-tight">
                              {section.heading}
                            </h4>
                            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                              {section.body}
                            </p>
                          </div>
                        ))}
                      </div>
                      {theme.id === "nirvana" ? (
                        <p className="mt-6 text-sm text-faint">
                          {isZh ? (
                            <>
                              人物塑形写在{" "}
                              <Link
                                to="/people/$id"
                                params={{ id: "bruce" }}
                                className="text-muted underline-offset-4 hover:text-fg hover:underline"
                              >
                                布鲁斯·韦恩
                              </Link>
                              ；犯罪片与漫画蓝本见{" "}
                              <Link to="/roots" className="text-muted underline-offset-4 hover:text-fg hover:underline">
                                艺术溯源
                              </Link>
                              ，不把《最后的日子》单列为叙事灵感。
                            </>
                          ) : (
                            <>
                              Character profile detailed in{" "}
                              <Link
                                to="/people/$id"
                                params={{ id: "bruce" }}
                                className="text-muted underline-offset-4 hover:text-fg hover:underline"
                              >
                                Bruce Wayne
                              </Link>
                              ; comic and cinematic lineages cataloged in{" "}
                              <Link to="/roots" className="text-muted underline-offset-4 hover:text-fg hover:underline">
                                Roots
                              </Link>
                              .
                            </>
                          )}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div id="soundtrack-list" className="mt-20 scroll-mt-24 border-t border-fg/10 pt-16">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              Source Music & Classical Tracks
            </p>
            <h3 className="mt-3 font-sans text-2xl font-black tracking-tight sm:text-3xl">
              {isZh ? "电影全片插曲与古典乐全收录" : "Complete Source Music & Classical Selections"}
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {isZh
                ? "除迈克尔·吉亚奇诺的原创交响总谱外，全片在多处关键转折、夜总会潜入与心理戏份中引入了古典圣乐、贝多芬协奏曲与电子混音："
                : "Beyond Giacchino's symphonic score, key pivotal turning points, nightclub infiltrations, and psychological sequences incorporate sacred vocal hymns, Beethoven concertos, and electronic club mixes:"}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-sm border-y border-fg/10">
                <thead>
                  <tr className="border-b border-fg/10 text-xs tracking-[0.16em] text-blood uppercase">
                    <th className="py-3.5 pr-4 whitespace-nowrap">{isZh ? "曲目名称" : "Track Title"}</th>
                    <th className="py-3.5 pr-4 whitespace-nowrap">{isZh ? "艺术家 / 演奏者" : "Artist / Performer"}</th>
                    <th className="py-3.5">{isZh ? "对应剧情场景" : "Film Scene / Placement"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fg/10">
                  {SOUNDTRACK_TRACKS.map((t, index) => (
                    <tr key={t.title + t.scene} className="hover:bg-surface/30">
                      <td className="py-3.5 pr-4 font-semibold text-fg whitespace-nowrap">{t.title}</td>
                      <td className="py-3.5 pr-4 text-muted whitespace-nowrap">{t.artist}</td>
                      <td className="py-3.5 text-muted leading-relaxed">
                        {isZh ? t.scene : (TRACK_SCENES_EN[index] ?? t.scene)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="lens" className="scroll-mt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            02 / Cinematography
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {isZh ? "光影摄影档案" : "Cinematography Dossier"}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {isZh ? LENS.intro : LENS_EN.intro}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LENS.stills.map((still, index) => (
              <li key={still.src}>
                <img src={still.src} alt={still.alt} className="aspect-[16/9] w-full object-cover" />
                <p className="mt-2 text-xs leading-relaxed text-faint">
                  {isZh ? still.caption : (LENS_EN.stillCaptions[index] ?? still.caption)}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-faint">
                  <a
                    href={still.href}
                    rel="noreferrer"
                    className="text-muted underline-offset-4 hover:text-fg hover:underline"
                  >
                    {still.credit}
                  </a>
                  <span> · {still.posted}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-sans text-2xl font-black tracking-tight">
                {isZh ? "格雷格·弗雷泽（Greig Fraser）· 第一部摄影美学" : "Greig Fraser · The Batman (2022) Visual Artistry"}
              </h3>
              <div className="mt-6 space-y-6">
                {LENS.fraser.map((note, noteIndex) => {
                  const enNote = LENS_EN.fraser[noteIndex];
                  return (
                    <div key={note.heading}>
                      <h4 className="font-sans text-lg font-black tracking-tight">
                        {isZh ? note.heading : (enNote?.heading ?? note.heading)}
                      </h4>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                        {isZh ? note.body : (enNote?.body ?? note.body)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="font-sans text-2xl font-black tracking-tight">
                {isZh ? "埃里克·梅塞施密特（Erik Messerschmidt）· 第二部勘景" : "Erik Messerschmidt · The Batman: Part II Location Scouts"}
              </h3>
              <div className="mt-6 space-y-6">
                {LENS.messerschmidt.map((note, noteIndex) => {
                  const enNote = LENS_EN.messerschmidt[noteIndex];
                  return (
                    <div key={note.heading}>
                      <h4 className="font-sans text-lg font-black tracking-tight">
                        {isZh ? note.heading : (enNote?.heading ?? note.heading)}
                      </h4>
                      <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                        {isZh ? note.body : (enNote?.body ?? note.body)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="scroll-mt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            03 / Filming Locations Map
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            {isZh ? "英国取景巡礼地图" : "UK Filming Locations Guide"}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            {isZh ? (
              <>
                电影中哥谭市的虚构地点可在{" "}
                <Link to="/places" className="text-fg underline-offset-4 hover:underline">
                  哥谭地点总览
                </Link>
                {" "}中查阅；以下为您详细梳理英国利物浦、格拉斯哥与伦敦三大城市的现实取景坐标与影迷巡礼指南。
              </>
            ) : (
              <>
                Fictional Gotham landmarks are mapped in{" "}
                <Link to="/places" className="text-fg underline-offset-4 hover:underline">
                  Gotham Places
                </Link>
                ; below is the comprehensive real-world traveler guide across Liverpool, Glasgow, and Greater London.
              </>
            )}
          </p>

          <ul className="mt-10 grid gap-px bg-border lg:grid-cols-3">
            {CITIES.map((city) => {
              const cityEn = CITIES_EN[city.id];
              return (
                <li key={city.id} className="bg-bg p-6">
                  <a href={`#${city.id}`} className="block hover:text-blood">
                    <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                      {city.cityEn}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-black tracking-tight">
                      {isZh ? city.city : city.cityEn}
                    </h3>
                  </a>
                  <p className="mt-2 text-pretty text-xs leading-relaxed text-faint">
                    {isZh ? city.note : (cityEn?.note ?? city.note)}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {city.pins.map((pin, pinIndex) => {
                      const pinEn = cityEn?.pins[pinIndex];
                      return (
                        <li key={pin.id}>
                          <a href={`#${pin.id}`} className="block hover:text-fg">
                            <p className="font-sans text-sm font-black tracking-tight">
                              {isZh ? pin.name : pin.nameEn}
                            </p>
                            <p className="mt-0.5 text-xs text-muted">
                              {isZh ? pin.filmAs : (pinEn?.filmAs ?? pin.filmAs)}
                              <span className="text-faint"> · {isZh ? pin.work : (pinEn?.work ?? pin.work)}</span>
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div id="aliases" className="mt-12 scroll-mt-24">
            <h3 className="font-sans text-xl font-black tracking-tight">
              {isZh ? "常见地名与取景对照" : "Film Nomenclature & Real-World Location Cross-Reference"}
            </h3>
            <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">
              {isZh
                ? "为方便影迷实地打卡与查阅，以下整理了常见的取景地别称与官方拍摄场记的详细对照："
                : "For fans planning location pilgrimages, the table below cross-references popular scene descriptors with actual UK filming locations:"}
            </p>
            <div className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-12">
                <p className="sm:col-span-3">{isZh ? "常见地名 / 剧情称谓" : "Film Scene / Nomenclature"}</p>
                <p className="hidden sm:col-span-9 sm:block">{isZh ? "现实取景地说明" : "Practical UK Filming Location"}</p>
              </div>
              {ALIASES.map((row, index) => {
                const aliasEn = ALIASES_EN[index];
                return (
                  <a
                    key={row.heard}
                    href={`#${row.mapsTo}`}
                    className="grid gap-2 py-4 hover:bg-surface/40 sm:grid-cols-12 sm:gap-8"
                  >
                    <p className="font-sans text-sm font-black tracking-tight sm:col-span-3 text-blood">
                      {isZh ? row.heard : (aliasEn?.heard ?? row.heard)}
                    </p>
                    <p className="text-pretty text-sm leading-relaxed text-muted sm:col-span-9">
                      {isZh ? row.body : (aliasEn?.body ?? row.body)}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {CITIES.map((city) => {
          const cityEn = CITIES_EN[city.id];
          return (
            <section key={city.id} id={city.id} className="scroll-mt-24">
              <h3 className="font-sans text-3xl font-black tracking-tight">
                {isZh ? city.city : city.cityEn}
                <span className="ml-3 text-lg font-medium tracking-normal text-faint">
                  {isZh ? city.cityEn : ""}
                </span>
              </h3>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">
                {isZh ? city.note : (cityEn?.note ?? city.note)}
              </p>
              <ul className="mt-8 space-y-12">
                {city.pins.map((pin, pinIndex) => {
                  const pinEn = cityEn?.pins[pinIndex];
                  return (
                    <li key={pin.id} id={pin.id} className="scroll-mt-24 grid gap-6 lg:grid-cols-12">
                      <img
                        src={pin.image}
                        alt={pin.imageAlt}
                        className="aspect-[16/9] w-full object-cover lg:col-span-5"
                      />
                      <div className="lg:col-span-7">
                        <p className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                          {isZh ? pin.filmAs : (pinEn?.filmAs ?? pin.filmAs)}
                        </p>
                        <h4 className="mt-2 font-sans text-2xl font-black tracking-tight">
                          {isZh ? pin.name : pin.nameEn}
                        </h4>
                        <p className="mt-1 text-sm text-muted">
                          {isZh ? pin.nameEn : ""}
                          <span className="text-faint"> · {isZh ? pin.work : (pinEn?.work ?? pin.work)}</span>
                        </p>
                        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">
                          {isZh ? pin.body : (pinEn?.body ?? pin.body)}
                        </p>
                        <p className="mt-3 text-pretty text-xs leading-relaxed text-faint">
                          {isZh ? "打卡贴士：" : "Travel Tip: "}
                          {isZh ? pin.visit : (pinEn?.visit ?? pin.visit)}
                        </p>
                        {pin.placeId ? (
                          <p className="mt-3 text-xs">
                            <Link
                              to="/places/$id"
                              params={{ id: pin.placeId }}
                              className="text-muted underline-offset-4 hover:text-fg hover:underline"
                            >
                              {isZh ? "查看哥谭对应地点档案 →" : "View Corresponding Gotham Landmark Dossier →"}
                            </Link>
                          </p>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        <p className="max-w-2xl text-sm leading-relaxed text-faint">
          {isZh ? (
            <>
              查阅核心演职员与制作日志，请前往{" "}
              <Link to="/dossier" className="text-muted underline-offset-4 hover:text-fg hover:underline">
                电影档案
              </Link>
              ；查阅格拉斯哥最新片场路透照片，请前往{" "}
              <Link
                to="/gallery"
                hash="part2"
                className="text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                剧照画廊
              </Link>
              。
            </>
          ) : (
            <>
              For core cast profiles and production logs, visit{" "}
              <Link to="/dossier" className="text-muted underline-offset-4 hover:text-fg hover:underline">
                Film Dossier
              </Link>
              ; for Glasgow set photography, visit{" "}
              <Link
                to="/gallery"
                hash="part2"
                className="text-muted underline-offset-4 hover:text-fg hover:underline"
              >
                Gallery
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </main>
  );
}
