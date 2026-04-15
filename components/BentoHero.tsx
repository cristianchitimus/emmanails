"use client";

import Link from "next/link";
import Image from "next/image";

const CARDS = [
  {
    id: "cursuri",
    href: "/academie",
    image: "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__4_.jpeg",
    imagePosition: "center",
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
    imagePosition: "center 30%",
    label: "Masterclass",
    title: "Învață cu",
    titleAccent: "Emma",
    description: "Grupuri mici, atmosferă caldă.",
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
    imagePosition: "center",
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

/* Large card (left) */
function LargeCard({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <Link
      href={card.href}
      className="group relative overflow-hidden rounded-2xl block aspect-[4/5] md:aspect-auto md:h-full min-h-[400px] md:min-h-[600px] lg:min-h-[680px]"
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover img-zoom"
        style={{ objectPosition: card.imagePosition }}
        sizes="(max-width: 768px) 100vw, 58vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent group-hover:from-dark/90 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <span className="font-body text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2">
          {card.label}
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium text-white leading-[0.95]">
          {card.title}<br />
          <span className="italic text-pink/90">{card.titleAccent}</span>
        </h2>
        <p className="font-body text-sm text-white/50 leading-relaxed mt-3 max-w-sm">
          {card.description}
        </p>
        <div className="flex gap-5 mt-3">
          {card.stats.map((s, i) => (
            <div key={i}>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">{s.value}</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
            {card.cta}
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Small card (right column) */
function SmallCard({ card }: { card: (typeof CARDS)[0] }) {
  return (
    <Link
      href={card.href}
      className="group relative overflow-hidden rounded-2xl block aspect-[16/10] md:aspect-auto md:h-full"
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover img-zoom"
        style={{ objectPosition: card.imagePosition }}
        sizes="(max-width: 768px) 50vw, 42vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/40 to-dark/10 group-hover:from-dark/90 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-7">
        <span className="font-body text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1.5">
          {card.label}
        </span>
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-[0.95]">
          {card.title}<br />
          <span className="italic text-pink/90">{card.titleAccent}</span>
        </h2>
        <p className="font-body text-[11px] md:text-xs text-white/45 leading-relaxed mt-1.5 max-w-xs hidden sm:block">
          {card.description}
        </p>
        <div className="flex gap-3 mt-2">
          {card.stats.map((s, i) => (
            <div key={i}>
              <span className="font-display text-base md:text-lg font-bold text-white">{s.value}</span>
              <p className="font-body text-[6px] md:text-[7px] uppercase tracking-[0.2em] text-white/30 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <span className="inline-flex items-center gap-1.5 font-body text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 px-4 md:px-5 py-2 md:py-2.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
            {card.cta}
            <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Large card — Cursuri (left, 7 cols) */}
          <div className="md:col-span-7">
            <LargeCard card={CARDS[0]} />
          </div>

          {/* Right column — 2 stacked (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            <SmallCard card={CARDS[1]} />
            <SmallCard card={CARDS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
