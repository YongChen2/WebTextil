/**
 * Recenze klientů. Před spuštěním doplňte skutečné citace (se souhlasem klientů),
 * nebo nastavte showReviews na false – sekce se pak nevykreslí.
 */
export const showReviews = false;

export type Review = {
  quote: string;
  name: string;
  company: string;
};

export const reviews: Review[] = [
  { quote: "DOPLNIT skutečnou citaci klienta", name: "DOPLNIT jméno", company: "DOPLNIT firmu" },
  { quote: "DOPLNIT skutečnou citaci klienta", name: "DOPLNIT jméno", company: "DOPLNIT firmu" },
  { quote: "DOPLNIT skutečnou citaci klienta", name: "DOPLNIT jméno", company: "DOPLNIT firmu" },
];

/** Sekce recenzí je viditelná jen se zapnutým přepínačem a aspoň jednou recenzí. */
export const hasReviews = showReviews && reviews.length > 0;
