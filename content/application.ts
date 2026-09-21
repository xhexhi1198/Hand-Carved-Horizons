import type { MembershipTierId } from "./memberships";

/**
 * Field configuration for the membership application form
 * (components/application/*). Membership-specific fields are driven from
 * here rather than duplicated per tier in the components themselves.
 */

export type ApplicationFieldType = "text" | "tel" | "email" | "number" | "date" | "select";

export interface ApplicationFieldConfig {
  key: string;
  label: string;
  type: ApplicationFieldType;
  autoComplete?: string;
  /** "select" fields only. */
  options?: string[];
}

// The primary applicant's own details, shown on the single application step.
// Kept deliberately minimal — only what HCH needs to follow up.
export const APPLICANT_FIELDS: Record<MembershipTierId, ApplicationFieldConfig[]> = {
  student: [
    { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
    { key: "mobile", label: "Mobile Number", type: "tel", autoComplete: "tel" },
    { key: "email", label: "Email Address", type: "email", autoComplete: "email" },
    { key: "institution", label: "Institution / College", type: "text" },
  ],
  friendsCircle: [
    { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
    { key: "mobile", label: "Mobile Number", type: "tel", autoComplete: "tel" },
    { key: "email", label: "Email Address", type: "email", autoComplete: "email" },
  ],
  family: [
    { key: "fullName", label: "Full Name", type: "text", autoComplete: "name" },
    { key: "mobile", label: "Mobile Number", type: "tel", autoComplete: "tel" },
    { key: "email", label: "Email Address", type: "email", autoComplete: "email" },
  ],
};

// Name, mobile, email only — Institution is a nice-to-have, never required.
export const APPLICANT_REQUIRED_KEYS: Record<MembershipTierId, string[]> = {
  student: ["fullName", "mobile", "email"],
  friendsCircle: ["fullName", "mobile", "email"],
  family: ["fullName", "mobile", "email"],
};

// One added member's details — step 2. Family's "Relationship" options come
// from that tier's own `eligiblePills` (minus "Member", the applicant).
export const MEMBER_FIELDS: Record<MembershipTierId, ApplicationFieldConfig[]> = {
  student: [
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "institution", label: "Institution", type: "text" },
    { key: "mobile", label: "Mobile Number", type: "tel" },
  ],
  friendsCircle: [
    { key: "name", label: "Name", type: "text" },
    { key: "mobile", label: "Mobile Number", type: "tel" },
    { key: "email", label: "Email Address", type: "email" },
  ],
  family: [
    { key: "name", label: "Name", type: "text" },
    { key: "relationship", label: "Relationship", type: "select", options: ["Spouse", "Children", "Parents", "Parents-in-law"] },
    { key: "dob", label: "Date of Birth", type: "date" },
    { key: "mobile", label: "Mobile Number", type: "tel" },
  ],
};

/** Only a member's name is required to keep an added row — everything else is optional at application stage. */
export const MEMBER_REQUIRED_KEYS = ["name"];

/** How many members a tier's founding contribution already covers, the cap, and what each member beyond that adds. Omitted entirely for tiers (Family) with no per-member pricing. */
export interface MemberAddRules {
  includedCount: number;
  maxCount: number;
  additionalContribution: string;
  additionalCredits: string;
  unitLabel: string;
}

export const MEMBER_ADD_RULES: Partial<Record<MembershipTierId, MemberAddRules>> = {
  student: {
    includedCount: 5,
    maxCount: 10,
    additionalContribution: "₹50,000",
    additionalCredits: "₹60,000",
    unitLabel: "student",
  },
  friendsCircle: {
    includedCount: 1,
    maxCount: 10,
    additionalContribution: "₹1,00,000",
    additionalCredits: "₹1,15,000",
    unitLabel: "friend",
  },
};

export const APPLICATION_COPY = {
  eyebrow: "Application for Membership",
  steps: ["Application", "Review & Send"],
  applicationStep: {
    planLabel: "Choose Your Plan",
    detailsLabel: "Your Details",
    membersLabel: "Members",
    membersSubhead: "Add the people included in this membership.",
    addAnotherLabel: "Add Another Member",
    removeLabel: "Remove",
    reviewCta: "Review Application",
  },
  reviewStep: {
    title: "Application Summary",
    detailsLabel: "Your Details",
    membersLabel: "Members",
    editLabel: "Edit",
    contributionLabel: "Contribution",
    travelCreditsLabel: "Travel Credits",
    termsPrefix: "I confirm that the information provided is correct and I agree to the",
    termsLinkLabel: "Membership Terms & Conditions",
  },
  submit: {
    sendLabel: "Send Application",
    emailAlternativeLabel: "Prefer email instead",
  },
  nav: {
    back: "Back",
  },
  closeConfirm: {
    message: "Discard this application? The details you've entered will be lost.",
    keepEditing: "Keep Editing",
    discard: "Discard",
  },
} as const;

// PLACEHOLDER — generic membership terms pending legal review. Not client
// -approved copy; replace before launch. See CONTENT_CHECKLIST.md.
export const MEMBERSHIP_TERMS_COPY = {
  title: "Membership Terms & Conditions",
  note: "Draft — pending legal review, shown here so the application flow can reference real terms once approved.",
  sections: [
    {
      heading: "Membership & Eligibility",
      body: "Submitting this application does not guarantee membership. All applications are subject to review and confirmation by Hand Carved Horizons.",
    },
    {
      heading: "Contribution & Travel Credits",
      body: "The founding contribution and any additional-member contribution are payable as advised by the membership team once your application is reviewed. Travel credits are redeemable against eligible travel services and experiences under the membership account, and are non-transferable outside it.",
    },
    {
      heading: "Adding Members",
      body: "Members may be added up to the maximum group size stated for your membership, subject to the additional-member contribution then in effect.",
    },
    {
      heading: "Cancellations & Changes",
      body: "Cancellation, refund, and credit-validity terms will be confirmed in writing at the time your membership is approved.",
    },
  ],
} as const;
