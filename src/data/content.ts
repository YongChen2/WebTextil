import type { SlotId } from "@/config/images";
import { claims } from "@/config/site";

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
    lead: "Sítotisk, DTF i digitální potisk na trička, mikiny a tašky. Od jednoho kusu pro radost po série pro firmy, kapely a akce.",
    params: [
      "Minimální odběr od 1 ks",
      `Sítotisk až ${claims.screenPrintColors} barev, DTF v plné barevnosti`,
      "Bavlna, směsi i funkční materiály",
      `Dodání obvykle do ${claims.deliveryTime}`,
    ],
    slot: "sluzba-trika",
    alt: "Bílé a černé bavlněné tričko složené vedle sebe na světlém pozadí",
  },
  {
    id: "nasivky",
    title: "Našívky",
    lead: "Vyšívané a tkané našívky podle vašeho loga. Přišijeme je, nažehlíme nebo připravíme se suchým zipem.",
    params: [
      "Vyšívané, tkané i potištěné",
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
      "Našití emblémů, monogramů a výšivek",
      "Výměna podšívky a knoflíků",
      "Firemní a školní uniformy v sériích",
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

/** Drobný text pod nadpisem galerie. `null` = nezobrazí se. */
export const galleryNote: string | null = "Ilustrační ukázky. Fotky skutečných zakázek doplníme.";

/** Blok pod galerií – portfolio reálných zakázek posíláme jen na vyžádání. */
export const portfolioCta = {
  title: "Chcete vidět naše reálné zakázky?",
  text: "Fotografie na webu jsou ilustrační. Portfolio s fotkami z realizovaných zakázek vám rádi pošleme na vyžádání.",
  button: "Vyžádat portfolio",
  /** Odkaz na formulář s předvyplněnou službou (viz inquiryPresets). */
  href: "/?predmet=portfolio#kontakt",
};

/**
 * Předvyplnění poptávkového formuláře podle parametru ?predmet=… v URL.
 * `sluzba` musí být jedna z možností inquiryServices v src/config/site.ts.
 */
export const inquiryPresets: Record<string, { sluzba: string; zprava: string }> = {
  portfolio: {
    sluzba: "Portfolio",
    zprava: "Dobrý den, prosím o zaslání portfolia s fotkami realizovaných zakázek.",
  },
};

/** Poznámka v patičce. */
export const footerPhotoNote = "Fotografie na webu jsou ilustrační.";
