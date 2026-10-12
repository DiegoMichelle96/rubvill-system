"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Download, FileText, LayoutDashboard, UserCog } from "lucide-react";
import { cn } from "@/lib/cn";

const items = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Building2 },
  { href: "/facturas", label: "Facturas", icon: FileText },
  { href: "/descargas", label: "Descargas SAT", icon: Download },
  { href: "/usuarios", label: "Usuarios", icon: UserCog },
];

function Links({ pathname, onNavigate }) {
  return (
    <nav className="grid gap-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
              active && "bg-white/15 text-white",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function CurrentLinks({ onNavigate }) {
  return <Links pathname={usePathname()} onNavigate={onNavigate} />;
}

export function NavLinks({ onNavigate }) {
  return (
    <Suspense fallback={<Links onNavigate={onNavigate} />}>
      <CurrentLinks onNavigate={onNavigate} />
    </Suspense>
  );
}
