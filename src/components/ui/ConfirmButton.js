"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { FormError } from "@/components/ui/FormError";
import { Modal } from "@/components/ui/Modal";

export function ConfirmButton({ title, description, confirmLabel = "Eliminar", trigger, onConfirm }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [pending, startTransition] = useTransition();

  function confirm() {
    setError(null);
    startTransition(async () => {
      try {
        await onConfirm();
        setOpen(false);
      } catch ({ message }) {
        setError(message);
      }
    });
  }

  return (
    <>
      <Button {...trigger} onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)} title={title}>
        <p className="text-sm text-muted">{description}</p>
        <FormError message={error} />
        <footer className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirm} disabled={pending}>
            {pending ? "Eliminando…" : confirmLabel}
          </Button>
        </footer>
      </Modal>
    </>
  );
}
