"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { FILE_ACCEPT, validateInquiry, type InquiryErrors } from "@/lib/inquiry-shared";
import { claims, email as recipient, inquiryEndpoint, inquiryServices } from "@/config/site";
import { inquiryPresets } from "@/data/content";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string; errors?: InquiryErrors };

type Field = keyof InquiryErrors;

// Stejná ochrana jako JinLab: honeypot + jednoduchý limit jednoho odeslání za minutu.
const RATE_LIMIT_KEY = "jinsu_inquiry_last_submit";
const RATE_LIMIT_WINDOW_MS = 60_000;

const inputClass =
  "mt-2 block w-full rounded-none border border-ink/20 bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-ink/40 focus:border-ink focus:outline-none aria-invalid:border-[#a12a2a]";

const fallbackMessage = `Odeslání se nepodařilo. Napište nám prosím přímo na ${recipient}.`;

function readLastSubmit() {
  try {
    return Number(sessionStorage.getItem(RATE_LIMIT_KEY) || 0);
  } catch {
    return 0;
  }
}

function writeLastSubmit() {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  } catch {
    // Bez sessionStorage limit jen neplatí.
  }
}

/** Data pro FormSubmit – čitelné názvy polí se objeví v tabulce v e-mailu. */
function toSubmission(data: FormData) {
  const value = (key: string) => String(data.get(key) ?? "").trim();
  const jmeno = value("jmeno");
  const sluzba = value("sluzba");
  const out = new FormData();
  out.append("_subject", `Poptávka z webu – ${sluzba} – ${jmeno}`);
  out.append("_replyto", value("email"));
  out.append("_template", "table");
  out.append("_captcha", "false");
  out.append("Jméno", jmeno);
  out.append("E-mail", value("email"));
  out.append("Telefon", value("telefon") || "–");
  out.append("Služba", sluzba);
  out.append("Počet kusů", value("pocet") || "–");
  out.append("Požadovaný termín", value("termin") ? new Date(value("termin")).toLocaleDateString("cs-CZ") : "–");
  out.append("Zpráva", value("zprava"));
  out.append("Souhlas se zpracováním osobních údajů", "Ano");
  const soubor = data.get("soubor");
  if (soubor instanceof File && soubor.size > 0) out.append("attachment", soubor);
  return out;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // Předvyplnění podle ?predmet=… (např. tlačítko „Vyžádat ukázky zakázek“ pod galerií).
  useEffect(() => {
    const preset = inquiryPresets[new URLSearchParams(window.location.search).get("predmet") ?? ""];
    const form = formRef.current;
    if (!preset || !form) return;
    const sluzba = form.elements.namedItem("sluzba");
    const zprava = form.elements.namedItem("zprava");
    if (sluzba instanceof HTMLSelectElement) sluzba.value = preset.sluzba;
    if (zprava instanceof HTMLTextAreaElement && !zprava.value) zprava.value = preset.zprava;
  }, []);
  const errors = status.state === "error" ? status.errors : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: vyplněné skryté pole = bot, poptávku tiše zahodíme.
    if (data.get("_honey")) {
      form.reset();
      return;
    }

    const fieldErrors = validateInquiry(data);
    const invalid = Object.keys(fieldErrors) as Field[];
    if (invalid.length > 0) {
      setStatus({ state: "error", message: "Zkontrolujte prosím označená pole.", errors: fieldErrors });
      form.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    if (Date.now() - readLastSubmit() < RATE_LIMIT_WINDOW_MS) {
      setStatus({ state: "error", message: "Poptávku jste právě odeslali. Další můžete poslat za minutu." });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch(inquiryEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: toSubmission(data),
      });
      const body = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
      // FormSubmit vrací 200 i u neaktivovaného formuláře – rozhoduje pole success.
      if (res.ok && String(body?.success) === "true") {
        writeLastSubmit();
        form.reset();
        setStatus({ state: "success" });
      } else {
        setStatus({ state: "error", message: fallbackMessage });
      }
    } catch {
      setStatus({ state: "error", message: `Nepodařilo se spojit se serverem. ${fallbackMessage}` });
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
  const a11y = (name: Field) => ({
    "aria-invalid": errors?.[name] ? true : undefined,
    "aria-describedby": errors?.[name] ? `${name}-error` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={sending}>
      <div className="grid gap-6 sm:grid-cols-2">
        <Label text="Jméno a příjmení *" name="jmeno" errors={errors}>
          <input name="jmeno" type="text" maxLength={100} autoComplete="name" className={inputClass} {...a11y("jmeno")} />
        </Label>
        <Label text="E-mail *" name="email" errors={errors}>
          <input name="email" type="email" maxLength={200} autoComplete="email" className={inputClass} {...a11y("email")} />
        </Label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Label text="Telefon" name="telefon" errors={errors}>
          <input name="telefon" type="tel" maxLength={30} autoComplete="tel" className={inputClass} {...a11y("telefon")} />
        </Label>
        <Label text="Služba *" name="sluzba" errors={errors}>
          <select name="sluzba" defaultValue="" className={inputClass} {...a11y("sluzba")}>
            <option value="" disabled>
              Vyberte…
            </option>
            {inquiryServices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Label text="Počet kusů" name="pocet" errors={errors}>
          <input name="pocet" type="number" min={1} step={1} inputMode="numeric" className={inputClass} {...a11y("pocet")} />
        </Label>
        <Label text="Požadovaný termín" name="termin" errors={errors}>
          <input name="termin" type="date" className={inputClass} {...a11y("termin")} />
        </Label>
      </div>

      <Label text="Zpráva *" name="zprava" errors={errors}>
        <textarea
          name="zprava"
          maxLength={5000}
          rows={6}
          placeholder="Co potřebujete, barvy, umístění potisku, velikosti…"
          className={`${inputClass} resize-y`}
          {...a11y("zprava")}
        />
      </Label>

      <Label text="Příloha – logo nebo náčrt (PNG, JPG, PDF, SVG, AI, max. 5 MB)" name="soubor" errors={errors}>
        <input
          name="soubor"
          type="file"
          accept={FILE_ACCEPT}
          className="mt-2 block w-full text-sm text-ink/70 file:mr-4 file:rounded-none file:border-0 file:bg-sand file:px-4 file:py-3 file:text-sm file:text-ink hover:file:bg-placeholder"
          {...a11y("soubor")}
        />
      </Label>

      {/* Honeypot – skryté pole pro boty (FormSubmit _honey) */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <input name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/70">
          <input
            name="souhlas"
            type="checkbox"
            value="ano"
            className="mt-1 size-4 shrink-0 rounded-none accent-ink"
            {...a11y("souhlas")}
          />
          <span>
            Souhlasím se zpracováním osobních údajů za účelem vyřízení poptávky podle{" "}
            <Link href="/ochrana-osobnich-udaju" className="link">
              zásad ochrany osobních údajů
            </Link>
            . *
          </span>
        </label>
        <FieldError name="souhlas" errors={errors} />
      </div>

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

function Label({
  text,
  name,
  errors,
  children,
}: {
  text: string;
  name: Field;
  errors?: InquiryErrors;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm">
        {text}
        {children}
      </label>
      <FieldError name={name} errors={errors} />
    </div>
  );
}

function FieldError({ name, errors }: { name: Field; errors?: InquiryErrors }) {
  if (!errors?.[name]) return null;
  return (
    <p id={`${name}-error`} className="mt-2 text-sm text-[#a12a2a]">
      {errors[name]}
    </p>
  );
}
