"use client";

import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_FIELDS, APPLICANT_REQUIRED_KEYS, APPLICATION_COPY } from "@/content/application";
import { FormField } from "../ui/FormField";
import { fieldError } from "./validation";
import type { FieldValues } from "./types";

export function StepYourDetails({
  tier,
  familyPlanId,
  onSelectFamilyPlan,
  applicant,
  touched,
  onChange,
  onBlur,
}: {
  tier: MembershipTier;
  familyPlanId: string | null;
  onSelectFamilyPlan: (planLabel: string) => void;
  applicant: FieldValues;
  touched: Record<string, boolean>;
  onChange: (key: string, value: string) => void;
  onBlur: (key: string) => void;
}) {
  const fields = APPLICANT_FIELDS[tier.id];
  const requiredKeys = APPLICANT_REQUIRED_KEYS[tier.id];

  return (
    <div className="space-y-8">
      {tier.id === "family" && (
        <fieldset>
          <legend className="text-[0.68rem] uppercase tracking-[0.14em] text-stone">
            {APPLICATION_COPY.yourDetailsStep.familyPlanLabel}
          </legend>
          <div className="mt-3 divide-y divide-hairline border-y border-hairline">
            {tier.pricingRows.map((row) => {
              const isSelected = familyPlanId === row.label;
              return (
                <label
                  key={row.label}
                  className={`flex cursor-pointer flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 transition-colors duration-300 ${
                    isSelected ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="familyPlan"
                      value={row.label}
                      checked={isSelected}
                      onChange={() => onSelectFamilyPlan(row.label)}
                      className="h-3.5 w-3.5 accent-brass"
                    />
                    <span className="font-display text-lg">{row.label}</span>
                  </span>
                  <span className="flex items-baseline gap-4 pl-6 font-display text-base sm:pl-0">
                    <span>{row.contribution}</span>
                    <span className="text-sm text-stone">{row.travelCredits} credits</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {fields.map((field) => {
          const required = requiredKeys.includes(field.key);
          const value = applicant[field.key] ?? "";
          return (
            <FormField
              key={field.key}
              label={field.label}
              type={field.type}
              value={value}
              onChange={(next) => onChange(field.key, next)}
              onBlur={() => onBlur(field.key)}
              required={required}
              error={touched[field.key] ? fieldError(field, value, required) : undefined}
              autoComplete={field.autoComplete}
              className={field.key === "city" ? "sm:col-span-2" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
