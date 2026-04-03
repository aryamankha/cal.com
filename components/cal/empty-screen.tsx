import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalEmptyScreenProps = {
  icon: LucideIcon;
  headline: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function CalEmptyScreen({
  icon: Icon,
  headline,
  description,
  className,
  children,
}: CalEmptyScreenProps) {
  return (
    <div
      className={cn(
        "flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-cal-border-subtle p-8 text-center",
        className
      )}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cal-bg-emphasis">
        <Icon className="h-5 w-5 text-cal-text-subtle" />
      </div>
      <h3 className="font-cal mt-4 text-lg font-semibold text-cal-text-emphasis">
        {headline}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-cal-text-subtle">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
