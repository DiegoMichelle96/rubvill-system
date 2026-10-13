"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDialog } from "@/hooks/useDialog";

export function Modal({ open, onClose, title, children }) {
  const ref = useDialog(open);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={title}
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-border bg-surface p-0 text-foreground shadow-xl backdrop:bg-black/50"
    >
      {open && (
        <div className="grid gap-5 p-6">
          <header className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
              <X />
            </Button>
          </header>
          {children}
        </div>
      )}
    </dialog>
  );
}
