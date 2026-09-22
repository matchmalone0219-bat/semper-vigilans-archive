import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-none font-mono text-[10px] uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "border border-fg/20 bg-surface px-2 py-0.5 text-fg/90",
        outline:
          "border border-fg/15 bg-transparent px-2 py-0.5 text-muted hover:border-fg/30 hover:text-fg",
        blood:
          "border border-blood/60 bg-blood/15 px-2 py-0.5 font-bold text-fg shadow-[0_0_12px_-3px_color-mix(in_oklab,var(--color-blood)_40%,transparent)]",
        official:
          "border border-emerald-500/40 bg-emerald-950/30 px-2 py-0.5 text-emerald-300",
        press:
          "border border-sky-400/40 bg-sky-950/30 px-2 py-0.5 text-sky-300",
        set:
          "border border-amber-400/40 bg-amber-950/30 px-2 py-0.5 text-amber-300",
        archive:
          "border border-violet-400/40 bg-violet-950/30 px-2 py-0.5 text-violet-300",
        confirmed:
          "border border-blood/60 bg-blood/15 px-2 py-0.5 font-bold text-fg",
        hint:
          "border border-fg/20 bg-surface/60 px-2 py-0.5 text-muted",
        rumor:
          "border border-dashed border-fg/20 bg-surface/30 px-2 py-0.5 text-faint",
        debunked:
          "border border-blood/40 bg-blood/10 px-2 py-0.5 text-blood line-through decoration-blood/60",
        classified:
          "classified-stamp text-[10px] py-0.5 px-2 font-display",
      },
      size: {
        sm: "text-[9px] px-1.5 py-0.2",
        md: "text-[10px] px-2 py-0.5",
        lg: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dotColor?: string;
  };

export function Badge({ className, variant, size, dotColor, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dotColor ? (
        <span className={cn("size-1.5 shrink-0 rounded-full", dotColor)} aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}
