import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-in rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
