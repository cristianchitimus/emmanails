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
    <div className="group relative">
      <Link href={`/produse/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden mb-3">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="font-display text-3xl font-bold text-pink/20">EN</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasDiscount && (
              <span className="bg-pink text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Reducere
              </span>
            )}
            {!product.inStock && (
              <span className="bg-dark text-white font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Stoc epuizat
              </span>
            )}
          </div>

          {/* Quick add button */}
          {product.inStock && (
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
              className="absolute bottom-3 left-3 right-3 bg-dark text-white font-body text-[11px] font-semibold uppercase tracking-[0.15em] py-2.5 rounded-full text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink"
            >
              Adaugă în coș
            </button>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="font-body text-xs text-neutral-400 uppercase tracking-wider mb-0.5">
            {product.category === "polygel" ? "PolyGel" : "Instrumente"}
            {product.size && ` · ${product.size}`}
          </p>
          <h3 className="font-body text-sm font-medium text-dark leading-snug line-clamp-2 group-hover:text-pink transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-display text-base font-bold text-pink">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-neutral-400 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
