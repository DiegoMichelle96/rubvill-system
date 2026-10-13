"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ConfirmButton } from "@/components/ui/ConfirmButton";
import { api } from "@/lib/api";

export function DeleteButton({ path, title, name, redirectTo, trigger }) {
  const router = useRouter();

  async function remove() {
    await api(path, { method: "DELETE" });
    if (redirectTo) router.push(redirectTo);
    else router.refresh();
  }

  return (
    <ConfirmButton
      title={title}
      description={`¿Seguro que quieres eliminar a ${name}?`}
      trigger={trigger ?? { variant: "ghost", size: "icon", "aria-label": `Eliminar ${name}`, children: <Trash2 /> }}
      onConfirm={remove}
    />
  );
}
