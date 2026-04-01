"use client";

interface HeartSwatchProps {
  color: string;
  size?: number;
  glitter?: boolean;
  className?: string;
}

export function HeartSwatch({ color, size = 22, glitter = false, className = "" }: HeartSwatchProps) {
  const id = `hs-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`Nuanță: ${color}${glitter ? " (glitter)" : ""}`}
    >
      <defs>
        {glitter && (
          <clipPath id={`clip-${id}`}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </clipPath>
        )}
      </defs>

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

      {/* Glitter sparkle dots — clipped inside heart */}
      {glitter && (
        <g clipPath={`url(#clip-${id})`}>
          {/* White sparkle dots */}
          <circle cx="6" cy="6" r="0.7" fill="rgba(255,255,255,0.9)" />
          <circle cx="10" cy="5" r="0.5" fill="rgba(255,255,255,0.85)" />
          <circle cx="15" cy="7" r="0.6" fill="rgba(255,255,255,0.9)" />
          <circle cx="18" cy="6" r="0.45" fill="rgba(255,255,255,0.8)" />
          <circle cx="8" cy="10" r="0.55" fill="rgba(255,255,255,0.85)" />
          <circle cx="13" cy="9" r="0.7" fill="rgba(255,255,255,0.9)" />
          <circle cx="17" cy="10" r="0.5" fill="rgba(255,255,255,0.8)" />
          <circle cx="5" cy="13" r="0.45" fill="rgba(255,255,255,0.75)" />
          <circle cx="11" cy="12" r="0.6" fill="rgba(255,255,255,0.85)" />
          <circle cx="15" cy="14" r="0.5" fill="rgba(255,255,255,0.8)" />
          <circle cx="9" cy="15" r="0.4" fill="rgba(255,255,255,0.7)" />
          <circle cx="13" cy="16" r="0.45" fill="rgba(255,255,255,0.75)" />
          {/* Gold/warm sparkle accents */}
          <circle cx="7" cy="8" r="0.4" fill="rgba(255,215,140,0.7)" />
          <circle cx="14" cy="6" r="0.35" fill="rgba(255,215,140,0.6)" />
          <circle cx="16" cy="12" r="0.4" fill="rgba(255,215,140,0.65)" />
          <circle cx="10" cy="13" r="0.35" fill="rgba(255,215,140,0.6)" />
          <circle cx="12" cy="7" r="0.3" fill="rgba(255,230,180,0.7)" />
          {/* Extra shimmer line */}
          <line x1="7" y1="5" x2="8.5" y2="6.5" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3" />
          <line x1="14" y1="8" x2="15.5" y2="9" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
        </g>
      )}
    </svg>
  );
}

// Helper: detect if a product should show glitter heart
export function isGlitterProduct(product: {
  subcategory?: string | null;
  name?: string;
}): boolean {
  const sub = product.subcategory || "";
  const name = (product.name || "").toLowerCase();
  
  // Glitter subcategories
  if (sub === "glitter-rubber-base") return true;
  if (sub === "glitter-vibe-top") return true;
  
  // Glitter/shimmer product lines (by name)
  if (name.includes("metal bloom")) return true;
  if (name.includes("allè vibes") || name.includes("alle vibes")) return true;
  if (name.includes("cosmic chrome")) return true;
  if (name.includes("moon shimmer")) return true;
  if (name.includes("soul sisters")) return true;
  if (name.includes("pearl touch")) return true;
  if (name.includes("pink promise")) return true;
  if (name.includes("lilac anne")) return true;
  
  return false;
}
