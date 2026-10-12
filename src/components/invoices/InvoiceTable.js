import { PaidToggle } from "@/components/invoices/PaidToggle";
import { Badge } from "@/components/ui/Badge";
import { Table } from "@/components/ui/Table";
import { formatDate, formatMoney } from "@/lib/format";
import { voucherTypes } from "@/lib/labels";

const columns = [
  { key: "fecha", header: "Fecha", className: "whitespace-nowrap", render: ({ fecha }) => formatDate(fecha) },
  {
    key: "emisor",
    header: "Emisor",
    render: ({ emisorNombre, emisorRfc }) => (
      <div className="grid">
        <span className="font-medium">{emisorNombre ?? "—"}</span>
        <span className="font-mono text-xs text-muted">{emisorRfc}</span>
      </div>
    ),
  },
  { key: "client", header: "Cliente", render: ({ Client }) => Client?.name ?? "—" },
  {
    key: "uuid",
    header: "Folio fiscal",
    render: ({ uuid }) => (
      <span title={uuid} className="font-mono text-xs text-muted">
        {uuid.slice(0, 8)}…
      </span>
    ),
  },
  {
    key: "tipo",
    header: "Tipo",
    render: ({ tipoComprobante, tipoSolicitud }) => (
      <div className="grid justify-items-start gap-1">
        <Badge>{voucherTypes[tipoComprobante] ?? tipoComprobante}</Badge>
        <span className="text-xs text-muted">{tipoSolicitud}</span>
      </div>
    ),
  },
  { key: "total", header: "Total", className: "text-right tabular-nums whitespace-nowrap", render: ({ total }) => formatMoney(total) },
  { key: "paid", header: "Pago", render: ({ id, paidDate }) => <PaidToggle id={id} paidDate={paidDate} /> },
];

export function InvoiceTable({ invoices, showClient = true }) {
  return (
    <Table
      columns={showClient ? columns : columns.filter(({ key }) => key !== "client")}
      rows={invoices}
      empty="No hay facturas con estos filtros"
    />
  );
}
