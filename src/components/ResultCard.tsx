import { cx } from "../lib/utils";

type Props = {
  optionKey: string;
  label: string; // e.g. "SSG"
  percent: number; // 0..100
  isTop: boolean;
  expanded: boolean;
  mismatches: number[];
  onToggle: () => void;
  learnHref: string; // e.g. #/learn/rendering/SSR
  idealFor: (qid: number) => "Yes" | "No";
  youChose: (qid: number) => "Yes" | "No";
  questionText: (qid: number) => string;
  onLearnClick?: () => void; // optional (analytics)
};

export default function ResultCard({
  optionKey,
  label,
  percent,
  isTop,
  expanded,
  mismatches,
  onToggle,
  learnHref,
  idealFor,
  youChose,
  questionText,
  onLearnClick,
}: Props) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-white p-4 shadow-sm",
        isTop ? "border-slate-900" : "border-slate-200",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold">{label}</div>
        <div className="text-lg font-bold tabular-nums">{percent}%</div>
      </div>

      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
        aria-label={`${label} match ${percent}%`}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          className="text-sm font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
        >
          {expanded ? "Hide details" : "Show details"}
        </button>

        {/* Crawlable link to the Learn page */}
        <a
          href={learnHref}
          onClick={onLearnClick}
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:opacity-80"
          aria-label={`Learn more about ${label}`}
        >
          Learn more →
        </a>
      </div>

      {expanded && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {mismatches.length === 0 ? (
            <li>All answered questions match this strategy.</li>
          ) : (
            mismatches.map((qid) => (
              <li key={`${optionKey}-${qid}`}>
                Q{qid}: expected{" "}
                <span className="font-medium">{idealFor(qid)}</span>, you chose{" "}
                <span className="font-medium">{youChose(qid)}</span> –{" "}
                {questionText(qid)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
