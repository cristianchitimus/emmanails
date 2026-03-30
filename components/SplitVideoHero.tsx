"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const VIDEOS = ["/hero-video-1.mp4", "/hero-video-2.mp4", "/hero-video-3.mp4"];

export function SplitVideoHero() {
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(1);
  const [fade, setFade] = useState(false);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);

  // Cycle videos every 4 seconds with flash-cut effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLeftIdx((prev) => (prev + 1) % VIDEOS.length);
        setRightIdx((prev) => (prev + 1) % VIDEOS.length);
        setFade(false);
      }, 150); // quick flash cut
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Force play on source change
  useEffect(() => {
    leftRef.current?.load();
    leftRef.current?.play().catch(() => {});
  }, [leftIdx]);

  useEffect(() => {
    rightRef.current?.load();
    rightRef.current?.play().catch(() => {});
  }, [rightIdx]);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 h-[85vh] md:h-[90vh] max-h-[800px]">
      {/* LEFT — Academie & Cursuri */}
      <Link
        href="/academie"
        className="relative overflow-hidden group cursor-pointer"
      >
        {/* Video background */}
        <video
          ref={leftRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <source src={VIDEOS[leftIdx]} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-pink/70 via-pink/40 to-pink/20 group-hover:from-pink/80 transition-colors duration-500" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-end p-8 md:p-12 lg:p-16">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-3">
            De Ce Emma Nails
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">
            Emma Nails<br />Academy
          </h2>
          <p className="font-body text-sm text-white/70 leading-relaxed mt-4 max-w-sm">
            Peste 15 ani de experiență în formarea de profesioniști. Cursuri acreditate cu diplomă, practică pe model real.
          </p>
          <div className="flex gap-6 mt-6">
            {[
              { num: "15+", label: "Ani" },
              { num: "500+", label: "Cursante" },
            ].map((s, i) => (
              <div key={i}>
                <span className="font-display text-2xl md:text-3xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white border border-white/40 px-8 py-3.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Vezi Cursurile
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>

      {/* RIGHT — Shop Produse */}
      <Link
        href="/produse"
        className="relative overflow-hidden group cursor-pointer"
      >
        {/* Video background */}
        <video
          ref={rightRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <source src={VIDEOS[rightIdx]} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/40 to-dark/20 group-hover:from-dark/80 transition-colors duration-500" />

        {/* Content — bottom left, matching Academy side */}
        <div className="relative z-10 h-full flex flex-col items-start justify-end p-8 md:p-12 lg:p-16">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-3">
            Magazin Online
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">
            Produse<br />Profesionale
          </h2>
          <p className="font-body text-sm text-white/70 leading-relaxed mt-4 max-w-sm">
            PolyGel cu formulă originală și instrumente premium. Livrare în toată România.
          </p>
          <div className="flex gap-6 mt-6">
            {[
              { num: "28", label: "Produse" },
              { num: "2", label: "Categorii" },
            ].map((s, i) => (
              <div key={i}>
                <span className="font-display text-2xl md:text-3xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[9px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white border border-white/40 px-8 py-3.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Shop Acum
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
