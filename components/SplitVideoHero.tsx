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

/* Swipe gallery — current image always visible underneath, next slides in on top.
   No white flash because the outgoing image stays until the incoming one fully covers it. */
function SwipeGallery({ images, interval = 2800, direction = "left" }: { images: string[]; interval?: number; direction?: "left" | "right" }) {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState(-1);
  const [sliding, setSliding] = useState(false);

  const advance = useCallback(() => {
    const next = direction === "left"
      ? (current + 1) % images.length
      : (current - 1 + images.length) % images.length;
    setIncoming(next);
    // Trigger slide after a tick so the element is positioned off-screen first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSliding(true));
    });
  }, [current, images.length, direction]);

  useEffect(() => {
    const id = setInterval(advance, interval);
    return () => clearInterval(id);
  }, [advance, interval]);

  // When slide finishes, promote incoming to current
  useEffect(() => {
    if (!sliding) return;
    const t = setTimeout(() => {
      setCurrent(incoming);
      setIncoming(-1);
      setSliding(false);
    }, 550);
    return () => clearTimeout(t);
  }, [sliding, incoming]);

  const offset = direction === "left" ? "100%" : "-100%";

  return (
    <div className="absolute inset-0 overflow-hidden bg-dark">
      {/* Current image — always visible as the base layer */}
      <div className="absolute inset-0 z-[1]">
        <Image
          src={images[current]}
          alt=""
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>

      {/* Incoming image — slides in from left or right ON TOP of current */}
      {incoming !== -1 && (
        <div
          className="absolute inset-0 z-[2] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          style={{
            transform: sliding ? "translate3d(0,0,0)" : `translate3d(${offset},0,0)`,
          }}
        >
          <Image
            src={images[incoming]}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      )}
    </div>
  );
}

export function SplitVideoHero() {
  return (
    <section className="w-full grid grid-cols-2 h-[50vh] md:h-[85vh] lg:h-[90vh] md:max-h-[800px]">
      {/* LEFT — Shop Produse */}
      <Link href="/produse" className="relative overflow-hidden group cursor-pointer">
        <SwipeGallery images={PRODUCT_IMAGES} interval={2500} direction="left" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Magazin Online</span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">Produse<br />Profesionale</h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">Geluri, baze, topuri și instrumente — dezvoltate din 15+ ani de experiență în salon.</p>
          <div className="flex gap-5 mt-4">
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">110+</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Produse</p>
            </div>
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">7</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Categorii</p>
            </div>
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
        <SwipeGallery images={ACADEMY_IMAGES} interval={3200} direction="right" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-dark/70 via-dark/20 to-transparent group-hover:from-dark/80 transition-colors duration-500" />

        <div className="relative z-10 h-full hidden md:flex flex-col items-start justify-end p-8 lg:p-14">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Cursuri Acreditate</span>
          <h2 className="font-display text-3xl lg:text-5xl xl:text-6xl font-medium text-white leading-[1.05]">Emma Nails<br />Academy</h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-xs">Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.</p>
          <div className="flex gap-5 mt-4">
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">15+</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Ani</p>
            </div>
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">500+</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Cursante</p>
            </div>
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
