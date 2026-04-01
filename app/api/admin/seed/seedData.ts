// ════════════════════════════════════════════════════════════
// EMMA NAILS — SEED DATA (auto-generated from PDF catalog + docx descriptions)
// Total: ~105 products + 12 courses
// ════════════════════════════════════════════════════════════

// ─── DESCRIPTIONS (from docx files) ───────────────────────
const DESC = {
  rubberBase: "Rubber Base Emma Nails — fundamentul esențial pentru o manichiură tehnică de succes. Concepută special pentru unghiile subțiri, casante sau problematice, oferă aderență magnetică și flexibilitate rezistentă. Vâscozitate inteligentă, tehnologie \"Shock-Absorb\", autonivelare high-definition și camuflaj sofisticat. Garantează manichiură intactă peste 4 săptămâni.",
  glitterRubber: "Glitter Rubber Base Emma Nails — soluția 2-în-1 care combină rezistența unei baze elastice cu estetica prețioasă a sclipiciului fin. Efect \"Jewel-Tone\" cu particule de sclipici de înaltă densitate, suspendate într-o formulă autonivelantă. Aderență magnetică, camuflaj și design din aplicare unică. Rezistență 4 săptămâni.",
  builderGel: "Builder Gel Emma Nails — structură rigidă cu polimerizare la rece, confort maxim și durabilitate peste 4 săptămâni. Proprietăți excelente de autonivelare — reduce timpul de finisare cu 30%. Culori stabile, fără îngălbenire.",
  builderLiquid: "Builder Liquid Emma Nails — gel de construcție \"la sticluță\" ce redefinește eficiența în salon. Textură inovatoare care se autonivelează instantaneu, formează o legătură moleculară puternică. Aplicare directă cu pensula din sticlă, necesită pilire minimă sau deloc.",
  jellyGel: "Tender Crush Jelly Builder Gel (HEMA – TPO FREE). Consistență densă de tip jeleu — materialul rămâne exact unde este plasat, fără a migra spre cuticule. Odorless & HEMA-Free, reduce riscul de alergii. Barieră extrem de dură după polimerizare.",
  acrylicLiquid: "Acrylic Liquid Emma Nails — material de înaltă performanță cu formulă avansată. Timp de lucru optimizat, aderență chimică superioară, rezistență UV și anti-îngălbenire. Control absolut al materialului, finit de precizie și versatilitate structurală.",
  topGlitter: "Glitter Vibe Top Coat Emma Nails — finisajul suprem \"No Wipe\" infuzat cu micro-particule strălucitoare într-o formulă ultra-lucioasă. Tehnologie No-Wipe cu luciu instantaneu de oglindă, densitate omogenă a sclipiciului, barieră anti-zgârieturi.",
  topSteel: "Top Clear Steel Emma Nails — finisajul de elită \"No Wipe\" conceput pentru protecție îndelungată. Formulă inspirată de rezistența oțelului, scut protector ultra-rigid și luciu vitros impecabil. Imun la micro-zgârieturi.",
  topMatte: "Top Velvet Matte Emma Nails — finisaj \"No Wipe\" cu efect mat absolut. Textură fină asemănătoare catifelei, senzație catifelată la atingere, respinge praful și transferul de culoare.",
};

const slug = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Helper to make rubber base products
const rb = (name: string, hex: string) => ({
  slug: `rubber-base-${slug(name)}-12ml`,
  name: `Rubber Base Coat — ${name}, 12ml`,
  description: `${DESC.rubberBase} Nuanța ${name}.`,
  price: 6500, category: "baze-rubber", subcategory: "rubber-base", size: "12ml",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/rubber-base-front.jpg",
  images: ["/rubber-base-front.jpg", "/rubber-base-back.jpg"],
});

const grb = (name: string, hex: string) => ({
  slug: `glitter-rubber-base-${slug(name)}-12ml`,
  name: `Glitter Rubber Base — ${name}, 12ml`,
  description: `${DESC.glitterRubber} Nuanța ${name}.`,
  price: 7000, category: "baze-rubber", subcategory: "glitter-rubber-base", size: "12ml",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/glitter-rubber-base-front.jpg",
  images: ["/glitter-rubber-base-front.jpg", "/glitter-rubber-base-back.jpg"],
});

