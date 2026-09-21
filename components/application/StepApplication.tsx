"use client";

import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_FIELDS, APPLICANT_REQUIRED_KEYS, APPLICATION_COPY } from "@/content/application";
import { FormField } from "../ui/FormField";
import { PlanCards } from "./PlanCards";
import { MembersTable } from "./MembersTable";
import { fieldError } from "./validation";
import type { FieldValues, MemberEntry } from "./types";

const copy = APPLICATION_COPY.applicationStep;

/**
 * The single combined page: Plan (Family only) → Your Details → Members.
 * Previously two separate steps; merged so the whole application is one
 * short screen, ending in the modal's shared "Review Application" footer
 * button rather than its own in-content CTA.
 */
export function StepApplication({
  tier,
  familyPlanId,
  onSelectFamilyPlan,
  applicant,
  touchedApplicant,
  onChangeApplicant,
  onBlurApplicant,
  members,
  touchedMembers,
  onAddMember,
  onRemoveMember,
  onChangeMember,
  onBlurMember,
}: {
  tier: MembershipTier;
  familyPlanId: string | null;
  onSelectFamilyPlan: (planLabel: string) => void;
  applicant: FieldValues;
  touchedApplicant: Record<string, boolean>;
  onChangeApplicant: (key: string, value: string) => void;
  onBlurApplicant: (key: string) => void;
  members: MemberEntry[];
  touchedMembers: Record<string, Record<string, boolean>>;
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
  onChangeMember: (id: string, key: string, value: string) => void;
  onBlurMember: (id: string, key: string) => void;
}) {
  const fields = APPLICANT_FIELDS[tier.id];
  const requiredKeys = APPLICANT_REQUIRED_KEYS[tier.id];

  return (
    <div className="space-y-8">
      {tier.id === "family" && (
        <section>
          <h3 className="text-[0.68rem] uppercase tracking-[0.14em] text-stone">{copy.planLabel}</h3>
          <div className="mt-3">
            <PlanCards
              rows={tier.pricingRows}
              selectedLabel={familyPlanId}
              onSelect={onSelectFamilyPlan}
            />
          </div>
        </section>
      )}

      <section>
        <h3 className="text-[0.68rem] uppercase tracking-[0.14em] text-stone">{copy.detailsLabel}</h3>
        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
          {fields.map((field) => {
            const required = requiredKeys.includes(field.key);
            const value = applicant[field.key] ?? "";
            return (
              <FormField
                key={field.key}
                label={field.label}
                type={field.type}
                value={value}
                onChange={(next) => onChangeApplicant(field.key, next)}
                onBlur={() => onBlurApplicant(field.key)}
                required={required}
                error={touchedApplicant[field.key] ? fieldError(field, value, required) : undefined}
                autoComplete={field.autoComplete}
              />
            );
          })}
        </div>
      </section>

      <section className="border-t border-hairline pt-6">
        <MembersTable
          tier={tier}
          members={members}
          touched={touchedMembers}
          onAdd={onAddMember}
          onRemove={onRemoveMember}
          onChange={onChangeMember}
          onBlur={onBlurMember}
        />
      </section>
    </div>
  );
}
