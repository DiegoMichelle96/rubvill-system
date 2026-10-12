import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ href, children }) {
  return (
    <Link href={href} className="inline-flex w-fit items-center gap-1 text-sm text-muted hover:text-foreground">
      <ArrowLeft className="size-4" />
      {children}
    </Link>
  );
}
