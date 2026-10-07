import { steps } from "@/data/content";

export function Process() {
  return (
    <section id="postup" aria-labelledby="postup-title" className="bg-sand py-24 md:py-40">
      <div className="container-x">
        <p className="eyebrow">Postup</p>
        <h2 id="postup-title" className="section-title mt-6">
          Jak pracujeme
        </h2>
        <ol className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-ink pt-6">
              <span className="font-serif text-5xl text-ink/55 md:text-6xl" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-4 leading-relaxed text-ink/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
