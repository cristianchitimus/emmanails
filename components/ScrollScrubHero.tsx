"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LetterReveal } from "./LetterReveal";

/* Note: card images have been removed — cards are transparent text-only panels
   over the scroll-scrubbed background. Props are kept (and ignored) to avoid
   breaking any SSR call site that still passes hero image settings. */
interface ScrollScrubHeroProps {
  heroLeftImage?: string;
  heroRightTopImage?: string;
  heroRightBottomImage?: string;
}

/* How many WebP frames live at /public/videos/frames/f001.webp … f240.webp
   Source video is 5s at 24fps, motion-interpolated to 48fps for the sequence
   = 240 frames. 2x frame density (vs the previous 120) halves the scroll-
   distance-per-frame and gives noticeably more fluid motion during scrub. */
const FRAME_COUNT = 240;
const FRAME_URL = (i: number) =>
  `/videos/frames/f${String(i + 1).padStart(3, "0")}.webp`;
// Mobile fallback: MP4 loop, no scrubbing (iOS Safari is unreliable for this)
const MOBILE_VIDEO_SRC = "/videos/hero.mp4";

/* ════════════════════════════════════════════════════
   HERO CARD — transparent text-only panel over bg
   ════════════════════════════════════════════════════ */
function HeroCard({ href, label, title, titleAccent, description, stats, cta }: {
  href: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  stats: { value: string; label: string }[];
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block h-full min-h-[320px] md:min-h-0 rounded-2xl"
    >
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <div
          className="hidden md:block"
          style={{
            // Two-layer shadow: tight dark edge for crispness, wide soft halo for depth.
            // Applied to all descendants via the trick of setting it on the block root
            // (inherits via `text-shadow` on every text node).
            textShadow:
              "0 2px 6px rgba(0,0,0,0.9), 0 8px 40px rgba(0,0,0,0.55)",
          }}
        >
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 mb-2 block">
            {label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium text-white leading-[0.95]">
            <LetterReveal
              text={title}
              immediate
              staggerMs={45}
              durationMs={700}
              className="text-white"
            />
            <br />
            <LetterReveal
              text={titleAccent}
              immediate
              // Wait until the main title finishes before the accent starts.
              delay={title.length * 45 + 120}
              staggerMs={55}
              durationMs={700}
              className="italic text-pink/95"
            />
          </h2>
          <p className="font-body text-sm text-white/80 leading-relaxed mt-3 max-w-sm">
            {description}
          </p>
          <div className="flex gap-5 mt-3">
            {stats.map((s, i) => (
              <div key={i}>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.value}</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/60 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-0 md:mt-5">
          <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/50 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500 backdrop-blur-md bg-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            {cta}
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
   Desktop: canvas-based image sequence scrubbing.
     - All frames preloaded as <img> once on mount.
     - On scroll, the corresponding frame index is drawn to canvas.
     - Zero video decoding during scrub — buttery smooth.
   Mobile: video loop (scrubbing is unreliable on iOS Safari).
   ════════════════════════════════════════════════════ */
export function ScrollScrubHero(_props: ScrollScrubHeroProps = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [framesReady, setFramesReady] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Detect mobile (sub-md breakpoint → video fallback)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Deliberate delayed fade-in: give the video a full beat to establish itself
  // before the text materializes. User sees the scene for ~1.2s first, then
  // text fades in gradually over 2.5s.
  useEffect(() => {
    if (framesReady) {
      const t = setTimeout(() => setTextVisible(true), 1200);
      return () => clearTimeout(t);
    }
    if (isMobile) {
      const t = setTimeout(() => setTextVisible(true), 1400);
      return () => clearTimeout(t);
    }
  }, [framesReady, isMobile]);

  // ─── Preload all frames as Image objects (desktop only) ──────────────
  useEffect(() => {
    if (isMobile) return;
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = images;

    let done = 0;
    // Ready as soon as the first frame decodes — user sees the hero immediately.
    // Remaining frames continue loading in parallel in the background.
    let firstReady = false;

    const onSettle = () => {
      if (cancelled) return;
      done++;
      if (done === FRAME_COUNT) {
        // Full sequence ready — nothing more to signal.
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        if (!firstReady && i === 0) {
          firstReady = true;
          setFramesReady(true);
        }
        onSettle();
      };
      img.onerror = onSettle;
      img.src = FRAME_URL(i);
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  // ─── Draw helper — mimics object-cover on canvas ─────────────────────
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;
    const clamped = Math.max(0, Math.min(frames.length - 1, index));
    const img = frames[clamped];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // This frame isn't decoded yet — walk backwards to find the closest one
      // that is. Keeps the canvas populated even during initial background loading.
      for (let j = clamped - 1; j >= 0; j--) {
        const prev = frames[j];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          return paint(canvas, prev);
        }
      }
      for (let j = clamped + 1; j < frames.length; j++) {
        const nxt = frames[j];
        if (nxt && nxt.complete && nxt.naturalWidth > 0) {
          return paint(canvas, nxt);
        }
      }
      return;
    }
    paint(canvas, img);
  };

  const paint = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Keep canvas backing store matched to display size × DPR (capped at 2)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(canvas.clientWidth * dpr);
    const h = Math.floor(canvas.clientHeight * dpr);
    if (w === 0 || h === 0) return;
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;

    // Request highest-quality resampling for the upscale.
    // On DPR-2 Retina + 1920p source we're drawing into a 3840-wide canvas —
    // 'high' uses bicubic/lanczos-like; 'low' (the default) looks soft/blocky.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // object-cover: crop source to match canvas aspect, centered
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

  // ─── Scroll-scrubbed rAF loop (desktop) ──────────────────────────────
  useEffect(() => {
    if (isMobile || !framesReady) return;

    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;

    let rafId = 0;
    let targetIndex = 0;
    let currentIndex = 0;
    let lastDrawnIndex = -1;
    let running = true;

    const computeProgress = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableDist = track.offsetHeight - vh;
      if (scrollableDist <= 0) return 0;
      const scrolled = Math.max(0, Math.min(scrollableDist, -rect.top));
      return scrolled / scrollableDist;
    };

    const updateTarget = () => {
      const progress = computeProgress();
      targetIndex = progress * (FRAME_COUNT - 1);
    };

    const tick = () => {
      if (!running) return;
      const diff = targetIndex - currentIndex;
      if (Math.abs(diff) > 0.01) {
        currentIndex += diff * 0.12;
        const i = Math.round(currentIndex);
        if (i !== lastDrawnIndex) {
          drawFrame(i);
          lastDrawnIndex = i;
        }
        const progress = currentIndex / (FRAME_COUNT - 1);
        sticky.style.setProperty(
          "--hero-progress",
          String(Math.max(0, Math.min(1, progress))),
        );
      }
      rafId = requestAnimationFrame(tick);
    };

    // Initial: snap, paint, start loop
    updateTarget();
    currentIndex = targetIndex;
    drawFrame(Math.round(currentIndex));
    lastDrawnIndex = Math.round(currentIndex);
    sticky.style.setProperty(
      "--hero-progress",
      String(Math.max(0, Math.min(1, currentIndex / (FRAME_COUNT - 1)))),
    );
    rafId = requestAnimationFrame(tick);

    const onScroll = () => updateTarget();
    const onResize = () => {
      updateTarget();
      drawFrame(Math.round(currentIndex));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // drawFrame is stable (uses refs), safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, framesReady]);

  // ─── Mobile: plain looping video, no canvas ──────────────────────────
  useEffect(() => {
    if (!isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {});
  }, [isMobile]);

  return (
    <section
      ref={trackRef}
      className="relative w-full bg-dark md:h-[400vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ────── Background: canvas on desktop, video on mobile ────── */}
        {!isMobile && (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
              framesReady ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        )}
        {isMobile && (
          <video
            ref={videoRef}
            src={MOBILE_VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            disableRemotePlayback
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* No overlays — video shows at full generated brightness.
            Text legibility is carried by per-text-node drop-shadows instead. */}

        {/* ────── Initial backdrop while first frame decodes ────── */}
        {!framesReady && !isMobile && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #3a1a3a 0%, #5b2a5b 50%, #3a1a3a 100%)",
            }}
          />
        )}

        {/* ────── Text layer: fades in once, then scroll-driven rise + fade out ────── */}
        <div
          className={`absolute inset-0 z-10 transition-opacity ease-out ${
            textVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: "2500ms" }}
        >
          {/* Inner wrapper handles the scroll-driven transform + opacity.
              Kept separate from the outer fade-in so the two opacities multiply cleanly.
              
              Rise: 0 → -70vh. At progress=1 the cards are ~70vh above their start,
              which on any normal viewport puts them visibly OFF the top edge.
              
              Opacity: stays at 1 for the first 67% of scroll, then fades to 0 by 100%.
              This gives the cards time to actually travel up through the viewport
              before they start disappearing. */}
          <div
            className="relative h-full flex items-center px-3 md:px-6 py-4 md:py-6 will-change-transform"
            style={{
              transform:
                "translate3d(0, calc(var(--hero-progress, 0) * -70vh), 0)",
              opacity: "calc((1 - var(--hero-progress, 0)) * 3)",
            }}
          >
            <div className="w-full max-w-[1400px] mx-auto">
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                style={{ height: "calc(100vh - 2rem)" }}
              >
                <div className="min-h-[320px] md:min-h-0">
                  <HeroCard
                    href="/academie"
                    label="Cursuri Acreditate"
                    title="Emma Nails"
                    titleAccent="Academy"
                    description="Peste 15 ani de experiență. Diplomă acreditată, practică pe model real."
                    stats={[{ value: "15+", label: "Ani" }, { value: "500+", label: "Cursante" }]}
                    cta="Vezi Cursurile"
                  />
                </div>
                <div className="min-h-[320px] md:min-h-0">
                  <HeroCard
                    href="/produse"
                    label="Magazin Online"
                    title="Produse"
                    titleAccent="Profesionale"
                    description="Geluri, baze, topuri și instrumente — formulă originală."
                    stats={[{ value: "110+", label: "Produse" }, { value: "7", label: "Categorii" }]}
                    cta="Shop"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ────── Scroll indicator (inside fade-in wrapper so it appears with the text) ────── */}
          <div
            className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/80 pointer-events-none"
            style={{
              opacity: "calc(1 - var(--hero-progress, 0) * 6)",
              textShadow:
                "0 2px 6px rgba(0,0,0,0.9), 0 8px 40px rgba(0,0,0,0.55)",
            }}
          >
            <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
