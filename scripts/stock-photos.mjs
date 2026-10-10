/**
 * Stáhne fotky z Unsplash (licence Unsplash – komerční použití zdarma, bez nutnosti uvádět autora;
 * zdroje přesto vedeme v CREDITS.md), ořízne je na poměr obrazových kolonek a uloží do public/images
 * jako WebP. Malá loga a texty na štítcích odstraní jednoduchou retuší (klon okolní látky).
 * Nášivky se nestahují – kreslí je scripts/illustrations.mjs (sluzba-nasivky, galerie-02).
 *
 * Spuštění: node scripts/stock-photos.mjs [slot ...]   (bez argumentů zpracuje všechny)
 * Volitelně PREVIEW_DIR=/cesta uloží i JPG náhledy pro kontrolu.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/images");
const PREVIEW = process.env.PREVIEW_DIR;
const QUALITY = 80;

/**
 * file = výstupní soubor v public/images (musí sedět se src/config/images.ts). Nové fotce dejte
 * nový název – optimalizované obrázky se na Vercelu cachují podle URL zdroje.
 * width = šířka stahovaného zdroje (px), crop = výřez v px zdroje, extend = dorovnání okrajů
 * opakováním krajních řádků (čisté studiové pozadí), retouch = klony přes loga/štítky.
 */
const photos = {
  "sluzba-trika": {
    file: "tricka-bile-cerne.webp",
    url: "https://images.unsplash.com/photo-1693443687750-611ad77f3aba",
    page: "https://unsplash.com/photos/pZfRXQhi1eg",
    author: "tian dayong",
    authorUrl: "https://unsplash.com/@tonnnyj",
    width: 2400,
    out: [1280, 1600],
    retouch: [
      { type: "circle", x: 1205, y: 935, r: 84, dx: -170, dy: 80 }, // logo na hrudi bílého trička
      { type: "circle", x: 2040, y: 790, r: 84, dx: -190, dy: 70 }, // logo na hrudi černého trička
      { type: "rect", left: 650, top: 630, width: 140, height: 130, dx: 125, dy: 0 }, // štítek s textem
      { type: "rect", left: 1440, top: 425, width: 150, height: 170, dx: 140, dy: 10 }, // štítek s textem
    ],
    crop: { left: 200, top: 0, width: 2100, height: 1601 },
    extend: { top: 512, bottom: 512 },
  },
  "sluzba-saka": {
    file: "saka-tmave-modra.webp",
    url: "https://images.unsplash.com/photo-1740710748146-a15d840d6f40",
    page: "https://unsplash.com/photos/cYRsB4liZPs",
    author: "Robert Richman",
    authorUrl: "https://unsplash.com/@linenese_lifestyle",
    width: 2000,
    out: [1280, 1600],
    crop: { left: 67, top: 0, width: 1866, height: 2333 },
  },
  "galerie-01": {
    file: "tricko-bile.webp",
    url: "https://images.unsplash.com/photo-1778671394516-8270eac13c42",
    page: "https://unsplash.com/photos/8ACmRoleM24",
    author: "Avtar Singh",
    authorUrl: "https://unsplash.com/@avtar9w",
    width: 1800,
    out: [1200, 1200],
    crop: { left: 300, top: 0, width: 1200, height: 1200 },
  },
  "galerie-03": {
    file: "sako-rukav-knofliky.webp",
    url: "https://images.unsplash.com/photo-1540292212250-e817c4b2dd2e",
    page: "https://unsplash.com/photos/rsrwFDJoICE",
    author: "Siora Photography",
    authorUrl: "https://unsplash.com/@siora18",
    width: 1600,
    out: [1200, 1200],
    crop: { left: 0, top: 150, width: 1600, height: 1600 },
  },
  "galerie-04": {
    file: "tricka-cerna.webp",
    url: "https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575",
    page: "https://unsplash.com/photos/Cs4GVbMqKGY",
    author: "Ryan Hoffman",
    authorUrl: "https://unsplash.com/@ryanhoffman007",
    width: 2400,
    out: [1200, 1200],
    crop: { left: 396, top: 0, width: 1607, height: 1607 },
  },
  "galerie-05": {
    file: "vysivani-ramecek.webp",
    url: "https://images.unsplash.com/photo-1591461215382-f7ec4749f8ff",
    page: "https://unsplash.com/photos/FNJLYCte5Js",
    author: "Laurisa Deacon",
    authorUrl: "https://unsplash.com/@laurisamisa",
    width: 1200,
    out: [1200, 1200],
  },
  "galerie-06": {
    file: "sako-cerne-detail.webp",
    url: "https://images.unsplash.com/photo-1585412459212-8def26f7e84c",
    page: "https://unsplash.com/photos/YZ0WDjg4EFg",
    author: "Robbie",
    authorUrl: "https://unsplash.com/@lifeofrobbie",
    width: 1600,
    out: [1200, 1200],
    crop: { left: 0, top: 533, width: 1600, height: 1600 }, // bez štítku s textem u límce
  },
  "galerie-07": {
    file: "tricka-slozena.webp",
    url: "https://images.unsplash.com/photo-1713881630214-82c44407cf25",
    page: "https://unsplash.com/photos/CztYfHeb_Ow",
    author: "tian dayong",
    authorUrl: "https://unsplash.com/@tonnnyj",
    width: 2400,
    out: [1200, 1200],
    crop: { left: 400, top: 0, width: 1600, height: 1600 },
  },
  "galerie-08": {
    file: "civky-niti.webp",
    url: "https://images.unsplash.com/photo-1707472362166-cf11e5752ade",
    page: "https://unsplash.com/photos/7ZPWxyvo8JA",
    author: "Olga Kovalski",
    authorUrl: "https://unsplash.com/@kovalskihelga",
    width: 2400,
    out: [1200, 1200],
    extend: { top: 397, bottom: 396 },
  },
  "galerie-09": {
    file: "saka-lnena.webp",
    url: "https://images.unsplash.com/photo-1740710370552-a49b5b01f80a",
    page: "https://unsplash.com/photos/SVMaSpddK7o",
    author: "Robert Richman",
    authorUrl: "https://unsplash.com/@linenese_lifestyle",
    width: 1600,
    out: [1200, 1200],
    crop: { left: 0, top: 230, width: 1600, height: 1600 },
  },
  "o-nas": {
    file: "atelier.webp",
    url: "https://images.unsplash.com/photo-1704729105381-f579cfcefd63",
    page: "https://unsplash.com/photos/ZDBx851yqIs",
    author: "X Du",
    authorUrl: "https://unsplash.com/@xdu",
    width: 3200,
    out: [1280, 1600],
    retouch: [
      { type: "circle", x: 2126, y: 1673, r: 46, dx: -90, dy: 0 }, // logo na plátěné tašce
      { type: "circle", x: 1900, y: 2837, r: 46, dx: -90, dy: 0 }, // logo na plátěné tašce
    ],
    crop: { left: 480, top: 150, width: 2720, height: 3400 },
    quality: 70, // filmové zrno – při 80 by soubor přesáhl 300 kB
  },
};

