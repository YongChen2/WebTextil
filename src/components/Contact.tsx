import {
  address,
  addressLabel,
  claims,
  contactPendingText,
  email,
  hasEmail,
  hasPhone,
  inquiryFormEnabled,
  name,
  phone,
  phoneHref,
  showroom,
} from "@/config/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { toneBg, type Tone } from "@/lib/tone";

export function Contact({ tone }: { tone: Tone }) {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className={`${toneBg[tone]} py-20 md:py-32`}>
      <div className="container-x grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Kontakt</p>
            <h2 id="kontakt-title" className="section-title mt-6">
              Poptat zakázku
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
              Popište, co potřebujete, a přiložte logo nebo náčrt. Nabídku pošleme obvykle{" "}
              {claims.responseTime}.
            </p>
          </Reveal>
          <address className="mt-12 space-y-2 not-italic">
            {hasPhone && (
              <p>
                <a href={phoneHref} className="link text-lg">
                  {phone}
                </a>
              </p>
            )}
            {hasEmail && (
              <p>
                <a href={`mailto:${email}`} className="link text-lg">
                  {email}
                </a>
              </p>
            )}
            <p className={hasPhone || hasEmail ? "pt-4 text-ink/70" : "text-ink/70"}>
              <span className="eyebrow block pb-2">{addressLabel}</span>
              {name}
              <br />
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </p>
          </address>
          {showroom.enabled && showroom.mapEmbedUrl && (
            <iframe
              src={showroom.mapEmbedUrl}
              title="Mapa"
              loading="lazy"
              className="mt-12 aspect-[4/3] w-full border-0"
            />
          )}
        </div>
        {inquiryFormEnabled ? <ContactForm /> : <ContactFallback />}
      </div>
    </section>
  );
}

/** Náhrada formuláře, dokud není napojený na odesílání e-mailů. */
function ContactFallback() {
  return (
    <div className="border-t border-ink pt-8">
      {hasEmail ? (
        <a href={`mailto:${email}?subject=${encodeURIComponent("Poptávka")}`} className="btn">
          Napište nám na e-mail
        </a>
      ) : (
        <p className="font-serif text-3xl leading-snug tracking-[-0.02em]">{contactPendingText}</p>
      )}
    </div>
  );
}
