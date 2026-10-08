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
import {
  address,
  brand,
  description,
  email,
  faq,
  hasEmail,
  hasPhone,
  ico,
  name,
  phone,
  showroom,
  siteUrl,
} from "@/config/site";

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
        <Hero />
        <Services />
        <Prices />
        <Gallery />
        <Reviews />
        <Process />
        <About />
        <Faq />
        <Contact />
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
