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
    <section className="relative w-full h-[65vh] md:h-[90vh] lg:h-[95vh] max-h-[900px] overflow-hidden bg-dark">
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

      {/* ── Content ── */}
      <div className="relative z-20 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 pb-12 md:pb-16 lg:pb-20">
        {/* Top accent line */}
        <div className="w-10 h-[2px] bg-pink mb-6 hidden md:block" />

        {/* Label */}
        <p className="font-body text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 mb-3 md:mb-4">
          Produse Profesionale & Academie
        </p>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-[0.95] tracking-tight">
          <span className="block">Emma</span>
          <span className="block mt-1">
            <span className="italic text-pink/90">Nails</span>
            <span className="hidden sm:inline text-white/30 font-light ml-3">—</span>
            <span className="hidden sm:inline text-white/60 text-[0.45em] font-body font-normal tracking-normal align-middle ml-3">Iași, România</span>
          </span>
        </h1>

        {/* Description */}
        <p className="font-body text-sm md:text-base text-white/50 leading-relaxed mt-5 md:mt-6 max-w-md">
          Formulă originală de polygel, geluri UV și baze rubber, dezvoltate din 15 ani de experiență. Cursuri acreditate cu diplomă.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-7 md:mt-8">
          <Link
            href="/produse"
            className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] bg-white text-dark px-7 py-3.5 rounded-full hover:bg-pink hover:text-white transition-all duration-400 group"
          >
            Shop
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link
            href="/academie"
            className="inline-flex items-center gap-2.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-7 py-3.5 rounded-full hover:bg-white hover:text-dark transition-all duration-400 group"
          >
            Cursuri
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* ── Bottom stats bar ── */}
        <div className="flex items-center gap-6 md:gap-10 mt-10 md:mt-14 pt-6 border-t border-white/10">
          {[
            { value: "110+", label: "Produse" },
            { value: "15+", label: "Ani Experiență" },
            { value: "500+", label: "Cursante" },
            { value: "8", label: "Cursuri" },
          ].map((stat, i) => (
            <div key={i} className="min-w-0">
              <span className="font-display text-lg md:text-2xl font-bold text-white">{stat.value}</span>
              <p className="font-body text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/30 mt-0.5">{stat.label}</p>
            </div>
          ))}
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
