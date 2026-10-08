import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-x flex min-h-[60svh] flex-col justify-center py-20 md:py-32">
        <p className="eyebrow">Chyba 404</p>
        <h1 className="section-title mt-6">Stránka nenalezena</h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
          Hledaná stránka neexistuje nebo byla přesunuta. Zkuste začít znovu od úvodu.
        </p>
        <div className="mt-12">
          <Link href="/" className="btn">
            Zpět na úvod
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
