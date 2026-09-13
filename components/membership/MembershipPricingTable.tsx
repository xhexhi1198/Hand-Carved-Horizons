import type { MembershipPricing } from "@/content/memberships";

/**
 * Displays the literal client-approved figures only — never computes or
 * renders a percentage/uplift value from them.
 */
export function MembershipPricingTable({ pricing }: { pricing: MembershipPricing }) {
  const rows: { label: string; value: string; qualifier?: string; emphasize?: boolean }[] = [
    { label: "Founding Circle Contribution", value: pricing.foundingContribution },
    {
      label: "Travel Credits Received",
      value: pricing.travelCredits,
      qualifier: pricing.travelCreditsQualifier,
      emphasize: true,
    },
    { label: "Expand Your Circle", value: pricing.expandCircle },
    {
      label: "Credits Per Added Member",
      value: pricing.creditsPerAddedMember,
      qualifier: pricing.creditsPerAddedMemberQualifier,
    },
  ];

  return (
    <div className="divide-y divide-hairline bg-sage/50 px-6 sm:px-8">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 ${
            row.emphasize ? "py-6" : "py-5"
          }`}
        >
          <span
            className={`text-xs uppercase tracking-[0.12em] ${
              row.emphasize ? "text-ink-soft" : "text-stone"
            }`}
          >
            {row.label}
          </span>
          <span
            className={`flex items-baseline gap-2 font-display ${
              row.emphasize ? "text-2xl sm:text-3xl" : "text-lg"
            }`}
          >
            {row.value}
            {row.qualifier && <span className="text-sm italic text-stone">{row.qualifier}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
