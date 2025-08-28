export type Question<Options extends readonly string[]> = {
  id: number;
  text: string;      // business wording
  techText: string;  // technical affirmation
  answers: Record<Options[number], boolean>;
};

export type QuizArea = "frontend" | "backend";


export type ApproachInfoEntry = {
  label: string;
  blurb: string;
  useCases: string[];
  frameworks: string[];
  tips?: string[];
};

export type OptionMeta<Options extends readonly string[]> = {
  key: Options[number];
  short: Options[number];
  long: string;
};

export type QuizModule<Options extends readonly string[]> = {
  slug: string;
  name: string;
  area: QuizArea;
  header: { title: string; intro: string; keywords?: string[] };
  options: ReadonlyArray<OptionMeta<Options>>;
  questions: ReadonlyArray<Question<Options>>;
  approachInfo: Record<Options[number], ApproachInfoEntry>;
};

// helper to preserve the Options literal type when registering quizzes
export function makeQuiz<Options extends readonly string[]>(
  quiz: QuizModule<Options>
) {
  return quiz;
}

// helpers if you ever need to extract the option union from a quiz value
export type OptionKeyOf<Q> = Q extends QuizModule<infer O> ? O[number] : never;
