import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { CourseCard } from "@/components/CourseCard";
import { whatsappLink } from "@/lib/utils";

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
  const [featuredProducts, latestProducts, featuredCourses, productCount, courseCount] =
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
    ]);

  const products = featuredProducts.length >= 4 ? featuredProducts : latestProducts;

  return (
    <>
      <section className="hero-split-shell bg-white">
        <div className="shop-container py-4 md:py-6 lg:py-8">
          <div className="hero-split-grid">
            <Link href="/produse" className="hero-split-card hero-split-card-products group">
              <Image
                src="/hero-products.jpg"
                alt="Produse Emma Nails"
                fill
                priority
                className="hero-split-image object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="hero-split-sheen" />
              <div className="hero-split-overlay" />
              <div className="hero-split-content">
                <span className="hero-split-kicker">Shop</span>
                <h2>Produse Emma Nails</h2>
                <p>Geluri, baze, topuri si instrumente profesionale pentru tehnicieni.</p>
                <span className="hero-split-action">Vezi produsele</span>
              </div>
            </Link>

            <Link href="/academie" className="hero-split-card hero-split-card-courses group">
              <Image
                src="/hero-courses.jpeg"
                alt="Unghii realizate in academia Emma Nails"
                fill
                priority
                className="hero-split-image object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="hero-split-sheen" />
              <div className="hero-split-overlay" />
              <div className="hero-split-content">
                <span className="hero-split-kicker">Academie</span>
                <h2>Cursuri profesionale</h2>
                <p>Tehnici moderne, practica reala si suport pentru fiecare cursanta.</p>
                <span className="hero-split-action">Vezi cursurile</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">Noutati</p>
              <h2 className="shop-title">Produse populare</h2>
            </div>
            <Link href="/produse" className="shop-link">
              Vezi toate {productCount}
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
              <p className="section-label mb-3">Categorii</p>
              <h2 className="shop-title">Descopera gama Emma Nails</h2>
            </div>
            <Link href="/produse" className="shop-link">
              Toate categoriile
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
            <div className="relative aspect-[16/10] overflow-hidden rounded bg-neutral-50 shadow-sm lg:aspect-[4/3]">
              <Image
                src="/about-courses-accredited.jpg"
                alt="Cursuri acreditate Emma Nails"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-xl">
              <p className="section-label mb-3">Despre noi</p>
              <h2 className="shop-title">Brand romanesc pentru tehnicieni de unghii</h2>
              <div className="mt-5 space-y-4 shop-copy">
                <p>
                  Emma Nails combina experienta de salon cu produse testate in lucru real. Gama este construita pentru manichiura curata, rezistenta si usor de repetat.
                </p>
                <p>
                  In academie, cursurile sunt gandite practic: tehnici clare, model real si suport pentru fiecare cursanta.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/despre" className="btn-primary">
                  Descopera Emma Nails
                </Link>
                <a href={whatsappLink("Buna! As dori mai multe informatii despre Emma Nails.")} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  WhatsApp
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
              <p className="section-label mb-3">Academie</p>
              <h2 className="shop-title">Cursuri profesionale</h2>
            </div>
            <Link href="/academie" className="shop-link">
              Toate cursurile {courseCount}
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
              <p className="section-label mb-3">Recenzii</p>
              <h2 className="shop-title">Ce spun clientele</h2>
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
            Suport rapid
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Ai nevoie de recomandari pentru produse sau cursuri?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/70 md:text-base">
            Scrie-ne si te ajutam sa alegi varianta potrivita pentru nivelul tau de lucru.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={whatsappLink("Buna! Am nevoie de o recomandare Emma Nails.")} target="_blank" rel="noopener noreferrer" className="btn-white">
              Scrie pe WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
