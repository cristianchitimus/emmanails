"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* Note: card images have been removed — the cards are now transparent
   glass panels over the scroll-scrubbed video. Props are kept (and ignored)
   to avoid breaking the SSR call site that still passes hero image settings. */
interface ScrollScrubHeroProps {
  heroLeftImage?: string;
  heroRightTopImage?: string;
  heroRightBottomImage?: string;
}

/* ════════════════════════════════════════════════════
   HERO CARD — transparent text-only panel over video
   Used for both the Academy and Produse cards (equal size).
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
      {/* No background — fully transparent. Text carries drop-shadow for legibility. */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <div className="hidden md:block [&_*]:[text-shadow:0_2px_20px_rgba(0,0,0,0.6)]">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-white/80 mb-2 block">
            {label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium text-white leading-[0.95]">
            {title}<br />
            <span className="italic text-pink/95">{titleAccent}</span>
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
   Scroll track (250vh) contains a sticky 100vh hero.
   Video is scrubbed via currentTime based on scroll
   progress. Lerp smoothing for fluid playback.
   ════════════════════════════════════════════════════ */
export function ScrollScrubHero(_props: ScrollScrubHeroProps = {}) {

  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Detect mobile (iOS Safari is flaky with scroll-scrubbing)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-scrubbing: only on desktop
  useEffect(() => {
    if (isMobile) return;

    const track = trackRef.current;
    const sticky = stickyRef.current;
    const video = videoRef.current;
    if (!track || !sticky || !video) return;

    // Prevent autoplay loop — we control currentTime manually
    video.pause();

    let rafId = 0;
    let targetTime = 0;
    let currentTime = 0;
    let running = true;

    const writeProgress = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;
      // Use the *smoothed* currentTime so the text animation stays perfectly
      // in sync with what's visible on screen (video is lerped, not instant).
      const smoothed = Math.max(0, Math.min(1, currentTime / duration));
      sticky.style.setProperty("--hero-progress", String(smoothed));
    };

    const tick = () => {
      if (!running) return;
      // Only update if the difference is perceivable — avoids setting currentTime every frame with no change
      const diff = targetTime - currentTime;
      if (Math.abs(diff) > 0.005) {
        currentTime += diff * 0.18; // lerp factor — higher = more responsive, lower = smoother
        try {
          video.currentTime = currentTime;
        } catch {
          // Some browsers throw if not ready yet — ignore
        }
        writeProgress();
      }
      rafId = requestAnimationFrame(tick);
    };

    const computeProgress = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollableDist = track.offsetHeight - vh;
      if (scrollableDist <= 0) return 0;
      const scrolled = Math.max(0, Math.min(scrollableDist, -rect.top));
      return scrolled / scrollableDist;
    };

    const updateTarget = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;
      const progress = computeProgress();
      // Clamp slightly below duration to avoid the "ended" state resetting to 0
      targetTime = Math.max(0, Math.min(duration - 0.05, progress * duration));
    };

    const onReady = () => {
      setVideoReady(true);
      // Snap immediately to avoid a pop at load
      updateTarget();
      currentTime = targetTime;
      try {
        video.currentTime = currentTime;
      } catch {}
      writeProgress();
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => updateTarget();
    const onResize = () => updateTarget();

    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener("loadeddata", onReady, { once: true });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      video.removeEventListener("loadeddata", onReady);
    };
  }, [isMobile]);

  // On mobile, let the video autoplay/loop — scrubbing is unreliable
  useEffect(() => {
    if (!isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {
      // Autoplay blocked — that's fine, first frame will show as poster
    });
  }, [isMobile]);

  return (
    <section
      ref={trackRef}
      // Desktop: tall scroll track so there's runway for the video to scrub through.
      // Mobile: single viewport — video just loops in background.
      className="relative w-full bg-dark md:h-[250vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* ────── Video background ────── */}
        <video
          ref={videoRef}
          src="/videos/hero.mp4"
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady || isMobile ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ────── Cinematic overlay: darken + subtle vignette for card legibility ────── */}
        <div className="absolute inset-0 bg-dark/30 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />

        {/* ────── Initial backdrop while video loads (hidden once ready) ────── */}
        {!videoReady && !isMobile && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, #3a1a3a 0%, #5b2a5b 50%, #3a1a3a 100%)",
            }}
          />
        )}

        {/* ────── Bento grid — floats over video, rises + fades as video progresses ────── */}
        <div
          className="relative z-10 h-full flex items-center px-3 md:px-6 py-4 md:py-6 will-change-transform"
          style={{
            // Drift upward as the video plays, fade out in the last ~25% of the scrub.
            // Both are keyed to --hero-progress (0 → 1) set in the scroll tick.
            transform:
              "translate3d(0, calc(var(--hero-progress, 0) * -120px), 0)",
            opacity:
              "calc((1 - var(--hero-progress, 0)) * 4)",
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

        {/* ────── Scroll indicator — fades faster so it's gone early ────── */}
        <div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 text-white/70 pointer-events-none"
          style={{
            opacity: "calc(1 - var(--hero-progress, 0) * 6)",
          }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
