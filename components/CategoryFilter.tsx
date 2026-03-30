"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: { value: string; label: string; count?: number }[];
  paramName?: string;
}

export function CategoryFilter({ categories, paramName = "categorie" }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get(paramName) || "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    if (paramName === "categorie") params.delete("sub");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter("")}
        className={`font-body text-xs font-semibold uppercase tracking-wider px-5 py-2 border transition-colors rounded-sm ${
          !active
            ? "bg-dark text-white border-dark"
            : "bg-white text-dark/60 border-neutral-200 hover:border-dark hover:text-dark"
        }`}
      >
        Toate
      </button>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`font-body text-xs font-semibold uppercase tracking-wider px-5 py-2 border transition-colors rounded-sm ${
            active === cat.value
              ? "bg-pink text-white border-pink"
              : "bg-white text-dark/60 border-neutral-200 hover:border-dark hover:text-dark"
          }`}
        >
          {cat.label}
          {cat.count !== undefined && (
            <span className="ml-1 opacity-60">({cat.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
