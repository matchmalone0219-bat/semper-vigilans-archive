import { createFileRoute, Link } from "@tanstack/react-router";
import { FACTIONS, STATUS_LABEL } from "@/lib/relations";
import { PEOPLE } from "@/lib/people";
import { cn } from "@/lib/cn";
import { pageTitle } from "@/lib/film";

export const Route = createFileRoute("/people/")({
  head: () => ({
    meta: [{ title: pageTitle("人物") }],
  }),
  component: PeopleIndex,
});

function PeopleIndex() {
  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Files / People
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">人物</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          收录哥谭各派系核心角色的生平履历与出场档案。点击角色卡片可查看详细生平背景与出场记录；查看全景人物关系网络请前往{" "}
          <Link to="/dossier" hash="relations" className="text-fg underline-offset-4 hover:underline">
            电影档案 · 人物关系
          </Link>
          。
        </p>
      </header>

      {FACTIONS.map((faction) => {
        const members = PEOPLE.filter((p) => p.faction === faction.id);
        return (
          <section key={faction.id} className="border-t border-fg/10">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
              <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
                {faction.label}
              </p>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-muted">{faction.note}</p>
              <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2">
                {members.map((p) => (
                  <li key={p.id} className="bg-bg">
                    <Link
                      to="/people/$id"
                      params={{ id: p.id }}
                      className="flex items-start gap-4 p-5 hover:bg-surface/60"
                    >
                      {p.portrait ? (
                        <img
                          src={p.portrait.src}
                          alt=""
                          className={cn(
                            "size-20 shrink-0 object-cover",
                            (p.status === "dead" || p.status === "rumor") && "grayscale",
                          )}
                        />
                      ) : null}
                      <span>
                        <p className="font-display text-xs font-semibold tracking-[0.18em] text-faint uppercase">
                          {p.sub} · {STATUS_LABEL[p.status]}
                        </p>
                        <h2 className="mt-1 font-sans text-2xl font-black tracking-tight">{p.name}</h2>
                        {p.actor ? <p className="mt-1 text-sm text-muted">{p.actor}</p> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </main>
  );
}
