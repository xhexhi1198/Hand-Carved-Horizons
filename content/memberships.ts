/**
 * FINAL — client-approved membership figures and copy.
 * Exact figures only: no computed percentages/uplift are ever derived
 * from these numbers. Anything not yet confirmed by the client is the
 * literal string "To be confirmed" (or `null`, rendered as that string
 * by MembershipPricingTable / MembershipDetailModal) — never invented.
 */

export interface MembershipPricing {
  foundingContribution: string;
  travelCredits: string;
  travelCreditsQualifier?: string;
  expandCircle: string;
  creditsPerAddedMember: string;
  creditsPerAddedMemberQualifier?: string;
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
  /** Short editorial line shown directly under the title on the card. */
  shortLine: string;
  /** Small "who it's for" line shown on the card. Omitted — never invented — when not yet given. */
  forLine?: string;
  photography: MembershipPhotography;
  pricing: MembershipPricing;
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
    shortLine: "Travel together, across generations.",
    forLine: "For spouse, children, parents & parents-in-law",
    photography: {
      alt: "A multi-generational family walking together into the sea at sunset",
      src: "/images/membership/family.png",
    },
    pricing: {
      foundingContribution: "₹3,00,000",
      travelCredits: "₹3,30,000",
      expandCircle: "₹65,000 / member",
      creditsPerAddedMember: "To be confirmed",
    },
    cardBenefits: [
      "One shared family travel wallet",
      "Multi-generational travel",
      "Personal concierge support",
    ],
    ctaLabel: "Explore Family Membership →",
    eligiblePills: ["Spouse", "Children", "Parents", "Parents-in-law"],
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
    shortLine: "The best memories are shared.",
    forLine: "Up to 4 members",
    photography: {
      alt: "A group of friends watching the sunrise together from a mountain ridge",
      src: "/images/membership/friends.png",
    },
    pricing: {
      foundingContribution: "₹4,00,000",
      travelCredits: "₹4,80,000",
      travelCreditsQualifier: "up to 4 members",
      expandCircle: "₹1,00,000 / member",
      creditsPerAddedMember: "₹1,20,000",
      creditsPerAddedMemberQualifier: "max 10 members",
    },
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
    // Positioned as a more accessible entry point — never described as
    // cheap, budget, or affordable, per the client's explicit direction.
    shortLine: "A more accessible entry into the Hand Carved Horizons community.",
    // No "for" line has been given for this tier — omitted rather than invented.
    photography: {
      alt: "A group of young travellers sitting together by a forest stream, sharing a quiet moment",
      src: "/images/membership/student.png",
    },
    pricing: {
      foundingContribution: "₹1,50,000",
      travelCredits: "₹2,00,000",
      expandCircle: "₹50,000 / member",
      creditsPerAddedMember: "To be confirmed",
    },
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
