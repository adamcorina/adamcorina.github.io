import { OPTIONS, type Option } from "../data/questions";

export type Route =
  | { page: "quiz" }
  | { page: "learn"; option: Option };

export function parseHash(): Route {
  const raw = (typeof window !== "undefined" ? window.location.hash : "").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean); // "", "learn/SSR" -> ["learn","SSR"]

  if (parts.length === 2 && parts[0] === "learn") {
    const opt = parts[1];
    if ((OPTIONS as readonly string[]).includes(opt)) {
      return { page: "learn", option: opt as Option };
    }
  }
  return { page: "quiz" };
}

export function navigate(to: string) {
  if (typeof window !== "undefined") {
    window.location.hash = to.startsWith("#") ? to : `#${to}`;
  }
}

import { useEffect, useState } from "react";
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash());
  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}
