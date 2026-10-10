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
  praxe: {
    sluzba: "Praxe / spolupráce se školou",
    zprava: "Dobrý den, máme zájem o odbornou praxi pro naše žáky.\nŠkola a obor:\nPočet žáků:\nTermín praxe:",
  },
};

/** Poznámka v patičce. */
export const footerPhotoNote = "Fotografie na webu jsou ilustrační (Unsplash a vlastní ilustrace).";

/** O nás – „Kdo za tím stojí“. Fotka se nastavuje v src/config/images.ts (slot „tym“). */
export const teamLead = {
  name: "[DOPLNIT jméno]",
  role: "[DOPLNIT role, např. vedoucí dílny]",
  text: "Stará se o to, aby každá zakázka prošla od náhledu přes výrobu až po kontrolu kvality stejnýma rukama. Je také mentorem studentů na odborné praxi.",
  photoAlt: "[DOPLNIT] Portrét vedoucího dílny",
};

/** O nás – „Vybavení dílny“. */
export const equipment: string[] = [
  "Vyšívací stroj – [DOPLNIT model, počet hlav a barev]",
  "Termolis pro DTF a nažehlovací potisk – [DOPLNIT model, rozměr desky]",
  "Sítotiskový karusel – [DOPLNIT model, počet barev]",
  "DTF tiskárna – [DOPLNIT model]",
  "Průmyslový šicí stroj a overlock – [DOPLNIT modely]",
];

/** Stránka /praxe – praxe pro studenty a spolupráce se školami. */
export const praxe = {
  title: "Praxe pro studenty a spolupráce se školami",
  description:
    "Odborná praxe pro žáky textilních, oděvních a grafických oborů: potisk, výšivka, práce s materiály a kontrola kvality pod vedením mentora. Smlouva se školou, hodnocení i docházka.",
  intro:
    "Nabízíme odbornou praxi pro žáky textilních, oděvních a grafických oborů. Studenti se zapojí do skutečných zakázek – od přípravy grafiky až po hotový kus předaný zákazníkovi.",
  learn: [
    { title: "Příprava grafiky", text: "Úprava podkladů pro potisk a výšivku, vektorizace, volba barev a rozměrů podle technologie." },
    { title: "Vyšívací stroj a termolis", text: "Obsluha vyšívacího stroje a termolisu, upínání textilu, nastavení teploty, tlaku a času." },
    { title: "Práce s materiály", text: "Rozpoznání materiálů, výběr technologie podle textilu a správná péče o hotové výrobky." },
    { title: "Kontrola kvality", text: "Kontrola každého kusu, porovnání se schváleným náhledem a příprava k předání." },
    { title: "Komunikace se zákazníkem", text: "Jak probíhá poptávka, náhled a schválení – a jak srozumitelně vysvětlit technické možnosti." },
  ],
  howTitle: "Jak praxe probíhá",
  how: [
    { label: "Odpovědná osoba (mentor)", value: "[DOPLNIT jméno]" },
    { label: "Pracovní doba", value: "[DOPLNIT]" },
    { label: "Místo", value: "[DOPLNIT adresa provozovny]" },
    { label: "Hodnocení a docházka", value: "Průběžně vedeme docházku a na konci praxe vyplníme hodnocení žáka pro školu." },
  ],
  safety: [
    "První den proškolení BOZP a seznámení s provozem dílny.",
    "Ochranné pomůcky zajistíme.",
    "Se stroji žáci pracují vždy pod dohledem mentora.",
  ],
  schools: [
    "Uzavíráme smlouvu o zajištění odborné praxe.",
    "Vyplníme hodnocení žáka podle požadavků školy.",
    "Potvrdíme docházku.",
  ],
  cta: "Kontaktovat ohledně praxe",
  ctaHref: "/?predmet=praxe#kontakt",
};
