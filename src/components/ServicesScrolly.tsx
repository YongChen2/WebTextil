"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Service } from "@/data/content";
import { Media } from "./Media";

export type ServiceWithImage = Service & { src: string; available: boolean };

// Šířka přechodu (podíl scrollu) – širší okno = plynulejší crossfade bez tvrdého přepnutí.
const FADE = 0.15;

/**
 * Vstupní/výstupní rozsah pro i-tý obrázek. Hranice mezi službami leží
 * v polovině mezi středy textových bloků: (i + 0.5) / (n - 1).
 */
function ranges(i: number, n: number) {
  const boundary = (k: number) => (k + 0.5) / (n - 1);
  if (n === 1) return { input: [0, 1], opacity: [1, 1], scale: [1, 1] };
  if (i === 0) {
    const b = boundary(0);
    return { input: [0, b - FADE, b + FADE], opacity: [1, 1, 0], scale: [1, 1, 1.03] };
  }
  if (i === n - 1) {
    const b = boundary(i - 1);
    return { input: [b - FADE, b + FADE, 1], opacity: [0, 1, 1], scale: [1.05, 1, 1] };
  }
  const a = boundary(i - 1);
  const b = boundary(i);
  return {
    input: [a - FADE, a + FADE, b - FADE, b + FADE],
    opacity: [0, 1, 1, 0],
    scale: [1.05, 1, 1, 1.03],
  };
}

function StickyImage({
  service,
  index,
  total,
  progress,
}: {
  service: ServiceWithImage;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const r = ranges(index, total);
  const opacity = useTransform(progress, r.input, r.opacity);
  const scale = useTransform(progress, r.input, r.scale);

  return (
    <motion.div
      className="absolute inset-0 will-change-[opacity,transform]"
      style={{ opacity, scale }}
    >
      <Media
        src={service.src}
        file={service.image}
        alt={service.alt}
        available={service.available}
        sizes="50vw"
        eager={index === 0}
      />
    </motion.div>
  );
}

export function ServicesScrolly({ services }: { services: ServiceWithImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={trackRef} className="relative grid gap-x-20 lg:grid-cols-2 lg:motion-reduce:grid-cols-1">
      {/* Levý sloupec: statické texty. Na mobilu a při omezeném pohybu má každá služba vlastní obrázek. */}
      <div>
        {services.map((service, i) => (
          <article
            key={service.id}
            id={`sluzba-${service.id}`}
            aria-labelledby={`sluzba-${service.id}-title`}
            className="py-16 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-24 lg:motion-reduce:grid lg:motion-reduce:min-h-0 lg:motion-reduce:grid-cols-2 lg:motion-reduce:items-center lg:motion-reduce:gap-20"
          >
            <div className="relative mb-10 aspect-[4/5] w-full overflow-hidden lg:hidden lg:motion-reduce:order-2 lg:motion-reduce:mb-0 lg:motion-reduce:block">
              <Media
                src={service.src}
                file={service.image}
                alt={service.alt}
                available={service.available}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div>
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <span aria-hidden className="mt-4 block h-px w-12 bg-gold" />
              <h3
                id={`sluzba-${service.id}-title`}
                className="mt-6 font-serif text-4xl leading-tight tracking-[-0.02em] md:text-6xl"
              >
                {service.title}
              </h3>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">{service.lead}</p>
              <ul className="mt-8 max-w-lg divide-y divide-ink/10 border-y border-ink/10">
                {service.params.map((param) => (
                  <li key={param} className="py-3 text-sm">
                    {param}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {/* Pravý sloupec: sticky obrázek s crossfadem podle pozice scrollu (jen desktop bez omezení pohybu). */}
      <div className="hidden lg:block lg:motion-reduce:hidden">
        <div className="sticky top-0 flex h-svh items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-placeholder">
            {services.map((service, i) => (
              <StickyImage
                key={service.id}
                service={service}
                index={i}
                total={services.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
