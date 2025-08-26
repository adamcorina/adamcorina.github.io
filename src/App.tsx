import Quiz from "./routes/Quiz";
import Learn from "./routes/Learn";
import { useHashRoute } from "./lib/router";

export default function App() {
  const route = useHashRoute();

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      {route.page === "quiz" ? (
        <Quiz />
      ) : (
        <Learn option={route.option} />
      )}
    </div>
  );
}
