"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface Slide {
  image: string;
  badge?: string;
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  align?: "left" | "center";
}

const SLIDES: Slide[] = [
  {
    image: "https://emmanails.ro/wp-content/uploads/2025/05/1.jpg",
    badge: "BESTSELLER",
    title: "PolyGel\nEmma Nails",
    subtitle: "Formulă originală cu auto-nivelare\nexcelentă și durabilitate de salon",
    cta: "Descoperă",
    href: "/produse?categorie=polygel",
    align: "left",
  },
  {
    image: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
    badge: "ACADEMIE",
    title: "Cursuri\nProfesionale",
    subtitle: "Diplomă acreditată și practică pe model\nPeste 500 de cursante formate",
    cta: "Vezi cursurile",
    href: "/academie",
    align: "left",
  },
  {
    image: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg",
    badge: "INSTRUMENTE",
    title: "Instrumente\nPremium",
    subtitle: "Dietter Baumann, Staleks, Maniprof\nOțel chirurgical de cea mai înaltă calitate",
    cta: "Shop instrumente",
    href: "/produse?categorie=instrumente",
    align: "left",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[65vh] md:h-[75vh] lg:h-[85vh] max-h-[700px]">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
          <div className="max-w-lg">
            {slide.badge && (
              <span className="inline-block bg-pink text-white font-body text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-sm mb-5">
                {slide.badge}
              </span>
            )}
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-dark leading-[1.1] whitespace-pre-line">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="font-body text-sm md:text-base text-dark/60 mt-4 leading-relaxed whitespace-pre-line">
                {slide.subtitle}
              </p>
            )}
            <Link
              href={slide.href}
              className="inline-block mt-6 bg-pink text-white font-body text-xs font-semibold uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm hover:bg-dark transition-colors"
            >
              {slide.cta}
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
        >
          <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
        >
          <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-2.5 bg-dark" : "w-2.5 h-2.5 bg-dark/20 hover:bg-dark/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
