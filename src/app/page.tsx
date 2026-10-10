import type { ComponentType } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Prices } from "@/components/Prices";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { hasReviews } from "@/config/reviews";
import {
  address,
  brand,
  description,
  email,
  faq,
  hasEmail,
  hasPhone,
  dic,
  ico,
  name,
  phone,
  showPrices,
  showroom,
  siteUrl,
  vatPayer,
} from "@/config/site";
import type { Tone } from "@/lib/tone";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: brand,
  legalName: name,
  description,
  url: siteUrl,
  // Zástupné kontakty do strukturovaných dat nedáváme.
  ...(hasPhone && { telephone: phone }),
  ...(hasEmail && { email }),
  taxID: ico.replace(/\s/g, ""),
  // vatID (DIČ pro DPH) jen u plátce DPH.
  ...(vatPayer && { vatID: dic }),
  address: {
    "@type": "PostalAddress",
    streetAddress: address.street,
    postalCode: address.postalCode,
    addressLocality: address.city,
    addressCountry: address.country,
  },
  areaServed: [
    { "@type": "City", name: "Praha" },
    { "@type": "Country", name: "Česká republika" },
  ],
  // Otevírací dobu uvádíme jen u otevřeného showroomu – sídlo není provozovna.
  ...(showroom.enabled && {
    openingHoursSpecification: showroom.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      ...h,
    })),
  }),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Pořadí sekcí. Pozadí se střídá paper/sand podle pořadí viditelných sekcí,
 * takže skrytá sekce (ceny, recenze) střídání nerozbije.
 */
const sections: { key: string; visible: boolean; Section: ComponentType<{ tone: Tone }> }[] = [
  { key: "hero", visible: true, Section: Hero },
  { key: "sluzby", visible: true, Section: Services },
  { key: "ceny", visible: showPrices, Section: Prices },
  { key: "galerie", visible: true, Section: Gallery },
  { key: "recenze", visible: hasReviews, Section: Reviews },
  { key: "postup", visible: true, Section: Process },
  { key: "o-nas", visible: true, Section: About },
  { key: "faq", visible: true, Section: Faq },
  { key: "kontakt", visible: true, Section: Contact },
];

const toJson = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <a
        href="#obsah"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Přeskočit na obsah
      </a>
      <Header />
      <main id="obsah">
        {sections
          .filter((s) => s.visible)
          .map(({ key, Section }, i) => (
            <Section key={key} tone={i % 2 === 0 ? "paper" : "sand"} />
          ))}
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJson(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJson(faqJsonLd) }}
      />
    </>
  );
}
