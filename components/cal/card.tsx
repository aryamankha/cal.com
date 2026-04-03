import { cn } from "@/lib/utils";

export function CalCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-cal-border-subtle bg-cal-bg p-5 shadow-cal-elevation",
        className
      )}
      {...props}
    />
  );
}

export function CalCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CalCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-cal text-cal-text-emphasis text-lg font-semibold tracking-wide", className)}
      {...props}
    />
  );
}

export function CalCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-cal-text-subtle mt-1", className)}
      {...props}
    />
  );
}

export function CalCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}
