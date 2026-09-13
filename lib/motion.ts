/**
 * Shared animation tokens — the single place that enforces the "sparse,
 * slow, premium, cinematic" animation budget across the whole site.
 * Every animated component should import from here rather than inventing
 * its own easing/duration values.
 */

/** Slow, decisive cinematic ease-out. Used for nearly everything. */
export const EASE_CINEMATIC: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

export const DURATION = {
  fast: 0.35,
  /** Card-swap / modal-open speed — "slow and premium", per spec: 400-600ms. */
  carousel: 0.5,
  base: 0.7,
  slow: 1.1,
  hero: 1.6,
} as const;

/** Standard scroll-reveal: fade up, once, slightly before fully in view. */
export const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_CINEMATIC },
  },
};

/** Reduced-motion equivalent: instant, opacity-only. */
export const revealUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

/** Stagger container for groups of children (pills, list items, grid cells). */
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

export const inViewSettings = { once: true, margin: "-10% 0px -10% 0px" };

/** Cross-fade + slight rise, used for the membership tab/panel swap. */
export const panelSwap = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: EASE_CINEMATIC },
  },
};

export const panelSwapReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};

/** Backdrop fade for the membership detail modal. */
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_CINEMATIC } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE_CINEMATIC } },
};

/** Panel rise + fade for the membership detail modal. */
export const modalPanel = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.carousel, ease: EASE_CINEMATIC },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    transition: { duration: DURATION.fast, ease: EASE_CINEMATIC },
  },
};

export const modalPanelReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
};
