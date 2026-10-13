import { cn } from "@/lib/cn";

export function Card({ title, actions, className, children }) {
  return (
    <section className={cn("rounded-xl border border-border bg-surface p-5", className)}>
      {(title || actions) && (
        <header className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-semibold">{title}</h2>}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
