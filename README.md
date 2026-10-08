# Jinsu Studio

One-page web textilní dílny Jinsu Studio (provozovatel TPT funding s.r.o.) (potisk triček, našívky, úpravy sak).
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · framer-motion · Zod.

## Vývoj

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkční build
npm run lint
```

## Kde co upravit

- **Kontakty a firemní údaje:** `src/config/site.ts` (značka, telefon, e-mail, IČO, adresa, doména `siteUrl`)
- **Texty služeb, galerie, postupu:** `src/data/content.ts`
- **Fotky:** `public/images/` (seznam názvů viz `public/images/README.md`)
- **Odeslání poptávky e-mailem:** `src/app/api/poptavka/route.ts` (TODO v kódu)
- **Právní stránky:** `src/app/obchodni-podminky`, `src/app/ochrana-osobnich-udaju`

## Proměnné prostředí

| Název | Popis |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Veřejná adresa webu, např. `https://www.webtextil.cz` |

## Nasazení

Vercel: importovat repozitář, framework se detekuje automaticky (Next.js),
nastavit `NEXT_PUBLIC_SITE_URL` a nasadit.
