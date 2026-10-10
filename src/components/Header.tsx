"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { brand, showPrices } from "@/config/site";
import { EASE } from "./Reveal";

const nav: { href: string; label: string; short?: string }[] = [
  { href: "/#sluzby", label: "Služby" },
  // Odkaz na ceny jen tehdy, když je sekce #ceny viditelná.
  ...(showPrices ? [{ href: "/#ceny", label: "Ceny" }] : []),
  { href: "/#galerie", label: "Galerie" },
  { href: "/#postup", label: "Jak pracujeme" },
  { href: "/#o-nas", label: "O nás" },
  { href: "/#faq", label: "FAQ" },
  // Na desktopu krátký popisek, aby se navigace vešla i na šířce 768 px.
  { href: "/praxe", label: "Praxe pro studenty", short: "Praxe" },
];

const MENU_ID = "mobilni-menu";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Při scrollu dolů se navigace schová, při scrollu nahoru se vrátí.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
  });

  // Otevřené mobilní menu: zamknutý scroll, Esc zavírá, Tab zůstává v menu.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? []);
      const focusable = [toggleRef.current, ...links].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!focusable.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };

    // Po přechodu na desktopovou šířku menu zavřeme.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      data-motion
      className="sticky top-0 z-40 border-b border-ink/10 bg-paper/75 backdrop-blur-md"
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="font-serif text-xl tracking-[-0.02em] md:text-2xl" onClick={close}>
          {brand}
        </Link>
        <nav aria-label="Hlavní navigace" className="flex items-center gap-6 text-sm lg:gap-8">
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 transition-colors hover:text-ink">
                  {item.short ?? item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#kontakt" className="link" onClick={close}>
            Kontakt
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen((o) => !o)}
            className="-mr-2 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              aria-hidden
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              aria-hidden
              className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </div>

      {/* Mobilní panel. Klik na ztmavenou plochu pod ním menu zavře.
          Při otevření se visibility přepne hned (jinak by nešel nastavit focus), při zavření až po fade-outu. */}
      <div
        className={`absolute inset-x-0 top-full h-[calc(100dvh-4rem)] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:hidden ${open ? "visible opacity-100 transition-opacity" : "invisible opacity-0 transition-[opacity,visibility]"}`}
      >
        <div aria-hidden className="absolute inset-0 bg-ink/20" onClick={close} />
        <div ref={panelRef} id={MENU_ID} className="relative border-b border-ink/10 bg-paper">
          <ul className="container-x py-6">
            {[...nav, { href: "/#kontakt", label: "Kontakt" }].map((item) => (
              <li key={item.href} className="border-b border-ink/10 last:border-b-0">
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-4 font-serif text-3xl tracking-[-0.02em] transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.header>
  );
}
