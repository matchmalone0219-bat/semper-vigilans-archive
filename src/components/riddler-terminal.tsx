import { useEffect, useRef, useState } from "react";
import {
  ABOUT,
  BETWEEN_TESTS,
  BOOT,
  COMMANDS,
  EMPTY_PROGRESS,
  INVITE,
  TESTS,
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
}: {
  onUnlock: (stills: PrizeStill[], file?: string) => void;
  onReset?: () => void;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(true);
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [history, setHistory] = useState<string[]>([]);
  const histPos = useRef(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const queue = useRef(Promise.resolve());
  const progressRef = useRef<Progress>(EMPTY_PROGRESS);
  const onUnlockRef = useRef(onUnlock);
  onUnlockRef.current = onUnlock;

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
    box.current?.scrollTo({ top: box.current.scrollHeight });
  }, [lines, busy]);

  function push(next: Line[]) {
    setLines((prev) => [...prev, ...next]);
  }

  function typeLines(
    batch: { text: string; tone?: Line["tone"]; instant?: boolean }[],
  ) {
    const run = async () => {
      setBusy(true);
      const instant = prefersReducedMotion();
      for (const item of batch) {
        const id = ++lineId;
        if (instant || item.instant || item.text.length === 0) {
          push([{ id, text: item.text, tone: item.tone }]);
          if (!instant && item.text.length === 0) await wait(40);
          continue;
        }
        push([{ id, text: "", tone: item.tone }]);
        for (let i = 1; i <= item.text.length; i++) {
          const slice = item.text.slice(0, i);
          setLines((prev) => prev.map((line) => (line.id === id ? { ...line, text: slice } : line)));
          await wait(10);
        }
        await wait(50);
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
    await typeLines([
      { text: "", tone: "dim" },
      { text: `${test.kicker}  —  RIDDLE ${index + 1} OF ${test.riddles.length}`, tone: "dim" },
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
      { text: "*** GCPD CYBERCRIME DIVISION ***", tone: "err" },
      { text: "THIS DOMAIN HAS BEEN SEIZED.", tone: "err" },
      { text: "RATAALADA.COM — 29 MARCH 2022" },
      { text: "YOUAREELRATAALADA.COM ALSO OFFLINE." },
      { text: "" },
      { text: "GOODBYE <?>" },
      { text: "" },
      { text: "NO FURTHER TESTS ON THIS MIRROR.", tone: "dim" },
      { text: "TYPE LS TO REVIEW FILES. TYPE ABOUT FOR THE ARCHIVE NOTE." },
    ]);
    commit({ ...current, seizure: true });
  }

  async function onSubmit(raw: string) {
    const command = raw.trim();
    if (!command || busy) return;
    setValue("");
    histPos.current = -1;
    setHistory((prev) => [command, ...prev].slice(0, 40));
    push([{ id: ++lineId, text: `> ${command.toUpperCase()}`, tone: "in" }]);
    await handle(command);
  }

  async function handle(raw: string) {
    const cmd = raw.trim();
    const upper = cmd.toUpperCase();
    const current = progressRef.current;
    const beat = nextBeat(current);

    if (upper === "HELP" || upper === "?") {
      await typeLines([
        { text: "COMMANDS", tone: "dim" },
        ...COMMANDS.map((item) => ({ text: `${item.cmd.padEnd(14)} ${item.hint}` })),
        { text: "OR TYPE THE ANSWER TO THE CURRENT RIDDLE." },
        { text: "ANSWERS WORK IN ENGLISH OR 中文." },
      ]);
      return;
    }
    if (upper === "ABOUT") {
      await typeLines(ABOUT.map((text) => ({ text, tone: "dim" as const })));
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

  return (
    <div
      className={cn(
        "crt-shell relative flex min-h-[32rem] flex-1 flex-col sm:min-h-[40rem]",
        seized && "crt-seized",
      )}
      onClick={() => input.current?.focus()}
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
        <form
          ref={form}
          className="mt-2 flex min-h-11 items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit(value);
          }}
        >
          <span className="shrink-0 text-phosphor/80">{">"}</span>
          <input
            ref={input}
            value={value}
            disabled={busy}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="终端指令"
            className="min-w-0 flex-1 bg-transparent caret-transparent text-phosphor uppercase outline-none placeholder:text-phosphor/35"
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
          {!busy ? <span className="crt-cursor" aria-hidden="true" /> : null}
        </form>
      </div>
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
