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
    alt: "Ruka přejíždí stěrkou přes sítotiskový rám na černém tričku",
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
    alt: "Detail vyšívané našívky s logem na tmavé látce",
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
    alt: "Krejčí připevňuje špendlíky na rukáv tmavého saka",
  },
];

export type GalleryItem = {
  slot: SlotId;
  category: Category;
  alt: string;
};

export const gallery: GalleryItem[] = [
  { slot: "galerie-01", category: "tricka", alt: "Bílá trička s jednobarevným sítotiskem složená na stole" },
  { slot: "galerie-02", category: "nasivky", alt: "Sada kulatých vyšívaných našívek pro sportovní klub" },
  { slot: "galerie-03", category: "saka", alt: "Tmavomodré sako s našitým emblémem na náprsní kapse" },
  { slot: "galerie-04", category: "tricka", alt: "Černé tričko s barevným DTF potiskem na zádech" },
  { slot: "galerie-05", category: "nasivky", alt: "Tkaná našívka s názvem firmy na pracovní bundě" },
  { slot: "galerie-06", category: "saka", alt: "Detail zkráceného rukávu saka s ručně přišitými knoflíky" },
  { slot: "galerie-07", category: "tricka", alt: "Série triček v různých velikostech pro firemní akci" },
  { slot: "galerie-08", category: "nasivky", alt: "Našívky se suchým zipem připravené k expedici" },
  { slot: "galerie-09", category: "saka", alt: "Školní sako s vyšitým monogramem na klopě" },
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
