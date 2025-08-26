import { useMemo, useState } from "react";
import { OPTIONS, QUESTIONS, type Option } from "../data/questions";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/ResultCard";
import { pct } from "../lib/utils";
import { navigate } from "../lib/router";

export default function Quiz() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [expanded, setExpanded] = useState<Option | null>(null);

  const completeness = useMemo(() => {
    const answered = answers.filter((a) => a !== null).length;
    return answered / QUESTIONS.length;
  }, [answers]);

  const results = useMemo(() => {
    const answeredIdx = answers.map((a, i) => (a === null ? -1 : i)).filter((i) => i >= 0);
    const total = answeredIdx.length || QUESTIONS.length;

    const stats: Record<Option, { matches: number; percent: number; mismatches: number[] }> = {
      SSG: { matches: 0, percent: 0, mismatches: [] },
      ISR: { matches: 0, percent: 0, mismatches: [] },
      SSR: { matches: 0, percent: 0, mismatches: [] },
      ESR: { matches: 0, percent: 0, mismatches: [] },
      CSR: { matches: 0, percent: 0, mismatches: [] },
    };

    if (answeredIdx.length === 0) return stats;

    for (const s of OPTIONS) {
      let m = 0;
      const mismatches: number[] = [];
      for (const i of answeredIdx) {
        const ok = answers[i] === QUESTIONS[i].answers[s];
        if (ok) m += 1;
        else mismatches.push(QUESTIONS[i].id);
      }
      stats[s].matches = m;
      stats[s].percent = m / total;
      stats[s].mismatches = mismatches;
    }
    return stats;
  }, [answers]);

  const allAnswered = completeness === 1;

  const reset = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setExpanded(null);
  };

  const best = Math.max(...OPTIONS.map((x) => pct(results[x].percent)));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Right Tool Selector: Frontend Apps
        </h1>

        <p className="mt-2 text-slate-600">
          Answer 14 quick yes/no questions to pinpoint the frontend rendering approach that fits your needs.
        </p>

        <ul className="mt-3 grid gap-2 text-slate-700 sm:grid-cols-2">
          <li><span className="font-medium">SSG</span> — Static Site Generation</li>
          <li><span className="font-medium">ISR</span> — Incremental Static Regeneration</li>
          <li><span className="font-medium">SSR</span> — Server-Side Rendering</li>
          <li><span className="font-medium">ESR</span> — Edge-Side Rendering</li>
          <li><span className="font-medium">CSR</span> — Client-Side Rendering</li>
        </ul>
      </header>

      {/* Progress */}
      <div className="mb-6">
        <ProgressBar percent={pct(completeness)} />
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {QUESTIONS.map((q, idx) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            text={q.text}
            value={answers[idx]}
            onAnswer={(val) => {
              const next = [...answers];
              next[idx] = val;
              setAnswers(next);
            }}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          See results
        </button>
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Reset
        </button>
        {!allAnswered && (
          <span className="text-sm text-slate-600">You can view partial results anytime.</span>
        )}
      </div>

      {/* Results */}
      {submitted && (
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Match by strategy</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {OPTIONS.map((s) => {
              const stat = results[s];
              const percent = pct(stat.percent);
              return (
                <ResultCard
                  key={s}
                  option={s}
                  percent={percent}
                  isTop={percent === best}
                  expanded={s === expanded}
                  mismatches={stat.mismatches}
                  onToggle={() => setExpanded((e) => (e === s ? null : s))}
                  onLearnMore={() => navigate(`/learn/${s}`)}
                  idealFor={(qid) => (QUESTIONS.find((x) => x.id === qid)!.answers[s] ? "Yes" : "No")}
                  youChose={(qid) => (answers[qid - 1] ? "Yes" : "No")}
                  questionText={(qid) => QUESTIONS.find((x) => x.id === qid)!.text}
                />
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            <p>
              Tip: a high match suggests the strategy can satisfy your constraints, but many real
              apps combine strategies per route or page. Use this as a directional guide, not a hard rule.
            </p>
          </div>
        </section>
      )}

      <footer className="mt-10 text-center text-xs text-slate-500">
        <p>Built with React + Tailwind. 14 questions · Yes/No. No data leaves your browser.</p>
      </footer>
    </div>
  );
}
