"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  return (
    <Button variant="secondary" size="sm" onClick={() => signOut({ redirectTo: "/login" })}>
      <LogOut />
      Salir
    </Button>
  );
}
