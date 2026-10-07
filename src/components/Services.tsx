import { services } from "@/data/content";
import { resolveSlot } from "@/lib/images";
import { ServicesScrolly } from "./ServicesScrolly";
import { Reveal } from "./Reveal";

export function Services() {
  const items = services.map((s) => ({ ...s, ...resolveSlot(s.slot, s.alt) }));

  return (
    <section id="sluzby" aria-labelledby="sluzby-title" className="bg-sand pt-20 md:pt-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Služby</p>
          <h2 id="sluzby-title" className="section-title mt-6 max-w-4xl">
            Tři řemesla, jedna dílna.
          </h2>
        </Reveal>
        <ServicesScrolly services={items} />
      </div>
    </section>
  );
}
