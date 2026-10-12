"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { FormError } from "@/components/ui/FormError";
import { Input } from "@/components/ui/Input";
import { useSubmit } from "@/hooks/useSubmit";

function safeRedirect(callbackUrl) {
  const url = new URL(callbackUrl ?? "/", window.location.origin);
  return url.origin === window.location.origin ? url.pathname + url.search : "/";
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onSubmit, pending, error } = useSubmit(async (formData) => {
    const result = await signIn("credentials", { ...Object.fromEntries(formData), redirect: false });
    if (result?.error) throw new Error("Correo o contraseña incorrectos");
    router.replace(safeRedirect(searchParams.get("callbackUrl")));
  });

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Field label="Correo">
        <Input name="email" type="email" autoComplete="email" required autoFocus />
      </Field>
      <Field label="Contraseña">
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      <FormError message={error} />
      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
