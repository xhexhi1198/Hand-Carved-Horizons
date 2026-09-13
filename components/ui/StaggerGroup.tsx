"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { inViewSettings, staggerContainer } from "@/lib/motion";

export function StaggerGroup({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewSettings}
      variants={shouldReduceMotion ? { hidden: {}, visible: {} } : staggerContainer(stagger)}
    >
      {children}
    </motion.div>
  );
}
