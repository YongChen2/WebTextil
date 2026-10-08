/**
 * Fotky v obrazových kolonkách webu – jediné místo, kde se mění.
 * `file` je název souboru v /public/images/, `null` = zástupná šedá plocha.
 * Když soubor v /public/images/ chybí, zobrazí se také zástupná plocha.
 * Ilustrace generuje scripts/illustrations.mjs (node scripts/illustrations.mjs).
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
    file: "sluzba-trika.webp",
    alt: "Černé tričko s geometrickým potiskem ve zlaté a krémové barvě, vedle sítotisková stěrka",
  },
  "sluzba-nasivky": {
    file: "sluzba-nasivky.webp",
    alt: "Vyšívané našívky s geometrickými motivy, cívka zlaté nitě a jehla",
  },
  "sluzba-saka": {
    file: "sluzba-saka.webp",
    alt: "Šedé sako na dřevěném ramínku s krejčovským metrem přes rameno",
  },

  // Galerie – kategorie každé kolonky je v src/data/content.ts
  "galerie-01": {
    file: "galerie-01.webp",
    alt: "Štos složených triček v krémové, zlaté, černé a bílé barvě, na vrchu tričko s potiskem",
  },
  "galerie-02": {
    file: "galerie-02.webp",
    alt: "Detail velké vyšívané našívky s motivem hor a slunce, cívka nitě a jehla",
  },
  "galerie-03": {
    file: "galerie-03.webp",
    alt: "Detail tmavého saka s vyšívaným znakem na klopě, kapesníčkem a rohovými knoflíky",
  },
  "galerie-04": {
    file: "galerie-04.webp",
    alt: "Plátěná taška s geometrickým potiskem v černé a zlaté barvě",
  },
  "galerie-05": {
    file: "galerie-05.webp",
    alt: "Krémová kšiltovka s vyšívanou našívkou s motivem vln",
  },
  "galerie-06": {
    file: "galerie-06.webp",
    alt: "Krejčovské nůžky, metr, křída a knoflíky na tmavé vlněné látce",
  },
  "galerie-07": {
    file: "galerie-07.webp",
    alt: "Sítotiskový rám se šablonou, zlatá barva a stěrka na pracovním stole",
  },
  "galerie-08": {
    file: "galerie-08.webp",
    alt: "Teple šedá mikina s kapucí a kulatou vyšívanou našívkou na hrudi",
  },
  "galerie-09": {
    file: "galerie-09.webp",
    alt: "Tři saka v různých barvách na ramínkách na kovové tyči",
  },

  // O nás
  "o-nas": {
    file: "o-nas.webp",
    alt: "Pracovní stůl textilní dílny s rolí látky, složenými látkami, cívkami nití, nůžkami a krejčovským metrem",
  },
};
