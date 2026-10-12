import { Suspense } from "react";
import { LoginForm } from "@/app/login/_components/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const metadata = { title: "Iniciar sesión" };

export default function LoginPage() {
  return (
    <main className="grid flex-1 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-brand-700 p-12 text-white lg:flex dark:bg-sidebar">
        <Logo white className="max-w-sm" />
        <p className="max-w-md text-lg text-white/80">
          Descarga, organiza y da seguimiento a los CFDI de tus clientes desde un solo lugar.
        </p>
      </section>
      <section className="relative flex items-center justify-center p-6">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="grid w-full max-w-sm gap-8">
          <Logo className="mx-auto max-w-64 lg:hidden" />
          <div className="grid gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
            <p className="text-sm text-muted">Ingresa con tu correo y contraseña.</p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
