"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const VIDEOS = ["/hero-video-1.mp4", "/hero-video-2.mp4", "/hero-video-3.mp4"];

const RIGHT_IMAGES = [
  "/emma-cursuri.jpg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
];

export function SplitVideoHero() {
  const [rightIdx, setRightIdx] = useState(0);
  const [leftIdx, setLeftIdx] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Smooth cycle — just change index, CSS crossfade handles the rest
  useEffect(() => {
    const interval = setInterval(() => {
      setRightIdx((prev) => (prev + 1) % RIGHT_IMAGES.length);
      setLeftIdx((prev) => (prev + 1) % VIDEOS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Play active video, pause others
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === leftIdx) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [leftIdx]);

  return (
    <section className="w-full grid grid-cols-2 h-[50vh] md:h-[85vh] lg:h-[90vh] md:max-h-[800px]">
      {/* LEFT — Shop Produse (videos) */}
      <Link href="/produse" className="relative overflow-hidden group cursor-pointer">
        {/* All videos stacked — crossfade via opacity */}
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => { videoRefs.current[i] = el; }}
            autoPlay={i === 0}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              i === leftIdx ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}

        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Magazin Online</span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">Produse<br />Profesionale</h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">PolyGel cu formulă originală și instrumente premium.</p>
          <div className="flex gap-5 mt-4">
            {[{ num: "28", label: "Produse" }, { num: "2", label: "Categorii" }].map((s, i) => (
              <div key={i}>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Shop Acum
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>

        <div className="relative z-10 h-full flex md:hidden items-end justify-center pb-6">
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">Shop</span>
        </div>
      </Link>

      {/* RIGHT — Academie & Cursuri */}
      <Link href="/academie" className="relative overflow-hidden group cursor-pointer">
        {/* All images stacked — crossfade via opacity */}
        {RIGHT_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
              i === rightIdx ? "opacity-100 z-[1]" : "opacity-0 z-0"
            }`}
          >
            <Image src={src} alt="Emma Nails Academy" fill className="object-cover object-top" sizes="50vw" priority={i === 0} />
          </div>
        ))}

        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Cursuri Acreditate</span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">Emma Nails<br />Academy</h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.</p>
          <div className="flex gap-5 mt-4">
            {[{ num: "15+", label: "Ani" }, { num: "500+", label: "Cursante" }].map((s, i) => (
              <div key={i}>
                <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.num}</span>
                <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Vezi Cursurile
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>

        <div className="relative z-10 h-full flex md:hidden items-end justify-center pb-6">
          <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/30">Cursuri</span>
        </div>
      </Link>
    </section>
  );
}
