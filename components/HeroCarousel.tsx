"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SLIDES = [
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/12/WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {SLIDES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={`Emma Nails lucrare ${i + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-pink w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
