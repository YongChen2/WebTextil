import Link from "next/link";
import { brand } from "@/config/site";

const nav = [
  { href: "/#sluzby", label: "Služby" },
  { href: "/#galerie", label: "Galerie" },
  { href: "/#postup", label: "Jak pracujeme" },
  { href: "/#o-nas", label: "O nás" },
];

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-serif text-xl tracking-tight md:text-2xl">
          {brand}
        </Link>
        <nav aria-label="Hlavní navigace" className="flex items-center gap-8 text-sm">
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#kontakt" className="link">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
