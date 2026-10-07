/**
 * Fotky v obrazových kolonkách webu – jediné místo, kde se mění.
 * `file` je název souboru v /public/images/, `null` = zástupná šedá plocha.
 * Když soubor v /public/images/ chybí, zobrazí se také zástupná plocha.
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
  | "o-nas";

export type SlotImage = { file: string; alt: string } | null;

export const imageSlots: Record<SlotId, SlotImage> = {
  // Služby
  "sluzba-trika": {
    file: "sluzba-trika.jpg",
    alt: "Černé bavlněné tričko vedle sítotiskového rámu a stěrky",
  },
  "sluzba-nasivky": {
    file: "sluzba-nasivky.jpg",
    alt: "Kulatá vyšívaná našívka s geometrickým vzorem ve zlaté a tmavomodré nití",
  },
  "sluzba-saka": {
    file: "sluzba-saka.jpg",
    alt: "Šedé vlněné sako na ramínku s krejčovským metrem na rukávu",
  },

  // Galerie – kategorie každé kolonky je v src/data/content.ts
  "galerie-01": {
    file: "galerie-01.jpg",
    alt: "Složená bílá trička s jednobarevným abstraktním potiskem",
  },
  "galerie-02": {
    file: "galerie-02.jpg",
    alt: "Devět kulatých vyšívaných našívek s geometrickými motivy",
  },
  "galerie-03": null,
  "galerie-04": null,
  "galerie-05": null,
  "galerie-06": null,
  "galerie-07": null,
  "galerie-08": null,
  "galerie-09": null,

  // O nás
  "o-nas": null,
};
