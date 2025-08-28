// src/quizzes/caching/approachInfo.ts
import type { ApproachInfoEntry } from "../../types/Question";
import type { Option as CachingOption } from "./questions";

export const APPROACH_INFO: Record<CachingOption, ApproachInfoEntry> = {
  "HTTP_EDGE": {
    label: "HTTP & Edge Cache (Browser/CDN/Proxy)",
    blurb:
      "Cache public content close to users using Cache-Control/ETag and CDN rules. Great for assets, public HTML/API responses, and edge image transforms. Supports fast global delivery and programmable purges. Avoid caching personalized responses here unless carefully scoped.",
    useCases: [
      "Static assets and fingerprinted bundles (far-future TTL)",
      "Public pages/APIs with global low latency",
      "Edge image/video transforms with per-variant caching",
      "Instant global purge or path/key invalidation",
    ],
    frameworks: [
      "Headers: Cache-Control, ETag, Last-Modified, Vary, stale-while-revalidate",
      "CDN/Proxy: Cloudflare, Fastly, Akamai, Vercel/Next.js middleware",
      "Transforms: CDN image optimizers, edge workers/functions",
      "Proxy cache: NGINX, Varnish (response caching)",
    ],
    tips: [
      "Use content hashes in filenames (app.[hash].js) + far-future TTL.",
      "Put short TTL + stale-while-revalidate on HTML; long TTL on assets.",
      "Never cache personalized responses at the edge unless you key by user/session and set private directives.",
      "Automate purges (per path/key) after content updates.",
    ],
  },

  "CLIENT_CACHE": {
    label: "Client Cache (Service Worker & Query Cache)",
    blurb:
      "Speed up repeat views with an app-level data cache and optionally work offline with a Service Worker. Use SW Cache Storage for shell/assets and a query cache for API data (dedupe, retries, SWR). You may persist to IndexedDB for resilience; skip persistence when policy forbids client storage.",
    useCases: [
      "Offline/poor-network usage with app-shell and cached routes",
      "Instant repeat navigations with background revalidation",
      "Optimistic updates for per-user data (safe client-side caching)",
      "Mobile-first experiences where bandwidth is limited",
    ],
    frameworks: [
      "SW: Service Worker, Cache Storage API, Workbox, Navigation Preload",
      "Query cache: TanStack Query, SWR, RTK Query",
      "Persistence: IndexedDB (idb/localForage), BroadcastChannel for multi-tab sync",
    ],
    tips: [
      "Version your Service Worker and show a ‘refresh to update’ toast on new SW.",
      "Scope query keys carefully; clear caches on logout or user switch.",
      "Persist selectively (e.g., read-only data); avoid storing secrets.",
      "Use SWR and refetch-on-focus/reconnect for freshness without jank.",
    ],
  },

  "SERVER_CACHE": {
    label: "Server Cache (In-Process & Distributed)",
    blurb:
      "Cache on the server for ultra-low latency and safe handling of personalized data. Use in-process LRU for nanosecond reads within a single instance; add Redis/Memcached for cross-instance sharing (sessions, rate limits, computed results). Supports single-flight/coalescing and programmable invalidation.",
    useCases: [
      "Per-instance hot path memoization and computed fragments",
      "Cross-instance session storage, rate-limits, feature flags",
      "Personalized API/HTML caching keyed by user/tenant",
      "Stampede protection: compute once, share many",
    ],
    frameworks: [
      "Distributed: Redis (node-redis/ioredis), Memcached",
      "In-process: lru-cache, quick-lru (Node)",
      "Coalescing/locks: Redis SETNX/Redlock, promise-inflight/async-lock patterns",
      "Patterns: cache-aside, write-through, short TTLs + key invalidation",
    ],
    tips: [
      "Use cache-aside with short TTLs; invalidate on writes with precise keys.",
      "Key by tenant/user for personalized responses; never leak across scopes.",
      "Add single-flight: lock by key while the first request populates the cache.",
      "Monitor hit rate and latency; keep memory limits and eviction policies sane.",
    ],
  },

  "DB_CACHE": {
    label: "Database-Level Caching (Replicas & Materialized Views)",
    blurb:
      "Scale heavy reads inside the data tier. Route reads to replicas for throughput and locality; precompute expensive aggregations via materialized views or summary tables. Accept eventual consistency or design for read-after-write when required.",
    useCases: [
      "Analytics dashboards and report pages",
      "Product/category listings with heavy filters/sorts",
      "Multi-region read latency with regional replicas",
      "Expensive aggregates refreshed on schedule or trigger",
    ],
    frameworks: [
      "Replicas: Postgres/MySQL read replicas (Aurora, Cloud SQL, RDS)",
      "Precompute: Postgres MATERIALIZED VIEW (REFRESH [CONCURRENTLY])",
      "Summary tables via triggers/jobs; Timescale continuous aggregates",
      "Routing: read/write split in app/ORM (Prisma, TypeORM, Drizzle adapters)",
    ],
    tips: [
      "Handle replication lag; send critical read-after-write back to primary or gate with write timestamps.",
      "Use REFRESH CONCURRENTLY and incremental strategies where possible.",
      "Index MVs/summary tables for target queries; avoid SELECT *.",
      "Combine with CDN for public assets and server cache for personalized responses.",
    ],
  },
};
