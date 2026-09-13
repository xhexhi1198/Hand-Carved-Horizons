import { LogoMark } from "./LogoMark";
import { PlaneDivider } from "./PlaneDivider";

/**
 * Full lockup (emblem + wordmark + tagline) for the hero/footer, or the
 * compact mark alone for the sticky header once scrolled past the hero.
 */
export function Wordmark({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  if (variant === "mark") {
    return <LogoMark size={40} className={className} />;
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <LogoMark size={88} />
      <p className="mt-4 font-display text-3xl tracking-wide sm:text-4xl">Hand Carved Horizons</p>
      <PlaneDivider className="mt-4 w-40 sm:w-52" />
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-stone">
        Muses &amp; Memories
      </p>
    </div>
  );
}
