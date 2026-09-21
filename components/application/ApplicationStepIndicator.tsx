import { Check } from "lucide-react";

/**
 * A small numbered circle per step, a thin connecting line between them,
 * and a label — deliberately thin-lined and compact rather than a large
 * SaaS-dashboard progress bar. The active circle fills brass; a completed
 * step (only ever step one, since there are just two steps) shows a check.
 */
export function ApplicationStepIndicator({
  current,
  labels,
}: {
  current: number;
  labels: readonly string[];
}) {
  return (
    <div role="tablist" aria-label="Application progress" className="flex items-center justify-center">
      {labels.map((label, index) => {
        const isActive = index === current;
        const isDone = index < current;

        return (
          <div key={label} className="flex items-center">
            <div
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "step" : undefined}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.6rem] transition-colors duration-200 sm:h-6 sm:w-6 sm:text-[0.65rem] ${
                  isActive || isDone
                    ? "border-brass bg-brass text-canvas"
                    : "border-hairline text-stone/70"
                }`}
              >
                {isDone ? <Check size={11} strokeWidth={3} aria-hidden="true" /> : String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`whitespace-nowrap text-[0.65rem] uppercase tracking-[0.14em] transition-colors duration-200 sm:text-xs ${
                  isActive ? "font-medium text-ink" : isDone ? "text-ink-soft" : "text-stone/60"
                }`}
              >
                {label}
              </span>
            </div>

            {index < labels.length - 1 && (
              <span
                aria-hidden="true"
                className={`mx-3 h-px w-6 shrink-0 transition-colors duration-200 sm:mx-5 sm:w-14 ${
                  index < current ? "bg-brass" : "bg-hairline"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
