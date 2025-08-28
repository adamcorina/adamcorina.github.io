import Quiz from "./routes/Quiz";
import Learn from "./routes/Learn";
import { useHashRoute } from "./lib/router";
import { QUIZZES } from "./registry";
import { HeadTags, HomeHeadTags } from "./components/SEO";
import Home from "./routes/Home";

export default function App() {
  const route = useHashRoute();

  if (route.page === "home") {
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900">
        <HomeHeadTags />
        <Home />
      </div>
    );
  }

  if (route.page === "quiz") {
    const quiz = QUIZZES[route.quiz];
    return (
      <div className="min-h-screen w-full bg-slate-50 text-slate-900">
        <HeadTags route={route} quiz={quiz} />
        <Quiz quiz={quiz} />
      </div>
    );
  }

  // learn
  const quiz = QUIZZES[route.quiz];
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <HeadTags route={route} quiz={quiz} optionKey={route.option}/>
      <Learn quiz={quiz} optionKey={route.option} />
    </div>
  );
}
