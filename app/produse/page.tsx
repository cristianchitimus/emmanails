import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse — Emma Nails",
  description: "PolyGel Emma Nails, instrumente profesionale de manichiură și pedichiură.",
};

export const revalidate = 60;

interface Props { searchParams: { categorie?: string } }

export default async function ProdusePage({ searchParams }: Props) {
  const category = searchParams.categorie;

  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });

  const categories = await prisma.product.groupBy({
    by: ["category"],
    _count: { id: true },
  });

  return (
    <>
      {/* Header */}
      <section className="bg-white pt-8 pb-6 md:pt-12 md:pb-8 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="font-body text-[11px] text-dark/40 uppercase tracking-wider mb-4">
            <span>Acasă</span> <span className="mx-1.5">/</span> <span className="text-dark">Produse</span>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-dark">
            Produse
          </h1>
          <p className="font-body text-sm text-dark/50 mt-2">
            {products.length} produse
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories.map((c) => ({
              value: c.category,
              label: c.category === "polygel" ? "PolyGel" : "Instrumente",
              count: c._count.id,
            }))}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-base text-dark/40">Nu s-au găsit produse în această categorie.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
