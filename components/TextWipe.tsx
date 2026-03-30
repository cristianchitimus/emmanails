"use client";

import { useEffect, useRef, ReactNode } from "react";

interface TextWipeProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function TextWipe({ children, delay = 0, className = "" }: TextWipeProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("tw-visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`inline-block tw-hidden ${className}`}
      style={{
        clipPath: "inset(0 100% 0 0)",
        transition: `clip-path 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}
