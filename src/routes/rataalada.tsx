import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { COMMANDS, RATA_INTRO, TESTS, type PrizeStill } from "@/lib/rataalada";
import { pageTitle } from "@/lib/film";
import { RiddlerTerminal } from "@/components/riddler-terminal";
import { Lightbox } from "@/components/lightbox";

export const Route = createFileRoute("/rataalada")({
  head: () => ({
    meta: [
      { title: pageTitle("谜语人终端") },
      { name: "theme-color", content: "#030903" },
    ],
  }),
  component: Rataalada,
});

function Rataalada() {
  const [stills, setStills] = useState<PrizeStill[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [filesOpen, setFilesOpen] = useState(false);
  const lightboxItems = stills.map((still) => ({
    src: still.src,
    title: still.title,
    caption: still.caption,
    source: still.file,
  }));
  const openIndex = stills.findIndex((still) => still.file === open);

  return (
    <main className="crt-page flex h-dvh flex-col">
      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-phosphor/20 px-3 py-2 font-mono text-phosphor sm:px-4">
        <p className="min-w-0 truncate text-xs tracking-[0.18em] uppercase sm:text-sm">
          Rataalada.com
          <span className="ml-2 text-phosphor/55">非官方复刻</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="min-h-11 px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
            onClick={() => setFilesOpen((v) => !v)}
          >
            文件 {stills.length}
          </button>
          <Link
            to="/"
            className="grid min-h-11 place-items-center px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
          >
            退出
          </Link>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <RiddlerTerminal
          onUnlock={(next, file) => {
            setStills(next);
            if (file) {
              setOpen(file);
              setFilesOpen(true);
            }
          }}
          onReset={() => {
            setStills([]);
            setOpen(null);
            setFilesOpen(false);
          }}
        />

        {filesOpen ? (
          <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l border-phosphor/25 bg-crt/95 font-mono text-phosphor backdrop-blur-sm sm:w-[22rem]">
            <div className="flex items-center justify-between gap-2 border-b border-phosphor/20 px-3 py-2">
              <p className="text-xs tracking-[0.18em] uppercase">Unlocked</p>
              <button
                type="button"
                className="min-h-11 px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
                onClick={() => setFilesOpen(false)}
              >
                关闭
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {stills.length === 0 ? (
                <p className="text-sm leading-relaxed text-phosphor/70">
                  还没有文件。输入 Y 开始，答完一组三条即可解锁。
                </p>
              ) : (
                <ul className="grid gap-4">
                  {stills.map((still) => (
                    <li key={still.file}>
                      <button
                        type="button"
                        onClick={() => setOpen(still.file)}
                        className="block w-full text-left"
                        aria-label={`查看 ${still.title}`}
                      >
                        <img
                          src={still.src}
                          alt=""
                          className="aspect-[16/9] w-full object-cover outline outline-phosphor/25"
                        />
                        <p className="mt-2 text-xs tracking-wide text-phosphor/65">{still.file}</p>
                        <p className="text-sm font-medium tracking-wide">{still.title}</p>
                        <p className="mt-1 text-pretty text-xs leading-relaxed text-phosphor/70">
                          {still.caption}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-6 text-xs leading-relaxed text-phosphor/55">
                {RATA_INTRO}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-phosphor/55">
                {TESTS.length} 组公开谜语。指令：{COMMANDS.map((item) => item.cmd).join(" · ")}。
                进度存在这台浏览器里。
              </p>
              <p className="mt-3 text-xs leading-relaxed text-phosphor/55">
                爱德华·纳什顿的档案在{" "}
                <Link
                  to="/people/$id"
                  params={{ id: "edward" }}
                  className="underline underline-offset-4 hover:text-phosphor"
                >
                  人物名册
                </Link>
                。
              </p>
            </div>
          </aside>
        ) : null}
      </div>

      {open && openIndex >= 0 ? (
        <Lightbox
          items={lightboxItems}
          index={openIndex}
          onClose={() => setOpen(null)}
          onIndex={(next) => setOpen(stills[next]?.file ?? null)}
        />
      ) : null}

      <span className="sr-only">绿色荧光终端。输入 Y 开始谜语。</span>
    </main>
  );
}
