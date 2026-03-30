"use client";

import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice?: number | null;
    category: string;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function AddToCartButton({
  product,
  className = "",
  size = "md",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const sizeClasses = {
    sm: "px-4 py-2 text-[11px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-3.5 text-sm",
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.salePrice ?? product.price,
          category: product.category,
        });
      }}
      className={`inline-flex items-center justify-center bg-dark text-white font-body font-medium uppercase tracking-widest hover:bg-pink transition-colors duration-300 ${sizeClasses[size]} ${className}`}
    >
      Adaugă în coș
    </button>
  );
}
