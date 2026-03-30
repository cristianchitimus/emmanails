import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductTabs } from "@/components/ProductTabs";
import { CourseCard } from "@/components/CourseCard";
import { HeroSlider } from "@/components/HeroSlider";
import { whatsappLink, formatPrice } from "@/lib/utils";

export const revalidate = 60;

const EMMA_PORTRAIT = "https://emmanails.ro/wp-content/uploads/2025/04/image.jpg";

export default async function HomePage() {
  const [allProducts, featuredProducts, featuredCourses, productCount, courseCount] =
    await Promise.all([
      prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
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
      {/* ═══ HERO SLIDER — Annette-style carousel ═══ */}
      <HeroSlider />

      {/* ═══ CATEGORY BANNERS — Two columns: Produse + Cursuri ═══ */}
      <section className="bg-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/produse"
              className="group relative h-[220px] md:h-[280px] overflow-hidden rounded-sm bg-neutral-100"
            >
              <Image
                src="https://emmanails.ro/wp-content/uploads/2025/05/DSC_8271.jpg"
                alt="Produse"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                  {productCount} produse
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mt-1">
                  Shop Produse
                </h3>
              </div>
            </Link>
            <Link
              href="/academie"
              className="group relative h-[220px] md:h-[280px] overflow-hidden rounded-sm bg-neutral-100"
            >
              <Image
                src="https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg"
                alt="Cursuri"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                  {courseCount} cursuri acreditate
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mt-1">
                  Academie & Cursuri
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCT TABS — Bestsellers / Noutăți / PolyGel / Instrumente ═══ */}
      <ProductTabs allProducts={allProducts} featuredProducts={featuredProducts} />

      {/* ═══ ABOUT EMMA — Clean split ═══ */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto overflow-hidden">
              <Image
                src={EMMA_PORTRAIT}
                alt="Emma — nail instructor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center px-8 md:px-14 lg:px-16 py-14 md:py-20">
              <div className="max-w-md">
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-pink">
                  Despre Emma
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mt-3">
                  Peste 15 ani de experiență în industria nail
                </h2>
                <p className="font-body text-sm text-dark/60 leading-relaxed mt-4">
                  Sunt Emma, nail instructor și fondatoarea Emma Nails. Am format peste 500 de profesioniști și am dezvoltat o gamă proprie de PolyGel cu formulă originală, testată extensiv în salon.
                </p>
                <div className="flex gap-8 mt-6">
                  {[
                    { num: "15+", label: "Ani experiență" },
                    { num: "500+", label: "Cursante" },
                    { num: `${productCount}`, label: "Produse" },
                  ].map((s, i) => (
                    <div key={i}>
                      <span className="font-display text-2xl font-bold text-pink">{s.num}</span>
                      <p className="font-body text-[10px] text-dark/40 uppercase tracking-wider mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  <Link href="/despre" className="btn-secondary text-xs !px-6 !py-3">
                    Citește povestea
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CURSURI — Featured courses ═══ */}
      {featuredCourses.length > 0 && (
        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold">
                Cursuri profesionale
              </h2>
              <Link
                href="/academie"
                className="font-body text-xs font-semibold uppercase tracking-wider text-dark border-b border-dark pb-0.5 hover:text-pink hover:border-pink transition-colors"
              >
                Toate cursurile
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ BENEFITS BAR ═══ */}
      <section className="py-10 md:py-14 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "📦", title: "Livrare rapidă", desc: "Comenzi procesate în 24h" },
              { icon: "🎓", title: "Diplomă acreditată", desc: "Certificare oficială" },
              { icon: "✨", title: "Formulă originală", desc: "Dezvoltată din experiență" },
              { icon: "💬", title: "Suport WhatsApp", desc: "Răspundem rapid" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="text-xl">{item.icon}</span>
                <h3 className="font-body text-xs font-semibold uppercase tracking-wider mt-2">{item.title}</h3>
                <p className="font-body text-[11px] text-dark/40 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Ai întrebări?
          </h2>
          <p className="font-body text-sm text-dark/50 mt-3 max-w-md mx-auto">
            Scrie-mi pe WhatsApp pentru comenzi, informații despre cursuri sau orice altă întrebare.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={whatsappLink("Bună! Aș dori mai multe informații.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Scrie pe WhatsApp
            </a>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
