import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const cardVariants = cva("relative rounded-none text-fg transition-colors", {
  variants: {
    variant: {
      default:
        "border border-fg/15 bg-surface hover:border-fg/30",
      dossier:
        "border border-fg/15 bg-surface/50 crimson-glow-card hover:border-blood/40",
      subtle:
        "border border-fg/10 bg-surface/30 hover:border-fg/20",
      elevated:
        "border border-fg/20 bg-elevated hover:border-fg/40",
      bare:
        "border-0 bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & {
    showCorners?: boolean;
    evidenceTape?: boolean;
  };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, showCorners, evidenceTape, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant }),
          evidenceTape && "evidence-tape",
          className,
        )}
        {...props}
      >
        {showCorners ? (
          <>
            <span
              className="pointer-events-none absolute -top-1 -left-1 font-mono text-[9px] leading-none text-fg/30 select-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="pointer-events-none absolute -top-1 -right-1 font-mono text-[9px] leading-none text-fg/30 select-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="pointer-events-none absolute -bottom-1 -left-1 font-mono text-[9px] leading-none text-fg/30 select-none"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="pointer-events-none absolute -bottom-1 -right-1 font-mono text-[9px] leading-none text-fg/30 select-none"
              aria-hidden="true"
            >
              +
            </span>
          </>
        ) : null}
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-sans text-lg font-black tracking-tight text-fg sm:text-xl", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs leading-relaxed text-muted", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-4 pt-0 sm:p-6 sm:pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center border-t border-fg/10 p-4 pt-4 sm:p-6 sm:pt-4", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
