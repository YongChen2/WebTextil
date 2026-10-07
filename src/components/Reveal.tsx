"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Jednorázový fade-in s posunem 24 px při vstupu do viewportu.
 * Atribut data-motion zajistí, že při prefers-reduced-motion je obsah
 * zobrazen rovnou (viz globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-motion
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
