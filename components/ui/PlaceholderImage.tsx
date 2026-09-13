import Image from "next/image";

interface PlaceholderImageProps {
  /** Always required — describes the intended final photograph, not just "placeholder". */
  alt: string;
  /** Small on-image caption, e.g. "Destination Reveal — 01". */
  label?: string;
  /** Once real photography is ready, pass its path/URL here — layout never changes. */
  src?: string;
  /** Omit for a container that already controls its own size (e.g. an absolute full-bleed hero). */
  aspectRatio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * CSS `object-position` value, e.g. "25% 40%". Defaults to centered.
   * Use when the subject isn't centered in frame and a crop (especially a
   * differently-proportioned one at another breakpoint) would otherwise cut
   * into it.
   */
  objectPosition?: string;
  /** Extra classes on the `<Image>` itself — e.g. a hover scale transform. Ignored when `src` is absent. */
  imageClassName?: string;
}

/**
 * The single point of truth for every image-shaped area on the site.
 * Absent `src`: labeled aspect-ratio placeholder box with a subtle woven
 * texture, on brand. Present `src`: next/image, identical footprint.
 */
export function PlaceholderImage({
  alt,
  label,
  src,
  aspectRatio,
  className = "",
  sizes = "100vw",
  priority = false,
  objectPosition,
  imageClassName = "",
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
          style={objectPosition ? { objectPosition } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`placeholder-texture relative flex items-end overflow-hidden border border-hairline bg-sage/50 ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      role="img"
      aria-label={alt}
    >
      {label && (
        <span className="m-4 text-[0.65rem] uppercase tracking-[0.14em] text-stone">
          {label}
        </span>
      )}
    </div>
  );
}
