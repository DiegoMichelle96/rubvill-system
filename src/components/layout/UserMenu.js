import { auth } from "@/auth";
import { LogoutButton } from "@/components/layout/LogoutButton";

export async function UserMenu() {
  const session = await auth();

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-muted sm:block">{session?.user?.email}</span>
      <LogoutButton />
    </div>
  );
}
