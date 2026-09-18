/**
 * ALL COPY IN THIS FILE IS PLACEHOLDER except REASON_COPY,
 * LAUNCH_COLLECTION_COPY and PORTFOLIO_COPY, which are client-approved
 * final content. See CONTENT_CHECKLIST.md before launch.
 */

// PLACEHOLDER
export const HERO_COPY = {
  eyebrow: "A Private Travel Membership",
  headlineLines: ["Some journeys", "aren't booked.", "They're carved."],
  subhead:
    "Hand Carved Horizons is a private circle for those who believe a journey is measured by who you shared it with.",
  primaryCta: "Apply for Membership",
  scrollHint: "Scroll to begin",
};

// FINAL — client-approved
// One merged, image-led emotional section (replaces the former separate
// "Why We Exist" list-based section and "We Curate Relationships" philosophy
// section). Sequence: distance → togetherness → memory.
export const REASON_COPY = {
  eyebrow: "Our Reason",
  headlineLines: ["Life moves fast.", "The people who matter shouldn't feel far away."],
  supportingCopy:
    "Careers take us across countries. Families live in different cities. Friends get busy with life. Hand-Carved Horizons creates a reason to come together again.",
  imageAlt:
    "Traditional cruise boats gathered on the calm water of a mountainous bay at golden hour",
  imageSrc: "/images/reason/harbor-bay.png",
  statement: "Because the best journeys bring us closer.",
  closingIdeas: [
    { title: "Time Together", description: "Life's greatest luxury" },
    { title: "Shared Memories", description: "Moments worth returning to" },
    { title: "Stronger Relationships", description: "The reason we travel" },
  ],
};

// PLACEHOLDER (text) — imagery below is client-supplied and final.
export const BENEFITS_COPY = {
  eyebrow: "Member Privileges",
  title: "What Membership Unlocks",
  subhead:
    "Beyond the journey itself, membership is a standing relationship with a team dedicated to how you travel.",
  items: [
    {
      title: "Dedicated Travel Concierge",
      description: "A single point of contact who already knows how your circle prefers to travel.",
      imageAlt: "Line illustration of a brass concierge bell beside an olive branch",
      imageSrc: "/images/benefits/illustrations/concierge.png",
    },
    {
      title: "Curated Itineraries",
      description: "Journeys shaped around your circle's occasions, not a fixed package.",
      imageAlt: "Line illustration of a hillside coastal village overlooking a bay",
      imageSrc: "/images/benefits/illustrations/itineraries.png",
    },
    {
      title: "Priority Access",
      description: "First access to new destinations and experiences as they are introduced.",
      imageAlt: "Line illustration of an aeroplane in flight above an island coastline",
      imageSrc: "/images/benefits/illustrations/priority-access.png",
    },
    {
      title: "Flexible Travel Credits",
      description: "Credits that move with your circle across trips, not tied to a single booking.",
      imageAlt: "Line illustration of travel documents beside an olive branch",
      imageSrc: "/images/benefits/illustrations/travel-credits.png",
    },
    {
      title: "Private Member Events",
      description: "Gatherings for members to meet, share stories, and shape future journeys.",
      imageAlt: "Line illustration of a dining table set beneath a tree overlooking the coast",
      imageSrc: "/images/benefits/illustrations/member-events.png",
    },
    {
      title: "Considered Details",
      description: "The quieter parts of a trip — arrival, pacing, privacy — handled before you ask.",
      imageAlt: "Line illustration of a sunhat resting beside an olive branch overlooking the coast",
      imageSrc: "/images/benefits/illustrations/considered-details.png",
    },
  ],
};

// FINAL — client-approved
export const LAUNCH_COLLECTION_COPY = {
  eyebrow: "Booking Opens October 8, 2026",
  title: "Our First Collection of Journeys",
  subhead:
    "Our first collection becomes available for booking from October 8, 2026 — marking the public launch of Hand Carved Horizons.",
  destinations: [
    "Vietnam",
    "Thailand",
    "Laos",
    "Cambodia",
    "Indonesia",
    "Sri Lanka",
    "Japan",
    "Maldives",
    "Dubai",
    "Abu Dhabi",
    "Qatar",
  ],
};

// FINAL — client-approved
// Each brand's `gradient` is a very light wash — mostly the site's own
// canvas tone, fading toward a faint hint of that brand's own logo colour
// in one corner. Kept as CSS strings here since they're one-off, per-brand
// values rather than sitewide design tokens.
export const PORTFOLIO_COPY = {
  eyebrow: "Member Benefits Across Our Travel Portfolio",
  title: "One membership. A wider world of experiences.",
  subhead:
    "First Circle Members enjoy priority access and exclusive privileges across our portfolio of travel brands.",
  brands: [
    {
      name: "HarborCare Journeys",
      description: "Premium foreign travel thoughtfully designed for senior travellers.",
      imageSrc: "/images/portfolio/harborcare.png",
      imageAlt: "HarborCare Journeys logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(15,107,99,0.12) 100%)",
    },
    {
      name: "Trails N Beyond",
      description: "Meaningful adventures created for parents and children.",
      imageSrc: "/images/portfolio/trails-n-beyond.png",
      imageAlt: "Trails N Beyond logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(31,107,58,0.12) 100%)",
    },
    {
      name: "The Expedition Studio",
      description: "Curated road-trip and self-drive journeys for motoring enthusiasts.",
      imageSrc: "/images/portfolio/expedition-studio.png",
      imageAlt: "The Expedition Studio logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(51,50,44,0.10) 100%)",
    },
    {
      name: "Xcursion Next",
      description: "Shared travel experiences for friend groups, communities, clubs and larger groups.",
      imageSrc: "/images/portfolio/xcursion-next.png",
      imageAlt: "Xcursion Next logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(18,58,99,0.12) 100%)",
    },
    {
      name: "Xtreme Horizons",
      description: "Adventure travel and high-energy outdoor experiences for thrill-seekers.",
      imageSrc: "/images/portfolio/xtreme-horizons.png",
      imageAlt: "Xtreme Horizons logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(31,122,61,0.12) 100%)",
    },
    {
      name: "The Reset Collective",
      description: "Curated retreats for professionals to disconnect, recharge and regain clarity.",
      imageSrc: "/images/portfolio/reset-collective.png",
      imageAlt: "The Reset Collective logo",
      gradient: "linear-gradient(135deg, var(--color-canvas-alt) 0%, var(--color-canvas-alt) 55%, rgba(107,93,79,0.12) 100%)",
    },
  ],
  privilegesLabel: "First Circle Privileges Across All Brands",
  privileges: [
    "Early access",
    "Priority booking",
    "Preferred availability",
    "Member-only pricing",
    "Dedicated concierge",
    "Special launch events",
  ],
};
