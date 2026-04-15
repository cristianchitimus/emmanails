import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { BentoHero } from "@/components/BentoHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextWipe } from "@/components/TextWipe";
import { GlowLine } from "@/components/GlowLine";
import { CountUp } from "@/components/CountUp";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

const EMMA_PORTRAIT = "/uploads/site-image.jpg";

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
      <BentoHero />

      {/* ═══════════════════════════════════════════════════════
          BEST SELLERS — 4 equal large cards, more spacing
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf6f3 0%, #ffffff 50%, #faf3f0 100%)" }}>
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
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f5e8e5 0%, #f7ece7 30%, #ffffff 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-10 md:mb-14">
              <p className="section-label mb-3"><TextWipe>Academie</TextWipe></p>
              <h2 className="font-display text-3xl md:text-4xl font-medium">
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
          <div className="flex items-center px-8 md:px-16 lg:px-20 py-16 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5e8e5 0%, #e8cec5 30%, #f5e8e5 60%, #faf3f0 100%)" }}>
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="max-w-md">
                <p className="section-label mb-4">Despre Emma</p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
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
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #faf3f0 50%, #f5e8e5 100%)" }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {[
              { icon: "✨", title: "Formulă Originală", desc: "Produse dezvoltate din 15+ ani de experiență în salon" },
              { icon: "🎓", title: "Diplomă Acreditată", desc: "Certificare oficială recunoscută național" },
              { icon: "👩‍🏫", title: "Practică Reală", desc: "Fiecare cursantă lucrează pe model real" },
              { icon: "📦", title: "Livrare Rapidă", desc: "Comenzi procesate în 24h, toată România" },
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="text-center group">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-500" style={{ background: "linear-gradient(135deg, #f5e8e5 0%, #e8cec5 100%)" }}>
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

      <GlowLine />

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdf6f3 50%, #ffffff 100%)" }}>
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(183,110,121,0.06) 0%, transparent 70%)" }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(217,173,177,0.08) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <p className="section-label mb-3"><TextWipe>Ce spun cursantele</TextWipe></p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
                Testimoniale <span className="italic text-pink">reale</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                name: "Denisa Olaru",
                text: "Am fost extrem de mulțumită de felul în care îmi era explicată fiecare etapă pentru a realiza o manichiură reușită. Emma are un caracter frumos. E înzestrată cu multă răbdare și este o persoană foarte plăcută! Cu siguranță voi mai reveni să învăț tehnici noi.",
                course: "Curs bază manichiură",
              },
              {
                name: "Ecaterina Tanasache",
                text: "În aceste 6 zile ale cursului susținut de Emma, m-a făcut să îmi dau seama că meseria cea mai grea, dificilă și cea în care trebuie să ai răbdare de fier este aceasta de manichiurist. Îți mulțumesc frumos, Emma, pentru tot sprijinul — ești foarte răbdătoare, nu am mai văzut un om așa răbdător și cald.",
                course: "Curs perfecționare gel",
              },
              {
                name: "Paula Pintilie",
                text: "Emma\u2026 o persoană dedicată total în ceea ce face, nici o secundă nu ți se pare că muncești pentru că totul e făcut din pasiune. A fost cea mai frumoasă experiență, chiar dacă în prima zi mă întrebam \u00ABoare ce mi-a trebuit?!\u00BB La finalul cursului am rămas cu multe informații, o pasiune nou descoperită și o prietenie cu fetele participante la curs.",
                course: "Curs bază nivel 1",
              },
              {
                name: "Mihaela Radu",
                text: "Nu există persoană mai perfectă în acest domeniu decât Emma! O recomand cu drag, este o persoană excelentă, dedicată, caldă, minunată, calmă! N-aveți cum să nu învățați să faceți unghii perfecte atâta timp cât vă învață Emma! Dacă vreți cursuri perfecte, unghii perfecte le găsiți doar la Emma!",
                course: "Cursantă",
              },
            ].map((t, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-pink" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-body text-sm text-dark-400 leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink/20 to-pink/40 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-sm font-bold text-pink">{t.name.split(" ").map(n => n[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-dark">{t.name}</p>
                      <p className="font-body text-[11px] text-dark-400">{t.course}</p>
                    </div>
                  </div>
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
      <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e8cec5 0%, #f5e8e5 40%, #f3e5f5 100%)" }}>
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
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fdf6f3 0%, #ffffff 40%, #f5e8e5 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(183,110,121,0.12) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(217,173,177,0.2) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <ScrollReveal animation="scale">
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight">
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
