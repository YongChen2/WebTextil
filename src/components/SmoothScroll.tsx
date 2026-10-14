"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const useReducedMotion = () =>
  useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

/** Lenis pohání GSAP ticker a každý posun hlásí ScrollTriggeru. */
function GsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

/**
 * Plynulý scroll celé stránky. ReactLenis se renderuje vždy (jinak by se
 * při změně preference přemontoval celý obsah); při prefers-reduced-motion
 * jen vypneme vyhlazování a zůstane nativní scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: !reduced,
        anchors: !reduced,
      }}
    >
      <GsapBridge />
      {children}
    </ReactLenis>
  );
}
