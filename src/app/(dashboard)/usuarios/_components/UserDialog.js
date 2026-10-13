"use client";

import { useRouter } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { FormDialog } from "@/components/ui/FormDialog";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";

export function UserDialog({ user }) {
  const router = useRouter();
  const trigger = user
    ? { variant: "ghost", size: "icon", "aria-label": `Editar ${user.name}`, children: <Pencil /> }
    : {
        children: (
          <>
            <Plus />
            Nuevo usuario
          </>
        ),
      };

  async function submit(formData) {
    const body = Object.fromEntries([...formData].filter(([, value]) => value !== ""));
    await api(user ? `/user/${user.id}` : "/user", { method: user ? "PUT" : "POST", body });
    router.refresh();
  }

  return (
    <FormDialog title={user ? "Editar usuario" : "Nuevo usuario"} trigger={trigger} submit={submit}>
      {(fields) => (
        <>
          <Field label="Nombre" error={fields.name}>
            <Input name="name" defaultValue={user?.name} required />
          </Field>
          <Field label="Correo" error={fields.email}>
            <Input name="email" type="email" defaultValue={user?.email} required />
          </Field>
          <Field label="Contraseña" error={fields.password} hint={user && "Déjala vacía para conservar la actual"}>
            <Input name="password" type="password" autoComplete="new-password" required={!user} />
          </Field>
        </>
      )}
    </FormDialog>
  );
}
