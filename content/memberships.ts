/**
 * FINAL — client-approved membership figures and copy.
 * Exact figures only: no computed percentages/uplift are ever derived
 * from these numbers. Anything not yet confirmed by the client is the
 * literal string "To be confirmed" (or `null`, rendered as that string
 * by MembershipPricingTable / MembershipDetailModal) — never invented.
 */

/** One row of a tier's pricing table — e.g. a group-size tier or a plan level. `travelCredits` is the literal string "—" for rows that don't carry a credits figure (e.g. "Maximum Group Size"). */
export interface MembershipPricingRow {
  label: string;
  contribution: string;
  travelCredits: string;
}

export interface MembershipPhotography {
  /** Always required — describes the intended final photograph, not just "placeholder". */
  alt: string;
  /** Once real photography is ready, set this to its path/URL. */
  src?: string;
}

export interface MembershipTier {
  id: "family" | "friendsCircle" | "student";
  title: string;
  /** The tier's name as used in the pre-filled WhatsApp "Apply" message, e.g. "Friends Circle Membership" (the card title alone, "Friends Circle", reads awkwardly mid-sentence). */
  whatsappName: string;
  /** Short editorial line shown directly under the title on the card. */
  shortLine: string;
  /** Small "who it's for" line shown on the card. Omitted — never invented — when not yet given. */
  forLine?: string;
  photography: MembershipPhotography;
  /** Column header for the pricing table's row-label column, e.g. "Membership Structure" or "Family Plan". */
  pricingTableLabel: string;
  /** The tier's full pricing table, shown in the detail modal. The card summarizes only the first row. */
  pricingRows: MembershipPricingRow[];
  /** Exactly the headline benefits shown on the card. null → not yet approved, render "To be confirmed". */
  cardBenefits: string[] | null;
  ctaLabel: string;
  /** null → eligibility not yet confirmed, render "To be confirmed". Shown in the detail modal. */
  eligiblePills: string[] | null;
  supportingCopy?: string;
  whyLabel: string;
  /** Fuller list shown in the detail modal. null → not yet confirmed. */
  whyTheyChooseIt: string[] | null;
}

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "family",
    title: "Family Membership",
    whatsappName: "Family Membership",
    shortLine: "Travel together, across generations.",
    forLine: "One membership for the entire family under a shared travel account.",
    photography: {
      alt: "An extended family relaxing together by a poolside bamboo pavilion in a forest resort",
      src: "/images/membership/family.png",
    },
    pricingTableLabel: "Family Plan",
    pricingRows: [
      { label: "Essential", contribution: "₹2,00,000", travelCredits: "₹2,30,000" },
      { label: "Preferred", contribution: "₹3,50,000", travelCredits: "₹4,10,000" },
      { label: "Signature", contribution: "₹5,00,000", travelCredits: "₹6,00,000" },
    ],
    cardBenefits: [
      "One shared family travel wallet",
      "Multi-generational travel",
      "Personal concierge support",
    ],
    ctaLabel: "Explore Family Membership →",
    eligiblePills: ["Member", "Spouse", "Children", "Parents", "Parents-in-law"],
    supportingCopy:
      "All registered family members can access and utilize the travel credits under the membership account.",
    whyLabel: "Why families love it",
    whyTheyChooseIt: [
      "One shared travel wallet for the entire family",
      "Perfect for multi-generational holidays",
      "Parents visiting children abroad",
      "Family celebrations and milestone journeys",
      "Greater flexibility in how credits are utilized",
    ],
  },
  {
    id: "friendsCircle",
    title: "Friends Circle",
    whatsappName: "Friends Circle Membership",
    shortLine: "The best memories are shared.",
    forLine: "For friends who love creating memories through travel.",
    photography: {
      alt: "Two friends kayaking together through limestone karst islands at golden hour",
      src: "/images/membership/friends.png",
    },
    pricingTableLabel: "Membership Structure",
    pricingRows: [
      { label: "Founding Circle Membership", contribution: "₹3,00,000", travelCredits: "₹3,50,000" },
      { label: "Additional Friend", contribution: "₹1,00,000", travelCredits: "₹1,15,000" },
      { label: "Maximum Group Size", contribution: "10 Friends", travelCredits: "—" },
    ],
    cardBenefits: [
      "One collective travel wallet",
      "Perfect for reunions & celebrations",
      "Dedicated group travel concierge",
    ],
    ctaLabel: "Explore Friends Circle →",
    eligiblePills: [
      "Lifelong Friends",
      "Reunion Groups",
      "Travel Clubs",
      "Business Partners",
      "Social Circles",
    ],
    whyLabel: "Why friends choose it",
    whyTheyChooseIt: [
      "One membership and a collective travel credit pool for the group",
      "Perfect for annual reunions and celebration trips",
      "Dedicated concierge support for group travel",
    ],
  },
  {
    id: "student",
    title: "Student Membership",
    whatsappName: "Student Membership",
    // Positioned as a more accessible entry point — never described as
    // cheap, budget, or affordable, per the client's explicit direction.
    shortLine: "A more accessible entry into the Hand Carved Horizons community.",
    forLine: "For students who travel and explore together.",
    photography: {
      alt: "A group of young travellers sitting together in a lively outdoor crowd, sharing the moment",
      src: "/images/membership/student.jpg",
    },
    pricingTableLabel: "Membership Structure",
    pricingRows: [
      { label: "Up to 5 Students", contribution: "₹1,50,000", travelCredits: "₹2,00,000" },
      { label: "Additional Student", contribution: "₹50,000", travelCredits: "₹60,000" },
      { label: "Maximum Group Size", contribution: "10 Students", travelCredits: "—" },
    ],
    // Not yet approved — rendered as "To be confirmed", never invented.
    cardBenefits: null,
    ctaLabel: "Explore Student Membership →",
    eligiblePills: null,
    whyLabel: "Why students choose it",
    whyTheyChooseIt: null,
  },
];

