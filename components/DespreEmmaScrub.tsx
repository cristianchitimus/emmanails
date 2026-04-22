"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSectionProgress } from "./FadeStack";
import { LetterReveal } from "./LetterReveal";

/* ─────────────────────────────────────────────────────────────────────────
   DespreEmmaScrub
   ---------------
   Split panel used as one slot of FadeStack.
   - Left half: <canvas> driven by the section's local progress; frames are
     preloaded WebP stills (see /videos/emma-frames/eNNN.webp).
   - Right half: editorial text block that fades & rises in during the first
     third of the section's local progress.
   - On mobile and on browsers that don't signal readiness (or if the user
     reaches the section before frames finish loading) we render a looping
     <video> fallback instead of the canvas.

   Smoothing strategy (matches ScrollScrubHero):
   - Source video is 5s at 24fps, motion-interpolated to 48fps for the sequence
     = 240 frames. 2x frame density vs native halves the scroll-distance-per-
     frame.
   - Rendering runs in a requestAnimationFrame loop with lerp easing
     (currentIndex follows targetIndex with factor 0.12 per tick). This is the
     critical bit: a sharp scroll input that jumps targetIndex by +20 frames
     plays out as ~20 sequential frames over ~250ms instead of one discrete
     drawImage jump. Without this, the scrub looks "framey" no matter how
     many frames you have. progress from React context is read via a ref
     inside the rAF loop so we never depend on render cycles for animation.
─────────────────────────────────────────────────────────────────────────── */

const FRAME_COUNT = 240;
const frameSrc = (i: number) =>
  `/videos/emma-frames/e${String(i + 1).padStart(3, "0")}.webp`;

