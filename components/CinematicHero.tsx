"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const HERO_IMAGES = [
  "/uploads/brand-Foto_031.jpg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__4_.jpeg",
  "/uploads/brand-Foto_043.jpg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_34.jpeg",
  "/uploads/brand-Foto_013.jpg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_33__2_.jpeg",
  "/uploads/brand-Foto_024.jpg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__1_.jpeg",
];

export function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(-1);
  const [animating, setAnimating] = useState(false);

  const advance = useCallback(() => {
    if (animating) return;
    const nextIdx = (current + 1) % HERO_IMAGES.length;
    setNext(nextIdx);
    setAnimating(true);
  }, [current, animating]);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [advance]);

  // Finish transition
  useEffect(() => {
    if (!animating) return;
    const t = setTimeout(() => {
      setCurrent(next);
      setNext(-1);
      setAnimating(false);
    }, 1200);
    return () => clearTimeout(t);
  }, [animating, next]);

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-dark">
      {/* ── Background images with Ken Burns + crossfade ── */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: i === current ? 1 : i === next ? 1 : 0,
            zIndex: i === next ? 2 : i === current ? 1 : 0,
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            className={`object-cover transition-transform duration-[8000ms] ease-out ${
              i === current && !animating ? "scale-110" : "scale-100"
            }`}
            sizes="100vw"
            priority={i < 2}
          />
        </div>
      ))}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-dark/50 via-transparent to-transparent" />

      {/* ── Content: Split layout ── */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Vertical divider (desktop only) */}
        <div className="hidden md:block absolute top-[15%] bottom-[15%] left-1/2 w-px bg-white/10 z-30" />

        <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* ── LEFT: Academie ── */}
          <Link href="/academie" className="group relative flex flex-col justify-end pb-10 md:pb-14 pr-0 md:pr-12 lg:pr-16">
            <div className="w-10 h-[2px] bg-pink mb-5 hidden md:block" />
            <p className="font-body text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 mb-3">
              Cursuri Acreditate
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[0.95] tracking-tight">
              Emma Nails<br /><span className="italic text-pink/90">Academy</span>
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed mt-4 max-w-sm">
              Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.
            </p>
            <div className="flex gap-5 mt-4">
              <div>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">15+</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Ani</p>
              </div>
              <div>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">500+</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Cursante</p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-7 py-3.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
                Vezi Cursurile
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </div>
          </Link>

          {/* ── RIGHT: Produse ── */}
          <Link href="/produse" className="group relative hidden md:flex flex-col justify-end pb-14 pl-12 lg:pl-16">
            <div className="w-10 h-[2px] bg-white/30 mb-5" />
            <p className="font-body text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 mb-3">
              Magazin Online
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[0.95] tracking-tight">
              Produse<br /><span className="italic text-pink/90">Profesionale</span>
            </h2>
            <p className="font-body text-sm text-white/50 leading-relaxed mt-4 max-w-sm">
              Geluri, baze, topuri și instrumente — formulă originală, dezvoltate din experiență în salon.
            </p>
            <div className="flex gap-5 mt-4">
              <div>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">110+</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Produse</p>
              </div>
              <div>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">7</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Categorii</p>
              </div>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] bg-white text-dark px-7 py-3.5 rounded-full group-hover:bg-pink group-hover:text-white transition-all duration-500">
                Shop Acum
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile: second CTA for Produse */}
        <div className="md:hidden absolute bottom-10 right-5 z-30">
          <Link
            href="/produse"
            className="inline-flex items-center gap-2 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20"
          >
            Shop
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-6 md:bottom-8 right-5 md:right-8 lg:right-14 z-20 flex items-center gap-1.5">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (animating || i === current) return;
              setNext(i);
              setAnimating(true);
            }}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 animate-pulse">
        <span className="font-body text-[8px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
