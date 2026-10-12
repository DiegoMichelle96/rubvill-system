import { Suspense } from "react";
import { DownloadRequestForm } from "@/app/(dashboard)/descargas/nueva/_components/DownloadRequestForm";
import { BackLink } from "@/components/ui/BackLink";
import { Card } from "@/components/ui/Card";
import { ContentSkeleton } from "@/components/ui/ContentSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { listClientOptions } from "@/lib/services/clients";

export const metadata = { title: "Nueva descarga" };

export default function NewDownloadPage({ searchParams }) {
  return (
    <>
      <BackLink href="/descargas">Descargas SAT</BackLink>
      <PageHeader title="Nueva descarga" description="Solicita al SAT los CFDI de un cliente con su e.firma." />
      <Card className="max-w-3xl">
        <Suspense fallback={<ContentSkeleton />}>
          <Form searchParams={searchParams} />
        </Suspense>
      </Card>
    </>
  );
}

async function Form({ searchParams }) {
  const [{ clientId }, clients] = await Promise.all([searchParams, listClientOptions()]);
  return <DownloadRequestForm clients={clients} clientId={clientId} />;
}
