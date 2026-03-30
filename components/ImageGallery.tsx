"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const allImages = images.length > 0 ? images : [];

  if (allImages.length === 0) {
    return (
      <div className="aspect-square rounded-sm overflow-hidden bg-neutral-100 flex items-center justify-center">
        <span className="font-display text-4xl font-bold text-neutral-200">EN</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-sm overflow-hidden bg-neutral-50">
        <Image
          src={allImages[active]}
          alt={`${alt} — ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                i === active ? "border-pink" : "border-transparent hover:border-neutral-300"
              }`}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
