import { reviews, showReviews } from "@/config/reviews";
import { Reveal } from "./Reveal";

export function Reviews() {
  if (!showReviews || reviews.length === 0) return null;

  return (
    <section id="recenze" aria-labelledby="recenze-title" className="bg-paper pb-20 md:pb-32">
      <div className="container-x">
        <div className="border-t border-ink/10 pt-20 md:pt-32">
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
      </div>
    </section>
  );
}
