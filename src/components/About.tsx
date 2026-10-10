import { claims, name } from "@/config/site";
import { equipment, parentStudio, partnerProduction, teamLead } from "@/data/content";
import { resolveSlot } from "@/lib/images";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { toneBg, type Tone } from "@/lib/tone";

const teamImage = resolveSlot("o-nas", "Světlý ateliér se stoly s rozloženými látkami, regálem a stojany s oblečením");
const leadImage = resolveSlot("tym", teamLead.photoAlt);

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
              Jsme malé textilní studio pro firmy, školy, kapely, spolky i jednotlivce. Ve vlastní
              dílně potiskujeme trička flex a flock fóliemi, našíváme nášivky a upravujeme saka.
              Výšivku, sítotisk a DTF zajišťujeme {partnerProduction}.
            </p>
            <p>
              O grafiku, výrobu i komunikaci se stará malý tým, který drží zakázky pohromadě.
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

      <div className="container-x mt-20 grid gap-16 md:mt-32 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <h3 className="eyebrow">Kdo za tím stojí</h3>
          <p className="mt-8 border-t border-ink pt-8 leading-relaxed text-ink/70">
            {parentStudio.intro}{" "}
            <a href={parentStudio.url} className="link" target="_blank" rel="noopener">
              {parentStudio.name}
            </a>
            . Provozovatelem je {name}.
          </p>
          <div className="mt-8 flex flex-col gap-8 border-t border-ink/10 pt-8 sm:flex-row">
            {/* Fotka jen tehdy, když je v kolonce „tym“ reálná fotka – žádný placeholder. */}
            {leadImage.available && (
              <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden">
                <Media src={leadImage.src} file={leadImage.label} alt={leadImage.alt} available sizes="160px" />
              </div>
            )}
            <div>
              <p className="font-serif text-3xl tracking-[-0.02em]">{teamLead.name}</p>
              <p className="mt-2 text-sm text-ink/60">{teamLead.role}</p>
              <p className="mt-6 leading-relaxed text-ink/70">{teamLead.text}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 className="eyebrow">Vybavení dílny</h3>
          <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            {equipment.map((item) => (
              <li key={item} className="py-4 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
