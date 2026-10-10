import type { SlotId } from "@/config/images";
import { claims } from "@/config/site";

/** Jednotná formulace pro technologie, které nevyrábíme ve vlastní dílně (výšivka, sítotisk, DTF). */
export const partnerProduction = "ve spolupráci s partnerskou výrobou na profesionálních strojích";

export type Category = "tricka" | "nasivky" | "saka";

export const categoryLabels: Record<Category, string> = {
  tricka: "Trička",
  nasivky: "Našívky",
  saka: "Saka",
};

export type Service = {
  id: Category;
  title: string;
  lead: string;
  params: string[];
  /** Obrazová kolonka – fotka se nastavuje v src/config/images.ts. */
  slot: SlotId;
  /** Popis zástupné plochy, dokud v kolonce není fotka. */
  alt: string;
};

export const services: Service[] = [
  {
    id: "tricka",
    title: "Potisk triček",
    lead: `Potisk triček, mikin a tašek od jednoho kusu po série pro firmy, kapely a akce. Flex a flock fólie řežeme a nažehlujeme ve vlastní dílně, sítotisk a DTF zajišťujeme ${partnerProduction}.`,
    params: [
      "Minimální odběr od 1 ks",
      "Flex a flock fólie ve vlastní dílně",
      `Sítotisk až ${claims.screenPrintColors} barev a DTF v plné barevnosti – ${partnerProduction}`,
      `Dodání obvykle do ${claims.deliveryTime}`,
    ],
    slot: "sluzba-trika",
    alt: "Bílé a černé bavlněné tričko složené vedle sebe na světlém pozadí",
  },
  {
    id: "nasivky",
    title: "Našívky",
    lead: `Vyšívané a tkané nášivky podle vašeho loga vyrábíme ${partnerProduction}. V dílně je přišijeme, nažehlíme nebo připravíme se suchým zipem.`,
    params: [
      "Vyšívané, tkané i potištěné – partnerská výroba",
      "Velikost od 3 do 25 cm",
      "Zažehlovací, našívací nebo se suchým zipem",
      `Vzorek ${claims.sampleTime}`,
    ],
    slot: "sluzba-nasivky",
    alt: "Sada šesti vyšívaných nášivek s motivy hor, vln, slunce, hvězdy, květiny a geometrického vzoru na lněné látce",
  },
  {
    id: "saka",
    title: "Úpravy sak",
    lead: "Zkrácení rukávů, zúžení, výměna knoflíků a našití emblémů na saka a uniformy. Pečlivě, ručně, s ohledem na střih.",
    params: [
      "Zkrácení a zúžení rukávů i trupu",
      "Našití emblémů a nášivek, monogramy a výšivky ve spolupráci s partnerskou výrobou",
      "Výměna podšívky a knoflíků",
      "Firemní uniformy v sériích",
    ],
    slot: "sluzba-saka",
    alt: "Dvě tmavě modrá saka na dřevěných ramínkách před světlou stěnou",
  },
];

export type GalleryItem = {
  slot: SlotId;
  category: Category;
  alt: string;
};

export const gallery: GalleryItem[] = [
  { slot: "galerie-01", category: "tricka", alt: "Bílé bavlněné tričko na dřevěném ramínku" },
  { slot: "galerie-02", category: "nasivky", alt: "Detail vyšívané nášivky s motivem hor a slunce na tmavé látce, cívka nitě a jehla" },
  { slot: "galerie-03", category: "saka", alt: "Detail rukávu tmavě modrého saka se třemi knoflíky" },
  { slot: "galerie-04", category: "tricka", alt: "Tři černá trička na dřevěných ramínkách" },
  { slot: "galerie-05", category: "nasivky", alt: "Vyšívací rámeček s jednoduchými barevnými stehy na lněné látce" },
  { slot: "galerie-06", category: "saka", alt: "Detail černého saka s klopou a kapsou na dřevěném stole" },
  { slot: "galerie-07", category: "tricka", alt: "Tři složená trička v tmavě modré, béžové a bílé barvě" },
  { slot: "galerie-08", category: "nasivky", alt: "Řada dřevěných cívek s barevnými nitěmi" },
  { slot: "galerie-09", category: "saka", alt: "Řada lněných sak v různých barvách na kovové tyči" },
];

