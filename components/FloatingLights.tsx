"use client";

import { useEffect, useRef } from "react";

interface FloatingLightsProps {
  color?: "pink" | "nude" | "white" | "mixed";
  count?: number;
  opacity?: number;
}

export function FloatingLights({ color = "pink", count = 6, opacity = 0.07 }: FloatingLightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing
    container.innerHTML = "";

    const colors: Record<string, string[]> = {
      pink: ["212,83,126", "232,120,160", "200,60,110"],
      nude: ["245,230,211", "240,210,190", "250,240,225"],
      white: ["255,255,255", "245,245,255", "255,250,245"],
      mixed: ["212,83,126", "245,230,211", "255,255,255", "232,120,160", "240,210,190"],
    };

    const palette = colors[color];

    for (let i = 0; i < count; i++) {
      const orb = document.createElement("div");
      const size = 80 + Math.random() * 200;
      const c = palette[Math.floor(Math.random() * palette.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 12 + Math.random() * 18;
      const delay = Math.random() * -20;

      orb.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: radial-gradient(circle, rgba(${c},${opacity}) 0%, rgba(${c},0) 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: floatOrb${i % 3} ${duration}s ease-in-out ${delay}s infinite;
        will-change: transform;
        filter: blur(${30 + Math.random() * 40}px);
      `;

      container.appendChild(orb);
    }
  }, [color, count, opacity]);

  return (
    <>
      <style jsx global>{`
        @keyframes floatOrb0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, -60px) scale(0.9); }
          75% { transform: translate(40px, -20px) scale(1.05); }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.15); }
          66% { transform: translate(30px, -30px) scale(0.85); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(20px, 40px) scale(0.95); }
          40% { transform: translate(-30px, 20px) scale(1.1); }
          60% { transform: translate(10px, -40px) scale(1); }
          80% { transform: translate(-20px, -10px) scale(1.08); }
        }
      `}</style>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}
