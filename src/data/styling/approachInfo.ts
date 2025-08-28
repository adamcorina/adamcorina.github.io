import type { ApproachInfoEntry } from "../../types/Question";
import type { StylingOption } from "./questions";

export const APPROACH_INFO: Record<StylingOption, ApproachInfoEntry> = {
  "CSS++": {
    label: "CSS++ — Modern CSS / Sass / CSS Modules",
    blurb:
      "Author CSS directly (optionally Sass/PostCSS/CSS Modules). Maximum control, zero runtime, full access to platform features.",
    useCases: [
      "Pixel-perfect branded marketing & apps",
      "Advanced CSS (container queries, subgrid, :has)",
      "SSR/edge streaming with critical CSS",
      "Teams fluent in CSS who want minimal abstractions",
    ],
    frameworks: [
      "Sass / Dart Sass",
      "PostCSS / Autoprefixer / Lightning CSS",
      "CSS Modules",
      "Stylelint (linting)",
    ],
    tips: [
      "Adopt a structure (BEM/ITCSS) or rely on CSS Modules.",
      "Use CSS variables for tokens; theme with data attributes or media queries.",
      "Extract critical CSS for SSR/edge if needed.",
    ],
  },

  FUNCTIONAL: {
    label: "Functional — Utility-First CSS",
    blurb:
      "Compose UI directly in markup using utility classes. Fast to ship, consistent scales, small CSS via JIT/purge, zero runtime.",
    useCases: [
      "MVPs, dashboards, internal tools",
      "Teams who like class-based composition",
      "Consistent spacing/typography out of the box",
      "Pairing with headless behavior libraries",
    ],
    frameworks: [
      "Tailwind CSS",
      "UnoCSS / Windi CSS",
      "cva / tailwind-variants (recipes)",
    ],
    tips: [
      "Customize theme scales (colors, spacing, radii) early.",
      "Extract shared variants with cva or tailwind-variants.",
      "Consider shadcn/ui or daisyUI for prebuilt recipes.",
    ],
  },

  "STYLE-SYSTEM": {
    label: "Style Systems — Tokens & Variants",
    blurb:
      'A style system gives your team a simple, scalable vocabulary for UI: design tokens (colors, spacing, typography), themes (light/dark, brand A/B), and typed variants (e.g., <Button size="sm" tone="primary" />). Change a token and the whole app updates—consistently. You can start small (just tokens) and layer in recipes/variants over time. Pick zero-runtime CSS-in-TS (Panda, Vanilla Extract) when SSR/Edge streaming and performance matter, or use runtime CSS-in-JS (Stitches, Emotion, Styled Components) when you want dynamic styling and rich dev tooling. Style systems pair nicely with headless behavior libraries like Radix or React Aria, and they can coexist with utilities (e.g., Tailwind) if you like that authoring style.',
    useCases: [
      "Design systems & shared component libraries",
      "Multi-brand / white-label apps with runtime theming",
      "Product suites that must look consistent across teams",
      "Apps that need light/dark themes and token-driven customization",
    ],
    frameworks: [
      "Zero-runtime CSS-in-TS: Panda CSS, Vanilla Extract",
      "Runtime CSS-in-JS: Stitches, Emotion, Styled Components",
      "Token pipeline: Style Dictionary, Tokens Studio (Figma)",
      "Pairs well with headless: Radix UI, React Aria",
    ],
    tips: [
      "Start with base tokens (color/space/type), then add semantic tokens (e.g., text.muted).",
      "Expose tokens as CSS variables; switch themes by remapping semantic tokens.",
      "Document variant props per component (e.g., size, tone, intent) to keep APIs consistent.",
      "Prefer zero-runtime options if you rely on SSR/Edge streaming; use runtime CSS-in-JS if you need highly dynamic styles.",
    ],
  },

  HEADLESS: {
    label: "Headless Behavior — Unstyled & Accessible",
    blurb:
      "Accessible primitives (focus, keyboard nav, ARIA) without styles. Pair with any styling approach to fully own your look.",
    useCases: [
      "Custom-branded components with robust behavior",
      "Complex widgets (combobox, dialog, popover) with custom styles",
      "A11y-first teams who want control of visuals",
    ],
    frameworks: [
      "Radix UI",
      "Headless UI",
      "React Aria / React Stately",
      "Ariakit",
      "Downshift",
    ],
    tips: [
      "Budget time for styling—headless provides behavior only.",
      "Keep focus management and aria-attributes intact.",
      "Pair with Tailwind/CSS++/Style System as needed.",
    ],
  },

  "COMPONENT-SYSTEM": {
    label: "Component Systems — Pre-styled UI & Widgets",
    blurb:
      "Component systems come in two flavors:\n\n" +
      "1) **Style kits (style-only)** — You get polished markup and class recipes, often with basic themes, but behavior is up to you (or provided by a headless lib). Great for moving fast when interactions are simple and you like the kit’s look.\n" +
      "   *Examples:* Tailwind UI, daisyUI, **shadcn/ui** (Tailwind recipes styled on top of **Radix UI** for behavior).\n\n" +
      "2) **Full component libraries (styled + behavior)** — Ship components with built-in accessibility patterns, state/overlay logic, and sometimes **advanced widgets** (tables, data grids, date pickers). Best when you need robust interactions out of the box and consistent theming.\n" +
      "   *Examples:* Chakra UI, MUI, Mantine, Ant Design, Bootstrap.\n\n" +
      "Rule of thumb: choose a **style kit** when you want speed and you’re happy to wire behavior (or pair with headless). Choose a **full library** when you need a11y-correct behavior and complex widgets immediately.",
    useCases: [
      "Ship features fast with pre-styled parts",
      "Apps that need rich widgets out of the box",
      "Teams OK starting from a base look, then theming",
    ],
    frameworks: [
      "Style kits (style-only): Tailwind UI, daisyUI, shadcn/ui (styles) + Radix UI (behavior)",
      "Full libraries (styled + behavior): Chakra UI, MUI, Mantine, Ant Design, Bootstrap",
    ],
    tips: [
      "If you need data grids or complex tables, prefer full libraries (e.g., MUI/Mantine/AntD).",
      "Audit accessibility for complex components (focus, roles, keyboard navigation).",
      "Map your brand tokens to the system’s theme; avoid deep CSS overrides—prefer theme APIs.",
      "You can mix: kit for basic surfaces, headless + custom styles for bespoke parts.",
    ],
  },
};