const bg = (name: string, line: string, hex: string) => ({
  slug: `builder-gel-${slug(name)}`,
  name: `Builder Gel — ${name}, 30g`,
  description: `${line} (HEMA – TPO FREE). ${DESC.builderGel} Nuanța ${name}.`,
  price: 9500, category: "gel-constructie", subcategory: "builder-gel", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: `/builder-gel-${slug(name)}.jpg`,
  images: [`/builder-gel-${slug(name)}.jpg`],
});

const bl = (name: string, hex: string) => ({
  slug: `balance-builder-liquid-${slug(name)}-12ml`,
  name: `Balance Builder Liquid — ${name}, 12ml`,
  description: `${DESC.builderLiquid} Nuanța ${name}.`,
  price: 7000, category: "gel-constructie", subcategory: "gel-liquid", size: "12ml",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/balance-builder-liquid-front.jpg",
  images: ["/balance-builder-liquid-front.jpg", "/balance-builder-liquid-back.jpg"],
});

const jg = (name: string, hex: string) => ({
  slug: `jelly-gel-${slug(name)}`,
  name: `Jelly Builder Gel — ${name}, 30g`,
  description: `${DESC.jellyGel} Nuanța ${name}.`,
  price: 9500, category: "gel-constructie", subcategory: "jelly", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: `/jelly-gel-${slug(name)}.jpg`,
  images: [`/jelly-gel-${slug(name)}.jpg`],
});

const al = (name: string, hex: string) => ({
  slug: `acrylic-liquid-${slug(name)}`,
  name: `Acrylic Extension Liquid — ${name}, 30g`,
  description: `${DESC.acrylicLiquid} Nuanța ${name}.`,
  price: 9500, category: "acrylic-liquid", subcategory: "acrylic-liquid", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: `/acrylic-${slug(name)}.jpg`,
  images: [`/acrylic-${slug(name)}.jpg`],
});

