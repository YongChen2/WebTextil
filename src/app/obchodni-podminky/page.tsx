import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { address, email, ico, name } from "@/config/site";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description: `Obchodní podmínky společnosti ${name}.`,
  alternates: { canonical: "/obchodni-podminky" },
};

export default function ObchodniPodminky() {
  return (
    <LegalPage title="Obchodní podmínky">
      <h2>1. Úvodní ustanovení</h2>
      <p>
        Tyto obchodní podmínky upravují vztahy mezi společností {name}, se sídlem {address.street},{" "}
        {address.postalCode} {address.city}, IČO: {ico} (dále jen „zhotovitel“), a zákazníkem při
        objednávce potisku textilu, výroby našívek a úprav oděvů.
      </p>
      <h2>2. Poptávka a uzavření smlouvy</h2>
      <p>[Zástupný text – popis procesu poptávky, cenové nabídky a jejího potvrzení.]</p>
      <h2>3. Cena a platební podmínky</h2>
      <p>[Zástupný text – zálohy, splatnost faktur, způsoby platby.]</p>
      <h2>4. Podklady a autorská práva</h2>
      <p>[Zástupný text – odpovědnost zákazníka za dodané grafické podklady.]</p>
      <h2>5. Dodání a převzetí</h2>
      <p>[Zástupný text – termíny, osobní převzetí, doprava.]</p>
      <h2>6. Reklamace</h2>
      <p>[Zástupný text – lhůty, postup, zboží vyrobené na zakázku.]</p>
      <h2>7. Závěrečná ustanovení</h2>
      <p>
        [Zástupný text.] Kontakt pro dotazy: <a href={`mailto:${email}`} className="link">{email}</a>.
      </p>
    </LegalPage>
  );
}
