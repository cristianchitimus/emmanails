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
   A column of "pinned, slide-stacked" sections (legacy name kept for the
   import surface; behaviour is now slide, not crossfade).

   - The whole stack consumes `heightPerSectionVh * nSections` of scroll.
   - Inside that track, a sticky 100vh stage pins to the viewport.
   - Each section lives at `position: absolute; inset: 0` inside the stage,
     stacked by z-index in source order.
   - As the visitor scrolls past a boundary, the NEXT section slides into
     view and covers the previous one. The slide direction alternates per
     section ("intercalat"): odd-index panels enter from the BOTTOM, even-
     index panels enter from the TOP. The previous panel stays put behind
     the cover, so scrolling back up reverses the slide cleanly.
   - The slide happens within a band right before each boundary; outside
     that band the panel is either fully off-stage or fully covering the
     stage, so each section gets a long, calm "sit" period before/after
     its transition.

   Each child has access to its own 0..1 `localProgress` via the
   `useSectionProgress()` hook. Used by e.g. DespreEmmaScrub to advance the
   scrub frame index while the section is its own slice.
─────────────────────────────────────────────────────────────────────────── */

const SectionProgressContext = createContext(0);

/** Hook for descendants of a FadeStack section. Returns 0..1 local progress. */
export const useSectionProgress = () => useContext(SectionProgressContext);

interface Props {
  children: ReactNode;
  /** Vh units each section consumes. Must be > 100 for a pleasant pace. */
  heightPerSectionVh?: number;
  /** 0..1, fraction of each slice spent in the slide transition. The rest is
   *  spent fully docked. 0.35 → 35% transitioning, 65% sitting still. */
  slideBand?: number;
  /** Optional background for the sticky stage (visible only briefly between
   *  panels with non-opaque backgrounds). */
  stageClassName?: string;
}

export function FadeStack({
  children,
  heightPerSectionVh = 120,
  slideBand = 0.35,
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
  // Smoothstep — eases in and out, no abrupt motion at the band edges.
  const smooth = (t: number) => t * t * (3 - 2 * t);

  /**
   * Slide offset in % units (CSS translateY) for panel i.
   *  - Panel 0 is always docked at 0% (it's the bedrock).
   *  - Panel i (i ≥ 1) starts off-stage at ±100% (sign alternates by parity)
   *    and slides to 0% during the band right before its slice begins.
   *    After it docks it stays at 0% covering everything below it.
   */
  const slideOffsetFor = (i: number) => {
    if (i === 0) return 0;
    const fromBottom = i % 2 === 1; // odd → bottom; even → top
    const sign = fromBottom ? 1 : -1;
    const dockAt = i * slice; // boundary at which panel i fully covers stage
    const bandStart = dockAt - slideBand * slice;
    if (scrollProgress <= bandStart) return sign * 100;
    if (scrollProgress >= dockAt) return 0;
    const t = (scrollProgress - bandStart) / (dockAt - bandStart);
    return sign * 100 * (1 - smooth(t));
  };

  // Local 0..1 progress for descendants that want to animate internally.
  const localProgressFor = (i: number) => {
    const start = i * slice;
    const end = (i + 1) * slice;
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  // Which panel is the visually dominant one right now? (For pointer events
  // and aria.) It's the highest-index panel whose top edge has docked or is
  // within the second half of its slide-in band.
  const activeIndex = (() => {
    let active = 0;
    for (let i = 1; i < n; i++) {
      const dockAt = i * slice;
      const bandMid = dockAt - 0.5 * slideBand * slice;
      if (scrollProgress >= bandMid) active = i;
    }
    return active;
  })();

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
          const offset = slideOffsetFor(i);
          const local = localProgressFor(i);
          const isActive = i === activeIndex;
          return (
            <div
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{
                transform: `translate3d(0, ${offset}%, 0)`,
                // Higher index sits on top, so a later panel can cover an
                // earlier one as it slides in.
                zIndex: i,
                pointerEvents: isActive ? "auto" : "none",
                willChange: "transform",
              }}
              data-section-index={i}
              aria-hidden={!isActive}
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
