import type { MembershipPricingRow } from "@/content/memberships";

/**
 * Displays the literal client-approved figures only — never computes or
 * renders a percentage/uplift value from them. A 3-column table (row label,
 * contribution, travel credits) on tablet/desktop; each row becomes a
 * compact stacked block on mobile so nothing crowds.
 */
export function MembershipPricingTable({
  tableLabel,
  rows,
  note,
}: {
  tableLabel: string;
  rows: MembershipPricingRow[];
  note?: string;
}) {
  return (
    <div>
      <div className="bg-sage/50 px-6 sm:px-8">
        <div className="hidden border-b border-hairline py-2.5 text-xs uppercase tracking-[0.12em] text-stone sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-6">
          <span>{tableLabel}</span>
          <span className="w-28 text-right">Contribution</span>
          <span className="w-28 text-right">Travel Credits</span>
        </div>

        <div className="divide-y divide-hairline">
          {rows.map((row) => (
            <div
              key={row.label}
              className="py-4 sm:grid sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-6"
            >
              <p className="font-display text-base sm:text-lg">{row.label}</p>

              <div className="mt-3 flex items-baseline justify-between gap-4 sm:mt-0 sm:block sm:w-28 sm:text-right">
                <span className="text-[0.65rem] uppercase tracking-[0.12em] text-stone sm:hidden">
                  Contribution
                </span>
                <span className="font-display text-lg sm:text-xl">{row.contribution}</span>
              </div>

              <div className="mt-1 flex items-baseline justify-between gap-4 sm:mt-0 sm:block sm:w-28 sm:text-right">
                <span className="text-[0.65rem] uppercase tracking-[0.12em] text-stone sm:hidden">
                  Travel Credits
                </span>
                <span className="font-display text-lg sm:text-xl">{row.travelCredits}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {note && <p className="mt-3 text-xs leading-relaxed text-stone">{note}</p>}
    </div>
  );
}
