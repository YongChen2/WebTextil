/**
 * Generátor produktových ilustrací pro obrazové kolonky webu.
 * Každá ilustrace je ručně kreslené SVG převedené přes sharp do WebP.
 *
 * Spuštění: node scripts/illustrations.mjs [slot ...]   (bez argumentů jen nášivky, viz DEFAULT_SLOTS)
 * Volitelně PREVIEW_DIR=/cesta uloží i JPG náhledy pro kontrolu.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/images");
const PREVIEW = process.env.PREVIEW_DIR;

// Paleta webu (src/app/globals.css) + dopočítané teplé odstíny
const C = {
  ink: "#111111",
  paper: "#ffffff",
  sand: "#f5f3f0",
  gold: "#b8976a",
  placeholder: "#e5e2dd",
  charcoal: "#2c2a28",
  graphite: "#3d3a37",
  slate: "#262b33",
  stone: "#b9b1a5",
  heather: "#bfb8ad",
  cream: "#ece5d8",
  linen: "#ebe4d9",
  goldDeep: "#8f7148",
  goldLight: "#dcc8a4",
  wood: "#c9a675",
  steel: "#c9c6c0",
};

// ---------- barvy ----------
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (a) =>
  "#" + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => {
  const A = rgb(a);
  const B = rgb(b);
  return hex(A.map((v, i) => v + (B[i] - v) * t));
};
const dark = (h, t) => mix(h, "#000000", t);
const light = (h, t) => mix(h, "#ffffff", t);

let uidCounter = 0;
const uid = (p) => `${p}${++uidCounter}`;

function bboxOf(d) {
  const n = (d.match(/-?\d*\.?\d+/g) || []).map(Number);
  const xs = [];
  const ys = [];
  for (let i = 0; i + 1 < n.length; i += 2) {
    xs.push(n[i]);
    ys.push(n[i + 1]);
  }
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x: x - 20, y: y - 20, w: Math.max(...xs) - x + 40, h: Math.max(...ys) - y + 40 };
}

// ---------- společné definice ----------
const DEFS = `
<defs>
  <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="blur5" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
  <filter id="blur10" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="22"/></filter>
  <filter id="shadowTight" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="noise" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="11"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.1 0 0 0 -0.42"/>
  </filter>
  <filter id="noiseLight" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.1 0 0 0 0.62"/>
  </filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.25" numOctaves="3" seed="21"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.08  1.4 0 0 0 -0.55"/>
  </filter>
  <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse">
    <path d="M0 1.5H6M1.5 0V6" stroke="#000" stroke-opacity=".07" stroke-width="1"/>
    <path d="M0 4.5H6M4.5 0V6" stroke="#fff" stroke-opacity=".08" stroke-width="1"/>
  </pattern>
  <pattern id="twill" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <path d="M0 2H7" stroke="#fff" stroke-opacity=".07" stroke-width="2"/>
    <path d="M0 5.5H7" stroke="#000" stroke-opacity=".12" stroke-width="1.2"/>
  </pattern>
  <pattern id="satinA" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
    <path d="M0 1H4.5" stroke="#fff" stroke-opacity=".32" stroke-width="1.3"/>
    <path d="M0 3.3H4.5" stroke="#000" stroke-opacity=".22" stroke-width="1"/>
  </pattern>
  <pattern id="satinB" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-48)">
    <path d="M0 1H4.5" stroke="#fff" stroke-opacity=".3" stroke-width="1.3"/>
    <path d="M0 3.3H4.5" stroke="#000" stroke-opacity=".22" stroke-width="1"/>
  </pattern>
  <pattern id="satinC" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
    <path d="M0 1H4.5" stroke="#fff" stroke-opacity=".3" stroke-width="1.3"/>
    <path d="M0 3.3H4.5" stroke="#000" stroke-opacity=".2" stroke-width="1"/>
  </pattern>
  <pattern id="rib" width="9" height="9" patternUnits="userSpaceOnUse">
    <path d="M2 0V9" stroke="#000" stroke-opacity=".16" stroke-width="2.2"/>
    <path d="M6.5 0V9" stroke="#fff" stroke-opacity=".1" stroke-width="2"/>
  </pattern>
  <pattern id="mesh" width="5" height="5" patternUnits="userSpaceOnUse">
    <path d="M0 .5H5M.5 0V5" stroke="#6b5a3e" stroke-opacity=".35" stroke-width=".8"/>
  </pattern>
  <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#d9b98a"/><stop offset=".5" stop-color="#c49b66"/><stop offset="1" stop-color="#a77f4d"/>
  </linearGradient>
  <linearGradient id="steelGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f1efeb"/><stop offset=".45" stop-color="#c8c4bd"/><stop offset=".55" stop-color="#a7a39b"/><stop offset="1" stop-color="#dedbd5"/>
  </linearGradient>
  <radialGradient id="vignette" cx=".5" cy=".46" r=".75">
    <stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".10"/>
  </radialGradient>
  <radialGradient id="spot" cx=".5" cy=".42" r=".55">
    <stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
</defs>`;

// ---------- stavební prvky ----------
const noiseRect = (b, op, filter = "noise") =>
  `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" filter="url(#${filter})" opacity="${op}"/>`;

/** Textilní díl: stín, výplň, vnitřní detaily, textura, světlo, jemný obrys. */
function piece({
  d,
  fill,
  extra = "",
  texture = 0.5,
  pattern = "",
  shadow = { dx: 0, dy: 16, op: 0.26, f: "shadow" },
  outline = 0.35,
  shade = true,
  bbox,
}) {
  const b = bbox || bboxOf(d);
  const cid = uid("clip");
  const gid = uid("shade");
  return `
  ${shadow ? `<path d="${d}" fill="#000" opacity="${shadow.op}" filter="url(#${shadow.f})" transform="translate(${shadow.dx} ${shadow.dy})"/>` : ""}
  <clipPath id="${cid}"><path d="${d}"/></clipPath>
  <path d="${d}" fill="${fill}"/>
  <g clip-path="url(#${cid})">
    ${pattern ? `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#${pattern})"/>` : ""}
    ${extra}
    ${texture ? noiseRect(b, texture) + noiseRect(b, texture * 0.5, "noiseLight") : ""}
    ${
      shade
        ? `<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="${b.x}" y1="${b.y}" x2="${b.x + b.w}" y2="${b.y + b.h}">
        <stop offset="0" stop-color="#fff" stop-opacity=".13"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
        <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#${gid})"/>`
        : ""
    }
  </g>
  ${outline ? `<path d="${d}" fill="none" stroke="${dark(fill, 0.5)}" stroke-opacity="${outline}" stroke-width="1.6"/>` : ""}`;
}

const fold = (d, op = 0.16, f = "blur10", color = "#000") =>
  `<path d="${d}" fill="${color}" opacity="${op}" filter="url(#${f})"/>`;
const hi = (d, op = 0.12, f = "blur10") => fold(d, op, f, "#fff");
const stitch = (d, color, op = 0.55, w = 1.8, dash = "7 6") =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="${w}" stroke-dasharray="${dash}" stroke-linecap="round"/>`;
const line = (d, color, w = 2, op = 1) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-opacity="${op}" stroke-linecap="round" stroke-linejoin="round"/>`;
const g = (t, inner) => `<g transform="${t}">${inner}</g>`;

// ---------- pozadí ----------
function bgLinen(W, H, base = C.linen) {
  const b = { x: 0, y: 0, w: W, h: H };
  return `<rect width="${W}" height="${H}" fill="${base}"/>
  <rect width="${W}" height="${H}" fill="url(#weave)"/>
  ${noiseRect(b, 0.28)}${noiseRect(b, 0.25, "noiseLight")}
  <rect width="${W}" height="${H}" fill="url(#spot)" opacity=".55"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

function bgStudio(W, H, floorY = null) {
  const id = uid("wall");
  const fid = uid("floor");
  const b = { x: 0, y: 0, w: W, h: H };
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f6f3ee"/><stop offset="1" stop-color="#e9e3da"/></linearGradient>
  <rect width="${W}" height="${H}" fill="url(#${id})"/>
  ${
    floorY
      ? `<linearGradient id="${fid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2dbd0"/><stop offset="1" stop-color="#d8d0c3"/></linearGradient>
         <rect y="${floorY}" width="${W}" height="${H - floorY}" fill="url(#${fid})"/>
         <rect y="${floorY - 30}" width="${W}" height="60" fill="#fff" opacity=".25" filter="url(#blur10)"/>`
      : ""
  }
  ${noiseRect(b, 0.12)}
  <rect width="${W}" height="${H}" fill="url(#spot)" opacity=".7"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

function bgWood(W, H) {
  const b = { x: 0, y: 0, w: W, h: H };
  let planks = "";
  for (let y = 0; y < H; y += 214) {
    planks += `<rect y="${y}" width="${W}" height="2" fill="#7a5a33" opacity=".25"/>`;
  }
  return `<rect width="${W}" height="${H}" fill="#d8bf98"/>
  ${noiseRect(b, 0.55, "grain")}
  ${planks}
  ${noiseRect(b, 0.18)}
  <rect width="${W}" height="${H}" fill="url(#spot)" opacity=".35"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

// ---------- předměty ----------

/** Tričko položené naplocho (lokální souřadnice ~150–850 × 150–860). */
function tshirt(color, print = "") {
  const D =
    "M415,178 C440,230 560,230 585,178 L670,192 C720,212 800,262 850,325 L790,425 L682,368 C686,520 684,700 686,842 Q500,860 314,842 C316,700 314,520 318,368 L210,425 L150,325 C200,262 280,212 330,192 Z";
  const s = dark(color, 0.35);
  const extra = `
    ${print}
    ${fold("M330,380 C385,455 400,565 362,705 C350,600 338,480 330,380 Z", 0.22)}
    ${fold("M670,380 C615,455 600,565 638,705 C650,600 662,480 670,380 Z", 0.18)}
    ${fold("M440,640 C500,690 560,750 610,850 C545,790 490,720 440,640 Z", 0.12)}
    ${fold("M205,330 C250,350 285,380 300,420 C270,395 240,370 205,330 Z", 0.18, "blur5")}
    ${hi("M560,300 C610,380 625,470 612,560 C598,470 585,390 560,300 Z", 0.1)}
    ${hi("M380,260 C420,300 430,340 420,380 C405,340 395,300 380,260 Z", 0.08)}
    ${stitch("M332,196 C346,262 336,320 320,366", s)}
    ${stitch("M668,196 C654,262 664,320 680,366", s)}
    ${stitch("M172,312 L228,408", s)}
    ${stitch("M828,312 L772,408", s)}
    ${stitch("M318,820 Q500,838 682,820", s)}`;
  return `
    <path d="M415,178 Q500,150 585,178 C560,226 440,226 415,178 Z" fill="${dark(color, 0.45)}"/>
    ${piece({ d: D, fill: color, extra, texture: 0.3 })}
    ${line("M415,178 Q500,152 585,178", dark(color, 0.18), 12)}
    ${line("M417,185 C442,238 558,238 583,185", dark(color, 0.08), 15)}
    ${stitch("M421,197 C448,248 552,248 579,197", s, 0.5, 1.5, "5 5")}`;
}

/** Abstraktní geometrický potisk (žádný text ani logo). */
function printMark(cx, cy, r, a = C.gold, b = C.cream, c = C.ink) {
  return `<g opacity=".96">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${a}"/>
    <path d="M${cx - r},${cy} A${r},${r} 0 0 0 ${cx + r},${cy} Z" fill="${b}"/>
    <circle cx="${cx + r * 0.42}" cy="${cy - r * 0.42}" r="${r * 0.16}" fill="${c}"/>
    <rect x="${cx - r * 0.9}" y="${cy + r * 1.28}" width="${r * 1.8}" height="${r * 0.07}" fill="${b}"/>
    <rect x="${cx - r * 0.6}" y="${cy + r * 1.48}" width="${r * 1.2}" height="${r * 0.07}" fill="${a}"/>
  </g>`;
}

/** Sítotisková stěrka (pohled shora). */
function squeegee(len = 320) {
  return `
    <rect x="4" y="10" width="${len}" height="56" rx="10" fill="#000" opacity=".25" filter="url(#shadowTight)"/>
    <rect x="0" y="0" width="${len}" height="40" rx="8" fill="url(#woodGrad)"/>
    <rect x="0" y="36" width="${len}" height="18" rx="3" fill="#1d1c1b"/>
    <rect x="0" y="36" width="${len}" height="4" fill="#fff" opacity=".12"/>
    <rect x="8" y="6" width="${len - 16}" height="5" rx="2.5" fill="#fff" opacity=".22"/>`;
}

/** Vyšívaná kulatá našívka. */
function patch({ cx, cy, r, base, ring, motif }) {
  const cid = uid("pc");
  let border = "";
  const n = Math.round((2 * Math.PI * r) / 3.2);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r - 15);
    const y1 = cy + Math.sin(a) * (r - 15);
    const x2 = cx + Math.cos(a + 0.02) * (r + 1);
    const y2 = cy + Math.sin(a + 0.02) * (r + 1);
    border += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 2 ? light(ring, 0.18) : dark(ring, 0.18)}" stroke-width="2"/>`;
  }
  const hid = uid("ph");
  return `
    <circle cx="${cx + 4}" cy="${cy + 12}" r="${r}" fill="#000" opacity=".3" filter="url(#blur10)"/>
    <circle cx="${cx}" cy="${cy + 4}" r="${r}" fill="${dark(ring, 0.45)}"/>
    <clipPath id="${cid}"><circle cx="${cx}" cy="${cy}" r="${r - 14}"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${ring}"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="${base}"/>
    <g clip-path="url(#${cid})">
      <rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="url(#satinA)" opacity=".7"/>
      ${motif}
      ${noiseRect({ x: cx - r, y: cy - r, w: 2 * r, h: 2 * r }, 0.35)}
    </g>
    ${border}
    <circle cx="${cx}" cy="${cy}" r="${r - 15}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>
    <radialGradient id="${hid}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${hid})"/>`;
}

const satin = (d, fill, p = "satinB") => `<path d="${d}" fill="${fill}"/><path d="${d}" fill="url(#${p})"/>`;

const motifs = {
  mountains: (cx, cy, r, sun = C.gold, peak = C.cream, deep = C.stone) => `
    ${satin(`M${cx} ${cy - r * 0.62} m-${r * 0.24} 0 a${r * 0.24} ${r * 0.24} 0 1 0 ${r * 0.48} 0 a${r * 0.24} ${r * 0.24} 0 1 0 -${r * 0.48} 0`, sun, "satinC")}
    ${satin(`M${cx - r * 0.95},${cy + r * 0.32} L${cx - r * 0.35},${cy - r * 0.28} L${cx - r * 0.05},${cy + r * 0.02} L${cx + r * 0.3},${cy - r * 0.42} L${cx + r * 0.95},${cy + r * 0.32} Z`, peak, "satinB")}
    ${satin(`M${cx - r * 0.95},${cy + r * 0.32} L${cx - r * 0.35},${cy - r * 0.28} L${cx - r * 0.2},${cy - r * 0.13} L${cx - r * 0.42},${cy + r * 0.32} Z`, deep, "satinA")}
    ${satin(`M${cx + r * 0.3},${cy - r * 0.42} L${cx + r * 0.95},${cy + r * 0.32} L${cx + r * 0.45},${cy + r * 0.32} L${cx + r * 0.42},${cy - r * 0.28} Z`, deep, "satinA")}
    ${[0.48, 0.64, 0.8].map((k, i) => `<rect x="${cx - r * (0.7 - i * 0.12)}" y="${cy + r * k}" width="${r * (1.4 - i * 0.24)}" height="${r * 0.07}" fill="${i % 2 ? sun : peak}"/>`).join("")}`,
  arcs: (cx, cy, r, cols = [C.gold, C.ink, C.stone, C.gold]) =>
    cols
      .map(
        (c, i) =>
          `<path d="M${cx - r * (0.78 - i * 0.17)},${cy + r * 0.28} A${r * (0.78 - i * 0.17)},${r * (0.78 - i * 0.17)} 0 0 1 ${cx + r * (0.78 - i * 0.17)},${cy + r * 0.28}" fill="none" stroke="${c}" stroke-width="${r * 0.13}"/>
           <path d="M${cx - r * (0.78 - i * 0.17)},${cy + r * 0.28} A${r * (0.78 - i * 0.17)},${r * (0.78 - i * 0.17)} 0 0 1 ${cx + r * (0.78 - i * 0.17)},${cy + r * 0.28}" fill="none" stroke="url(#satinA)" stroke-width="${r * 0.13}"/>`,
      )
      .join("") +
    `<rect x="${cx - r * 0.85}" y="${cy + r * 0.34}" width="${r * 1.7}" height="${r * 0.08}" fill="${cols[1]}"/>`,
  star: (cx, cy, r, a = C.gold, b = C.cream) => {
    const pts = (k, rot) =>
      Array.from({ length: 16 }, (_, i) => {
        const ang = (i / 16) * Math.PI * 2 + rot;
        const rr = i % 2 ? r * k * 0.42 : r * k;
        return `${(cx + Math.cos(ang) * rr).toFixed(1)},${(cy + Math.sin(ang) * rr).toFixed(1)}`;
      }).join(" ");
    return `<polygon points="${pts(0.72, 0)}" fill="${a}"/><polygon points="${pts(0.72, 0)}" fill="url(#satinB)"/>
      <polygon points="${pts(0.36, Math.PI / 8)}" fill="${b}"/><polygon points="${pts(0.36, Math.PI / 8)}" fill="url(#satinA)"/>
      <circle cx="${cx}" cy="${cy}" r="${r * 0.1}" fill="${a}"/>`;
  },
  waves: (cx, cy, r, a = C.gold, b = C.cream) =>
    [-0.35, -0.05, 0.25]
      .map(
        (k, i) =>
          `<path d="M${cx - r * 0.8},${cy + r * k} q${r * 0.2},-${r * 0.2} ${r * 0.4},0 t${r * 0.4},0 t${r * 0.4},0 t${r * 0.4},0" fill="none" stroke="${i % 2 ? b : a}" stroke-width="${r * 0.12}" stroke-linecap="round"/>`,
      )
      .join(""),
  // Slunce: satinový kotouč a dvanáct paprsků
  sun: (cx, cy, r, a = C.gold, b = C.cream) => {
    const rays = Array.from({ length: 12 }, (_, i) => {
      const ang = (i / 12) * Math.PI * 2;
      const p = (k, off) => `${(cx + Math.cos(ang + off) * r * k).toFixed(1)},${(cy + Math.sin(ang + off) * r * k).toFixed(1)}`;
      return `${p(0.5, -0.13)} ${p(0.82, 0)} ${p(0.5, 0.13)}`;
    });
    return (
      rays.map((pts) => `<polygon points="${pts}" fill="${b}"/><polygon points="${pts}" fill="url(#satinC)"/>`).join("") +
      satin(`M${cx - r * 0.4},${cy} a${r * 0.4},${r * 0.4} 0 1 0 ${r * 0.8},0 a${r * 0.4},${r * 0.4} 0 1 0 -${r * 0.8},0`, a, "satinA") +
      `<circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="none" stroke="${dark(a, 0.3)}" stroke-width="3" stroke-dasharray="3 4"/>`
    );
  },
  // Květina: šest okvětních lístků kolem středu
  flower: (cx, cy, r, petal = C.cream, center = C.gold, leaf = "#7d8a5a") => {
    const leaves = [-0.55, 0.55]
      .map((rot) => `<g transform="rotate(${(rot * 180) / Math.PI} ${cx} ${cy})">${satin(`M${cx},${cy} q${r * 0.28},${r * 0.45} 0,${r * 0.85} q-${r * 0.28},-${r * 0.45} 0,-${r * 0.85}`, leaf, "satinB")}</g>`)
      .join("");
    const petals = Array.from({ length: 6 }, (_, i) =>
      `<g transform="rotate(${i * 60} ${cx} ${cy})">${satin(`M${cx},${cy} q${r * 0.3},-${r * 0.35} 0,-${r * 0.68} q-${r * 0.3},${r * 0.33} 0,${r * 0.68}`, i % 2 ? petal : light(petal, 0.25), i % 2 ? "satinA" : "satinB")}</g>`,
    ).join("");
    return leaves + petals + satin(`M${cx - r * 0.17},${cy} a${r * 0.17},${r * 0.17} 0 1 0 ${r * 0.34},0 a${r * 0.17},${r * 0.17} 0 1 0 -${r * 0.34},0`, center, "satinC");
  },
  // Geometrický motiv: do sebe vložené kosočtverce ve střídavých barvách
  geo: (cx, cy, r, cols = [C.gold, C.cream, C.ink, C.gold]) =>
    cols
      .map((c, i) => {
        const k = r * (0.78 - i * 0.18);
        const d = `M${cx},${cy - k} L${cx + k},${cy} L${cx},${cy + k} L${cx - k},${cy} Z`;
        return satin(d, c, i % 2 ? "satinA" : "satinB");
      })
      .join("") +
    [-1, 1].map((sx) => `<path d="M${cx + sx * r * 0.86},${cy - r * 0.3} L${cx + sx * r * 0.86},${cy + r * 0.3}" stroke="${cols[0]}" stroke-width="${r * 0.08}"/>`).join(""),
};

/** Cívka nití (pohled z boku, naležato). */
function spool(color, len = 170) {
  let wraps = "";
  for (let x = 22; x < len - 22; x += 4) {
    wraps += `<line x1="${x}" y1="10" x2="${x + 3}" y2="74" stroke="${x % 8 ? light(color, 0.2) : dark(color, 0.25)}" stroke-width="1.6" opacity=".55"/>`;
  }
  const cg = uid("cyl");
  return `
    <rect x="6" y="18" width="${len}" height="84" rx="12" fill="#000" opacity=".28" filter="url(#blur10)"/>
    <rect x="18" y="8" width="${len - 36}" height="68" fill="${color}"/>
    ${wraps}
    <linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
    <rect x="18" y="8" width="${len - 36}" height="68" fill="url(#${cg})"/>
    <rect x="0" y="0" width="20" height="84" rx="4" fill="url(#woodGrad)"/>
    <rect x="${len - 20}" y="0" width="20" height="84" rx="4" fill="url(#woodGrad)"/>
    <rect x="0" y="0" width="20" height="84" rx="4" fill="url(#${cg})"/>
    <rect x="${len - 20}" y="0" width="20" height="84" rx="4" fill="url(#${cg})"/>`;
}

/** Jehla s nití. */
function needle(len = 260) {
  return `
    <path d="M0,0 L${len},-3 L${len + 22},0 L${len},3 Z" fill="#000" opacity=".25" filter="url(#blur2)" transform="translate(4 8)"/>
    <path d="M0,-3 Q-6,0 0,3 L${len},3 L${len + 22},0 L${len},-3 Z" fill="url(#steelGrad)"/>
    <ellipse cx="14" cy="0" rx="8" ry="1.6" fill="#6f6b64"/>
    <path d="M0,-1 L${len},-1" stroke="#fff" stroke-opacity=".6" stroke-width="1"/>`;
}

/** Krejčovský metr jako stuha podél cesty. */
function tape(d, w = 34) {
  return `
    <path d="${d}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="${w}" filter="url(#blur5)" transform="translate(3 9)"/>
    <path d="${d}" fill="none" stroke="#cdb88d" stroke-width="${w}"/>
    <path d="${d}" fill="none" stroke="#f1e6c9" stroke-width="${w - 5}"/>
    <path d="${d}" fill="none" stroke="${C.ink}" stroke-opacity=".75" stroke-width="${w * 0.32}" stroke-dasharray="1.6 7.4"/>
    <path d="${d}" fill="none" stroke="${C.ink}" stroke-opacity=".85" stroke-width="${w * 0.6}" stroke-dasharray="2.2 42.8"/>
    <path d="${d}" fill="none" stroke="#b5322a" stroke-opacity=".55" stroke-width="${w * 0.22}" stroke-dasharray="2 88" stroke-dashoffset="20"/>`;
}

/** Sako na ramínku (lokální souřadnice ~200–800 × 60–1010). */
function blazer(color, lining = "#9b8160", { hanger = true } = {}) {
  const s = dark(color, 0.35);
  const lapelFill = light(color, 0.04);
  const BODY =
    "M300,212 Q380,192 438,198 L500,560 L562,198 Q620,192 700,212 C736,236 744,300 738,382 C742,560 752,800 764,1000 Q640,1022 520,1008 L480,1008 Q360,1022 236,1000 C248,800 258,560 262,382 C256,300 264,236 300,212 Z";
  const SL = "M300,212 C240,232 222,300 220,380 C214,520 206,680 200,832 Q232,850 272,840 C282,700 292,540 306,410 Z";
  const SR = "M700,212 C760,232 778,300 780,380 C786,520 794,680 800,832 Q768,850 728,840 C718,700 708,540 694,410 Z";
  const LL = "M438,198 L414,206 C400,240 388,272 380,300 L420,318 L392,346 C430,430 468,520 500,612 L500,560 Z";
  const LR = "M562,198 L586,206 C600,240 612,272 620,300 L580,318 L608,346 C570,430 532,520 500,612 L500,560 Z";
  const PL = "M296,800 L436,794 L437,834 L298,840 Z";
  const PR = "M704,800 L564,794 L563,834 L702,840 Z";
  const sleeveExtra = (left) => `
    ${fold(left ? "M236,420 C238,560 236,700 230,820 C222,700 226,560 236,420 Z" : "M764,420 C762,560 764,700 770,820 C778,700 774,560 764,420 Z", 0.25)}
    ${[0, 1, 2].map((i) => `<circle cx="${left ? 254 + i * 2 : 746 - i * 2}" cy="${800 - i * 22}" r="6" fill="${dark(color, 0.55)}"/><circle cx="${left ? 252 + i * 2 : 744 - i * 2}" cy="${798 - i * 22}" r="2" fill="#fff" opacity=".35"/>`).join("")}`;
  const bodyExtra = `
    ${fold("M300,430 C312,580 318,760 308,960 C292,780 292,600 300,430 Z", 0.3)}
    ${fold("M700,430 C688,580 682,760 692,960 C708,780 708,600 700,430 Z", 0.3)}
    ${fold("M420,640 C440,760 450,880 440,1000 C425,880 415,760 420,640 Z", 0.16)}
    ${hi("M600,640 C585,760 580,880 590,1000 C602,880 608,760 600,640 Z", 0.1)}
    ${hi("M330,240 C380,260 420,300 440,340 C400,310 360,280 330,240 Z", 0.12)}
    ${stitch("M380,470 C385,600 390,720 392,790", s, 0.4)}
    ${stitch("M620,470 C615,600 610,720 608,790", s, 0.4)}
    ${line("M500,612 L502,930 C500,965 486,995 462,1010", dark(color, 0.55), 3)}
    ${fold("M502,612 L510,612 L512,930 C510,965 500,995 476,1010 L466,1010 C490,995 504,965 506,930 Z", 0.35, "blur2")}`;
  return `
    ${
      hanger
        ? `${line("M500,150 L500,98 C500,62 538,58 548,86", "#8f8a82", 9)}${line("M500,150 L500,98 C500,62 538,58 548,86", "#e7e4de", 3, 0.7)}
           <path d="M232,232 Q500,120 768,232 Q772,248 758,250 Q500,148 242,250 Q228,248 232,232 Z" fill="url(#woodGrad)"/>`
        : ""
    }
    <path d="M432,196 Q500,176 568,196 L500,600 Z" fill="${lining}"/>
    <path d="M432,196 Q500,176 568,196 L500,600 Z" fill="url(#satinC)" opacity=".4"/>
    ${fold("M440,200 L500,560 L560,200 Q500,240 440,200 Z", 0.35, "blur10")}
    ${piece({ d: SL, fill: dark(color, 0.06), extra: sleeveExtra(true), pattern: "twill", shadow: { dx: 6, dy: 20, op: 0.22, f: "shadow" } })}
    ${piece({ d: SR, fill: dark(color, 0.1), extra: sleeveExtra(false), pattern: "twill", shadow: { dx: 6, dy: 20, op: 0.22, f: "shadow" } })}
    ${piece({ d: BODY, fill: color, extra: bodyExtra, pattern: "twill", shadow: { dx: 8, dy: 26, op: 0.3, f: "shadow" } })}
    ${stitch("M300,214 C286,270 292,340 306,410", s)}
    ${stitch("M700,214 C714,270 708,340 694,410", s)}
    <path d="M414,206 Q500,186 586,206 L568,196 Q500,178 432,196 Z" fill="${dark(color, 0.2)}"/>
    ${piece({ d: LL, fill: lapelFill, pattern: "twill", shadow: { dx: 3, dy: 6, op: 0.35, f: "blur5" }, outline: 0.5 })}
    ${piece({ d: LR, fill: lapelFill, pattern: "twill", shadow: { dx: -3, dy: 6, op: 0.35, f: "blur5" }, outline: 0.5 })}
    ${line("M380,300 L420,318 L392,346", dark(color, 0.6), 2.4)}
    ${line("M620,300 L580,318 L608,346", dark(color, 0.6), 2.4)}
    ${stitch("M424,214 C410,250 398,280 392,300", light(color, 0.25), 0.35, 1.3, "4 4")}
    ${stitch("M576,214 C590,250 602,280 608,300", light(color, 0.25), 0.35, 1.3, "4 4")}
    ${piece({ d: PL, fill: light(color, 0.03), pattern: "twill", shadow: { dx: 0, dy: 5, op: 0.4, f: "blur5" }, outline: 0.6 })}
    ${piece({ d: PR, fill: light(color, 0.03), pattern: "twill", shadow: { dx: 0, dy: 5, op: 0.4, f: "blur5" }, outline: 0.6 })}
    ${line("M590,452 L684,440", dark(color, 0.6), 3)}
    ${line("M592,470 L686,458", dark(color, 0.5), 2)}
    ${[700, 790].map((y) => `<circle cx="514" cy="${y + 3}" r="12" fill="#000" opacity=".35" filter="url(#blur2)"/><circle cx="512" cy="${y}" r="12" fill="${dark(color, 0.55)}"/><circle cx="512" cy="${y}" r="8" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.5"/><circle cx="509" cy="${y - 3}" r="2.4" fill="#fff" opacity=".35"/>`).join("")}`;
}

/** Plátěná taška (lokální ~230–770 × 150–915). */
function tote(color, print) {
  const BAG = "M260,380 L740,380 L770,900 Q500,916 230,900 Z";
  const h = dark(color, 0.12);
  return `
    ${line("M392,384 C385,205 615,205 608,384", dark(color, 0.3), 34)}
    ${line("M392,384 C385,205 615,205 608,384", "url(#weave)", 34)}
    ${piece({
      d: BAG,
      fill: color,
      pattern: "weave",
      texture: 0.32,
      extra: `${print}
        ${fold("M300,420 C320,600 310,760 290,900 C280,760 290,600 300,420 Z", 0.12)}
        ${fold("M690,420 C705,600 720,760 735,900 C745,760 720,600 690,420 Z", 0.18)}
        ${hi("M520,420 C540,600 545,760 530,900 C560,760 560,600 520,420 Z", 0.08)}
        <rect x="250" y="380" width="500" height="40" fill="#000" opacity=".06"/>
        ${stitch("M262,416 L738,416", dark(color, 0.4), 0.6)}
        ${stitch("M240,878 Q500,894 760,878", dark(color, 0.4), 0.5)}`,
      shadow: { dx: 10, dy: 22, op: 0.3, f: "shadow" },
    })}
    ${line("M370,384 C360,168 640,168 630,384", h, 36)}
    ${line("M370,384 C360,168 640,168 630,384", "url(#weave)", 36)}
    ${stitch("M357,384 C348,175 652,175 643,384", dark(color, 0.4), 0.5, 1.4, "5 5")}
    ${stitch("M383,384 C374,195 626,195 617,384", dark(color, 0.4), 0.5, 1.4, "5 5")}
    ${[370, 630].map((x) => `<rect x="${x - 18}" y="388" width="36" height="40" fill="none" stroke="${dark(color, 0.4)}" stroke-opacity=".6" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M${x - 18},388 L${x + 18},428 M${x + 18},388 L${x - 18},428" stroke="${dark(color, 0.4)}" stroke-opacity=".6" stroke-width="1.5" stroke-dasharray="4 3"/>`).join("")}`;
}

/** Kšiltovka zepředu (lokální ~200–800 × 280–770). */
function cap(color, patchInner) {
  const CROWN = "M272,640 C262,420 372,292 500,290 C628,292 738,420 728,640 Q500,606 272,640 Z";
  const BRIM = "M250,646 Q500,598 750,646 C772,700 706,786 500,796 C294,786 228,700 250,646 Z";
  const s = dark(color, 0.35);
  const hid = uid("cr");
  return `
    <ellipse cx="500" cy="800" rx="270" ry="34" fill="#000" opacity=".3" filter="url(#shadow)"/>
    ${piece({
      d: CROWN,
      fill: color,
      pattern: "twill",
      extra: `
        <radialGradient id="${hid}" cx=".35" cy=".25" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></radialGradient>
        <rect x="230" y="290" width="540" height="360" fill="url(#${hid})"/>
        ${line("M500,302 C430,360 382,480 364,632", dark(color, 0.3), 2.5, 0.8)}
        ${line("M500,302 C570,360 618,480 636,632", dark(color, 0.3), 2.5, 0.8)}
        ${stitch("M492,306 C424,364 374,480 354,632", s, 0.45, 1.4, "5 5")}
        ${stitch("M508,306 C576,364 626,480 646,632", s, 0.45, 1.4, "5 5")}
        ${stitch("M482,306 C414,366 364,480 344,632", s, 0.35, 1.4, "5 5")}
        ${stitch("M518,306 C586,366 636,480 656,632", s, 0.35, 1.4, "5 5")}
        ${fold("M262,600 Q500,560 738,600 L740,640 Q500,600 260,640 Z", 0.25, "blur5")}`,
      shadow: null,
    })}
    ${[
      [380, 410],
      [620, 410],
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${dark(color, 0.25)}"/><circle cx="${x}" cy="${y}" r="4.5" fill="${dark(color, 0.6)}"/>`)
      .join("")}
    <ellipse cx="500" cy="302" rx="26" ry="11" fill="${dark(color, 0.18)}"/>
    <ellipse cx="497" cy="299" rx="12" ry="4" fill="#fff" opacity=".3"/>
    ${patchInner}
    <path d="M256,652 Q500,610 744,652" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="10" filter="url(#blur5)"/>
    ${piece({
      d: BRIM,
      fill: dark(color, 0.04),
      pattern: "twill",
      extra: `
        ${[0, 1, 2, 3, 4].map((i) => stitch(`M${270 + i * 6},${672 + i * 12} Q500,${632 + i * 14} ${730 - i * 6},${672 + i * 12}`, s, 0.45, 1.4, "5 5")).join("")}
        ${fold("M262,700 C300,760 400,790 500,792 C600,790 700,760 738,700 C720,770 640,800 500,806 C360,800 280,770 262,700 Z", 0.25, "blur5")}`,
      shadow: { dx: 0, dy: 10, op: 0.25, f: "blur10" },
    })}`;
}

/** Mikina s kapucí naplocho (lokální ~110–890 × 80–885). */
function hoodie(color, chestPatch) {
  const SL = "M330,250 C260,280 200,360 170,460 L120,760 Q150,790 205,782 L250,520 L318,420 Z";
  const SR = "M670,250 C740,280 800,360 830,460 L880,760 Q850,790 795,782 L750,520 L682,420 Z";
  const BODY =
    "M330,250 Q400,228 432,232 C452,262 548,262 568,232 Q600,228 670,250 C690,330 686,380 682,420 L688,800 L312,800 L318,420 C314,380 310,330 330,250 Z";
  const HOOD = "M396,252 C372,150 428,86 500,84 C572,86 628,150 604,252 C580,226 420,226 396,252 Z";
  const s = dark(color, 0.35);
  const ribFill = dark(color, 0.06);
  return `
    ${piece({ d: HOOD, fill: dark(color, 0.05), extra: `${fold("M420,240 C430,170 460,130 500,128 C540,130 570,170 580,240 Z", 0.25)}`, shadow: { dx: 4, dy: 14, op: 0.24, f: "shadow" } })}
    <path d="M432,244 C432,176 462,140 500,140 C538,140 568,176 568,244 C548,262 452,262 432,244 Z" fill="${dark(color, 0.32)}"/>
    ${fold("M440,240 C445,190 470,160 500,158 C530,160 555,190 560,240 Z", 0.25, "blur5")}
    ${piece({ d: SL, fill: dark(color, 0.03), extra: `${fold("M230,380 C215,500 190,640 170,760 C200,640 220,500 230,380 Z", 0.2)}${stitch("M318,262 C300,320 306,380 318,420", s)}`, shadow: { dx: 6, dy: 18, op: 0.22, f: "shadow" } })}
    ${piece({ d: SR, fill: dark(color, 0.07), extra: `${fold("M770,380 C785,500 810,640 830,760 C800,640 780,500 770,380 Z", 0.2)}${stitch("M682,262 C700,320 694,380 682,420", s)}`, shadow: { dx: 6, dy: 18, op: 0.22, f: "shadow" } })}
    ${piece({ d: "M120,760 L205,782 L196,842 L110,822 Z", fill: ribFill, pattern: "rib", shadow: null })}
    ${piece({ d: "M880,760 L795,782 L804,842 L890,822 Z", fill: ribFill, pattern: "rib", shadow: null })}
    ${piece({
      d: BODY,
      fill: color,
      extra: `
        ${fold("M340,440 C352,560 356,680 348,800 C334,680 332,560 340,440 Z", 0.18)}
        ${fold("M660,440 C648,560 644,680 652,800 C666,680 668,560 660,440 Z", 0.2)}
        ${hi("M560,300 C600,380 610,460 600,540 C585,460 575,380 560,300 Z", 0.1)}
        <path d="M382,600 L618,600 L662,762 L338,762 Z" fill="#000" opacity=".12" filter="url(#blur5)" transform="translate(0 6)"/>
        <path d="M382,600 L618,600 L662,762 L338,762 Z" fill="${light(color, 0.02)}"/>
        ${line("M382,600 C362,650 348,710 338,762", dark(color, 0.5), 3)}
        ${line("M618,600 C638,650 652,710 662,762", dark(color, 0.5), 3)}
        ${stitch("M386,608 L614,608", s, 0.5)}
        ${stitch("M392,604 C372,652 358,710 348,758", s, 0.4)}
        ${stitch("M608,604 C628,652 642,710 652,758", s, 0.4)}
        ${chestPatch}`,
      shadow: { dx: 8, dy: 22, op: 0.28, f: "shadow" },
    })}
    ${piece({ d: "M312,800 L688,800 L686,876 Q500,888 314,876 Z", fill: ribFill, pattern: "rib", shadow: null })}
    ${[
      ["M470,258 C468,320 462,380 458,436", 458, 436],
      ["M530,258 C534,320 540,370 546,424", 546, 424],
    ]
      .map(
        ([d, x, y]) =>
          `${line(d, "#000", 9, 0.18)}${line(d, C.cream, 7)}${line(d, "#fff", 2, 0.4)}<rect x="${x - 5}" y="${y}" width="10" height="26" rx="3" fill="url(#steelGrad)"/>`,
      )
      .join("")}
    <circle cx="470" cy="258" r="7" fill="url(#steelGrad)" stroke="${dark(color, 0.4)}" stroke-width="1.5"/>
    <circle cx="530" cy="258" r="7" fill="url(#steelGrad)" stroke="${dark(color, 0.4)}" stroke-width="1.5"/>`;
}

/** Složené tričko (pohled shora, lokální 0–400 × 0–520). */
function foldedTee(color, print = "") {
  const D = "M40,62 Q40,40 62,40 L338,40 Q360,40 360,62 L360,470 Q360,492 338,492 L62,492 Q40,492 40,470 Z";
  const s = dark(color, 0.35);
  return `
    ${piece({
      d: D,
      fill: color,
      extra: `
        ${print}
        ${fold("M40,40 L104,40 L104,492 L40,492 Z", 0.16, "blur5")}
        ${fold("M296,40 L360,40 L360,492 L296,492 Z", 0.24, "blur5")}
        ${hi("M110,60 L150,60 L150,480 L110,480 Z", 0.12, "blur10")}
        ${line("M104,48 L104,486", dark(color, 0.25), 2, 0.6)}
        ${line("M296,48 L296,486", dark(color, 0.25), 2, 0.6)}
        ${fold("M40,300 L360,300 L360,318 L40,318 Z", 0.14, "blur5")}
        ${hi("M40,322 L360,322 L360,336 L40,336 Z", 0.1, "blur5")}
        ${stitch("M44,468 L356,468", s, 0.45)}`,
      shadow: { dx: 6, dy: 14, op: 0.3, f: "blur10" },
      texture: 0.3,
    })}
    <path d="M136,40 Q200,10 264,40 C252,100 148,100 136,40 Z" fill="${dark(color, 0.5)}"/>
    ${fold("M150,44 Q200,24 250,44 C240,80 160,80 150,44 Z", 0.35, "blur5")}
    ${line("M136,40 Q200,12 264,40", dark(color, 0.12), 10)}
    ${line("M138,46 C150,106 250,106 262,46", dark(color, 0.08), 14)}
    ${stitch("M144,58 C158,114 242,114 256,58", s, 0.5, 1.3, "4 4")}
    ${line("M136,44 L44,72", dark(color, 0.22), 2, 0.7)}
    ${line("M264,44 L356,72", dark(color, 0.22), 2, 0.7)}`;
}

/** Nůžky (pivot v 0,0). */
function scissors() {
  return `
    <g transform="translate(6 12)" opacity=".3" filter="url(#blur5)">
      <path d="M0,-8 L330,-4 L330,6 L0,10 Z"/><circle cx="-120" cy="-40" r="50"/><ellipse cx="-130" cy="45" rx="66" ry="44"/>
    </g>
    <g transform="rotate(-5)"><path d="M-20,-9 L320,-5 Q350,0 320,5 L-20,10 Z" fill="url(#steelGrad)"/><path d="M-20,-3 L330,-1" stroke="#fff" stroke-opacity=".7" stroke-width="1.2"/></g>
    <g transform="rotate(5)"><path d="M-20,-10 L320,-5 Q348,0 320,5 L-20,9 Z" fill="url(#steelGrad)"/><path d="M-20,2 L330,1" stroke="#7d7972" stroke-opacity=".6" stroke-width="1.2"/></g>
    ${line("M-10,-6 C-50,-14 -70,-26 -82,-34", C.ink, 22)}
    ${line("M-10,6 C-50,16 -72,30 -84,38", C.ink, 22)}
    <circle cx="-120" cy="-40" r="44" fill="none" stroke="${C.ink}" stroke-width="20"/>
    <ellipse cx="-132" cy="46" rx="58" ry="38" fill="none" stroke="${C.ink}" stroke-width="20"/>
    <circle cx="-126" cy="-52" r="40" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="5"/>
    <circle cx="0" cy="0" r="9" fill="url(#steelGrad)" stroke="#6f6b64" stroke-width="1.5"/>
    <path d="M-5,0 L5,0" stroke="#55514b" stroke-width="2"/>`;
}

/** Svinutý krejčovský metr (pohled shora). */
function tapeCoil(r = 110) {
  let rings = "";
  for (let rr = 26; rr <= r; rr += 12) {
    rings += `<circle r="${rr}" fill="none" stroke="#cdb88d" stroke-width="12"/><circle r="${rr}" fill="none" stroke="#f1e6c9" stroke-width="9"/>`;
  }
  return `
    <circle cx="5" cy="12" r="${r + 8}" fill="#000" opacity=".3" filter="url(#blur10)"/>
    ${rings}
    <circle r="${r}" fill="none" stroke="${C.ink}" stroke-opacity=".7" stroke-width="5" stroke-dasharray="1.4 6.6"/>
    <circle r="${r - 12}" fill="none" stroke="${C.ink}" stroke-opacity=".35" stroke-width="4" stroke-dasharray="1.4 6.6"/>
    <circle r="20" fill="#d9ccae"/>
    ${tape(`M${r},0 C${r + 60},20 ${r + 120},-10 ${r + 210},30`, 30)}`;
}

/** Cívka nití shora. */
function spoolTop(color, r = 52) {
  let rings = "";
  for (let rr = 18; rr < r - 8; rr += 3) {
    rings += `<circle r="${rr}" fill="none" stroke="${rr % 2 ? light(color, 0.15) : dark(color, 0.15)}" stroke-width="1.6"/>`;
  }
  return `
    <circle cx="5" cy="10" r="${r}" fill="#000" opacity=".32" filter="url(#blur10)"/>
    <circle r="${r}" fill="url(#woodGrad)"/>
    <circle r="${r - 7}" fill="${color}"/>
    ${rings}
    <circle r="16" fill="url(#woodGrad)"/>
    <circle r="7" fill="#3a2a17"/>
    <circle cx="-${r * 0.3}" cy="-${r * 0.3}" r="${r * 0.55}" fill="#fff" opacity=".12" filter="url(#blur5)"/>`;
}

/** Štos složené látky (shora). */
function fabricStack(colors) {
  return colors
    .map((c, i) => {
      const y = i * -22;
      const d = `M0,${y + 20} Q0,${y} 20,${y} L420,${y} Q440,${y} 440,${y + 20} L440,${y + 260} Q440,${y + 280} 420,${y + 280} L20,${y + 280} Q0,${y + 280} 0,${y + 260} Z`;
      return piece({
        d,
        fill: c,
        pattern: i === colors.length - 1 ? "twill" : "weave",
        extra: `${fold(`M0,${y + 130} L440,${y + 130} L440,${y + 146} L0,${y + 146} Z`, 0.16, "blur5")}${hi(`M0,${y + 150} L440,${y + 150} L440,${y + 160} L0,${y + 160} Z`, 0.12, "blur5")}`,
        shadow: { dx: 4, dy: 10, op: 0.3, f: "blur10" },
      });
    })
    .join("");
}

/** Role látky (shora). */
function fabricRoll(color, len = 620) {
  const cg = uid("roll");
  return `
    <rect x="6" y="20" width="${len}" height="130" rx="20" fill="#000" opacity=".3" filter="url(#shadow)"/>
    <linearGradient id="${cg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
    ${piece({ d: `M0,0 L${len},0 L${len},130 L0,130 Z`, fill: color, pattern: "weave", shadow: null, shade: false, outline: 0.2, extra: `<rect width="${len}" height="130" fill="url(#${cg})"/>` })}
    <ellipse cx="${len}" cy="65" rx="22" ry="65" fill="${dark(color, 0.15)}"/>
    ${[56, 46, 36, 26, 16].map((ry, i) => `<ellipse cx="${len}" cy="65" rx="${ry / 3}" ry="${ry}" fill="none" stroke="${i % 2 ? dark(color, 0.35) : light(color, 0.1)}" stroke-width="2"/>`).join("")}
    <ellipse cx="${len}" cy="65" rx="5" ry="12" fill="#3a2a17"/>
    <path d="M${len - 60},130 C${len - 40},170 ${len - 10},200 ${len + 30},215 L${len + 30},235 C${len - 20},215 ${len - 60},180 ${len - 80},130 Z" fill="${color}" opacity=".95"/>`;
}

/** Sítotiskový rám s šablonou (lokální 0–760 × 0–560). */
function screenFrame() {
  const inner = { x: 46, y: 46, w: 668, h: 468 };
  const cid = uid("scr");
  return `
    <rect x="10" y="22" width="760" height="560" rx="6" fill="#000" opacity=".3" filter="url(#shadow)"/>
    <rect width="760" height="560" rx="6" fill="url(#woodGrad)"/>
    ${noiseRect({ x: 0, y: 0, w: 760, h: 560 }, 0.7, "grain")}
    <rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" fill="#d6c6a2"/>
    <clipPath id="${cid}"><rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}"/></clipPath>
    <g clip-path="url(#${cid})">
      <rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" fill="#5d6b6a" opacity=".55"/>
      <g fill="#efe4c8">${printMark(380, 250, 105, "#efe4c8", "#d9c79f", "#5d6b6a")}</g>
      <rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" fill="url(#mesh)"/>
      ${fold(`M${inner.x},${inner.y} L${inner.x + inner.w},${inner.y} L${inner.x + inner.w},${inner.y + 30} L${inner.x},${inner.y + 30} Z`, 0.25, "blur10")}
      ${line(`M96,${inner.y + 440} C220,${inner.y + 452} 430,${inner.y + 444} 664,${inner.y + 436}`, "#000", 30, 0.3)}
      ${line(`M96,${inner.y + 434} C220,${inner.y + 446} 430,${inner.y + 438} 664,${inner.y + 430}`, "#8a6a3c", 28)}
      ${line(`M100,${inner.y + 428} C220,${inner.y + 440} 430,${inner.y + 432} 660,${inner.y + 424}`, C.gold, 10, 0.9)}
      ${line(`M110,${inner.y + 426} C220,${inner.y + 437} 430,${inner.y + 429} 650,${inner.y + 421}`, "#fff", 3, 0.5)}
    </g>
    <rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" fill="none" stroke="#7d5f39" stroke-width="3"/>
    <rect x="${inner.x - 6}" y="${inner.y - 6}" width="${inner.w + 12}" height="${inner.h + 12}" fill="none" stroke="#c6b07f" stroke-width="8" opacity=".8"/>
    <rect x="4" y="4" width="752" height="10" rx="4" fill="#fff" opacity=".22"/>`;
}

/** Detail kapsy saka s kapesníčkem a vyšívaným znakem (plné plátno). */
function blazerDetail(W, H, color) {
  const b = { x: 0, y: 0, w: W, h: H };
  const lapel = "M0,0 L520,0 C470,260 360,560 250,1200 L0,1200 Z";
  return `
    <rect width="${W}" height="${H}" fill="${color}"/>
    <rect width="${W}" height="${H}" fill="url(#twill)"/>
    ${noiseRect(b, 0.5)}${noiseRect(b, 0.2, "noiseLight")}
    ${fold("M560,0 C520,300 430,620 340,1200 L420,1200 C500,620 590,300 640,0 Z", 0.3, "shadow")}
    ${piece({ d: lapel, fill: light(color, 0.05), pattern: "twill", shadow: { dx: 14, dy: 10, op: 0.5, f: "shadow" }, outline: 0.6 })}
    ${stitch("M488,0 C440,260 334,560 224,1200", light(color, 0.3), 0.4, 1.6, "5 5")}
    ${hi("M80,0 L420,0 C380,260 300,560 220,1200 L80,1200 Z", 0.06, "shadow")}
    <path d="M300,450 L292,455" stroke="none"/>
    <!-- vyšívaný znak na klopě -->
    <g transform="translate(230 560) rotate(-12)">
      <path d="M-70,-80 L70,-80 L70,10 C70,70 0,100 0,100 C0,100 -70,70 -70,10 Z" fill="#000" opacity=".4" filter="url(#blur5)" transform="translate(4 8)"/>
      <path d="M-70,-80 L70,-80 L70,10 C70,70 0,100 0,100 C0,100 -70,70 -70,10 Z" fill="${C.ink}"/>
      <path d="M-70,-80 L70,-80 L70,10 C70,70 0,100 0,100 C0,100 -70,70 -70,10 Z" fill="none" stroke="${C.gold}" stroke-width="10"/>
      <path d="M-70,-80 L70,-80 L70,10 C70,70 0,100 0,100 C0,100 -70,70 -70,10 Z" fill="none" stroke="url(#satinC)" stroke-width="10"/>
      ${satin("M-48,8 L0,-34 L48,8 L48,30 L0,-12 L-48,30 Z", C.gold, "satinA")}
      ${satin("M-48,44 L0,2 L48,44 L48,62 C40,72 20,80 0,86 C-20,80 -40,72 -48,62 Z", C.cream, "satinB")}
      ${[-30, 0, 30].map((x) => `<circle cx="${x}" cy="-56" r="9" fill="${C.cream}"/><circle cx="${x}" cy="-56" r="9" fill="url(#satinA)"/>`).join("")}
    </g>
    <!-- náprsní kapsa s kapesníčkem -->
    ${piece({
      d: "M720,420 C780,360 820,330 880,300 L960,320 C900,360 870,400 830,450 Z",
      fill: C.cream,
      pattern: "weave",
      extra: `${fold("M800,340 L960,320 L830,450 Z", 0.12, "blur5")}`,
      shadow: { dx: 4, dy: 8, op: 0.4, f: "blur5" },
    })}
    ${piece({
      d: "M760,440 C800,380 850,340 900,330 L1010,350 C960,380 930,420 900,460 Z",
      fill: light(C.cream, 0.3),
      pattern: "weave",
      shadow: { dx: 4, dy: 8, op: 0.35, f: "blur5" },
    })}
    ${piece({ d: "M660,450 L1100,420 L1102,470 L662,500 Z", fill: light(color, 0.06), pattern: "twill", shadow: { dx: 0, dy: 10, op: 0.55, f: "blur5" }, outline: 0.7 })}
    ${stitch("M668,462 L1096,432", light(color, 0.3), 0.45, 1.5, "5 5")}
    ${stitch("M670,490 L1098,460", light(color, 0.3), 0.45, 1.5, "5 5")}
    <!-- knoflíky -->
    ${[
      [860, 930],
      [1010, 1110],
    ]
      .map(
        ([x, y]) => `
      <circle cx="${x + 6}" cy="${y + 12}" r="46" fill="#000" opacity=".45" filter="url(#blur5)"/>
      <circle cx="${x}" cy="${y}" r="46" fill="#5b4330"/>
      <circle cx="${x}" cy="${y}" r="46" fill="url(#spot)" opacity=".3"/>
      <clipPath id="btn${x}"><circle cx="${x}" cy="${y}" r="46"/></clipPath>
      <g clip-path="url(#btn${x})">${noiseRect({ x: x - 46, y: y - 46, w: 92, h: 92 }, 0.6, "grain")}</g>
      <circle cx="${x}" cy="${y}" r="34" fill="none" stroke="#3a2a1d" stroke-width="5"/>
      ${[
        [-11, -11],
        [11, -11],
        [-11, 11],
        [11, 11],
      ]
        .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="5.5" fill="#24190f"/>`)
        .join("")}
      ${line(`M${x - 11},${y - 11} L${x + 11},${y + 11} M${x + 11},${y - 11} L${x - 11},${y + 11}`, C.cream, 3, 0.85)}
      <ellipse cx="${x - 14}" cy="${y - 18}" rx="16" ry="8" fill="#fff" opacity=".22" filter="url(#blur2)"/>`,
      )
      .join("")}
    <rect width="${W}" height="${H}" fill="url(#vignette)"/>`;
}

