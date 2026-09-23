import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

interface LanguageToggleProps {
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageToggle({ variant = "compact", className }: LanguageToggleProps) {
  const { locale, setLocale, toggleLocale, t } = useI18n();

  if (variant === "full") {
    return (
      <div className={cn("flex items-center justify-between border border-fg/10 bg-surface/50 p-2", className)}>
        <span className="flex items-center gap-1.5 font-display text-xs font-semibold tracking-[0.2em] text-faint uppercase">
          <Languages className="size-3.5 text-blood" />
          {t.nav.language}
        </span>
        <div className="flex items-center border border-fg/15 bg-bg p-0.5">
          <button
            type="button"
            onClick={() => setLocale("zh")}
            className={cn(
              "px-3 py-1 font-mono text-xs font-bold transition-colors select-none",
              locale === "zh"
                ? "bg-blood text-fg shadow-[0_0_10px_-2px_var(--color-blood)]"
                : "text-muted hover:text-fg"
            )}
            aria-pressed={locale === "zh"}
          >
            中文
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={cn(
              "px-3 py-1 font-mono text-xs font-bold transition-colors select-none",
              locale === "en"
                ? "bg-blood text-fg shadow-[0_0_10px_-2px_var(--color-blood)]"
                : "text-muted hover:text-fg"
            )}
            aria-pressed={locale === "en"}
          >
            EN
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "group relative inline-flex h-9 items-center gap-1.5 border border-fg/15 bg-surface/70 px-2.5 py-1 text-xs font-mono font-semibold tracking-wider transition-colors hover:border-fg/40 hover:bg-elevated focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blood select-none",
        className
      )}
      title={locale === "zh" ? "Switch to English" : "切换为中文"}
      aria-label={locale === "zh" ? "Switch to English" : "切换为中文"}
    >
      <Languages className="size-3.5 text-blood/80 transition-colors group-hover:text-blood" />
      <span className={cn(locale === "zh" ? "font-bold text-fg" : "text-muted/60")}>中</span>
      <span className="text-fg/20">/</span>
      <span className={cn(locale === "en" ? "font-bold text-blood" : "text-muted/60")}>EN</span>
    </button>
  );
}
