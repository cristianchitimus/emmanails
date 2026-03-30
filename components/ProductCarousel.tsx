"use client";

import { useRef, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice?: number | null;
  category: string;
  subcategory?: string | null;
  size?: string | null;
  imageUrl?: string | null;
  inStock: boolean;
  featured: boolean;
}

export function ProductCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.clientWidth || 300;
    el.scrollBy({ left: dir === "left" ? -cardWidth * 2 : cardWidth * 2, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 md:left-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 md:right-0 top-1/3 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <svg className="w-4 h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[220px] md:w-[260px] lg:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
