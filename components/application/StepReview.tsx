"use client";

import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_FIELDS, APPLICATION_COPY } from "@/content/application";
import { selectedPricingRow } from "@/lib/applicationMessage";
import { isMemberRowEmpty } from "./validation";
import type { ApplicationState } from "./types";

const copy = APPLICATION_COPY.reviewStep;

export function StepReview({
  tier,
  state,
  onEdit,
  termsAccepted,
  onToggleTerms,
  onOpenTermsPanel,
}: {
  tier: MembershipTier;
  state: ApplicationState;
  onEdit: () => void;
  termsAccepted: boolean;
  onToggleTerms: (value: boolean) => void;
  onOpenTermsPanel: () => void;
}) {
  const pricing = selectedPricingRow(tier, state);
  const applicantFields = APPLICANT_FIELDS[tier.id];
  const filledMembers = state.members.filter((member) => !isMemberRowEmpty(member));

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-stone">{copy.title}</p>

      <section className="mt-4">
        <p className="text-xs uppercase tracking-[0.12em] text-stone">{tier.title}</p>
        {tier.id === "family" && state.familyPlanId && (
          <p className="mt-1 font-display text-xl">{state.familyPlanId}</p>
        )}
        <div className="mt-3 flex divide-x divide-hairline bg-sage/50 px-6 py-5 sm:px-8">
          <div className="flex-1 pr-4">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-stone">
              {copy.contributionLabel}
            </p>
            <p className="mt-1 font-display text-xl">{pricing.contribution}</p>
          </div>
          <div className="flex-1 pl-4 sm:pl-6">
            <p className="text-[0.65rem] uppercase tracking-[0.12em] text-stone">
              {copy.travelCreditsLabel}
            </p>
            <p className="mt-1 font-display text-xl">{pricing.travelCredits}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 border-t border-hairline pt-6">
        <SectionHeading label={copy.detailsLabel} onEdit={onEdit} />
        <div className="mt-3 space-y-1 text-ink">
          {applicantFields.map((field) => {
            const value = state.applicant[field.key];
            if (!value) return null;
            return <p key={field.key}>{value}</p>;
          })}
        </div>
      </section>

      <section className="mt-8 border-t border-hairline pt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.14em] text-stone">{copy.membersLabel}</p>
          <div className="flex items-center gap-4">
            {filledMembers.length > 0 && (
              <span className="text-[0.68rem] uppercase tracking-[0.12em] text-stone">
                {filledMembers.length} {filledMembers.length === 1 ? "Member" : "Members"}
              </span>
            )}
            <button
              type="button"
              onClick={onEdit}
              className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-brass"
            >
              {copy.editLabel}
            </button>
          </div>
        </div>

        {filledMembers.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {filledMembers.map((member, index) => (
              <li key={member.id} className="flex items-baseline gap-3">
                <span className="text-xs text-stone">{String(index + 1).padStart(2, "0")}</span>
                <span>{member.values.name || "—"}</span>
                {tier.id === "family" && member.values.relationship && (
                  <span className="text-sm text-stone">{member.values.relationship}</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-stone">No members added.</p>
        )}
      </section>

      <label className="mt-8 flex items-start gap-3 border-t border-hairline pt-6 text-sm text-ink-soft">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(event) => onToggleTerms(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brass"
        />
        <span>
          {copy.termsPrefix}{" "}
          <button
            type="button"
            onClick={onOpenTermsPanel}
            className="text-ink underline decoration-hairline underline-offset-2 transition-colors hover:text-brass"
          >
            {copy.termsLinkLabel}
          </button>
          .
        </span>
      </label>
    </div>
  );
}

function SectionHeading({ label, onEdit }: { label: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xs uppercase tracking-[0.14em] text-stone">{label}</p>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-brass"
      >
        {APPLICATION_COPY.reviewStep.editLabel}
      </button>
    </div>
  );
}
