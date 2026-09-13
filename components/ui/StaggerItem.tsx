"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { revealUp, revealUpReduced } from "@/lib/motion";

export function StaggerItem({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={shouldReduceMotion ? revealUpReduced : revealUp}
    >
      {children}
    </motion.div>
  );
}
