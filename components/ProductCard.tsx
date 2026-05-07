"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { HeartSwatch } from "./HeartSwatch";
import { isGlitterProduct } from "@/lib/glitter";

const CATEGORY_LABELS: Record<string, string> = {
  polygel: "Polygel",
  instrumente: "Instrumente",
  "baza-rubber": "Baza Rubber",
  "geluri-uv": "Geluri UV",
  "top-coat": "Top Coat",
  "pile-buffere": "Pile & Buffere",
  "produse-pedichiura": "Pedichiura",
  "produsele-amme": "Produsele Amme",
};

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    salePrice?: number | null;
    category: string;
    subcategory?: string | null;
    size?: string | null;
    colorHex?: string | null;
    imageUrl?: string | null;
    images?: string[] | null;
    inStock: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const price = product.salePrice ?? product.price;
  const hasDiscount = Boolean(product.salePrice && product.salePrice < product.price);
  const primaryImg = product.images?.[0] || product.imageUrl || null;
  const hoverImg = product.images?.[1] || null;
  const glitter = isGlitterProduct(product);

  const addToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price,
      imageUrl: product.imageUrl || undefined,
    });
  };

  return (
    <article className="motion-card group relative">
      <Link href={`/produse/${product.slug}`} className="block">
        <div className="premium-product-frame relative aspect-square overflow-hidden rounded">
          {primaryImg ? (
            <>
              <Image
                src={primaryImg}
                alt={product.name}
                fill
                className={`premium-product-image object-contain transition duration-500 ${hoverImg ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {hoverImg && (
                <Image
                  src={hoverImg}
                  alt={`${product.name} imagine secundara`}
                  fill
                  className="premium-product-image object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-white">
              <span className="font-display text-3xl font-bold text-neutral-200">EN</span>
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {hasDiscount && (
              <span className="rounded bg-dark px-2 py-1 font-body text-[10px] font-semibold uppercase text-white" style={{ letterSpacing: "0.1em" }}>
                Reducere
              </span>
            )}
            {!product.inStock && (
              <span className="rounded bg-white px-2 py-1 font-body text-[10px] font-semibold uppercase text-dark shadow-sm" style={{ letterSpacing: "0.1em" }}>
                Stoc epuizat
              </span>
            )}
          </div>

          {product.colorHex && (
            <div className="absolute right-3 top-3">
              <HeartSwatch color={product.colorHex} size={24} glitter={glitter} />
            </div>
          )}
        </div>

        <div className="pt-3">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-body text-[11px] uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>
              {CATEGORY_LABELS[product.category] || product.category}
            </span>
            {product.size && <span className="text-[11px] text-dark-300">/ {product.size}</span>}
          </div>
          <h3 className="min-h-[40px] font-body text-sm font-medium leading-snug text-dark transition-colors group-hover:text-pink line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="font-body text-sm font-semibold text-dark">
              {formatPrice(price)}
            </span>
            {hasDiscount && (
              <span className="font-body text-xs text-dark-300 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {product.inStock ? (
        <button
          onClick={addToCart}
          className="premium-product-button mt-3 w-full rounded px-3 py-2.5 font-body text-[11px] font-semibold uppercase text-dark"
          style={{ letterSpacing: "0.14em" }}
        >
          Adauga in cos
        </button>
      ) : (
        <div className="mt-3 w-full rounded border border-neutral-200 px-3 py-2.5 text-center font-body text-[11px] font-semibold uppercase text-dark-300" style={{ letterSpacing: "0.14em" }}>
          Indisponibil
        </div>
      )}
    </article>
  );
}
