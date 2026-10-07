/**
 * Centrální konfigurace webu. Kontaktní a firemní údaje měňte pouze zde.
 */

/** Veřejná adresa webu – nastavte NEXT_PUBLIC_SITE_URL ve Vercelu (např. https://www.webtextil.cz). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.webtextil.cz"
).replace(/\/$/, "");

/** Obchodní značka zobrazovaná na webu. */
export const brand = "TopProfit Textil";

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
export const phone: string = "+420 000 000 000";
export const email: string = "info@example.cz";

export const tagline = "Potisk, našívky a úpravy oděvů na míru";

export const description =
  "TopProfit Textil – malá textilní dílna v Praze. Potisk triček, výroba našívek a úpravy sak na míru, od jednoho kusu po malé série.";

/** Telefon ve formátu pro odkaz tel: */
export const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;

// Zástupné hodnoty – dokud jsou nastavené, kontakt se na webu nezobrazuje.
const PLACEHOLDER_PHONE = "+420 000 000 000";
const PLACEHOLDER_EMAIL = "info@example.cz";

export const hasPhone = phone.trim() !== "" && phone !== PLACEHOLDER_PHONE;
export const hasEmail = email.trim() !== "" && email !== PLACEHOLDER_EMAIL;

/** Text zobrazený místo kontaktů, dokud nejsou doplněné. */
export const contactPendingText = "Kontakt bude doplněn";

/**
 * Formulář poptávky. Zapněte (true) až po napojení /api/poptavka na odesílání
 * e-mailů – do té doby by poptávky nikam nedorazily.
 */
export const inquiryFormEnabled = false;
