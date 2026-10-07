/**
 * Fotky v obrazových kolonkách webu – jediné místo, kde se mění.
 * `file` je název souboru v /public/images/, `null` = zástupná šedá plocha.
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
  "sluzba-trika": null,
  "sluzba-nasivky": null,
  "sluzba-saka": null,

  // Galerie – kategorie každé kolonky je v src/data/content.ts
  "galerie-01": null,
  "galerie-02": null,
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
