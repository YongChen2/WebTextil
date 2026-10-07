import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Zjistí, zda obrázek v /public/images existuje. Volá se při prerenderu
 * (build), takže chybějící fotky se nahradí zástupnou plochou.
 */
export function imageExists(file: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "images", file));
}

export function imageSrc(file: string): string {
  return `/images/${file}`;
}
