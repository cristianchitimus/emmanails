// ════════════════════════════════════════════════════════════
// EMMA NAILS — SEED DATA (auto-generated from PDF catalog + docx descriptions)
// Total: ~110 products + 12 courses
// ════════════════════════════════════════════════════════════

// ─── DESCRIPTIONS (from docx files) ───────────────────────
const DESC = {
  rubberBase: "Rubber Base Emma Nails — fundamentul esențial pentru o manichiură tehnică de succes. Concepută special pentru unghiile subțiri, casante sau problematice. Vâscozitate inteligentă ce permite modelarea apexului fără scurgeri. Tehnologie \"Shock-Absorb\" — structură elastică ce absoarbe șocurile mecanice, prevenind fisurile. Autonivelare High-Definition ce corectează denivelările unghiei naturale. Economie de timp: înlocuiește aplicarea culorii, reducând durata procedurii cu până la 20 de minute. Garantează manichiură intactă peste 4 săptămâni.",
  glitterRubber: "Glitter Rubber Base Emma Nails — soluția 2-în-1 care combină rezistența unei baze elastice cu estetica prețioasă a sclipiciului fin. Efect \"Jewel-Tone\" cu particule de sclipici de înaltă densitate, suspendate într-o formulă autonivelantă pentru o reflexie uniformă a luminii. Aderență magnetică cu unghia naturală, eliminând riscul de lifting chiar și pe unghiile subțiri. Micro-particulele sunt integrate perfect în bază, lăsând unghia fină la atingere. Rezistență 4 săptămâni — menține strălucirea particulelor pe toată durata purtării.",
  builderGel: "Builder Gel Emma Nails — pilonul de rezistență în manichiura tehnică modernă. Vâscozitate optimizată care nu curge, permițând realizarea extensiilor lungi cu precizie milimetrică. Tehnologie de polimerizare la rece, minimizând degajarea de căldură. Structură moleculară densă ce previne ruperea sau pierderea formei. Proprietăți excelente de autonivelare — reduce timpul de finisare cu 30%. Culori stabile, fără îngălbenire. HEMA-Free: opțiuni sigure pentru unghii sensibile.",
  builderLiquid: "Builder Liquid Emma Nails — inovația care redefinește eficiența în salon. Gel de construcție \"la sticluță\" cu densitatea necesară pentru întărirea unghiei naturale și fluiditatea ideală pentru tehnica fără pilire. Textură inovatoare care se autonivelează instantaneu, formând o legătură moleculară puternică. Formulă optimizată pentru a minimiza degajarea de căldură, ideală pentru unghii sensibile. Aplicare directă cu pensula din sticlă — elimină necesitatea pensulelor separate.",
  jellyGel: "Jelly Builder Gel Emma Nails — control, stabilitate, arhitectură. Consistență densă de tip jeleu — materialul rămâne exact unde este plasat, fără a migra spre cuticule, indiferent de temperatură. Permite construirea unghiei cu acuratețe milimetrică. Odorless & HEMA-Free: formulă prietenoasă, fără miros puternic, reduce riscul de alergii. Barieră extrem de dură care nu se fisurează, disponibil în nuanțe de camuflaj cu aspect natural și elegant.",
  acrylicLiquid: "Acrylic Extension Liquid Emma Nails — sculptură, densitate, control. Material de înaltă performanță cu formulă avansată ce permite modelare fluidă. Timp de lucru optimizat, aderență chimică superioară, rezistență UV și anti-îngălbenire. Structură de densitate înaltă — manichiură robustă, subțire, cu duritate remarcabilă, ideală și pentru formele lungi. Control absolut al materialului, finit de precizie.",
  topGlitter: "Glitter Vibe Top Coat Emma Nails — finisajul suprem \"No Wipe\" infuzat cu micro-particule strălucitoare într-o formulă ultra-lucioasă. Tehnologie No-Wipe cu luciu instantaneu de oglindă. Densitate omogenă a sclipiciului — acoperire uniformă la o singură pensulare. Barieră anti-zgârieturi și filtru de protecție cromatică. Se autonivelează impecabil, lăsând unghia fină la atingere.",
  topSteel: "Top Clear Steel Emma Nails — sigilare, rezistență, claritate. Finisaj de elită \"No Wipe\" cu formulă inspirată de rezistența oțelului. Scut protector ultra-rigid, luciu vitros impecabil chiar și în condiții de uzură intensă. Imun la micro-zgârieturile zilnice, reflexie a luminii de o claritate superioară care nu pierde intensitatea pe parcursul celor 4 săptămâni. Protejează pigmenții culorii împotriva decolorării și îngălbenirii.",
  topMatte: "Top Velvet Matte Emma Nails — senzorialitate, eleganță, profunzime. Finisaj \"No Wipe\" cu efect mat absolut, eliminând orice reflexie. Textură fină asemănătoare catifelei prețioase, extrem de rezistentă la uzura zilnică. Respinge praful și transferul de culoare de pe haine, menținând manichiura curată 4 săptămâni. Pigmenți de matifiere suspendați într-o formulă stabilă care se aplică uniform, fără dâre.",
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
  price: 7000, category: "baze-rubber-efect", subcategory: "glitter-rubber-base", size: "12ml",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/glitter-rubber-base-front.jpg",
  images: ["/glitter-rubber-base-front.jpg", "/glitter-rubber-base-back.jpg"],
});

