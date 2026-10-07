"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Velký nadpis hera se při odscrollování jemně ztlumí a posune (jen opacity + transform). */
export function HeroTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <motion.div ref={ref} data-motion style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
