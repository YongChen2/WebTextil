"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, type InquiryResponse } from "@/lib/inquiry-shared";
import { claims } from "@/config/site";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string; errors?: Record<string, string[]> };

const inputClass =
  "mt-2 block w-full rounded-none border border-ink/20 bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-ink/40 focus:border-ink focus:outline-none";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="mt-2 text-sm text-[#a12a2a]">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const fieldErrors = status.state === "error" ? status.errors : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const file = data.get("soubor");
    if (file instanceof File && file.size > 0) {
      if (!(ALLOWED_FILE_TYPES as readonly string[]).includes(file.type)) {
        setStatus({ state: "error", message: "Povolené formáty jsou PNG a PDF.", errors: { soubor: ["Povolené formáty jsou PNG a PDF."] } });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setStatus({ state: "error", message: "Soubor může mít nejvýše 10 MB.", errors: { soubor: ["Soubor může mít nejvýše 10 MB."] } });
        return;
      }
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/poptavka", { method: "POST", body: data });
      const body = (await res.json().catch(() => null)) as InquiryResponse | null;
      if (res.ok && body?.ok) {
        form.reset();
        setStatus({ state: "success" });
      } else {
        setStatus({
          state: "error",
          message: body && !body.ok ? body.message : "Odeslání se nepodařilo. Zkuste to prosím znovu.",
          errors: body && !body.ok ? body.errors : undefined,
        });
      }
    } catch {
      setStatus({ state: "error", message: "Nepodařilo se spojit se serverem. Zkontrolujte připojení a zkuste to znovu." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="border border-ink p-8 md:p-10">
        <p className="font-serif text-3xl">Děkujeme, poptávka je odeslaná.</p>
        <p className="mt-4 text-ink/70">Ozveme se vám obvykle {claims.responseTime}.</p>
        <button type="button" className="link mt-8 text-sm" onClick={() => setStatus({ state: "idle" })}>
          Odeslat další poptávku
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";
  const describedBy = (name: string) => (fieldErrors?.[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} className="space-y-6" aria-busy={sending}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-sm">
          Jméno a příjmení *
          <input
            name="jmeno"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!fieldErrors?.jmeno}
            aria-describedby={describedBy("jmeno")}
          />
          <FieldError id="jmeno-error" errors={fieldErrors?.jmeno} />
        </label>
        <label className="block text-sm">
          E-mail *
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={inputClass}
            aria-invalid={!!fieldErrors?.email}
            aria-describedby={describedBy("email")}
          />
          <FieldError id="email-error" errors={fieldErrors?.email} />
        </label>
      </div>

      <label className="block text-sm">
        Telefon
        <input
          name="telefon"
          type="tel"
          maxLength={30}
          autoComplete="tel"
          className={inputClass}
          aria-invalid={!!fieldErrors?.telefon}
          aria-describedby={describedBy("telefon")}
        />
        <FieldError id="telefon-error" errors={fieldErrors?.telefon} />
      </label>

      <label className="block text-sm">
        Zpráva *
        <textarea
          name="zprava"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Co potřebujete, kolik kusů, do kdy…"
          className={`${inputClass} resize-y`}
          aria-invalid={!!fieldErrors?.zprava}
          aria-describedby={describedBy("zprava")}
        />
        <FieldError id="zprava-error" errors={fieldErrors?.zprava} />
      </label>

      <label className="block text-sm">
        Podklady (PNG nebo PDF, max. 10 MB)
        <input
          name="soubor"
          type="file"
          accept=".png,.pdf,image/png,application/pdf"
          className="mt-2 block w-full text-sm text-ink/70 file:mr-4 file:rounded-none file:border-0 file:bg-sand file:px-4 file:py-3 file:text-sm file:text-ink hover:file:bg-placeholder"
          aria-invalid={!!fieldErrors?.soubor}
          aria-describedby={describedBy("soubor")}
        />
        <FieldError id="soubor-error" errors={fieldErrors?.soubor} />
      </label>

      {/* Honeypot – skryté pole pro boty */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Web
          <input name="web" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-xs leading-relaxed text-ink/60">
        Odesláním formuláře berete na vědomí zpracování osobních údajů za účelem vyřízení poptávky.
        Více v sekci{" "}
        <Link href="/ochrana-osobnich-udaju" className="link">
          Ochrana osobních údajů
        </Link>
        .
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? "Odesílám…" : "Odeslat poptávku"}
        </button>
        <p aria-live="polite" className="text-sm text-[#a12a2a]">
          {status.state === "error" ? status.message : ""}
        </p>
      </div>
    </form>
  );
}
