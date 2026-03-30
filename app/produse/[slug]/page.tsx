import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ImageGallery } from "@/components/ImageGallery";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Produs negăsit" };
  return { title: product.name, description: product.description || `${product.name} — Emma Nails` };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    take: 4,
  });

  const isOnSale = product.salePrice && product.salePrice < product.price;

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 font-body text-xs text-dark-400 uppercase tracking-wider">
            <Link href="/produse" className="hover:text-pink transition-colors">Produse</Link>
            <span>/</span>
            <Link href={`/produse?categorie=${product.category}`} className="hover:text-pink transition-colors capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-dark truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product image gallery */}
            <div>
              <ImageGallery images={product.images || (product.imageUrl ? [product.imageUrl] : [])} alt={product.name} />
              {isOnSale && (
                <span className="inline-block mt-3 font-body text-xs font-bold uppercase tracking-wider bg-pink text-white px-3 py-1.5 rounded-sm">Ofertă</span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <span className="section-label">{product.category === "polygel" ? "PolyGel" : "Instrumente"}</span>
                <h1 className="font-display text-3xl md:text-4xl font-medium mt-2 leading-tight">{product.name}</h1>
              </div>

              <div className="flex items-center gap-3">
                {isOnSale ? (
                  <>
                    <span className="font-display text-3xl font-semibold text-pink">{formatPrice(product.salePrice!)}</span>
                    <span className="font-body text-lg text-dark-300 line-through">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="font-display text-3xl font-semibold text-dark">{formatPrice(product.price)}</span>
                )}
              </div>

              {product.description && (
                <p className="font-body text-base text-dark-500 leading-relaxed">{product.description}</p>
              )}

              <div className="border-t border-b border-dark-100 py-4 space-y-3">
                {product.size && (
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-dark-400">Gramaj</span>
                    <span className="font-body text-sm font-medium">{product.size}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-dark-400">Categorie</span>
                  <span className="font-body text-sm font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-dark-400">Disponibilitate</span>
                  <span className={`font-body text-sm font-medium ${product.inStock ? "text-emerald-600" : "text-red-500"}`}>
                    {product.inStock ? "În stoc" : "Stoc epuizat"}
                  </span>
                </div>
              </div>

              <AddToCartButton product={product} size="lg" className="w-full" />

              <a
                href={`https://wa.me/40747906311?text=${encodeURIComponent(`Bună! Aș dori informații despre: ${product.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-secondary w-full text-center"
              >
                Întreabă pe WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 md:py-16 border-t border-dark-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-medium mb-8">Produse <span className="italic text-pink">similare</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/produse/${p.slug}`} className="group block card-hover">
                  <div className="aspect-square rounded-sm relative overflow-hidden bg-nude-100">
                    {p.imageUrl ? (
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover img-zoom" sizes="(max-width: 768px) 50vw, 25vw" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-nude-100 to-nude-300">
                        <div className="w-10 h-16 rounded-t-full bg-white/30" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-body text-sm font-medium mt-3 group-hover:text-pink transition-colors line-clamp-2">{p.name}</h3>
                  <p className="font-body text-sm font-semibold text-dark mt-1">{formatPrice(p.salePrice ?? p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
