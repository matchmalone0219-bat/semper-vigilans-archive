import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-none font-sans text-sm font-medium tracking-widest uppercase transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood/70 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-blood text-primary-fg hover:bg-blood/85",
        ghost:
          "bg-transparent text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_22%,transparent)] hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_40%,transparent)]",
        phosphor:
          "bg-transparent font-mono font-semibold normal-case tracking-[0.16em] text-phosphor shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-phosphor)_50%,transparent)] hover:bg-phosphor/10 hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-phosphor)_80%,transparent)]",
        bare: "bg-transparent text-muted hover:text-fg",
      },
      size: {
        md: "h-11 px-5 text-sm",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-12 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
