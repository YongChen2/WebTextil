import { claims } from "@/config/site";
import { resolveSlot } from "@/lib/images";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { toneBg, type Tone } from "@/lib/tone";

const teamImage = resolveSlot("o-nas", "Tým TopProfit Textil u tiskařského stolu");

export function About({ tone }: { tone: Tone }) {
  return (
    <section id="o-nas" aria-labelledby="o-nas-title" className={`${toneBg[tone]} py-20 md:py-32`}>
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">O nás</p>
            <h2 id="o-nas-title" className="section-title mt-6">
              {claims.aboutTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 max-w-xl space-y-6 text-lg leading-relaxed text-ink/70">
            <p>
              Jsme malá textilní dílna. Potiskujeme trička, vyrábíme našívky a upravujeme
              saka – pro firmy, školy, kapely, spolky i jednotlivce.
            </p>
            <p>
              V týmu jsou tiskaři, krejčová, grafik a člověk, který drží zakázky pohromadě.
              Každou zakázku vidí od začátku do konce stejní lidé, takže víte, s kým mluvíte.
            </p>
            <p>
              Nejsme velkovýroba. Máme čas na detail, poradíme s materiálem a řekneme na rovinu,
              co půjde a co ne.
            </p>
          </Reveal>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Media
            src={teamImage.src}
            file={teamImage.label}
            alt={teamImage.alt}
            available={teamImage.available}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
