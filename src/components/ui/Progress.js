export function Progress({ segments, max, label }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={segments.reduce((sum, { value }) => sum + value, 0)} className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-accent">
      {max > 0 &&
        segments.map(({ value, className }, index) => value > 0 && <div key={index} className={className} style={{ width: `${(value / max) * 100}%` }} />)}
    </div>
  );
}
