"use client";

import { Fragment } from "react";
import { X } from "lucide-react";
import type { MembershipTier } from "@/content/memberships";
import { APPLICATION_COPY, MEMBER_ADD_RULES, MEMBER_FIELDS, MEMBER_REQUIRED_KEYS } from "@/content/application";
import { FormField } from "../ui/FormField";
import { fieldError } from "./validation";
import type { MemberEntry } from "./types";

const copy = APPLICATION_COPY.applicationStep;

/**
 * A compact, spreadsheet-like member list — real columns on desktop (bare
 * inputs under a shared header row, no per-field label repeated on every
 * row), a lightweight stacked layout on mobile. Replaces the earlier
 * one-bordered-card-per-member design, which used far more vertical space.
 */
export function MembersTable({
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
  const restFields = fields.slice(1);
  const rules = MEMBER_ADD_RULES[tier.id];
  const totalPeople = 1 + members.length;
  const atMax = rules ? totalPeople >= rules.maxCount : false;
  const gridTemplate = `1.3fr ${fields.slice(1).map(() => "1fr").join(" ")} auto`;

  return (
    <div>
      <h3 className="font-display text-lg">{copy.membersLabel}</h3>
      <p className="mt-1 text-sm text-ink-soft">{copy.membersSubhead}</p>

      {/* Desktop: real columns, header once, bare compact inputs per row. */}
      <div className="mt-4 hidden sm:block">
        <div
          className="grid gap-3 border-b border-hairline pb-2 text-[0.62rem] uppercase tracking-[0.1em] text-stone"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {fields.map((field) => (
            <span key={field.key}>{field.label}</span>
          ))}
          <span aria-hidden="true" />
        </div>

        <div className="divide-y divide-hairline">
          {members.map((member, index) => (
            <Fragment key={member.id}>
              {rules && index + 2 === rules.includedCount + 1 && (
                <p className="pt-3 text-[0.68rem] text-brass">
                  Additional {rules.unitLabel}s from here — {rules.additionalContribution} contribution ·{" "}
                  {rules.additionalCredits} travel credits each
                </p>
              )}
              <div
                className="grid items-center gap-3 py-2.5"
                style={{ gridTemplateColumns: gridTemplate }}
              >
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
                      hideLabel
                      compact
                    />
                  );
                })}
                <button
                  type="button"
                  onClick={() => onRemove(member.id)}
                  aria-label={`Remove ${member.values.name || "member"}`}
                  className="text-stone transition-colors hover:text-brass"
                >
                  <X size={14} />
                </button>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Mobile: name full width, remaining fields paired, last odd one full width. */}
      <div className="mt-4 divide-y divide-hairline sm:hidden">
        {members.map((member, index) => {
          const nameField = fields[0];
          const nameValue = member.values[nameField.key] ?? "";
          const nameTouched = touched[member.id]?.[nameField.key];
          return (
            <div key={member.id} className="space-y-4 py-4 first:pt-0">
              {rules && index + 2 === rules.includedCount + 1 && (
                <p className="text-[0.68rem] text-brass">
                  Additional {rules.unitLabel}s from here — {rules.additionalContribution} contribution ·{" "}
                  {rules.additionalCredits} travel credits each
                </p>
              )}
              <FormField
                label={nameField.label}
                type={nameField.type}
                value={nameValue}
                onChange={(next) => onChange(member.id, nameField.key, next)}
                onBlur={() => onBlur(member.id, nameField.key)}
                required={MEMBER_REQUIRED_KEYS.includes(nameField.key)}
                error={nameTouched ? fieldError(nameField, nameValue, true) : undefined}
              />
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {restFields.map((field, i) => {
                  const required = MEMBER_REQUIRED_KEYS.includes(field.key);
                  const value = member.values[field.key] ?? "";
                  const isTouched = touched[member.id]?.[field.key];
                  const isLastOdd = restFields.length % 2 === 1 && i === restFields.length - 1;
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
                      className={isLastOdd ? "col-span-2" : undefined}
                    />
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => onRemove(member.id)}
                className="text-xs uppercase tracking-[0.14em] text-stone transition-colors hover:text-brass"
              >
                {copy.removeLabel}
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={atMax}
        className="mt-4 text-xs uppercase tracking-[0.14em] text-ink border-b border-ink pb-1 transition-colors duration-300 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-hairline disabled:text-stone/60"
      >
        + {copy.addAnotherLabel}
      </button>

      {atMax && rules && (
        <p className="mt-2 text-xs text-stone">
          Maximum group size of {rules.maxCount} {rules.unitLabel}s reached.
        </p>
      )}
    </div>
  );
}
