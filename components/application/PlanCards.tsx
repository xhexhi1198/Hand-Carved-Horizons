"use client";

import { Check } from "lucide-react";
import type { MembershipPricingRow } from "@/content/memberships";

/**
 * Three compact, equally-weighted plan cards (Essential / Preferred /
 * Signature). The whole card is the click target; a small ring-style
 * indicator in the top-right corner (not a large radio) makes the
 * one-of-three selection obvious without looking like a generic SaaS form.
 */
export function PlanCards({
  rows,
  selectedLabel,
  onSelect,
}: {
  rows: MembershipPricingRow[];
  selectedLabel: string | null;
  onSelect: (label: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Choose your plan" className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {rows.map((row) => {
        const isSelected = selectedLabel === row.label;
        return (
          <button
            key={row.label}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(row.label)}
            className={`group relative cursor-pointer rounded-[9px] border p-3 text-left transition-all duration-200 sm:p-5 ${
              isSelected
                ? "border-brass bg-brass/10"
                : "border-hairline bg-canvas hover:-translate-y-px hover:border-brass/70 hover:bg-brass/[0.04]"
            }`}
          >
            <span
              className={`absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border transition-colors duration-200 sm:right-3 sm:top-3 ${
                isSelected
                  ? "border-brass bg-brass"
                  : "border-hairline bg-canvas group-hover:border-brass/70"
              }`}
              aria-hidden="true"
            >
              {isSelected && <Check size={10} strokeWidth={3} className="text-canvas" />}
            </span>

            <span
              className={`block pr-5 text-[0.6rem] uppercase tracking-[0.1em] transition-colors duration-200 sm:text-[0.65rem] sm:tracking-[0.12em] ${
                isSelected ? "text-brass" : "text-stone"
              }`}
            >
              {row.label}
            </span>
            <span className="mt-2 block font-display text-base leading-tight text-ink sm:text-xl">
              {row.contribution}
            </span>
            <span className="mt-0.5 block text-[0.65rem] leading-tight text-stone sm:text-xs">
              {row.travelCredits} Credits
            </span>
          </button>
        );
      })}
    </div>
  );
}