const bg = (name: string, line: string, hex: string) => ({
  slug: `builder-gel-${slug(name)}`,
  name: `Builder Gel — ${name}, 30g`,
  description: `${line} (HEMA – TPO FREE). ${DESC.builderGel} Nuanța ${name}.`,
  price: 9500, category: "geluri", subcategory: "builder", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/emma-nails-jar-front.jpg",
  images: ["/emma-nails-jar-front.jpg"],
});

const bl = (name: string, hex: string) => ({
  slug: `balance-builder-liquid-${slug(name)}-12ml`,
  name: `Balance Builder Liquid — ${name}, 12ml`,
  description: `${DESC.builderLiquid} Nuanța ${name}.`,
  price: 7000, category: "geluri", subcategory: "liquid", size: "12ml",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/balance-builder-liquid-front.jpg",
  images: ["/balance-builder-liquid-front.jpg", "/balance-builder-liquid-back.jpg"],
});

const jg = (name: string, hex: string) => ({
  slug: `jelly-gel-${slug(name)}`,
  name: `Jelly Builder Gel — ${name}, 30g`,
  description: `${DESC.jellyGel} Nuanța ${name}.`,
  price: 9500, category: "geluri", subcategory: "jelly", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/emma-nails-jar-front.jpg",
  images: ["/emma-nails-jar-front.jpg"],
});

const al = (name: string, hex: string) => ({
  slug: `acrylic-liquid-${slug(name)}`,
  name: `Acrylic Extension Liquid — ${name}, 30g`,
  description: `${DESC.acrylicLiquid} Nuanța ${name}.`,
  price: 9500, category: "acrygel-liquid", subcategory: "acrygel-liquid", size: "30g",
  inStock: true, featured: false, colorHex: hex,
  imageUrl: "/emma-nails-jar-front.jpg",
  images: ["/emma-nails-jar-front.jpg"],
});

