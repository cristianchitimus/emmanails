"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const VIDEOS = ["/hero-video-1.mp4", "/hero-video-2.mp4", "/hero-video-3.mp4"];

// Left side: Emma photo first, then nail work slides
const LEFT_IMAGES = [
  "/emma-cursuri.jpg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
];

export function SplitVideoHero() {
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);
  const [fade, setFade] = useState(false);
  const rightRef = useRef<HTMLVideoElement>(null);

  // Cycle both sides every 4s with flash-cut
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setLeftIdx((prev) => (prev + 1) % LEFT_IMAGES.length);
        setRightIdx((prev) => (prev + 1) % VIDEOS.length);
        setFade(false);
      }, 120);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    rightRef.current?.load();
    rightRef.current?.play().catch(() => {});
  }, [rightIdx]);

  return (
    <section className="w-full grid grid-cols-2 h-[50vh] md:h-[85vh] lg:h-[90vh] md:max-h-[800px]">
      {/* ─── LEFT — Academie & Cursuri ─── */}
      <Link
        href="/academie"
        className="relative overflow-hidden group cursor-pointer"
      >
        {/* Image background with flash-cut */}
        {LEFT_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-100 ${
              i === leftIdx && !fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Emma Nails Academy"
              fill
              className="object-cover object-top"
              sizes="50vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Gradient overlay — stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        {/* Desktop content */}
        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">
            Cursuri Acreditate
          </span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">
            Emma Nails<br />Academy
          </h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">
            Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.
          </p>
          <div className="flex gap-5 mt-4">
            {[
              { num: "15+", label: "Ani" },
              { num: "500+", label: "Cursante" },
            ].map((s, i) => (
              <div key={i}>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Vezi Cursurile
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Mobile: just button */}
        <div className="relative z-10 h-full flex md:hidden items-end justify-center pb-6">
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">
            Cursuri
          </span>
        </div>
      </Link>

      {/* ─── RIGHT — Shop Produse ─── */}
      <Link
        href="/produse"
        className="relative overflow-hidden group cursor-pointer"
      >
        {/* Video background with flash-cut */}
        <video
          ref={rightRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          <source src={VIDEOS[rightIdx]} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        {/* Desktop content */}
        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">
            Magazin Online
          </span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">
            Produse<br />Profesionale
          </h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">
            PolyGel cu formulă originală și instrumente premium.
          </p>
          <div className="flex gap-5 mt-4">
            {[
              { num: "28", label: "Produse" },
              { num: "2", label: "Categorii" },
            ].map((s, i) => (
              <div key={i}>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Shop Acum
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Mobile: just button */}
        <div className="relative z-10 h-full flex md:hidden items-end justify-center pb-6">
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">
            Shop
          </span>
        </div>
      </Link>
    </section>
  );
}
