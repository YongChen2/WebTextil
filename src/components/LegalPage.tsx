import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="container-x max-w-3xl py-20 md:py-32">
        <h1 className="font-serif text-5xl leading-tight tracking-[-0.02em] md:text-7xl">{title}</h1>
        <div className="mt-12 space-y-6 leading-relaxed text-ink/80 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
