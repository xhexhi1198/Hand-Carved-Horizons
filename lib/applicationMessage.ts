import type { MembershipTier } from "@/content/memberships";
import { APPLICANT_FIELDS, MEMBER_FIELDS } from "@/content/application";
import { isMemberRowEmpty } from "@/components/application/validation";
import type { ApplicationState } from "@/components/application/types";

/** The pricing row currently in play — the tier's first row, or the chosen plan for Family. */
export function selectedPricingRow(tier: MembershipTier, state: ApplicationState) {
  if (tier.id === "family" && state.familyPlanId) {
    return tier.pricingRows.find((row) => row.label === state.familyPlanId) ?? tier.pricingRows[0];
  }
  return tier.pricingRows[0];
}

/**
 * The single structured summary used for both the WhatsApp message and the
 * email body — same content, two delivery channels.
 */
export function buildApplicationText(tier: MembershipTier, state: ApplicationState): string {
  const pricing = selectedPricingRow(tier, state);
  const applicantFields = APPLICANT_FIELDS[tier.id];
  const memberFields = MEMBER_FIELDS[tier.id];
  const membershipLine =
    tier.id === "family" && state.familyPlanId
      ? `${tier.whatsappName} — ${state.familyPlanId}`
      : tier.whatsappName;

  const lines = [
    "Hand Carved Horizons",
    "Membership Application",
    "",
    `Membership: ${membershipLine}`,
    `Contribution: ${pricing.contribution}`,
    `Travel Credits: ${pricing.travelCredits}`,
    "",
    "Applicant:",
    ...applicantFields
      .filter((field) => (state.applicant[field.key] ?? "").trim() !== "")
      .map((field) => `${field.label}: ${state.applicant[field.key]}`),
  ];

  const filledMembers = state.members.filter((member) => !isMemberRowEmpty(member));
  if (filledMembers.length > 0) {
    lines.push("", "Members:");
    filledMembers.forEach((member, index) => {
      const nameField = memberFields[0];
      const rest = memberFields
        .slice(1)
        .map((field) => member.values[field.key])
        .filter(Boolean)
        .join(", ");
      const name = member.values[nameField.key] || "—";
      lines.push(`${index + 1}. ${name}${rest ? ` (${rest})` : ""}`);
    });
  }

  return lines.join("\n");
}

export function buildApplicationEmailSubject(tier: MembershipTier, state: ApplicationState): string {
  const applicantName = state.applicant.fullName?.trim();
  return `HCH Membership Application — ${tier.whatsappName}${applicantName ? ` — ${applicantName}` : ""}`;
}
