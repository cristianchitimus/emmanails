"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice?: number | null;
    category: string;
    size?: string | null;
    imageUrl?: string | null;
    inStock: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const price = product.salePrice ?? product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div className="group relative bg-white">
      <Link href={`/produse/${product.slug}`} className="block">
        {/* Image — white background, clean */}
        <div className="relative aspect-square bg-white overflow-hidden border border-neutral-100 rounded-sm">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-neutral-50">
              <span className="font-display text-3xl font-bold text-neutral-200">EN</span>
            </div>
          )}

          {/* Badges */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-pink text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10">
              Reducere
            </span>
          )}
          {!product.inStock && (
            <span className="absolute top-3 left-3 bg-neutral-800 text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10">
              Stoc epuizat
            </span>
          )}

          {/* Quick add overlay */}
          {product.inStock && (
            <div className="absolute inset-x-0 bottom-0 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 p-3 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItem({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price,
                    imageUrl: product.imageUrl || undefined,
                  });
                }}
                className="w-full bg-dark text-white font-body text-[11px] font-semibold uppercase tracking-[0.15em] py-2.5 rounded-sm text-center hover:bg-pink transition-colors"
              >
                Adaugă în coș
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-3 pb-1">
          <h3 className="font-body text-sm text-dark leading-snug line-clamp-2 group-hover:text-pink transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            {hasDiscount ? (
              <>
                <span className="font-body text-sm font-bold text-pink">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="font-body text-xs text-neutral-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-body text-sm font-bold text-dark">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
