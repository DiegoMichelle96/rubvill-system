import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="grid flex-1 place-content-center justify-items-center gap-4 p-6 text-center">
      <h1 className="text-xl font-semibold">Página no encontrada</h1>
      <p className="text-sm text-muted">La página que buscas no existe o fue movida.</p>
      <Link href="/" className={buttonClass()}>
        Ir al inicio
      </Link>
    </main>
  );
}
