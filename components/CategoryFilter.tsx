"use client";

import Link from "next/link";

interface CategoryFilterProps {
  categories: { slug: string; count: number }[];
  totalCount: number;
  activeCategory?: string;
}

const categoryLabels: Record<string, string> = {
  polygel: "PolyGel",
  instrumente: "Instrumente",
};

export function CategoryFilter({
  categories,
  totalCount,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/produse"
        className={`font-body text-[12px] font-medium uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
          !activeCategory
            ? "bg-pink text-white border-pink"
            : "bg-transparent text-dark-400 border-dark-200 hover:border-pink hover:text-pink"
        }`}
      >
        Toate ({totalCount})
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/produse?categorie=${cat.slug}`}
          className={`font-body text-[12px] font-medium uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
            activeCategory === cat.slug
              ? "bg-pink text-white border-pink"
              : "bg-transparent text-dark-400 border-dark-200 hover:border-pink hover:text-pink"
          }`}
        >
          {categoryLabels[cat.slug] || cat.slug} ({cat.count})
        </Link>
      ))}
    </div>
  );
}
