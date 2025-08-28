export const OPTIONS = ["CSS++", "FUNCTIONAL", "STYLE-SYSTEM", "HEADLESS", "COMPONENT-SYSTEM"] as const;

export const OPTIONS_LONG: Record<(typeof OPTIONS)[number], string> = {
  "CSS++": "CSS++ (Modern CSS / Sass / Modules)",
  FUNCTIONAL: "Functional (Utility-First CSS)",
  "STYLE-SYSTEM": "Style Systems (Tokens & Variants)",
  HEADLESS: "Headless Behavior (Unstyled & Accessible)",
  "COMPONENT-SYSTEM": "Component Systems (Pre-styled UI & Widgets)",
};