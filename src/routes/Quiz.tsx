import { useMemo, useState } from "react";
import type { QuizModule } from "../types/Question";
import { pct } from "../lib/utils";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/ResultCard";

export default function GenericQuiz<Options extends readonly string[]>({
  quiz,
}: { quiz: QuizModule<Options> }) {
  type OptionKey = Options[number];

  const { questions, options, header, slug } = quiz;
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState<OptionKey | null>(null);

  const completeness = useMemo(
    () => answers.filter((a) => a !== null).length / questions.length,
    [answers, questions.length]
  );

  const results = useMemo(() => {
    type Stat = { matches: number; percent: number; mismatches: number[] };
    const init = Object.fromEntries(options.map(o => [o.key, { matches: 0, percent: 0, mismatches: [] as number[] }])) as Record<OptionKey, Stat>;

    const idxs = answers.map((a, i) => (a === null ? -1 : i)).filter(i => i >= 0);
    const total = idxs.length || questions.length;
    if (idxs.length === 0) return init;

    const stats = { ...init };
    for (const opt of options) {
      let m = 0; const mm: number[] = [];
      for (const i of idxs) {
        const ok = answers[i] === !!questions[i].answers[opt.key];
        if (ok) m += 1; else mm.push(questions[i].id);
      }
      stats[opt.key] = { matches: m, percent: m / total, mismatches: mm };
    }
    return stats;
  }, [answers, options, questions]);

  const best = Math.max(...options.map((o) => pct(results[o.key]?.percent || 0)));
  const reset = () => { setAnswers(Array(questions.length).fill(null)); setSubmitted(false); setExpanded(null); };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{header.title}</h1>
        <p className="mt-2 text-slate-600">{header.intro}</p>
        <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2">
          {options.map((o) => (
            <li key={o.key}><span className="font-medium">{o.short}</span> — {o.long}</li>
          ))}
        </ul>
      </header>

      <div className="mb-6"><ProgressBar percent={pct(completeness)} /></div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            text={q.text}
            value={answers[idx]}
            onAnswer={(val) => {
              const next = [...answers]; next[idx] = val; setAnswers(next);
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
        >
          See results
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
        >
          Reset
        </button>
        {completeness < 1 && <span className="text-sm text-slate-600">You can view partial results anytime.</span>}
      </div>

      {submitted && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Match by strategy</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((o) => {
              const stat = results[o.key];
              const percent = pct(stat?.percent || 0);
              return (
                <ResultCard
                  key={o.key}
                  optionKey={o.key}
                  label={o.short}
                  percent={percent}
                  isTop={percent === best}
                  expanded={expanded === o.key}
                  mismatches={stat?.mismatches || []}
                  onToggle={() => setExpanded((e) => (e === o.key ? null : o.key))}
                  learnHref={`#/${slug}/learn/${o.key}`}
                  idealFor={(qid) => (questions.find((x) => x.id === qid)!.answers[o.key] ? "Yes" : "No")}
                  youChose={(qid) => (answers[qid - 1] ? "Yes" : "No")}
                  questionText={(qid) => questions.find((x) => x.id === qid)!.text}
                />
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            <p>Tip: a high match suggests the strategy can satisfy your constraints, but many real apps combine strategies per route or page.</p>
          </div>
        </section>
      )}

      <footer className="mt-10 text-center text-xs text-slate-500">
        <p>Built with React + Tailwind. {questions.length} questions · Yes/No. No data leaves your browser.</p>
      </footer>
    </div>
  );
}
