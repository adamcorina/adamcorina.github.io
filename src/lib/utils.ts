export function pct(n: number) {
  return Math.round(n * 100);
}

export function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export const cx = (...xs: Array<string | false | null | undefined>) =>
  xs.filter(Boolean).join(" ");
