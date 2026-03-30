"use client";

import { useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    text: "PolyGel-ul Emma Nails este cel mai bun cu care am lucrat. Se modelează perfect și nu curge în lampă!",
    author: "Ana M.",
    role: "Nail technician",
    rating: 5,
  },
  {
    text: "Am terminat cursul de bază și pot spune că Emma este cel mai bun instructor. Totul clar, practic și cu multă răbdare.",
    author: "Cristina D.",
    role: "Absolventă curs Nivel 1",
    rating: 5,
  },
  {
    text: "Instrumentele sunt de calitate superioară. Folosesc chiureta și cleștele Dietter Baumann zilnic în salon.",
    author: "Raluca P.",
    role: "Salon owner, Iași",
    rating: 5,
  },
  {
    text: "Recomand cursul de pedichiură complexă! Am învățat tehnici pe care nu le găsești nicăieri altundeva.",
    author: "Elena S.",
    role: "Absolventă curs avansat",
    rating: 5,
  },
  {
    text: "Livrarea a fost super rapidă, produsele ambalate impecabil. Polygel-ul Color 29 e noul meu favorit!",
    author: "Maria T.",
    role: "Client fidel",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Show 3 at a time on desktop, 1 on mobile
  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(TESTIMONIALS[(current + i) % TESTIMONIALS.length]);
    }
    return items;
  };

  const stars = (count: number) =>
    "★".repeat(count) + "☆".repeat(5 - count);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Lăsăm clienții să vorbească pentru noi
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            <span className="text-amber-400 text-lg tracking-wider">★★★★★</span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {getVisible().map((t, i) => (
            <div
              key={`${current}-${i}`}
              className="text-center px-4 py-6"
            >
              <div className="text-amber-400 text-base tracking-wider mb-4">
                {stars(t.rating)}
              </div>
              <p className="font-body text-sm text-dark/70 leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5">
                <p className="font-body text-xs font-semibold text-dark">{t.author}</p>
                <p className="font-body text-[11px] text-dark/40 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2 bg-dark" : "w-2 h-2 bg-dark/15 hover:bg-dark/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
