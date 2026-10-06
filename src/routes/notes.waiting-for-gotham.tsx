import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageTitle } from "@/lib/film";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/notes/waiting-for-gotham")({
  head: () => ({
    meta: [{ title: pageTitle("等他回到哥谭") }],
  }),
  component: WaitingForGothamNote,
});

function WaitingForGothamNote() {
  const { locale } = useI18n();
  const isZh = locale === "zh";

  return (
    <main className="min-h-svh bg-bg">
      <header className="border-b border-fg/10">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-[11px] font-semibold tracking-[0.18em] text-faint uppercase transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5" />
            {isZh ? "返回专题首页" : "Back to Archive"}
          </Link>

          <p className="mt-12 font-display text-xs font-semibold tracking-[0.3em] text-blood uppercase">
            Editor&apos;s Note · 2026.10.06
          </p>
          <h1 className="mt-4 text-balance font-sans text-4xl font-black leading-tight tracking-tight text-fg sm:text-6xl">
            {isZh ? "等他回到哥谭" : "Waiting for His Return to Gotham"}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {isZh
              ? "写在《新蝙蝠侠2》暂停制作之后"
              : "Written after production on The Batman: Part II was temporarily paused"}
          </p>
          <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
            BatcaveCN · Semper Vigilans
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {isZh ? <ChineseNote /> : <EnglishNote />}

        <footer className="mt-16 border-t border-fg/10 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4" />
              {isZh ? "返回 Semper Vigilans" : "Back to Semper Vigilans"}
            </Link>
            <Link
              to="/dossier"
              hash="log"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blood transition-colors hover:text-fg"
            >
              {isZh ? "查看制作日志" : "View Production Log"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

function ChineseNote() {
  return (
    <div className="space-y-6 text-pretty text-[15px] leading-8 text-muted sm:text-base sm:leading-8">
      <p>看到《新蝙蝠侠2》暂停制作的消息时，我很难说自己不失落。</p>

      <p>
        这几个月，我花了很多精力搜集资料，反复修改、打磨这个网站。我想要的其实很简单：当500天的倒计时终于结束，当我坐进电影院的时候，能够有一个完整的地方，让我回头看看这个系列从立项到第二部上映之间究竟发生了什么，也看看一部电影究竟是怎样一点点诞生的。
      </p>

      <p>所以，它突然停下来，当然很难受。</p>

      <p>但如果暂停的原因是 Matt Reeves 需要回到自己的家庭，那么我的态度也很简单：</p>

      <p className="my-10 border-y border-fg/15 py-7 text-center font-sans text-2xl font-black tracking-tight text-fg sm:text-3xl">
        家庭永远是第一位的。
      </p>

      <p>
        我看到有人说：“已经拖了这么久，干脆取消吧。”也有人说：“不如找个导演接手不就行了。”
      </p>

      <p>我不这么想。</p>

      <p>
        我等的从来不只是一部片名叫做《新蝙蝠侠2》的电影。我想看到的，是 Matt Reeves 继续讲完他的故事。
      </p>

      <p>
        《新蝙蝠侠》之所以成为我如此喜欢的一部蝙蝠侠电影，是因为我从中看到了导演非常明确的创作者意志，也看到了整个主创团队为这个角色倾注的热情和心血。
      </p>

      <p>
        这个系列里的哥谭、布鲁斯·韦恩，以及它看待蝙蝠侠的方式，共同构成了我心中最理想的那个蝙蝠侠世界。
      </p>

      <p className="py-3 text-center font-mono text-sm tracking-[0.2em] text-fg/75 sm:text-base">
        2025 → 2026 → 2027 → 2028
      </p>

      <p>三次延期，我们确实已经等了很久。</p>

      <p>但这一次，我愿意继续等。</p>

      <p>
        希望 Matt Reeves 和他的家人一切都好。等他准备好了，再回到哥谭。
      </p>

      <p>
        最后，我想，当初会选择 <strong className="font-semibold text-fg">Semper Vigilans</strong>{" "}
        作为这个专题站的名字，或许冥冥之中就已经代表了我的态度。
      </p>

      <div className="mt-14 border-t border-fg/15 pt-10 text-center">
        <p className="font-display text-lg font-bold tracking-[0.22em] text-fg uppercase">
          Semper Vigilans.
        </p>
        <p className="mt-3 font-sans text-lg font-black tracking-tight text-fg sm:text-xl">
          Always Watchful, not Always Impatient.
        </p>
      </div>
    </div>
  );
}

function EnglishNote() {
  return (
    <div className="space-y-6 text-pretty text-[15px] leading-8 text-muted sm:text-base sm:leading-8">
      <p>It is hard to pretend I was not disappointed when I saw that production on The Batman: Part II had paused.</p>

      <p>
        Over the past few months, I have spent a great deal of time gathering material, revising it, and refining this site. What I want is simple: when the 500-day countdown finally reaches zero and I am sitting in a theater, I want a complete record I can look back on—a record of everything that happened from the project&apos;s beginnings to the release of Part II, and of how a film slowly comes into being.
      </p>

      <p>So of course it hurts to see that process suddenly stop.</p>

      <p>But if Matt Reeves needs to step away from the production to be with his family, my position is simple:</p>

      <p className="my-10 border-y border-fg/15 py-7 text-center font-sans text-2xl font-black tracking-tight text-fg sm:text-3xl">
        Family always comes first.
      </p>

      <p>
        I have seen people say, “It has taken too long—just cancel it,” or, “Why not bring in another director to finish it?”
      </p>

      <p>I do not feel that way.</p>

      <p>
        I have never been waiting merely for a film that happens to be called The Batman: Part II. I want to see Matt Reeves finish the story he set out to tell.
      </p>

      <p>
        The Batman became one of my favorite interpretations of the character because I could feel a clear creative vision behind it, and the passion and care that the filmmakers poured into this world.
      </p>

      <p>
        Its Gotham, its Bruce Wayne, and its way of looking at Batman together form the version of this world that feels closest to perfect to me.
      </p>

      <p className="py-3 text-center font-mono text-sm tracking-[0.2em] text-fg/75 sm:text-base">
        2025 → 2026 → 2027 → 2028
      </p>

      <p>Three delays have already made this a long wait.</p>

      <p>But this time, I am willing to keep waiting.</p>

      <p>I hope Matt Reeves and his family are well. When he is ready, Gotham will still be here.</p>

      <p>
        Looking back, perhaps choosing <strong className="font-semibold text-fg">Semper Vigilans</strong> as the name of this archive already said something about how I feel.
      </p>

      <div className="mt-14 border-t border-fg/15 pt-10 text-center">
        <p className="font-display text-lg font-bold tracking-[0.22em] text-fg uppercase">
          Semper Vigilans.
        </p>
        <p className="mt-3 font-sans text-lg font-black tracking-tight text-fg sm:text-xl">
          Always Watchful, not Always Impatient.
        </p>
      </div>
    </div>
  );
}
