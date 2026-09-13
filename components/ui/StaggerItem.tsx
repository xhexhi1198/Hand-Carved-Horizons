"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { revealUp, revealUpReduced } from "@/lib/motion";

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div className={className} variants={shouldReduceMotion ? revealUpReduced : revealUp}>
      {children}
    </motion.div>
  );
}
