import Link from "next/link";
import { address, brand, email, ico, name, phone, phoneHref, registry } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper py-16 text-sm text-ink/70">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div className="space-y-1">
          <p className="mb-3 font-serif text-2xl text-ink">{brand}</p>
          <p>{name}</p>
          <p>
            {address.street}, {address.postalCode} {address.city}
          </p>
          <p>IČO: {ico}</p>
        </div>

        <div className="space-y-1">
          <p className="eyebrow mb-3">Kontakt</p>
          <p>
            <a href={phoneHref} className="link">
              {phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${email}`} className="link">
              {email}
            </a>
          </p>
        </div>

        <div className="space-y-1">
          <p className="eyebrow mb-3">Informace</p>
          <p>
            <Link href="/obchodni-podminky" className="link">
              Obchodní podmínky
            </Link>
          </p>
          <p>
            <Link href="/ochrana-osobnich-udaju" className="link">
              Ochrana osobních údajů (GDPR)
            </Link>
          </p>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-ink/10 pt-6 text-xs text-ink/60">
        <p>{registry}</p>
        <p className="mt-1">© {name}</p>
      </div>
    </footer>
  );
}
