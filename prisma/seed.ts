import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── PRODUCTS ──────────────────────────────────────────────
  const products = [
    // INSTRUMENTE (9)
    {
      slug: "chiureta-dubla-dietter-baumann",
      name: "Chiuretă dublă Dietter Baumann",
      description:
        "Chiuretă dublă profesională Dietter Baumann, ideală pentru îndepărtarea cuticulelor și curățarea matricei unghiale. Oțel inoxidabil de calitate superioară.",
      price: 4500,
      category: "instrumente",
      featured: false,
    },
    {
      slug: "cleste-profesional-dietter-baumann",
      name: "Clește profesional Dietter Baumann",
      description:
        "Clește profesional Dietter Baumann pentru cuticulele. Lame ascuțite din oțel chirurgical, mâner ergonomic. Instrument esențial pentru manichiura profesională.",
      price: 16000,
      category: "instrumente",
      featured: true,
    },
    {
      slug: "foarfece-exclusive-staleks",
      name: "Foarfece Exclusive Staleks",
      description:
        "Foarfece profesionale din gama Exclusive Staleks. Lame subțiri și precise pentru tăierea cuticulelor, finisaj de înaltă calitate.",
      price: 13500,
      category: "instrumente",
      featured: false,
    },
    {
      slug: "foarfece-maniprof-110mm",
      name: "Foarfece Maniprof 110mm",
      description:
        "Foarfece profesionale Maniprof cu lungime totală de 110mm. Ideale pentru tăierea precisă a cuticulelor și pielițelor.",
      price: 13000,
      category: "instrumente",
      featured: false,
    },
    {
      slug: "foarfece-maniprof-97mm",
      name: "Foarfece Maniprof 97mm",
      description:
        "Foarfece profesionale Maniprof cu lungime de 97mm. Dimensiune compactă, perfecte pentru precizie maximă în manichiură.",
      price: 13500,
      category: "instrumente",
      featured: false,
    },
    {
      slug: "instrument-profesional-dietter-baumann-unghii-incarnate",
      name: "Instrument profesional Dietter Baumann pentru unghii încarnate și bătături",
      description:
        "Instrument specializat Dietter Baumann pentru tratarea unghiilor încarnate și bătăturilor. Oțel inoxidabil medical, vârf precis.",
      price: 13900,
      category: "instrumente",
      featured: true,
    },
    {
      slug: "microforfecuta-tweezer-staleks-pro-expert",
      name: "Microforfecuță – Tweezer Staleks Pro Expert",
      description:
        "Microforfecuță profesională Staleks Pro Expert. Vârfuri ultra-subțiri pentru precizie maximă în lucrul cu cuticulele.",
      price: 9900,
      category: "instrumente",
      featured: false,
    },
    {
      slug: "oferta-cleste-foarfece-chiureta",
      name: "Ofertă clește + foarfece + chiuretă",
      description:
        "Set complet de instrumente profesionale: clește Dietter Baumann + foarfece + chiuretă dublă. Preț special de pachet.",
      price: 29500,
      salePrice: 29500,
      category: "instrumente",
      featured: true,
    },
    {
      slug: "penseta-pedichiura-staleks-pro-podo",
      name: "Penseta pedichiură Staleks Pro Podo",
      description:
        "Pensetă profesională Staleks Pro Podo, special concepută pentru pedichiură. Grip sigur și vârf precis.",
      price: 6500,
      category: "instrumente",
      featured: false,
    },

    // POLYGEL (19)
    {
      slug: "polygel-emma-nails",
      name: "Polygel Emma Nails",
      description:
        "Polygel Emma Nails — formulă originală dezvoltată pentru aplicare ușoară și aderență perfectă. Ideal pentru construcții și extensii.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: true,
    },
    {
      slug: "polygel-verde",
      name: "Polygel Verde",
      description:
        "Polygel cu pigment verde intens. Perfect pentru design-uri creative și combinații de culori unice.",
      price: 3100,
      category: "polygel",
      size: "15g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-01-60g",
      name: "Polygel Emma Nails Color 01, 60g",
      description:
        "Polygel Emma Nails Color 01 în format mare de 60g. Nuanță delicată, ideală pentru french și baze naturale.",
      price: 14000,
      category: "polygel",
      size: "60g",
      featured: true,
    },
    {
      slug: "polygel-emma-nails-color-06-30g",
      name: "Polygel Emma Nails Color 06, 30g",
      description:
        "Polygel Emma Nails Color 06. Nuanță versatilă pentru orice tip de manichiură, auto-nivelare excelentă.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-08-30g",
      name: "Polygel Emma Nails Color 08, 30g",
      description:
        "Polygel Emma Nails Color 08. Culoare elegantă cu pigmentare perfectă și consistență ideală de lucru.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-26-30g",
      name: "Polygel Emma Nails Color 26, 30g",
      description:
        "Polygel Emma Nails Color 26. Nuanță sofisticată care se aplică ușor și oferă un rezultat impecabil.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-27-60g",
      name: "Polygel Emma Nails Color 27, 60g",
      description:
        "Polygel Emma Nails Color 27 în format mare de 60g. Nuanță elegantă, perfectă pentru utilizare frecventă în salon.",
      price: 14000,
      category: "polygel",
      size: "60g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-29-30g",
      name: "Polygel Emma Nails Color 29, 30g",
      description:
        "Polygel Emma Nails Color 29. Culoare rafinată cu acoperire uniformă și durabilitate excepțională.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-30-30g",
      name: "Polygel Emma Nails Color 30, 30g",
      description:
        "Polygel Emma Nails Color 30. Nuanță modernă, ușor de modelat, pentru rezultate profesionale.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-32-30g",
      name: "Polygel Emma Nails Color 32, 30g",
      description:
        "Polygel Emma Nails Color 32. Culoare vibrantă cu formulă premium și aderență excepțională.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-34-30g",
      name: "Polygel Emma Nails Color 34, 30g",
      description:
        "Polygel Emma Nails Color 34. Nuanță subtilă și elegantă, perfectă pentru manichiuri rafinate.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-44-30g",
      name: "Polygel Emma Nails Color 44, 30g",
      description:
        "Polygel Emma Nails Color 44. Culoare intensă și modernă, ideală pentru design-uri statement.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-45-30g",
      name: "Polygel Emma Nails Color 45, 30g",
      description:
        "Polygel Emma Nails Color 45. Nuanță trendy cu finisaj impecabil și aplicare facilă.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-kd2-30g",
      name: "Polygel Emma Nails Color KD2, 30g",
      description:
        "Polygel Emma Nails Color KD2. Din colecția specială KD, nuanță unică cu proprietăți excelente de lucru.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "polygel-emma-nails-color-kd3-30g",
      name: "Polygel Emma Nails Color KD3, 30g",
      description:
        "Polygel Emma Nails Color KD3. Din colecția specială KD, culoare distinctivă cu acoperire uniformă.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "reflective-polygel-emma-nails-color-09-30g",
      name: "Reflective Polygel Emma Nails Color 09, 30g",
      description:
        "Polygel reflectiv Emma Nails Color 09. Efect oglindă spectaculos sub lumina UV, formulă premium.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: true,
    },
    {
      slug: "reflective-polygel-emma-nails-color-19-30g",
      name: "Reflective Polygel Emma Nails Color 19, 30g",
      description:
        "Polygel reflectiv Emma Nails Color 19. Efect strălucitor unic, perfect pentru manichiuri de eveniment.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
    },
    {
      slug: "reflective-polygel-emma-nails-color-24-30g",
      name: "Reflective Polygel Emma Nails Color 24, 30g",
      description:
        "Polygel reflectiv Emma Nails Color 24. Efect holografic subtil, culoare fascinantă și durabilitate excelentă.",
      price: 8000,
      category: "polygel",
      size: "30g",
      featured: false,
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
        "Cursul ideal pentru începătoare. Învață de la zero tehnicile fundamentale ale manichiurii profesionale: pregătirea unghiei naturale, aplicarea gelului, construcția și modelarea formei, finisajul perfect. Include teorie + practică intensivă pe model.",
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
    },
    {
      slug: "curs-baza-stilist-protezist-unghii-nivel-2",
      name: "Curs bază stilist protezist unghii — Nivel 2",
      description:
        "Continuarea cursului de bază. Aprofundează tehnicile avansate de construcție, forme complexe, aplicare pe unghii problematice, și tehnici de viteză pentru salon.",
      priceFrom: 40000,
      priceTo: 290000,
      level: "mediu",
      duration: "5 zile",
      includes: [
        "Diplomă de absolvire acreditată",
        "Kit de produse inclus (varianta cu kit)",
        "Suport de curs avansat",
        "Practică pe model real",
        "Tehnici de viteză pentru salon",
      ],
      featured: true,
    },
    {
      slug: "curs-perfectionare-gel-nivel-1",
      name: "Curs perfecționare gel — Nivel 1",
      description:
        "Perfecționare în tehnica gelului pentru cele care au deja baza. Focus pe îmbunătățirea construcției, arhitectura perfectă și finisajul impecabil.",
      priceFrom: 30000,
      priceTo: 140000,
      level: "mediu",
      duration: "2 zile",
      includes: [
        "Diplomă de perfecționare",
        "Feedback personalizat",
        "Analiză și corectare tehnică",
        "Practică pe model real",
      ],
      featured: false,
    },
    {
      slug: "curs-perfectionare-gel-nivel-2",
      name: "Curs perfecționare gel — Nivel 2",
      description:
        "Nivel avansat de perfecționare gel. Tehnici complexe de construcție, baby boomer, ombre, și design-uri elaborate cu gel.",
      priceFrom: 40000,
      priceTo: 160000,
      level: "avansat",
      duration: "3 zile",
      includes: [
        "Diplomă de perfecționare avansată",
        "Tehnici baby boomer și ombre",
        "Design-uri cu gel",
        "Practică pe model real",
      ],
      featured: false,
    },
    {
      slug: "curs-perfectionare-gel-nivel-3",
      name: "Curs perfecționare gel — Nivel 3",
      description:
        "Cel mai avansat curs de perfecționare gel. Tehnici de competiție, construcții extreme, și finisaje de nivel internațional.",
      priceFrom: 30000,
      priceTo: 190000,
      level: "avansat",
      duration: "3 zile",
      includes: [
        "Diplomă de master",
        "Tehnici de competiție",
        "Construcții avansate",
        "Mentoring personalizat",
      ],
      featured: false,
    },
    {
      slug: "curs-aplicare-oja-semipermanenta",
      name: "Curs aplicare ojă semipermanentă",
      description:
        "Învață aplicarea corectă a ojei semipermanente: pregătirea unghiei, aplicarea bazei, culorii și topului, și tehnicile pentru o durabilitate maximă.",
      priceFrom: 20000,
      priceTo: 45000,
      level: "incepator",
      duration: "1 zi",
      includes: [
        "Diplomă de absolvire",
        "Demonstrații practice",
        "Tehnici de aplicare fără erori",
        "Practică pe model",
      ],
      featured: true,
    },
    {
      slug: "curs-intretinere-simpla",
      name: "Curs întreținere simplă",
      description:
        "Cursul perfect pentru a învăța procedura completă de întreținere: îndepărtarea materialului crescut, reumplere, echilibrare și finisaj.",
      priceFrom: 15000,
      priceTo: 40000,
      level: "incepator",
      duration: "1 zi",
      includes: [
        "Diplomă de absolvire",
        "Procedură completă de întreținere",
        "Practică pe model",
      ],
      featured: false,
    },
    {
      slug: "curs-intretinere-schimbarea-arhitecturii",
      name: "Curs întreținere cu schimbarea arhitecturii",
      description:
        "Curs specializat pe întreținerea unghiilor cu schimbarea completă a arhitecturii. Ideal pentru corectarea formelor și restructurarea construcțiilor.",
      priceFrom: 20000,
      priceTo: 50000,
      level: "mediu",
      duration: "1 zi",
      includes: [
        "Diplomă de absolvire",
        "Tehnici de restructurare",
        "Corectarea arhitecturii",
        "Practică pe model",
      ],
      featured: false,
    },
    {
      slug: "curs-fast-tips-manicure",
      name: "Curs Fast Tips Manicure",
      description:
        "Tehnica modernă Fast Tips pentru manichiură rapidă și elegantă. Învață aplicarea tips-urilor pentru rezultate profesionale în timp record.",
      priceFrom: 40000,
      priceTo: 160000,
      level: "mediu",
      duration: "2 zile",
      includes: [
        "Diplomă de absolvire",
        "Kit Fast Tips inclus (varianta cu kit)",
        "Tehnici de aplicare rapidă",
        "Practică pe model",
      ],
      featured: true,
    },
    {
      slug: "curs-smart-pedicure",
      name: "Curs Smart Pedicure — Pedichiura Estetică",
      description:
        "Curs complet de pedichiură estetică. Învață tehnicile profesionale de prelucrare a unghiilor de la picioare, îngrijirea cuticulelor și finisajul perfect.",
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
    },
    {
      slug: "curs-sisteme-corectie",
      name: "Curs sisteme de corecție",
      description:
        "Curs specializat pe sistemele moderne de corecție a unghiilor încarnate. Învață aplicarea bracketurilor, plăcuțelor și tehnicilor non-invazive.",
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