export const products = [
  // ═══════════════════════════════════════════════════════════
  // INSTRUMENTE (9 products — unchanged)
  // ═══════════════════════════════════════════════════════════
  { slug: "chiureta-dubla-dietter-baumann", name: "Chiuretă dublă Dietter Baumann", description: "Este un instrument dublu, format din 2 capete. Chiuretă dublă profesională Dietter Baumann, ideală pentru îndepărtarea cuticulelor și curățarea matricei unghiale. Oțel inoxidabil chirurgical de calitate superioară germană.", price: 4500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8288.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8288.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8289.jpg"] },
  { slug: "cleste-profesional-dietter-baumann", name: "Clește profesional Dietter Baumann", description: "Clește profesional Dietter Baumann pentru cuticulele. Lame ascuțite din oțel chirurgical german, mâner ergonomic.", price: 16000, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8272.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/WhatsApp-Image-2024-08-22-at-08.09.53-1.jpeg"] },
  { slug: "foarfece-exclusive-staleks", name: "Foarfece Exclusive Staleks", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt ascuțite și subțiri, ușor curbată.", price: 13500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8278.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8278.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8279.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/forbice-per-cuticole-staleks-exclusive-sx-221-magnolia-21mm.png"] },
  { slug: "foarfece-maniprof-110mm", name: "Foarfece Maniprof 110mm", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. 110mm.", price: 13000, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8273.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8273.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8274.jpg"] },
  { slug: "foarfece-maniprof-97mm", name: "Foarfece Maniprof 97mm", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. 97mm.", price: 13500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8275.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8275.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8277.jpg"] },
  { slug: "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi", name: "Instrument profesional Dietter Baumann pentru unghii încarnate și bătături", description: "Instrument profesional dublu, special conceput pentru tratamentul unghiilor încarnate și bătăturilor. Oțel chirurgical german.", price: 13900, category: "instrumente", subcategory: "instrumente-pedichiura", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8269.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8269.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8267.jpg"] },
  { slug: "microforfecuta-tweezer-staleks-pro-expert", name: "Microforfecuță — Tweezer Staleks Pro Expert", description: "Instrument pentru manichiură și pedichiură. Lamele sunt ascuțite și subțiri, ușor curbată.", price: 9900, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8280.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8280.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8282.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/Tijera-para-manicure-Staleks-Expert-90-1-Enails-1-1024x1024-1.jpg"] },
  { slug: "oferta-cleste-foarfece-chiureta", name: "Ofertă clește + foarfece + chiuretă", description: "Set complet la preț special: clește + foarfece + chiuretă.", price: 34500, salePrice: 29500, category: "instrumente", subcategory: "instrumente-set", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/06/DSC_8291.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/06/DSC_8291.jpg", "https://emmanails.ro/wp-content/uploads/2025/06/DSC_8293.jpg"] },
  { slug: "penseta-pedichiura-staleks-pro-podo", name: "Pensetă pedichiură Staleks Pro Podo", description: "Pentru îndepărtarea elementelor unghiilor încarnate din pliurile laterale și bătăturilor subunghiale.", price: 6500, category: "instrumente", subcategory: "instrumente-pedichiura", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8284.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/DSC_8284.jpg", "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8285.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // POLYGEL (19 products — unchanged)
  // ═══════════════════════════════════════════════════════════
  { slug: "polygel-emma-nails", name: "Polygel Emma Nails", description: "Cel mai top produs ever! Cu formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.", price: 8000, category: "polygel", subcategory: "polygel-clasic", size: "30g", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/04/29.jpg"] },
  { slug: "polygel-verde", name: "Polygel Verde", description: "PolyGel verde — culoare vibrantă. Cu formulă revoluționară.", price: 3100, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/04/29.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/04/29.jpg"] },
  { slug: "polygel-emma-nails-color-01-60g", name: "Polygel Emma Nails Color 01, 60g", description: "Cu o formulă revoluționară, foarte rezistent. Format economic 60g.", price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/1.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/1.jpg"] },
  { slug: "polygel-emma-nails-color-06-30g", name: "Polygel Emma Nails Color 06, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/06.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/06.jpg"] },
  { slug: "polygel-emma-nails-color-08-30g", name: "Polygel Emma Nails Color 08, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/08.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/08.jpg"] },
  { slug: "polygel-emma-nails-color-26-30g", name: "Polygel Emma Nails Color 26, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/26.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/26.jpg"] },
  { slug: "polygel-emma-nails-color-27-60g", name: "Polygel Emma Nails Color 27, 60g", description: "Cu o formulă revoluționară. Format economic 60g.", price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/27.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/27.jpg"] },
  { slug: "polygel-emma-nails-color-29-30g", name: "Polygel Emma Nails Color 29, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/29.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/29.jpg"] },
  { slug: "polygel-emma-nails-color-30-30g", name: "Polygel Emma Nails Color 30, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/30.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/30.jpg"] },
  { slug: "polygel-emma-nails-color-32-30g", name: "Polygel Emma Nails Color 32, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/32.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/32.jpg"] },
  { slug: "polygel-emma-nails-color-34-30g", name: "Polygel Emma Nails Color 34, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/34.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/34.jpg"] },
  { slug: "polygel-emma-nails-color-44-30g", name: "Polygel Emma Nails Color 44, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/44.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/44.jpg"] },
  { slug: "polygel-emma-nails-color-45-30g", name: "Polygel Emma Nails Color 45, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/45.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/45.jpg"] },
  { slug: "polygel-emma-nails-color-kd2-30g", name: "Polygel Emma Nails Color KD2, 30g", description: "Din colecția specială KD. Cu formulă revoluționară.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/KD2.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/KD2.jpg"] },
  { slug: "polygel-emma-nails-color-kd3-30g", name: "Polygel Emma Nails Color KD3, 30g", description: "Din colecția specială KD. Cu formulă revoluționară.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/KD3.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/KD3.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-09-30g", name: "Reflective Polygel Emma Nails Color 09, 30g", description: "PolyGel reflectiv cu efect strălucitor spectaculos.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: true, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/09.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/09.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-19-30g", name: "Reflective Polygel Emma Nails Color 19, 30g", description: "PolyGel reflectiv cu efect strălucitor unic.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/19.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/19.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-24-30g", name: "Reflective Polygel Emma Nails Color 24, 30g", description: "PolyGel reflectiv cu efect holografic.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/25.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-25-30g", name: "Reflective Polygel Emma Nails Color 25, 30g", description: "PolyGel reflectiv cu efect fascinant.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "https://emmanails.ro/wp-content/uploads/2025/05/25.jpg", images: ["https://emmanails.ro/wp-content/uploads/2025/05/25.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // ACRYLIC LIQUID (7 products — colors from PDF)
  // ═══════════════════════════════════════════════════════════
  { ...al("Soft Nude",   "#DCBFA8"), featured: true },
  al("Soft Lilac",  "#C4A0BE"),
  al("Pink Luna",   "#E8A0B0"),
  al("Amme Touch",  "#D8B498"),
  al("Ivory Silk",  "#F0E2D4"),
  al("Blush Nude",  "#E0BAA8"),
  al("Mood Nude",   "#D4AA90"),

  // ═══════════════════════════════════════════════════════════
  // BAZE RUBBER — Rubber Base Coat (7 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  rb("Nude On Point",    "#D4978A"),
  rb("Lilac Mist",      "#C09CC8"),
  rb("Moon Dust",        "#7A6878"),
  rb("White No Limits",  "#F0ECE6"),
  rb("Sand That's Hot",  "#D0AC8C"),
  rb("Rose Heartbeat",   "#D06880"),
  rb("Pink Queen Mode",  "#E07898"),

  // ═══════════════════════════════════════════════════════════
  // BAZE RUBBER — Glitter Rubber Base (31 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  grb("White Keep Shining", "#EDE6DE"),
  grb("Velvet Dream",       "#7A5870"),
  grb("Bronze Moment",      "#A07858"),
  grb("White No Limits",    "#E8E2DA"),
  grb("White Manifest",     "#E6DED6"),
  grb("Anto's Love",        "#CCA098"),
  grb("Blush Mirage",       "#B08098"),
  grb("Blue Drip Queen",    "#6888A8"),
  grb("Silver Luxe",        "#B8B4BC"),
  grb("Kiwi Influence",     "#908068"),
  grb("White Vision",       "#ECE6E2"),
  grb("Lecel Up Nude",      "#D0B498"),
  grb("Money Mood",         "#BCA068"),
  grb("White Grace",        "#ECEAE6"),
  grb("Green Mirage",       "#88A078"),
  grb("Desert Glow",        "#CCA084"),
  grb("Grey On Repeat",     "#A09898"),
  grb("Pink Hug",           "#E0ACB4"),
  grb("Sunset Bronze",      "#B88868"),
  grb("Pearl Kiss",         "#E4D4CC"),
  grb("Nude Reflection",    "#CDB8A8"),
  grb("Rose Affection",     "#D08890"),
  grb("Turcoaz Pearl",      "#78B0B0"),
  grb("Platinum Poise",     "#C0B8BC"),
  grb("Shine Up",           "#D4C088"),
  grb("Adore Gold",         "#C4A058"),
  grb("Sun Kiss",           "#CCA868"),
  grb("White Bliss",        "#E8E4DE"),
  grb("Gold Power",         "#B89848"),
  grb("Vero Rose",          "#C07888"),
  grb("Ice Lilac",          "#C4B4CC"),

  // ═══════════════════════════════════════════════════════════
  // GEL CONSTRUCȚIE — Self-leveling Fit Gel (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "self-leveling-fit-gel-12ml", name: "Self-leveling Fit Gel — Clear Promise, 12ml", description: `${DESC.builderLiquid} Nuanța Clear Promise — transparență cristalină.`, price: 7000, category: "gel-constructie", subcategory: "gel-liquid", size: "12ml", inStock: true, featured: false, colorHex: "#E6DED4", imageUrl: "/self-leveling-fit-gel-front.jpg", images: ["/self-leveling-fit-gel-front.jpg", "/self-leveling-fit-gel-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // GEL CONSTRUCȚIE — Balance Builder Liquid (5 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  bl("White Please",  "#ECE6DE"),
  bl("Nude Sandy",    "#D0A886"),
  bl("Pink Gloss",    "#E08890"),
  bl("Nude Forever",  "#D4A090"),
  bl("Pink Boss",     "#E05878"),

  // ═══════════════════════════════════════════════════════════
  // GEL CONSTRUCȚIE — Builder Gel (16 shades — fixed Lara Grace)
  // ═══════════════════════════════════════════════════════════
  bg("White Wonder",  "Harmony Builder Gel",          "#F5F0EB"),
  bg("Nude Soft",     "Harmony Builder Gel",          "#D8C0AD"),
  bg("Still White",   "Mood Cover Builder Gel",       "#F2EDE8"),
  bg("Moon Shimmer",  "Glow Moment Builder Gel",      "#E0D8E4"),
  bg("Soul Sisters",  "Glow Moment Builder Gel",      "#E5DCE8"),
  bg("Pearl Touch",   "Fairy Kiss Builder Gel",       "#EDE4DA"),
  bg("Pink Promise",  "Fairy Kiss Builder Gel",       "#F0A8BC"),
  bg("Lilac Anne",    "Fairy Kiss Builder Gel",       "#C8A8C8"),
  bg("Metal Bloom",   "Diamond Boss Builder Gel",     "#C0B8C4"),
  bg("Allè Vibes",    "Diamond Boss Builder Gel",     "#C4B4CC"),
  bg("Cosmic Chrome", "Diamond Boss Builder Gel",     "#B8B8C8"),
  bg("Pink Filter",   "Pearl Soft Mode Builder Gel",  "#ECA8B8"),
  bg("My Alma",       "Pearl Soft Mode Builder Gel",  "#D4AE98"),
  bg("Beige Cuddle",  "Pearl Soft Mode Builder Gel",  "#D8C4A8"),
  bg("Lara Grace",    "Pearl Soft Mode Builder Gel",  "#D8BCAA"),
  bg("Blue Chill",    "Pearl Soft Mode Builder Gel",  "#A4BCD6"),

  // ═══════════════════════════════════════════════════════════
  // GEL CONSTRUCȚIE — Jelly Builder Gel (5 shades)
  // ═══════════════════════════════════════════════════════════
  jg("Jelly Milk",       "#F0E8DF"),
  jg("Jelly Rose",       "#E8A0AB"),
  jg("Nude In Control",  "#D8A0AC"),
  jg("Nude Delight",     "#E0C4B2"),
  jg("Liliac Sand",      "#C4A4B8"),

  // ═══════════════════════════════════════════════════════════
  // TOP COAT — Glitter Vibe (3 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  { slug: "glitter-vibe-top-coat-true-silver-12ml", name: "Glitter Vibe Top Coat — True Silver, 12ml", description: `${DESC.topGlitter} Nuanța True Silver — argint strălucitor.`, price: 7000, category: "top-coat", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#C0BCC4", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },
  { slug: "glitter-vibe-top-coat-diamond-mist-12ml", name: "Glitter Vibe Top Coat — Diamond Mist, 12ml", description: `${DESC.topGlitter} Nuanța Diamond Mist — ceață de diamant.`, price: 7000, category: "top-coat", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#D4CCD4", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },
  { slug: "glitter-vibe-top-coat-moon-glow-12ml", name: "Glitter Vibe Top Coat — Moon Glow, 12ml", description: `${DESC.topGlitter} Nuanța Moon Glow — strălucire lunară.`, price: 7000, category: "top-coat", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#D4CCC0", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // TOP COAT — Clear Steel (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "clear-steel-top-coat-12ml", name: "Clear Steel Top Coat — Clear Touch, 12ml", description: `${DESC.topSteel} Nuanța Clear Touch — claritate absolută.`, price: 7000, category: "top-coat", subcategory: "clear-steel-top", size: "12ml", inStock: true, featured: false, colorHex: "#E4E0DC", imageUrl: "/clear-steel-top-coat-front.jpg", images: ["/clear-steel-top-coat-front.jpg", "/clear-steel-top-coat-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // TOP COAT — Velvet Matte (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "velvet-matte-top-coat-12ml", name: "Velvet Matte Top Coat — Velvet Touch, 12ml", description: `${DESC.topMatte} Nuanța Velvet Touch — catifea pură.`, price: 7000, category: "top-coat", subcategory: "velvet-matte-top", size: "12ml", inStock: true, featured: false, colorHex: "#E6E0DA", imageUrl: "/velvet-matte-top-coat-front.jpg", images: ["/velvet-matte-top-coat-front.jpg", "/velvet-matte-top-coat-back.jpg"] },
];

// ═══════════════════════════════════════════════════════════
// COURSES (12 — unchanged)
// ═══════════════════════════════════════════════════════════
export const courses = [
  { slug: "curs-baza-stilist-protezist-unghii-nivel-1", name: "Curs bază stilist protezist unghii — Nivel 1", description: "Cursul ideal pentru începătoare. 5 zile intensive de teorie + practică pe model real.", priceFrom: 40000, priceTo: 270000, level: "incepator", duration: "5 zile", curriculum: ["Ziua 1: Teorie — Anatomia unghiei, patologie, norme de igienă","Ziua 1: Aplicarea ojei semipermanente în tehnica fără pilire","Ziua 2: Oval slim cu tipsuri full (fără apex) — design pietre","Ziua 3: Pătrat cu full tips & design pietre","Ziua 4: Migdală clasică pe șablon — Babyboomer","Ziua 5: French de suprafață & realizare portofoliu foto"], includes: ["Diplomă acreditată","Practică pe model real","Suport de curs","Consultanță post-curs"], dates: ["19-23 Ianuarie","9-13 Februarie","9-13 Martie","27 Aprilie-01 Mai","25-29 Mai","22-26 Iunie","20-24 Iulie","24-27 August"], hasAccreditation: true, featured: true, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-06-09-at-11.19.42-1.webp","https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2025-08-23-at-13.21.50.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.59.52-1-1.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-1", name: "Curs perfecționare gel — Nivel 1", description: "Perfecționare pentru cele care au terminat cursul de bază.", priceFrom: 25000, priceTo: 180000, level: "mediu", duration: "2-3 zile", curriculum: ["Ziua 1: Oval slim cu tipsuri full (fără apex)","Ziua 2: Pătrat natural cu tipsuri smart","Ziua 3: Migdală clasică pe șablon — Babyboomer"], includes: ["Diplomă","Practică pe model real"], dates: ["20-21 Ianuarie","10-12 Februarie","10-12 Martie","28-30 Aprilie","26-28 Mai","23-25 Iunie","21-23 Iulie","25-26 August"], hasAccreditation: false, featured: true, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-06-07-at-16.27.57.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg"] },
  { slug: "curs-oja-semipermanenta", name: "Curs aplicare ojă semipermanentă", description: "Tehnica completă de aplicare a ojei semipermanente.", priceFrom: 10000, priceTo: 60000, level: "incepator", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de aplicare ojă semipermanentă"], includes: ["Diplomă","Practică pe model real"], dates: ["19 Ianuarie","9 Februarie","9 Martie","27 Aprilie","25 Mai","22 Iunie","20 Iulie","24 August"], hasAccreditation: false, featured: true, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-12.02.48.webp"] },
  { slug: "curs-intretinere-simpla", name: "Curs întreținere simplă", description: "Curs de o zi — tehnica de întreținere simplă.", priceFrom: 10000, priceTo: 80000, level: "incepator", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de întreținere simplă a unghiilor construite"], includes: ["Diplomă","Practică pe model real"], dates: ["23 Ianuarie","13 Februarie","13 Martie","1 Mai","29 Mai","26 Iunie","24 Iulie","27 August"], hasAccreditation: false, featured: true, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/04/4cb4f10b-54c7-4771-b2a9-25278a94234a.jpg"] },
  { slug: "curs-baza-stilist-protezist-unghii-nivel-2", name: "Curs bază stilist protezist unghii — Nivel 2", description: "Continuarea cursului de bază. Tehnici avansate de construcție, french exterior și interior.", priceFrom: 40000, priceTo: 250000, level: "mediu", duration: "5 zile", curriculum: ["Ziua 1: Migdală modernă cu double side pe șablon","Ziua 2: Pătrat arcuit cu french de suprafață","Ziua 3: Migdală modernă cu french pictat pe șablon","Ziua 4: Balerină cu french de interior pe șablon","Ziua 5: Întreținere cu schimbarea arhitecturii cu tipsuri reutilizabile"], includes: ["Diplomă acreditată","Practică pe model real"], dates: ["16-20 Februarie","30 Martie-3 Aprilie","4-8 Mai","1-5 Iunie","29 Iunie-3 Iulie","27-31 Iulie","31 August-4 Septembrie"], hasAccreditation: true, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.35.36.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.35.36.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.00.36-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.16.36.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-2", name: "Curs perfecționare gel — Nivel 2", description: "Perfecționare avansată în tehnicile de gel.", priceFrom: 30000, priceTo: 200000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Oval slim cu tipsuri reutilizabile","Ziua 2: Pătrat arcuit cu french de interior cu tipsuri reutilizabile","Ziua 3: Migdală modernă cu french de interior cu tipsuri reutilizabile"], includes: ["Diplomă","Practică pe model real"], dates: ["16-18 Februarie","30 Martie-3 Aprilie","4-6 Mai","1-3 Iunie","29 Iunie-1 Iulie","27-29 Iulie","31 August-3 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.12.35.jpeg"] },
  { slug: "curs-intretinere-schimbarea-arhitecturii", name: "Curs întreținere cu schimbarea arhitecturii", description: "1 zi, 8-10 ore. Tehnica completă de întreținere cu schimbarea formei.", priceFrom: 15000, priceTo: 100000, level: "mediu", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de întreținere cu schimbarea formei unghiei — 8-10 ore"], includes: ["Diplomă","Practică pe model real"], dates: ["20 Februarie","3 Martie","8 Mai","5 Iunie","3 Iulie","31 Iulie","4 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-06-07-at-16.22.35.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-3", name: "Curs perfecționare gel — Nivel 3", description: "Cel mai avansat nivel. Tehnici de top, forme extreme.", priceFrom: 35000, priceTo: 250000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Migdală gotică pe șablon cu french de interior","Ziua 2: Edge clasic cu french de interior"], includes: ["Diplomă","Practică pe model real"], dates: ["11-13 Mai","17-19 Iunie","15-17 Iulie"], hasAccreditation: false, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/e2138287-df35-4c04-98e6-95ed273f9d78.jpg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/e2138287-df35-4c04-98e6-95ed273f9d78.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.06.31-2.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-12.20.48.webp"] },
  { slug: "curs-fast-tips-manicure", name: "Curs Fast Tips Manicure", description: "Tehnica fast tips — French Glass, pilirea și finisarea.", priceFrom: 20000, priceTo: 120000, level: "mediu", duration: "2 zile", curriculum: ["Ziua 1: Pătrat cu full tips & design pietre","Ziua 2: Natural slim cu smart tips","Ziua 3: Migdală clasică/slim pe șablon"], includes: ["Diplomă","Practică pe model real"], dates: ["15-16 Aprilie","7-8 Mai","4-5 Iunie","2-3 Iulie","30-31 Iulie","3-4 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp","https://academy.emmanails.ro/wp-content/uploads/2024/12/WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg"] },
  { slug: "curs-smart-pedicure", name: "Curs Smart Pedicure — Pedichiură Estetică", description: "Pedichiură estetică modernă.", priceFrom: 25000, priceTo: 160000, level: "mediu", duration: "2 zile", curriculum: ["Ziua 1: Pedichiură estetică — tehnici moderne","Ziua 2: Practică pe model — finisare completă"], includes: ["Diplomă","Practică pe model"], dates: ["2-3 Februarie","23-24 Aprilie","14-15 Mai","8-9 Iunie","13-14 Iulie","3-4 August"], hasAccreditation: true, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.13.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-14.20.53-1.jpeg"] },
  { slug: "curs-pedichiura-complexa", name: "Curs pedichiură complexă", description: "Cel mai complet curs de pedichiură. Unghii încarnate, micoze, bătături, reconstrucție.", priceFrom: 40000, priceTo: 280000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Tehnici de bază pedichiură complexă","Ziua 2: Unghii încarnate, sisteme de corecție","Ziua 3: Micoze, bătături, reconstrucție"], includes: ["Diplomă acreditată","Practică cu 2 modele pe zi"], dates: ["26-28 Ianuarie","23-25 Februarie","20-22 Aprilie","18-20 Mai","10-12 Iunie","6-8 Iulie","17-19 August"], hasAccreditation: true, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/04/957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/04/957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.22.46.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.22.48-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-11-28-at-14.04.02.jpeg"] },
  { slug: "curs-sisteme-corectie", name: "Curs sisteme de corecție", description: "Sisteme moderne de corecție a unghiilor încarnate.", priceFrom: 30000, priceTo: 180000, level: "avansat", duration: "2 zile", curriculum: ["Ziua 1: Sisteme de corecție — teorie și aplicare bracketuri","Ziua 2: Practică pe model — tehnici non-invazive"], includes: ["Diplomă","Practică pe model real"], dates: ["29-30 Ianuarie","26-27 Februarie","21-22 Mai","15-16 Iunie","9-10 Iulie","20-21 August"], hasAccreditation: false, featured: false, imageUrl: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg", images: ["https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg","https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-13.12.17-1.webp"] },
];
