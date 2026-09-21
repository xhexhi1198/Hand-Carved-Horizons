"use client";

import { Check } from "lucide-react";
import type { MembershipPricingRow } from "@/content/memberships";

/**
 * Three compact, equally-weighted plan cards (Essential / Preferred /
 * Signature) — replaces the earlier full-width radio-row list. The whole
 * card is the click target; selection reads via a brass border + faint
 * tint + small check, never a large radio control.
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
            className={`border p-3 text-left transition-colors duration-300 sm:p-5 ${
              isSelected
                ? "border-brass bg-brass/[0.06]"
                : "border-hairline hover:border-stone"
            }`}
          >
            <span className="flex items-start justify-between gap-1">
              <span className="text-[0.6rem] uppercase tracking-[0.1em] text-stone sm:text-[0.65rem] sm:tracking-[0.12em]">
                {row.label}
              </span>
              {isSelected && (
                <Check size={13} aria-hidden="true" className="mt-0.5 shrink-0 text-brass" />
              )}
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
