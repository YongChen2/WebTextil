import { brand, tagline } from "@/config/site";
import { HeroTitle } from "./HeroTitle";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-paper">
      <div className="container-x flex min-h-[78svh] flex-col justify-center py-20 md:py-32">
        {/* Postupné objevení přes CSS (.hero-in), aby nečekalo na hydrataci a nezhoršilo LCP. */}
        <p className="eyebrow hero-in mb-8">Textilní dílna · Praha</p>
        <HeroTitle>
          <h1
            id="hero-title"
            className="hero-in font-serif text-[64px] leading-[0.95] tracking-[-0.02em] [animation-delay:0.15s] sm:text-[96px] lg:text-[140px] xl:text-[160px]"
          >
            {brand}
          </h1>
        </HeroTitle>
        <p className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-ink/70 [animation-delay:0.3s] md:text-2xl">
          {tagline}
        </p>
        <div className="hero-in mt-12 [animation-delay:0.45s]">
          <a href="#kontakt" className="btn">
            Poptat zakázku
          </a>
        </div>
      </div>
    </section>
  );
}
