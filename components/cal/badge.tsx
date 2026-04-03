import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const calBadgeVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-[4px] gap-x-1",
  {
    variants: {
      variant: {
        warning: "bg-cal-attention text-cal-attention-text",
        success: "bg-cal-success text-cal-success-text",
        gray: "bg-cal-bg-emphasis text-cal-text-emphasis",
        blue: "bg-cal-info text-cal-info-text",
        error: "bg-cal-error text-cal-error-text",
      },
      size: {
        sm: "px-1 py-1 text-[10px] leading-none",
        md: "py-1 px-1.5 text-xs leading-none",
        lg: "py-1 px-1.5 text-sm leading-none rounded-lg",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "md",
    },
  }
);

export type CalBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof calBadgeVariants>;

export function CalBadge({ className, variant, size, ...props }: CalBadgeProps) {
  return (
    <span
      className={cn(calBadgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
