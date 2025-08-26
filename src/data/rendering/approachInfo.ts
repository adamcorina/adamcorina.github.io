import type { OPTIONS } from "./options";

export const APPROACH_INFO: Record<
  typeof OPTIONS[number],
  {
    label: string;
    blurb: string;
    useCases: string[];
    frameworks: string[];
    tips?: string[];
  }
> = {
  SSG: {
    label: "SSG — Static Site Generation",
    blurb:
      "HTML is prebuilt at deploy time and served from a CDN. Super fast, cheap, and simple; content updates happen via rebuild or targeted revalidation.",
    useCases: [
      "Marketing & landing pages",
      "Blogs, docs, knowledge bases",
      "Docs portals & handbooks",
      "Pricing & feature pages with infrequent updates",
    ],
    frameworks: [
      "Astro (content-first SSG)",
      "Next.js (static export per route)",
      "Gatsby (static generation)",
      "Eleventy (11ty), Hugo, Jekyll",
    ],
    tips: [
      "Plan a content update path (rebuilds or on-demand revalidation).",
      "Large catalogs may cause long builds—consider splitting or hybridizing.",
      "Per-user personalization on first paint isn’t native—move it client-side or hybrid.",
    ],
  },
  ISR: {
    label: "ISR — Incremental Static Regeneration",
    blurb:
      "Static pages with per-route revalidation (time-based or on-demand). Great for large catalogs and frequent content changes without rebuilding everything.",
    useCases: [
      "E-commerce PDP/PLP with frequent changes",
      "News/article hubs with regular updates",
      "Large catalogs where full builds are slow",
      "Pages cached at the edge but refreshed regularly",
    ],
    frameworks: [
      "Next.js (ISR / on-demand revalidation)",
      "Nuxt 3 (ISG/route rules equivalents)",
      "Gatsby (Deferred Static Generation)",
    ],
    tips: [
      "Define clear revalidation windows (TTL) aligned to business freshness.",
      "Use stable caching keys; avoid mixing user-specific content into static paths.",
      "Check your host/runtime support for ISR features before adopting.",
    ],
  },
  SSR: {
    label: "SSR — Server-Side Rendering",
    blurb:
      "HTML is rendered per request on the server. Supports personalization, fresh data, and dynamic meta out of the box—at the cost of server compute.",
    useCases: [
      "Personalized landing & logged-in pages",
      "SEO pages with real-time data",
      "Authenticated dashboards (initial HTML)",
      "A/B testing with dynamic meta/OG tags",
    ],
    frameworks: [
      "Next.js (Node runtime)",
      "Remix (Node runtime)",
      "Nuxt 3",
      "SvelteKit (SSR adapters)",
    ],
    tips: [
      "Cache aggressively where safe (per-route, per-segment) to control cost/latency.",
      "Audit dependencies that run on every request; avoid heavy server work.",
      "If you need global low latency, consider moving some routes to edge rendering.",
    ],
  },
  ESR: {
    label: "ESR — Edge-Side Rendering",
    blurb:
      "Server rendering at the edge for global low-latency and React streaming. Ideal when you need fresh, personalized HTML fast, worldwide.",
    useCases: [
      "Global audiences needing sub-100ms TTFB",
      "Live/streamed pages that progressively render",
      "Dynamic SEO + personalization at scale",
      "Event pages & launches with worldwide spikes",
    ],
    frameworks: [
      "Next.js (Edge Runtime)",
      "Remix on Cloudflare Workers",
      "SvelteKit on Workers",
      "Qwik City (edge adapters)",
    ],
    tips: [
      "Verify package compatibility with Edge/Workers runtimes (avoid Node-only APIs).",
      "Keep server code small and rely on Web/Fetch/Streams APIs.",
      "Measure cold starts and plan graceful fallbacks for unsupported APIs.",
    ],
  },
  CSR: {
    label: "CSR — Client-Side Rendering",
    blurb:
      "A minimal HTML shell; the app renders in the browser after JS loads. Best when SEO on first paint isn’t required and the app is highly interactive.",
    useCases: [
      "Internal tools & admin consoles",
      "Web apps where SEO doesn’t matter",
      "Rich, app-like UIs with heavy client interaction",
      "Offline/PWA experiences (with a Service Worker)",
    ],
    frameworks: ["React + Vite", "Vue + Vite", "Angular", "Svelte (SPA mode)"],
    tips: [
      "If SEO on first paint matters, combine with pre-render/SSG for key routes.",
      "Watch bundle size and hydration cost; code-split aggressively.",
      "Add a Service Worker for offline/latency-sensitive paths.",
    ],
  },
};
