"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

interface PortfolioMarqueeProps {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}

export function PortfolioMarquee({ images, direction = "left", speed = 35 }: PortfolioMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const totalWidth = el.scrollWidth / 2; // We duplicate so half = one set

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

    // Start right-scrolling from -totalWidth so it moves toward 0
    if (direction === "right") pos = -totalWidth;

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed]);

  // Duplicate images for seamless loop
  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div ref={scrollRef} className="flex gap-3 md:gap-4 will-change-transform" style={{ width: "max-content" }}>
        {doubled.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-[260px] h-[320px] md:w-[320px] md:h-[400px] rounded-xl overflow-hidden group"
          >
            <Image
              src={img}
              alt={`Portfolio ${(i % images.length) + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
