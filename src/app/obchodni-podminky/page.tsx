import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import {
  address,
  brand,
  contactPendingText,
  dic,
  email,
  hasEmail,
  ico,
  name,
  registry,
  vatPayer,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: `Obchodní podmínky společnosti ${name}, provozovatele značky ${brand}.`,
  alternates: { canonical: "/obchodni-podminky" },
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

export default function ObchodniPodminky() {
  return (
    <LegalPage title="Obchodní podmínky">
      <h2>1. Úvodní ustanovení</h2>
      <p>
        Tyto obchodní podmínky upravují vztahy mezi společností {name}, se sídlem{" "}
        {address.street}, {address.postalCode} {address.city}, IČO {ico}, provozovatelem značky{" "}
        {brand} (dále jen „zhotovitel“), a zákazníkem (dále jen „objednatel“) při zhotovení
        potisku a výšivky textilu, výrobě nášivek a úpravách oděvů na zakázku.
      </p>
      <ul>
        <li>Provozovatel: {name}</li>
        <li>
          Sídlo: {address.street}, {address.postalCode} {address.city}
        </li>
        <li>IČO: {ico}</li>
        <li>DIČ: {dic}</li>
        <li>{registry}</li>
        <li>
          E-mail: <Mail />
        </li>
      </ul>
      <p>
        Zhotovitel neprovozuje e-shop. Každá zakázka vzniká na základě individuální poptávky.
        Objednatelem může být spotřebitel i podnikatel; ustanovení, která platí jen pro
        spotřebitele, jsou v textu výslovně označena.
      </p>

      <h2>2. Poptávka a uzavření smlouvy</h2>
      <p>
        Objednatel posílá poptávku přes formulář na webu nebo e-mailem. Poptávka není závazná.
        Zhotovitel na ni odpoví cenovou nabídkou, ve které uvede rozsah zakázky, cenu, předpokládaný
        termín dodání a případnou výši zálohy.
      </p>
      <p>
        Smlouva o dílo je uzavřena okamžikem, kdy objednatel nabídku písemně (např. e-mailem)
        potvrdí. Pozdější změny zakázky (počet kusů, motiv, termín) jsou možné jen po dohodě obou
        stran a mohou změnit cenu i termín.
      </p>

      <h2>3. Náhled, vzorek a tolerance</h2>
      <p>
        Před zahájením výroby zašle zhotovitel objednateli grafický náhled. Výroba začne až po jeho
        schválení. Schválením náhledu objednatel potvrzuje správnost textů, barev, rozměrů a
        umístění motivu. U větších sérií lze po dohodě vyrobit vzorek.
      </p>
      <p>
        Barvy zobrazené na monitoru se mohou od skutečného potisku nebo výšivky lišit. Drobné
        odchylky v odstínu, rozměru a umístění motivu, které vyplývají z povahy materiálu a
        technologie, nejsou vadou díla.
      </p>

      <h2>4. Cena a platební podmínky</h2>
      <p>
        Cena zakázky je uvedena v nabídce.{" "}
        {vatPayer
          ? "Zhotovitel je plátcem DPH. Ceny jsou uváděny bez DPH, pokud není uvedeno jinak; DPH se připočítává v zákonné výši."
          : "Zhotovitel není plátcem DPH."} Cena se platí
        bankovním převodem na základě faktury se splatností uvedenou na faktuře.
      </p>
      <p>
        U větších zakázek může zhotovitel požadovat zálohu; její výši uvede v nabídce. Výroba v
        takovém případě začne po připsání zálohy na účet zhotovitele. Vlastnické právo k hotovému
        dílu přechází na objednatele úplným zaplacením ceny.
      </p>

      <h2>5. Textil a podklady</h2>
      <p>
        Textil může zajistit zhotovitel, nebo ho dodá objednatel. U textilu dodaného objednatelem
        neodpovídá zhotovitel za vady materiálu ani za poškození, které vznikne v důsledku jeho
        vlastností, jež zhotovitel nemohl při běžné péči zjistit.
      </p>
      <p>
        Grafické podklady dodává objednatel, ideálně ve vektorovém formátu (AI, PDF, SVG), případně
        jako PNG v rozlišení alespoň 300 dpi. Objednatel prohlašuje, že je oprávněn podklady užít,
        a odpovídá za to, že jejich zpracováním nedojde k porušení autorských práv, práv k
        ochranným známkám ani jiných práv třetích osob. Zhotovitel může odmítnout zakázku, jejíž
        obsah je v rozporu s právními předpisy nebo dobrými mravy.
      </p>

      <h2>6. Termín, dodání a převzetí</h2>
      <p>
        Termín dodání je uveden v nabídce a počítá se od schválení náhledu, případně od připsání
        zálohy. Hotovou zakázku zhotovitel předá osobně po domluvě, nebo ji odešle přepravcem;
        cenu dopravy uvede v nabídce.
      </p>
      <p>
        Objednatel by měl zásilku při převzetí zkontrolovat. Podnikatel je povinen zjevné vady a
        nesoulad v počtu kusů oznámit bez zbytečného odkladu po převzetí.
      </p>

      <h2>7. Zrušení zakázky a odstoupení od smlouvy</h2>
      <p>
        <strong>Pro spotřebitele:</strong> zakázky se vyrábějí podle individuálních požadavků
        objednatele. Od takové smlouvy nelze podle § 1837 písm. d) občanského zákoníku odstoupit ve
        lhůtě 14 dnů, jak to platí u běžného nákupu na dálku.
      </p>
      <p>
        Zakázku lze před zahájením výroby zrušit po dohodě se zhotovitelem. Zhotovitel má v takovém
        případě nárok na úhradu nákladů, které již účelně vynaložil (např. grafická příprava,
        nakoupený materiál).
      </p>

      <h2>8. Vady a reklamace</h2>
      <p>
        Práva z vadného plnění se řídí občanským zákoníkem. Spotřebitel může vady uplatnit v
        zákonné lhůtě 24 měsíců od převzetí díla. Reklamaci uplatněte e-mailem na adrese <Mail /> s
        popisem vady a fotografií. Zhotovitel reklamaci vyřídí bez zbytečného odkladu, u
        spotřebitele nejpozději do 30 dnů od jejího uplatnění, pokud se strany nedohodnou na delší
        lhůtě.
      </p>
      <p>
        Vadou nejsou zejména běžné opotřebení, poškození způsobené nedodržením pokynů k údržbě
        (praní, žehlení), odchylky popsané v článku 3 a vady textilu dodaného objednatelem.
      </p>

      <h2>9. Mimosoudní řešení sporů</h2>
      <p>
        <strong>Pro spotřebitele:</strong> k mimosoudnímu řešení spotřebitelských sporů je
        příslušná Česká obchodní inspekce (
        <a href="https://coi.gov.cz" className="link" target="_blank" rel="noopener noreferrer">
          coi.gov.cz
        </a>
        ).
      </p>

      <h2>10. Závěrečná ustanovení</h2>
      <p>
        Vztahy neupravené těmito podmínkami se řídí právním řádem České republiky, zejména
        občanským zákoníkem. Na smlouvu se použije znění podmínek účinné ke dni potvrzení nabídky.
        Tyto obchodní podmínky jsou účinné od {effectiveFrom}. Dotazy k nim posílejte na <Mail />.
      </p>
    </LegalPage>
  );
}
