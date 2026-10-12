"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Modal } from "@/components/ui/Modal";
import { useSubmit } from "@/hooks/useSubmit";

export function FormDialog({ title, trigger, submit, submitLabel = "Guardar", children }) {
  const [open, setOpen] = useState(false);
  const { onSubmit, pending, error, fields, reset } = useSubmit(async (formData) => {
    await submit(formData);
    setOpen(false);
  });

  function close() {
    setOpen(false);
    reset();
  }

  return (
    <>
      <Button {...trigger} onClick={() => setOpen(true)} />
      <Modal open={open} onClose={close} title={title}>
        <form onSubmit={onSubmit} className="grid gap-4">
          {children(fields)}
          <FormError message={error} />
          <footer className="flex justify-end gap-2">
            <Button variant="secondary" onClick={close}>
              Cancelar
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Guardando…" : submitLabel}
            </Button>
          </footer>
        </form>
      </Modal>
    </>
  );
}
