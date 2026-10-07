import { gallery } from "@/data/content";
import { imageExists, imageSrc } from "@/lib/images";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery() {
  const items = gallery.map((item) => ({
    ...item,
    src: imageSrc(item.image),
    available: imageExists(item.image),
  }));

  return (
    <section id="galerie" aria-labelledby="galerie-title" className="bg-paper py-24 md:py-40">
      <div className="container-x">
        <p className="eyebrow">Galerie</p>
        <h2 id="galerie-title" className="section-title mt-6">
          Realizace
        </h2>
        <GalleryGrid items={items} />
      </div>
    </section>
  );
}
