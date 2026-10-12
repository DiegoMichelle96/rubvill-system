import { Suspense } from "react";
import { notFound } from "next/navigation";
import { JobProgress } from "@/components/jobs/JobProgress";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { AutoRefresh } from "@/components/ui/AutoRefresh";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { Field } from "@/components/ui/Field";
import { FilterForm } from "@/components/ui/FilterForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { activeStatuses, jobItemStatuses, statusLabels } from "@/lib/labels";
import { idSchema, jobDetailQuerySchema, parseSearchParams } from "@/lib/schemas";
import { getJobDetail } from "@/lib/services/cfdiJobs";

export const metadata = { title: "Detalle de descarga" };

const columns = [
  { key: "fileName", header: "Archivo", className: "font-mono text-xs break-all" },
  { key: "status", header: "Estado", render: ({ status }) => <StatusBadge status={status} /> },
  { key: "uuid", header: "Folio fiscal", className: "font-mono text-xs text-muted", render: ({ uuid }) => uuid ?? "—" },
  { key: "attempts", header: "Intentos", className: "text-right tabular-nums" },
  {
    key: "error",
    header: "Error",
    className: "text-xs text-red-600 dark:text-red-400",
    render: ({ errorType, errorMessage }) => [errorType, errorMessage].filter(Boolean).join(": ") || "—",
  },
];

export default function DownloadPage({ params, searchParams }) {
  return (
    <>
      <BackLink href="/descargas">Descargas SAT</BackLink>
      <PageHeader title="Detalle de descarga" description="Lotes de procesamiento y el estado de cada archivo." />
      <Suspense fallback={<ContentSkeleton />}>
        <Batches params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Batches({ params, searchParams }) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!idSchema.safeParse(id).success) notFound();
  const batches = await getJobDetail(id, parseSearchParams(jobDetailQuerySchema, query));

  return (
    <>
      <FilterForm action={`/descargas/${id}`}>
        <Field label="Estado del archivo">
          <Select name="status" placeholder="Todos" options={jobItemStatuses.map((value) => ({ value, label: statusLabels[value] }))} defaultValue={query.status} />
        </Field>
      </FilterForm>
      {batches.length === 0 && <p className="py-12 text-center text-sm text-muted">Esta descarga aún no tiene lotes.</p>}
      {batches.map((batch) => (
        <Card key={batch.id} title={`Lote ${batch.batchNumber}`} actions={<StatusBadge status={batch.status} />} className="grid gap-4">
          <JobProgress job={batch} />
          <Table columns={columns} rows={batch.items} empty="Sin archivos con este estado" />
        </Card>
      ))}
      <AutoRefresh active={batches.some(({ status }) => activeStatuses.includes(status))} />
    </>
  );
}
