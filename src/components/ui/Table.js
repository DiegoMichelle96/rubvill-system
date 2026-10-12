import { cn } from "@/lib/cn";

export function Table({ columns, rows, empty = "Sin resultados" }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="border-b border-border text-left text-xs text-muted uppercase">
          <tr>
            {columns.map(({ key, header, className }) => (
              <th key={key} scope="col" className={cn("px-4 py-3 font-medium whitespace-nowrap", className)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center text-muted">
                {empty}
              </td>
            </tr>
          )}
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-accent/50">
              {columns.map(({ key, render, className }) => (
                <td key={key} className={cn("px-4 py-3", className)}>
                  {render ? render(row) : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
