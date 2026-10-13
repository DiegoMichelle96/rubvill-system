import { cn } from "@/lib/cn";

const tones = {
  neutral: "bg-accent text-muted",
  brand: "bg-brand-100 text-brand-700 dark:bg-brand-500/25 dark:text-brand-200",
  success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  danger: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300",
};

export function Badge({ tone = "neutral", className, ...props }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", tones[tone], className)} {...props} />;
}
