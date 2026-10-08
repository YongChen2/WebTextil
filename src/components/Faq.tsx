import { faq } from "@/config/site";
import { Reveal } from "./Reveal";
import { toneBg, type Tone } from "@/lib/tone";

export function Faq({ tone }: { tone: Tone }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`${toneBg[tone]} py-20 md:py-32`}>
      <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="section-title mt-6">
            Časté dotazy
          </h2>
        </Reveal>
        <div className="border-t border-ink">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-ink/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl tracking-[-0.02em] md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-gold after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-gold after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink/70">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
