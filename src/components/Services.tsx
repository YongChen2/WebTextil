import { services } from "@/data/content";
import { imageExists, imageSrc } from "@/lib/images";
import { ServicesScrolly } from "./ServicesScrolly";

export function Services() {
  const items = services.map((s) => ({
    ...s,
    src: imageSrc(s.image),
    available: imageExists(s.image),
  }));

  return (
    <section id="sluzby" aria-labelledby="sluzby-title" className="bg-sand pt-24 md:pt-40">
      <div className="container-x">
        <p className="eyebrow">Služby</p>
        <h2 id="sluzby-title" className="section-title mt-6 max-w-4xl">
          Tři řemesla, jedna dílna.
        </h2>
        <ServicesScrolly services={items} />
      </div>
    </section>
  );
}
