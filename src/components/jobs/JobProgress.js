import { Progress } from "@/components/ui/Progress";
import { formatNumber } from "@/lib/format";

export function JobProgress({ job: { totalFiles, processedFiles, successfulFiles, failedFiles } }) {
  return (
    <div className="grid min-w-40 gap-1.5">
      <Progress
        label="Progreso"
        max={totalFiles}
        segments={[
          { value: successfulFiles, className: "bg-emerald-500" },
          { value: failedFiles, className: "bg-red-500" },
        ]}
      />
      <span className="text-xs text-muted tabular-nums">
        {formatNumber(processedFiles)} de {formatNumber(totalFiles)} archivos
        {failedFiles > 0 && <span className="text-red-600 dark:text-red-400"> · {formatNumber(failedFiles)} con error</span>}
      </span>
    </div>
  );
}
