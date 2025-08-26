import type { Option } from "../data/questions";
import { classNames } from "../lib/utils";

type Props = {
  option: Option;
  percent: number;
  isTop: boolean;
  expanded: boolean;
  mismatches: number[];
  onToggle: () => void;
  onLearnMore: () => void;
  idealFor: (qid: number) => "Yes" | "No";
  youChose: (qid: number) => "Yes" | "No";
  questionText: (qid: number) => string;
};

export default function ResultCard({
  option,
  percent,
  isTop,
  expanded,
  mismatches,
  onToggle,
  onLearnMore,
  idealFor,
  youChose,
  questionText,
}: Props) {
  return (
    <div
      className={classNames(
        "rounded-2xl border bg-white p-4 shadow-sm",
        isTop ? "border-slate-900" : "border-slate-200"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold">{option}</div>
        <div className="text-lg font-bold tabular-nums">{percent}%</div>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all"
          style={{ width: `${percent}%` }}
          aria-label={`${option} match ${percent}%`}
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

        <button
          type="button"
          onClick={onLearnMore}
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:opacity-80"
        >
          Learn more →
        </button>
      </div>

      {expanded && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {mismatches.length === 0 ? (
            <li>All answered questions match this strategy.</li>
          ) : (
            mismatches.map((qid) => (
              <li key={`${option}-${qid}`}>
                Q{qid}: expected <span className="font-medium">{idealFor(qid)}</span>, you chose{" "}
                <span className="font-medium">{youChose(qid)}</span> – {questionText(qid)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
