import { gallery, galleryNote, portfolioCta } from "@/data/content";
import { resolveSlot } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";
import { Reveal } from "./Reveal";
import { toneBg, type Tone } from "@/lib/tone";

export function Gallery({ tone }: { tone: Tone }) {
  const items = gallery.map((item) => ({ ...item, ...resolveSlot(item.slot, item.alt) }));

  return (
    <section id="galerie" aria-labelledby="galerie-title" className={`${toneBg[tone]} py-20 md:py-32`}>
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Galerie</p>
          <h2 id="galerie-title" className="section-title mt-6">
            Inspirace
          </h2>
          {galleryNote && <p className="mt-6 text-sm text-ink/60">{galleryNote}</p>}
        </Reveal>
        <GalleryGrid items={items} />
        <Reveal className="mt-20 grid gap-8 border-t border-ink pt-10 md:mt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <h3 className="font-serif text-3xl leading-tight tracking-[-0.02em] md:text-4xl">{portfolioCta.title}</h3>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink/70">{portfolioCta.text}</p>
            <a href={portfolioCta.href} className="btn-outline mt-8">
              {portfolioCta.button}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
