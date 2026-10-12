import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { formatNumber } from "@/lib/format";

export function Pagination({ meta, params = {} }) {
  if (!meta || meta.totalPages <= 1) return null;
  const href = (page) => `?${new URLSearchParams({ ...params, page })}`;
  const link = (page, enabled, label, Icon) =>
    enabled ? (
      <Link href={href(page)} aria-label={label} className={buttonClass({ variant: "secondary", size: "icon" })}>
        <Icon />
      </Link>
    ) : (
      <span aria-hidden className={buttonClass({ variant: "secondary", size: "icon", className: "opacity-40" })}>
        <Icon />
      </span>
    );

  return (
    <nav aria-label="Paginación" className="flex items-center justify-between gap-3 text-sm text-muted">
      <span>{formatNumber(meta.total)} resultados</span>
      <div className="flex items-center gap-2">
        {link(meta.page - 1, meta.hasPrev, "Página anterior", ChevronLeft)}
        <span>
          Página {meta.page} de {meta.totalPages}
        </span>
        {link(meta.page + 1, meta.hasNext, "Página siguiente", ChevronRight)}
      </div>
    </nav>
  );
}
