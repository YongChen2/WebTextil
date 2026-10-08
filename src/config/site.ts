/**
 * Centrální konfigurace webu. Kontaktní a firemní údaje měňte pouze zde.
 */

/**
 * Veřejná adresa webu – jediné místo s doménou (canonical, sitemap, robots, JSON-LD, OG).
 * Doménu změňte zde, nebo ji přepište proměnnou NEXT_PUBLIC_SITE_URL ve Vercelu.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jinsustudio.cz"
).replace(/\/$/, "");

/** Obchodní značka zobrazovaná na webu. */
export const brand = "Jinsu Studio";

/** Právní název provozovatele. */
export const name = "TPT funding s.r.o.";

export const ico = "190 67 640";

/**
 * Sídlo společnosti (zapsané v OR). Není to dílna ani provozovna –
 * na webu se vždy zobrazuje s označením `addressLabel`.
 */
export const address = {
  street: "Bělehradská 858/23",
  postalCode: "120 00",
  city: "Praha 2 – Vinohrady",
  country: "CZ",
} as const;

export const addressLabel = "Sídlo společnosti";

export const registry =
  "Zapsáno v OR u Městského soudu v Praze, oddíl C, vložka 380929";

// TODO: doplnit skutečné kontakty
export const phone: string = "+420 000 000 000";
export const email: string = "info@example.cz";

/** Hlavní sdělení: H1 v heru, titulek stránky, Open Graph a sdílení. */
export const tagline = "Potisk triček, našívky a úpravy sak v Praze";

/** Podnadpis pod H1 v heru. */
export const heroSubtitle =
  "Pro firmy, školy, kapely i jednotlivce. Od jednoho kusu po malé série – s náhledem a vzorkem před výrobou.";

export const description =
  `${brand} – malá textilní dílna v Praze. Potisk triček, výroba našívek a úpravy sak na míru, od jednoho kusu po malé série.`;

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

/**
 * Tvrzení o provozu, která je potřeba potvrdit s klientem před spuštěním.
 * Používají se v textech služeb, postupu, kontaktu, hera i FAQ.
 */
export const claims = {
  // OVĚŘIT S KLIENTEM: původně "Pět lidí, jedna dílna." – počet lidí zatím neuvádíme.
  aboutTitle: "Malá dílna, velký důraz na detail.",
  // OVĚŘIT S KLIENTEM: "Dodání 7–10 pracovních dní"
  deliveryTime: "7–10 pracovních dní",
  // OVĚŘIT S KLIENTEM: "Sítotisk až 6 barev"
  screenPrintColors: 6,
  // OVĚŘIT S KLIENTEM: "Ozveme se do jednoho pracovního dne"
  responseTime: "do jednoho pracovního dne",
  // OVĚŘIT S KLIENTEM: "Vzorek do 5 pracovních dní"
  sampleTime: "do 5 pracovních dní",
};

/** Krátké body pod podnadpisem hera. */
// OVĚŘIT S KLIENTEM: "Nabídka do 1 pracovního dne" musí odpovídat claims.responseTime.
export const heroTrust = ["Od 1 kusu", "Nabídka do 1 pracovního dne", "Vzorek před výrobou"];

/**
 * Orientační ceny (v Kč, „od“). `null` = řádek se nezobrazí. Karta bez cen
 * se nezobrazí; když nemá cenu žádná karta, skryje se celá sekce i odkaz v navigaci.
 */
export type PriceItem = { label: string; from: number | null };
export type PriceCard = { title: string; items: PriceItem[] };

// DOPLNIT CENY
export const prices: PriceCard[] = [
  {
    title: "Potisk triček",
    items: [
      { label: "Sítotisk, 1 barva", from: null }, // DOPLNIT CENY
      { label: "DTF potisk, plná barevnost", from: null }, // DOPLNIT CENY
      { label: "Digitální potisk, 1 kus", from: null }, // DOPLNIT CENY
      { label: "Příprava sítotiskové šablony", from: null }, // DOPLNIT CENY
    ],
  },
  {
    title: "Našívky",
    items: [
      { label: "Vyšívaná našívka", from: null }, // DOPLNIT CENY
      { label: "Tkaná našívka", from: null }, // DOPLNIT CENY
      { label: "Potištěná našívka", from: null }, // DOPLNIT CENY
      { label: "Našití na oděv", from: null }, // DOPLNIT CENY
    ],
  },
  {
    title: "Úpravy sak",
    items: [
      { label: "Zkrácení rukávů", from: null }, // DOPLNIT CENY
      { label: "Zúžení saka", from: null }, // DOPLNIT CENY
      { label: "Výměna knoflíků", from: null }, // DOPLNIT CENY
      { label: "Našití emblému", from: null }, // DOPLNIT CENY
    ],
  },
];

export const priceNote = "Konečnou cenu určíme podle počtu kusů, materiálu a náročnosti.";

/** Karty, které mají aspoň jednu vyplněnou cenu (jen s vyplněnými řádky). */
export const visiblePriceCards = prices
  .map((card) => ({ ...card, items: card.items.filter((item) => item.from !== null) }))
  .filter((card) => card.items.length > 0);

export const showPrices = visiblePriceCards.length > 0;

/** Časté dotazy – zobrazují se v sekci #faq a v FAQPage JSON-LD. */
export const faq: { question: string; answer: string }[] = [
  {
    question: "V jakém formátu poslat podklady?",
    answer:
      "Ideální je vektor – AI, PDF nebo SVG. Pokud vektor nemáte, pošlete PNG v rozlišení alespoň 300 dpi ve skutečné velikosti potisku. S přípravou podkladů rádi pomůžeme.",
  },
  {
    question: "Jaký je minimální odběr?",
    answer: "Zakázky přijímáme už od jednoho kusu.",
  },
  {
    question: "Jak dlouho trvá výroba?",
    answer: `Obvykle ${claims.deliveryTime} od schválení náhledu. Vzorek našívky připravíme ${claims.sampleTime}. Přesný termín potvrdíme v nabídce podle rozsahu zakázky.`,
  },
  {
    question: "Jak se platí?",
    answer: "Převodem na fakturu. U větších zakázek vybíráme zálohu před zahájením výroby.",
  },
  {
    question: "Jak probíhá předání?",
    answer: "Hotovou zakázku předáme osobně po domluvě, nebo ji odešleme přepravcem.",
  },
  {
    question: "Můžete dodat i trička / textil?",
    answer: "Ano, textil zajistíme. Poradíme s výběrem materiálu, střihu i velikostí.",
  },
];

/** Drobný text pod nadpisem galerie. Nastavte na `null`, až budou fotky skutečných zakázek. */
export const galleryNote: string | null = "Ilustrační ukázky. Fotky skutečných zakázek doplníme.";

/**
 * Showroom / provozovna pro zákazníky. Dokud je `enabled: false`, nezobrazuje se
 * mapa v kontaktu ani otevírací doba v JSON-LD.
 */
export const showroom = {
  enabled: false,
  /** URL pro <iframe> s mapou (např. z mapy.cz → Sdílet → Vložit do stránky). */
  mapEmbedUrl: "",
  /** Otevírací doba ve formátu schema.org (dayOfWeek: "Monday"…, časy "HH:MM"). */
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
  ],
};
