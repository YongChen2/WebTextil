import { priceNote, showPrices, visiblePriceCards } from "@/config/site";
import { Reveal } from "./Reveal";

const czk = new Intl.NumberFormat("cs-CZ");

export function Prices() {
  if (!showPrices) return null;

  return (
    <section id="ceny" aria-labelledby="ceny-title" className="bg-paper py-20 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Ceny</p>
          <h2 id="ceny-title" className="section-title mt-6">
            Orientační ceny
          </h2>
        </Reveal>
        <ul className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-3 lg:gap-10">
          {visiblePriceCards.map((card, i) => (
            <li key={card.title}>
              <Reveal delay={i * 0.15} className="border-t border-ink pt-6">
                <h3 className="font-serif text-3xl tracking-[-0.02em]">{card.title}</h3>
                <dl className="mt-8 divide-y divide-ink/10">
                  {card.items.map((item) => (
                    <div key={item.label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="text-ink/70">{item.label}</dt>
                      <dd className="shrink-0 font-medium whitespace-nowrap">od {czk.format(item.from!)} Kč</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-ink/60">{priceNote}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
