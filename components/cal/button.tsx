import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const calButtonVariants = cva(
  "group inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-[10px] transition-shadow cursor-pointer disabled:cursor-not-allowed gap-1",
  {
    variants: {
      variant: {
        primary: [
          "bg-cal-brand text-cal-brand-text",
          "border border-cal-brand",
          "shadow-cal-brand-default",
          "hover:not-disabled:bg-cal-brand-emphasis",
          "hover:not-disabled:shadow-cal-brand-hover",
          "active:not-disabled:shadow-cal-brand-active",
          "focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-cal-outline-focused",
          "disabled:opacity-30",
          "duration-100",
        ],
        secondary: [
          "bg-cal-bg text-cal-text",
          "border border-cal-border",
          "shadow-cal-outline-rested",
          "hover:not-disabled:bg-cal-bg-muted hover:not-disabled:text-cal-text-emphasis",
          "hover:not-disabled:shadow-cal-outline-hover",
          "active:not-disabled:shadow-cal-outline-active",
          "focus-visible:bg-cal-bg-subtle focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-cal-outline-focused",
          "disabled:opacity-30",
          "duration-200",
        ],
        minimal: [
          "text-cal-text-subtle",
          "border border-transparent",
          "hover:not-disabled:bg-cal-bg-subtle hover:not-disabled:text-cal-text-emphasis hover:not-disabled:border-cal-border-subtle",
          "active:not-disabled:shadow-cal-outline-active",
          "focus-visible:bg-cal-bg-subtle focus-visible:outline-none focus-visible:ring-0 focus-visible:border-cal-border-subtle",
          "disabled:opacity-30",
          "duration-200",
        ],
        destructive: [
          "border border-cal-border text-cal-error-text",
          "hover:border-red-300 hover:bg-cal-error",
          "focus-visible:outline-none focus-visible:ring-0",
          "disabled:opacity-30",
          "duration-200",
        ],
      },
      size: {
        xs: "h-6 px-2 text-xs rounded-md",
        sm: "h-7 px-2 py-1.5 text-sm",
        base: "px-2.5 py-2 text-sm leading-none",
        lg: "px-3 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
);

export type CalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof calButtonVariants>;

export const CalButton = forwardRef<HTMLButtonElement, CalButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(calButtonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
);

CalButton.displayName = "CalButton";
