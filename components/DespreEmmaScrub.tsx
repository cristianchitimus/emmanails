"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSectionProgress } from "./FadeStack";

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
───────────────────────────────────────────────────────────────────────── */

/* Source video is 5s at 24fps = 120 native frames, extracted at 1920x1080.
   We intentionally DO NOT motion-interpolate: at 4x density the interpolator
   produces visible warping artifacts on organic motion (face, hands, hair).
   Perceptual smoothness instead comes from the canvas cross-fading between
   the two frames bracketing the fractional progress (see draw step). */
const FRAME_COUNT = 120;
const frameSrc = (i: number) =>
  `/videos/emma-frames/e${String(i + 1).padStart(3, "0")}.webp`;

export function DespreEmmaScrub() {
  const progress = useSectionProgress();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [framesReady, setFramesReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

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

  // Redraw whenever progress changes.
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const images = imagesRef.current;
    if (!canvas || !images || images.length === 0) return;

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

    // Fractional position across the frame sequence — the integer part picks
    // the primary frame, the fractional part is the cross-fade weight to the
    // NEXT frame. Drawing base at alpha=1 then overlay at alpha=frac gives a
    // perceptual smoothness roughly equivalent to 2x–3x frame density, but
    // without the warping you get from motion-interpolated synthetic frames.
    const posFloat = progress * (FRAME_COUNT - 1);
    const baseIdxRaw = Math.floor(posFloat);
    const frac = posFloat - baseIdxRaw;

    // Walk backward to the nearest already-loaded frame if the target isn't in
    // yet — avoids a blank canvas on early scroll (only relevant pre-ready).
    let baseIdx = Math.min(FRAME_COUNT - 1, Math.max(0, baseIdxRaw));
    while (baseIdx > 0 && !images[baseIdx]?.complete) baseIdx--;
    const nextIdx = Math.min(FRAME_COUNT - 1, baseIdx + 1);

    const baseImg = images[baseIdx];
    if (!baseImg || !baseImg.complete || baseImg.naturalWidth === 0) return;
    const nextImg = images[nextIdx];
    const canBlend =
      nextIdx !== baseIdx &&
      nextImg &&
      nextImg.complete &&
      nextImg.naturalWidth !== 0 &&
      frac > 0;

    // object-cover geometry (computed once from base frame dimensions — all
    // frames share the same native resolution so geometry is reusable).
    const imgAR = baseImg.naturalWidth / baseImg.naturalHeight;
    const canvasAR = w / h;
    let sx: number, sy: number, sw: number, sh: number;
    if (imgAR > canvasAR) {
      sh = baseImg.naturalHeight;
      sw = sh * canvasAR;
      sx = (baseImg.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = baseImg.naturalWidth;
      sh = sw / canvasAR;
      sx = 0;
      sy = (baseImg.naturalHeight - sh) / 2;
    }

    ctx.globalAlpha = 1;
    ctx.drawImage(baseImg, sx, sy, sw, sh, 0, 0, w, h);
    if (canBlend) {
      ctx.globalAlpha = frac;
      ctx.drawImage(nextImg!, sx, sy, sw, sh, 0, 0, w, h);
      ctx.globalAlpha = 1;
    }
  }, [progress, framesReady, isMobile]);

  // Text reveal: rise + fade driven by the section's first ~40%.
  const textOpacity = useMemo(() => {
    const p = Math.min(1, Math.max(0, progress / 0.35));
    return p;
  }, [progress]);
  const textTranslate = useMemo(() => {
    const p = Math.min(1, Math.max(0, progress / 0.35));
    return (1 - p) * 30; // px rise
  }, [progress]);

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
          <div
            className="max-w-md"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslate}px)`,
              transition: "opacity 80ms linear, transform 80ms linear",
              willChange: "opacity, transform",
            }}
          >
            <p className="section-label mb-4">Despre Emma</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              Pasiune, <span className="italic text-pink">dedicare</span> și excelență
            </h2>
            <p className="font-body text-base text-dark-400 leading-relaxed mt-5">
              Cu peste 15 ani de experiență în industria manichiurii, Emma a format
              sute de profesioniști. Produsele Emma Nails sunt dezvoltate pe baza
              nevoilor reale din salon.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
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
