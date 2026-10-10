/**
 * Fotky v obrazových kolonkách webu – jediné místo, kde se mění.
 * `file` je název souboru v /public/images/, `null` = zástupná šedá plocha.
 * Když soubor v /public/images/ chybí, zobrazí se také zástupná plocha.
 * Fotky stahuje a upravuje scripts/stock-photos.mjs (Unsplash, zdroje v CREDITS.md),
 * nášivky (sluzba-nasivky, galerie-02) kreslí scripts/illustrations.mjs.
 *
 * Příklad:
 *   "sluzba-trika": { file: "tricko.jpg", alt: "Černé tričko se sítotiskem" },
 */

export type SlotId =
  | "sluzba-trika"
  | "sluzba-nasivky"
  | "sluzba-saka"
  | "galerie-01"
  | "galerie-02"
  | "galerie-03"
  | "galerie-04"
  | "galerie-05"
  | "galerie-06"
  | "galerie-07"
  | "galerie-08"
  | "galerie-09"
  | "o-nas"
  | "tym";

export type SlotImage = { file: string; alt: string } | null;

export const imageSlots: Record<SlotId, SlotImage> = {
  // Služby
  "sluzba-trika": {
    file: "tricka-bile-cerne.webp",
    alt: "Bílé a černé bavlněné tričko složené vedle sebe na světlém pozadí",
  },
  "sluzba-nasivky": {
    file: "nasivky-sada.webp",
    alt: "Sada šesti vyšívaných nášivek s motivy hor, vln, slunce, hvězdy, květiny a geometrického vzoru na lněné látce",
  },
  "sluzba-saka": {
    file: "saka-tmave-modra.webp",
    alt: "Dvě tmavě modrá saka na dřevěných ramínkách před světlou stěnou",
  },

  // Galerie – kategorie každé kolonky je v src/data/content.ts
  "galerie-01": {
    file: "tricko-bile.webp",
    alt: "Bílé bavlněné tričko na dřevěném ramínku",
  },
  "galerie-02": {
    file: "nasivka-hory.webp",
    alt: "Detail vyšívané nášivky s motivem hor a slunce na tmavé látce, cívka nitě a jehla",
  },
  "galerie-03": {
    file: "sako-rukav-knofliky.webp",
    alt: "Detail rukávu tmavě modrého saka se třemi knoflíky",
  },
  "galerie-04": {
    file: "tricka-cerna.webp",
    alt: "Tři černá trička na dřevěných ramínkách",
  },
  "galerie-05": {
    file: "vysivani-ramecek.webp",
    alt: "Vyšívací rámeček s jednoduchými barevnými stehy na lněné látce",
  },
  "galerie-06": {
    file: "sako-cerne-detail.webp",
    alt: "Detail černého saka s klopou a kapsou na dřevěném stole",
  },
  "galerie-07": {
    file: "tricka-slozena.webp",
    alt: "Tři složená trička v tmavě modré, béžové a bílé barvě",
  },
  "galerie-08": {
    file: "civky-niti.webp",
    alt: "Řada dřevěných cívek s barevnými nitěmi",
  },
  "galerie-09": {
    file: "saka-lnena.webp",
    alt: "Řada lněných sak v různých barvách na kovové tyči",
  },

  // O nás
  // Kdo za tím stojí – DOPLNIT fotku (null = zástupná plocha)
  tym: null,
  "o-nas": {
    file: "atelier.webp",
    alt: "Světlý ateliér se stoly s rozloženými látkami, regálem a stojany s oblečením",
  },
};
