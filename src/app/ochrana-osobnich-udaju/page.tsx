import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { address, email, ico, name } from "@/config/site";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: `Zásady zpracování osobních údajů (GDPR) společnosti ${name}.`,
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

export default function OchranaOsobnichUdaju() {
  return (
    <LegalPage title="Ochrana osobních údajů">
      <h2>1. Správce osobních údajů</h2>
      <p>
        Správcem osobních údajů je společnost {name}, se sídlem {address.street},{" "}
        {address.postalCode} {address.city}, IČO: {ico}. Kontakt:{" "}
        <a href={`mailto:${email}`} className="link">{email}</a>.
      </p>
      <h2>2. Jaké údaje zpracováváme</h2>
      <p>
        [Zástupný text.] Prostřednictvím poptávkového formuláře zpracováváme jméno, e-mail,
        telefon, obsah zprávy a přiložené soubory.
      </p>
      <h2>3. Účel a právní základ zpracování</h2>
      <p>[Zástupný text – vyřízení poptávky, jednání o smlouvě (čl. 6 odst. 1 písm. b) GDPR).]</p>
      <h2>4. Doba uložení</h2>
      <p>[Zástupný text.]</p>
      <h2>5. Příjemci a zpracovatelé</h2>
      <p>[Zástupný text – hosting (Vercel), poskytovatel e-mailu.]</p>
      <h2>6. Vaše práva</h2>
      <p>
        [Zástupný text – právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost,
        námitku a stížnost u Úřadu pro ochranu osobních údajů.]
      </p>
    </LegalPage>
  );
}
