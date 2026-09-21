"use client";

import { X } from "lucide-react";
import type { MembershipTier } from "@/content/memberships";
import { MEMBER_ADD_RULES, MEMBER_FIELDS, MEMBER_REQUIRED_KEYS, APPLICATION_COPY } from "@/content/application";
import { FormField } from "../ui/FormField";
import { fieldError } from "./validation";
import type { MemberEntry } from "./types";

const copy = APPLICATION_COPY.membersStep;

export function StepMembers({
  tier,
  members,
  touched,
  onAdd,
  onRemove,
  onChange,
  onBlur,
}: {
  tier: MembershipTier;
  members: MemberEntry[];
  touched: Record<string, Record<string, boolean>>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: string, value: string) => void;
  onBlur: (id: string, key: string) => void;
}) {
  const fields = MEMBER_FIELDS[tier.id];
  const rules = MEMBER_ADD_RULES[tier.id];
  const totalPeople = 1 + members.length;
  const atMax = rules ? totalPeople >= rules.maxCount : false;

  return (
    <div>
      <h3 className="font-display text-xl">{copy.title}</h3>
      <p className="mt-1.5 text-sm text-ink-soft">{copy.subhead}</p>

      {rules && (
        <p className="mt-3 text-xs leading-relaxed text-stone">
          Your founding membership includes up to {rules.includedCount} {rules.unitLabel}
          {rules.includedCount === 1 ? "" : "s"}. Each {rules.unitLabel} beyond that adds{" "}
          {rules.additionalContribution} contribution · {rules.additionalCredits} travel credits.
        </p>
      )}

      {members.length === 0 ? (
        <p className="mt-6 text-sm text-stone">{copy.emptyHint}</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {members.map((member, index) => {
            const isAdditional = rules ? index + 2 > rules.includedCount : false;
            return (
              <li key={member.id} className="border border-hairline p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-stone">
                    {rules?.unitLabel ? `${rules.unitLabel[0].toUpperCase()}${rules.unitLabel.slice(1)}` : "Member"}{" "}
                    {String(index + 1).padStart(2, "0")}
                    {isAdditional && rules && (
                      <span className="ml-2 normal-case tracking-normal text-brass">
                        Additional {rules.unitLabel} — +{rules.additionalContribution} ·{" "}
                        +{rules.additionalCredits}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(member.id)}
                    className="flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.14em] text-stone transition-colors hover:text-brass"
                  >
                    <X size={12} aria-hidden="true" />
                    {copy.removeLabel}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                  {fields.map((field) => {
                    const required = MEMBER_REQUIRED_KEYS.includes(field.key);
                    const value = member.values[field.key] ?? "";
                    const isTouched = touched[member.id]?.[field.key];
                    return (
                      <FormField
                        key={field.key}
                        label={field.label}
                        type={field.type}
                        value={value}
                        onChange={(next) => onChange(member.id, field.key, next)}
                        onBlur={() => onBlur(member.id, field.key)}
                        required={required}
                        error={isTouched ? fieldError(field, value, required) : undefined}
                        options={field.options}
                      />
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={onAdd}
        disabled={atMax}
        className="mt-6 text-xs uppercase tracking-[0.14em] text-ink border-b border-ink pb-1 transition-colors duration-300 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-hairline disabled:text-stone/60"
      >
        + {members.length === 0 ? copy.addLabel : copy.addAnotherLabel}
      </button>

      {atMax && rules && (
        <p className="mt-2 text-xs text-stone">
          Maximum group size of {rules.maxCount} {rules.unitLabel}s reached.
        </p>
      )}
    </div>
  );
}
