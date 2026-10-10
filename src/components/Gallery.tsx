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
        </Reveal>
        {galleryNote && (
          <Reveal delay={0.1}>
            <div role="note" className="mt-10 flex max-w-3xl gap-4 border-l-2 border-gold bg-ink/[0.04] p-6 md:p-8">
              <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 size-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 11v6" strokeLinecap="round" />
                <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
              </svg>
              <p className="leading-relaxed text-ink/75">
                <strong className="font-semibold text-ink">{galleryNote.lead}</strong> {galleryNote.text}
              </p>
            </div>
          </Reveal>
        )}
        <GalleryGrid items={items} />
        <Reveal className="mt-20 flex flex-col gap-8 border-t border-ink pt-10 md:mt-28 md:flex-row md:items-center md:justify-between">
          <h3 className="font-serif text-3xl leading-tight tracking-[-0.02em] md:text-4xl">{portfolioCta.title}</h3>
          <a href={portfolioCta.href} className="btn-outline self-start md:self-auto">
            {portfolioCta.button}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
