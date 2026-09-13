import { Plane } from "lucide-react";

/** Hairline rule broken by a small icon accent — the recurring divider pattern. */
export function PlaneDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-hairline" />
      <Plane size={14} className="text-stone" strokeWidth={1.5} />
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}
