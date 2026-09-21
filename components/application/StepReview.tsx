"use client";

import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_FIELDS, APPLICATION_COPY } from "@/content/application";
import { selectedPricingRow } from "@/lib/applicationMessage";
import type { ApplicationState } from "./types";

const copy = APPLICATION_COPY.reviewStep;

export function StepReview({
  tier,
  state,
  onEditStep,
  termsAccepted,
  onToggleTerms,
  onOpenTermsPanel,
}: {
  tier: MembershipTier;
  state: ApplicationState;
  onEditStep: (step: number) => void;
  termsAccepted: boolean;
  onToggleTerms: (value: boolean) => void;
  onOpenTermsPanel: () => void;
}) {
  const pricing = selectedPricingRow(tier, state);
  const applicantFields = APPLICANT_FIELDS[tier.id];
  const membershipTitle =
    tier.id === "family" && state.familyPlanId ? `${tier.title} — ${state.familyPlanId}` : tier.title;

  return (
    <div className="space-y-8">
      <section>
        <SectionHeading label={copy.membershipLabel} onEdit={() => onEditStep(0)} />
        <p className="mt-3 font-display text-xl">{membershipTitle}</p>
        <div className="mt-4 flex divide-x divide-hairline bg-sage/50 px-6 py-5 sm:px-8">
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

      <section>
        <SectionHeading label={copy.applicantLabel} onEdit={() => onEditStep(0)} />
        <dl className="mt-3 divide-y divide-hairline border-y border-hairline">
          {applicantFields.map((field) => (
            <div key={field.key} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
              <dt className="text-xs uppercase tracking-[0.12em] text-stone">{field.label}</dt>
              <dd className="text-right text-ink">{state.applicant[field.key] || "—"}</dd>
            </div>
          ))}
        </dl>
      </section>

      {state.members.length > 0 && (
        <section>
          <SectionHeading label={copy.membersLabel} onEdit={() => onEditStep(1)} />
          <ul className="mt-3 space-y-2">
            {state.members.map((member, index) => (
              <li key={member.id} className="flex items-baseline gap-3">
                <span className="text-xs text-stone">{String(index + 1).padStart(2, "0")}</span>
                <span>{member.values.name || "—"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <label className="flex items-start gap-3 border-t border-hairline pt-6 text-sm text-ink-soft">
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
