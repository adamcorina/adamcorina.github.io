export const OPTIONS = ["MONO", "SERVERLESS", "MICRO"] as const;

export const OPTIONS_LONG: Record<(typeof OPTIONS)[number], string> = {
  MONO: "Serverful Monolith",
  SERVERLESS: "Serverless Functions",
  MICRO: "Microservices",
};
