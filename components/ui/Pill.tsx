import type { ReactNode } from "react";

/**
 * The recurring pill/tag primitive seen throughout the brand reference —
 * full-rounded, thin hairline border, uppercase tracked label text.
 */
export function Pill({
  children,
  className = "",
  tone = "outline",
}: {
  children: ReactNode;
  className?: string;
  /** "outline" for cream backgrounds, "solid" (cream fill) for sage backgrounds. */
  tone?: "outline" | "solid";
}) {
  const toneClasses =
    tone === "solid"
      ? "bg-canvas border-hairline text-ink-soft"
      : "bg-transparent border-hairline text-ink-soft";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] sm:text-xs ${toneClasses} ${className}`}
    >
      {children}
    </span>
  );
}
