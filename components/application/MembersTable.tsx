"use client";

import { Fragment, useState } from "react";
import { Plus, X } from "lucide-react";
import type { MembershipTier } from "@/content/memberships";
import {
  APPLICATION_COPY,
  MEMBER_ADD_RULES,
  MEMBER_FIELDS,
  MEMBER_REQUIRED_KEYS,
  type ApplicationFieldConfig,
} from "@/content/application";
import { FormField } from "../ui/FormField";
import { fieldError } from "./validation";
import type { MemberEntry } from "./types";

const copy = APPLICATION_COPY.applicationStep;

function formatFieldValue(field: ApplicationFieldConfig, value: string): string {
  if (!value) return "";
  if (field.type === "date") {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  return value;
}

/**
 * A compact, spreadsheet-like member list on desktop; a lightweight
 * one-expanded-at-a-time accordion on mobile, grouped per person instead of
 * a flat stack of loose fields. The two are fully separate render paths —
 * the desktop block below is unchanged from before this mobile redesign.
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

  // Mobile accordion state only — which member is currently expanded. A
  // freshly added member becomes the expanded one; removing the expanded
  // member falls back to whichever is now last. Adjusted during render
  // (React's recommended pattern for "derived state that resets when a
  // prop changes") rather than in an effect, so there's no extra render pass.
  const [expandedId, setExpandedId] = useState<string | null>(members[0]?.id ?? null);
  const [lastSeenCount, setLastSeenCount] = useState(members.length);
  if (members.length !== lastSeenCount) {
    if (members.length > lastSeenCount) {
      setExpandedId(members[members.length - 1].id);
    } else if (expandedId !== null && !members.some((member) => member.id === expandedId)) {
      setExpandedId(members.length > 0 ? members[members.length - 1].id : null);
    }
    setLastSeenCount(members.length);
  }

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

        <button
          type="button"
          onClick={onAdd}
          disabled={atMax}
          className="mt-4 text-xs uppercase tracking-[0.14em] text-ink border-b border-ink pb-1 transition-colors duration-300 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:border-hairline disabled:text-stone/60"
        >
          + {copy.addAnotherLabel}
        </button>
      </div>

      {/* Mobile: one grouped, labeled member at a time — a lightweight
          accordion (thin dividers only, no cards/shadows). Only the most
          recently added or edited member stays expanded; the rest collapse
          into a one-line summary. */}
      <div className="mt-4 sm:hidden">
        <div className="divide-y divide-hairline">
        {members.map((member, index) => {
          const nameField = fields[0];
          const nameValue = member.values[nameField.key] ?? "";
          const memberNumber = String(index + 1).padStart(2, "0");
          const isExpanded = members.length === 1 || expandedId === member.id;
          const canRemove = members.length > 1;

          if (!isExpanded) {
            const summary = restFields
              .map((field) => formatFieldValue(field, member.values[field.key] ?? ""))
              .filter(Boolean)
              .join(" · ");
            return (
              <div key={member.id} className="py-3 first:pt-0">
                <p className="text-[0.62rem] uppercase tracking-[0.1em] text-stone">
                  {copy.memberLabel} {memberNumber}
                </p>
                {nameValue ? (
                  <>
                    <p className="mt-1.5 text-sm text-ink">{nameValue}</p>
                    {summary && <p className="mt-0.5 text-xs text-stone">{summary}</p>}
                  </>
                ) : (
                  <p className="mt-1.5 text-sm italic text-stone">{copy.memberIncompleteHint}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setExpandedId(member.id)}
                    aria-label={`Edit ${copy.memberLabel.toLowerCase()} ${memberNumber}`}
                    className="text-[0.62rem] uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-brass"
                  >
                    {APPLICATION_COPY.reviewStep.editLabel}
                  </button>
                  {canRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(member.id)}
                      aria-label={`Remove ${copy.memberLabel.toLowerCase()} ${memberNumber}`}
                      className="text-[0.62rem] uppercase tracking-[0.1em] text-stone transition-colors hover:text-brass"
                    >
                      {copy.removeLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={member.id} className="py-3 first:pt-0">
              <div className="flex items-center justify-between">
                <p className="text-[0.62rem] uppercase tracking-[0.1em] text-stone">
                  {copy.memberLabel} {memberNumber}
                </p>
                {canRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(member.id)}
                    aria-label={`Remove ${copy.memberLabel.toLowerCase()} ${memberNumber}`}
                    className="text-[0.62rem] uppercase tracking-[0.1em] text-stone transition-colors hover:text-brass"
                  >
                    {copy.removeLabel}
                  </button>
                )}
              </div>

              {/* Unlike the desktop table (a persistent list, so a one-time
                  "additional pricing starts here" divider is enough), only
                  one member is ever visible at a time here — so this shows
                  on every qualifying row, not just the first, or a member
                  further down would carry no pricing context at all. */}
              {rules && index + 2 > rules.includedCount && (
                <p className="mt-2 text-[0.65rem] text-brass">
                  Additional {rules.unitLabel} — {rules.additionalContribution} contribution ·{" "}
                  {rules.additionalCredits} travel credits
                </p>
              )}

              <div className="mt-2.5 space-y-3">
                <FormField
                  label={nameField.label}
                  type={nameField.type}
                  value={nameValue}
                  onChange={(next) => onChange(member.id, nameField.key, next)}
                  onBlur={() => onBlur(member.id, nameField.key)}
                  required={MEMBER_REQUIRED_KEYS.includes(nameField.key)}
                  error={
                    touched[member.id]?.[nameField.key]
                      ? fieldError(nameField, nameValue, true)
                      : undefined
                  }
                  compact
                />
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
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
                        compact
                        // Paired fields (e.g. Relationship's <select> next to
                        // Date of Birth's native <input type="date">) can
                        // render at different intrinsic heights depending on
                        // the browser's own control chrome — force them to
                        // match so labels, inputs, and underlines all sit on
                        // the same lines. The lone full-width field doesn't
                        // need it.
                        inputClassName={!isLastOdd ? "h-9" : undefined}
                        className={isLastOdd ? "col-span-2" : undefined}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={atMax}
          className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-brass transition-colors duration-200 hover:text-ink disabled:cursor-not-allowed disabled:text-stone/50"
        >
          <Plus size={13} aria-hidden="true" />
          {copy.addAnotherLabel}
        </button>
      </div>

      {atMax && rules && (
        <p className="mt-2 text-xs text-stone">
          Maximum group size of {rules.maxCount} {rules.unitLabel}s reached.
        </p>
      )}
    </div>
  );
}
