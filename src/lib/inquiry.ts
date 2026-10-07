import { z } from "zod";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "./inquiry-shared";

export const inquirySchema = z.object({
  jmeno: z.string().trim().min(2, "Vyplňte prosím jméno.").max(100),
  email: z.email("Zadejte platný e-mail.").trim().max(200),
  telefon: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+0-9 ()-]*$/, "Telefon může obsahovat jen číslice, mezery a +.")
    .optional()
    .or(z.literal("")),
  zprava: z.string().trim().min(10, "Zpráva je příliš krátká (min. 10 znaků).").max(5000),
  soubor: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_FILE_SIZE, "Soubor může mít nejvýše 10 MB.")
    .refine(
      (f) => (ALLOWED_FILE_TYPES as readonly string[]).includes(f.type),
      "Povolené formáty jsou PNG a PDF.",
    )
    .optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;
