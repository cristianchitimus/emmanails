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

  // Preload all 120 frames on mount.
  useEffect(() => {
    if (isMobile) return;
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;
    let done = 0;

    const onOne = () => {
      if (cancelled) return;
      done++;
      // As soon as the first frame is in we can start drawing something —
      // the rest stream in the background. FadeStack only becomes visually
      // active a couple of seconds into the scroll anyway.
      if (done === 1) setFramesReady(true);
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

    return () => {
      cancelled = true;
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

    const targetIdx = Math.round(progress * (FRAME_COUNT - 1));
    // Walk backward to the nearest already-loaded frame if the target isn't in
    // yet — avoids a blank canvas on early scroll.
    let idx = Math.min(FRAME_COUNT - 1, Math.max(0, targetIdx));
    while (idx > 0 && !images[idx]?.complete) idx--;

    const img = images[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // object-cover
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
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: framesReady ? 1 : 0, transition: "opacity 600ms ease-out" }}
            />
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
