import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { whatsappLink, formatPrice } from "@/lib/utils";

export const revalidate = 60;

const EMMA_PORTRAIT = "https://emmanails.ro/wp-content/uploads/2025/04/image.jpg";

const HERO_NAILS = [
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.05.20.jpeg",
];

const GALLERY = [
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-16-at-11.33.22.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-06-09-at-11.47.16-1.webp",
  "https://academy.emmanails.ro/wp-content/uploads/2024/12/WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg",
  "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-04-25-at-22.00.14.jpeg",
];

export default async function HomePage() {
  const [featuredProducts, featuredCourses, productCount, courseCount] =
    await Promise.all([
      prisma.product.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.course.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.product.count(),
      prisma.course.count(),
    ]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — WHITE + PINK, Glamnetic style
          Full width, light background, big image on the right
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-white via-pink-50/40 to-nude-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text side */}
            <div className="space-y-7 animate-fade-in-up stagger-child" style={{ animationFillMode: "forwards" }}>
              <p className="section-label">Emma Nails — Iași, România</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-[4.5rem] font-medium leading-[1.05] text-dark">
                Frumusețea{" "}
                <span className="italic text-pink">profesională</span>{" "}
                începe aici
              </h1>
              <p className="font-body text-base md:text-lg text-dark-400 max-w-md leading-relaxed">
                Polygel cu formulă originală, instrumente premium și cursuri
                acreditate de manichiură. Peste 15 ani de experiență.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/produse" className="btn-primary">
                  Shop Acum
                </Link>
                <Link href="/academie" className="btn-secondary">
                  Vezi Cursurile
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex gap-8 pt-4">
                {[
                  { num: "15+", label: "Ani experiență" },
                  { num: `${productCount}`, label: "Produse" },
                  { num: `${courseCount}`, label: "Cursuri" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <span className="font-display text-2xl md:text-3xl font-bold text-pink">{s.num}</span>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-dark-300 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image side — bento grid */}
            <div className="grid grid-cols-2 gap-3 h-[420px] md:h-[520px] lg:h-[580px] animate-slide-left stagger-child" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <Image
                  src={HERO_NAILS[0]}
                  alt="Manichiură profesională"
                  fill
                  className="object-cover animate-zoom-slow"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={HERO_NAILS[1]}
                  alt="Nail art Emma Nails"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={HERO_NAILS[2]}
                  alt="Curs manichiură"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-nude-300/20 rounded-full blur-3xl" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          CATEGORY CARDS — Glamnetic "Shop by" row
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "PolyGel", desc: "Formulă originală", img: "https://emmanails.ro/wp-content/uploads/2025/05/1.jpg", href: "/produse?categorie=polygel" },
              { title: "Instrumente", desc: "Calitate profesională", img: "https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg", href: "/produse?categorie=instrumente" },
              { title: "Cursuri", desc: "Cu diplomă acreditată", img: "https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2025-11-04-at-21.36.26.jpeg", href: "/academie" },
              { title: "Despre Emma", desc: "15+ ani experiență", img: EMMA_PORTRAIT, href: "/despre" },
            ].map((cat, i) => (
              <Link
                key={i}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] card-hover"
              >
                <Image src={cat.img} alt={cat.title} fill className="object-cover img-zoom" sizes="(max-width: 768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl font-medium text-white">{cat.title}</h3>
                  <p className="font-body text-[11px] text-white/70 uppercase tracking-wider mt-1">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FEATURED PRODUCTS — Big grid on white
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-label mb-3">Magazin</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium">
              Cele mai <span className="italic text-pink">populare</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className={idx === 0 ? "col-span-2 row-span-2" : ""}>
                <ProductCard product={product} featured={idx === 0} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/produse" className="btn-secondary">
              Vezi toate {productCount} produse
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PINK BANNER — Full width CTA (Glamnetic style)
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-pink py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-60 h-60 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 mb-3">Emma Nails Academy</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
            Începe-ți cariera în beauty
          </h2>
          <p className="font-body text-base text-white/70 mt-4 max-w-md mx-auto">
            Cursuri acreditate cu diplomă. De la nivel începător la avansat.
          </p>
          <div className="mt-8">
            <Link href="/academie" className="btn-white">
              Vezi Cursurile
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COURSES — On light nude background
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-nude-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-label mb-3">Academie</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium">
              Cursuri <span className="italic text-pink">profesionale</span>
            </h2>
            <p className="font-body text-base text-dark-400 mt-4 max-w-lg mx-auto">
              Practică pe model real, sub îndrumarea directă a Emmei.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/academie" className="btn-primary">
              Toate cele {courseCount} cursuri
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW IT WORKS — Glamnetic "steps" section
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-3">De ce Emma Nails</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">
              De ce ne <span className="italic text-pink">aleg</span> profesioniștii
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { step: "01", icon: "✨", title: "Formulă Originală", desc: "Polygel dezvoltat pe baza a 15+ ani de experiență directă în salon" },
              { step: "02", icon: "🎓", title: "Diplomă Acreditată", desc: "Cursuri cu certificare oficială recunoscută la nivel național" },
              { step: "03", icon: "👩‍🏫", title: "Practică Reală", desc: "Fiecare cursantă lucrează pe model real cu feedback personalizat" },
              { step: "04", icon: "📦", title: "Livrare Rapidă", desc: "Comenzi procesate în 24h cu livrare în toată România" },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-100 transition-colors duration-500 group-hover:scale-110">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-pink">{item.step}</span>
                <h3 className="font-display text-lg font-medium mt-2 mb-2">{item.title}</h3>
                <p className="font-body text-sm text-dark-400 leading-relaxed max-w-[200px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT EMMA — Split section, light
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-nude-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
          {/* Image */}
          <div className="relative h-[50vh] lg:h-auto overflow-hidden">
            <Image
              src={EMMA_PORTRAIT}
              alt="Emma — nail instructor"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="flex items-center px-8 md:px-16 lg:px-20 py-14 md:py-20">
            <div className="max-w-md">
              <p className="section-label mb-4">Despre Emma</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                Pasiune, <span className="italic text-pink">dedicare</span> și excelență
              </h2>
              <p className="font-body text-base text-dark-400 leading-relaxed mt-5">
                Cu peste 15 ani de experiență, Emma a format sute de
                profesioniști. Produsele Emma Nails sunt dezvoltate pe baza
                nevoilor reale din salon.
              </p>
              <div className="flex gap-8 mt-7">
                {[
                  { num: "15+", label: "Ani" },
                  { num: "500+", label: "Cursante" },
                ].map((s, i) => (
                  <div key={i}>
                    <span className="font-display text-3xl font-bold text-pink">{s.num}</span>
                    <p className="font-body text-[10px] uppercase tracking-[0.2em] text-dark-300 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/despre" className="btn-primary">
                  Citește Povestea
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          GALLERY — Instagram-style grid
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">@emmanails</p>
            <h2 className="font-display text-4xl md:text-5xl font-medium">
              Lucrări <span className="italic text-pink">reale</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {GALLERY.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                <Image src={img} alt={`Emma Nails lucrare ${i + 1}`} fill className="object-cover img-zoom" sizes="(max-width: 768px) 33vw, 16vw" />
                <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/20 transition-colors duration-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRUST / REVIEWS strip
      ═══════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-16 bg-pink-50/50 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "15+", label: "Ani de Experiență" },
              { num: `${productCount}+`, label: "Produse Profesionale" },
              { num: "500+", label: "Cursante Formate" },
              { num: `${courseCount}`, label: "Cursuri Disponibile" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-3xl md:text-4xl font-bold text-pink">{s.num}</span>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA — Light with pink accent
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-nude-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Hai să <span className="italic text-pink">vorbim</span>
          </h2>
          <p className="font-body text-base md:text-lg text-dark-400 mt-5 max-w-lg mx-auto">
            Fie că ești interesată de produse sau de cursuri, suntem aici pentru tine.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={whatsappLink("Bună! Aș dori mai multe informații.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Scrie pe WhatsApp
            </a>
            <Link href="/produse" className="btn-secondary">
              Shop
            </Link>
            <Link href="/academie" className="btn-secondary">
              Academie
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
