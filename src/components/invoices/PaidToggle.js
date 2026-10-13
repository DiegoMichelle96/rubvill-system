"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { formatDate, toIsoDay } from "@/lib/format";

export function PaidToggle({ id, paidDate }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [failed, setFailed] = useState(false);

  function toggle() {
    setFailed(false);
    startTransition(async () => {
      try {
        await api(`/invoice/${id}`, { method: "PUT", body: { paidDate: paidDate ? null : toIsoDay() } });
        router.refresh();
      } catch {
        setFailed(true);
      }
    });
  }

  return (
    <div className="grid justify-items-start gap-1">
      {paidDate ? (
        <button type="button" onClick={toggle} disabled={pending} title="Marcar como no pagada" className="rounded-full disabled:opacity-50">
          <Badge tone="success">Pagada · {formatDate(paidDate)}</Badge>
        </button>
      ) : (
        <Button size="sm" variant="secondary" onClick={toggle} disabled={pending}>
          Marcar pagada
        </Button>
      )}
      {failed && <span className="text-xs text-red-600 dark:text-red-400">No se pudo actualizar</span>}
    </div>
  );
}
