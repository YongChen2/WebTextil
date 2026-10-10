# Obrázky webu

Které soubory se kde zobrazují, určuje `src/config/images.ts` (název souboru + alt text pro každou
kolonku). Chybějící soubor se na webu zobrazí jako šedá plocha (#E5E2DD) s názvem kolonky.
Po výměně je potřeba nový build/deploy.

**Novou fotku nahrajte pod novým názvem** a ten uveďte v `src/config/images.ts` – Vercel
cachuje optimalizované obrázky podle URL, takže přepsaný soubor se stejným názvem by se
mohl dál zobrazovat ve staré verzi.

| Kolonka | Kde | Poměr |
| --- | --- | --- |
| sluzba-trika, sluzba-nasivky, sluzba-saka | Služby | 4:5 (1280×1600) |
| galerie-01 … galerie-09 | Galerie (kategorie viz `src/data/content.ts`) | 1:1 (1200×1200) |
| o-nas | O nás | 4:5 (1280×1600) |

Fotky stahuje a upravuje `scripts/stock-photos.mjs` (zdroje v `CREDITS.md`),
nášivky kreslí `scripts/illustrations.mjs`.
