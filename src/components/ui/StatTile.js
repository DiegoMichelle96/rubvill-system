import { Card } from "@/components/ui/Card";

export function StatTile({ label, value, detail }) {
  return (
    <Card className="grid gap-1">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-3xl font-semibold tracking-tight">{value}</p>
      {detail && <p className="text-xs text-muted">{detail}</p>}
    </Card>
  );
}
