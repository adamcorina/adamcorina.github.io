import { classNames } from "../lib/utils";

type Props = {
  id: number;
  text: string;
  value: boolean | null;
  onAnswer: (val: boolean) => void;
};

export default function QuestionCard({ id, text, value, onAnswer }: Props) {
  const isAnswered = value !== null;
  return (
    <div
      className={classNames(
        "rounded-2xl border bg-white p-4 shadow-sm",
        isAnswered ? "border-slate-300" : "border-slate-200",
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-800">Q{id}</div>
          <div className="mt-1 text-base leading-snug">{text}</div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onAnswer(true)}
            className={classNames(
              "rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-inset",
              value === true
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-900 ring-slate-300 hover:bg-slate-50",
            )}
            aria-pressed={value === true}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onAnswer(false)}
            className={classNames(
              "rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-inset",
              value === false
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-900 ring-slate-300 hover:bg-slate-50",
            )}
            aria-pressed={value === false}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
