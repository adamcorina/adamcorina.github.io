import { makeQuiz, type QuizModule } from "./types/Question";

import { QUESTIONS as RENDERING_QS } from "./data/rendering/questions";
import { OPTIONS as RENDERING_OPTS, OPTIONS_LONG as RENDERING_OPTS_LONG } from "./data/rendering/options";
import { APPROACH_INFO as RENDERING_INFO } from "./data/rendering/approachInfo";

import {  QUESTIONS as STYLE_QS } from "./data/styling/questions";
import { OPTIONS as STYLE_OPTS, OPTIONS_LONG as STYLE_OPTS_LONG } from "./data/styling/options"
import { APPROACH_INFO as STYLE_INFO } from "./data/styling/approachInfo";

export const QUIZ_TYPES = {
  RENDERING: "rendering",
  STYLING: "styling",
} as const;

export type QUIZ_TYPES = typeof QUIZ_TYPES[keyof typeof QUIZ_TYPES];

export const DEFAULT_QUIZ: QUIZ_TYPES = QUIZ_TYPES.RENDERING;

export const RENDERING_QUIZ = makeQuiz({
  slug: "rendering",
  name: "Frontend Rendering Strategy Guide",
  header: {
    title: "Frontend Rendering Strategy Guide",
    intro: `Answer ${RENDERING_QS.length} quick yes/no questions to pinpoint the frontend rendering approach that fits your needs.`,
    keywords: [
      "frontend rendering",
      "SSG",
      "ISR",
      "SSR",
      "ESR",
      "CSR",
      "static site generation",
      "server-side rendering",
      "edge rendering",
      "client-side rendering",
      "React",
      "Next.js",
      "SEO",
      "web performance",
    ],
  },
    options: Object.keys(RENDERING_OPTS_LONG).map((k) => {
        const key = k as typeof RENDERING_OPTS[number];
        return {
            key,
            short: key,
            long: RENDERING_OPTS_LONG[key],
        }
    }),
  questions: RENDERING_QS.map((q) => ({
    id: q.id,
    text: q.text,
    techText: (q).techText,
    answers: q.answers,
  })),
  // Strongly typed: must include keys for every option literal
  approachInfo: RENDERING_INFO,
} satisfies QuizModule<typeof RENDERING_OPTS>);

export const STYLING_QUIZ = makeQuiz({
  slug: "styling",
  name: "Styling Strategy Guide",
  header: {
    title: "Styling Strategy Guide",
    intro: `Answer ${STYLE_QS.length} quick questions to pick a styling approach that fits your team and product.`,
    keywords: [
      "CSS",
      "Tailwind",
      "utility-first",
      "design tokens",
      "theming",
      "CSS-in-JS",
      "Panda CSS",
      "Vanilla Extract",
      "Stitches",
      "Emotion",
      "Chakra UI",
      "MUI",
      "Mantine",
      "Radix UI",
      "Bootstrap",
    ],
  },
  options: Object.keys(STYLE_OPTS_LONG).map((k) => {
        const key = k as typeof STYLE_OPTS[number];
        return {
            key,
            short: key,
            long: STYLE_OPTS_LONG[key],
        }
    }),
  questions: STYLE_QS.map((q) => ({
    id: q.id,
    text: q.text,
    techText: (q).techText,
    answers: q.answers,
  })),
  approachInfo: STYLE_INFO,
} satisfies QuizModule<typeof STYLE_OPTS>);

export const QUIZZES = {
  [QUIZ_TYPES.RENDERING]: RENDERING_QUIZ,
  [QUIZ_TYPES.STYLING]: STYLING_QUIZ,
} as const;
