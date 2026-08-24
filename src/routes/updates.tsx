import { createFileRoute, Link } from "@tanstack/react-router";
import { LOG, LOG_KIND, pageTitle } from "@/lib/film";
import { SITE_UPDATES, SITE_UPDATE_KIND } from "@/lib/site-updates";
import { SourceLink } from "@/components/source-link";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: pageTitle("更新记录") },
      { name: "description", content: "Semper Vigilans 站点更新记录与《新蝙蝠侠2》近期制片动态。" },
    ],
  }),
  component: Updates,
});

function Updates() {
  const recentFilmUpdates = [...LOG]
    .filter((entry) => !entry.upcoming)
    .reverse()
    .slice(0, 6);

  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="font-display text-sm font-semibold tracking-[0.36em] text-blood uppercase">
          Archive / Updates
        </p>
        <h1 className="mt-3 font-sans text-5xl font-black tracking-tight sm:text-6xl">更新记录</h1>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
          这里分别记录本站内容与功能变更，以及影片公开制片动态。影片资料按证据类型标注；没有可靠公开链接的条目不会补造来源。
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-16 px-4 pb-20 sm:px-6 lg:grid-cols-2">
        <section>
          <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
            01 / Site Changelog
          </p>
          <h2 className="mt-2 font-sans text-3xl font-black tracking-tight">站点变更</h2>
          <ol className="mt-8 border-l border-fg/15 pl-6">
            {SITE_UPDATES.map((entry) => (
              <li key={`${entry.date}-${entry.title}`} className="relative pb-9 last:pb-0">
                <span className="absolute top-1.5 -left-[29px] size-2 rounded-full bg-blood" />
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase">
                  {entry.date} · {SITE_UPDATE_KIND[entry.kind]}
                </p>
                <h3 className="mt-1 font-sans text-xl font-black tracking-tight">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <p className="font-display text-sm font-semibold tracking-[0.28em] text-blood uppercase">
            02 / Production Log
          </p>
          <h2 className="mt-2 font-sans text-3xl font-black tracking-tight">近期影片动态</h2>
          <ol className="mt-8 space-y-8">
            {recentFilmUpdates.map((entry) => (
              <li
                key={entry.iso}
                className="border-t border-fg/10 pt-5 first:border-t-0 first:pt-0"
              >
                <p className="font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase">
                  {entry.date} · {LOG_KIND[entry.kind]}
                </p>
                <h3 className="mt-1 font-sans text-xl font-black tracking-tight">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{entry.body}</p>
                {entry.source ? (
                  <SourceLink
                    label={entry.source}
                    href={entry.sourceUrl}
                    tier={entry.sourceTier}
                    verifiedAt={entry.verifiedAt}
                  />
                ) : null}
              </li>
            ))}
          </ol>
          <Link
            to="/dossier"
            hash="log"
            className="mt-8 inline-block font-display text-xs font-semibold tracking-[0.18em] text-blood uppercase hover:text-fg"
          >
            查看完整拍摄日志 →
          </Link>
        </section>
      </div>
    </main>
  );
}
