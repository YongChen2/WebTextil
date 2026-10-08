/** Validace poptávkového formuláře (běží v prohlížeči před odesláním na FormSubmit). */

import { inquiryServices } from "@/config/site";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "pdf", "svg", "ai"] as const;
export const FILE_ACCEPT = ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",");

export type InquiryErrors = Partial<
  Record<"jmeno" | "email" | "telefon" | "sluzba" | "pocet" | "termin" | "zprava" | "soubor" | "souhlas", string>
>;

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export function validateInquiry(data: FormData): InquiryErrors {
  const errors: InquiryErrors = {};

  const jmeno = text(data, "jmeno");
  if (jmeno.length < 2) errors.jmeno = "Vyplňte prosím jméno.";

  const email = text(data, "email");
  if (!email) errors.email = "Vyplňte prosím e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Zadejte platný e-mail.";

  const telefon = text(data, "telefon");
  if (telefon && !/^[+0-9 ()-]{6,30}$/.test(telefon)) {
    errors.telefon = "Telefon může obsahovat jen číslice, mezery a +.";
  }

  if (!(inquiryServices as readonly string[]).includes(text(data, "sluzba"))) {
    errors.sluzba = "Vyberte prosím službu.";
  }

  const pocet = text(data, "pocet");
  if (pocet && !(Number.isInteger(Number(pocet)) && Number(pocet) >= 1)) {
    errors.pocet = "Zadejte počet kusů jako celé číslo.";
  }

  const termin = text(data, "termin");
  if (termin && termin < new Date().toLocaleDateString("sv-SE")) {
    errors.termin = "Termín nemůže být v minulosti.";
  }

  const zprava = text(data, "zprava");
  if (zprava.length < 10) errors.zprava = "Napište prosím pár slov k zakázce (min. 10 znaků).";

  const soubor = data.get("soubor");
  if (soubor instanceof File && soubor.size > 0) {
    const ext = soubor.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(ALLOWED_EXTENSIONS as readonly string[]).includes(ext)) {
      errors.soubor = "Povolené formáty jsou PNG, JPG, PDF, SVG a AI.";
    } else if (soubor.size > MAX_FILE_SIZE) {
      errors.soubor = "Soubor může mít nejvýše 5 MB.";
    }
  }

  if (!data.get("souhlas")) errors.souhlas = "Bez souhlasu nemůžeme poptávku zpracovat.";

  return errors;
}
