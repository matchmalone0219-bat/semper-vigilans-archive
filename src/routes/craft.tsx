import { createFileRoute, Link } from "@tanstack/react-router";
import { ALIASES, CITIES, CRAFT_INTRO, LENS, SOUNDTRACK_TRACKS, THEMES } from "@/lib/craft";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/craft")({
  head: () => ({
    meta: [{ title: pageTitle("幕后视听与取景巡礼") }],
  }),
  component: Craft,
});

function Craft() {
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
            幕后与视听
          </h1>
          <p className="mt-3 font-display text-lg tracking-[0.12em] text-muted uppercase">
            电影配乐 · 光影摄影 · 英国取景巡礼
          </p>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{CRAFT_INTRO}</p>
          <nav className="mt-8 flex flex-wrap gap-3">
            {[
              { href: "#score", label: "电影配乐" },
              { href: "#soundtrack-list", label: "插曲与古典乐" },
              { href: "#lens", label: "光影摄影" },
              { href: "#map", label: "取景巡礼地图" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6 sm:py-24">
        <section id="score" className="scroll-mt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            01 / Original Score
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            迈克尔·吉亚奇诺 配乐解析
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
            <img
              src="/media/craft/score.jpg"
              alt="《新蝙蝠侠》官方原声大碟封面"
              className="w-full bg-elevated object-contain lg:col-span-4"
            />
            <div className="lg:col-span-8">
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted">
                电影配乐于伦敦阿比路录音室完成录制。以下为全片最具代表性的三大原创核心主题动机与 Nirvana 经典插曲的深度视听解析。实体原声唱片与数字专辑信息可查阅{" "}
                <Link to="/merch" hash="media" className="text-fg underline-offset-4 hover:underline">
                  官方周边 · 影音专区
                </Link>
                。
              </p>
              <nav className="mt-6 flex flex-wrap gap-3">
                {THEMES.map((theme) => (
                  <a
                    key={theme.id}
                    href={`#${theme.id}`}
                    className="shrink-0 border border-fg/20 px-4 py-2 font-display text-xs font-semibold tracking-[0.22em] text-muted uppercase whitespace-nowrap hover:border-blood hover:text-fg"
                  >
                    {theme.jump}
                  </a>
                ))}
              </nav>
              <div className="mt-8 divide-y divide-fg/10 border-y border-fg/10">
                {THEMES.map((theme) => (
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
                        {theme.titleEn}
                        <span className="text-faint"> · {theme.when}</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-20">
            {THEMES.map((theme) => (
              <article key={theme.id} id={theme.id} className="scroll-mt-24">
                <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                  {theme.kind}
                </p>
                <h3 className="mt-2 font-sans text-3xl font-black tracking-tight">{theme.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {theme.titleEn}
                  <span className="text-faint"> · {theme.when}</span>
                </p>
                <div className="mt-6 grid gap-8 lg:grid-cols-12">
                  <img
                    src={theme.image}
                    alt={theme.imageAlt}
                    className="aspect-[16/9] w-full object-cover lg:col-span-5"
                  />
                  <div className="lg:col-span-7">
                    <p className="text-pretty leading-relaxed text-fg">{theme.lede}</p>
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
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div id="soundtrack-list" className="mt-20 scroll-mt-24 border-t border-fg/10 pt-16">
            <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
              Source Music & Classical Tracks
            </p>
            <h3 className="mt-3 font-sans text-2xl font-black tracking-tight sm:text-3xl">
              电影全片插曲与古典乐全收录
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              除迈克尔·吉亚奇诺的原创交响总谱外，全片在多处关键转折、夜总会潜入与心理戏份中引入了古典圣乐、贝多芬协奏曲与电子混音：
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-sm border-y border-fg/10">
                <thead>
                  <tr className="border-b border-fg/10 text-xs tracking-[0.16em] text-blood uppercase">
                    <th className="py-3.5 pr-4 whitespace-nowrap">曲目名称</th>
                    <th className="py-3.5 pr-4 whitespace-nowrap">艺术家 / 演奏者</th>
                    <th className="py-3.5">对应剧情场景</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-fg/10">
                  {SOUNDTRACK_TRACKS.map((t) => (
                    <tr key={t.title + t.scene} className="hover:bg-surface/30">
                      <td className="py-3.5 pr-4 font-semibold text-fg whitespace-nowrap">{t.title}</td>
                      <td className="py-3.5 pr-4 text-muted whitespace-nowrap">{t.artist}</td>
                      <td className="py-3.5 text-muted leading-relaxed">{t.scene}</td>
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
            光影摄影档案
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">{LENS.intro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LENS.stills.map((still) => (
              <li key={still.src}>
                <img src={still.src} alt="" className="aspect-[16/9] w-full object-cover" />
                <p className="mt-2 text-xs leading-relaxed text-faint">{still.caption}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-sans text-2xl font-black tracking-tight">
                格雷格·弗雷泽（Greig Fraser）· 第一部摄影美学
              </h3>
              <div className="mt-6 space-y-6">
                {LENS.fraser.map((note) => (
                  <div key={note.heading}>
                    <h4 className="font-sans text-lg font-black tracking-tight">{note.heading}</h4>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{note.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-sans text-2xl font-black tracking-tight">
                埃里克·梅塞施密特（Erik Messerschmidt）· 第二部展望
              </h3>
              <div className="mt-6 space-y-6">
                {LENS.messerschmidt.map((note) => (
                  <div key={note.heading}>
                    <h4 className="font-sans text-lg font-black tracking-tight">{note.heading}</h4>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{note.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="map" className="scroll-mt-24">
          <p className="font-display text-sm font-semibold tracking-[0.32em] text-blood uppercase">
            03 / Filming Locations Map
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black tracking-tight sm:text-4xl">
            英国取景巡礼地图
          </h2>
          <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
            电影中哥谭市的虚构地点可在{" "}
            <Link to="/places" className="text-fg underline-offset-4 hover:underline">
              哥谭地点总览
            </Link>
            {" "}中查阅；以下为您详细梳理英国利物浦、格拉斯哥与伦敦三大城市的现实取景坐标与影迷巡礼指南。
          </p>

          <ul className="mt-10 grid gap-px bg-border lg:grid-cols-3">
            {CITIES.map((city) => (
              <li key={city.id} className="bg-bg p-6">
                <a href={`#${city.id}`} className="block hover:text-blood">
                  <p className="font-display text-xs font-semibold tracking-[0.22em] text-blood uppercase">
                    {city.cityEn}
                  </p>
                  <h3 className="mt-2 font-sans text-2xl font-black tracking-tight">{city.city}</h3>
                </a>
                <p className="mt-2 text-pretty text-xs leading-relaxed text-faint">{city.note}</p>
                <ul className="mt-5 space-y-3">
                  {city.pins.map((pin) => (
                    <li key={pin.id}>
                      <a href={`#${pin.id}`} className="block hover:text-fg">
                        <p className="font-sans text-sm font-black tracking-tight">{pin.name}</p>
                        <p className="mt-0.5 text-xs text-muted">
                          {pin.filmAs}
                          <span className="text-faint"> · {pin.work}</span>
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div id="aliases" className="mt-12 scroll-mt-24">
            <h3 className="font-sans text-xl font-black tracking-tight">常见地名与取景对照</h3>
            <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">
              为方便影迷实地打卡与查阅，以下整理了常见的取景地别称与官方拍摄场记的详细对照：
            </p>
            <div className="mt-6 divide-y divide-fg/10 border-y border-fg/10">
              <div className="grid gap-2 py-3 text-xs tracking-[0.2em] text-faint uppercase sm:grid-cols-12">
                <p className="sm:col-span-3">常见地名 / 剧情称谓</p>
                <p className="hidden sm:col-span-9 sm:block">现实取景地说明</p>
              </div>
              {ALIASES.map((row) => (
                <a
                  key={row.heard}
                  href={`#${row.mapsTo}`}
                  className="grid gap-2 py-4 hover:bg-surface/40 sm:grid-cols-12 sm:gap-8"
                >
                  <p className="font-sans text-sm font-black tracking-tight sm:col-span-3 text-blood">
                    {row.heard}
                  </p>
                  <p className="text-pretty text-sm leading-relaxed text-muted sm:col-span-9">
                    {row.body}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {CITIES.map((city) => (
          <section key={city.id} id={city.id} className="scroll-mt-24">
            <h3 className="font-sans text-3xl font-black tracking-tight">
              {city.city}
              <span className="ml-3 text-lg font-medium tracking-normal text-faint">
                {city.cityEn}
              </span>
            </h3>
            <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">{city.note}</p>
            <ul className="mt-8 space-y-12">
              {city.pins.map((pin) => (
                <li key={pin.id} id={pin.id} className="scroll-mt-24 grid gap-6 lg:grid-cols-12">
                  <img
                    src={pin.image}
                    alt={pin.imageAlt}
                    className="aspect-[16/9] w-full object-cover lg:col-span-5"
                  />
                  <div className="lg:col-span-7">
                    <p className="font-display text-xs font-semibold tracking-[0.2em] text-blood uppercase">
                      {pin.filmAs}
                    </p>
                    <h4 className="mt-2 font-sans text-2xl font-black tracking-tight">{pin.name}</h4>
                    <p className="mt-1 text-sm text-muted">
                      {pin.nameEn}
                      <span className="text-faint"> · {pin.work}</span>
                    </p>
                    <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">{pin.body}</p>
                    <p className="mt-3 text-pretty text-xs leading-relaxed text-faint">
                      打卡贴士：{pin.visit}
                    </p>
                    {pin.placeId ? (
                      <p className="mt-3 text-xs">
                        <Link
                          to="/places/$id"
                          params={{ id: pin.placeId }}
                          className="text-muted underline-offset-4 hover:text-fg hover:underline"
                        >
                          查看哥谭对应地点档案 →
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p className="max-w-2xl text-sm leading-relaxed text-faint">
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
        </p>
      </div>
    </main>
  );
}
