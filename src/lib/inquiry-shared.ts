/** Sdílené konstanty a typy formuláře – bez zod, aby se nedostal do klientského bundlu. */

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_FILE_TYPES = ["image/png", "application/pdf"] as const;

export type InquiryResponse =
  | { ok: true }
  | { ok: false; message: string; errors?: Record<string, string[]> };
