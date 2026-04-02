import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { SplitVideoHero } from "@/components/SplitVideoHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextWipe } from "@/components/TextWipe";
import { GlowLine } from "@/components/GlowLine";
import { CountUp } from "@/components/CountUp";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

const EMMA_PORTRAIT = "/uploads/site-image.jpg";

const GALLERY = [
  "/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
  "/uploads/academy-WhatsApp-Image-2024-04-16-at-11.33.22.jpeg",
  "/uploads/academy-WhatsApp-Image-2025-06-09-at-10.41.15-1.webp",
  "/uploads/academy-WhatsApp-Image-2025-06-09-at-11.47.16-1.webp",
  "/uploads/academy-WhatsApp-Image-2025-06-03-at-11.51.08-7.jpeg",
  "/uploads/academy-WhatsApp-Image-2024-04-25-at-22.00.14.jpeg",
];

export default async function HomePage() {
  const [featuredProducts, featuredCourses, productCount, courseCount] =
    await Promise.all([
      prisma.product.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      prisma.course.findMany({
        where: { featured: true },
        orderBy: { createdAt: "asc" },
        take: 4,
      }),
      prisma.product.count(),
      prisma.course.count(),
    ]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — Split video: Academie (left) + Produse (right)
          Videos cycle with flash-cut effect
      ═══════════════════════════════════════════════════════ */}
      <SplitVideoHero />

      {/* ═══════════════════════════════════════════════════════
          CATEGORY BANNERS — 3 full-width, more spacing
      ═══════════════════════════════════════════════════════ */}
      <section className="py-6 md:py-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fef8fa 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              { title: "SHOP POLYGEL", img: "/uploads/site-1.jpg", href: "/produse?categorie=polygel" },
              { title: "ACRYLIC LIQUID", img: "/acrylic-soft-nude.jpg", href: "/produse?categorie=acrylic-liquid" },
              { title: "INSTRUMENTE", img: "/uploads/site-DSC_8271.jpg", href: "/produse?categorie=instrumente" },
              { title: "ACADEMIE", img: "/uploads/academy-WhatsApp-Image-2025-11-04-at-21.36.26.jpeg", href: "/academie" },
            ].map((cat, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 120}>
                <Link
                  href={cat.href}
                  className="group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-[3/4] block hover-glow-pink"
                >
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover img-zoom"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent group-hover:from-pink/40 transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-body text-sm md:text-base font-semibold text-white uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-500">
                      {cat.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          BEST SELLERS — 4 equal large cards, more spacing
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fef8fa 0%, #ffffff 50%, #fef5f8 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="font-body text-base md:text-lg font-semibold uppercase tracking-[0.25em] text-dark">
                <TextWipe>CELE MAI POPULARE</TextWipe>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {featuredProducts.map((product, i) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={i * 80}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="text-center mt-10 md:mt-14">
              <Link href="/produse" className="btn-secondary">
                Vezi toate {productCount} produse
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          COURSES — Large cards, more spacing
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fce4ec 0%, #ffeef5 30%, #ffffff 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <p className="section-label mb-3"><TextWipe>Academie</TextWipe></p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium">
                <TextWipe delay={200}>Cursuri <span className="italic text-pink">profesionale</span></TextWipe>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuredCourses.map((course, i) => (
              <ScrollReveal key={course.id} animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={i * 100}>
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="text-center mt-10 md:mt-14">
              <Link href="/academie" className="btn-primary">
                Toate cele {courseCount} cursuri
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT EMMA — Full-width split
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[75vh]">
          <ScrollReveal animation="fade-right" className="relative h-[55vh] lg:h-auto overflow-hidden">
            <Image
              src={EMMA_PORTRAIT}
              alt="Emma — nail instructor"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </ScrollReveal>
          <div className="flex items-center px-8 md:px-16 lg:px-20 py-16 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #fce4ec 60%, #fff5f8 100%)" }}>
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="max-w-md">
                <p className="section-label mb-4">Despre Emma</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
                  <TextWipe>Pasiune, <span className="italic text-pink">dedicare</span> și excelență</TextWipe>
                </h2>
                <p className="font-body text-base text-dark-400 leading-relaxed mt-5">
                  Cu peste 15 ani de experiență în industria manichiurii, Emma a
                  format sute de profesioniști. Produsele Emma Nails sunt dezvoltate
                  pe baza nevoilor reale din salon.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <Link href="/despre" className="btn-primary">Citește Povestea</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          BENEFITS — 4 icons
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fef5f8 50%, #fce4ec 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {[
              { icon: "✨", title: "Formulă Originală", desc: "Polygel dezvoltat din 15+ ani de experiență" },
              { icon: "🎓", title: "Diplomă Acreditată", desc: "Certificare oficială recunoscută național" },
              { icon: "👩‍🏫", title: "Practică Reală", desc: "Fiecare cursantă lucrează pe model real" },
              { icon: "📦", title: "Livrare Rapidă", desc: "Comenzi procesate în 24h, toată România" },
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-500" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)" }}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-wider mb-1">{item.title}</h3>
                  <p className="font-body text-xs text-dark-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          GALLERY — More spacing between photos
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fce4ec 0%, #ffffff 40%, #fef8fa 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <p className="section-label mb-3"><TextWipe>@emmanails</TextWipe></p>
              <h2 className="font-display text-4xl md:text-5xl font-medium">
                <TextWipe delay={200}>Lucrări <span className="italic text-pink">reale</span></TextWipe>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY.map((img, i) => (
              <ScrollReveal key={i} animation="scale" delay={i * 80}>
                <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer hover-glow-pink">
                  <Image src={img} alt={`Lucrare ${i + 1}`} fill className="object-cover img-zoom" sizes="(max-width: 768px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/20 transition-colors duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f8bbd0 0%, #fce4ec 40%, #f3e5f5 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { target: 15, suffix: "+", label: "Ani de Experiență" },
              { target: productCount, suffix: "+", label: "Produse Profesionale" },
              { target: 500, suffix: "+", label: "Cursante Formate" },
              { target: courseCount, suffix: "", label: "Cursuri Disponibile" },
            ].map((s, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="text-center">
                  <CountUp target={s.target} suffix={s.suffix} className="font-display text-3xl md:text-4xl font-bold text-pink" />
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fef8fa 0%, #ffffff 40%, #fce4ec 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(212,83,126,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(248,187,208,0.2) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal animation="scale">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              <TextWipe>Hai să <span className="italic text-pink">vorbim</span></TextWipe>
            </h2>
            <p className="font-body text-base md:text-lg text-dark-400 mt-5 max-w-lg mx-auto">
              Fie că ești interesată de produse sau de cursuri, suntem aici pentru tine.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
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
            <Link href="/produse" className="btn-secondary">Shop</Link>
            <Link href="/academie" className="btn-secondary">Academie</Link>
          </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
