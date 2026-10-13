import { Suspense } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import { UserMenu } from "@/components/layout/UserMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-border bg-surface/80 px-4 backdrop-blur lg:px-8">
      <MobileNav />
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Suspense>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  );
}
