import Form from "next/form";
import Link from "next/link";
import { Button, buttonClass } from "@/components/ui/Button";

export function FilterForm({ action, children }) {
  return (
    <Form action={action} className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface p-4">
      {children}
      <div className="flex gap-2">
        <Button type="submit">Filtrar</Button>
        <Link href={action} className={buttonClass({ variant: "ghost" })}>
          Limpiar
        </Link>
      </div>
    </Form>
  );
}
