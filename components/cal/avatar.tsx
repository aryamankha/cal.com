import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "h-5 w-5 text-[8px]",
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
  xl: "h-12 w-12 text-base",
};

export type CalAvatarProps = {
  src?: string | null;
  alt?: string;
  size?: keyof typeof sizeMap;
  fallback?: string;
  className?: string;
};

export function CalAvatar({ src, alt, size = "md", fallback, className }: CalAvatarProps) {
  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full bg-cal-bg-emphasis text-cal-text-emphasis font-medium overflow-hidden",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
