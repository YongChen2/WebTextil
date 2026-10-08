import { brand, heroSubtitle, heroTrust } from "@/config/site";
import { HeroTitle } from "./HeroTitle";
import { toneBg, type Tone } from "@/lib/tone";

export function Hero({ tone }: { tone: Tone }) {
  return (
    <section aria-labelledby="hero-title" className={toneBg[tone]}>
      <div className="container-x flex min-h-[78svh] flex-col justify-center py-20 md:py-32">
        {/* Postupné objevení přes CSS (.hero-in), aby nečekalo na hydrataci a nezhoršilo LCP. */}
        <p className="eyebrow hero-in mb-8">{brand} · Praha</p>
        <HeroTitle>
          <h1
            id="hero-title"
            className="hero-in max-w-6xl font-serif text-[44px] leading-[1] tracking-[-0.02em] [animation-delay:0.15s] sm:text-[64px] lg:text-[88px] xl:text-[104px]"
          >
            Potisk triček, našívky a úpravy sak v&nbsp;Praze
          </h1>
        </HeroTitle>
        <p className="hero-in mt-8 max-w-xl text-lg leading-relaxed text-ink/70 [animation-delay:0.3s] md:text-2xl">
          {heroSubtitle}
        </p>
        {/* Oddělovač stojí před každou položkou; posunutí doleva + overflow-hidden
            ho skryje na začátku každého řádku, takže sedí i při zalomení. */}
        <div className="hero-in mt-6 overflow-hidden [animation-delay:0.38s]">
          <ul className="-ml-[17px] flex flex-wrap items-center gap-y-2 text-sm text-ink/70 md:text-base">
            {heroTrust.map((item) => (
              <li key={item} className="flex items-center gap-x-4 pr-4">
                <span aria-hidden className="h-3.5 w-px bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-in mt-12 flex flex-col gap-4 [animation-delay:0.45s] sm:flex-row">
          <a href="#kontakt" className="btn">
            Poptat zakázku
          </a>
          <a href="#sluzby" className="btn-outline">
            Prohlédnout služby
          </a>
        </div>
      </div>
    </section>
  );
}
