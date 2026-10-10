import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { praxe } from "@/data/content";

export const metadata: Metadata = {
  title: "Praxe pro studenty a spolupráce se školami",
  description: praxe.description,
  alternates: { canonical: "/praxe" },
  openGraph: { url: "/praxe", title: praxe.title, description: praxe.description },
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-lg leading-relaxed text-ink/70">
          <span aria-hidden className="mt-3.5 block h-px w-6 shrink-0 bg-gold" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function Praxe() {
  return (
    <>
      <Header />
      <main id="obsah">
        <section aria-labelledby="praxe-title" className="bg-paper">
          <div className="container-x py-20 md:py-32">
            <p className="eyebrow hero-in">Spolupráce se školami</p>
            <h1
              id="praxe-title"
              className="hero-in mt-6 max-w-5xl font-serif text-5xl leading-[1.05] tracking-[-0.02em] [animation-delay:0.15s] md:text-7xl"
            >
              {praxe.title}
            </h1>
            <p className="hero-in mt-8 max-w-2xl text-lg leading-relaxed text-ink/70 [animation-delay:0.3s] md:text-2xl">
              {praxe.intro}
            </p>
            <div className="hero-in mt-12 [animation-delay:0.45s]">
              <a href={praxe.ctaHref} className="btn">
                {praxe.cta}
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="praxe-learn" className="bg-sand py-20 md:py-32">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">Náplň praxe</p>
              <h2 id="praxe-learn" className="section-title mt-6">
                Co se žák naučí
              </h2>
            </Reveal>
            <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-10">
              {praxe.learn.map((item, i) => (
                <li key={item.title} className="border-t border-ink pt-6">
                  <span className="font-serif text-5xl text-ink/55" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink/70">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="praxe-how" className="bg-paper py-20 md:py-32">
          <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">Organizace</p>
              <h2 id="praxe-how" className="section-title mt-6">
                {praxe.howTitle}
              </h2>
            </Reveal>
            <dl className="border-t border-ink">
              {praxe.how.map((row) => (
                <div key={row.label} className="grid gap-2 border-b border-ink/10 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <dt className="eyebrow pt-1">{row.label}</dt>
                  <dd className="text-lg leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-label="Bezpečnost a spolupráce se školou" className="bg-sand py-20 md:py-32">
          <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="eyebrow">Bezpečnost</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.02em] md:text-5xl">
                Bezpečná práce v dílně
              </h2>
              <Bullets items={praxe.safety} />
            </Reveal>
            <Reveal delay={0.15}>
              <p className="eyebrow">Pro školy</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.02em] md:text-5xl">
                Administrativu zařídíme
              </h2>
              <Bullets items={praxe.schools} />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="praxe-cta" className="bg-paper py-20 md:py-32">
          <div className="container-x">
            <Reveal className="flex flex-col gap-8 border-t border-ink pt-10 md:flex-row md:items-center md:justify-between">
              <h2 id="praxe-cta" className="font-serif text-3xl leading-tight tracking-[-0.02em] md:text-4xl">
                Hledáte místo pro praxi svých žáků?
              </h2>
              <a href={praxe.ctaHref} className="btn self-start md:self-auto">
                {praxe.cta}
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
