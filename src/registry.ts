import { makeQuiz, type QuizModule } from "./types/Question";
import { QUESTIONS as RENDERING_QS } from "./data/rendering/questions";
import { OPTIONS as RENDERING_OPTS, OPTIONS_LONG as RENDERING_OPTS_LONG } from "./data/rendering/options";
import { APPROACH_INFO as RENDERING_INFO } from "./data/rendering/approachInfo";

export const QUIZ_TYPES = {
  RENDERING: "rendering",
} as const;

export type QUIZ_TYPES = typeof QUIZ_TYPES[keyof typeof QUIZ_TYPES];

export const DEFAULT_QUIZ: QUIZ_TYPES = QUIZ_TYPES.RENDERING;

export const RENDERING_QUIZ = makeQuiz({
  slug: "rendering",
  name: "Rendering Frontend Apps",
  header: {
    title: "Rendering Frontend Apps",
    intro: `Answer ${RENDERING_QS.length} quick yes/no questions to pinpoint the frontend rendering approach that fits your needs.`,
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

export const QUIZZES = {
  [QUIZ_TYPES.RENDERING]: RENDERING_QUIZ,
} as const;
