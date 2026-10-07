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
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    id: "tricka",
    title: "Potisk triček",
    lead: "Sítotisk, DTF i digitální potisk na trička, mikiny a tašky. Od jednoho kusu pro radost po série pro firmy, kapely a akce.",
    params: [
      "Minimální odběr od 1 ks",
      "Sítotisk až 6 barev, DTF v plné barevnosti",
      "Bavlna, směsi i funkční materiály",
      "Dodání obvykle do 7–10 pracovních dní",
    ],
    image: "sluzba-trika.webp",
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
      "Vzorek do 5 pracovních dní",
    ],
    image: "sluzba-nasivky.webp",
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
    image: "sluzba-saka.webp",
    alt: "Krejčí připevňuje špendlíky na rukáv tmavého saka",
  },
];

export type GalleryItem = {
  image: string;
  category: Category;
  alt: string;
};

export const gallery: GalleryItem[] = [
  { image: "galerie-01.webp", category: "tricka", alt: "Bílá trička s jednobarevným sítotiskem složená na stole" },
  { image: "galerie-02.webp", category: "nasivky", alt: "Sada kulatých vyšívaných našívek pro sportovní klub" },
  { image: "galerie-03.webp", category: "saka", alt: "Tmavomodré sako s našitým emblémem na náprsní kapse" },
  { image: "galerie-04.webp", category: "tricka", alt: "Černé tričko s barevným DTF potiskem na zádech" },
  { image: "galerie-05.webp", category: "nasivky", alt: "Tkaná našívka s názvem firmy na pracovní bundě" },
  { image: "galerie-06.webp", category: "saka", alt: "Detail zkráceného rukávu saka s ručně přišitými knoflíky" },
  { image: "galerie-07.webp", category: "tricka", alt: "Série triček v různých velikostech pro firemní akci" },
  { image: "galerie-08.webp", category: "nasivky", alt: "Našívky se suchým zipem připravené k expedici" },
  { image: "galerie-09.webp", category: "saka", alt: "Školní sako s vyšitým monogramem na klopě" },
];

export const steps = [
  {
    title: "Poptávka",
    text: "Napište nám, co potřebujete – počet kusů, materiál, termín. Pošlete logo nebo náčrt. Ozveme se do jednoho pracovního dne.",
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
    text: "Zakázku vyrobíme v naší pražské dílně, zkontrolujeme každý kus a předáme osobně nebo odešleme přepravcem.",
  },
];
