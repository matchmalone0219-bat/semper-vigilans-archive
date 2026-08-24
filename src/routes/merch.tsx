import { createFileRoute, Link } from "@tanstack/react-router";
import { MERCH } from "@/lib/merch";
import { pageTitle } from "@/lib/film";
import { SourceLink } from "@/components/source-link";

export const Route = createFileRoute("/merch")({
  head: () => ({
    meta: [{ title: pageTitle("周边与收藏品") }],
  }),
  component: Merch,
});

function Merch() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Merch / Licensed Collectibles
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">
          官方周边与收藏品
        </h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          收录《新蝙蝠侠》上映期间推出的官方授权衍生品与实体收藏物料，涵盖可动人偶、1:1 道具复刻、高端雕像、车模与遥控载具、乐高套组、跨界联名、出版书籍、影音原声及实体艺术海报。目前第二部尚未公布周边产品。
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
        <section key={group.id} id={group.id} className="scroll-mt-20 border-t border-fg/10">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
              {group.kicker} / {group.titleEn}
            </p>
            <h2 className="mt-3 font-sans text-4xl font-black tracking-tight sm:text-5xl">
              {group.title}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">{group.intro}</p>
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
                        loading="lazy"
                        decoding="async"
                        className={
                          i === 0 && group.items.length > 1
                            ? "mx-auto max-h-[56vh] w-full object-contain"
                            : "mx-auto aspect-[4/3] w-full object-contain"
                        }
                      />
                    </figure>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-sans text-2xl font-black tracking-tight">{item.name}</h3>
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
                    {item.sourceUrl && item.sourceLabel ? (
                      <SourceLink
                        label={item.sourceLabel}
                        href={item.sourceUrl}
                        tier="official"
                        verifiedAt={item.verifiedAt}
                      />
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <p className="mx-auto max-w-6xl px-4 pb-16 text-sm text-faint sm:px-6">
        本站为影迷非商业资料库，不提供任何商品购买与销售服务。产品展示图与技术规格均整理自
        INART、Hot Toys、Infinity Studio、Prime 1 Studio、Jazzinc、乐高、Mondo、Abrams
        及华纳家庭娱乐等授权厂牌公开物料。查阅电影装备设定请前往{" "}
        <Link to="/gear" className="text-fg underline-offset-4 hover:underline">
          装备
        </Link>
        ，了解衍生小说与漫画在故事线中的承接关系请查阅{" "}
        <Link to="/recap" className="text-fg underline-offset-4 hover:underline">
          前作回顾
        </Link>
        。
      </p>
    </main>
  );
}
