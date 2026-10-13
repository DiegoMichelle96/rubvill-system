import { cn } from "@/lib/cn";

export const controlClass =
  "h-10 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted disabled:opacity-50 aria-invalid:border-red-500";

export function Input({ className, ...props }) {
  return <input className={cn(controlClass, "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium", className)} {...props} />;
}
