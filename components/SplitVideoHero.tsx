"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const PRODUCT_IMAGES = [
  "/uploads/brand-Foto_002.jpg",
  "/uploads/brand-Foto_005.jpg",
  "/uploads/brand-Foto_012.jpg",
  "/uploads/brand-Foto_013.jpg",
  "/uploads/brand-Foto_015.jpg",
  "/uploads/brand-Foto_018.jpg",
  "/uploads/brand-Foto_024.jpg",
  "/uploads/brand-Foto_029.jpg",
  "/uploads/brand-Foto_030.jpg",
  "/uploads/brand-Foto_031.jpg",
  "/uploads/brand-Foto_041.jpg",
  "/uploads/brand-Foto_043.jpg",
];

const ACADEMY_IMAGES = [
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__4_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_33__2_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_34.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_33.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_32.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__3_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__2_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__1_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_34__2_.jpeg",
  "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_33__1_.jpeg",
];

function SwipeGallery({ images, interval = 2800, direction = "left" }: { images: string[]; interval?: number; direction?: "left" | "right" }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);

  const advance = useCallback(() => {
    setPrev(current);
    if (direction === "left") {
      setCurrent((c) => (c + 1) % images.length);
    } else {
      setCurrent((c) => (c - 1 + images.length) % images.length);
    }
  }, [current, images.length, direction]);

  useEffect(() => {
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval]);

  // Clear prev after transition
  useEffect(() => {
    if (prev === -1) return;
    const t = setTimeout(() => setPrev(-1), 700);
    return () => clearTimeout(t);
  }, [prev]);

  const slideDir = direction === "left" ? 1 : -1;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;

        return (
          <div
            key={i}
            className="absolute inset-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{
              transform: isActive
                ? "translate3d(0,0,0)"
                : `translate3d(${-100 * slideDir}%,0,0)`,
              zIndex: isActive ? 2 : 1,
            }}
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i < 2}
            />
          </div>
        );
      })}
    </div>
  );
}

export function SplitVideoHero() {
  return (
    <section className="w-full flex flex-col h-[calc(100vh-60px)] md:h-[calc(100vh-72px)]">
      {/* TOP — Produse Profesionale */}
      <Link href="/produse" className="relative overflow-hidden group cursor-pointer flex-1 min-h-0">
        <SwipeGallery images={PRODUCT_IMAGES} interval={2500} direction="left" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-dark/75 via-dark/30 to-transparent group-hover:from-dark/85 transition-all duration-500" />

        <div className="relative z-10 h-full flex flex-col items-start justify-end p-5 md:p-8 lg:p-12 max-w-[1400px] mx-auto w-full">
          <span className="font-body text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-1.5">Magazin Online</span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.05]">
            Produse Profesionale
          </h2>
          <p className="font-body text-xs md:text-sm text-white/60 leading-relaxed mt-2 max-w-sm hidden md:block">
            Geluri, baze, topuri și instrumente — dezvoltate din 15+ ani de experiență în salon.
          </p>
          <div className="flex gap-4 mt-2 md:mt-3">
            <div>
              <span className="font-display text-lg md:text-xl font-bold text-white">110+</span>
              <p className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40">Produse</p>
            </div>
            <div>
              <span className="font-display text-lg md:text-xl font-bold text-white">7</span>
              <p className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40">Categorii</p>
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <span className="inline-flex items-center gap-2 font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-5 py-2.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Shop Acum
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </Link>

      {/* BOTTOM — Emma Nails Academy */}
      <Link href="/academie" className="relative overflow-hidden group cursor-pointer flex-1 min-h-0">
        <SwipeGallery images={ACADEMY_IMAGES} interval={3200} direction="right" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-l from-dark/75 via-dark/30 to-transparent group-hover:from-dark/85 transition-all duration-500" />

        <div className="relative z-10 h-full flex flex-col items-end justify-end p-5 md:p-8 lg:p-12 max-w-[1400px] mx-auto w-full text-right">
          <span className="font-body text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-1.5">Cursuri Acreditate</span>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.05]">
            Emma Nails Academy
          </h2>
          <p className="font-body text-xs md:text-sm text-white/60 leading-relaxed mt-2 max-w-sm hidden md:block">
            Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.
          </p>
          <div className="flex gap-4 mt-2 md:mt-3">
            <div>
              <span className="font-display text-lg md:text-xl font-bold text-white">15+</span>
              <p className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40">Ani</p>
            </div>
            <div>
              <span className="font-display text-lg md:text-xl font-bold text-white">500+</span>
              <p className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40">Cursante</p>
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <span className="inline-flex items-center gap-2 font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-5 py-2.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Vezi Cursurile
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
