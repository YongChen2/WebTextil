import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { address, contactPendingText, email, hasEmail, brand, ico, name } from "@/config/site";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: `Zásady zpracování osobních údajů (GDPR) společnosti ${name}, provozovatele značky ${brand}.`,
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

export default function OchranaOsobnichUdaju() {
  return (
    <LegalPage title="Ochrana osobních údajů">
      <h2>1. Správce osobních údajů</h2>
      <p>
        Správcem osobních údajů je společnost {name}, se sídlem {address.street},{" "}
        {address.postalCode} {address.city}, IČO {ico}, provozovatel značky {brand}. Kontakt:{" "}
        {hasEmail ? (
          <a href={`mailto:${email}`} className="link">{email}</a>
        ) : (
          contactPendingText
        )}
        .
      </p>
      <h2>2. Jaké údaje zpracováváme</h2>
      <p>
        Prostřednictvím poptávkového formuláře zpracováváme údaje, které nám sami vyplníte: jméno
        a příjmení, e-mail, telefon (nepovinný), požadovanou službu, počet kusů, požadovaný termín,
        text zprávy a přiložený soubor (logo nebo náčrt). Stejné údaje zpracováváme, pokud nám
        poptávku pošlete přímo e-mailem.
      </p>
      <h2>3. Účel a právní základ zpracování</h2>
      <p>
        Údaje používáme výhradně k vyřízení vaší poptávky – k přípravě nabídky, domluvě detailů
        zakázky a odpovědi na vaše dotazy. Právním základem je jednání o smlouvě na vaši žádost
        (čl. 6 odst. 1 písm. b) GDPR). Údaje nepoužíváme k marketingu ani je neprodáváme.
      </p>
      <h2>4. Doba uložení</h2>
      {/* OVĚŘIT S KLIENTEM: lhůta 12 měsíců pro poptávky bez uzavřené zakázky */}
      <p>
        Údaje z poptávky uchováváme po dobu jejího vyřízení, nejdéle 12 měsíců od posledního
        kontaktu. Pokud na základě poptávky uzavřeme smlouvu, uchováváme údaje po dobu trvání
        smlouvy a po dobu stanovenou právními předpisy (např. účetní a daňové doklady).
      </p>
      <h2>5. Příjemci a zpracovatelé</h2>
      <p>
        [Zástupný text – hosting (Vercel).] Odeslání formuláře zajišťuje služba FormSubmit
        (formsubmit.co), která obsah poptávky včetně přílohy přepošle e-mailem na adresu{" "}
        {hasEmail ? (
          <a href={`mailto:${email}`} className="link">{email}</a>
        ) : (
          contactPendingText
        )}
        .
      </p>
      <h2>Kontakt na správce</h2>
      <p>
        S dotazy ke zpracování osobních údajů nebo k uplatnění svých práv se obracejte na{" "}
        {hasEmail ? (
          <a href={`mailto:${email}`} className="link">{email}</a>
        ) : (
          contactPendingText
        )}
        .
      </p>
      <h2>6. Vaše práva</h2>
      <p>
        [Zástupný text – právo na přístup, opravu, výmaz, omezení zpracování, přenositelnost,
        námitku a stížnost u Úřadu pro ochranu osobních údajů.]
      </p>
    </LegalPage>
  );
}
