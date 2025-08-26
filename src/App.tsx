import Quiz from "./routes/Quiz";
import Learn from "./routes/Learn";
import { useHashRoute } from "./lib/router";
import { QUIZZES, DEFAULT_QUIZ } from "./registry";

export default function App() {
  const route = useHashRoute();

  if (route.page === "home") {
    const quiz = QUIZZES[DEFAULT_QUIZ];
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900">
        <Quiz quiz={quiz} />
      </div>
    );
  }

  if (route.page === "quiz") {
    const quiz = QUIZZES[route.quiz];
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900">
        <Quiz quiz={quiz} />
      </div>
    );
  }

  // learn
  const quiz = QUIZZES[route.quiz];
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <Learn quiz={quiz} optionKey={route.option} />
    </div>
  );
}
