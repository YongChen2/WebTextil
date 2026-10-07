import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { address, brand, description, email, hasEmail, hasPhone, ico, name, phone, siteUrl } from "@/config/site";

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
};

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
        <Gallery />
        <Reviews />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
