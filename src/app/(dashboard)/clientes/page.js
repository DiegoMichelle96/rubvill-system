import { Suspense } from "react";
import Link from "next/link";
import { ClientDialog } from "@/components/clients/ClientDialog";
import { DeleteButton } from "@/components/common/DeleteButton";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { Field } from "@/components/ui/Field";
import { FilterForm } from "@/components/ui/FilterForm";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { Table } from "@/components/ui/Table";
import { formatDate } from "@/lib/format";
import { parseSearchParams, searchQuerySchema } from "@/lib/schemas";
import { listClients } from "@/lib/services/clients";

export const metadata = { title: "Clientes" };

const columns = [
  {
    key: "name",
    header: "Cliente",
    render: ({ id, name }) => (
      <Link href={`/clientes/${id}`} className="font-medium hover:underline">
        {name}
      </Link>
    ),
  },
  { key: "rfc", header: "RFC", className: "font-mono text-xs" },
  { key: "createdAt", header: "Alta", className: "whitespace-nowrap text-muted", render: ({ createdAt }) => formatDate(createdAt) },
  {
    key: "actions",
    header: <span className="sr-only">Acciones</span>,
    render: (client) => (
      <div className="flex justify-end gap-1">
        <ClientDialog client={client} />
        <DeleteButton path={`/client/${client.id}`} title="Eliminar cliente" name={client.name} />
      </div>
    ),
  },
];

export default function ClientsPage({ searchParams }) {
  return (
    <>
      <PageHeader title="Clientes" description="Contribuyentes a los que les llevas la contabilidad." actions={<ClientDialog />} />
      <Suspense fallback={<ContentSkeleton />}>
        <Clients searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Clients({ searchParams }) {
  const params = await searchParams;
  const { data, meta } = await listClients(parseSearchParams(searchQuerySchema, params));

  return (
    <>
      <FilterForm action="/clientes">
        <Field label="Buscar" className="min-w-64 flex-1">
          <Input name="search" type="search" defaultValue={params.search} placeholder="Nombre o RFC" />
        </Field>
      </FilterForm>
      <Table columns={columns} rows={data} empty="No hay clientes registrados" />
      <Pagination meta={meta} params={params} />
    </>
  );
}