export const steps = [
  {
    title: "Poptávka",
    text: `Napište nám, co potřebujete – počet kusů, materiál, termín. Pošlete logo nebo náčrt. Ozveme se ${claims.responseTime}.`,
  },
  {
    title: "Návrh",
    text: "Připravíme grafický náhled a cenovou nabídku. Doladíme barvy, velikost a umístění, dokud nebudete spokojeni.",
  },
  {
    title: "Vzorek",
    text: "U větších sérií vyrobíme vzorek, který si můžete prohlédnout a vyzkoušet. Teprve po vašem schválení pokračujeme.",
  },
  {
    title: "Výroba a dodání",
    text: "Zakázku vyrobíme, zkontrolujeme každý kus a předáme osobně nebo odešleme přepravcem.",
  },
];

/** Info box pod nadpisem galerie – `lead` je tučně. `null` = nezobrazí se. */
export const galleryNote: { lead: string; text: string } | null = {
  lead: "Fotografie v galerii jsou ilustrační.",
  text: "Zakázky našich zákazníků obsahují jejich loga, grafiku a další autorská díla, ke kterým nám nepřísluší právo je veřejně šířit. Z tohoto důvodu a na přání zákazníků fotky jejich zakázek nezveřejňujeme. Ukázky reálných realizovaných zakázek vám rádi zašleme e-mailem na vyžádání.",
};

/** Blok pod galerií – vysvětlení je v info boxu nad galerií, tady jen výzva. */
export const portfolioCta = {
  title: "Chcete vidět naše reálné zakázky?",
  button: "Vyžádat ukázky zakázek",
  /** Odkaz na formulář s předvyplněnou službou (viz inquiryPresets). */
  href: "/?predmet=portfolio#kontakt",
};

/**
 * Předvyplnění poptávkového formuláře podle parametru ?predmet=… v URL.
 * `sluzba` musí být jedna z možností inquiryServices v src/config/site.ts.
 */
export const inquiryPresets: Record<string, { sluzba: string; zprava: string }> = {
  portfolio: {
    sluzba: "Ukázky zakázek",
    zprava: "Dobrý den, prosím o zaslání ukázek realizovaných zakázek e-mailem.",
  },

};

/** Poznámka v patičce. */
export const footerPhotoNote = "Fotografie na webu jsou ilustrační (Unsplash a vlastní ilustrace).";

/** O nás – „Kdo za tím stojí“. Fotka se nastavuje v src/config/images.ts (slot „tym“). */
export const teamLead = {
  name: "Jin Chen",
  role: "Vedoucí studia",
  text: "Spravuje a řídí provoz studia, komunikuje se zákazníky i s partnerskou výrobou a hlídá, aby každá zakázka prošla od náhledu až po kontrolu kvality.",
  photoAlt: "Jin Chen, vedoucí studia",
};

/** Vazba na mateřské studio – O nás („Kdo za tím stojí“) a patička. */
export const parentStudio = {
  name: "Top Profit Design",
  url: "https://topprofitdesign.cz",
  /** Krátká zmínka (patička, O nás). */
  short: "Jinsu Studio je součástí",
  /** Úvod bloku „Kdo za tím stojí“ – provozovatele doplní komponenta z configu. */
  intro: "Jinsu Studio vzniklo jako textilní větev studia",
};

/** O nás – „Vybavení dílny“. */
export const equipment: string[] = [
  "Termolis – nažehlení fólií a transferů na textil",
  "Řezací plotr – vyřezávání motivů z flex a flock fólií",
  "Šicí stroj – našívání nášivek a emblémů, úpravy oděvů",
  "Počítač s grafickým softwarem – příprava a úprava podkladů pro výrobu",
];
