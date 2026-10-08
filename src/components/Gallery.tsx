import { galleryNote } from "@/config/site";
import { gallery } from "@/data/content";
import { resolveSlot } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";
import { Reveal } from "./Reveal";

export function Gallery() {
  const items = gallery.map((item) => ({ ...item, ...resolveSlot(item.slot, item.alt) }));

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="bg-paper py-20 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Galerie</p>
          <h2 id="galerie-title" className="section-title mt-6">
            Inspirace
          </h2>
          {galleryNote && <p className="mt-6 text-sm text-ink/60">{galleryNote}</p>}
        </Reveal>
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
