import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── PRODUCTS ──────────────────────────────────────────────
  const products = [
    // INSTRUMENTE
    {
      slug: "chiureta-dubla-dietter-baumann",
      name: "Chiuretă dublă Dietter Baumann",
      description: "Este un instrument dublu, format din 2 capete. Chiuretă dublă profesională Dietter Baumann, ideală pentru îndepărtarea cuticulelor și curățarea matricei unghiale. Oțel inoxidabil chirurgical de calitate superioară germană.",
      price: 4500, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8288.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8288.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8289.jpg"],
    },
    {
      slug: "cleste-profesional-dietter-baumann",
      name: "Clește profesional Dietter Baumann",
      description: "Clește profesional Dietter Baumann pentru cuticulele. Lame ascuțite din oțel chirurgical german, mâner ergonomic. Instrument esențial pentru manichiura profesională. Tăiere precisă și curată.",
      price: 16000, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8272.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/WhatsApp-Image-2024-08-22-at-08.09.53-1.jpeg"],
    },
    {
      slug: "foarfece-exclusive-staleks",
      name: "Foarfece Exclusive Staleks",
      description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt ascuțite și subțiri, ușor curbată este extrem de ușor de utilizat. Finisaj de înaltă calitate din gama Exclusive Staleks.",
      price: 13500, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8278.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8278.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8279.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/forbice-per-cuticole-staleks-exclusive-sx-221-magnolia-21mm.png"],
    },
    {
      slug: "foarfece-maniprof-110mm",
      name: "Foarfece Maniprof 110mm",
      description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. Lungime totală 110mm, ideale pentru tăierea precisă a cuticulelor și pielițelor.",
      price: 13000, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8273.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8273.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8274.jpg"],
    },
    {
      slug: "foarfece-maniprof-97mm",
      name: "Foarfece Maniprof 97mm",
      description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. Model compact de 97mm pentru control maxim.",
      price: 13500, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8275.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8275.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8277.jpg"],
    },
    {
      slug: "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi",
      name: "Instrument profesional Dietter Baumann pentru unghii încarnate și bătături",
      description: "Instrument profesional dublu Dietter Baumann, special conceput pentru tratamentul unghiilor încarnate și îndepărtarea bătăturilor. Oțel chirurgical german de cea mai înaltă calitate.",
      price: 13900, category: "instrumente", subcategory: "instrumente-pedichiura",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8269.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8269.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8267.jpg"],
    },
    {
      slug: "microforfecuta-tweezer-staleks-pro-expert",
      name: "Microforfecuță — Tweezer Staleks Pro Expert",
      description: "Instrument pentru manichiură și pedichiură utilizat pentru cuticulă, taie cu precizie. Lamele sunt ascuțite și subțiri, ușor curbată este extrem de ușor de utilizat.",
      price: 9900, category: "instrumente", subcategory: "instrumente-manichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8280.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8280.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8282.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/Tijera-para-manicure-Staleks-Expert-90-1-Enails-1-1024x1024-1.jpg"],
    },
    {
      slug: "oferta-cleste-foarfece-chiureta",
      name: "Ofertă clește + foarfece + chiuretă",
      description: "Set complet de instrumente profesionale la preț special: clește Dietter Baumann + foarfece + chiuretă. Tot ce ai nevoie pentru manichiura profesională într-un singur pachet avantajos.",
      price: 34500, salePrice: 29500, category: "instrumente", subcategory: "instrumente-set",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/06/DSC_8291.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/06/DSC_8291.jpg", "https://emmanails.ro/wp-content/uploads/2025/06/DSC_8293.jpg"],
    },
    {
      slug: "penseta-pedichiura-staleks-pro-podo",
      name: "Pensetă pedichiură Staleks Pro Podo",
      description: "Este folosită pentru a îndepărta elementele unghiilor încarnate din pliurile laterale și a bătăturilor subunghiale. Instrument esențial pentru pedichiura profesională.",
      price: 6500, category: "instrumente", subcategory: "instrumente-pedichiura",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8284.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8284.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8285.jpg"],
    },
    // POLYGEL
    {
      slug: "polygel-emma-nails",
      name: "Polygel Emma Nails",
      description: "Cel mai top produs ever! PolyGel Emma Nails cu formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior. Formulă originală dezvoltată din 15+ ani de experiență.",
      price: 8000, category: "polygel", subcategory: "polygel-clasic", size: "30g",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/04/29.jpg"],
    },
    {
      slug: "polygel-verde",
      name: "Polygel Verde",
      description: "PolyGel Emma Nails verde — culoare vibrantă și unică. Cu formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor.",
      price: 3100, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/04/29.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-01-60g",
      name: "Polygel Emma Nails Color 01, 60g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior. Format economic 60g pentru profesioniști.",
      price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/1.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/1.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-06-30g",
      name: "Polygel Emma Nails Color 06, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/06.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/06.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-08-30g",
      name: "Polygel Emma Nails Color 08, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/08.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/08.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-26-30g",
      name: "Polygel Emma Nails Color 26, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/26.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/26.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-27-60g",
      name: "Polygel Emma Nails Color 27, 60g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior. Format economic 60g.",
      price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/27.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/27.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-29-30g",
      name: "Polygel Emma Nails Color 29, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/29.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/29.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-30-30g",
      name: "Polygel Emma Nails Color 30, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/30.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/30.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-32-30g",
      name: "Polygel Emma Nails Color 32, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/32.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/32.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-34-30g",
      name: "Polygel Emma Nails Color 34, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/34.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/34.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-44-30g",
      name: "Polygel Emma Nails Color 44, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/44.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/44.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-45-30g",
      name: "Polygel Emma Nails Color 45, 30g",
      description: "Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/45.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/45.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-kd2-30g",
      name: "Polygel Emma Nails Color KD2, 30g",
      description: "Din colecția specială KD. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/KD2.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/KD2.jpg"],
    },
    {
      slug: "polygel-emma-nails-color-kd3-30g",
      name: "Polygel Emma Nails Color KD3, 30g",
      description: "Din colecția specială KD. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/KD3.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/KD3.jpg"],
    },
    {
      slug: "reflective-polygel-emma-nails-color-09-30g",
      name: "Reflective Polygel Emma Nails Color 09, 30g",
      description: "PolyGel reflectiv cu efect strălucitor spectaculos. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g",
      inStock: true, featured: true,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/09.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/09.jpg"],
    },
    {
      slug: "reflective-polygel-emma-nails-color-19-30g",
      name: "Reflective Polygel Emma Nails Color 19, 30g",
      description: "PolyGel reflectiv cu efect strălucitor unic. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/19.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/19.jpg"],
    },
    {
      slug: "reflective-polygel-emma-nails-color-24-30g",
      name: "Reflective Polygel Emma Nails Color 24, 30g",
      description: "PolyGel reflectiv cu efect holografic. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/25.jpg"],
    },
    {
      slug: "reflective-polygel-emma-nails-color-25-30g",
      name: "Reflective Polygel Emma Nails Color 25, 30g",
      description: "PolyGel reflectiv cu efect fascinant. Cu o formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.",
      price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g",
      inStock: true, featured: false,
      imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg",
      images: ["https://emmanails.ro/wp-content/uploads/2025/05/25.jpg"],
    },
  ];

  // Delete all existing products and re-create
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`✅ ${products.length} products seeded`);

  // ─── COURSES (real data from academy.emmanails.ro) ────────
  const courses = [
    {
      slug: "curs-baza-stilist-protezist-unghii-nivel-1",
      name: "Curs bază stilist protezist unghii — Nivel 1",
      description: "Cursul ideal pentru începătoare. Învață de la zero tehnicile fundamentale ale construcției unghiilor profesionale. 5 zile intensive de teorie + practică pe model real.",
      priceFrom: 40000, priceTo: 270000, level: "incepator", duration: "5 zile",
      curriculum: ["Ziua 1: Teorie — Anatomia unghiei, patologie, norme de igienă","Ziua 1: Aplicarea ojei semipermanente în tehnica fără pilire","Ziua 2: Oval slim cu tipsuri full (fără apex) — design pietre","Ziua 3: Pătrat cu full tips & design pietre","Ziua 4: Migdală clasică pe șablon — Babyboomer","Ziua 5: French de suprafață & realizare portofoliu foto"],
      includes: ["Diplomă de absolvire acreditată", "Practică pe model real", "Suport de curs", "Consultanță post-curs"],
      dates: ["19-23 Ianuarie", "9-13 Februarie", "9-13 Martie", "27 Aprilie-01 Mai", "25-29 Mai", "22-26 Iunie", "20-24 Iulie", "24-27 August"],
      hasAccreditation: true, featured: true,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-06-09-at-11.19.42-1.webp","https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-06-09-at-11.19.43.webp","https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-08-23-at-13.21.50.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-08-29-at-10.32.29-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.59.52-1-1.jpeg"],
    },
    {
      slug: "curs-baza-stilist-protezist-unghii-nivel-2",
      name: "Curs bază stilist protezist unghii — Nivel 2",
      description: "Continuarea cursului de bază. Aprofundează tehnicile avansate de construcție, forme complexe, french exterior și interior.",
      priceFrom: 40000, priceTo: 250000, level: "mediu", duration: "5 zile",
      curriculum: ["Ziua 1: Migdală modernă cu double side pe șablon","Ziua 2: Pătrat arcuit cu french de suprafață","Ziua 3: Migdală modernă cu french pictat pe șablon","Ziua 4: Balerină cu french de interior pe șablon","Ziua 5: Întreținere cu schimbarea arhitecturii cu tipsuri reutilizabile"],
      includes: ["Diplomă de absolvire", "Tehnici avansate", "Practică pe model real"],
      dates: ["16-20 Februarie", "30 Martie-3 Aprilie", "4-8 Mai", "1-5 Iunie", "29 Iunie-3 Iulie", "27-31 Iulie", "31 August-4 Septembrie"],
      hasAccreditation: true, featured: true,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.35.36.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.35.36.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.00.36-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.55-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.16.36.jpeg"],
    },
    {
      slug: "curs-perfectionare-gel-nivel-1",
      name: "Curs perfecționare gel — Nivel 1",
      description: "Curs de perfecționare pentru cele care au terminat cursul de bază. Tehnici avansate de lucru cu gel.",
      priceFrom: 25000, priceTo: 180000, level: "mediu", duration: "2-3 zile",
      curriculum: ["Ziua 1: Oval slim cu tipsuri full (fără apex)","Ziua 2: Pătrat natural cu tipsuri smart","Ziua 3: Migdală clasică pe șablon — Babyboomer"],
      includes: ["Diplomă de absolvire", "Practică pe model real", "Toate lucrările afișate sunt realizate de cursante"],
      dates: ["20-21 Ianuarie", "10-12 Februarie", "10-12 Martie", "28-30 Aprilie", "26-28 Mai", "23-25 Iunie", "21-23 Iulie", "25-26 August"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-06-07-at-16.27.57.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-11.47.16-1.webp","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg"],
    },
    {
      slug: "curs-perfectionare-gel-nivel-2",
      name: "Curs perfecționare gel — Nivel 2",
      description: "Perfecționare avansată în tehnicile de gel. Pentru profesioniste care vor să-și ducă abilitățile la next level.",
      priceFrom: 30000, priceTo: 200000, level: "avansat", duration: "3 zile",
      curriculum: ["Ziua 1: Oval slim cu tipsuri reutilizabile","Ziua 2: Pătrat arcuit cu french de interior cu tipsuri reutilizabile","Ziua 3: Migdală modernă cu french de interior cu tipsuri reutilizabile"],
      includes: ["Diplomă de absolvire", "Practică pe model real", "Toate lucrările afișate sunt realizate de cursante"],
      dates: ["16-18 Februarie", "30 Martie-3 Aprilie", "4-6 Mai", "1-3 Iunie", "29 Iunie-1 Iulie", "27-29 Iulie", "31 August-3 Septembrie"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.13-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.54.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.12.35.jpeg"],
    },
    {
      slug: "curs-perfectionare-gel-nivel-3",
      name: "Curs perfecționare gel — Nivel 3",
      description: "Cel mai avansat nivel de perfecționare. Tehnici de top, forme extreme, nail art complex.",
      priceFrom: 35000, priceTo: 250000, level: "avansat", duration: "3 zile",
      curriculum: ["Ziua 1: Migdală gotică pe șablon cu french de interior","Ziua 2: Edge clasic cu french de interior"],
      includes: ["Diplomă de absolvire", "Practică pe model real"],
      dates: ["11-13 Mai", "17-19 Iunie", "15-17 Iulie"],
      hasAccreditation: false, featured: true,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/e2138287-df35-4c04-98e6-95ed273f9d78.jpg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/e2138287-df35-4c04-98e6-95ed273f9d78.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.06.31-2.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.07.55-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-12.20.48.webp"],
    },
    {
      slug: "curs-fast-tips-manicure",
      name: "Curs Fast Tips Manicure",
      description: "Curs practic pentru tehnica fast tips. Construirea formelor cu French Glass, pilirea și finisarea.",
      priceFrom: 20000, priceTo: 120000, level: "mediu", duration: "2 zile",
      curriculum: ["Ziua 1: Pătrat cu full tips & design pietre","Ziua 2: Natural slim cu smart tips","Ziua 3: Migdală clasică/slim pe șablon"],
      includes: ["Diplomă de absolvire", "Practică pe model real", "Toate lucrările afișate sunt realizate de cursante"],
      dates: ["15-16 Aprilie", "7-8 Mai", "4-5 Iunie", "2-3 Iulie", "30-31 Iulie", "3-4 Septembrie"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp","https://academy.emmanails.ro/wp-content/uploads/2024/12/316dd4a8-0794-4ac2-8b91-073c4ba69be1.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/12/WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg"],
    },
    {
      slug: "curs-intretinere-schimbarea-arhitecturii",
      name: "Curs întreținere cu schimbarea arhitecturii",
      description: "Cursul are o durată de 1 zi și se lucrează 8-10 ore/zi. Învață tehnica completă de întreținere cu schimbarea formei unghiei.",
      priceFrom: 15000, priceTo: 100000, level: "mediu", duration: "1 zi",
      curriculum: ["Ziua 1: Tehnica completă de întreținere cu schimbarea formei unghiei — 8-10 ore"],
      includes: ["Diplomă de absolvire", "Practică pe model real"],
      dates: ["20 Februarie", "3 Martie", "8 Mai", "5 Iunie", "3 Iulie", "31 Iulie", "4 Septembrie"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/f4f8ff5b-e9a2-42da-96e8-5f06dc58a225.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-06-07-at-16.22.35.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg"],
    },
    {
      slug: "curs-intretinere-simpla",
      name: "Curs întreținere simplă",
      description: "Curs de o zi dedicat tehnicii de întreținere simplă a unghiilor construite.",
      priceFrom: 10000, priceTo: 80000, level: "incepator", duration: "1 zi",
      curriculum: ["Ziua 1: Tehnica completă de întreținere simplă a unghiilor construite"],
      includes: ["Diplomă de absolvire", "Practică pe model real"],
      dates: ["23 Ianuarie", "13 Februarie", "13 Martie", "1 Mai", "29 Mai", "26 Iunie", "24 Iulie", "27 August"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/04/4cb4f10b-54c7-4771-b2a9-25278a94234a.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-06-09-at-11.19.42-3.webp"],
    },
    {
      slug: "curs-oja-semipermanenta",
      name: "Curs aplicare ojă semipermanentă",
      description: "Curs practic de o zi pentru tehnica completă de aplicare a ojei semipermanente.",
      priceFrom: 10000, priceTo: 60000, level: "incepator", duration: "1 zi",
      curriculum: ["Ziua 1: Tehnica completă de aplicare ojă semipermanentă"],
      includes: ["Diplomă de absolvire", "Practică pe model real"],
      dates: ["19 Ianuarie", "9 Februarie", "9 Martie", "27 Aprilie", "25 Mai", "22 Iunie", "20 Iulie", "24 August"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.04.01-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-12.02.48.webp"],
    },
    {
      slug: "curs-pedichiura-complexa",
      name: "Curs pedichiură complexă",
      description: "Cursul cel mai complet de pedichiură. Include tehnici avansate pentru cazuri complexe: unghii încarnate, micoze, bătături, și reconstrucție.",
      priceFrom: 40000, priceTo: 280000, level: "avansat", duration: "3 zile",
      curriculum: ["Ziua 1: Tehnici de bază pedichiură complexă","Ziua 2: Unghii încarnate, sisteme de corecție","Ziua 3: Micoze, bătături, reconstrucție"],
      includes: ["Diplomă de absolvire acreditată", "Practică cu 2 modele pe zi"],
      dates: ["26-28 Ianuarie", "23-25 Februarie", "20-22 Aprilie", "18-20 Mai", "10-12 Iunie", "6-8 Iulie", "17-19 August"],
      hasAccreditation: true, featured: true,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.22.46.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.22.47-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.22.48-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-11-28-at-14.04.02.jpeg"],
    },
    {
      slug: "curs-sisteme-corectie",
      name: "Curs sisteme de corecție",
      description: "Curs specializat pe sistemele moderne de corecție a unghiilor încarnate. Aplicarea bracketurilor, plăcuțelor și tehnicilor non-invazive.",
      priceFrom: 30000, priceTo: 180000, level: "avansat", duration: "2 zile",
      curriculum: ["Ziua 1: Sisteme de corecție — teorie și aplicare bracketuri","Ziua 2: Practică pe model — tehnici non-invazive"],
      includes: ["Diplomă de absolvire", "Practică pe model real"],
      dates: ["29-30 Ianuarie", "26-27 Februarie", "21-22 Mai", "15-16 Iunie", "9-10 Iulie", "20-21 August"],
      hasAccreditation: false, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.19.55-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-13.12.17-1.webp"],
    },
    {
      slug: "curs-smart-pedicure",
      name: "Curs Smart Pedicure — Pedichiură Estetică",
      description: "Curs complet de pedichiură estetică. Tehnici moderne de prelucrare profesională.",
      priceFrom: 25000, priceTo: 160000, level: "mediu", duration: "2 zile",
      curriculum: ["Ziua 1: Pedichiură estetică — tehnici moderne","Ziua 2: Practică pe model — finisare completă"],
      includes: ["Diplomă de absolvire", "Practică pe model"],
      dates: ["2-3 Februarie", "23-24 Aprilie", "14-15 Mai", "8-9 Iunie", "13-14 Iulie", "3-4 August"],
      hasAccreditation: true, featured: false,
      imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg",
      images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.13.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-14.20.53-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-09.29.26-2.jpeg"],
    },
  ];

  await prisma.course.deleteMany({});
  for (const c of courses) {
    await prisma.course.create({ data: c });
  }
  console.log(`✅ ${courses.length} courses seeded`);

  // ─── DISCOUNT CODES ──────────────────────────────────────
  const discountCodes = [
    { code: "WELCOME10", type: "percentage", value: 10, minOrderValue: 10000, active: true },
    { code: "EMMA20", type: "percentage", value: 20, minOrderValue: 20000, maxUses: 100, active: true, expiresAt: new Date("2026-12-31") },
    { code: "LIVRARE0", type: "fixed", value: 2000, minOrderValue: 15000, active: true },
    { code: "ABSOLVENT15", type: "percentage", value: 15, minOrderValue: 5000, active: true },
  ];
  for (const dc of discountCodes) {
    await prisma.discountCode.upsert({ where: { code: dc.code }, update: dc, create: dc });
  }
  console.log(`✅ ${discountCodes.length} discount codes seeded`);

  // ─── TEST USER ────────────────────────────────────────────
  const testPasswordHash = await hash("test1234", 12);
  await prisma.user.upsert({
    where: { email: "test@emmanails.ro" },
    update: { passwordHash: testPasswordHash },
    create: { email: "test@emmanails.ro", name: "Maria Test", phone: "0740000000", passwordHash: testPasswordHash },
  });
  console.log("✅ Test user seeded (test@emmanails.ro / test1234)");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
