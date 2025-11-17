import { cn } from "@/lib/utils";

// Generic shimmering block used to mock content while loading
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-400/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
