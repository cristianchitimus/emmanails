import { prisma } from "@/lib/db";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse",
  description: "Polygel Emma Nails, instrumente profesionale de manichiură și pedichiură.",
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

  const totalCount = categories.reduce((sum, c) => sum + c._count.id, 0);

  return (
    <>
      {/* Hero — light pink, Glamnetic style */}
      <section className="relative bg-gradient-to-br from-white via-pink-50/50 to-nude-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="section-label mb-3">Magazin</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-dark leading-tight">
            Produse <span className="italic text-pink">profesionale</span>
          </h1>
          <p className="font-body text-base md:text-lg text-dark-400 mt-4 max-w-xl">
            Polygel Emma Nails cu formulă originală și instrumente premium pentru manichiură profesională.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories.map((c) => ({ slug: c.category, count: c._count.id }))}
            totalCount={totalCount}
            activeCategory={category}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-xl text-dark-400">Nu s-au găsit produse în această categorie.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
