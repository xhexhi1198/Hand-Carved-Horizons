"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { inViewSettings, revealUp, revealUpReduced } from "@/lib/motion";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewSettings}
      variants={shouldReduceMotion ? revealUpReduced : revealUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
