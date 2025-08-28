export const OPTIONS = [
  "HTTP_EDGE",
  "CLIENT_CACHE",
  "SERVER_CACHE",
  "DB_CACHE",
] as const;

export const OPTIONS_LONG: Record<(typeof OPTIONS)[number], string> = {
  HTTP_EDGE: "HTTP/Edge Caching",
  CLIENT_CACHE: "Client-Side Caching",
  SERVER_CACHE: "Server-Side Caching",
  DB_CACHE: "Database Caching",
};
