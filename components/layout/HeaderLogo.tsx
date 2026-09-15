import Image from "next/image";

// Enlarged from the previous 48px mark for a bolder mark in both header
// states. Header.tsx trims its vertical padding to match, so the navbar's
// overall height is unchanged even though the emblem itself is bigger.
const SIZE = 60;

/**
 * The header's emblem crossfades between a white and a dark transparent PNG
 * as the bar switches from transparent-over-hero to its solid scrolled
 * state, instead of sitting on a light backing patch. Both images are
 * stacked and faded via opacity so the swap reads as one smooth transition
 * rather than a hard cut.
 */
export function HeaderLogo({ solid }: { solid: boolean }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: SIZE, height: SIZE }}>
      <Image
        src="/images/brand/logo-white.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        className={`object-contain transition-opacity duration-500 ease-in-out ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src="/images/brand/logo-dark.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        className={`object-contain transition-opacity duration-500 ease-in-out ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
