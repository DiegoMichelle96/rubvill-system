import { Badge } from "@/components/ui/Badge";
import { statusLabels, statusTones } from "@/lib/labels";

export function StatusBadge({ status }) {
  return <Badge tone={statusTones[status]}>{statusLabels[status] ?? status}</Badge>;
}
