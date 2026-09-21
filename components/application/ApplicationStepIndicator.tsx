/**
 * Deliberately understated — numerals + a dash + a label, no circles,
 * connecting lines, or progress bar. The active step's number picks up the
 * brand's brass accent; nothing else changes weight or size.
 */
export function ApplicationStepIndicator({
  current,
  labels,
}: {
  current: number;
  labels: readonly string[];
}) {
  return (
    <div
      role="tablist"
      aria-label="Application progress"
      className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 sm:gap-x-8"
    >
      {labels.map((label, index) => {
        const isActive = index === current;
        const isDone = index < current;

        return (
          <div
            key={label}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "step" : undefined}
            className={`flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-300 sm:text-xs ${
              isActive ? "text-ink" : isDone ? "text-ink-soft" : "text-stone/60"
            }`}
          >
            <span className={isActive ? "text-brass" : undefined}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true">—</span>
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
