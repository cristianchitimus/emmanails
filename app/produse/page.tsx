import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produse",
  description: "Polygel Emma Nails, instrumente profesionale de manichiura si pedichiura.",
};

export const revalidate = 60;

interface Props {
  searchParams: { categorie?: string };
}

const categoryLabels: Record<string, string> = {
  polygel: "Polygel",
  "baza-rubber": "Baza Rubber",
  "geluri-uv": "Geluri UV",
  "top-coat": "Top Coat",
  "pile-buffere": "Pile & Buffere",
  "produse-pedichiura": "Pedichiura",
  "produsele-amme": "Produsele Amme",
  instrumente: "Instrumente",
};

export default async function ProdusePage({ searchParams }: Props) {
  const category = searchParams.categorie;

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
    prisma.product.groupBy({
      by: ["category"],
      _count: { id: true },
    }),
  ]);

  const totalCount = categories.reduce((sum, c) => sum + c._count.id, 0);

  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-10 md:py-14">
        <div className="shop-container">
          <p className="section-label mb-3">Magazin</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="shop-title">Produse profesionale</h1>
              <p className="shop-copy mt-3 max-w-2xl">
                Polygel, baze, topuri, geluri UV si instrumente pentru tehnicieni si saloane.
              </p>
            </div>
            <p className="font-body text-sm text-dark-400">{totalCount} produse</p>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <CategoryFilter
            categories={categories.map((c) => ({
              value: c.category,
              label: categoryLabels[c.category] || c.category,
              count: c._count.id,
            }))}
          />

          <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 lg:gap-x-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-body text-base text-dark-400">
                Nu s-au gasit produse in aceasta categorie.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
