import Image from "next/image";

/**
 * The client's actual brand emblem (circular frame, palms, coastline
 * reflection, headland, sun, clouds) — a supplied transparent PNG.
 * Previously a hand-drawn SVG approximation of the reference logo; that
 * approximation is retired now that the real artwork is available.
 */
export function LogoMark({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/brand/logo.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}
