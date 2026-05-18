import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { whatsappLink } from "@/lib/utils";
import { getHomepageContent } from "@/lib/homepage-content";

export const revalidate = 60;

const categoryCards = [
  {
    title: "Polygel",
    href: "/produse?categorie=polygel",
    image: "/uploads/al-pink-luna.jpeg",
  },
  {
    title: "Baza Rubber",
    href: "/produse?categorie=baza-rubber",
    image: "/uploads/grb-nude-reflection.jpeg",
  },
  {
    title: "Geluri UV",
    href: "/produse?categorie=geluri-uv",
    image: "/uploads/bg-pink-promise.jpeg",
  },
  {
    title: "Top Coat",
    href: "/produse?categorie=top-coat",
    image: "/velvet-matte-top-coat-front.jpg",
  },
  {
    title: "Instrumente",
    href: "/produse?categorie=instrumente",
    image: "/uploads/brand-Foto_031.jpg",
  },
  {
    title: "Academie",
    href: "/academie",
    image: "/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
  },
];

const benefits = [
  {
    title: "Livrare gratuita",
    text: "Beneficiezi de livrare gratuita pentru comenzile de peste 200 lei.",
  },
  {
    title: "Produse profesionale",
    text: "Gama Emma Nails este selectata pentru tehnicieni si saloane.",
  },
  {
    title: "Cursuri acreditate",
    text: "Academie cu practica pe model real si suport dupa curs.",
  },
  {
    title: "Suport rapid",
    text: "Raspundem pe WhatsApp pentru recomandari si comenzi.",
  },
];

const testimonials = [
  {
    text: "Produsele sunt usor de lucrat, pigmentate si rezistente.",
    name: "Alexandra, nail tech",
  },
  {
    text: "Cursul a fost foarte practic si explicat clar de la inceput la final.",
    name: "Denisa, cursanta",
  },
  {
    text: "Comanda a ajuns rapid, iar nuantele arata exact ca in poze.",
    name: "Mihaela, clienta",
  },
];

export default async function HomePage() {
  const [featuredProducts, latestProducts, featuredCourses, productCount, courseCount, homepage] =
    await Promise.all([
      prisma.product.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.course.findMany({
        where: { featured: true },
        orderBy: { createdAt: "asc" },
        take: 4,
      }),
      prisma.product.count(),
      prisma.course.count(),
      getHomepageContent(),
    ]);

  const products = featuredProducts.length >= 4 ? featuredProducts : latestProducts;

  return (
    <>
      <section className="hero-split-shell bg-white">
        <div className="shop-container py-4 md:py-6 lg:py-8">
          <div className="hero-split-grid">
            <Link href={homepage.hero.products.href} className="hero-split-card hero-split-card-products group">
              <Image
                src={homepage.hero.products.imageUrl}
                alt={homepage.hero.products.imageAlt}
                fill
                priority
                className="hero-split-image object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="hero-split-sheen" />
              <div className="hero-split-overlay" />
              <div className="hero-split-content">
                <span className="hero-split-kicker">{homepage.hero.products.eyebrow}</span>
                <h2>{homepage.hero.products.title}</h2>
                <p>{homepage.hero.products.description}</p>
                <span className="hero-split-action">{homepage.hero.products.ctaLabel}</span>
              </div>
            </Link>

            <Link href={homepage.hero.courses.href} className="hero-split-card hero-split-card-courses group">
              <Image
                src={homepage.hero.courses.imageUrl}
                alt={homepage.hero.courses.imageAlt}
                fill
                priority
                className="hero-split-image object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="hero-split-sheen" />
              <div className="hero-split-overlay" />
              <div className="hero-split-content">
                <span className="hero-split-kicker">{homepage.hero.courses.eyebrow}</span>
                <h2>{homepage.hero.courses.title}</h2>
                <p>{homepage.hero.courses.description}</p>
                <span className="hero-split-action">{homepage.hero.courses.ctaLabel}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">{homepage.sections.products.eyebrow}</p>
              <h2 className="shop-title">{homepage.sections.products.title}</h2>
            </div>
            <Link href="/produse" className="shop-link">
              {homepage.sections.products.linkLabel} {productCount}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 lg:gap-x-7">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section-muted">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">{homepage.sections.categories.eyebrow}</p>
              <h2 className="shop-title">{homepage.sections.categories.title}</h2>
            </div>
            <Link href="/produse" className="shop-link">
              {homepage.sections.categories.linkLabel}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categoryCards.map((card) => (
              <Link key={card.href} href={card.href} className="category-motion-card group block bg-white">
                <div className="premium-media-frame relative aspect-square overflow-hidden rounded">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                </div>
                <p className="mt-3 font-body text-sm font-semibold text-dark transition-colors group-hover:text-pink">
                  {card.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="premium-media-frame relative mx-auto aspect-[4/5] w-full max-w-[620px] overflow-hidden rounded">
              <Image
                src={homepage.about.imageUrl}
                alt={homepage.about.imageAlt}
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-xl">
              <p className="section-label mb-3">{homepage.about.eyebrow}</p>
              <h2 className="shop-title">{homepage.about.title}</h2>
              <div className="mt-5 space-y-4 shop-copy">
                {homepage.about.paragraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph}`}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={homepage.about.primaryHref} className="btn-primary">
                  {homepage.about.primaryLabel}
                </Link>
                <a href={whatsappLink(homepage.about.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  {homepage.about.whatsappLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-white">
        <div className="shop-container grid grid-cols-1 divide-y divide-neutral-100 py-2 md:grid-cols-4 md:divide-x md:divide-y-0">
          {benefits.map((item) => (
            <div key={item.title} className="px-2 py-8 text-center md:px-6">
              <h3 className="font-body text-sm font-semibold uppercase text-dark" style={{ letterSpacing: "0.12em" }}>
                {item.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-dark-400">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">{homepage.sections.courses.eyebrow}</p>
              <h2 className="shop-title">{homepage.sections.courses.title}</h2>
            </div>
            <Link href="/academie" className="shop-link">
              {homepage.sections.courses.linkLabel} {courseCount}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 lg:gap-x-7">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section-muted">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">{homepage.sections.reviews.eyebrow}</p>
              <h2 className="shop-title">{homepage.sections.reviews.title}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="shop-card p-6">
                <div className="mb-4 flex gap-1 text-pink" aria-hidden="true">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
                <blockquote className="font-body text-sm leading-relaxed text-dark-500">
                  “{item.text}”
                </blockquote>
                <figcaption className="mt-5 font-body text-sm font-semibold text-dark">
                  {item.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section bg-dark text-white">
        <div className="shop-container text-center">
          <p className="mb-3 font-body text-[11px] font-semibold uppercase text-white/60" style={{ letterSpacing: "0.18em" }}>
            {homepage.sections.finalCta.eyebrow}
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            {homepage.sections.finalCta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/70 md:text-base">
            {homepage.sections.finalCta.description}
          </p>
          <div className="mt-8 flex justify-center">
            <a href={whatsappLink(homepage.sections.finalCta.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-white">
              {homepage.sections.finalCta.buttonLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
