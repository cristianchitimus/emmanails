import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// These are the REAL 28 product slugs from emmanails.ro
const REAL_PRODUCT_SLUGS = [
  "chiureta-dubla-dietter-baumann",
  "cleste-profesional-dietter-baumann",
  "foarfece-exclusive-staleks",
  "foarfece-maniprof-110mm",
  "foarfece-maniprof-97mm",
  "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi",
  "microforfecuta-tweezer-staleks-pro-expert",
  "oferta-cleste-foarfece-chiureta",
  "penseta-pedichiura-staleks-pro-podo",
  "polygel-emma-nails",
  "polygel-verde",
  "polygel-emma-nails-color-01-60g",
  "polygel-emma-nails-color-06-30g",
  "polygel-emma-nails-color-08-30g",
  "polygel-emma-nails-color-26-30g",
  "polygel-emma-nails-color-27-60g",
  "polygel-emma-nails-color-29-30g",
  "polygel-emma-nails-color-30-30g",
  "polygel-emma-nails-color-32-30g",
  "polygel-emma-nails-color-34-30g",
  "polygel-emma-nails-color-44-30g",
  "polygel-emma-nails-color-45-30g",
  "polygel-emma-nails-color-kd2-30g",
  "polygel-emma-nails-color-kd3-30g",
  "reflective-polygel-emma-nails-color-09-30g",
  "reflective-polygel-emma-nails-color-19-30g",
  "reflective-polygel-emma-nails-color-24-30g",
  "reflective-polygel-emma-nails-color-25-30g",
];

async function main() {
  console.log("🧹 Cleaning up database...\n");

  // Find fake products (not in the real list)
  const allProducts = await prisma.product.findMany({ select: { id: true, slug: true, name: true } });
  const fakeProducts = allProducts.filter(p => !REAL_PRODUCT_SLUGS.includes(p.slug));

  console.log(`Found ${allProducts.length} total products, ${fakeProducts.length} are not on emmanails.ro\n`);

  if (fakeProducts.length > 0) {
    console.log("Removing fake products:");
    for (const p of fakeProducts) {
      console.log(`  ❌ ${p.slug} (${p.name})`);
    }

    // Delete order items referencing fake products first
    const fakeIds = fakeProducts.map(p => p.id);
    await prisma.orderItem.deleteMany({ where: { productId: { in: fakeIds } } });
    await prisma.product.deleteMany({ where: { id: { in: fakeIds } } });

    console.log(`\n✅ Deleted ${fakeProducts.length} fake products`);
  }

  // Verify final count
  const remaining = await prisma.product.count();
  const polygelCount = await prisma.product.count({ where: { category: "polygel" } });
  const instrumenteCount = await prisma.product.count({ where: { category: "instrumente" } });

  console.log(`\n📊 Final: ${remaining} products (${polygelCount} polygel + ${instrumenteCount} instrumente)`);
  console.log("🎉 Cleanup complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
