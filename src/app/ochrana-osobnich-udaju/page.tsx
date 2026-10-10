import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { address, brand, contactPendingText, dic, email, hasEmail, ico, name, registry } from "@/config/site";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů",
  description: `Zásady zpracování osobních údajů (GDPR) společnosti ${name}, provozovatele značky ${brand}.`,
  alternates: { canonical: "/ochrana-osobnich-udaju" },
};

const effectiveFrom = "10. 10. 2026";

function Mail() {
  return hasEmail ? (
    <a href={`mailto:${email}`} className="link">
      {email}
    </a>
  ) : (
    <>{contactPendingText}</>
  );
}

export default function OchranaOsobnichUdaju() {
  return (
    <LegalPage title="Ochrana osobních údajů">
      <h2>1. Správce osobních údajů</h2>
      <p>
        Správcem osobních údajů je společnost {name}, se sídlem {address.street},{" "}
        {address.postalCode} {address.city}, IČO {ico}, provozovatel značky {brand} (dále jen
        „správce“).
      </p>
      <ul>
        <li>IČO: {ico}</li>
        <li>DIČ: {dic}</li>
        <li>{registry}</li>
        <li>
          E-mail pro dotazy k osobním údajům: <Mail />
        </li>
      </ul>
      <p>
        Správce nejmenoval pověřence pro ochranu osobních údajů – podle čl. 37 GDPR k tomu není
        povinen.
      </p>

      <h2>2. Jaké údaje zpracováváme</h2>
      <p>
        Prostřednictvím poptávkového formuláře zpracováváme údaje, které nám sami vyplníte: jméno
        a příjmení, e-mail, telefon (nepovinný), požadovanou službu, počet kusů, požadovaný termín,
        text zprávy a přiložený soubor (logo nebo náčrt). Stejné údaje zpracováváme, pokud nám
        poptávku pošlete přímo e-mailem.
      </p>
      <p>
        Pokud na základě poptávky uzavřeme smlouvu, zpracováváme také údaje potřebné k jejímu
        plnění a fakturaci (např. název firmy, IČO, fakturační a doručovací adresu).
      </p>
      <p>
        Při návštěvě webu může poskytovatel hostingu krátkodobě zpracovávat technické údaje (např.
        IP adresu) nutné k doručení stránky a k ochraně proti zneužití. Web nepoužívá marketingové
        ani analytické cookies; návštěvnost měříme anonymně, viz{" "}
        <Link href="/cookies" className="link">
          Cookies
        </Link>
        .
      </p>

      <h2>3. Účel a právní základ zpracování</h2>
      <ul>
        <li>
          <strong>Vyřízení poptávky</strong> – příprava nabídky, domluva detailů zakázky a odpovědi na
          dotazy. Právní základ: jednání o smlouvě na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).
        </li>
        <li>
          <strong>Plnění smlouvy</strong> – výroba, předání a reklamace zakázky (čl. 6 odst. 1 písm.
          b) GDPR).
        </li>
        <li>
          <strong>Plnění zákonných povinností</strong> – vedení účetnictví a daňové evidence (čl. 6
          odst. 1 písm. c) GDPR).
        </li>
        <li>
          <strong>Provoz a zabezpečení webu</strong> – oprávněný zájem správce (čl. 6 odst. 1 písm.
          f) GDPR).
        </li>
      </ul>
      <p>
        Poskytnutí údajů ve formuláři je dobrovolné, bez nich ale poptávku nemůžeme vyřídit.
        Zaškrtnutím políčka ve formuláři potvrzujete, že jste se s těmito zásadami seznámili.
        Údaje nepoužíváme k marketingu, neprodáváme je a neprovádíme automatizované rozhodování
        ani profilování.
      </p>

      <h2>4. Doba uložení</h2>
      <ul>
        <li>Poptávky, ze kterých nevznikla zakázka: nejdéle 12 měsíců od posledního kontaktu.</li>
        <li>
          Údaje k uzavřené zakázce: po dobu trvání smlouvy a následně po dobu promlčecích lhůt pro
          případné nároky ze smlouvy.
        </li>
        <li>Účetní a daňové doklady: po dobu stanovenou účetními a daňovými předpisy.</li>
        <li>Technické údaje z provozu webu: jen po dobu nezbytnou k zajištění provozu a bezpečnosti.</li>
      </ul>

      <h2>5. Příjemci a zpracovatelé</h2>
      <p>Osobní údaje zpřístupňujeme pouze zpracovatelům, kteří pro nás zajišťují technický provoz:</p>
      <ul>
        <li>Vercel Inc. – hosting webu a anonymní měření návštěvnosti,</li>
        <li>FormSubmit (formsubmit.co) – přeposlání obsahu poptávkového formuláře včetně přílohy e-mailem,</li>
        <li>poskytovatel e-mailové schránky, ve které poptávky přijímáme.</li>
      </ul>
      <p>
        Zpracovatelé Vercel Inc. a FormSubmit mohou osobní údaje zpracovávat ve Spojených státech
        amerických. Předání do USA probíhá na základě rámce EU-US Data Privacy Framework (rozhodnutí
        Evropské komise o odpovídající ochraně), případně na základě standardních smluvních doložek
        schválených Evropskou komisí. Orgánům veřejné moci poskytujeme údaje jen tehdy, když nám to
        ukládá zákon.
      </p>

      <h2>6. Vaše práva</h2>
      <p>V souvislosti se zpracováním osobních údajů máte podle GDPR právo:</p>
      <ul>
        <li>na přístup ke svým osobním údajům (čl. 15),</li>
        <li>na opravu nepřesných údajů (čl. 16),</li>
        <li>na výmaz, pokud pominul důvod zpracování (čl. 17),</li>
        <li>na omezení zpracování (čl. 18),</li>
        <li>na přenositelnost údajů (čl. 20),</li>
        <li>vznést námitku proti zpracování na základě oprávněného zájmu (čl. 21).</li>
      </ul>
      <p>
        Svá práva uplatníte e-mailem na <Mail />. Odpovíme bez zbytečného odkladu, nejpozději do
        jednoho měsíce od obdržení žádosti.
      </p>

      <h2>7. Stížnost u dozorového úřadu</h2>
      <p>
        Pokud se domníváte, že zpracováním porušujeme právní předpisy, můžete podat stížnost u
        Úřadu pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7,{" "}
        <a href="https://uoou.gov.cz" className="link" target="_blank" rel="noopener noreferrer">
          uoou.gov.cz
        </a>
        .
      </p>

      <h2>8. Účinnost</h2>
      <p>Tyto zásady zpracování osobních údajů jsou účinné od {effectiveFrom}.</p>
    </LegalPage>
  );
}
