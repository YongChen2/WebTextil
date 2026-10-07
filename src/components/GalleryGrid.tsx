"use client";

import { useState } from "react";
import { categoryLabels, type Category, type GalleryItem } from "@/data/content";
import { Media } from "./Media";

export type GalleryItemWithImage = GalleryItem & { src: string; available: boolean };

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
              className={`rounded-none border px-5 py-2.5 text-sm transition-colors ${
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
          <li key={item.image}>
            <figure>
              <div className="relative aspect-square overflow-hidden">
                <Media
                  src={item.src}
                  file={item.image}
                  alt={item.alt}
                  available={item.available}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
              <figcaption className="mt-3 text-xs tracking-[0.15em] text-ink/60 uppercase">
                {categoryLabels[item.category]}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