// ---------- retuš ----------
function softMask(w, h, shape, feather) {
  const inner =
    shape === "circle"
      ? `<ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2 - feather}" ry="${h / 2 - feather}" fill="#fff"/>`
      : `<rect x="${feather}" y="${feather}" width="${w - 2 * feather}" height="${h - 2 * feather}" rx="${feather}" fill="#fff"/>`;
  const svg = `<svg width="${w}" height="${h}"><filter id="b"><feGaussianBlur stdDeviation="${feather / 2}"/></filter><rect width="${w}" height="${h}" fill="#000"/><g filter="url(#b)">${inner}</g></svg>`;
  return sharp(Buffer.from(svg)).extractChannel(0).toBuffer();
}

async function applyRetouch(base, op) {
  const box =
    op.type === "circle"
      ? { left: op.x - op.r, top: op.y - op.r, width: 2 * op.r, height: 2 * op.r }
      : { left: op.left, top: op.top, width: op.width, height: op.height };
  const feather = op.type === "circle" ? Math.round(op.r * 0.18) : 10;
  const patch = await sharp(base)
    .extract({ ...box, left: box.left + op.dx, top: box.top + op.dy })
    .removeAlpha()
    .toBuffer();
  const alpha = await softMask(box.width, box.height, op.type, feather);
  const rgba = await sharp(patch).joinChannel(alpha).png().toBuffer();
  return sharp(base).composite([{ input: rgba, left: box.left, top: box.top }]).toBuffer();
}

// ---------- výstup ----------
const only = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
if (PREVIEW) fs.mkdirSync(PREVIEW, { recursive: true });

for (const [slot, p] of Object.entries(photos)) {
  if (only.length && !only.includes(slot)) continue;
  const res = await fetch(`${p.url}?w=${p.width}&fm=jpg&q=92`);
  if (!res.ok) throw new Error(`${slot}: stažení selhalo (${res.status})`);
  let img = Buffer.from(await res.arrayBuffer());

  for (const op of p.retouch ?? []) img = await applyRetouch(img, op);
  if (p.crop) img = await sharp(img).extract(p.crop).toBuffer();
  if (p.extend) img = await sharp(img).extend({ top: 0, bottom: 0, left: 0, right: 0, ...p.extend, extendWith: "copy" }).toBuffer();

  const [w, h] = p.out;
  const final = sharp(img).resize(w, h, { fit: "cover", position: "centre" });
  const file = path.join(OUT, p.file);
  await final.clone().webp({ quality: p.quality ?? QUALITY, effort: 6 }).toFile(file);
  if (PREVIEW) await final.clone().resize(800).jpeg({ quality: 82 }).toFile(path.join(PREVIEW, `${slot}.jpg`));
  console.log(`✓ ${slot} → ${p.file}  ${w}×${h}  ${Math.round(fs.statSync(file).size / 1024)} kB  — ${p.author}, ${p.page}`);
}

export const credits = Object.entries(photos).map(([slot, p]) => ({ slot, ...p }));
