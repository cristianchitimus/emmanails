"use client";

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────
   FadeStack
   ---------
   A column of "pinned, crossfading" sections.
   - The whole stack consumes `heightPerSectionVh * nSections` of scroll.
   - Inside that track, a sticky 100vh stage pins to the viewport.
   - Each section lives at `position: absolute; inset: 0` inside the stage,
     so they're layered. Only one is fully opaque at a time; adjacent ones
     crossfade during the band around their boundary.
   - The visitor's scroll wheel still scrolls the page (it has to, so the
     browser can advance the sticky), but visually no content ever moves —
     sections just fade in and out over one another.

   Each child has access to its own 0..1 `localProgress` via the
   `useSectionProgress()` hook. Useful for inner animations that should
   advance while the section is in its active band (e.g. the video-scrubbed
   portrait on Despre Emma).
───────────────────────────────────────────────────────────────────────── */

const SectionProgressContext = createContext(0);

/** Hook for descendants of a FadeStack section. Returns 0..1 local progress. */
export const useSectionProgress = () => useContext(SectionProgressContext);

interface Props {
  children: ReactNode;
  /** Vh units each section consumes. Must be > 100 for a pleasant pace. */
  heightPerSectionVh?: number;
  /** 0..0.5, width of the crossfade band as a fraction of a section's slice. */
  overlap?: number;
  /** Optional background for the sticky stage (shows between frames of each
   *  section's own opaque bg — should be similar in tone to avoid flashing). */
  stageClassName?: string;
}

export function FadeStack({
  children,
  heightPerSectionVh = 120,
  overlap = 0.35,
  stageClassName = "bg-[#faf3f0]",
}: Props) {
  const sections = Children.toArray(children);
  const n = sections.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      setScrollProgress(total > 0 ? scrolled / total : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (n === 0) return null;

  const slice = 1 / n;

  // Opacity: crossfade band sits entirely BEFORE each boundary, so section i's
  // fade-out and section i+1's fade-in occupy exactly the same progress window.
  const opacityFor = (i: number) => {
    const start = i * slice;
    const end = (i + 1) * slice;
    const band = overlap * slice;

    const fadeInStart = i === 0 ? -Infinity : start - band;
    const fadeInEnd = i === 0 ? -Infinity : start;
    const fadeOutStart = i === n - 1 ? Infinity : end - band;
    const fadeOutEnd = i === n - 1 ? Infinity : end;

    if (scrollProgress <= fadeInStart) return 0;
    if (scrollProgress < fadeInEnd) {
      return (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
    }
    if (scrollProgress <= fadeOutStart) return 1;
    if (scrollProgress < fadeOutEnd) {
      return 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    }
    return 0;
  };

  // Local 0..1 progress for descendants that want to animate internally.
  const localProgressFor = (i: number) => {
    const start = i * slice;
    const end = (i + 1) * slice;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${heightPerSectionVh * n}vh` }}
      className="relative"
    >
      <div
        className={`sticky top-0 w-full h-screen overflow-hidden ${stageClassName}`}
      >
        {sections.map((child, i) => {
          const op = opacityFor(i);
          const local = localProgressFor(i);
          return (
            <div
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: op,
                // Only the visually dominant layer captures clicks.
                pointerEvents: op > 0.6 ? "auto" : "none",
                // Hint the compositor.
                willChange: "opacity",
              }}
              data-section-index={i}
              aria-hidden={op < 0.1}
            >
              <SectionProgressContext.Provider value={local}>
                {child}
              </SectionProgressContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
}
