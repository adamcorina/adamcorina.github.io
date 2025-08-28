import type { Question } from "../../types/Question";

/** Exact union for this quiz */
export const OPTIONS = ["CSS++", "FUNCTIONAL", "STYLE-SYSTEM", "HEADLESS", "COMPONENT-SYSTEM"] as const;
export type StylingOption = typeof OPTIONS[number];

export const QUESTIONS: ReadonlyArray<Question<typeof OPTIONS>> = [
  // 1) Fast path for custom UI (no prebuilt component library)
  {
    id: 1,
    text:
      "Do you want to move fast on a custom UI using strong default scales (spacing/colors/type) — without adopting a prebuilt component library?",
    techText:
      "Needs opinionated utility presets to rapidly compose custom components (e.g., Tailwind/Uno).",
    answers: { "CSS++": false, FUNCTIONAL: true, "STYLE-SYSTEM": false, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 2) Fast path via pre-styled components & widgets (related to Q1)
  {
    id: 2,
    text:
      "Would you rather use pre-styled components and advanced widgets to ship faster (buttons, inputs, modals; data grid, date-range picker)?",
    techText:
      "Needs a ready component system/kit with themes and rich widgets (e.g., Chakra, MUI, Mantine, AntD, daisyUI, TailwindUI, shadcn/ui).",
    answers: { "CSS++": false, FUNCTIONAL: false, "STYLE-SYSTEM": false, HEADLESS: false, "COMPONENT-SYSTEM": true },
  },

  // 3) Pixel-precise brand, low compromise
  {
    id: 3,
    text:
      "Is your brand highly specific so you need full visual control (not someone else’s defaults)?",
    techText:
      "Needs near-total CSS control or token-driven fine-tuning without a vendor look.",
    answers: { "CSS++": true, FUNCTIONAL: false, "STYLE-SYSTEM": true, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 4) Stay close to platform CSS & advanced features
  {
    id: 4,
    text:
      "Do you prefer standard CSS (maybe Sass/CSS Modules) and expect heavy use of advanced CSS (container queries, subgrid, :has)?",
    techText:
      "Needs primarily author-written CSS leveraging the full platform.",
    answers: { "CSS++": true, FUNCTIONAL: false, "STYLE-SYSTEM": false, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 5) Comfort with utility classes
  {
    id: 5,
    text:
      "Is your team comfortable composing UI with utility classes in JSX (e.g., `px-4 text-slate-700 flex gap-2`)?",
    techText:
      "Needs utility-first styling applied in markup.",
    answers: { "CSS++": false, FUNCTIONAL: true, "STYLE-SYSTEM": false, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 6) Co-located styles
  {
    id: 6,
    text:
      "Do you want styling co-located with components (edit styles where you edit JSX/TSX)?",
    techText:
      "Needs co-located styling ergonomics.",
    answers: { "CSS++": true, FUNCTIONAL: true, "STYLE-SYSTEM": true, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 7) Typed variants & tokens — out of the box
  {
    id: 7,
    text:
      "Do you need typed variant props and design tokens out of the box (e.g., `<Button size=\"sm\" tone=\"primary\">`, tokens for color/space/typography)?",
    techText:
      "Needs native tokens and typed variant APIs.",
    answers: { "CSS++": false, FUNCTIONAL: false, "STYLE-SYSTEM": true, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 8) Runtime theming / multi-brand — out of the box
  {
    id: 8,
    text:
      "Do you need runtime theming or multi-brand support out of the box (theme switcher, tenant themes via CSS vars/theme objects)?",
    techText:
      "Needs native theming APIs (tokens/context) with runtime switching.",
    answers: { "CSS++": false, FUNCTIONAL: false, "STYLE-SYSTEM": true, HEADLESS: false, "COMPONENT-SYSTEM": true },
  },

  // 9) Zero-runtime OR SSR/edge streaming
  {
    id: 9,
    text:
      "Must styling have zero runtime (no client CSS-in-JS) OR do you want to use SSR/edge streaming features?",
    techText:
      "Needs build-time CSS or styling compatible with SSR/edge streaming.",
    answers: { "CSS++": true, FUNCTIONAL: true, "STYLE-SYSTEM": true, HEADLESS: false, "COMPONENT-SYSTEM": false },
  },

  // 10) Unstyled accessible primitives
  {
    id: 10,
    text:
      "Do you want unstyled but accessible building blocks (e.g., focus trap, roving tabindex, combobox/listbox) so you fully own the look?",
    techText:
      "Needs headless, accessible primitives (focus/ARIA) without styling attached.",
    answers: { "CSS++": false, FUNCTIONAL: false, "STYLE-SYSTEM": false, HEADLESS: true, "COMPONENT-SYSTEM": false },
  },
];
