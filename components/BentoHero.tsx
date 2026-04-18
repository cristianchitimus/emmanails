"use client";

import Link from "next/link";
import Image from "next/image";

interface BentoHeroProps {
  heroLeftImage?: string;
  heroRightTopImage?: string;
  heroRightBottomImage?: string;
}

const DEFAULT_IMAGES = {
  left: "/uploads/portfolio-WhatsApp_Image_2026-04-07_at_17_58_35__4_.jpeg",
  rightTop: "/uploads/site-image.jpg",
  rightBottom: "/uploads/brand-Foto_031.jpg",
};

/* Large card (left) */
function LargeCard({ image }: { image: string }) {
  return (
    <Link
      href="/academie"
      className="group relative overflow-hidden rounded-2xl block aspect-[4/5] md:aspect-auto md:h-full min-h-[400px] md:min-h-[600px] lg:min-h-[680px]"
    >
      <Image
        src={image}
        alt="Emma Nails Academy"
        fill
        className="object-cover img-zoom"
        sizes="(max-width: 768px) 100vw, 58vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/25 to-transparent group-hover:from-dark/90 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
        <div className="hidden md:block">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 mb-2 block">
            Cursuri Acreditate
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium text-white leading-[0.95]">
            Emma Nails<br />
            <span className="italic text-pink/90">Academy</span>
          </h2>
          <p className="font-body text-sm text-white/50 leading-relaxed mt-3 max-w-sm">
            Peste 15 ani de experiență. Diplomă acreditată, practică pe model real.
          </p>
          <div className="flex gap-5 mt-3">
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">15+</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Ani</p>
            </div>
            <div>
              <span className="font-display text-xl lg:text-2xl font-bold text-white">500+</span>
              <p className="font-body text-[8px] uppercase tracking-[0.2em] text-white/30 mt-0.5">Cursante</p>
            </div>
          </div>
        </div>
        <div className="mt-0 md:mt-5">
          <span className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 px-6 py-3 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
            Vezi Cursurile
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* Small card */
function SmallCard({ image, href, label, title, titleAccent, description, stats, cta }: {
  image: string;
  href: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  stats: { value: string; label: string }[];
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl block aspect-[16/10] md:aspect-auto md:h-full"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover img-zoom"
        style={{ objectPosition: href === "/academie" ? "center 30%" : "center" }}
        sizes="(max-width: 768px) 50vw, 42vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/40 to-dark/10 group-hover:from-dark/90 transition-all duration-500" />

      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-7">
        <div className="hidden md:block">
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1.5 block">
            {label}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-white leading-[0.95]">
            {title}<br />
            <span className="italic text-pink/90">{titleAccent}</span>
          </h2>
          <p className="font-body text-xs text-white/45 leading-relaxed mt-1.5 max-w-xs">
            {description}
          </p>
          <div className="flex gap-3 mt-2">
            {stats.map((s, i) => (
              <div key={i}>
                <span className="font-display text-lg font-bold text-white">{s.value}</span>
                <p className="font-body text-[7px] uppercase tracking-[0.2em] text-white/30 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-0 md:mt-3">
          <span className="inline-flex items-center gap-1.5 font-body text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] text-white border border-white/25 px-4 md:px-5 py-2 md:py-2.5 rounded-full group-hover:bg-white group-hover:text-dark transition-all duration-500">
            {cta}
            <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BentoHero({ heroLeftImage, heroRightTopImage, heroRightBottomImage }: BentoHeroProps) {
  const leftImg = heroLeftImage || DEFAULT_IMAGES.left;
  const rightTopImg = heroRightTopImage || DEFAULT_IMAGES.rightTop;
  const rightBottomImg = heroRightBottomImage || DEFAULT_IMAGES.rightBottom;

  return (
    <section className="w-full bg-white px-3 md:px-4 pt-3 md:pt-4 pb-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div className="md:col-span-7">
            <LargeCard image={leftImg} />
          </div>
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            <SmallCard
              image={rightTopImg}
              href="/academie"
              label="Masterclass"
              title="Învață cu"
              titleAccent="Emma"
              description="Grupuri mici, atmosferă caldă."
              stats={[{ value: "8", label: "Cursuri" }, { value: "12", label: "Sesiuni" }]}
              cta="Academie"
            />
            <SmallCard
              image={rightBottomImg}
              href="/produse"
              label="Magazin Online"
              title="Produse"
              titleAccent="Profesionale"
              description="Geluri, baze, topuri și instrumente — formulă originală."
              stats={[{ value: "110+", label: "Produse" }, { value: "7", label: "Categorii" }]}
              cta="Shop"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
