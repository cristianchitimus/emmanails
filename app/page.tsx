import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { ScrollScrubHero } from "@/components/ScrollScrubHero";
import { TextWipe } from "@/components/TextWipe";
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
      text:
        "Am fost extrem de mulțumită de felul în care îmi era explicată fiecare etapă pentru a realiza o manichiură reușită. Emma are un caracter frumos, e înzestrată cu multă răbdare. Cu siguranță voi mai reveni.",
      course: "Curs bază manichiură",
    },
    {
      name: "Ecaterina Tanasache",
      text:
        "În aceste 6 zile ale cursului susținut de Emma, m-a făcut să îmi dau seama că meseria de manichiurist cere răbdare de fier. Îți mulțumesc, Emma — ești foarte răbdătoare și caldă.",
      course: "Curs perfecționare gel",
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
      <FadeStack heightPerSectionVh={120} overlap={0.35}>
        {/* ─── 1. Best sellers ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(180deg, #fdf6f3 0%, #ffffff 50%, #faf3f0 100%)",
          }}
        >
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-body text-base md:text-lg font-semibold uppercase tracking-[0.25em] text-dark">
              <TextWipe>CELE MAI POPULARE</TextWipe>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <Link href="/produse" className="btn-secondary">
              Vezi toate {productCount} produse
            </Link>
          </div>
        </Panel>

        {/* ─── 2. Cursuri ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(180deg, #f5e8e5 0%, #f7ece7 30%, #ffffff 100%)",
          }}
        >
          <div className="text-center mb-8 md:mb-10">
            <p className="section-label mb-3">
              <TextWipe>Academie</TextWipe>
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              <TextWipe delay={200}>
                Cursuri <span className="italic text-pink">profesionale</span>
              </TextWipe>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <Link href="/academie" className="btn-primary">
              Toate cele {courseCount} cursuri
            </Link>
          </div>
        </Panel>

        {/* ─── 3. Despre Emma — video scrub + fading text ─── */}
        <DespreEmmaScrub />

        {/* ─── 4. Benefits ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(180deg, #ffffff 0%, #faf3f0 50%, #f5e8e5 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
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
            ].map((item) => (
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
                  {item.title}
                </h3>
                <p className="font-body text-xs text-dark-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        {/* ─── 5. Testimonials (trimmed to 2 to fit 100vh comfortably) ─── */}
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
              <TextWipe>Ce spun cursantele</TextWipe>
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
              Testimoniale <span className="italic text-pink">reale</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 relative">
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
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink/20 to-pink/40 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-sm font-bold text-pink">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
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

        {/* ─── 6. Stats ─── */}
        <Panel
          style={{
            background:
              "linear-gradient(135deg, #e8cec5 0%, #f5e8e5 40%, #f3e5f5 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { target: 15, suffix: "+", label: "Ani de Experiență" },
              { target: productCount, suffix: "+", label: "Produse Profesionale" },
              { target: 500, suffix: "+", label: "Cursante Formate" },
              { target: courseCount, suffix: "", label: "Cursuri Disponibile" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  target={s.target}
                  suffix={s.suffix}
                  className="font-display text-3xl md:text-4xl font-bold text-pink"
                />
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        {/* ─── 7. Final CTA ─── */}
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
              <TextWipe>
                Hai să <span className="italic text-pink">vorbim</span>
              </TextWipe>
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
