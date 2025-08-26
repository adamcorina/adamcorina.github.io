type OptionMeta = { short: string; long: string };

export default function QuizHeader({
  title,
  intro,
  options,
}: {
  title: string;
  intro: string;
  options: OptionMeta[];
}) {
  return (
    <header
      role="region"
      aria-label="Quiz introduction"
      className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-12"
    >
      {/* decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div className="relative">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl">
          {intro}
        </p>

        {/* Option pills */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {options.map((o) => (
            <li
              key={o.short}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm leading-6 ring-1 ring-inset ring-slate-200 text-slate-800"
              title={o.long}
            >
              <span className="font-medium">{o.short}</span>
              <span className="opacity-80"> — {o.long}</span>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
