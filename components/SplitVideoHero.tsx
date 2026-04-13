"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";

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

function HeroMarquee({ images, direction, speed = 25 }: { images: string[]; direction: "left" | "right"; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const totalWidth = el.scrollWidth / 2;

    if (direction === "right") pos = -totalWidth;

    const step = () => {
      if (direction === "left") {
        pos -= speed / 60;
        if (pos <= -totalWidth) pos += totalWidth;
      } else {
        pos += speed / 60;
        if (pos >= 0) pos -= totalWidth;
      }
      el.style.transform = `translate3d(${pos}px, 0, 0)`;
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed]);

  const doubled = [...images, ...images];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={ref} className="flex gap-2 will-change-transform h-full" style={{ width: "max-content" }}>
        {doubled.map((img, i) => (
          <div key={i} className="relative flex-shrink-0 h-full" style={{ width: "clamp(300px, 28vw, 480px)" }}>
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="480px"
              priority={i < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SplitVideoHero() {
  return (
    <section className="w-full flex flex-col">
      {/* TOP — Produse Profesionale (photos swipe LEFT) */}
      <Link href="/produse" className="relative overflow-hidden group cursor-pointer h-[45vh] md:h-[50vh] lg:h-[55vh]">
        <HeroMarquee images={PRODUCT_IMAGES} direction="left" speed={20} />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-dark/80 via-dark/40 to-dark/20 group-hover:from-dark/90 transition-all duration-500" />

        <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 md:p-10 lg:p-14 max-w-[1400px] mx-auto w-full">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Magazin Online</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">
            Produse<br />Profesionale
          </h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-sm">
            Geluri, baze, topuri și instrumente profesionale — dezvoltate din 15+ ani de experiență în salon.
          </p>
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
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Shop Acum
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </Link>

      {/* BOTTOM — Emma Nails Academy (photos swipe RIGHT) */}
      <Link href="/academie" className="relative overflow-hidden group cursor-pointer h-[45vh] md:h-[50vh] lg:h-[55vh]">
        <HeroMarquee images={ACADEMY_IMAGES} direction="right" speed={18} />
        <div className="absolute inset-0 z-[2] bg-gradient-to-l from-dark/80 via-dark/40 to-dark/20 group-hover:from-dark/90 transition-all duration-500" />

        <div className="relative z-10 h-full flex flex-col items-end justify-end p-6 md:p-10 lg:p-14 max-w-[1400px] mx-auto w-full text-right">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-2">Cursuri Acreditate</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-[1.05]">
            Emma Nails<br />Academy
          </h2>
          <p className="font-body text-sm text-white/60 leading-relaxed mt-3 max-w-sm">
            Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.
          </p>
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
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
              Vezi Cursurile
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
