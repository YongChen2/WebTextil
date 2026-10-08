import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({
  title,
  children,
  pendingReview = true,
}: {
  title: string;
  children: ReactNode;
  /** Zobrazí upozornění, že text ještě čeká na kontrolu právníkem. */
  pendingReview?: boolean;
}) {
  return (
    <>
      <Header />
      <main className="container-x max-w-3xl py-20 md:py-32">
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.02em] md:text-7xl">{title}</h1>
        {/* Interní poznámka: DOPLNIT PŘED ZVEŘEJNĚNÍM – zkontrolovat právníkem */}
        {pendingReview && (
          <p role="note" className="mt-10 border border-gold bg-sand p-5 text-sm font-medium">
            Doplní se po kontrole právníkem.
          </p>
        )}
        <div className="mt-12 space-y-6 leading-relaxed text-ink/80 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
