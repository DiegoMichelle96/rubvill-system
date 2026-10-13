"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useSubmit } from "@/hooks/useSubmit";
import { api } from "@/lib/api";
import { requestTypes } from "@/lib/labels";

export function DownloadRequestForm({ clients, clientId }) {
  const router = useRouter();
  const { onSubmit, pending, error, fields } = useSubmit(async (formData) => {
    await api("/invoice/download-request", { method: "POST", body: formData });
    router.push("/descargas");
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Cliente" error={fields.clientId} className="sm:col-span-2">
        <Select name="clientId" placeholder="Selecciona un cliente" options={clients} defaultValue={clientId} required />
      </Field>
      <Field label="Tipo de solicitud" error={fields.tipoSolicitud} className="sm:col-span-2">
        <Select name="tipoSolicitud" options={requestTypes.map((type) => ({ value: type, label: type }))} required />
      </Field>
      <Field label="Fecha inicial" error={fields.fechaInicial}>
        <Input name="fechaInicial" type="date" required />
      </Field>
      <Field label="Fecha final" error={fields.fechaFinal}>
        <Input name="fechaFinal" type="date" required />
      </Field>
      <Field label="Certificado (.cer)" error={fields.certificate} hint="Máximo 1 MB">
        <Input name="certificate" type="file" accept=".cer" required />
      </Field>
      <Field label="Llave privada (.key)" error={fields.privateKey} hint="Máximo 1 MB">
        <Input name="privateKey" type="file" accept=".key" required />
      </Field>
      <Field label="Contraseña de la e.firma" error={fields.password} className="sm:col-span-2">
        <Input name="password" type="password" autoComplete="new-password" required />
      </Field>
      <FormError message={error} />
      <div className="flex justify-end sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Enviando…" : "Solicitar descarga"}
        </Button>
      </div>
    </form>
  );
}
