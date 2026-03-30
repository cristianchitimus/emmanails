import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "./AddToCartButton";

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
  };
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const isOnSale = product.salePrice && product.salePrice < product.price;

  return (
    <Link
      href={`/produse/${product.slug}`}
      className="group block card-hover h-full"
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-nude-100 ${
          featured ? "aspect-[4/5]" : "aspect-square"
        } rounded-sm`}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover img-zoom"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-nude-100 to-nude-300">
            {product.category === "polygel" ? (
              <div className="w-16 h-24 rounded-t-full bg-white/30" />
            ) : (
              <svg className="w-12 h-12 text-dark-200/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            )}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="font-body text-[10px] font-medium uppercase tracking-widest bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-sm">
            {product.category}
          </span>
          {product.size && (
            <span className="font-body text-[10px] font-medium text-dark-400 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-sm">
              {product.size}
            </span>
          )}
        </div>

        {isOnSale && (
          <div className="absolute top-3 right-3 z-10">
            <span className="font-body text-[10px] font-bold uppercase tracking-wider bg-pink text-white px-2.5 py-1 rounded-sm">
              Ofertă
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-500 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1.5">
        <h3 className="font-body text-sm font-medium text-dark leading-tight group-hover:text-pink transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {isOnSale ? (
            <>
              <span className="font-body text-sm font-semibold text-pink">{formatPrice(product.salePrice!)}</span>
              <span className="font-body text-xs text-dark-300 line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="font-body text-sm font-semibold text-dark">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
