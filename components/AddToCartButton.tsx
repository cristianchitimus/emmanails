"use client";

import { useCart } from "@/hooks/useCart";

interface AddToCartButtonProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice?: number | null;
    imageUrl?: string | null;
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
          imageUrl: product.imageUrl || undefined,
        });
      }}
      className={`bg-pink text-white font-body font-semibold uppercase tracking-[0.2em] rounded-full hover:bg-dark transition-colors ${sizeClasses[size]} ${className}`}
    >
      Adaugă în coș
    </button>
  );
}
