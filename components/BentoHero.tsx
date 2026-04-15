"use client";

import Link from "next/link";
import Image from "next/image";

const CARDS = [
  {
    id: "cursuri",
    href: "/academie",
    image: "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__4_.jpeg",
    label: "Cursuri Acreditate",
    title: "Emma Nails",
    titleAccent: "Academy",
    description: "Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.",
    stats: [
      { value: "15+", label: "Ani" },
      { value: "500+", label: "Cursante" },
    ],
    cta: "Vezi Cursurile",
  },
  {
    id: "academie",
    href: "/academie/masterclass-emma-nails",
    image: "/uploads/site-image.jpg",
    label: "Masterclass",
    title: "Învață cu",
    titleAccent: "Emma",
    description: "Cursuri personalizate, grupuri mici, atmosferă caldă.",
    stats: [
      { value: "8", label: "Cursuri" },
      { value: "12", label: "Sesiuni" },
    ],
    cta: "Academie",
  },
  {
    id: "shop",
    href: "/produse",
    image: "/uploads/brand-Foto_031.jpg",
    label: "Magazin Online",
    title: "Produse",
    titleAccent: "Profesionale",
    description: "Geluri, baze, topuri și instrumente — formulă originală.",
    stats: [
      { value: "110+", label: "Produse" },
      { value: "7", label: "Categorii" },
    ],
    cta: "Shop",
  },
];

function BentoCard({
  card,
  className,
  sizes,
  priority = false,
  titleSize = "text-3xl md:text-4xl lg:text-5xl",
}: {
  card: (typeof CARDS)[0];
  className?: string;
  sizes: string;
  priority?: boolean;
  titleSize?: string;
}) {
  return (
    <Link
      href={card.href}
      className={`group relative overflow-hidden rounded-2xl block ${className || ""}`}
    >
      {/* Image */}
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover img-zoom"
        sizes={sizes}
        priority={priority}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent group-hover:from-dark/85 transition-all duration-500" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-7 lg:p-8">
        {/* Label */}
        <span className="font-body text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">
          {card.label}
        </span>

        {/* Title */}
        <h2 className={`font-display ${titleSize} font-medium text-white leading-[0.95] tracking-tight`}>
          {card.title}
          <br />
          <span className="italic text-pink/90">{card.titleAccent}</span>
        </h2>

        {/* Description */}
        <p className="font-body text-xs md:text-sm text-white/50 leading-relaxed mt-2 max-w-xs">
          {card.description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mt-3">
          {card.stats.map((s, i) => (
            <div key={i}>
              <span className="font-display text-lg md:text-xl font-bold text-white">{s.value}</span>
              <p className="font-body text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 font-body text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 px-5 md:px-6 py-2.5 md:py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
            {card.cta}
            <svg
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BentoHero() {
  return (
    <section className="w-full bg-white px-3 md:px-4 pt-3 md:pt-4 pb-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Bento grid: large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Large card — Cursuri (left, spans 7 cols) */}
          <div className="md:col-span-7">
            <BentoCard
              card={CARDS[0]}
              className="aspect-[4/5] md:aspect-auto md:h-full min-h-[400px] md:min-h-[600px] lg:min-h-[680px]"
              sizes="(max-width: 768px) 100vw, 58vw"
              priority
              titleSize="text-4xl md:text-5xl lg:text-6xl"
            />
          </div>

          {/* Right column — 2 stacked cards (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {/* Academie / Masterclass */}
            <BentoCard
              card={CARDS[1]}
              className="aspect-square md:aspect-auto md:h-full"
              sizes="(max-width: 768px) 50vw, 42vw"
              priority
              titleSize="text-2xl md:text-3xl lg:text-4xl"
            />

            {/* Shop / Produse */}
            <BentoCard
              card={CARDS[2]}
              className="aspect-square md:aspect-auto md:h-full"
              sizes="(max-width: 768px) 50vw, 42vw"
              titleSize="text-2xl md:text-3xl lg:text-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
