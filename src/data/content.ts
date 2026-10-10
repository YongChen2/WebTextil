import type { SlotId } from "@/config/images";
import { claims, workshop } from "@/config/site";

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
  name: "Jin Chen",
  role: "Zakladatel a vedoucí studia",
  text: "Hlídá, aby každá zakázka prošla od náhledu přes výrobu až po kontrolu kvality stejnýma rukama. Studentům na odborné praxi dělá mentora – ukáže jim celý postup od přípravy grafiky po předání hotového kusu zákazníkovi.",
  photoAlt: "Jin Chen, zakladatel a vedoucí studia",
};

/** O nás – „Vybavení dílny“. */
export const equipment: string[] = [
  "Termolis – nažehlení fólií a transferů na textil",
  "Řezací plotr – vyřezávání motivů z flex a flock fólií",
  "Šicí stroj – našívání nášivek a emblémů, úpravy oděvů",
  "Počítač s grafickým softwarem – příprava a úprava podkladů pro výrobu",
];

/** Stránka /praxe – praxe pro studenty a spolupráce se školami. */
export const praxe = {
  title: "Praxe pro studenty a spolupráce se školami",
  description:
    "Odborná praxe pro žáky textilních, oděvních a grafických oborů: příprava grafiky, potisk flex a flock fóliemi, práce s materiály a kontrola kvality pod vedením mentora. Smlouva se školou, hodnocení i docházka.",
  intro:
    "Nabízíme odbornou praxi pro žáky textilních, oděvních a grafických oborů. Studenti se zapojí do skutečných zakázek – od přípravy grafiky až po hotový kus předaný zákazníkovi.",
  learn: [
    { title: "Příprava grafiky", text: "Úprava podkladů pro potisk i pro partnerskou výrobu (výšivka, sítotisk, DTF), vektorizace, volba barev a rozměrů podle technologie." },
    { title: "Termolis a řezací plotr", text: "Řezání flex a flock fólií na plotru, vybírání motivů a nažehlení na termolisu – nastavení teploty, tlaku a času." },
    { title: "Práce s materiály", text: "Rozpoznání materiálů, výběr technologie podle textilu a správná péče o hotové výrobky." },
    { title: "Kontrola kvality", text: "Kontrola každého kusu, porovnání se schváleným náhledem a příprava k předání." },
    { title: "Komunikace se zákazníkem", text: "Jak probíhá poptávka, náhled a schválení – a jak srozumitelně vysvětlit technické možnosti." },
  ],
  howTitle: "Jak praxe probíhá",
  how: [
    { label: "Odpovědná osoba (mentor)", value: "Jin Chen" },
    { label: "Pracovní doba", value: "Dle dohody se školou" },
    { label: "Místo", value: workshop.address },
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
