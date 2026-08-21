import { useEffect, useState } from "react";
import { FILM } from "@/lib/film";
import { cn } from "@/lib/cn";

type Remain = { days: number; hours: number; minutes: number; seconds: number };

const RELEASE = new Date(FILM.releaseIso).getTime();

function compute(): Remain {
  const diff = Math.max(0, RELEASE - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

const UNITS: { key: keyof Remain; label: string }[] = [
  { key: "days", label: "天" },
  { key: "hours", label: "时" },
  { key: "minutes", label: "分" },
  { key: "seconds", label: "秒" },
];

export function Countdown({ className }: { className?: string }) {
  const [remain, setRemain] = useState<Remain | null>(null);

  useEffect(() => {
    setRemain(compute());
    const id = window.setInterval(() => setRemain(compute()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const value = remain ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-2 sm:gap-3",
        className,
      )}
      aria-label="距上映倒计时"
    >
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex min-w-0 flex-col items-center border border-fg/15 bg-bg/55 px-2 py-3 sm:px-3 sm:py-4"
        >
          <span className="font-display text-2xl font-extrabold tabular-nums leading-none text-fg sm:text-4xl">
            {String(value[unit.key]).padStart(2, "0")}
          </span>
          <span className="mt-2 text-[10px] tracking-[0.28em] text-muted uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
