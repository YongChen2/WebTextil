import { z } from "zod";
import { inquirySchema } from "@/lib/inquiry";
import type { InquiryResponse } from "@/lib/inquiry-shared";

function json(body: InquiryResponse, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, message: "Neplatný formát požadavku." }, 400);
  }

  // Honeypot proti spamovým botům – skryté pole musí zůstat prázdné.
  if (form.get("web")) {
    return json({ ok: true });
  }

  const file = form.get("soubor");
  const parsed = inquirySchema.safeParse({
    jmeno: form.get("jmeno") ?? "",
    email: form.get("email") ?? "",
    telefon: form.get("telefon") ?? "",
    zprava: form.get("zprava") ?? "",
    soubor: file instanceof File && file.size > 0 ? file : undefined,
  });

  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Zkontrolujte prosím vyplněné údaje.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      422,
    );
  }

  // TODO: Odeslání poptávky e-mailem.
  // Např. přes Resend / Postmark / SMTP (nodemailer):
  //   const { jmeno, email, telefon, zprava, soubor } = parsed.data;
  //   const attachment = soubor
  //     ? { filename: soubor.name, content: Buffer.from(await soubor.arrayBuffer()) }
  //     : undefined;
  //   await sendMail({ to: site.email, replyTo: email, subject: `Poptávka – ${jmeno}`, ... });
  // API klíč ukládejte do proměnných prostředí (vercel env add), nikdy ne do kódu.
  // Pozor: Vercel Functions mají limit těla požadavku 4,5 MB – větší přílohy
  // je potřeba nahrávat přímo z prohlížeče do úložiště (např. Vercel Blob).

  return json({ ok: true });
}
