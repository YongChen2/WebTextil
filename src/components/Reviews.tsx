import { hasReviews, reviews } from "@/config/reviews";
import { toneBg, type Tone } from "@/lib/tone";
import { Reveal } from "./Reveal";

export function Reviews({ tone }: { tone: Tone }) {
  if (!hasReviews) return null;

  return (
    <section id="recenze" aria-labelledby="recenze-title" className={`${toneBg[tone]} py-20 md:py-32`}>
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Recenze</p>
          <h2 id="recenze-title" className="section-title mt-6">
            Co říkají klienti
          </h2>
        </Reveal>
        <ul className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {reviews.map((review, i) => (
            <li key={i}>
              <Reveal delay={i * 0.15}>
                <figure>
                  <blockquote className="font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
                    <p>„{review.quote}“</p>
                  </blockquote>
                  <span aria-hidden className="mt-8 block h-px w-12 bg-gold" />
                  <figcaption className="mt-6 text-sm leading-relaxed">
                    <span className="block font-medium">{review.name}</span>
                    <span className="block text-ink/60">{review.company}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
