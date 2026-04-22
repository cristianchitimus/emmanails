"use client";

import { useEffect, useRef, useState } from "react";

interface LetterRevealProps {
  /** Plain text content. Pass a string — children must NOT be JSX since we
      split it character by character. For styled accent words, render a
      separate <LetterReveal> per segment with a custom className/delay. */
  text: string;
  /** Delay before the FIRST character animates in, in ms. Use this to chain
      multiple LetterReveal blocks (heading → accent → description). */
  delay?: number;
  /** Per-character stagger delay in ms. Smaller = faster overall. */
  staggerMs?: number;
  /** Animation duration per character in ms. */
  durationMs?: number;
  /** Optional className applied to the wrapping span (font sizing, color, etc.). */
  className?: string;
  /** Inline style applied to the wrapping span. Useful for inheriting text-shadow
      from a parent that we can't reach via className. */
  style?: React.CSSProperties;
  /** Tag name — defaults to "span" but can be set to "h1", "h2", etc. */
  as?: "span" | "h1" | "h2" | "h3" | "div" | "p";
  /** When true, animation runs once on mount (no IntersectionObserver). Use
      when the element is guaranteed to be in viewport on load (e.g. hero). */
  immediate?: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────
   LetterReveal
   ------------
   Splits a string into per-character spans and reveals them with a stagger
   on scroll-into-view (or immediately if `immediate` is true).

   Each char has translateY(0.45em) + opacity 0 initially, then transitions
   to translateY(0) + opacity 1. Transitions inherit-friendly transforms so
   the rest of the layout never jumps.

   Whitespace is preserved as a non-animated &nbsp; so word breaks happen at
   the right offsets and screen readers still get sensible text (the wrapper
   carries an aria-label with the full string).
─────────────────────────────────────────────────────────────────────────── */
export function LetterReveal({
  text,
  delay = 0,
  staggerMs = 35,
  durationMs = 600,
  className = "",
  style,
  as: Tag = "span",
  immediate = false,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Defer one frame so the initial paint shows the hidden state, then we
      // transition into the visible state — otherwise React may batch the
      // initial render with the visible state and skip the transition.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  const chars = Array.from(text);

  // Cast to a permissive type — the union of HTMLElement subtypes for the
  // accepted tags makes ref callbacks awkward to type, but the runtime is fine.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={(el: HTMLElement | null) => {
        ref.current = el;
      }}
      aria-label={text}
      className={`inline-block ${className}`}
      style={style}
    >
      {chars.map((ch, i) => {
        if (ch === " ") {
          // Render as a real space so word-breaks work; no animation needed.
          return (
            <span key={i} aria-hidden className="inline-block">
              {"\u00A0"}
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden
            className="inline-block will-change-[transform,opacity]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(0.45em)",
              transition: `opacity ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                delay + i * staggerMs
              }ms, transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${
                delay + i * staggerMs
              }ms`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </Component>
  );
}
