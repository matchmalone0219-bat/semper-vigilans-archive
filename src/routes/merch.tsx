import { createFileRoute, Link } from "@tanstack/react-router";
import { MERCH } from "@/lib/merch";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [{ title: pageTitle("周边") }],
  }),
  component: Merch,
});

function Merch() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Merch / Licensed
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">周边</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          第一部上映前后发出去的授权产品，按类型分开。人偶、雕像、载具、出版、影像和海报。海报收的是印出来的纸，不是宣发图。第二部还没有周边。
        </p>
        <nav className="mt-8 flex flex-wrap gap-3">
          {MERCH.map((g) => (
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

      {MERCH.map((group) => (
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
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {group.items.map((item, i) => (
                <li
                  key={item.id}
                  id={item.id}
                  className={i === 0 && group.items.length > 1 ? "sm:col-span-2" : undefined}
                >
                  <article>
                    <figure className="border border-fg/10 bg-[#111]">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className={
                          i === 0 && group.items.length > 1
                            ? "mx-auto max-h-[56vh] w-full object-contain"
                            : "mx-auto aspect-[4/3] w-full object-contain"
                        }
                      />
                    </figure>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-sans text-2xl font-black tracking-tight">
                        {item.name}
                      </h3>
                      <p className="font-display text-sm font-semibold tracking-wide text-muted">
                        {item.nameEn}
                      </p>
                    </div>
                    <p className="mt-1 font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                      {item.maker} · {item.year} · {item.spec}
                    </p>
                    <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                      {item.body}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-faint sm:px-6">
        本页不是商店，不提供购买链接。产品图来自 INART / Queen Studios、Hot Toys、Prime 1 Studio、Mattel、McFarlane、Jada、Funko、Mondo、IMAX、Dolby、Abrams、华纳家庭娱乐与 WaterTower 发给媒体的物料。设定集里的装备概念在{" "}
        <Link to="/gear" className="text-fg underline-offset-4 hover:underline">
          装备
        </Link>
        。小说和漫画在故事里怎么接，在{" "}
        <Link to="/recap" className="text-fg underline-offset-4 hover:underline">
          回顾
        </Link>
        。
      </p>
    </main>
  );
}
