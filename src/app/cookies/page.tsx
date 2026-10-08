import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { address, brand, ico, name } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: `Informace o používání cookies na webu ${brand}.`,
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage title="Cookies" pendingReview={false}>
      <p>
        Web {brand} nepoužívá marketingové ani analytické cookies. Proto se vás při návštěvě
        neptáme na souhlas a nezobrazujeme cookie lištu.
      </p>
      <h2>Měření návštěvnosti</h2>
      <p>
        Návštěvnost měříme pomocí služby Vercel Analytics. Měření je anonymní, probíhá bez cookies
        a neukládá do vašeho zařízení žádné identifikátory. Vidíme pouze souhrnné údaje, například
        počet zobrazení stránek.
      </p>
      <h2>Více informací</h2>
      <p>
        Provozovatelem webu je společnost {name}, se sídlem {address.street},{" "}
        {address.postalCode} {address.city}, IČO {ico}, provozovatel značky {brand}.{" "}
        Jak zpracováváme osobní údaje, najdete v zásadách{" "}
        <Link href="/ochrana-osobnich-udaju" className="link">
          ochrany osobních údajů
        </Link>
        .
      </p>
    </LegalPage>
  );
}
