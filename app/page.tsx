import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { ScrollScrubHero } from "@/components/ScrollScrubHero";
import { TextWipe } from "@/components/TextWipe";
import { PanelLetterReveal } from "@/components/PanelLetterReveal";
import { CountUp } from "@/components/CountUp";
import { FadeStack } from "@/components/FadeStack";
import { DespreEmmaScrub } from "@/components/DespreEmmaScrub";
import { whatsappLink } from "@/lib/utils";

export const revalidate = 60;

/* Shared wrapper so every panel inside FadeStack fills the pinned stage
   (100vh) and centers its content vertically. This is how the panels stop
   being "scroll-reveal" sections and become "pinned/fading" panels. */
function Panel({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center ${className}`}
      style={style}
    >
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

export default async function HomePage() {
  const [featuredProducts, featuredCourses, productCount, courseCount, heroSettings] =
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
      prisma.siteSetting.findMany({
        where: {
          key: {
            in: [
              "hero_left_image",
              "hero_right_top_image",
              "hero_right_bottom_image",
            ],
          },
        },
      }),
    ]);

  const heroImages: Record<string, string> = {};
  for (const s of heroSettings) heroImages[s.key] = s.value;

  const testimonials = [
    {
      name: "Denisa Olaru",
      photo: "/uploads/testimoniale/denisa-olaru.png",
      text:
        "Am fost extrem de mulțumită de felul în care îmi era explicată fiecare etapă pentru a realiza o manichiură reușită. Emma are un caracter frumos, e înzestrată cu multă răbdare și este o persoană foarte plăcută! Cu siguranță voi mai reveni să învăț tehnici noi. Te îmbrățișez!",
      course: "Cursantă",
    },
    {
      name: "Ecaterina Tanasache",
      photo: "/uploads/testimoniale/ecaterina-tanasache.png",
      text:
        "În aceste 6 zile ale cursului — basic gel — susținut de Emma, m-a făcut să îmi dau seama că meseria cea mai grea, dificilă și cea în care trebuie să ai răbdare de fier este aceasta de manichiurist. Îți mulțumesc frumos, Emma, pentru tot sprijinul și să știi că ești foarte răbdătoare — nu am mai văzut un om așa răbdător și cald.",
      course: "Cursantă",
    },
    {
      name: "Paula Pintilie",
      photo: "/uploads/testimoniale/paula-pintilie.png",
      text:
        "Emma… o persoană dedicată total în ceea ce face, nici o secundă nu ți se pare că muncești pentru că totul e făcut din pasiune. A fost cea mai frumoasă experiență — chiar dacă în prima zi mă întrebam „oare ce mi-a trebuit?!”, la finalul cursului am rămas cu multe informații, o pasiune nou descoperită și o prietenie cu fetele participante. Mulțumesc, Emma! Ești deosebită!",
      course: "Cursantă",
    },
    {
      name: "Mihaela Radu",
      photo: "/uploads/testimoniale/mihaela-radu.jpg",
      text:
        "Nu există persoană mai perfectă în acest domeniu decât Emma!!! O recomand cu drag — este o persoană excelentă, dedicată, caldă, minunată, calmă!!! N-aveți cum să nu învățați să faceți unghii perfecte atâta timp cât vă învață Emma!! Dacă vreți cursuri perfecte, unghii perfecte, le găsiți doar la Emma!!",
      course: "Cursantă",
    },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO — its own 250vh scroll-scrubbed pinned system (unchanged)
      ═══════════════════════════════════════════════════════════════════ */}
      <ScrollScrubHero
        heroLeftImage={heroImages.hero_left_image}
        heroRightTopImage={heroImages.hero_right_top_image}
        heroRightBottomImage={heroImages.hero_right_bottom_image}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          FADE STACK — every section below becomes a pinned, crossfading panel
      ═══════════════════════════════════════════════════════════════════ */}
      <FadeStack heightPerSectionVh={200} slideBand={0.4}>
        {/* ─── 1. Shop + Academie combined (one scroll reveals both) ─── */}
        <Panel
          style={{
            // Match the rest of the panels (was a warmer #fdf6f3 → white →
            // #f5e8e5 which read as gold-tinted vs the cooler cream the other
            // sections use).
            background:
              "linear-gradient(180deg, #ffffff 0%, #faf3f0 50%, #f5e8e5 100%)",
          }}
        >
          <div className="space-y-6 md:space-y-10">
            {/* Shop row */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
                <h2 className="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-dark">
                  <PanelLetterReveal text="Cele mai populare" staggerMs={28} />
                </h2>
                <Link
                  href="/produse"
                  className="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-pink hover:text-dark transition-colors whitespace-nowrap"
                >
                  Vezi toate {productCount} →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

            {/* Academie row */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
                <div>
                  <p className="font-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-pink mb-1">
                    <PanelLetterReveal text="Academie" staggerMs={32} />
                  </p>
                  <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-medium leading-tight">
                    <PanelLetterReveal text="Cursuri " delay={250} staggerMs={38} />
                    <PanelLetterReveal
                      text="profesionale"
                      delay={250 + "Cursuri ".length * 38 + 60}
                      staggerMs={38}
                      className="italic text-pink"
                    />
                  </h2>
                </div>
                <Link
                  href="/academie"
                  className="font-body text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-pink hover:text-dark transition-colors whitespace-nowrap"
                >
                  Toate cele {courseCount} →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* ─── 2. Despre Emma — video scrub + fading text ─── */}
        <DespreEmmaScrub />

        {/* ─── 3. Benefits + Stats combined (one scroll reveals both) ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #faf3f0 50%, #f5e8e5 100%)",
          }}
        >
          <div className="space-y-8 md:space-y-12">
            {/* Benefits row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-8">
              {[
                {
                  icon: "✨",
                  title: "Formulă Originală",
                  desc: "Produse dezvoltate din 15+ ani de experiență în salon",
                },
                {
                  icon: "🎓",
                  title: "Diplomă Acreditată",
                  desc: "Certificare oficială recunoscută național",
                },
                {
                  icon: "👩‍🏫",
                  title: "Practică Reală",
                  desc: "Fiecare cursantă lucrează pe model real",
                },
                {
                  icon: "📦",
                  title: "Livrare Rapidă",
                  desc: "Comenzi procesate în 24h, toată România",
                },
              ].map((item, idx) => (
                <div key={item.title} className="text-center group">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, #f5e8e5 0%, #e8cec5 100%)",
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h3 className="font-body text-sm font-semibold uppercase tracking-wider mb-1">
                    {/* Stagger items horizontally so they reveal left-to-right
                        as a quartet rather than all four firing simultaneously. */}
                    <PanelLetterReveal
                      text={item.title}
                      staggerMs={32}
                      delay={idx * 120}
                    />
                  </h3>
                  <p className="font-body text-xs text-dark-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent" />

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { target: 15, suffix: "+", label: "Ani de Experiență" },
                { target: productCount, suffix: "+", label: "Produse Profesionale" },
                { target: 500, suffix: "+", label: "Cursante Formate" },
                { target: courseCount, suffix: "", label: "Cursuri Disponibile" },
              ].map((s, idx) => (
                <div key={s.label} className="text-center">
                  <CountUp
                    target={s.target}
                    suffix={s.suffix}
                    className="font-display text-3xl md:text-4xl font-bold text-pink"
                  />
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">
                    <PanelLetterReveal
                      text={s.label}
                      staggerMs={28}
                      // Start the labels after the feature row has finished
                      // its own stagger to keep the section's reveal coherent.
                      delay={500 + idx * 100}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* ─── 4. Testimonials (trimmed to 2 to fit 100vh comfortably) ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #fdf6f3 50%, #ffffff 100%)",
          }}
        >
          <div
            className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(183,110,121,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-10 right-10 w-60 h-60 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(217,173,177,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="text-center mb-8 md:mb-10 relative">
            <p className="section-label mb-3">
              <PanelLetterReveal text="Ce spun cursantele" staggerMs={28} />
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              <PanelLetterReveal text="Testimoniale " delay={300} staggerMs={42} />
              <PanelLetterReveal
                text="reale"
                delay={300 + "Testimoniale ".length * 42 + 60}
                staggerMs={48}
                className="italic text-pink"
              />
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 md:p-7 border border-neutral-100 shadow-sm h-full flex flex-col"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <svg
                      key={s}
                      className="w-4 h-4 text-pink"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-sm text-dark-400 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-pink/20 bg-pink/10">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-dark">
                      {t.name}
                    </p>
                    <p className="font-body text-[11px] text-dark-400">
                      {t.course}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ─── 5. Final CTA ─── */}
        <Panel
          className="text-center"
          style={{
            background:
              "linear-gradient(180deg, #fdf6f3 0%, #ffffff 40%, #f5e8e5 100%)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(183,110,121,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(217,173,177,0.2) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight">
              <PanelLetterReveal text="Hai să " staggerMs={50} />
              <PanelLetterReveal
                text="vorbim"
                delay={"Hai să ".length * 50 + 80}
                staggerMs={55}
                className="italic text-pink"
              />
            </h2>
            <p className="font-body text-base md:text-lg text-dark-400 mt-5 max-w-lg mx-auto">
              Fie că ești interesată de produse sau de cursuri, suntem aici
              pentru tine.
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
        </Panel>
      </FadeStack>
    </>
  );
}
