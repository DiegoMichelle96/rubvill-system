"use client";

import Link from "next/link";
import { Button, buttonClass } from "@/components/ui/Button";

export default function ErrorPage({ reset }) {
  return (
    <div className="grid justify-items-center gap-4 py-24 text-center">
      <h1 className="text-xl font-semibold">Algo salió mal</h1>
      <p className="max-w-md text-sm text-muted">No pudimos cargar esta información. Intenta de nuevo o vuelve a iniciar sesión si el problema continúa.</p>
      <div className="flex gap-2">
        <Button onClick={reset}>Reintentar</Button>
        <Link href="/login" className={buttonClass({ variant: "secondary" })}>
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}