// ---------- scény ----------
const scenes = {
  "sluzba-trika": {
    w: 1600,
    h: 1067,
    alt: "Černé tričko s geometrickým potiskem ve zlaté a krémové barvě, vedle sítotisková stěrka",
    svg: (W, H) => `
      ${bgLinen(W, H)}
      ${g("translate(282 6) scale(1.04)", tshirt(C.charcoal, printMark(500, 430, 86)))}
      ${g("translate(1000 905) rotate(-24)", squeegee(300))}`,
  },
  // Sada šesti vlastních vyšívaných nášivek (hora, vlna, slunce, hvězda, květina, geometrie) na lnu.
  // Formát 4:5 na výšku – stejný poměr jako obrazová kolonka služby.
  "sluzba-nasivky": {
    file: "nasivky-sada.webp",
    w: 1280,
    h: 1600,
    alt: "Sada šesti vyšívaných nášivek s motivy hor, vln, slunce, hvězdy, květiny a geometrického vzoru na lněné látce",
    quality: 62, // jemná textura lnu se špatně komprimuje – cíl pod 300 kB
    svg: (W, H) => `
      ${bgLinen(W, H)}
      ${patch({ cx: 400, cy: 330, r: 230, base: C.ink, ring: C.gold, motif: motifs.mountains(400, 330, 210) })}
      ${patch({ cx: 905, cy: 420, r: 200, base: C.cream, ring: C.ink, motif: motifs.waves(905, 420, 185, C.ink, C.gold) })}
      ${patch({ cx: 360, cy: 820, r: 195, base: C.slate, ring: C.cream, motif: motifs.sun(360, 820, 180) })}
      ${patch({ cx: 880, cy: 880, r: 215, base: C.ink, ring: C.cream, motif: motifs.star(880, 880, 200) })}
      ${patch({ cx: 420, cy: 1290, r: 215, base: C.stone, ring: C.goldDeep, motif: motifs.flower(420, 1290, 200, "#f7f2e8", C.gold) })}
      ${patch({ cx: 920, cy: 1330, r: 190, base: C.slate, ring: C.gold, motif: motifs.geo(920, 1330, 175) })}
      ${line("M640,1560 C700,1500 760,1530 820,1480 C880,1440 980,1470 1060,1420", C.gold, 2.4, 0.9)}
      ${g("translate(1040 1430) rotate(-28)", needle(200))}`,
  },
  "sluzba-saka": {
    w: 1600,
    h: 1067,
    alt: "Šedé sako na dřevěném ramínku s krejčovským metrem přes rameno",
    svg: (W, H) => `
      ${bgStudio(W, H)}
      <circle cx="800" cy="70" r="14" fill="#cfc8bd"/><circle cx="800" cy="70" r="6" fill="#a39b8f"/>
      ${g(
        "translate(340 38) scale(0.92)",
        blazer(C.graphite, "#9b8160") +
          tape("M612,186 C560,226 470,212 420,258 C378,300 356,420 368,560 C376,640 396,700 390,770", 34) +
          tape("M612,186 C652,250 668,330 652,470 C646,520 650,560 660,600", 34),
      )}`,
  },
  "galerie-01": {
    w: 1200,
    h: 1200,
    alt: "Štos složených triček v krémové, zlaté, černé a bílé barvě, na vrchu tričko s potiskem",
    svg: (W, H) => `
      ${bgLinen(W, H)}
      ${g("translate(300 250) scale(1.4) rotate(-3 200 266)", foldedTee(C.ink))}
      ${g("translate(322 228) scale(1.4) rotate(-1 200 266)", foldedTee(C.gold))}
      ${g("translate(344 206) scale(1.4) rotate(1 200 266)", foldedTee(C.stone))}
      ${g("translate(366 184) scale(1.4) rotate(2 200 266)", foldedTee("#f7f4ee", printMark(200, 230, 58)))}`,
  },
  "galerie-02": {
    file: "nasivka-hory.webp",
    w: 1200,
    h: 1200,
    alt: "Detail vyšívané nášivky s motivem hor a slunce na tmavé látce, cívka nitě a jehla",
    quality: 70,
    svg: (W, H) => `
      ${bgLinen(W, H)}
      ${piece({ d: "M120,180 L1010,140 L1060,1010 L160,1060 Z", fill: C.slate, pattern: "twill", texture: 0.6, shadow: { dx: 10, dy: 24, op: 0.3, f: "shadow" } })}
      ${patch({ cx: 590, cy: 560, r: 330, base: C.ink, ring: C.gold, motif: motifs.mountains(590, 560, 300) })}
      ${g("translate(820 940) rotate(-30)", spool(C.cream, 170))}
      ${line("M880,960 C820,1040 700,1080 560,1050 C500,1036 470,1000 420,1010", C.cream, 2.4, 0.9)}
      ${g("translate(180 1050) rotate(-14)", needle(240))}`,
  },
  "galerie-03": {
    w: 1200,
    h: 1200,
    alt: "Detail tmavého saka s vyšívaným znakem na klopě, kapesníčkem a rohovými knoflíky",
    svg: (W, H) => blazerDetail(W, H, C.slate),
  },
  "galerie-04": {
    w: 1200,
    h: 1200,
    alt: "Plátěná taška s geometrickým potiskem v černé a zlaté barvě",
    svg: (W, H) => `
      ${bgStudio(W, H, 1010)}
      ${g("translate(100 110) scale(1.0)", tote("#e6d9bf", printMark(500, 600, 120, C.ink, C.gold, C.gold)))}`,
  },
  "galerie-05": {
    w: 1200,
    h: 1200,
    alt: "Krémová kšiltovka s vyšívanou našívkou s motivem vln",
    svg: (W, H) => `
      ${bgStudio(W, H, 960)}
      ${g(
        "translate(0 -8) scale(1.2)",
        cap(
          C.cream,
          `<g>${(() => {
            const d = "M410,450 Q410,430 430,430 L570,430 Q590,430 590,450 L590,540 Q590,560 570,560 L430,560 Q410,560 410,540 Z";
            return `<path d="${d}" fill="#000" opacity=".3" filter="url(#blur5)" transform="translate(2 6)"/><path d="${d}" fill="${C.ink}"/><path d="${d}" fill="url(#satinA)" opacity=".5"/>
              <path d="${d}" fill="none" stroke="${C.gold}" stroke-width="7"/><path d="${d}" fill="none" stroke="url(#satinC)" stroke-width="7"/>
              ${motifs.waves(500, 497, 100)}`;
          })()}</g>`,
        ),
      )}`,
  },
  "galerie-06": {
    w: 1200,
    h: 1200,
    alt: "Krejčovské nůžky, metr, křída a knoflíky na tmavé vlněné látce",
    svg: (W, H) => `
      ${bgWood(W, H)}
      ${piece({ d: "M90,140 L1080,90 L1120,1080 L120,1130 Z", fill: C.graphite, pattern: "twill", texture: 0.55, shadow: { dx: 10, dy: 22, op: 0.35, f: "shadow" } })}
      ${line("M260,300 C420,280 600,300 760,360 L820,620 C640,580 420,580 300,620 Z", "#f3eee4", 3, 0.7)}
      ${stitch("M290,340 C430,322 590,340 730,392", "#f3eee4", 0.6, 3, "14 10")}
      ${g("translate(560 760) rotate(-28)", scissors())}
      ${g("translate(860 300)", tapeCoil(105))}
      ${g("translate(300 900) rotate(18)", `<path d="M0,0 L120,-10 L110,50 Z" fill="#000" opacity=".3" filter="url(#blur5)" transform="translate(4 8)"/><path d="M0,0 L120,-10 L110,50 Z" fill="#efe9dd"/><path d="M0,0 L120,-10 L116,8 Z" fill="#fff" opacity=".5"/>`)}
      ${[
        [930, 820, "#5b4330"],
        [990, 870, C.ink],
        [930, 920, "#5b4330"],
      ]
        .map(
          ([x, y, c]) =>
            `<circle cx="${x + 4}" cy="${y + 8}" r="22" fill="#000" opacity=".4" filter="url(#blur5)"/><circle cx="${x}" cy="${y}" r="22" fill="${c}"/><circle cx="${x}" cy="${y}" r="15" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/>${[
              [-5, -5],
              [5, -5],
              [-5, 5],
              [5, 5],
            ]
              .map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="2.6" fill="#000" opacity=".7"/>`)
              .join("")}`,
        )
        .join("")}`,
  },
  "galerie-07": {
    w: 1200,
    h: 1200,
    alt: "Sítotiskový rám se šablonou, zlatá barva a stěrka na pracovním stole",
    svg: (W, H) => `
      ${bgWood(W, H)}
      ${g("translate(220 260)", screenFrame())}
      ${g("translate(270 805) rotate(-2)", squeegee(660))}`,
  },
  "galerie-08": {
    w: 1200,
    h: 1200,
    alt: "Teple šedá mikina s kapucí a kulatou vyšívanou našívkou na hrudi",
    svg: (W, H) => `
      ${bgLinen(W, H)}
      ${g(
        "translate(100 110) scale(1.0)",
        hoodie(
          C.heather,
          `<g transform="translate(600 370)">${patch({ cx: 0, cy: 0, r: 52, base: C.ink, ring: C.gold, motif: motifs.mountains(0, 0, 46) })}</g>`,
        ),
      )}`,
  },
  "galerie-09": {
    w: 1200,
    h: 1200,
    alt: "Tři saka v různých barvách na ramínkách na kovové tyči",
    svg: (W, H) => `
      ${bgStudio(W, H, 1080)}
      <rect x="40" y="186" width="1120" height="16" rx="8" fill="#000" opacity=".25" filter="url(#blur5)" transform="translate(0 8)"/>
      <rect x="40" y="186" width="1120" height="16" rx="8" fill="url(#steelGrad)"/>
      ${g("translate(55 130) scale(0.58)", blazer(C.cream, "#c8b48f"))}
      ${g("translate(615 130) scale(0.58)", blazer(C.slate, "#9b8160"))}
      ${g("translate(335 150) scale(0.6)", blazer(C.graphite, C.gold))}`,
  },
  "o-nas": {
    w: 1600,
    h: 1067,
    alt: "Pracovní stůl textilní dílny s rolí látky, složenými látkami, cívkami nití, nůžkami a krejčovským metrem",
    svg: (W, H) => `
      ${bgWood(W, H)}
      ${g("translate(430 110)", fabricRoll(C.gold, 620))}
      ${g("translate(420 420) rotate(-4)", fabricStack([C.graphite, C.cream, C.stone]))}
      ${g("translate(1000 600) rotate(38)", scissors())}
      ${g("translate(990 330)", spoolTop(C.gold))}
      ${g("translate(1110 350)", spoolTop(C.ink))}
      ${g("translate(1050 450)", spoolTop(C.cream))}
      ${g("translate(560 870) rotate(-8)", tapeCoil(80))}
      ${g("translate(880 890) rotate(-20)", `<path d="M0,0 L110,-8 L100,44 Z" fill="#000" opacity=".3" filter="url(#blur5)" transform="translate(4 8)"/><path d="M0,0 L110,-8 L100,44 Z" fill="#efe9dd"/>`)}`,
  },
};

// ---------- výstup ----------
// Kolonky, které ilustrace skutečně používají. Ostatní scény (dřívější ilustrace) nahradily
// fotky ze scripts/stock-photos.mjs – vykreslí se jen, když je vyjmenujete jako argumenty.
const DEFAULT_SLOTS = ["sluzba-nasivky", "galerie-02"];
const only = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_SLOTS;
fs.mkdirSync(OUT, { recursive: true });
if (PREVIEW) fs.mkdirSync(PREVIEW, { recursive: true });

for (const [slot, sc] of Object.entries(scenes)) {
  if (only.length && !only.includes(slot)) continue;
  uidCounter = 0;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sc.w}" height="${sc.h}" viewBox="0 0 ${sc.w} ${sc.h}">${DEFS}${sc.svg(sc.w, sc.h)}</svg>`;
  const img = sharp(Buffer.from(svg), { density: 72 });
  await img.clone().webp({ quality: sc.quality ?? 82, effort: 6 }).toFile(path.join(OUT, sc.file ?? `${slot}.webp`));
  if (PREVIEW) await img.clone().resize(800).jpeg({ quality: 82 }).toFile(path.join(PREVIEW, `${slot}.jpg`));
  console.log(`✓ ${slot} → ${sc.file ?? `${slot}.webp`}  ${sc.w}×${sc.h}  — ${sc.alt}`);
}

export const altTexts = Object.fromEntries(Object.entries(scenes).map(([k, v]) => [k, v.alt]));
