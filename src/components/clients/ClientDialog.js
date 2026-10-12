"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormDialog } from "@/components/ui/FormDialog";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";

export function ClientDialog({ client, trigger }) {
  const router = useRouter();
  const defaultTrigger = client
    ? { variant: "ghost", size: "icon", "aria-label": `Editar ${client.name}`, children: <Pencil /> }
    : {
        children: (
          <>
            <Plus />
            Nuevo cliente
          </>
        ),
      };

  async function submit(formData) {
    const body = Object.fromEntries(formData);
    await api(client ? `/client/${client.id}` : "/client", { method: client ? "PUT" : "POST", body });
    router.refresh();
  }

  return (
    <FormDialog title={client ? "Editar cliente" : "Nuevo cliente"} trigger={trigger ?? defaultTrigger} submit={submit}>
      {(fields) => (
        <>
          <Field label="Nombre o razón social" error={fields.name}>
            <Input name="name" defaultValue={client?.name} required />
          </Field>
          <Field label="RFC" error={fields.rfc}>
            <Input name="rfc" defaultValue={client?.rfc} required minLength={12} maxLength={13} className="font-mono uppercase" />
          </Field>
        </>
      )}
    </FormDialog>
  );
}
