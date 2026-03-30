import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── PRODUCTS ──────────────────────────────────────────────
  const products = [
    // INSTRUMENTE (10)
    {
      slug: "chiureta-dubla-dietter-baumann",
      name: "Chiuretă dublă Dietter Baumann",
      description:
        "Chiuretă dublă profesională Dietter Baumann, ideală pentru îndepărtarea cuticulelor și curățarea matricei unghiale. Oțel inoxidabil de calitate superioară.",
      price: 9000,
      category: "instrumente",
      subcategory: "instrumente-manichiura",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/chiureta-dubla-dietter-baumann.png",
    },
    {
      slug: "freza-electrica-mercedes-2000",
      name: "Freză electrică Mercedes 2000",
      description:
        "Freză profesională Mercedes 2000 cu motor puternic și silențios. Include set de capete interschimbabile. Ideală pentru salon și cursuri.",
      price: 45000,
      category: "instrumente",
      subcategory: "instrumente-aparatura",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/freza-electrica-mercedes-2000.png",
    },
    {
      slug: "lampa-uv-led-sun5-48w",
      name: "Lampă UV/LED SUN5 48W",
      description:
        "Lampă profesională UV/LED SUN5 cu putere de 48W. Uscare rapidă pentru gel, polygel și oja semipermanentă. Timer integrat.",
      price: 15000,
      category: "instrumente",
      subcategory: "instrumente-aparatura",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/lampa-uv-led-sun5-48w.png",
    },
    {
      slug: "penseta-curba-inox",
      name: "Pensetă curbă INOX",
      description:
        "Pensetă curbă din oțel inoxidabil, esențială pentru aplicarea formelor și manipularea decorațiunilor fine.",
      price: 3500,
      category: "instrumente",
      subcategory: "instrumente-manichiura",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/penseta-curba-inox.png",
    },
    {
      slug: "set-pile-profesionale-100-180",
      name: "Set pile profesionale 100/180",
      description:
        "Set de pile profesionale cu granulație 100/180, perfecte pentru modelarea și finisarea unghiilor artificiale.",
      price: 2500,
      category: "instrumente",
      subcategory: "instrumente-consumabile",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/set-pile-profesionale.png",
    },
    {
      slug: "buffer-bloc-alb-4-fete",
      name: "Buffer bloc alb 4 fețe",
      description:
        "Buffer profesional cu 4 fețe pentru pregătirea și lustruirea unghiei naturale. Granulații diferite pe fiecare față.",
      price: 800,
      category: "instrumente",
      subcategory: "instrumente-consumabile",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/buffer-bloc-alb.png",
    },
    {
      slug: "tipsuri-clear-500-buc",
      name: "Tipsuri clear 500 buc",
      description:
        "Set 500 tipsuri transparente în 10 mărimi. Potrivire universală, ușor de modelat și lipit.",
      price: 3000,
      category: "instrumente",
      subcategory: "instrumente-consumabile",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/tipsuri-clear-500.png",
    },
    {
      slug: "pensula-ovala-nr-6-polygel",
      name: "Pensulă ovală nr.6 PolyGel",
      description:
        "Pensulă profesională ovală nr.6 special concepută pentru aplicarea PolyGel-ului. Păr sintetic de înaltă calitate.",
      price: 2500,
      category: "instrumente",
      subcategory: "instrumente-pensule",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/pensula-ovala-nr6.png",
    },
    {
      slug: "aspirator-praf-profesional",
      name: "Aspirator praf profesional",
      description:
        "Aspirator de praf profesional pentru masa de manichiură. Motor puternic cu filtru lavabil. Reduce semnificativ praful în salon.",
      price: 12000,
      category: "instrumente",
      subcategory: "instrumente-aparatura",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/aspirator-praf.png",
    },
    {
      slug: "suport-mana-piele-ecologica",
      name: "Suport mână piele ecologică",
      description:
        "Suport ergonomic pentru mână din piele ecologică. Confortabil și ușor de curățat. Ideal pentru salon.",
      price: 4500,
      category: "instrumente",
      subcategory: "instrumente-accesorii",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/suport-mana.png",
    },
    // POLYGEL (18)
    {
      slug: "polygel-emma-nails-cover-light-30g",
      name: "PolyGel Emma Nails Cover Light, 30g",
      description:
        "PolyGel Emma Nails Cover Light — nuanță naturală deschisă, perfectă pentru extensii cu aspect natural. Formulă premium cu auto-nivelare excelentă.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "30g",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-cover-light-30g.png",
    },
    {
      slug: "polygel-emma-nails-cover-light-60g",
      name: "PolyGel Emma Nails Cover Light, 60g",
      description:
        "PolyGel Emma Nails Cover Light în formatul economic de 60g. Aceeași formulă premium, pentru profesioniștii care lucrează intens.",
      price: 9000,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "60g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-cover-light-60g.png",
    },
    {
      slug: "polygel-emma-nails-cover-dark-30g",
      name: "PolyGel Emma Nails Cover Dark, 30g",
      description:
        "PolyGel Emma Nails Cover Dark — nuanță caramel elegantă. Acoperire perfectă și ținere de lungă durată.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-cover-dark-30g.png",
    },
    {
      slug: "polygel-emma-nails-cover-dark-60g",
      name: "PolyGel Emma Nails Cover Dark, 60g",
      description:
        "PolyGel Emma Nails Cover Dark format economic 60g. Nuanță caramel caldă, formulă profesională.",
      price: 9000,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "60g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-cover-dark-60g.png",
    },
    {
      slug: "polygel-emma-nails-clear-30g",
      name: "PolyGel Emma Nails Clear, 30g",
      description:
        "PolyGel Emma Nails Clear — complet transparent, ideal pentru baby boomer, french și încapsulări de design.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-clear",
      size: "30g",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-clear-30g.png",
    },
    {
      slug: "polygel-emma-nails-clear-60g",
      name: "PolyGel Emma Nails Clear, 60g",
      description:
        "PolyGel Emma Nails Clear format economic 60g. Transparent perfect, consistență ideală pentru profesioniști.",
      price: 9000,
      category: "polygel",
      subcategory: "polygel-clear",
      size: "60g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-clear-60g.png",
    },
    {
      slug: "polygel-emma-nails-white-30g",
      name: "PolyGel Emma Nails White, 30g",
      description:
        "PolyGel Emma Nails White — alb pur, crisp. Perfect pentru french clasic și nail art alb.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-clasic",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-white-30g.png",
    },
    {
      slug: "polygel-emma-nails-pink-30g",
      name: "PolyGel Emma Nails Pink, 30g",
      description:
        "PolyGel Emma Nails Pink — roz delicat, natural. Ideal pentru look-uri feminine și elegante.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-clasic",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-pink-30g.png",
    },
    {
      slug: "polygel-emma-nails-color-kd01-30g",
      name: "PolyGel Emma Nails Color KD01, 30g",
      description:
        "Din colecția specială KD, culoare vibrantă cu acoperire uniformă. Pigment intens la prima aplicare.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-color",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-kd01-30g.png",
    },
    {
      slug: "polygel-emma-nails-color-kd02-30g",
      name: "PolyGel Emma Nails Color KD02, 30g",
      description:
        "Din colecția specială KD, culoare elegantă cu finisaj perfect. Consistență excelentă pentru modelare.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-color",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-kd02-30g.png",
    },
    {
      slug: "polygel-emma-nails-color-kd03-30g",
      name: "PolyGel Emma Nails Color KD03, 30g",
      description:
        "Din colecția specială KD, culoare distinctivă cu acoperire uniformă. Pigment premium.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-color",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-kd03-30g.png",
    },
    {
      slug: "reflective-polygel-emma-nails-color-09-30g",
      name: "Reflective PolyGel Emma Nails Color 09, 30g",
      description:
        "PolyGel reflectiv Emma Nails Color 09. Efect oglindă spectaculos sub lumina UV, formulă premium.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-reflective",
      size: "30g",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/reflective-09-30g.png",
    },
    {
      slug: "reflective-polygel-emma-nails-color-19-30g",
      name: "Reflective PolyGel Emma Nails Color 19, 30g",
      description:
        "PolyGel reflectiv Emma Nails Color 19. Efect strălucitor unic, perfect pentru manichiuri de eveniment.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-reflective",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/reflective-19-30g.png",
    },
    {
      slug: "reflective-polygel-emma-nails-color-24-30g",
      name: "Reflective PolyGel Emma Nails Color 24, 30g",
      description:
        "PolyGel reflectiv Emma Nails Color 24. Efect holografic subtil, culoare fascinantă.",
      price: 8000,
      category: "polygel",
      subcategory: "polygel-reflective",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/reflective-24-30g.png",
    },
    {
      slug: "polygel-emma-nails-milky-white-30g",
      name: "PolyGel Emma Nails Milky White, 30g",
      description:
        "PolyGel Milky White — alb lăptos semi-transparent. Ideal pentru baby boomer și look-uri soft.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-clasic",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-milky-white-30g.png",
    },
    {
      slug: "polygel-emma-nails-nude-rose-30g",
      name: "PolyGel Emma Nails Nude Rosé, 30g",
      description:
        "PolyGel Nude Rosé — nuanță roză-nude sofisticată. Cea mai populară culoare pentru extensii elegante.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "30g",
      inStock: true,
      featured: true,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-nude-rose-30g.png",
    },
    {
      slug: "polygel-emma-nails-peach-30g",
      name: "PolyGel Emma Nails Peach, 30g",
      description:
        "PolyGel Peach — nuanță piersică caldă și feminină. Perfect pentru sezonul cald.",
      price: 5500,
      category: "polygel",
      subcategory: "polygel-nude",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/polygel-peach-30g.png",
    },
    {
      slug: "polygel-emma-nails-builder-gel-30g",
      name: "PolyGel Emma Nails Builder Gel, 30g",
      description:
        "Builder Gel Emma Nails — gel de construcție puternic, ideal pentru întărirea și alungirea unghiilor naturale.",
      price: 6000,
      category: "polygel",
      subcategory: "polygel-builder",
      size: "30g",
      inStock: true,
      featured: false,
      imageUrl:
        "https://emmanails.ro/wp-content/uploads/2024/10/builder-gel-30g.png",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  // ─── COURSES ──────────────────────────────────────────────
  const courses = [
    {
      slug: "curs-baza-stilist-protezist-unghii-nivel-1",
      name: "Curs bază stilist protezist unghii — Nivel 1",
      description:
        "Cursul ideal pentru începătoare. Învață de la zero tehnicile fundamentale ale manichiurii profesionale: pregătirea unghiei naturale, aplicarea gelului, construcția și modelarea formei, finisajul perfect.",
      priceFrom: 40000,
      priceTo: 270000,
      level: "incepator",
      duration: "5 zile",
      includes: [
        "Diplomă de absolvire acreditată",
        "Kit de produse inclus (varianta cu kit)",
        "Suport de curs",
        "Practică pe model real",
        "Consultanță post-curs",
      ],
      featured: true,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-baza-nivel-1.jpg",
    },
    {
      slug: "curs-baza-stilist-protezist-unghii-nivel-2",
      name: "Curs bază stilist protezist unghii — Nivel 2",
      description:
        "Continuarea cursului de bază. Aprofundează tehnicile avansate de construcție, forme complexe, aplicare pe unghii problematice, și tehnici de viteză pentru salon.",
      priceFrom: 40000,
      priceTo: 250000,
      level: "mediu",
      duration: "4 zile",
      includes: [
        "Diplomă de absolvire",
        "Tehnici avansate de construcție",
        "Forme complexe",
        "Practică pe model real",
      ],
      featured: true,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-baza-nivel-2.jpg",
    },
    {
      slug: "curs-perfectionare-polygel",
      name: "Curs perfecționare PolyGel",
      description:
        "Curs intensiv de perfecționare în tehnica PolyGel. Aprofundare construcție, forme speciale, troubleshooting, și tehnici de viteză.",
      priceFrom: 30000,
      priceTo: 180000,
      level: "mediu",
      duration: "2 zile",
      includes: [
        "Diplomă de absolvire",
        "Tehnici avansate PolyGel",
        "Troubleshooting",
        "Practică pe model real",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-polygel.jpg",
    },
    {
      slug: "curs-nail-art-baza",
      name: "Curs nail art — bază",
      description:
        "Curs de nail art pentru începătoare. Tehnici fundamentale de pictură pe unghii: linii, puncte, degradeuri, flori simple, french modern.",
      priceFrom: 25000,
      priceTo: 150000,
      level: "incepator",
      duration: "2 zile",
      includes: [
        "Diplomă de absolvire",
        "Pensule de nail art incluse",
        "Tehnici fundamentale",
        "Practică intensivă",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-nail-art.jpg",
    },
    {
      slug: "curs-nail-art-avansat",
      name: "Curs nail art avansat",
      description:
        "Curs avansat de nail art. Tehnici complexe: acuarelă, micropainting, chrome, babyboomer perfect, marble, foil art.",
      priceFrom: 35000,
      priceTo: 200000,
      level: "avansat",
      duration: "3 zile",
      includes: [
        "Diplomă de absolvire",
        "Materiale premium incluse",
        "Tehnici avansate de pictură",
        "Portofoliu foto profesional",
      ],
      featured: true,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-nail-art-avansat.jpg",
    },
    {
      slug: "curs-manichiura-combinata",
      name: "Curs manichiură combinată",
      description:
        "Cursul complet de manichiură combinată: tehnica rusească cu freză + clasică. Pregătirea perfectă a unghiei naturale.",
      priceFrom: 25000,
      priceTo: 160000,
      level: "incepator",
      duration: "2 zile",
      includes: [
        "Diplomă de absolvire",
        "Tehnica rusească cu freză",
        "Manichiură clasică",
        "Practică pe model",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-manichiura.jpg",
    },
    {
      slug: "curs-pedichiura-estetica",
      name: "Curs pedichiură estetică",
      description:
        "Curs complet de pedichiură estetică. Tehnici de prelucrare profesională, tratarea calusurilor, și aplicarea gelului pe unghiile de la picioare.",
      priceFrom: 30000,
      priceTo: 190000,
      level: "mediu",
      duration: "3 zile",
      includes: [
        "Diplomă de absolvire",
        "Tehnici de pedichiură estetică",
        "Prelucrare profesională",
        "Practică pe model",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-pedichiura.jpg",
    },
    {
      slug: "curs-pedichiura-complexa",
      name: "Curs pedichiură complexă",
      description:
        "Cursul cel mai complet de pedichiură. Include tehnici avansate pentru cazuri complexe: unghii încarnate, micoze, bătături, și reconstrucție.",
      priceFrom: 40000,
      priceTo: 280000,
      level: "avansat",
      duration: "5 zile",
      includes: [
        "Diplomă de absolvire",
        "Kit profesional inclus (varianta cu kit)",
        "Tehnici pentru cazuri complexe",
        "Unghii încarnate și bătături",
        "Practică pe model real",
      ],
      featured: true,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-pedichiura-complexa.jpg",
    },
    {
      slug: "curs-sisteme-corectie",
      name: "Curs sisteme de corecție",
      description:
        "Curs specializat pe sistemele moderne de corecție a unghiilor încarnate. Aplicarea bracketurilor, plăcuțelor și tehnicilor non-invazive.",
      priceFrom: 30000,
      priceTo: 180000,
      level: "avansat",
      duration: "2 zile",
      includes: [
        "Diplomă de absolvire",
        "Sisteme de corecție incluse",
        "Tehnici non-invazive",
        "Practică pe model real",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-corectie.jpg",
    },
    {
      slug: "curs-gel-x-tips",
      name: "Curs Gel X / Tips",
      description:
        "Curs practic pentru tehnica Gel X cu tipsuri soft gel. Metoda rapidă de extensie — aplicare în 30 de minute.",
      priceFrom: 20000,
      priceTo: 120000,
      level: "incepator",
      duration: "1 zi",
      includes: [
        "Diplomă de absolvire",
        "Kit tipsuri inclus",
        "Tehnica completă Gel X",
        "Practică intensivă",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-gel-x.jpg",
    },
    {
      slug: "curs-instructor-nail",
      name: "Curs instructor / trainer nail",
      description:
        "Cursul pentru cele care vor să devină instructoare. Pedagogie, metodologie de predare, construirea unui curriculum, și managementul claselor.",
      priceFrom: 50000,
      priceTo: 350000,
      level: "avansat",
      duration: "5 zile",
      includes: [
        "Diplomă de instructor acreditată",
        "Metodologie de predare",
        "Curriculum complet",
        "Mentorat post-curs",
        "Acces grup privat instructori",
      ],
      featured: false,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/curs-instructor.jpg",
    },
    {
      slug: "masterclass-emma-nails",
      name: "Masterclass Emma Nails",
      description:
        "Masterclass exclusiv cu Emma. Tehnici de top, secretele din 15+ ani de experiență, demonstrații live, și sesiune Q&A.",
      priceFrom: 60000,
      priceTo: 60000,
      level: "avansat",
      duration: "1 zi",
      includes: [
        "Certificat de participare",
        "Demonstrații live Emma",
        "Sesiune Q&A",
        "Kit cadou Emma Nails",
        "Networking cu profesioniști",
      ],
      featured: true,
      imageUrl:
        "https://academy.emmanails.ro/wp-content/uploads/2024/10/masterclass.jpg",
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    });
  }
  console.log(`✅ ${courses.length} courses seeded`);

  // ─── DISCOUNT CODES ──────────────────────────────────────
  const discountCodes = [
    {
      code: "WELCOME10",
      type: "percentage",
      value: 10,
      minOrderValue: 10000, // min 100 lei
      maxUses: null,
      active: true,
      expiresAt: null,
    },
    {
      code: "EMMA20",
      type: "percentage",
      value: 20,
      minOrderValue: 20000, // min 200 lei
      maxUses: 100,
      active: true,
      expiresAt: new Date("2026-12-31"),
    },
    {
      code: "LIVRARE0",
      type: "fixed",
      value: 2000, // 20 lei discount (covers standard shipping)
      minOrderValue: 15000, // min 150 lei
      maxUses: null,
      active: true,
      expiresAt: null,
    },
    {
      code: "ABSOLVENT15",
      type: "percentage",
      value: 15,
      minOrderValue: 5000,
      maxUses: null,
      active: true,
      expiresAt: null,
    },
  ];

  for (const dc of discountCodes) {
    await prisma.discountCode.upsert({
      where: { code: dc.code },
      update: dc,
      create: dc,
    });
  }
  console.log(`✅ ${discountCodes.length} discount codes seeded`);

  // ─── TEST USER ────────────────────────────────────────────
  const testPasswordHash = await hash("test1234", 12);
  await prisma.user.upsert({
    where: { email: "test@emmanails.ro" },
    update: { passwordHash: testPasswordHash },
    create: {
      email: "test@emmanails.ro",
      name: "Maria Test",
      phone: "0740000000",
      passwordHash: testPasswordHash,
    },
  });
  console.log("✅ Test user seeded (test@emmanails.ro / test1234)");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
