"use client";

interface HeartSwatchProps {
  color: string;
  size?: number;
  className?: string;
}

export function HeartSwatch({ color, size = 22, className = "" }: HeartSwatchProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Nuanță: ${color}`}
    >
      {/* Heart shape */}
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="0.5"
      />
      {/* Subtle shine highlight */}
      <ellipse
        cx="8.5"
        cy="7"
        rx="2.5"
        ry="2"
        fill="rgba(255,255,255,0.3)"
        transform="rotate(-20 8.5 7)"
      />
    </svg>
  );
}
