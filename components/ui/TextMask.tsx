"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_CINEMATIC } from "@/lib/motion";

/**
 * Text-mask reveal: the line rises from behind an overflow-hidden mask.
 * Used for the hero headline (runs on mount, not scroll-triggered).
 */
export function TextMask({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: DURATION.slow, ease: EASE_CINEMATIC, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
