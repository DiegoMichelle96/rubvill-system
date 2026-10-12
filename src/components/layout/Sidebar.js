import { NavLinks } from "@/components/layout/NavLinks";
import { Logo } from "@/components/ui/Logo";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col gap-8 border-r border-border bg-sidebar px-4 py-6 lg:flex">
      <Logo white className="px-2" />
      <NavLinks />
    </aside>
  );
}
