import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, Pencil } from "lucide-react";
import { ClientDialog } from "@/components/clients/ClientDialog";
import { DeleteButton } from "@/components/common/DeleteButton";
import { InvoiceTable } from "@/components/invoices/InvoiceTable";
import { BackLink } from "@/components/ui/BackLink";
import { buttonClass } from "@/components/ui/Button";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate } from "@/lib/format";
import { idSchema, invoiceQuerySchema, parseSearchParams } from "@/lib/schemas";
import { getClient } from "@/lib/services/clients";
import { listInvoices } from "@/lib/services/invoices";

export const metadata = { title: "Cliente" };

export default function ClientPage({ params, searchParams }) {
  return (
    <>
      <BackLink href="/clientes">Clientes</BackLink>
      <Suspense fallback={<ContentSkeleton />}>
        <Client params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function Client({ params, searchParams }) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  if (!idSchema.safeParse(id).success) notFound();
  const [client, invoices] = await Promise.all([
    getClient(id),
    listInvoices({ ...parseSearchParams(invoiceQuerySchema, query), clientId: id }),
  ]);

  return (
    <>
      <PageHeader
        title={client.name}
        description={`RFC ${client.rfc} · Cliente desde ${formatDate(client.createdAt)}`}
        actions={
          <>
            <Link href={`/descargas/nueva?clientId=${id}`} className={buttonClass()}>
              <Download />
              Descargar del SAT
            </Link>
            <ClientDialog
              client={client}
              trigger={{
                variant: "secondary",
                children: (
                  <>
                    <Pencil />
                    Editar
                  </>
                ),
              }}
            />
            <DeleteButton path={`/client/${id}`} title="Eliminar cliente" name={client.name} redirectTo="/clientes" />
          </>
        }
      />
      <h2 className="text-lg font-semibold">Facturas</h2>
      <InvoiceTable invoices={invoices.data} showClient={false} />
      <Pagination meta={invoices.meta} params={query} />
    </>
  );
}