export function DespreEmmaScrub() {
  const progress = useSectionProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  // Mirror progress into a ref so the rAF loop reads the latest value without
  // having React re-renders drive the animation.
  const progressRef = useRef(0);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Detect mobile once — canvas scrubbing is desktop-only for perf reasons
  // (mobile gets the looping mp4 fallback, same pattern as ScrollScrubHero).
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload all 120 frames on mount. Wait for ALL to load before marking
  // ready so scroll-scrub never lands on an unloaded frame (which would
  // force the "walk backward" fallback and create a stuttery, broken look).
  useEffect(() => {
    if (isMobile) return;
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;
    let done = 0;
    let readyFlipped = false;

    const flipReady = () => {
      if (readyFlipped || cancelled) return;
      readyFlipped = true;
      setFramesReady(true);
    };

    const onOne = () => {
      if (cancelled) return;
      done++;
      if (done >= FRAME_COUNT) flipReady();
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.loading = "eager";
      img.onload = onOne;
      img.onerror = onOne; // still count so we don't hang forever
      img.src = frameSrc(i);
      images[i] = img;
    }

    // Safety: regardless of network/cache weirdness, reveal the canvas after
    // 6s — at that point most frames will be in, and the draw step's own
    // walk-backward guard handles any remaining gaps gracefully.
    const safetyId = window.setTimeout(flipReady, 6000);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyId);
    };
  }, [isMobile]);

  // Scroll-scrubbed rAF loop with lerp easing. Identical strategy to
  // ScrollScrubHero — see the file header comment for why this matters.
  // The animation is driven entirely by rAF, never by React re-renders.
  useEffect(() => {
    if (isMobile || !framesReady) return;
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || images.length === 0) return;

    let rafId = 0;
    let currentIndex = progressRef.current * (FRAME_COUNT - 1);
    let lastDrawnIndex = -1;
    let running = true;

    const drawFrame = (rawIdx: number) => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, rawIdx));
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w === 0 || h === 0) return;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // object-cover geometry
      const imgAR = img.naturalWidth / img.naturalHeight;
      const canvasAR = w / h;
      let sx: number, sy: number, sw: number, sh: number;
      if (imgAR > canvasAR) {
        sh = img.naturalHeight;
        sw = sh * canvasAR;
        sx = (img.naturalWidth - sw) / 2;
        sy = 0;
      } else {
        sw = img.naturalWidth;
        sh = sw / canvasAR;
        sx = 0;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    };

    const tick = () => {
      if (!running) return;
      const target = progressRef.current * (FRAME_COUNT - 1);
      const diff = target - currentIndex;
      if (Math.abs(diff) > 0.01) {
        currentIndex += diff * 0.12; // lerp factor — matches hero
        const i = Math.round(currentIndex);
        if (i !== lastDrawnIndex) {
          drawFrame(i);
          lastDrawnIndex = i;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // Initial paint at exact target so we never start with a stale frame
    currentIndex = progressRef.current * (FRAME_COUNT - 1);
    const startIdx = Math.round(currentIndex);
    drawFrame(startIdx);
    lastDrawnIndex = startIdx;
    rafId = requestAnimationFrame(tick);

    const onResize = () => drawFrame(Math.round(currentIndex));
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile, framesReady]);

  // The button keeps a soft opacity ramp tied to progress so it doesn't pop
  // in instantly while the headline is still typing itself in. Computed inline
  // below; no useMemo needed.
  const buttonOpacity = Math.min(1, Math.max(0, (progress - 0.25) / 0.15));

  return (
    <div className="w-full h-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
        {/* ─── Left: scrubbed portrait ─── */}
        <div className="relative w-full h-full overflow-hidden bg-[#ece2dc]">
          {!isMobile ? (
            <>
              {/* Desktop: static poster (first frame) shown UNDER the canvas
                  while the rest of the frames preload. The canvas is the ONLY
                  thing that animates — fades in over the poster once ready
                  and is fully driven by scroll progress (no autoplay video,
                  which would otherwise look like the page was animating on
                  its own and ignore upward scroll). */}
              <img
                src={frameSrc(0)}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: framesReady ? 1 : 0,
                  transition: "opacity 400ms ease-out",
                }}
              />
            </>
          ) : (
            <video
              src="/videos/emma.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Subtle vignette on the right edge to smooth the seam into the text panel */}
          <div
            className="absolute inset-y-0 right-0 w-16 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(245,232,229,0.8))",
            }}
          />
        </div>

        {/* ─── Right: editorial text ─── */}
        <div
          className="flex items-center px-8 md:px-16 lg:px-20 py-16 md:py-20 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f5e8e5 0%, #e8cec5 30%, #f5e8e5 60%, #faf3f0 100%)",
          }}
        >
          <div className="max-w-md">
            <p className="section-label mb-4">
              <LetterReveal
                text="Despre Emma"
                trigger={progress >= 0.05}
                staggerMs={32}
              />
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              <LetterReveal
                text="Pasiune, "
                trigger={progress >= 0.05}
                delay={250}
                staggerMs={42}
              />
              <LetterReveal
                text="dedicare"
                trigger={progress >= 0.05}
                delay={250 + "Pasiune, ".length * 42 + 60}
                staggerMs={42}
                className="italic text-pink"
              />
              <LetterReveal
                text=" și excelență"
                trigger={progress >= 0.05}
                delay={
                  250 + "Pasiune, ".length * 42 + 60 + "dedicare".length * 42 + 60
                }
                staggerMs={42}
              />
            </h2>
            <p className="font-body text-base text-dark-400 leading-relaxed mt-5">
              {/* Body copy uses a tight stagger so it reads like a fast wash
                  rather than a per-letter type-out (which would feel slow on
                  3 lines of text). */}
              <LetterReveal
                text="Cu peste 15 ani de experiență în industria manichiurii, Emma a format sute de profesioniști. Produsele Emma Nails sunt dezvoltate pe baza nevoilor reale din salon."
                trigger={progress >= 0.15}
                staggerMs={10}
                durationMs={400}
              />
            </p>
            <div
              className="flex flex-wrap gap-3 mt-8"
              style={{
                opacity: buttonOpacity,
                transform: `translateY(${(1 - buttonOpacity) * 12}px)`,
                transition: "opacity 200ms ease-out, transform 200ms ease-out",
              }}
            >
              <Link href="/despre" className="btn-primary">
                Citește Povestea
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
