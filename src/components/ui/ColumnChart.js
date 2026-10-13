import { formatNumber } from "@/lib/format";

export function ColumnChart({ data, format = formatNumber, labelHeader = "Periodo", valueHeader = "Valor" }) {
  const max = Math.max(...data.map(({ value }) => value), 1);
  const peak = data.findIndex(({ value }) => value === max);
  const labeled = new Set([peak, data.length - 1]);

  return (
    <figure className="grid gap-3">
      <div className="flex h-52 items-end gap-2 border-b border-border pt-6">
        {data.map(({ label, value }, index) => (
          <div
            key={label}
            tabIndex={0}
            aria-label={`${label}: ${format(value)}`}
            className="group relative flex h-full flex-1 items-end justify-center rounded-sm outline-offset-4"
          >
            <div className="relative w-full max-w-6" style={{ height: `${(value / max) * 100}%` }}>
              {labeled.has(index) && (
                <span className="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 text-xs font-medium whitespace-nowrap">{formatNumber(value)}</span>
              )}
              <div className="h-full rounded-t-[4px] bg-primary transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80" />
            </div>
            <div
              role="tooltip"
              className="pointer-events-none absolute top-0 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-full rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg group-hover:block group-focus-visible:block"
            >
              <strong className="block text-sm">{format(value)}</strong>
              <span className="text-muted">{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div aria-hidden className="flex gap-2">
        {data.map(({ label }) => (
          <span key={label} className="flex-1 text-center text-xs text-muted">
            {label}
          </span>
        ))}
      </div>
      <details className="text-sm">
        <summary className="cursor-pointer text-xs text-muted">Ver como tabla</summary>
        <table className="mt-2 w-full text-left">
          <thead className="text-xs text-muted">
            <tr>
              <th className="py-1 font-medium">{labelHeader}</th>
              <th className="py-1 text-right font-medium">{valueHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map(({ label, value }) => (
              <tr key={label}>
                <td className="py-1">{label}</td>
                <td className="py-1 text-right tabular-nums">{formatNumber(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
