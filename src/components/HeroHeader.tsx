import * as React from "react";

type Variant = "dark" | "light";
type Tone = "emerald" | "indigo" | "slate";

export type HeroHeaderProps = {
  /** Visual style */
  variant?: Variant;
  /** Small eyebrow text above the title (optional) */
  eyebrow?: string;
  /** Main title */
  title: string;
  /** Supporting paragraph */
  intro?: string;
  /** Optional badge (e.g., Frontend / Backend) */
  badge?: { text: string; tone?: Tone };
  /** Small meta line (e.g., “14 questions · 5 options”) */
  meta?: string;
  /** CTA buttons or links */
  actions?: React.ReactNode;
  /** Extra content rendered below the main block (e.g., option pills) */
  children?: React.ReactNode;
  className?: string;
};

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const VARIANT = {
  dark: "bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-800",
  light: "bg-white text-slate-900 border-slate-200",
} as const;

const BADGE: Record<Tone, string> = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  slate: "bg-slate-100 text-slate-800 ring-slate-200",
};

export default function HeroHeader({
  variant = "light",
  eyebrow,
  title,
  intro,
  badge,
  meta,
  actions,
  children,
  className,
}: HeroHeaderProps) {
  return (
    <header
      className={cx(
        "relative mb-8 overflow-hidden rounded-3xl border p-8 shadow-sm sm:p-12",
        VARIANT[variant],
        className,
      )}
    >
      {/* subtle flare only on dark */}
      {variant === "dark" && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
      )}

      <div className="relative z-10">
        {(eyebrow || badge) && (
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {eyebrow && (
              <span
                className={cx(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
                  variant === "dark"
                    ? "bg-white/10 text-white ring-white/20"
                    : "bg-slate-100 text-slate-800 ring-slate-200",
                )}
              >
                {eyebrow}
              </span>
            )}
            {badge && (
              <span
                className={cx(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                  BADGE[badge.tone ?? "slate"],
                )}
                title={badge.text}
              >
                {badge.text}
              </span>
            )}
          </div>
        )}

        <h1
          className={cx(
            "text-3xl font-semibold tracking-tight",
            variant === "dark" ? "sm:text-4xl" : "sm:text-3xl",
          )}
        >
          {title}
        </h1>

        {intro && (
          <p
            className={cx(
              "mt-3 max-w-2xl",
              variant === "dark" ? "text-slate-200" : "text-slate-600",
            )}
          >
            {intro}
          </p>
        )}

        {(meta || actions) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {meta && (
              <span
                className={cx(
                  "text-xs",
                  variant === "dark" ? "text-slate-300" : "text-slate-500",
                )}
              >
                {meta}
              </span>
            )}
            {actions && <div className="ml-auto flex gap-2">{actions}</div>}
          </div>
        )}
      </div>

      {/* Extra content */}
      {children && (
        <div
          className={cx(
            "relative z-10 mt-5",
            variant === "dark" ? "text-white" : "text-slate-900",
          )}
        >
          {children}
        </div>
      )}
    </header>
  );
}
