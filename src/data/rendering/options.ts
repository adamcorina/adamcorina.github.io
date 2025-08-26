export const OPTIONS = ["SSG", "ISR", "SSR", "ESR", "CSR"] as const;

export const OPTIONS_LONG: Record<(typeof OPTIONS)[number], string> = {
  SSG: "Static Site Generation",
  ISR: "Incremental Static Regeneration",
  SSR: "Server-Side Rendering",
  ESR: "Edge-Side Rendering",
  CSR: "Client-Side Rendering",
};