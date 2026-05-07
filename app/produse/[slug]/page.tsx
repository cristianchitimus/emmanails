import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ImageGallery } from "@/components/ImageGallery";
import { HeartSwatch } from "@/components/HeartSwatch";
import { ProductCard } from "@/components/ProductCard";
import { isGlitterProduct } from "@/lib/glitter";
import type { Metadata } from "next";

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

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Produs negasit" };
  return {
    title: product.name,
    description: product.description || `${product.name} - Emma Nails`,
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  const isOnSale = Boolean(product.salePrice && product.salePrice < product.price);
  const price = product.salePrice ?? product.price;
  const catLabel = CATEGORY_LABELS[product.category] || product.category;
  const glitter = isGlitterProduct(product);

  return (
    <>
      <section className="shop-section">
        <div className="shop-container">
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-body text-xs uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>
            <Link href="/produse" className="hover:text-pink transition-colors">Produse</Link>
            <span>/</span>
            <Link href={`/produse?categorie=${product.category}`} className="hover:text-pink transition-colors">{catLabel}</Link>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <ImageGallery images={product.images || (product.imageUrl ? [product.imageUrl] : [])} alt={product.name} variant="product" />

            <div className="lg:pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="section-label">{catLabel}</span>
                {isOnSale && (
                  <span className="rounded bg-dark px-2 py-1 font-body text-[10px] font-semibold uppercase text-white" style={{ letterSpacing: "0.12em" }}>
                    Oferta
                  </span>
                )}
                {product.colorHex && <HeartSwatch color={product.colorHex} size={22} glitter={glitter} />}
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-dark md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-body text-2xl font-semibold text-dark">{formatPrice(price)}</span>
                {isOnSale && (
                  <span className="font-body text-base text-dark-300 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="mt-6 whitespace-pre-line font-body text-base leading-relaxed text-dark-500">
                  {product.description}
                </p>
              )}

              {product.colorHex && (
                <div className="mt-7 flex items-center gap-3">
                  <HeartSwatch color={product.colorHex} size={34} glitter={glitter} />
                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>
                      Nuanta
                    </p>
                    <div className="mt-1 h-5 w-24 rounded border border-black/5" style={{ backgroundColor: product.colorHex }} />
                  </div>
                </div>
              )}

              <div className="mt-8 divide-y divide-neutral-100 border-y border-neutral-100">
                {product.size && (
                  <div className="flex items-center justify-between py-4">
                    <span className="font-body text-sm text-dark-400">Gramaj</span>
                    <span className="font-body text-sm font-medium text-dark">{product.size}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-4">
                  <span className="font-body text-sm text-dark-400">Categorie</span>
                  <span className="font-body text-sm font-medium text-dark">{catLabel}</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="font-body text-sm text-dark-400">Disponibilitate</span>
                  <span className={`font-body text-sm font-medium ${product.inStock ? "text-emerald-600" : "text-red-500"}`}>
                    {product.inStock ? "In stoc" : "Stoc epuizat"}
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <AddToCartButton product={product} size="lg" className="w-full" />
                <a
                  href={`https://wa.me/40747906311?text=${encodeURIComponent(`Buna! As dori informatii despre: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full"
                >
                  Intreaba pe WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="shop-section-muted">
          <div className="shop-container">
            <div className="shop-heading-row">
              <div>
                <p className="section-label mb-3">Recomandari</p>
                <h2 className="shop-title">Produse similare</h2>
              </div>
              <Link href={`/produse?categorie=${product.category}`} className="shop-link">
                Vezi categoria
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 lg:gap-x-7">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
