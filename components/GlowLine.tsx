"use client";

import { useEffect, useRef } from "react";

export function GlowLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("gl-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref={ref}
        className="gl-hidden relative h-[1px] w-full overflow-hidden"
        style={{
          transform: "scaleX(0)",
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          background: "linear-gradient(90deg, transparent, rgba(212,83,126,0.3), rgba(212,83,126,0.6), rgba(212,83,126,0.3), transparent)",
        }}
      >
        <div
          className="absolute top-0 h-full w-[60%]"
          style={{
            background: "linear-gradient(90deg, transparent, #D4537E, transparent)",
            animation: "glowSweep 3s ease-in-out infinite",
            left: "-60%",
          }}
        />
      </div>
    </div>
  );
}
