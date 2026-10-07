import { address, email, name, phone, phoneHref } from "@/config/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="bg-sand py-24 md:py-40">
      <div className="container-x grid items-start gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2 id="kontakt-title" className="section-title mt-6">
            Poptat zakázku
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
            Popište, co potřebujete, a přiložte logo nebo náčrt. Nabídku pošleme obvykle do
            jednoho pracovního dne.
          </p>
          <address className="mt-12 space-y-2 not-italic">
            <p>
              <a href={phoneHref} className="link text-lg">
                {phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${email}`} className="link text-lg">
                {email}
              </a>
            </p>
            <p className="pt-4 text-ink/70">
              {name}
              <br />
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </p>
          </address>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
