import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export type CalInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const CalInput = forwardRef<HTMLInputElement, CalInputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-cal-text-emphasis"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-md border bg-cal-bg px-3 py-2 text-sm text-cal-text-emphasis",
            "border-cal-border",
            "placeholder:text-cal-text-muted",
            "focus:border-cal-brand focus:outline-none focus:ring-1 focus:ring-cal-brand",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-cal-text-muted">{hint}</p>
        )}
        {error && <p className="text-xs text-cal-error-text">{error}</p>}
      </div>
    );
  }
);

CalInput.displayName = "CalInput";
