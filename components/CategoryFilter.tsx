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
    // Clear subcategory when changing main category
    if (paramName === "categorie") {
      params.delete("sub");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter("")}
        className={`font-body text-[11px] font-semibold uppercase px-4 py-2 rounded border transition-colors ${
          !active
            ? "bg-dark border-dark text-white"
            : "bg-white border-neutral-200 text-neutral-600 hover:border-dark"
        }`}
        style={{ letterSpacing: "0.12em" }}
      >
        Toate
      </button>
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleFilter(cat.value)}
          className={`font-body text-[11px] font-semibold uppercase px-4 py-2 rounded border transition-colors ${
            active === cat.value
              ? "bg-dark border-dark text-white"
              : "bg-white border-neutral-200 text-neutral-600 hover:border-dark"
          }`}
          style={{ letterSpacing: "0.12em" }}
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
