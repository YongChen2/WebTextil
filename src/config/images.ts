/**
 * Fotky v obrazových kolonkách webu – jediné místo, kde se mění.
 * `file` je název souboru v /public/images/, `null` = zástupná šedá plocha.
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
    file: "photo_2026-10-07 23.43.57.JPEG",
    alt: "Černé tričko s velkou vyšívanou kachnou na hrudi",
  },
  "sluzba-nasivky": {
    file: "photo_2026-10-07 23.43.54.JPEG",
    alt: "Tmavomodrá pólokošile s velkou vyšívanou kachnou na zádech",
  },
  "sluzba-saka": {
    file: "photo_2026-10-07 23.43.59.JPEG",
    alt: "Bílé sako s vyšívanou kachnou na zádech",
  },

  // Galerie – kategorie každé kolonky je v src/data/content.ts
  "galerie-01": {
    file: "photo_2026-10-07 23.43.52.JPEG",
    alt: "Tmavomodrá pólokošile s malou vyšívanou kachnou na hrudi",
  },
  "galerie-02": {
    file: "photo_2026-10-07 23.44.01.JPEG",
    alt: "Vyšívané našívky s kachnou v několika velikostech na stole",
  },
  "galerie-03": {
    file: "photo_2026-10-07 23.43.58.JPEG",
    alt: "Bílé sako s vyšívanou našívkou kachny na klopě",
  },
  "galerie-04": {
    file: "photo_2026-10-07 23.43.47.JPEG",
    alt: "Zabalené pólokošile v různých barvách s vyšívaným znakem kachny",
  },
  "galerie-05": {
    file: "photo_2026-10-07 23.43.55.JPEG",
    alt: "Krémová košile s velkou vyšívanou kachnou na zádech",
  },
  "galerie-06": null,
  "galerie-07": null,
  "galerie-08": {
    file: "photo_2026-10-07 23.43.56.JPEG",
    alt: "Krémová košile s malou vyšívanou kachnou na hrudi",
  },
  "galerie-09": null,

  // O nás
  "o-nas": null,
};
