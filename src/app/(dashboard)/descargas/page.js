import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { JobProgress } from "@/components/jobs/JobProgress";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { AutoRefresh } from "@/components/ui/AutoRefresh";
import { buttonClass } from "@/components/ui/Button";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { Field } from "@/components/ui/Field";
import { FilterForm } from "@/components/ui/FilterForm";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { Table } from "@/components/ui/Table";
import { formatDateTime } from "@/lib/format";
import { activeStatuses, jobStatuses, statusLabels, stepLabels } from "@/lib/labels";
import { jobQuerySchema, parseSearchParams } from "@/lib/schemas";
import { listJobs } from "@/lib/services/cfdiJobs";

export const metadata = { title: "Descargas SAT" };

const columns = [
  { key: "createdAt", header: "Solicitada", className: "whitespace-nowrap", render: ({ createdAt }) => formatDateTime(createdAt) },
  {
    key: "satSolicitudId",
    header: "Solicitud SAT",
    render: ({ satSolicitudId }) => (
      <span title={satSolicitudId} className="font-mono text-xs text-muted">
        {satSolicitudId.slice(0, 8)}…
      </span>
    ),
  },
  { key: "status", header: "Estado", render: ({ status }) => <StatusBadge status={status} /> },
  { key: "step", header: "Paso", className: "whitespace-nowrap", render: ({ step }) => stepLabels[step] ?? step },
  { key: "progress", header: "Progreso", render: (job) => <JobProgress job={job} /> },
  {
    key: "actions",
    header: <span className="sr-only">Acciones</span>,
    className: "text-right",
    render: ({ id }) => (
      <Link href={`/descargas/${id}`} className={buttonClass({ variant: "ghost", size: "sm" })}>
        Ver detalle
      </Link>
    ),
  },
];

export default function DownloadsPage({ searchParams }) {
  return (
    <>
      <PageHeader
        title="Descargas SAT"
        description="Solicitudes de descarga masiva de CFDI y su avance."
        actions={
          <Link href="/descargas/nueva" className={buttonClass()}>
            <Plus />
            Nueva descarga
          </Link>
        }
      />
      <Suspense fallback={<ContentSkeleton />}>
        <Downloads searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Downloads({ searchParams }) {
  const params = await searchParams;
  const { data, meta } = await listJobs(parseSearchParams(jobQuerySchema, params));

  return (
    <>
      <FilterForm action="/descargas">
        <Field label="Desde">
          <Input name="startDate" type="date" defaultValue={params.startDate} />
        </Field>
        <Field label="Hasta">
          <Input name="endDate" type="date" defaultValue={params.endDate} />
        </Field>
        <Field label="Estado">
          <Select name="status" placeholder="Todos" options={jobStatuses.map((value) => ({ value, label: statusLabels[value] }))} defaultValue={params.status} />
        </Field>
      </FilterForm>
      <Table columns={columns} rows={data} empty="Aún no hay descargas" />
      <Pagination meta={meta} params={params} />
      <AutoRefresh active={data.some(({ status }) => activeStatuses.includes(status))} />
    </>
  );
}
