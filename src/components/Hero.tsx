import { brand, tagline } from "@/config/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-paper">
      <div className="container-x flex min-h-[78svh] flex-col justify-center py-24 md:py-32">
        <p className="eyebrow mb-8">Textilní dílna · Praha</p>
        <h1
          id="hero-title"
          className="font-serif text-[64px] leading-[0.95] tracking-tight sm:text-[96px] lg:text-[140px] xl:text-[160px]"
        >
          {brand}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-ink/70 md:text-2xl">{tagline}</p>
        <div className="mt-12">
          <a href="#kontakt" className="btn">
            Poptat zakázku
          </a>
        </div>
      </div>
    </section>
  );
}
