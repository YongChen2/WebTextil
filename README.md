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
- **Poptávkový formulář:** `src/components/ContactForm.tsx`, validace `src/lib/inquiry-shared.ts`, nastavení v `src/config/site.ts` (viz níže)
- **Právní stránky:** `src/app/obchodni-podminky`, `src/app/ochrana-osobnich-udaju`

## Proměnné prostředí

| Název | Popis |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Veřejná adresa webu, např. `https://www.jinsustudio.cz` |

## Poptávkový formulář (FormSubmit)

Formulář používá stejné řešení jako JinLab: prohlížeč posílá data (včetně přílohy
do 5 MB) přímo na [FormSubmit](https://formsubmit.co) – `https://formsubmit.co/ajax/info@jinsustudio.cz`.
Nepotřebuje server ani env proměnné. Ochrana proti spamu: skryté pole `_honey`
a limit jednoho odeslání za minutu (sessionStorage).

Před spuštěním ověřit:

1. **Doména jinsustudio.cz musí přijímat poštu** (MX záznamy) a schránka
   `info@jinsustudio.cz` musí existovat.
2. **Aktivace FormSubmit:** po první odeslané poptávce přijde na `info@jinsustudio.cz`
   aktivační e-mail – je potřeba ho potvrdit. Do té doby se poptávky nedoručují a formulář
   ukáže chybu s odkazem na e-mail.
3. **Odesílatel:** FormSubmit posílá ze své adresy (doména formsubmit.co), odesílatele
   `web@jinsustudio.cz` nastavit nelze. Odpověď jde díky `_replyto` přímo zákazníkovi.
   DNS záznamy (SPF/DKIM) pro jinsustudio.cz kvůli formuláři není potřeba nastavovat.
4. Volitelně: aktivační e-mail obsahuje náhodný alias – lze ho dát do `inquiryEndpoint`
   v `src/config/site.ts` místo e-mailové adresy.

## Nasazení

Vercel: importovat repozitář, framework se detekuje automaticky (Next.js),
nastavit `NEXT_PUBLIC_SITE_URL` a nasadit.
