"use client";

import { LetterReveal } from "./LetterReveal";
import { useSectionProgress } from "./FadeStack";

interface PanelLetterRevealProps {
  text: string;
  delay?: number;
  staggerMs?: number;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: "span" | "h1" | "h2" | "h3" | "div" | "p";
  /** Local progress (0..1 within the panel's slice) at which the animation
      should fire. Default 0.05 — ~5% into the section, which means the text
      starts revealing as soon as the panel has docked into view. */
  threshold?: number;
}

/* ─────────────────────────────────────────────────────────────────────────
   PanelLetterReveal
   -----------------
   A LetterReveal that's driven by FadeStack's per-panel progress instead of
   IntersectionObserver. Inside a FadeStack panel, the underlying DOM stays
   mounted permanently (panels translate in/out, they don't unmount), so an
   observer can't be used to detect "the user has scrolled to me". Instead
   we read the panel's local 0..1 progress from context and fire the reveal
   once it crosses `threshold`.

   Outside a FadeStack panel, useSectionProgress() returns 0 (the default
   context value), so the text would never reveal — only use this component
   inside a FadeStack child. For everything else, use <LetterReveal> directly.
─────────────────────────────────────────────────────────────────────────── */
export function PanelLetterReveal({
  threshold = 0.05,
  ...rest
}: PanelLetterRevealProps) {
  const progress = useSectionProgress();
  return <LetterReveal {...rest} trigger={progress >= threshold} />;
}
