"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Jednorázový fade-in s posunem 30 px při vstupu do viewportu (GSAP ScrollTrigger).
 * Výchozí skrytý stav drží CSS ([data-reveal] v globals.css), takže obsah
 * po hydrataci neprobleskne. Atribut data-motion zajistí, že při
 * prefers-reduced-motion nebo bez JS je obsah zobrazen rovnou.
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
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <div ref={ref} data-motion data-reveal className={className}>
      {children}
    </div>
  );
}
