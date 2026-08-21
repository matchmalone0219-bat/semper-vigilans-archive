import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  COMMANDS,
  DECODED_MESSAGES,
  RATA_INTRO,
  RIDDLER_CIPHER_ALPHABET,
  TESTS,
  type PrizeStill,
} from "@/lib/rataalada";
import { pageTitle } from "@/lib/film";
import { RiddlerTerminal } from "@/components/riddler-terminal";
import { Lightbox } from "@/components/lightbox";

export const Route = createFileRoute("/rataalada")({
  head: () => ({
    meta: [
      { title: pageTitle("谜语人终端与密码本") },
      { name: "theme-color", "#030903" },
    ],
  }),
  component: Rataalada,
});

function Rataalada() {
  const [stills, setStills] = useState<PrizeStill[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"files" | "cipher">("files");

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
          <span className="ml-2 text-phosphor/55">终端与密码本</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="min-h-11 px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
            onClick={() => {
              setActiveTab("files");
              setPanelOpen((v) => !v || activeTab !== "files");
            }}
          >
            文件 ({stills.length})
          </button>
          <button
            type="button"
            className="min-h-11 px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
            onClick={() => {
              setActiveTab("cipher");
              setPanelOpen((v) => !v || activeTab !== "cipher");
            }}
          >
            密码本 [A-Z]
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
              setActiveTab("files");
              setPanelOpen(true);
            }
          }}
          onReset={() => {
            setStills([]);
            setOpen(null);
            setPanelOpen(false);
          }}
        />

        {panelOpen ? (
          <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-md flex-col border-l border-phosphor/25 bg-crt/95 font-mono text-phosphor backdrop-blur-sm sm:w-[26rem]">
            <div className="flex items-center justify-between gap-2 border-b border-phosphor/20 px-3 py-2">
              <div className="flex gap-3 text-xs tracking-[0.18em] uppercase">
                <button
                  type="button"
                  onClick={() => setActiveTab("files")}
                  className={activeTab === "files" ? "font-bold underline" : "text-phosphor/50 hover:text-phosphor"}
                >
                  已解锁文件 ({stills.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("cipher")}
                  className={activeTab === "cipher" ? "font-bold underline" : "text-phosphor/50 hover:text-phosphor"}
                >
                  几何密码本
                </button>
              </div>
              <button
                type="button"
                className="min-h-11 px-3 text-xs tracking-[0.18em] uppercase hover:bg-phosphor/10"
                onClick={() => setPanelOpen(false)}
              >
                关闭
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {activeTab === "files" ? (
                stills.length === 0 ? (
                  <p className="text-sm leading-relaxed text-phosphor/70">
                    暂无解锁文件。在终端输入 Y 开始，答完一组谜题即可解锁。
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
                )
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold tracking-wider text-phosphor uppercase">
                      26 字母几何密码代换表 (Cipher Key)
                    </h3>
                    <p className="mt-1 text-xs text-phosphor/70 leading-relaxed">
                      谜语人用于手写信件与现场题字的定制几何符号代换体系：
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      {RIDDLER_CIPHER_ALPHABET.map((item) => (
                        <div
                          key={item.letter}
                          className="flex items-center justify-between border border-phosphor/20 bg-phosphor/5 px-2.5 py-1.5"
                        >
                          <span className="font-bold text-phosphor">{item.letter}</span>
                          <span className="text-base text-phosphor">{item.symbol}</span>
                          <span className="text-[10px] text-phosphor/60">{item.shapeName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-phosphor/20 pt-4">
                    <h3 className="text-sm font-bold tracking-wider text-phosphor uppercase">
                      全片核心密电逐字破译对照
                    </h3>
                    <div className="mt-3 space-y-4">
                      {DECODED_MESSAGES.map((msg) => (
                        <div key={msg.id} className="border border-phosphor/20 bg-phosphor/5 p-3 text-xs">
                          <p className="font-bold text-phosphor">{msg.source}</p>
                          <p className="text-[10px] text-phosphor/60">{msg.sourceEn}</p>
                          <p className="mt-2 text-phosphor/80 font-mono">原文解密：{msg.decodedEn}</p>
                          <p className="mt-1 text-phosphor/90">{msg.decodedZh}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-phosphor/20 pt-4 text-xs leading-relaxed text-phosphor/55">
                <p>{RATA_INTRO}</p>
                <p className="mt-2">
                  {TESTS.length} 组公开谜题。终端指令：{COMMANDS.map((item) => item.cmd).join(" · ")}。
                </p>
              </div>
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
