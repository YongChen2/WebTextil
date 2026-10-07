import { gallery } from "@/data/content";
import { imageExists, imageSrc } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";
import { Reveal } from "./Reveal";

export function Gallery() {
  const items = gallery.map((item) => ({
    ...item,
    src: imageSrc(item.image),
    available: imageExists(item.image),
  }));

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="bg-paper py-20 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Galerie</p>
          <h2 id="galerie-title" className="section-title mt-6">
            Realizace
          </h2>
        </Reveal>
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
