import { Skeleton } from "@/components/ui/Skeleton";

export function ContentSkeleton() {
  return (
    <div className="grid gap-6" aria-busy="true" aria-label="Cargando">
      <Skeleton className="h-20" />
      <Skeleton className="h-96" />
    </div>
  );
}
