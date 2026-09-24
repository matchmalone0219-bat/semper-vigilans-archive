import { useEffect, useMemo, useRef, useState } from "react";
import {
  ABOUT,
  BETWEEN_TESTS,
  BOOT,
  COMMANDS,
  EMPTY_PROGRESS,
  INVITE,
  TESTS,
  TIMELINE_LOGS,
  WRONG,
  allPrizes,
  allSolvedProgress,
  clearProgress,
  findPrize,
  hintFor,
  isNo,
  isYes,
  loadProgress,
  nextBeat,
  normalizeAnswer,
  saveProgress,
  stillsFor,
  testComplete,
  type PrizeStill,
  type Progress,
  type Riddle,
  type RiddleOption,
  type Test,
} from "@/lib/rataalada";
import { cn } from "@/lib/cn";

type Line = { id: number; text: string; tone?: "in" | "dim" | "err" };

let lineId = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RiddlerTerminal({
  onUnlock,
  onReset,
  onSeized,
}: {
  onUnlock: (stills: PrizeStill[], file?: string) => void;
  onReset?: () => void;
  onSeized?: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(true);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [history, setHistory] = useState<string[]>([]);
  const [showCli, setShowCli] = useState(false);
  const histPos = useRef(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const queue = useRef(Promise.resolve());
  const skipRef = useRef(false);
  const progressRef = useRef<Progress>(EMPTY_PROGRESS);
  const onUnlockRef = useRef(onUnlock);
  const onSeizedRef = useRef(onSeized);
  onUnlockRef.current = onUnlock;
  onSeizedRef.current = onSeized;

  function commit(next: Progress, file?: string) {
    progressRef.current = next;
    setProgress(next);
    saveProgress(next);
    onUnlockRef.current(stillsFor(next), file);
  }

  useEffect(() => {
    const saved = loadProgress();
    progressRef.current = saved;
    setProgress(saved);
    onUnlockRef.current(stillsFor(saved));
    void boot(saved);
    // mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form.current?.scrollIntoView({ block: "end" });
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [lines, busy, progress.solved.length, progress.started, progress.lounge]);

  useEffect(() => {
    const currentBeat = nextBeat(progress);
    const hasChoices = currentBeat.kind === "riddle" || currentBeat.kind === "invite" || currentBeat.kind === "lounge";
    if (!busy && (showCli || !hasChoices)) {
      input.current?.focus();
    }
  }, [busy, showCli, progress]);

  useEffect(() => {
    const onGlobalKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const key = event.key.toUpperCase();
      const current = progressRef.current;
      const currentBeat = nextBeat(current);

      if (currentBeat.kind === "riddle" && currentBeat.riddle.options) {
        let selectedOpt: RiddleOption | undefined = undefined;
        if (key === "A" || key === "1") selectedOpt = currentBeat.riddle.options[0];
        else if (key === "B" || key === "2") selectedOpt = currentBeat.riddle.options[1];
        else if (key === "C" || key === "3") selectedOpt = currentBeat.riddle.options[2];
        else if (key === "D" || key === "4") selectedOpt = currentBeat.riddle.options[3];

        if (selectedOpt) {
          event.preventDefault();
          const label = `[${selectedOpt.key}] ${selectedOpt.labelEn}`;
          void onSubmit(selectedOpt.value, label);
          return;
        }
      } else if (currentBeat.kind === "invite" || currentBeat.kind === "lounge") {
        if (key === "Y" || key === "A" || key === "1") {
          event.preventDefault();
          void onSubmit("Y", "[Y] YES");
          return;
        }
        if (key === "N" || key === "B" || key === "2") {
          event.preventDefault();
          void onSubmit("N", "[N] NO");
          return;
        }
      }

      const hasChoices = currentBeat.kind === "riddle" || currentBeat.kind === "invite" || currentBeat.kind === "lounge";
      if (showCli || !hasChoices) {
        if (event.key.length === 1 || event.key === "Backspace" || event.key === "Enter") {
          input.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", onGlobalKeyDown);
    return () => window.removeEventListener("keydown", onGlobalKeyDown);
  }, [showCli]);

  function push(next: Line[]) {
    setLines((prev) => [...prev, ...next]);
  }

  function typeLines(
    batch: { text: string; tone?: Line["tone"]; instant?: boolean }[],
  ) {
    const run = async () => {
      setBusy(true);
      skipRef.current = false;
      const instant = prefersReducedMotion();
      for (const item of batch) {
        const id = ++lineId;
        if (instant || item.instant || item.text.length === 0 || skipRef.current) {
          push([{ id, text: item.text, tone: item.tone }]);
          if (!instant && !skipRef.current && item.text.length === 0) await wait(40);
          continue;
        }
        push([{ id, text: "", tone: item.tone }]);
        for (let i = 1; i <= item.text.length; i++) {
          if (skipRef.current) {
            setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text: item.text } : line)));
            break;
          }
          const slice = item.text.slice(0, i);
          setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text: slice } : line)));
          await wait(8);
        }
        if (!skipRef.current) await wait(30);
      }
      setBusy(false);
    };
    queue.current = queue.current.then(run, run);
    return queue.current;
  }

  async function boot(saved: Progress) {
    await typeLines([
      ...BOOT.map((text) => ({ text, tone: "dim" as const })),
      ...INVITE.map((text) => ({ text })),
    ]);
    if (saved.started) {
      await typeLines([{ text: "SESSION RESTORED.", tone: "dim" }]);
      await resume(saved);
    }
  }

  async function resume(current: Progress) {
    const beat = nextBeat(current);
    if (beat.kind === "riddle") await printRiddle(beat.test, beat.riddle, beat.index);
    else if (beat.kind === "lounge") await printLounge();
    else if (beat.kind === "loading") await runLoading(current);
    else if (beat.kind === "seizure") await runSeizure(current);
    else if (beat.kind === "done") {
      await typeLines([{ text: "ALL TESTS COMPLETE. TYPE LS OR ABOUT.", tone: "dim" }]);
    }
  }

  async function printRiddle(test: Test, riddle: Riddle, index: number) {
    const badge = test.originBadgeEn || "ARCHIVE";
    await typeLines([
      { text: "", tone: "dim" },
      {
        text: `${test.kicker} [${badge.toUpperCase()}]  —  RIDDLE ${index + 1} OF ${test.riddles.length}`,
        tone: "dim",
      },
      ...riddle.prompt.map((text) => ({ text })),
      { text: "?" },
    ]);
  }

  async function printLounge() {
    await typeLines([
      { text: "" },
      { text: "HAVE YOU EVER BEEN TO THE ICEBERG LOUNGE? (Y/N)" },
    ]);
  }

  async function runLoading(current: Progress) {
    const percents = [0, 8, 21, 37, 52, 68, 81, 94, 100];
    await typeLines([
      { text: "" },
      { text: "WAIT.", tone: "dim" },
      { text: "SOMETHING IS HAPPENING." },
    ]);
    for (const n of percents) {
      await typeLines([{ text: `LOADING... ${n}%`, instant: true }]);
      if (!prefersReducedMotion()) await wait(n === 100 ? 280 : 160);
    }
    await typeLines([
      { text: "100%. FILES DUMPED." },
      { text: "ORIGINAL ARCHIVE: WHAT_AM_I.ZIP" },
      { text: "PASSWORD WAS: PROMISE" },
      { text: "THOMAS WAYNE LIES." },
      { text: "TYPE CAT WHAT_AM_I.TXT" },
    ]);
    const next = { ...current, loading: true };
    commit(next);
    const beat = nextBeat(next);
    if (beat.kind === "riddle") await printRiddle(beat.test, beat.riddle, beat.index);
  }

  async function runSeizure(current: Progress) {
    await typeLines([
      { text: "" },
      { text: "CONNECTION INTERRUPTED.", tone: "err" },
      { text: "REMOTE HOST OVERRIDE DETECTED.", tone: "err" },
      { text: "RATAALADA.COM IS NO LONGER RESPONDING." },
      { text: "" },
      { text: "GOODBYE <?>", tone: "dim" },
    ]);

    const next = { ...current, seizure: true };
    commit(next);

    if (!prefersReducedMotion()) {
      await wait(1200);
    }
    // RESET may have happened while the takeover was waiting.
    if (progressRef.current.seizure) {
      onSeizedRef.current?.();
    }
  }

  async function onSubmit(raw: string, displayText?: string) {
    const command = raw.trim();
    if (!command) return;
    if (busy) {
      skipRef.current = true;
      await queue.current;
    }
    setValue("");
    histPos.current = -1;
    setHistory((prev) => [command, ...prev].slice(0, 40));
    const echo = displayText ? displayText.toUpperCase() : command.toUpperCase();
    push([{ id: ++lineId, text: `> ${echo}`, tone: "in" }]);
    await handle(command);
    if (showCli) {
      input.current?.focus();
    }
  }

  async function handle(raw: string) {
    const cmd = raw.trim();
    const upper = cmd.toUpperCase();
    const current = progressRef.current;
    const beat = nextBeat(current);

    if (upper === "HELP" || upper === "?") {
      await typeLines([
        { text: "COMMANDS", tone: "dim" },
        ...COMMANDS.map((item) => ({ text: `${item.cmd.padEnd(14)} ${item.hint.toUpperCase()}` })),
        { text: "OR TYPE THE ANSWER TO THE CURRENT RIDDLE." },
        { text: "ANSWERS WORK IN ENGLISH." },
      ]);
      return;
    }
    if (upper === "ABOUT") {
      await typeLines(ABOUT.map((text) => ({ text, tone: "dim" as const })));
      return;
    }
    if (upper === "TIMELINE" || upper === "HISTORY") {
      await typeLines(TIMELINE_LOGS.map((text) => ({ text, tone: "dim" as const })));
      return;
    }
    if (upper === "CLEAR" || upper === "CLS") {
      setLines([]);
      return;
    }
    if (upper === "RIDDLE") {
      if (beat.kind !== "riddle") {
        await typeLines([{ text: "NO RIDDLE PENDING." }]);
        return;
      }
      await printRiddle(beat.test, beat.riddle, beat.index);
      return;
    }
    if (upper === "HINT") {
      if (beat.kind !== "riddle") {
        await typeLines([{ text: "NO RIDDLE PENDING." }]);
        return;
      }
      await typeLines([{ text: hintFor(beat.riddle.id) }]);
      return;
    }
    if (upper === "LS" || upper === "DIR") {
      const files = allPrizes(current);
      if (files.length === 0) {
        await typeLines([{ text: "NO FILES.", tone: "dim" }]);
        return;
      }
      await typeLines(files.map((file) => ({ text: file.file, tone: "dim" as const })));
      return;
    }
    if (upper.startsWith("OPEN ") || upper.startsWith("CAT ")) {
      const name = upper.slice(upper.indexOf(" ") + 1).trim();
      const file = findPrize(current, name);
      if (!file) {
        await typeLines([{ text: "FILE NOT FOUND.", tone: "err" }]);
        return;
      }
      if (file.kind === "text") {
        await typeLines([
          { text: `CAT ${file.file}`, tone: "dim" },
          ...file.body.map((text) => ({ text })),
        ]);
        return;
      }
      onUnlockRef.current(stillsFor(current), file.file);
      await typeLines([{ text: `OPEN ${file.file}` }]);
      return;
    }
    if (upper === "SPOILER") {
      const all = allSolvedProgress();
      commit(all);
      await typeLines([
        { text: "ARCHIVE OVERRIDE ACCEPTED.", tone: "err" },
        { text: "HE WOULD CALL YOU A CHEAT." },
        ...TESTS.flatMap((test) =>
          test.riddles.map((riddle) => ({
            text: `${test.kicker} ${riddle.id.toUpperCase()} = ${riddle.ok}`,
            tone: "dim" as const,
            instant: true,
          })),
        ),
        { text: "ALL FILES UNLOCKED." },
      ]);
      if (!prefersReducedMotion()) {
        await wait(1200);
      }
      if (progressRef.current.seizure) {
        onSeizedRef.current?.();
      }
      return;
    }
    if (upper === "RESET") {
      clearProgress();
      const empty = { ...EMPTY_PROGRESS };
      progressRef.current = empty;
      setProgress(empty);
      onUnlockRef.current([]);
      onReset?.();
      setLines([]);
      await boot(empty);
      return;
    }
    if (upper === "WHOAMI") {
      await typeLines([{ text: "EL RATA ALADA." }]);
      return;
    }
    if (upper === "EXIT" || upper === "QUIT") {
      await typeLines([{ text: "THE DOOR IS AT THE TOP OF THE SCREEN." }]);
      return;
    }
    if (upper === "SEMPER VIGILANS" || upper === "STAY VIGILANT") {
      await typeLines([{ text: "ALWAYS." }]);
      return;
    }

    if (beat.kind === "invite") {
      if (isYes(cmd)) {
        const next = { ...current, started: true };
        commit(next);
        await typeLines([{ text: "GOOD." }, { text: "LET'S SEE WHAT YOU KNOW." }]);
        const following = nextBeat(next);
        if (following.kind === "riddle") {
          await printRiddle(following.test, following.riddle, following.index);
        }
        return;
      }
      if (isNo(cmd)) {
        await typeLines([
          { text: "THEN WHY ARE YOU HERE?" },
          { text: "ARE YOU READY TO PLAY? (Y/N)" },
        ]);
        return;
      }
      await typeLines([{ text: "TYPE Y OR N." }]);
      return;
    }

    if (beat.kind === "lounge") {
      const next = { ...current, lounge: true };
      commit(next);
      await typeLines([
        { text: "IT'S MORE OF A ZOO." },
        { text: "YOU'D BE WISE TO STAY AWAY." },
        { text: "HERE. A LITTLE SOMETHING FOR YOUR TROUBLE." },
        { text: "TYPE OPEN LOUNGE.IMG" },
        ...BETWEEN_TESTS.map((text) => ({ text, tone: "dim" as const })),
      ]);
      const following = nextBeat(next);
      if (following.kind === "riddle") {
        await printRiddle(following.test, following.riddle, following.index);
      }
      return;
    }

    if (beat.kind === "loading") {
      await runLoading(current);
      return;
    }

    if (beat.kind === "seizure") {
      await runSeizure(current);
      return;
    }

    if (beat.kind === "done") {
      await typeLines([{ text: "ALL TESTS COMPLETE. TYPE LS OR ABOUT." }]);
      return;
    }

    const guess = normalizeAnswer(cmd);
    if (beat.riddle.answers.includes(guess)) {
      const nextSolved = [...current.solved, beat.riddle.id];
      const next: Progress = { ...current, solved: nextSolved };
      commit(next);
      const done = testComplete(beat.test, nextSolved);
      const out = [{ text: `CORRECT. ${beat.riddle.ok}` }];
      if (done) {
        out.push(...beat.test.prize.map((text) => ({ text })));
      }
      await typeLines(out);

      const following = nextBeat(next);
      if (following.kind === "lounge") {
        await printLounge();
        return;
      }
      if (following.kind === "loading") {
        await runLoading(next);
        return;
      }
      if (following.kind === "seizure") {
        await runSeizure(next);
        return;
      }
      if (following.kind === "riddle") {
        if (done && following.test.id !== beat.test.id) {
          await typeLines(BETWEEN_TESTS.map((text) => ({ text, tone: "dim" as const })));
        }
        await printRiddle(following.test, following.riddle, following.index);
        return;
      }
      await typeLines([{ text: "NO FURTHER TESTS ON THIS MIRROR." }]);
      return;
    }

    await typeLines([{ text: WRONG[Math.floor(Math.random() * WRONG.length)], tone: "err" }]);
  }

  const seized = progress.seizure;
  const beat = nextBeat(progress);
  const hasChoices = beat.kind === "riddle" || beat.kind === "invite" || beat.kind === "lounge";

  const quickActions = useMemo(() => {
    const list: { cmd: string; label: string }[] = [];
    if (beat.kind === "invite") {
      list.push(
        { cmd: "HELP", label: "? HELP" },
        { cmd: "TIMELINE", label: "⏱ TIMELINE" },
        { cmd: "SPOILER", label: "⚡ SPOILER (UNLOCK ALL)" },
      );
    } else if (beat.kind === "riddle") {
      list.push(
        { cmd: "HINT", label: "💡 HINT (GET CLUE)" },
        { cmd: "RIDDLE", label: "📜 RIDDLE (RE-READ)" },
        { cmd: "LS", label: "📁 LS (FILES)" },
        { cmd: "TIMELINE", label: "⏱ TIMELINE" },
        { cmd: "SPOILER", label: "⚡ SPOILER (SKIP)" },
      );
    } else if (beat.kind === "lounge") {
      list.push(
        { cmd: "TIMELINE", label: "⏱ TIMELINE" },
        { cmd: "CLEAR", label: "CLEAR" },
      );
    } else {
      list.push(
        { cmd: "LS", label: "📁 LS (FILES)" },
        { cmd: "ABOUT", label: "ℹ ABOUT" },
        { cmd: "TIMELINE", label: "⏱ TIMELINE" },
        { cmd: "RESET", label: "🔄 RESET" },
      );
    }
    list.push({ cmd: "CLEAR", label: "CLEAR" });
    return list;
  }, [beat.kind]);

  return (
    <div
      className={cn(
        "crt-shell relative flex min-h-[32rem] flex-1 flex-col sm:min-h-[40rem]",
        seized && "crt-seized",
      )}
      onClick={() => {
        if (showCli || !hasChoices) {
          input.current?.focus();
        }
      }}
    >
      <div className="crt-watermark" aria-hidden="true">
        ?
      </div>
      <div className="crt-noise" aria-hidden="true" />
      <div
        ref={box}
        className="relative z-10 min-h-0 flex-1 overflow-y-auto px-3 py-4 text-sm leading-relaxed tracking-wide sm:px-5 sm:text-base"
        aria-live="polite"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={cn(
              "whitespace-pre-wrap break-words",
              line.tone === "in" && "text-phosphor/70",
              line.tone === "dim" && "text-phosphor/65",
              line.tone === "err" && "text-phosphor",
            )}
          >
            {line.text.length ? line.text : " "}
          </p>
        ))}

        {/* Riddle multiple-choice options */}
        {beat.kind === "riddle" && beat.riddle.options && (
          <div className="mt-4 border-t border-phosphor/25 pt-3 select-none">
            <div className="mb-2.5 flex items-center justify-between font-mono text-xs text-phosphor/75">
              <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase">
                <span className="inline-block h-2 w-2 animate-pulse bg-phosphor" />
                SELECT AN ANSWER [OR PRESS A / B / C / D]:
              </span>
              <span className="text-[11px] text-phosphor/50">
                CLICK TO SUBMIT
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {beat.riddle.options.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  disabled={busy}
                  onClick={() => void onSubmit(opt.value, `[${opt.key}] ${opt.labelEn}`)}
                  className={cn(
                    "group relative flex min-h-[3rem] cursor-pointer items-center gap-3 border border-phosphor/40 bg-phosphor/5 p-2.5 text-left font-mono transition-all duration-150",
                    "hover:border-phosphor hover:bg-phosphor/20 hover:shadow-[0_0_12px_rgba(51,255,51,0.25)]",
                    "active:scale-[0.99] active:bg-phosphor/35",
                    busy && "cursor-not-allowed opacity-60",
                  )}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-phosphor/60 bg-phosphor/20 text-xs font-bold text-phosphor shadow-[0_0_6px_rgba(51,255,51,0.2)] transition-colors group-hover:border-phosphor group-hover:bg-phosphor group-hover:text-black">
                    {opt.key}
                  </span>
                  <span className="truncate font-mono text-sm font-bold tracking-wider text-phosphor uppercase">
                    {opt.labelEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Start challenge Y / N cards */}
        {beat.kind === "invite" && (
          <div className="mt-4 border-t border-phosphor/25 pt-3 select-none">
            <div className="mb-2.5 flex items-center justify-between font-mono text-xs text-phosphor/75">
              <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase">
                <span className="inline-block h-2 w-2 animate-pulse bg-phosphor" />
                START CHALLENGE [SELECT OR PRESS Y / N]:
              </span>
              <span className="text-[11px] text-phosphor/50">
                INTERACTIVE TERMINAL
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => void onSubmit("Y", "[Y] YES — READY TO PLAY")}
                className={cn(
                  "group relative flex min-h-[3.25rem] cursor-pointer items-center gap-3 border border-phosphor/40 bg-phosphor/5 p-2.5 text-left font-mono transition-all duration-150",
                  "hover:border-phosphor hover:bg-phosphor/20 hover:shadow-[0_0_12px_rgba(51,255,51,0.25)]",
                  "active:scale-[0.99] active:bg-phosphor/35",
                  busy && "cursor-not-allowed opacity-60",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-phosphor/60 bg-phosphor/20 text-xs font-bold text-phosphor shadow-[0_0_6px_rgba(51,255,51,0.2)] transition-colors group-hover:border-phosphor group-hover:bg-phosphor group-hover:text-black">
                  Y
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold tracking-wide text-phosphor">
                    YES — READY TO PLAY
                  </span>
                  <span className="truncate text-xs tracking-wider text-phosphor/55">
                    Start Riddler trial
                  </span>
                </div>
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => void onSubmit("N", "[N] NO — NOT YET")}
                className={cn(
                  "group relative flex min-h-[3.25rem] cursor-pointer items-center gap-3 border border-phosphor/40 bg-phosphor/5 p-2.5 text-left font-mono transition-all duration-150",
                  "hover:border-phosphor hover:bg-phosphor/20 hover:shadow-[0_0_12px_rgba(51,255,51,0.25)]",
                  "active:scale-[0.99] active:bg-phosphor/35",
                  busy && "cursor-not-allowed opacity-60",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-phosphor/60 bg-phosphor/20 text-xs font-bold text-phosphor shadow-[0_0_6px_rgba(51,255,51,0.2)] transition-colors group-hover:border-phosphor group-hover:bg-phosphor group-hover:text-black">
                  N
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold tracking-wide text-phosphor">
                    NO — NOT YET
                  </span>
                  <span className="truncate text-xs tracking-wider text-phosphor/55">
                    Decline prompt
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Iceberg Lounge Y / N cards */}
        {beat.kind === "lounge" && (
          <div className="mt-4 border-t border-phosphor/25 pt-3 select-none">
            <div className="mb-2.5 flex items-center justify-between font-mono text-xs text-phosphor/75">
              <span className="flex items-center gap-1.5 font-bold tracking-wider uppercase">
                <span className="inline-block h-2 w-2 animate-pulse bg-phosphor" />
                ICEBERG INQUIRY [SELECT OR PRESS Y / N]:
              </span>
              <span className="text-[11px] text-phosphor/50">
                SPECIAL EVIDENCE
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                disabled={busy}
                onClick={() => void onSubmit("Y", "[Y] YES — I HAVE BEEN THERE")}
                className={cn(
                  "group relative flex min-h-[3.25rem] cursor-pointer items-center gap-3 border border-phosphor/40 bg-phosphor/5 p-2.5 text-left font-mono transition-all duration-150",
                  "hover:border-phosphor hover:bg-phosphor/20 hover:shadow-[0_0_12px_rgba(51,255,51,0.25)]",
                  "active:scale-[0.99] active:bg-phosphor/35",
                  busy && "cursor-not-allowed opacity-60",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-phosphor/60 bg-phosphor/20 text-xs font-bold text-phosphor shadow-[0_0_6px_rgba(51,255,51,0.2)] transition-colors group-hover:border-phosphor group-hover:bg-phosphor group-hover:text-black">
                  Y
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold tracking-wide text-phosphor">
                    YES — I HAVE BEEN THERE
                  </span>
                  <span className="truncate text-xs tracking-wider text-phosphor/55">
                    Unlock lounge.img
                  </span>
                </div>
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={() => void onSubmit("N", "[N] NO — NEVER")}
                className={cn(
                  "group relative flex min-h-[3.25rem] cursor-pointer items-center gap-3 border border-phosphor/40 bg-phosphor/5 p-2.5 text-left font-mono transition-all duration-150",
                  "hover:border-phosphor hover:bg-phosphor/20 hover:shadow-[0_0_12px_rgba(51,255,51,0.25)]",
                  "active:scale-[0.99] active:bg-phosphor/35",
                  busy && "cursor-not-allowed opacity-60",
                )}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-phosphor/60 bg-phosphor/20 text-xs font-bold text-phosphor shadow-[0_0_6px_rgba(51,255,51,0.2)] transition-colors group-hover:border-phosphor group-hover:bg-phosphor group-hover:text-black">
                  N
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold tracking-wide text-phosphor">
                    NO — NEVER
                  </span>
                  <span className="truncate text-xs tracking-wider text-phosphor/55">
                    Proceed with caution
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* CLI command input */}
        {(showCli || !hasChoices) && (
          <form
            ref={form}
            className="mt-3 flex min-h-11 items-center gap-2 border-b border-phosphor/20 pb-2 font-mono text-sm sm:text-base"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit(value);
            }}
          >
            <span className="shrink-0 font-mono font-bold text-phosphor/80 select-none">{">"}</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={input}
                value={value}
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal command"
                placeholder={
                  busy
                    ? "SIGNAL TRANSMITTING..."
                    : "ENTER COMMAND (E.G. HELP, LS, CAT, SPOILER)..."
                }
                className="w-full bg-transparent font-mono text-sm uppercase text-phosphor outline-none placeholder:text-phosphor/35 placeholder:normal-case sm:text-base"
                style={{ caretColor: "var(--color-phosphor, #33ff33)" }}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    const next = history[histPos.current + 1];
                    if (next !== undefined) {
                      histPos.current += 1;
                      setValue(next);
                    }
                  }
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    if (histPos.current <= 0) {
                      histPos.current = -1;
                      setValue("");
                    } else {
                      histPos.current -= 1;
                      setValue(history[histPos.current] ?? "");
                    }
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!value.trim()}
              className={cn(
                "shrink-0 border border-phosphor/40 px-2.5 py-1 font-mono text-xs tracking-wider uppercase transition-all",
                value.trim()
                  ? "cursor-pointer bg-phosphor/15 opacity-100 hover:bg-phosphor/30 active:bg-phosphor/40"
                  : "pointer-events-none opacity-0",
              )}
            >
              SEND ↵
            </button>
          </form>
        )}

        {/* Quick action bar */}
        <div className="mt-3 flex flex-wrap items-center gap-2 pt-1 select-none">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-phosphor/50">
            ACTIONS:
          </span>
          {quickActions.map((action) => (
            <button
              key={action.cmd}
              type="button"
              onClick={() => void onSubmit(action.cmd)}
              className="cursor-pointer border border-phosphor/30 bg-phosphor/5 px-2.5 py-1 font-mono text-xs tracking-wider text-phosphor uppercase transition-colors hover:bg-phosphor/20 active:bg-phosphor/35"
            >
              {action.label}
            </button>
          ))}
          {hasChoices && (
            <button
              type="button"
              onClick={() => {
                setShowCli((v) => !v);
                if (!showCli) {
                  setTimeout(() => input.current?.focus(), 50);
                }
              }}
              className="cursor-pointer border border-phosphor/25 bg-phosphor/5 px-2.5 py-1 font-mono text-xs tracking-wider text-phosphor/60 uppercase transition-colors hover:border-phosphor/50 hover:bg-phosphor/15 hover:text-phosphor"
            >
              {showCli ? "[-] HIDE CLI" : "[>] CLI MODE"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
