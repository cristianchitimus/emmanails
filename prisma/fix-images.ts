import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Real image URLs scraped from emmanails.ro product pages (data-large_image)
const IMAGE_MAP: Record<string, string> = {
  "chiureta-dubla-dietter-baumann": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8288.jpg",
  "cleste-profesional-dietter-baumann": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg",
  "foarfece-exclusive-staleks": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8278.jpg",
  "foarfece-maniprof-110mm": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8273.jpg",
  "foarfece-maniprof-97mm": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8275.jpg",
  "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8269.jpg",
  "microforfecuta-tweezer-staleks-pro-expert": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8280.jpg",
  "oferta-cleste-foarfece-chiureta": "https://emmanails.ro/wp-content/uploads/2025/06/DSC_8291.jpg",
  "penseta-pedichiura-staleks-pro-podo": "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8284.jpg",
  "polygel-emma-nails": "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg",
  "polygel-verde": "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg",
  "polygel-emma-nails-color-01-60g": "https://emmanails.ro/wp-content/uploads/2025/05/1.jpg",
  "polygel-emma-nails-color-06-30g": "https://emmanails.ro/wp-content/uploads/2025/05/06.jpg",
  "polygel-emma-nails-color-08-30g": "https://emmanails.ro/wp-content/uploads/2025/05/08.jpg",
  "polygel-emma-nails-color-26-30g": "https://emmanails.ro/wp-content/uploads/2025/05/26.jpg",
  "polygel-emma-nails-color-27-60g": "https://emmanails.ro/wp-content/uploads/2025/05/27.jpg",
  "polygel-emma-nails-color-29-30g": "https://emmanails.ro/wp-content/uploads/2025/05/29.jpg",
  "polygel-emma-nails-color-30-30g": "https://emmanails.ro/wp-content/uploads/2025/05/30.jpg",
  "polygel-emma-nails-color-32-30g": "https://emmanails.ro/wp-content/uploads/2025/05/32.jpg",
  "polygel-emma-nails-color-34-30g": "https://emmanails.ro/wp-content/uploads/2025/05/34.jpg",
  "polygel-emma-nails-color-44-30g": "https://emmanails.ro/wp-content/uploads/2025/05/44.jpg",
  "polygel-emma-nails-color-45-30g": "https://emmanails.ro/wp-content/uploads/2025/05/45.jpg",
  "polygel-emma-nails-color-kd2-30g": "https://emmanails.ro/wp-content/uploads/2025/05/KD2.jpg",
  "polygel-emma-nails-color-kd3-30g": "https://emmanails.ro/wp-content/uploads/2025/05/KD3.jpg",
  "reflective-polygel-emma-nails-color-09-30g": "https://emmanails.ro/wp-content/uploads/2025/05/09.jpg",
  "reflective-polygel-emma-nails-color-19-30g": "https://emmanails.ro/wp-content/uploads/2025/05/19.jpg",
  "reflective-polygel-emma-nails-color-24-30g": "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg",
  "reflective-polygel-emma-nails-color-25-30g": "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg",
};

// Real prices from emmanails.ro (in bani)
const PRICE_MAP: Record<string, number> = {
  "chiureta-dubla-dietter-baumann": 4500,
  "cleste-profesional-dietter-baumann": 16000,
  "foarfece-exclusive-staleks": 13500,
  "foarfece-maniprof-110mm": 13000,
  "foarfece-maniprof-97mm": 13500,
  "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi": 13900,
  "microforfecuta-tweezer-staleks-pro-expert": 9900,
  "oferta-cleste-foarfece-chiureta": 29500,
  "penseta-pedichiura-staleks-pro-podo": 6500,
  "polygel-emma-nails": 8000,
  "polygel-verde": 3100,
  "polygel-emma-nails-color-01-60g": 14000,
  "polygel-emma-nails-color-06-30g": 8000,
  "polygel-emma-nails-color-08-30g": 8000,
  "polygel-emma-nails-color-26-30g": 8000,
  "polygel-emma-nails-color-27-60g": 14000,
  "polygel-emma-nails-color-29-30g": 8000,
  "polygel-emma-nails-color-30-30g": 8000,
  "polygel-emma-nails-color-32-30g": 8000,
  "polygel-emma-nails-color-34-30g": 8000,
  "polygel-emma-nails-color-44-30g": 8000,
  "polygel-emma-nails-color-45-30g": 8000,
  "polygel-emma-nails-color-kd2-30g": 8000,
  "polygel-emma-nails-color-kd3-30g": 8000,
  "reflective-polygel-emma-nails-color-09-30g": 8000,
  "reflective-polygel-emma-nails-color-19-30g": 8000,
  "reflective-polygel-emma-nails-color-24-30g": 8000,
  "reflective-polygel-emma-nails-color-25-30g": 8000,
};

// Sale prices
const SALE_PRICE_MAP: Record<string, number> = {
  "oferta-cleste-foarfece-chiureta": 29500, // original 34500, sale 29500
};

const ORIGINAL_PRICE_MAP: Record<string, number> = {
  "oferta-cleste-foarfece-chiureta": 34500,
};

async function main() {
  console.log("🔄 Updating product images and prices...\n");

  for (const [slug, imageUrl] of Object.entries(IMAGE_MAP)) {
    const price = PRICE_MAP[slug];
    const salePrice = SALE_PRICE_MAP[slug] || null;
    const originalPrice = ORIGINAL_PRICE_MAP[slug] || price;

    try {
      const result = await prisma.product.updateMany({
        where: { slug },
        data: {
          imageUrl,
          price: originalPrice,
          ...(salePrice ? { salePrice } : {}),
        },
      });

      if (result.count > 0) {
        console.log(`✅ ${slug} — image + price updated`);
      } else {
        console.log(`⚠️  ${slug} — not found in DB (skipped)`);
      }
    } catch (e) {
      console.log(`❌ ${slug} — error: ${e}`);
    }
  }

  // Also update course images with academy.emmanails.ro images
  const courseImages: Record<string, string> = {
    "curs-baza-stilist-protezist-unghii-nivel-1": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
    "curs-baza-stilist-protezist-unghii-nivel-2": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg",
    "curs-perfectionare-polygel": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
    "curs-nail-art-baza": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
    "curs-nail-art-avansat": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
    "curs-manichiura-combinata": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
    "curs-pedichiura-estetica": "https://academy.emmanails.ro/wp-content/uploads/2024/12/WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg",
    "curs-pedichiura-complexa": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-11.47.16-1.webp",
    "curs-sisteme-corectie": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg",
    "curs-gel-x-tips": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg",
    "curs-instructor-nail": "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
    "masterclass-emma-nails": "https://emmanails.ro/wp-content/uploads/2025/04/image.jpg",
  };

  console.log("\n🔄 Updating course images...\n");

  for (const [slug, imageUrl] of Object.entries(courseImages)) {
    try {
      const result = await prisma.course.updateMany({
        where: { slug },
        data: { imageUrl },
      });

      if (result.count > 0) {
        console.log(`✅ ${slug} — image updated`);
      } else {
        console.log(`⚠️  ${slug} — not found in DB (skipped)`);
      }
    } catch (e) {
      console.log(`❌ ${slug} — error: ${e}`);
    }
  }

  console.log("\n🎉 All images and prices updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
