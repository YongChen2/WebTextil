/** Pozadí sekce. Střídání paper/sand se počítá v src/app/page.tsx podle viditelných sekcí. */
export type Tone = "paper" | "sand";

export const toneBg: Record<Tone, string> = {
  paper: "bg-paper",
  sand: "bg-sand",
};
