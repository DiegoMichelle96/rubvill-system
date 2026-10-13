import { Suspense } from "react";
import Link from "next/link";
import { JobProgress } from "@/components/jobs/JobProgress";
import { StatusBadge } from "@/components/jobs/StatusBadge";
import { AutoRefresh } from "@/components/ui/AutoRefresh";
import { buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ColumnChart } from "@/components/ui/ColumnChart";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatTile } from "@/components/ui/StatTile";
import { formatDateTime, formatMonth, formatNumber } from "@/lib/format";
import { getDashboard } from "@/lib/services/dashboard";

export const metadata = { title: "Inicio" };

export default function HomePage() {
  return (
    <>
      <PageHeader title="Inicio" description="Resumen de la actividad de tus clientes." />
      <Suspense fallback={<ContentSkeleton />}>
        <Dashboard />
      </Suspense>
    </>
  );
}

async function Dashboard() {
  const { invoicesByMonth, clients, activeJobs, failedJobs, recentJobs } = await getDashboard();
  const [previous, current] = invoicesByMonth.slice(-2);
  const delta = current.total - previous.total;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Facturas este mes"
          value={formatNumber(current.total)}
          detail={delta === 0 ? `Igual que ${formatMonth(previous.month)}` : `${delta > 0 ? "+" : ""}${formatNumber(delta)} vs ${formatMonth(previous.month)}`}
        />
        <StatTile label="Clientes" value={formatNumber(clients)} />
        <StatTile label="Descargas en proceso" value={formatNumber(activeJobs)} detail="Pendientes o procesando" />
        <StatTile label="Descargas con errores" value={formatNumber(failedJobs)} detail="Fallidas o con archivos con error" />
      </div>
      <div className="grid gap-4 xl:grid-cols-5">
        <Card title="Facturas por mes" className="xl:col-span-2">
          <ColumnChart
            data={invoicesByMonth.map(({ month, total }) => ({ label: formatMonth(month), value: total }))}
            format={(value) => `${formatNumber(value)} ${value === 1 ? "factura" : "facturas"}`}
            labelHeader="Mes"
            valueHeader="Facturas"
          />
        </Card>
        <Card
          title="Descargas recientes"
          className="xl:col-span-3"
          actions={
            <Link href="/descargas" className={buttonClass({ variant: "ghost", size: "sm" })}>
              Ver todas
            </Link>
          }
        >
          {recentJobs.length === 0 && <p className="py-8 text-center text-sm text-muted">Aún no hay descargas.</p>}
          <ul className="divide-y divide-border">
            {recentJobs.map((job) => (
              <li key={job.id}>
                <Link href={`/descargas/${job.id}`} className="grid gap-3 py-3 hover:bg-accent/50 sm:grid-cols-[1fr_auto_12rem] sm:items-center">
                  <span className="text-sm">{formatDateTime(job.createdAt)}</span>
                  <StatusBadge status={job.status} />
                  <JobProgress job={job} />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <AutoRefresh active={activeJobs > 0} seconds={15} />
    </>
  );
}
