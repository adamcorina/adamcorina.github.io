import type { OPTIONS } from "./options";

export type Option = (typeof OPTIONS)[number];

export type Question = {
  id: number;
  text: string;
  techText: string;
  answers: Record<Option, boolean>;
};

export const QUESTIONS: ReadonlyArray<Question> = [
  {
    id: 1,
    text: "Should the app work offline or reload instantly, while it quietly refreshes data in the background?",
    techText:
      "Needs a client-side cache: Service Worker/App-Shell and/or a query cache (SWR) with optional IndexedDB persistence.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: true,
      SERVER_CACHE: false,
      DB_CACHE: false,
    },
  },

  {
    id: 2,
    text: "Is most content public/same for everyone and suitable for long caching via CDN (versioned/immutable assets, Cache-Control, ETag)?",
    techText:
      "Needs HTTP/edge caching (browser/CDN/reverse proxy) with TTLs and cache-busting via fingerprinted URLs.",
    answers: {
      HTTP_EDGE: true,
      CLIENT_CACHE: false,
      SERVER_CACHE: false,
      DB_CACHE: false,
    },
  },

  {
    id: 3,
    text: "Do you need to purge or expire cached content globally within seconds via an API (by key/path)?",
    techText:
      "Needs programmable invalidation: CDN/edge purge APIs and/or a distributed server cache (Redis/Memcached) with key deletes and TTLs.",
    answers: {
      HTTP_EDGE: true,
      CLIENT_CACHE: false,
      SERVER_CACHE: true,
      DB_CACHE: false,
    },
  },

  {
    id: 4,
    text: "Do you want to safely cache authenticated or per-user responses and invalidate them on user actions?",
    techText:
      "Needs a client fetch/query cache scoped by user and/or a server-side keyed cache (Redis) per user/session.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: true,
      SERVER_CACHE: true,
      DB_CACHE: false,
    },
  },

  {
    id: 5,
    text: "Do you need ultra-fast caching for computed results—either per-process micro-caches or shared across instances?",
    techText:
      "Needs server-side caching: in-process LRU for nanosecond reads and/or a distributed cache (Redis/Memcached) for cross-instance sharing.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: false,
      SERVER_CACHE: true,
      DB_CACHE: false,
    },
  },

  {
    id: 6,
    text: "Do you need to offload heavy reads/aggregations from the primary database (dashboards, reports) for predictable latency?",
    techText:
      "Needs database-level caching: read replicas and/or materialized views/precomputed tables with controlled refresh.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: false,
      SERVER_CACHE: false,
      DB_CACHE: true,
    },
  },

  {
    id: 7,
    text: "Do you need low-latency reads for authenticated or dynamic data across multiple regions (closer to users)?",
    techText:
      "Needs database-level caching via regional read replicas and smart routing; CDN edge caching isn’t suitable for user-specific data.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: false,
      SERVER_CACHE: false,
      DB_CACHE: true,
    },
  },

  {
    id: 8,
    text: "Are you not allowed to store data in the browser (no localStorage/IndexedDB) but still want repeat views to be fast?",
    techText:
      "Needs network-side caching only: CDN/edge for public responses; server/distributed cache or DB replicas for personalized data. No client persistence.",
    answers: {
      HTTP_EDGE: true,
      CLIENT_CACHE: false,
      SERVER_CACHE: true,
      DB_CACHE: true,
    },
  },
  {
    id: 9,
    text: "When lots of users request the same heavy endpoint at once, should the server compute it once and share the result (avoid a thundering herd)?",
    techText:
      "Needs server-side single-flight using a distributed cache/lock (e.g., Redis SETNX) to coalesce concurrent requests and cache the result with a short TTL.",
    answers: {
      HTTP_EDGE: false,
      CLIENT_CACHE: false,
      SERVER_CACHE: true,
      DB_CACHE: false,
    },
  },
  {
    id: 10,
    text: "Do you want to generate and cache media transforms (e.g., image resize/WebP) at the edge near users?",
    techText:
      "Needs HTTP/edge transform pipelines with versioned URLs and per-variant TTLs (CDN/edge rules).",
    answers: {
      HTTP_EDGE: true,
      CLIENT_CACHE: false,
      SERVER_CACHE: false,
      DB_CACHE: false,
    },
  },
];
