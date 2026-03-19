import { cn_local } from "./Card";

export function ProgressBar({ progress, className, indicatorClassName }) {
  return (
    <div className={cn_local("h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700", className)}>
      <div
        className={cn_local("h-full bg-[var(--color-primary-500)] transition-all duration-1000 ease-out", indicatorClassName)}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
