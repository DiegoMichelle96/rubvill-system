"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLinks } from "@/components/layout/NavLinks";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useDialog } from "@/hooks/useDialog";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const ref = useDialog(open);

  return (
    <>
      <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú" onClick={() => setOpen(true)}>
        <Menu />
      </Button>
      <dialog
        ref={ref}
        onClose={() => setOpen(false)}
        aria-label="Menú"
        className="m-0 h-svh max-h-none w-72 max-w-[85vw] bg-sidebar p-0 backdrop:bg-black/50"
      >
        <div className="grid gap-8 px-4 py-6">
          <div className="flex items-center gap-3">
            <Logo white className="min-w-0 px-2" />
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
              <X />
            </Button>
          </div>
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </dialog>
    </>
  );
}
