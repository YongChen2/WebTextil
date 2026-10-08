"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { brand, showPrices } from "@/config/site";
import { EASE } from "./Reveal";

const nav = [
  { href: "/#sluzby", label: "Služby" },
  // Odkaz na ceny jen tehdy, když je sekce #ceny viditelná.
  ...(showPrices ? [{ href: "/#ceny", label: "Ceny" }] : []),
  { href: "/#galerie", label: "Galerie" },
  { href: "/#postup", label: "Jak pracujeme" },
  { href: "/#o-nas", label: "O nás" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Při scrollu dolů se navigace schová, při scrollu nahoru se vrátí.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
  });

  return (
    <motion.header
      data-motion
      className="sticky top-0 z-40 border-b border-ink/10 bg-paper/75 backdrop-blur-md"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-serif text-xl tracking-[-0.02em] md:text-2xl">
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
    </motion.header>
  );
}
