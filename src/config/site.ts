/**
 * Centrální konfigurace webu. Kontaktní a firemní údaje měňte pouze zde.
 */

/** Veřejná adresa webu – nastavte NEXT_PUBLIC_SITE_URL ve Vercelu (např. https://www.webtextil.cz). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webtextil.cz"
).replace(/\/$/, "");

/** Obchodní značka zobrazovaná na webu. */
export const brand = "WebTextil";

/** Právní název provozovatele. */
export const name = "TPT funding s.r.o.";

export const ico = "190 67 640";

export const address = {
  street: "Bělehradská 858/23",
  postalCode: "120 00",
  city: "Praha 2",
  country: "CZ",
} as const;

export const registry =
  "Zapsáno v OR u Městského soudu v Praze, oddíl C, vložka 380929";

// TODO: doplnit skutečné kontakty
export const phone = "+420 000 000 000";
export const email = "info@example.cz";

export const tagline = "Potisk, našívky a úpravy oděvů na míru";

export const description =
  "WebTextil – malá textilní dílna v Praze. Potisk triček, výroba našívek a úpravy sak na míru, od jednoho kusu po malé série.";

/** Telefon ve formátu pro odkaz tel: */
export const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
