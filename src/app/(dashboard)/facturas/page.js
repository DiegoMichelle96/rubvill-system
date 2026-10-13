import { Suspense } from "react";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { Field } from "@/components/ui/Field";
import { FilterForm } from "@/components/ui/FilterForm";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { Select } from "@/components/ui/Select";
import { requestTypes } from "@/lib/labels";
import { invoiceQuerySchema, parseSearchParams } from "@/lib/schemas";
import { listClientOptions } from "@/lib/services/clients";
import { listInvoices } from "@/lib/services/invoices";

export const metadata = { title: "Facturas" };

export default function InvoicesPage({ searchParams }) {
  return (
    <>
      <PageHeader title="Facturas" description="CFDI descargados del SAT para tus clientes." />
      <Suspense fallback={<ContentSkeleton />}>
        <Invoices searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Invoices({ searchParams }) {
  const params = await searchParams;
  const [{ data, meta }, clients] = await Promise.all([
    listInvoices(parseSearchParams(invoiceQuerySchema, params)),
    listClientOptions(),
  ]);

  return (
    <>
      <FilterForm action="/facturas">
        <Field label="Desde">
          <Input name="startDate" type="date" defaultValue={params.startDate} />
        </Field>
        <Field label="Hasta">
          <Input name="endDate" type="date" defaultValue={params.endDate} />
        </Field>
        <Field label="Cliente" className="min-w-48 flex-1">
          <Select name="clientId" placeholder="Todos" options={clients} defaultValue={params.clientId} />
        </Field>
        <Field label="Tipo de solicitud">
          <Select name="tipoSolicitud" placeholder="Todos" options={requestTypes.map((type) => ({ value: type, label: type }))} defaultValue={params.tipoSolicitud} />
        </Field>
      </FilterForm>
      <InvoiceTable invoices={data} />
      <Pagination meta={meta} params={params} />
    </>
  );
}
