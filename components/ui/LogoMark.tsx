/**
 * Hand-drawn line-art recreation of the brand emblem (circular frame,
 * palms, coastline reflection, headland, sun, clouds) — a close
 * approximation of the client's reference logo, redrawn as inline SVG.
 */
export function LogoMark({ size = 72, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* frame */}
      <circle cx="120" cy="120" r="104" strokeWidth={1.8} />

      {/* clouds */}
      <path d="M52,54 a6,6 0 1 1 12,0 a7,7 0 1 1 14,0 a6,6 0 1 1 12,0 h-38 z" />
      <path d="M150,42 a5,5 0 1 1 10,0 a6,6 0 1 1 12,0 h-24 z" />

      {/* sun */}
      <circle cx="176" cy="60" r="9" />

      {/* headland / rock formation */}
      <path d="M148,152 L154,112 L164,122 L172,82 L181,102 L190,70 L199,96 L206,106 L212,152 Z" />

      {/* tall palm */}
      <path d="M60,152 C58,131 62,101 69,79" />
      <path d="M69,79 C56,71 41,73 31,83" />
      <path d="M69,79 C59,63 46,56 35,59" />
      <path d="M69,79 C71,59 66,46 59,36" />
      <path d="M69,79 C81,66 93,66 101,73" />

      {/* short palm */}
      <path d="M84,152 C82,140 86,120 92,104" />
      <path d="M92,104 C80,98 68,100 60,107" />
      <path d="M92,104 C84,92 74,86 64,86" />
      <path d="M92,104 C104,96 114,97 122,104" />

      {/* shoreline */}
      <path d="M18,166 C58,159 98,171 120,163 C150,153 182,169 222,161" />

      {/* water reflection */}
      <path d="M120,151 C118,141 122,131 120,121 C118,111 122,101 120,93" />
      <path d="M108,146 q12,-4 24,0" />
      <path d="M103,157 q17,-5 34,0" />
      <path d="M98,168 q22,-6 44,0" />
    </svg>
  );
}
