import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSlots, type SlotId } from "@/config/images";

/**
 * Zjistí, zda obrázek v /public/images existuje. Volá se při prerenderu
 * (build), takže chybějící fotky se nahradí zástupnou plochou.
 */
export function imageExists(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "images", file));
}

export function imageSrc(file: string): string {
  // Názvy souborů mohou obsahovat mezery – v URL je zakódujeme.
  return `/images/${encodeURIComponent(file)}`;
}

/**
 * Vrátí data pro obrazovou kolonku podle src/config/images.ts.
 * Bez fotky (nebo když soubor chybí) zůstane zástupná plocha s názvem kolonky.
 */
export function resolveSlot(slot: SlotId, placeholderAlt: string) {
  const image = imageSlots[slot];
  const available = image !== null && imageExists(image.file);
  return {
    src: image ? imageSrc(image.file) : "",
    available,
    alt: available && image ? image.alt : placeholderAlt,
    label: slot,
  };
}
