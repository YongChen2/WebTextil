"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { categoryLabels, type Category, type GalleryItem } from "@/data/content";
import { Media } from "./Media";

export type GalleryItemWithImage = GalleryItem & { src: string; available: boolean; label: string };

type Filter = "vse" | Category;

const filters: { id: Filter; label: string }[] = [
  { id: "vse", label: "Vše" },
  ...(Object.keys(categoryLabels) as Category[]).map((id) => ({ id, label: categoryLabels[id] })),
];

export function GalleryGrid({ items }: { items: GalleryItemWithImage[] }) {
  const [active, setActive] = useState<Filter>("vse");
  const visible = active === "vse" ? items : items.filter((item) => item.category === active);

  return (
    <>
      <div role="group" aria-label="Filtr realizací" className="mt-12 flex flex-wrap gap-2">
        {filters.map((f) => {
          const pressed = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(f.id)}
              className={`press rounded-none border px-5 py-2.5 text-sm ${
                pressed
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 bg-transparent text-ink hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Zobrazeno {visible.length} realizací
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {visible.map((item) => (
          <GalleryCard key={item.slot} item={item} />
        ))}
      </ul>
    </>
  );
}

/** Obrázek při scrollu plynule roste z 0.96 na 1 a zvyšuje průhlednost (jen transform + opacity). */
function GalleryCard({ item }: { item: GalleryItemWithImage }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 55%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <li ref={ref}>
      <figure>
        {/* Animuje se jen obrázek; popisek zůstává plně čitelný. */}
        <motion.div data-motion style={{ scale, opacity }} className="relative aspect-square overflow-hidden">
          <Media
            src={item.src}
            file={item.label}
            alt={item.alt}
            available={item.available}
            sizes="(min-width: 1024px) 33vw, 50vw"
          />
        </motion.div>
        <figcaption className="mt-3 text-xs tracking-[0.15em] text-ink/60 uppercase">
          {categoryLabels[item.category]}
        </figcaption>
      </figure>
    </li>
  );
}
