export const OPTIONS = ["SSG", "ISR", "SSR", "ESR", "CSR"] as const;

export type Option = typeof OPTIONS[number];

export type Question = {
  id: number;
  text: string;
  tech: string;
  answers: Record<Option, boolean>;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text:
      "Is it critical that, the moment a page opens, customers always see the very latest data (no stale content at first view)?",
    tech:
      "The initial HTML needs to be strictly up-to-date with the data source at first paint.",
    answers: { SSG: false, ISR: false, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 2,
    text:
      "Do you need the first screen personalized per user/experiment (A/B, logged-in perks, pricing) or reflected in share/SEO previews?",
    tech:
      "The initial HTML needs to vary per user/experiment or compute dynamic meta (A/B, personalization, OG) on first paint.",
    answers: { SSG: false, ISR: false, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 3,
    text:
      "Do your pages need to work and be discoverable even if JavaScript is blocked (important for SEO, accessibility, or regulated environments)?",
    tech:
      "Content needs to be usable and indexable without JavaScript (JS disabled / crawler without JS).",
    answers: { SSG: true, ISR: true, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 4,
    text:
      "Do you want complex pages to show meaningful content immediately by streaming sections in, to reduce perceived wait time?",
    tech:
      "Server-driven progressive HTML streaming (e.g., React 18 streaming) needs to be delivered before JavaScript.",
    answers: { SSG: false, ISR: false, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 5,
    text:
      "After server-side actions (e.g., submitting forms), must the next page already reflect the final server result without an interim loading state?",
    tech:
      "Server-side forms/actions need to be reflected in the initial HTML (no client spinner first).",
    answers: { SSG: false, ISR: false, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 6,
    text:
      "Must the experience feel fast on slow networks and low-end devices, prioritizing minimal downloads and quick interaction?",
    tech:
      "The page needs to be fast and usable on slow networks (minimal JS, quick interactivity).",
    answers: { SSG: true, ISR: true, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 7,
    text:
      "Do you expect traffic spikes (launches/virality) and want most requests served from CDN/edge cache rather than scaling origin servers?",
    tech:
      "Viral traffic needs to be absorbed via CDN/edge without origin autoscaling.",
    answers: { SSG: true, ISR: true, SSR: false, ESR: true, CSR: true },
  },
  {
    id: 8,
    text:
      "Is minimizing per-request server compute (time and cost) for page delivery a hard requirement?",
    tech:
      "Little to no server time needs to be spent per request for the rendering layer.",
    answers: { SSG: true, ISR: true, SSR: false, ESR: false, CSR: true },
  },
  {
    id: 9,
    text:
      "Do editors need to publish or schedule frequent updates without triggering a full redeploy?",
    tech:
      "Content needs to be updatable frequently (scheduling, cache invalidation, or revalidation) without a full redeploy.",
    answers: { SSG: false, ISR: true, SSR: true, ESR: true, CSR: true },
  },
  {
    id: 10,
    text:
      "Do you need to avoid long build times for large/frequent catalog changes by deferring work to request time, the edge, or the browser?",
    tech:
      "Long build times for large catalogs need to be avoided by deferring work to request/edge/client.",
    answers: { SSG: false, ISR: true, SSR: true, ESR: true, CSR: true },
  },
  {
    id: 11,
    text:
      "Is keeping the JavaScript footprint for core content very small a priority (accessibility, battery life, Core Web Vitals)?",
    tech:
      "Core content needs to have a minimal client-side JavaScript footprint.",
    answers: { SSG: true, ISR: true, SSR: true, ESR: true, CSR: false },
  },
  {
    id: 12,
    text:
      "Should users be able to reopen pages they already visited even when offline—without building a custom offline app or Service Worker?",
    tech:
      "Previously visited pages need to work offline without adding a Service Worker.",
    answers: { SSG: true, ISR: true, SSR: false, ESR: false, CSR: false },
  },
  {
    id: 13,
    text:
      "Must the site be deployable as static files only on a simple CDN (no serverless/edge runtime) due to cost, risk, or compliance constraints?",
    tech:
      "The site needs to be deployable as static files only (no serverless/edge runtime at all).",
    answers: { SSG: true, ISR: false, SSR: false, ESR: false, CSR: true },
  },
  {
    id: 14,
    text:
      "Do your teams require rapid iteration—short build times and near-instant local feedback?",
    tech:
      "Iteration speed needs to be fast (short builds, instant dev feedback).",
    answers: { SSG: false, ISR: true, SSR: true, ESR: true, CSR: true },
  },
];