export const products = [
  // ═══════════════════════════════════════════════════════════
  // INSTRUMENTE (14 products — 9 original + 5 Emma's Nails branded)
  // ═══════════════════════════════════════════════════════════
  { slug: "chiureta-dubla-dietter-baumann", name: "Chiuretă dublă Dietter Baumann", description: "Este un instrument dublu, format din 2 capete. Chiuretă dublă profesională Dietter Baumann, ideală pentru îndepărtarea cuticulelor și curățarea matricei unghiale. Oțel inoxidabil chirurgical de calitate superioară germană.", price: 4500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8288.jpg", images: ["/uploads/site-DSC_8288.jpg", "/uploads/site-DSC_8289.jpg"] },
  { slug: "cleste-profesional-dietter-baumann", name: "Clește profesional Dietter Baumann", description: "Clește profesional Dietter Baumann pentru cuticulele. Lame ascuțite din oțel chirurgical german, mâner ergonomic.", price: 16000, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "/uploads/site-DSC_8271.jpg", images: ["/uploads/site-DSC_8271.jpg", "/uploads/site-DSC_8272.jpg", "/uploads/site-WhatsApp-Image-2024-08-22-at-08.09.53-1.jpeg"] },
  { slug: "foarfece-exclusive-staleks", name: "Foarfece Exclusive Staleks", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt ascuțite și subțiri, ușor curbată.", price: 13500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8278.jpg", images: ["/uploads/site-DSC_8278.jpg", "/uploads/site-DSC_8279.jpg", "/uploads/site-forbice-per-cuticole-staleks-exclusive-sx-221-magnolia-21mm.png"] },
  { slug: "foarfece-maniprof-110mm", name: "Foarfece Maniprof 110mm", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. 110mm.", price: 13000, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8273.jpg", images: ["/uploads/site-DSC_8273.jpg", "/uploads/site-DSC_8274.jpg"] },
  { slug: "foarfece-maniprof-97mm", name: "Foarfece Maniprof 97mm", description: "Foarfece pentru cuticulă, taie cu precizie. Lamele sunt drepte, ascuțite și subțiri. 97mm.", price: 13500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8275.jpg", images: ["/uploads/site-DSC_8275.jpg", "/uploads/site-DSC_8277.jpg"] },
  { slug: "instrument-profesional-dietter-baumann-pentru-unghii-incarnate-si-bataturi", name: "Instrument profesional Dietter Baumann pentru unghii încarnate și bătături", description: "Instrument profesional dublu, special conceput pentru tratamentul unghiilor încarnate și bătăturilor. Oțel chirurgical german.", price: 13900, category: "instrumente", subcategory: "instrumente-pedichiura", inStock: true, featured: true, imageUrl: "/uploads/site-DSC_8269.jpg", images: ["/uploads/site-DSC_8269.jpg", "/uploads/site-DSC_8267.jpg"] },
  { slug: "microforfecuta-tweezer-staleks-pro-expert", name: "Microforfecuță — Tweezer Staleks Pro Expert", description: "Instrument pentru manichiură și pedichiură. Lamele sunt ascuțite și subțiri, ușor curbată.", price: 9900, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8280.jpg", images: ["/uploads/site-DSC_8280.jpg", "/uploads/site-DSC_8282.jpg", "/uploads/site-Tijera-para-manicure-Staleks-Expert-90-1-Enails-1-1024x1024-1.jpg"] },
  { slug: "oferta-cleste-foarfece-chiureta", name: "Ofertă clește + foarfece + chiuretă", description: "Set complet la preț special: clește + foarfece + chiuretă.", price: 34500, salePrice: 29500, category: "instrumente", subcategory: "instrumente-set", inStock: true, featured: true, imageUrl: "/uploads/site-DSC_8291.jpg", images: ["/uploads/site-DSC_8291.jpg", "/uploads/site-DSC_8293.jpg"] },
  { slug: "penseta-pedichiura-staleks-pro-podo", name: "Pensetă pedichiură Staleks Pro Podo", description: "Pentru îndepărtarea elementelor unghiilor încarnate din pliurile laterale și bătăturilor subunghiale.", price: 6500, category: "instrumente", subcategory: "instrumente-pedichiura", inStock: true, featured: false, imageUrl: "/uploads/site-DSC_8284.jpg", images: ["/uploads/site-DSC_8284.jpg", "/uploads/site-DSC_8285.jpg"] },

  // ─── INSTRUMENTE EMMA'S NAILS (5 produse noi branded) ─────
  { slug: "spatula-emma-nails", name: "Spatulă Emma's Nails", description: "Spatulă profesională branded Emma's Nails din oțel inoxidabil. Cap plat pentru împingerea cuticulelor și curățarea matricei unghiale. Mâner ergonomic cu logo Emma's Nails gravat. Livrată în cutie cadou neagră cu branding.", price: 5500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "/uploads/instr-DSC_4268.jpg", images: ["/uploads/instr-DSC_4268.jpg", "/uploads/instr-DSC_4271.jpg", "/uploads/instr-DSC_4273.jpg"] },
  { slug: "tweezer-emma-nails", name: "Tweezer Emma's Nails", description: "Microforfecuță tip tweezer profesională branded Emma's Nails. Lamele de precizie cu mecanism arc — taie cuticulele cu exactitate milimetrică. Oțel inoxidabil de înaltă calitate, mâner ergonomic cu grip antiderapant. Livrată în cutie cadou neagră cu branding.", price: 9900, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "/uploads/instr-DSC_4263.jpg", images: ["/uploads/instr-DSC_4263.jpg", "/uploads/instr-DSC_4264.jpg", "/uploads/instr-DSC_4266.jpg"] },
  { slug: "pusher-emma-nails", name: "Pusher Emma's Nails", description: "Pusher profesional dublu branded Emma's Nails. Două capete funcționale cu forme diferite pentru împingerea cuticulelor și curățarea matricei. Mâner cu textură knurled pentru grip maxim. Oțel inoxidabil chirurgical. Livrat în cutie cadou neagră cu branding.", price: 5500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "/uploads/instr-DSC_4456.jpg", images: ["/uploads/instr-DSC_4456.jpg", "/uploads/instr-DSC_4458.jpg", "/uploads/instr-DSC_4459.jpg", "/uploads/instr-DSC_4267.jpg"] },
  { slug: "foarfece-cuticula-emma-nails", name: "Foarfece cuticulă Emma's Nails", description: "Foarfece profesionale pentru cuticulă branded Emma's Nails. Lamele subțiri și ascuțite din oțel inoxidabil, tăietură precisă și curată. Design ergonomic compact, ideal pentru manichiură de precizie. Livrate în cutie cadou neagră cu branding.", price: 12500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: true, imageUrl: "/uploads/instr-DSC_4275.jpg", images: ["/uploads/instr-DSC_4275.jpg", "/uploads/instr-DSC_4274.jpg", "/uploads/instr-DSC_4276.jpg"] },
  { slug: "foarfece-cuticula-emma-nails-xl", name: "Foarfece cuticulă Emma's Nails XL", description: "Foarfece profesionale pentru cuticulă branded Emma's Nails — model XL cu lame mai lungi. Oțel inoxidabil de înaltă calitate, lamele ascuțite permit tăierea precisă a cuticulelor mai groase. Livrate în cutie cadou neagră cu branding.", price: 13500, category: "instrumente", subcategory: "instrumente-manichiura", inStock: true, featured: false, imageUrl: "/uploads/instr-DSC_4261.jpg", images: ["/uploads/instr-DSC_4261.jpg", "/uploads/instr-DSC_4278.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // POLYGEL (19 products — unchanged)
  // ═══════════════════════════════════════════════════════════
  { slug: "polygel-emma-nails", name: "Polygel Emma Nails", description: "Cel mai top produs ever! Cu formulă revoluționară, foarte rezistent și ideal pentru construcția unghiilor pe tips/șablon/la întreținere cu schimbarea arhitecturii/french interior.", price: 8000, category: "polygel", subcategory: "polygel-clasic", size: "30g", inStock: true, featured: true, imageUrl: "/uploads/site-29.jpg", images: ["/uploads/site-29.jpg"] },
  { slug: "polygel-verde", name: "Polygel Verde", description: "PolyGel verde — culoare vibrantă. Cu formulă revoluționară.", price: 3100, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-29.jpg", images: ["/uploads/site-29.jpg"] },
  { slug: "polygel-emma-nails-color-01-60g", name: "Polygel Emma Nails Color 01, 60g", description: "Cu o formulă revoluționară, foarte rezistent. Format economic 60g.", price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g", inStock: true, featured: true, imageUrl: "/uploads/site-1.jpg", images: ["/uploads/site-1.jpg"] },
  { slug: "polygel-emma-nails-color-06-30g", name: "Polygel Emma Nails Color 06, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-06.jpg", images: ["/uploads/site-06.jpg"] },
  { slug: "polygel-emma-nails-color-08-30g", name: "Polygel Emma Nails Color 08, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-08.jpg", images: ["/uploads/site-08.jpg"] },
  { slug: "polygel-emma-nails-color-26-30g", name: "Polygel Emma Nails Color 26, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-26.jpg", images: ["/uploads/site-26.jpg"] },
  { slug: "polygel-emma-nails-color-27-60g", name: "Polygel Emma Nails Color 27, 60g", description: "Cu o formulă revoluționară. Format economic 60g.", price: 14000, category: "polygel", subcategory: "polygel-color", size: "60g", inStock: true, featured: false, imageUrl: "/uploads/site-27.jpg", images: ["/uploads/site-27.jpg"] },
  { slug: "polygel-emma-nails-color-29-30g", name: "Polygel Emma Nails Color 29, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-29.jpg", images: ["/uploads/site-29.jpg"] },
  { slug: "polygel-emma-nails-color-30-30g", name: "Polygel Emma Nails Color 30, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-30.jpg", images: ["/uploads/site-30.jpg"] },
  { slug: "polygel-emma-nails-color-32-30g", name: "Polygel Emma Nails Color 32, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-32.jpg", images: ["/uploads/site-32.jpg"] },
  { slug: "polygel-emma-nails-color-34-30g", name: "Polygel Emma Nails Color 34, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-34.jpg", images: ["/uploads/site-34.jpg"] },
  { slug: "polygel-emma-nails-color-44-30g", name: "Polygel Emma Nails Color 44, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-44.jpg", images: ["/uploads/site-44.jpg"] },
  { slug: "polygel-emma-nails-color-45-30g", name: "Polygel Emma Nails Color 45, 30g", description: "Cu o formulă revoluționară, foarte rezistent.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-45.jpg", images: ["/uploads/site-45.jpg"] },
  { slug: "polygel-emma-nails-color-kd2-30g", name: "Polygel Emma Nails Color KD2, 30g", description: "Din colecția specială KD. Cu formulă revoluționară.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-KD2.jpg", images: ["/uploads/site-KD2.jpg"] },
  { slug: "polygel-emma-nails-color-kd3-30g", name: "Polygel Emma Nails Color KD3, 30g", description: "Din colecția specială KD. Cu formulă revoluționară.", price: 8000, category: "polygel", subcategory: "polygel-color", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-KD3.jpg", images: ["/uploads/site-KD3.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-09-30g", name: "Reflective Polygel Emma Nails Color 09, 30g", description: "PolyGel reflectiv cu efect strălucitor spectaculos.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: true, imageUrl: "/uploads/site-09.jpg", images: ["/uploads/site-09.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-19-30g", name: "Reflective Polygel Emma Nails Color 19, 30g", description: "PolyGel reflectiv cu efect strălucitor unic.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-19.jpg", images: ["/uploads/site-19.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-24-30g", name: "Reflective Polygel Emma Nails Color 24, 30g", description: "PolyGel reflectiv cu efect holografic.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-25.jpg", images: ["/uploads/site-25.jpg"] },
  { slug: "reflective-polygel-emma-nails-color-25-30g", name: "Reflective Polygel Emma Nails Color 25, 30g", description: "PolyGel reflectiv cu efect fascinant.", price: 8000, category: "polygel", subcategory: "polygel-reflective", size: "30g", inStock: true, featured: false, imageUrl: "/uploads/site-25.jpg", images: ["/uploads/site-25.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // ACRYGEL LIQUID (7 products — colors from PDF)
  // ═══════════════════════════════════════════════════════════
  { ...al("Soft Nude",   "#F0C4B8"), featured: true },
  al("Soft Lilac",  "#E0C4DC"),
  al("Pink Luna",   "#F0C8D8"),
  al("Amme Touch",  "#E8D4C4"),
  al("Ivory Silk",  "#F0E2D4"),
  al("Blush Nude",  "#E0BAA8"),
  al("Mood Nude",   "#D4AA90"),

  // ═══════════════════════════════════════════════════════════
  // BAZE RUBBER — Rubber Base Coat (7 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  rb("Nude On Point",    "#D4A494"),
  rb("Lilac Mist",      "#C8A8D0"),
  rb("Moon Dust",        "#A8A0B0"),
  rb("White No Limits",  "#E8E4E0"),
  rb("Sand That's Hot",  "#D4BCA0"),
  rb("Rose Heartbeat",   "#D88898"),
  rb("Pink Queen Mode",  "#CC6888"),

  // ═══════════════════════════════════════════════════════════
  // BAZE RUBBER — Glitter Rubber Base (31 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  grb("White Keep Shining", "#E8E0D8"),
  grb("Velvet Dream",       "#7A5870"),
  grb("Bronze Moment",      "#A08068"),
  grb("White No Limits",    "#E8E2DA"),
  grb("White Manifest",     "#E6DED6"),
  grb("Anto's Love",        "#CCA098"),
  grb("Blush Mirage",       "#B88098"),
  grb("Blue Drip Queen",    "#6888A8"),
  grb("Silver Luxe",        "#B8B4C0"),
  grb("Kiwi Influence",     "#908068"),
  grb("White Vision",       "#ECE6E2"),
  grb("Lecel Up Nude",      "#D0B498"),
  grb("Money Mood",         "#BCA068"),
  grb("White Grace",        "#ECEAE6"),
  grb("Green Mirage",       "#8CA38E"),
  grb("Desert Glow",        "#CCA084"),
  grb("Grey On Repeat",     "#A09898"),
  grb("Pink Hug",           "#E0B0B8"),
  grb("Sunset Bronze",      "#B08870"),
  grb("Pearl Kiss",         "#D8CAC0"),
  grb("Nude Reflection",    "#C8B0A4"),
  grb("Rose Affection",     "#D48898"),
  grb("Turcoaz Pearl",      "#78B0B0"),
  grb("Platinum Poise",     "#C0B8C0"),
  grb("Shine Up",           "#D0C088"),
  grb("Adore Gold",         "#C4A058"),
  grb("Sun Kiss",           "#CCA868"),
  grb("White Bliss",        "#E8E4DE"),
  grb("Gold Power",         "#B89848"),
  grb("Vero Rose",          "#C88090"),
  grb("Ice Lilac",          "#C8B8D0"),

  // ═══════════════════════════════════════════════════════════
  // GELURI — Self-leveling Fit Gel (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "self-leveling-fit-gel-12ml", name: "Self-leveling Fit Gel — Clear Promise, 12ml", description: `${DESC.builderLiquid} Nuanța Clear Promise — transparență cristalină.`, price: 7000, category: "geluri", subcategory: "liquid", size: "12ml", inStock: true, featured: false, colorHex: "#E6DED4", imageUrl: "/self-leveling-fit-gel-front.jpg", images: ["/self-leveling-fit-gel-front.jpg", "/self-leveling-fit-gel-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // GELURI — Balance Builder Liquid (5 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  bl("White Please",  "#ECE6DE"),
  bl("Nude Sandy",    "#D4A888"),
  bl("Pink Gloss",    "#E89098"),
  bl("Nude Forever",  "#D8A898"),
  bl("Pink Boss",     "#E06080"),

  // ═══════════════════════════════════════════════════════════
  // GELURI — Builder Gel (16 shades — fixed Lara Grace)
  // ═══════════════════════════════════════════════════════════
  bg("White Wonder",  "Harmony Builder Gel",          "#EAE2DA"),
  bg("Nude Soft",     "Harmony Builder Gel",          "#E4CEC0"),
  bg("Still White",   "Mood Cover Builder Gel",       "#F2EDE8"),
  bg("Moon Shimmer",  "Glow Moment Builder Gel",      "#D4C4CC"),
  bg("Soul Sisters",  "Glow Moment Builder Gel",      "#D8C0D0"),
  bg("Pearl Touch",   "Fairy Kiss Builder Gel",       "#E8DCD4"),
  bg("Pink Promise",  "Fairy Kiss Builder Gel",       "#E8A8BC"),
  bg("Lilac Anne",    "Fairy Kiss Builder Gel",       "#B898C0"),
  bg("Metal Bloom",   "Diamond Boss Builder Gel",     "#C8AEB0"),
  bg("Allè Vibes",    "Diamond Boss Builder Gel",     "#C4B8C4"),
  bg("Cosmic Chrome", "Diamond Boss Builder Gel",     "#D0B0A8"),
  bg("Pink Filter",   "Pearl Soft Mode Builder Gel",  "#E8D0D8"),
  bg("My Alma",       "Pearl Soft Mode Builder Gel",  "#DFC0B0"),
  bg("Beige Cuddle",  "Pearl Soft Mode Builder Gel",  "#E0CCC8"),
  bg("Lara Grace",    "Pearl Soft Mode Builder Gel",  "#E4DCD4"),
  bg("Blue Chill",    "Pearl Soft Mode Builder Gel",  "#B8C8C4"),

  // ═══════════════════════════════════════════════════════════
  // GELURI — Jelly Builder Gel (5 shades)
  // ═══════════════════════════════════════════════════════════
  jg("Jelly Milk",       "#F0E8DF"),
  jg("Jelly Rose",       "#E8A8B0"),
  jg("Nude In Control",  "#D0A0A4"),
  jg("Nude Delight",     "#E0C4B4"),
  jg("Liliac Sand",      "#C4A8C0"),

  // ═══════════════════════════════════════════════════════════
  // TOPURI — Glitter Vibe (3 shades from PDF)
  // ═══════════════════════════════════════════════════════════
  { slug: "glitter-vibe-top-coat-true-silver-12ml", name: "Glitter Vibe Top Coat — True Silver, 12ml", description: `${DESC.topGlitter} Nuanța True Silver — argint strălucitor.`, price: 7000, category: "topuri", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#C0BCC4", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },
  { slug: "glitter-vibe-top-coat-diamond-mist-12ml", name: "Glitter Vibe Top Coat — Diamond Mist, 12ml", description: `${DESC.topGlitter} Nuanța Diamond Mist — ceață de diamant.`, price: 7000, category: "topuri", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#D4CCD4", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },
  { slug: "glitter-vibe-top-coat-moon-glow-12ml", name: "Glitter Vibe Top Coat — Moon Glow, 12ml", description: `${DESC.topGlitter} Nuanța Moon Glow — strălucire lunară.`, price: 7000, category: "topuri", subcategory: "glitter-vibe-top", size: "12ml", inStock: true, featured: false, colorHex: "#D4CCC0", imageUrl: "/glitter-vibe-top-coat-front.jpg", images: ["/glitter-vibe-top-coat-front.jpg", "/glitter-vibe-top-coat-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // TOPURI — Clear Steel (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "clear-steel-top-coat-12ml", name: "Clear Steel Top Coat — Clear Touch, 12ml", description: `${DESC.topSteel} Nuanța Clear Touch — claritate absolută.`, price: 7000, category: "topuri", subcategory: "clear-steel-top", size: "12ml", inStock: true, featured: false, colorHex: "#E4E0DC", imageUrl: "/clear-steel-top-coat-front.jpg", images: ["/clear-steel-top-coat-front.jpg", "/clear-steel-top-coat-back.jpg"] },

  // ═══════════════════════════════════════════════════════════
  // TOPURI — Velvet Matte (1 shade)
  // ═══════════════════════════════════════════════════════════
  { slug: "velvet-matte-top-coat-12ml", name: "Velvet Matte Top Coat — Velvet Touch, 12ml", description: `${DESC.topMatte} Nuanța Velvet Touch — catifea pură.`, price: 7000, category: "topuri", subcategory: "velvet-matte-top", size: "12ml", inStock: true, featured: false, colorHex: "#E6E0DA", imageUrl: "/velvet-matte-top-coat-front.jpg", images: ["/velvet-matte-top-coat-front.jpg", "/velvet-matte-top-coat-back.jpg"] },
];

// ═══════════════════════════════════════════════════════════
// COURSES (12 — unchanged)
// ═══════════════════════════════════════════════════════════
export const courses = [
  { slug: "curs-baza-stilist-protezist-unghii-nivel-1", name: "Curs bază stilist protezist unghii — Nivel 1", description: "Cursul ideal pentru începătoare. 5 zile intensive de teorie + practică pe model real.", priceFrom: 40000, priceTo: 270000, level: "incepator", duration: "5 zile", curriculum: ["Ziua 1: Teorie — Anatomia unghiei, patologie, norme de igienă","Ziua 1: Aplicarea ojei semipermanente în tehnica fără pilire","Ziua 2: Oval slim cu tipsuri full (fără apex) — design pietre","Ziua 3: Pătrat cu full tips & design pietre","Ziua 4: Migdală clasică pe șablon — Babyboomer","Ziua 5: French de suprafață & realizare portofoliu foto"], includes: ["Diplomă acreditată","Practică pe model real","Suport de curs","Consultanță post-curs"], dates: ["19-23 Ianuarie","9-13 Februarie","9-13 Martie","27 Aprilie-01 Mai","25-29 Mai","22-26 Iunie","20-24 Iulie","24-27 August"], hasAccreditation: true, featured: true, imageUrl: "/uploads/academy-WhatsApp-Image-2025-11-04-at-21.36.26.jpeg", images: ["/uploads/academy-WhatsApp-Image-2025-06-09-at-11.19.42-1.webp","/uploads/academy-WhatsApp-Image-2025-08-23-at-13.21.50.jpeg","/uploads/academy-WhatsApp-Image-2025-11-04-at-21.36.26.jpeg","/uploads/academy-WhatsApp-Image-2025-11-04-at-21.59.52-1-1.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-1", name: "Curs perfecționare gel — Nivel 1", description: "Perfecționare pentru cele care au terminat cursul de bază.", priceFrom: 25000, priceTo: 180000, level: "mediu", duration: "2-3 zile", curriculum: ["Ziua 1: Oval slim cu tipsuri full (fără apex)","Ziua 2: Pătrat natural cu tipsuri smart","Ziua 3: Migdală clasică pe șablon — Babyboomer"], includes: ["Diplomă","Practică pe model real"], dates: ["20-21 Ianuarie","10-12 Februarie","10-12 Martie","28-30 Aprilie","26-28 Mai","23-25 Iunie","21-23 Iulie","25-26 August"], hasAccreditation: false, featured: true, imageUrl: "/uploads/academy-WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-04-16-at-10.32.35-1.jpeg","/uploads/academy-WhatsApp-Image-2024-06-07-at-16.27.57.jpeg","/uploads/academy-WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg"] },
  { slug: "curs-oja-semipermanenta", name: "Curs aplicare ojă semipermanentă", description: "Tehnica completă de aplicare a ojei semipermanente.", priceFrom: 10000, priceTo: 60000, level: "incepator", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de aplicare ojă semipermanentă"], includes: ["Diplomă","Practică pe model real"], dates: ["19 Ianuarie","9 Februarie","9 Martie","27 Aprilie","25 Mai","22 Iunie","20 Iulie","24 August"], hasAccreditation: false, featured: true, imageUrl: "/uploads/academy-WhatsApp-Image-2024-04-16-at-11.33.22.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-04-16-at-11.33.22.jpeg","/uploads/academy-WhatsApp-Image-2025-06-09-at-12.02.48.webp"] },
  { slug: "curs-intretinere-simpla", name: "Curs întreținere simplă", description: "Curs de o zi — tehnica de întreținere simplă.", priceFrom: 10000, priceTo: 80000, level: "incepator", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de întreținere simplă a unghiilor construite"], includes: ["Diplomă","Practică pe model real"], dates: ["23 Ianuarie","13 Februarie","13 Martie","1 Mai","29 Mai","26 Iunie","24 Iulie","27 August"], hasAccreditation: false, featured: true, imageUrl: "/uploads/academy-3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg", images: ["/uploads/academy-3abd0d45-45a2-46dc-9988-e4345e03d24f.jpg","/uploads/academy-4cb4f10b-54c7-4771-b2a9-25278a94234a.jpg"] },
  { slug: "curs-baza-stilist-protezist-unghii-nivel-2", name: "Curs bază stilist protezist unghii — Nivel 2", description: "Continuarea cursului de bază. Tehnici avansate de construcție, french exterior și interior.", priceFrom: 40000, priceTo: 250000, level: "mediu", duration: "5 zile", curriculum: ["Ziua 1: Migdală modernă cu double side pe șablon","Ziua 2: Pătrat arcuit cu french de suprafață","Ziua 3: Migdală modernă cu french pictat pe șablon","Ziua 4: Balerină cu french de interior pe șablon","Ziua 5: Întreținere cu schimbarea arhitecturii cu tipsuri reutilizabile"], includes: ["Diplomă acreditată","Practică pe model real"], dates: ["16-20 Februarie","30 Martie-3 Aprilie","4-8 Mai","1-5 Iunie","29 Iunie-3 Iulie","27-31 Iulie","31 August-4 Septembrie"], hasAccreditation: true, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2024-04-16-at-11.35.36.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-04-16-at-11.35.36.jpeg","/uploads/academy-WhatsApp-Image-2025-11-04-at-21.00.36-1.jpeg","/uploads/academy-WhatsApp-Image-2025-11-04-at-21.16.36.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-2", name: "Curs perfecționare gel — Nivel 2", description: "Perfecționare avansată în tehnicile de gel.", priceFrom: 30000, priceTo: 200000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Oval slim cu tipsuri reutilizabile","Ziua 2: Pătrat arcuit cu french de interior cu tipsuri reutilizabile","Ziua 3: Migdală modernă cu french de interior cu tipsuri reutilizabile"], includes: ["Diplomă","Practică pe model real"], dates: ["16-18 Februarie","30 Martie-3 Aprilie","4-6 Mai","1-3 Iunie","29 Iunie-1 Iulie","27-29 Iulie","31 August-3 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2025-11-04-at-21.05.20.jpeg", images: ["/uploads/academy-WhatsApp-Image-2025-11-04-at-21.05.20.jpeg","/uploads/academy-WhatsApp-Image-2025-11-04-at-21.12.35.jpeg"] },
  { slug: "curs-intretinere-schimbarea-arhitecturii", name: "Curs întreținere cu schimbarea arhitecturii", description: "1 zi, 8-10 ore. Tehnica completă de întreținere cu schimbarea formei.", priceFrom: 15000, priceTo: 100000, level: "mediu", duration: "1 zi", curriculum: ["Ziua 1: Tehnica completă de întreținere cu schimbarea formei unghiei — 8-10 ore"], includes: ["Diplomă","Practică pe model real"], dates: ["20 Februarie","3 Martie","8 Mai","5 Iunie","3 Iulie","31 Iulie","4 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg","/uploads/academy-WhatsApp-Image-2024-06-07-at-16.22.35.jpeg"] },
  { slug: "curs-perfectionare-gel-nivel-3", name: "Curs perfecționare gel — Nivel 3", description: "Cel mai avansat nivel. Tehnici de top, forme extreme.", priceFrom: 35000, priceTo: 250000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Migdală gotică pe șablon cu french de interior","Ziua 2: Edge clasic cu french de interior"], includes: ["Diplomă","Practică pe model real"], dates: ["11-13 Mai","17-19 Iunie","15-17 Iulie"], hasAccreditation: false, featured: false, imageUrl: "/uploads/academy-e2138287-df35-4c04-98e6-95ed273f9d78.jpg", images: ["/uploads/academy-e2138287-df35-4c04-98e6-95ed273f9d78.jpg","/uploads/academy-WhatsApp-Image-2024-04-25-at-22.06.31-2.jpeg","/uploads/academy-WhatsApp-Image-2025-06-09-at-12.20.48.webp"] },
  { slug: "curs-fast-tips-manicure", name: "Curs Fast Tips Manicure", description: "Tehnica fast tips — French Glass, pilirea și finisarea.", priceFrom: 20000, priceTo: 120000, level: "mediu", duration: "2 zile", curriculum: ["Ziua 1: Pătrat cu full tips & design pietre","Ziua 2: Natural slim cu smart tips","Ziua 3: Migdală clasică/slim pe șablon"], includes: ["Diplomă","Practică pe model real"], dates: ["15-16 Aprilie","7-8 Mai","4-5 Iunie","2-3 Iulie","30-31 Iulie","3-4 Septembrie"], hasAccreditation: false, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2025-06-09-at-10.41.15-1.webp", images: ["/uploads/academy-WhatsApp-Image-2025-06-09-at-10.41.15-1.webp","/uploads/academy-WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg"] },
  { slug: "curs-smart-pedicure", name: "Curs Smart Pedicure — Pedichiură Estetică", description: "Pedichiură estetică modernă.", priceFrom: 25000, priceTo: 160000, level: "mediu", duration: "2 zile", curriculum: ["Ziua 1: Pedichiură estetică — tehnici moderne","Ziua 2: Practică pe model — finisare completă"], includes: ["Diplomă","Practică pe model"], dates: ["2-3 Februarie","23-24 Aprilie","14-15 Mai","8-9 Iunie","13-14 Iulie","3-4 August"], hasAccreditation: true, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2024-04-25-at-22.00.14.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-04-25-at-22.00.13.jpeg","/uploads/academy-WhatsApp-Image-2024-04-25-at-22.00.14.jpeg","/uploads/academy-WhatsApp-Image-2024-07-10-at-14.20.53-1.jpeg"] },
  { slug: "curs-pedichiura-complexa", name: "Curs pedichiură complexă", description: "Cel mai complet curs de pedichiură. Unghii încarnate, micoze, bătături, reconstrucție.", priceFrom: 40000, priceTo: 280000, level: "avansat", duration: "3 zile", curriculum: ["Ziua 1: Tehnici de bază pedichiură complexă","Ziua 2: Unghii încarnate, sisteme de corecție","Ziua 3: Micoze, bătături, reconstrucție"], includes: ["Diplomă acreditată","Practică cu 2 modele pe zi"], dates: ["26-28 Ianuarie","23-25 Februarie","20-22 Aprilie","18-20 Mai","10-12 Iunie","6-8 Iulie","17-19 August"], hasAccreditation: true, featured: false, imageUrl: "/uploads/academy-957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg", images: ["/uploads/academy-957ceb81-2e15-46a9-b978-a7ac26d8cc51.jpg","/uploads/academy-WhatsApp-Image-2024-07-10-at-15.22.46.jpeg","/uploads/academy-WhatsApp-Image-2024-07-10-at-15.22.48-1.jpeg","/uploads/academy-WhatsApp-Image-2024-11-28-at-14.04.02.jpeg"] },
  { slug: "curs-sisteme-corectie", name: "Curs sisteme de corecție", description: "Sisteme moderne de corecție a unghiilor încarnate.", priceFrom: 30000, priceTo: 180000, level: "avansat", duration: "2 zile", curriculum: ["Ziua 1: Sisteme de corecție — teorie și aplicare bracketuri","Ziua 2: Practică pe model — tehnici non-invazive"], includes: ["Diplomă","Practică pe model real"], dates: ["29-30 Ianuarie","26-27 Februarie","21-22 Mai","15-16 Iunie","9-10 Iulie","20-21 August"], hasAccreditation: false, featured: false, imageUrl: "/uploads/academy-WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg", images: ["/uploads/academy-WhatsApp-Image-2024-07-10-at-15.19.54-1.jpeg","/uploads/academy-WhatsApp-Image-2025-06-09-at-13.12.17-1.webp"] },
];
