import { QUIZZES } from "../registry";
import { hrefQuiz } from "../lib/router";
import HeroHeader from "../components/HeroHeader";

const AREA_STYLES: Record<"frontend" | "backend" | "infra", string> = {
  frontend: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  backend: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  infra: "bg-orange-50 text-orange-700 ring-orange-200",
};

export default function Home() {
  const quizzes = Object.entries(QUIZZES);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <HeroHeader
        variant="dark"
        title="Tech Quizzes - Pick the Right Tools"
        intro="Quick, opinionated quizzes that map your requirements and constraints to practical tech stack and tool choices.
          Pick a quiz, answer a few yes/no questions, and get tailored suggestions."
      />

      {/* Cards */}
      <section className="grid gap-6 md:grid-cols-2">
        {quizzes.map(([slug, quiz]) => {
          const badgeClass = AREA_STYLES[quiz.area];

          return (
            <article
              key={slug}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl font-semibold">
                      {quiz.header.title}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeClass}`}
                      title={`${quiz.area} quiz`}
                    >
                      {quiz.area.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-600">{quiz.header.intro}</p>
                </div>
              </div>

              {/* Option pills */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {quiz.options.map((o) => (
                  <li
                    key={`${slug}-${o.key}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs leading-6 ring-1 ring-inset ring-slate-200"
                    title={o.long}
                  >
                    <span className="font-medium">{o.short}</span>
                  </li>
                ))}
              </ul>

              {/* Meta + actions */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  {quiz.questions.length} questions · {quiz.options.length}{" "}
                  options
                </div>
                <div className="flex gap-2">
                  <a
                    href={hrefQuiz(slug as keyof typeof QUIZZES)}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
                  >
                    Start quiz
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
