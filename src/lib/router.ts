import { QUIZZES, DEFAULT_QUIZ } from "../registry";

/** Slug is inferred from your registry keys */
export type QuizSlug = keyof typeof QUIZZES;

export type Route =
  | { page: "home" }
  | { page: "quiz"; quiz: QuizSlug }
  | { page: "learn"; quiz: QuizSlug; option: string };

function isQuizSlug(x: string): x is QuizSlug {
  return Object.prototype.hasOwnProperty.call(QUIZZES, x);
}

function getHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}

export function parseHash(): Route {
  const parts = getHash().split("/").filter(Boolean); // e.g. ["quiz","rendering"]

  // New routes
  // #/quiz/:slug
  if (parts.length === 2 && parts[0] === "quiz" && isQuizSlug(parts[1])) {
    return { page: "quiz", quiz: parts[1] };
  }
  // #/learn/:slug/:option
  if (parts.length === 3 && parts[0] === "learn" && isQuizSlug(parts[1])) {
    return {
      page: "learn",
      quiz: parts[1],
      option: decodeURIComponent(parts[2]),
    };
  }

  // Back-compat: #/:slug
  if (parts.length === 1 && isQuizSlug(parts[0])) {
    return { page: "quiz", quiz: parts[0] };
  }
  // Back-compat: #/:slug/learn/:option
  if (parts.length === 3 && isQuizSlug(parts[0]) && parts[1] === "learn") {
    return {
      page: "learn",
      quiz: parts[0],
      option: decodeURIComponent(parts[2]),
    };
  }
  // Back-compat: #/learn/:option -> default quiz
  if (parts.length === 2 && parts[0] === "learn") {
    return {
      page: "learn",
      quiz: DEFAULT_QUIZ,
      option: decodeURIComponent(parts[1]),
    };
  }

  // Home (default)
  return { page: "home" };
}

/* ---------- href builders ---------- */
export const hrefHome = () => "#/";
export const hrefQuiz = (quiz: QuizSlug) => `#/quiz/${quiz}`;
export const hrefLearn = (quiz: QuizSlug, option: string) =>
  `#/learn/${quiz}/${encodeURIComponent(option)}`;

/* ---------- navigation helpers ---------- */
export function navigate(to: string) {
  if (typeof window !== "undefined") {
    window.location.hash = to.startsWith("#") ? to : `#${to}`;
  }
}
export const navHome = () => navigate(hrefHome());
export const navQuiz = (quiz: QuizSlug) => navigate(hrefQuiz(quiz));
export const navLearn = (quiz: QuizSlug, option: string) =>
  navigate(hrefLearn(quiz, option));

/* ---------- hook ---------- */
import { useEffect, useState } from "react";
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}