export const MEMBERSHIP_SECTION_COPY = {
  eyebrow: "Membership",
  title: "Three Circles. One Community.",
  subhead: "Choose the circle that reflects who you travel with.",
};

export const MEMBERSHIP_CTA_COPY = {
  title: "Not sure which circle is right for you?",
  body: "Speak with our membership team and we'll help you understand which membership best fits the way you travel.",
};

// FINAL — client-approved. Shown beneath every tier's pricing table in the
// detail modal — applies identically across all three circles.
export const MEMBERSHIP_PRICING_NOTE =
  "Travel credits are redeemable against eligible travel services and experiences as per membership terms and conditions.";

// FINAL — client-approved. The membership-specific "Apply for Membership"
// CTA at the foot of every detail modal — the one CTA on the site whose
// WhatsApp message names the tier. The "{membership}" token is replaced
// with the open tier's `whatsappName`. Its "WhatsApp Us" sibling CTA reuses
// the site-wide generic message (content/site.ts → CONTACT_INFO.whatsappDefaultMessage).
export const MEMBERSHIP_MODAL_CTA_COPY = {
  applyLabel: "Apply for Membership",
  applyMessageTemplate:
    "Hi, I'm interested in applying for the {membership} at Hand-Carved Horizons. Please share the next steps.",
};

// FINAL — client-approved. Previously the closing panel of the "Our First
// Collection of Journeys" section (content/home.ts); moved here, directly
// below the membership cards, per client request — not duplicated.
export const FIRST_CIRCLE_ADVANTAGE_COPY = {
  label: "First Circle Advantage — Before the Public Launch",
  points: [
    "Early visibility into upcoming departures",
    "Priority access to limited-capacity journeys",
    "Preferred booking windows",
    "Exclusive member pricing",
    "Dedicated concierge assistance",
  ],
};
