import Link from "next/link";
import { footerPhotoNote, parentStudio } from "@/data/content";
import {
  address,
  addressLabel,
  brand,
  contactPendingText,
  email,
  hasEmail,
  hasPhone,
  dic,
  ico,
  name,
  phone,
  phoneHref,
  registry,
  workshop,
} from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper py-16 text-sm text-ink/70">
      <div className="container-x grid gap-10 md:grid-cols-3">
        <div className="space-y-1">
          <p className="mb-3 font-serif text-2xl text-ink">{brand}</p>
          <p>
            {parentStudio.short}{" "}
            <a href={parentStudio.url} className="link" target="_blank" rel="noopener">
              {parentStudio.name}
            </a>
          </p>
          <p>Provozovatel: {name}</p>
          <p>
            <span className="text-ink/60">{addressLabel}:</span> {address.street}, {address.postalCode}{" "}
            {address.city}
          </p>
          {workshop.address && (
            <p>
              <span className="text-ink/60">{workshop.label}:</span> {workshop.address}
            </p>
          )}
          <p>IČO: {ico}</p>
          <p>DIČ: {dic}</p>
        </div>

        <div className="space-y-1">
          <p className="eyebrow mb-3">Kontakt</p>
          {hasPhone && (
            <p>
              <a href={phoneHref} className="link">
                {phone}
              </a>
            </p>
          )}
          {hasEmail && (
            <p>
              <a href={`mailto:${email}`} className="link">
                {email}
              </a>
            </p>
          )}
          {!hasPhone && !hasEmail && <p>{contactPendingText}</p>}
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
          <p>
            <Link href="/cookies" className="link">
              Cookies
            </Link>
          </p>
        </div>
      </div>

      <div className="container-x mt-12 border-t border-ink/10 pt-6 text-xs text-ink/60">
        <p>{registry}</p>
        <p className="mt-1">© {name}</p>
        <p className="mt-1">{footerPhotoNote}</p>
      </div>
    </footer>
  );
}
