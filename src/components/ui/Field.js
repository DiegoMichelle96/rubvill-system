import { cn } from "@/lib/cn";

export function Field({ label, error, hint, className, children }) {
  return (
    <label className={cn("grid content-start gap-1.5 text-sm", className)}>
      <span className="font-medium">{label}</span>
      {children}
      {(error || hint) && <span className={cn("text-xs", error ? "text-red-600 dark:text-red-400" : "text-muted")}>{error ?? hint}</span>}
    </label>
  );
}
