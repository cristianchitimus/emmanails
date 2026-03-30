"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCarousel } from "@/components/ProductCarousel";

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

interface ProductTabsProps {
  allProducts: Product[];
  featuredProducts: Product[];
}

export function ProductTabs({ allProducts, featuredProducts }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"bestsellers" | "noutati" | "polygel" | "instrumente">("bestsellers");

  const tabs = [
    { id: "bestsellers" as const, label: "Bestsellers" },
    { id: "noutati" as const, label: "Noutăți" },
    { id: "polygel" as const, label: "PolyGel" },
    { id: "instrumente" as const, label: "Instrumente" },
  ];

  const getProducts = () => {
    switch (activeTab) {
      case "bestsellers":
        return featuredProducts;
      case "noutati":
        return [...allProducts].reverse().slice(0, 10);
      case "polygel":
        return allProducts.filter((p) => p.category === "polygel").slice(0, 10);
      case "instrumente":
        return allProducts.filter((p) => p.category === "instrumente").slice(0, 10);
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab headers */}
        <div className="flex items-center justify-between mb-8 md:mb-10 border-b border-neutral-200">
          <div className="flex gap-6 md:gap-10 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-display text-lg md:text-xl font-semibold pb-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-dark border-dark"
                    : "text-neutral-300 border-transparent hover:text-neutral-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link
            href="/produse"
            className="hidden md:inline-block font-body text-xs font-semibold uppercase tracking-wider text-dark border-b border-dark pb-0.5 hover:text-pink hover:border-pink transition-colors"
          >
            Vezi Toate
          </Link>
        </div>

        {/* Carousel */}
        <ProductCarousel products={getProducts()} />

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/produse"
            className="inline-block font-body text-xs font-semibold uppercase tracking-wider text-dark border-b border-dark pb-0.5"
          >
            Vezi Toate
          </Link>
        </div>
      </div>
    </section>
  );
}
