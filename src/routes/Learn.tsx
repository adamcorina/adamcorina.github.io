import type { QuizModule } from "../types/Question";

export default function GenericLearn<Options extends readonly string[]>({
  quiz,
  optionKey,
}: { quiz: QuizModule<Options>; optionKey: Options[number] | string }) {
  type OptionKey = Options[number];

  const keys = new Set(quiz.options.map(o => o.key as OptionKey));
  const valid = keys.has(optionKey as OptionKey);
  if (!valid) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={() => (window.location.hash = `#/${quiz.slug}`)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline underline-offset-4"
        >← Back to quiz</button>
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-slate-700">Unknown option: {String(optionKey)}</p>
      </div>
    );
  }

  const ok = optionKey as OptionKey;
  const info = quiz.approachInfo[ok];
  const trueTech = quiz.questions.filter((q) => q.answers[ok]).map((q) => q.techText);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <button
        onClick={() => (window.location.hash = `#/${quiz.slug}`)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline underline-offset-4 cursor-pointer"
      >← Back to quiz</button>

      <h1 className="text-3xl font-semibold tracking-tight">{info.label}</h1>
      <p className="mt-2 text-slate-700">{info.blurb}</p>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Tech requirements this approach satisfies</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
          {trueTech.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-2 00 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold">Typical app types</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {info.useCases.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold">Popular frameworks & tooling</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {info.frameworks.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      </section>

      {info.tips && info.tips.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold">Tips</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
            {info.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
