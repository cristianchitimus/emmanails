import Link from "next/link";
import Image from "next/image";
import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre Emma",
  description: "Emma - nail instructor cu peste 15 ani de experienta. Iasi, Romania.",
};

const workPhotos = [
  "/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg",
  "/uploads/academy-WhatsApp-Image-2025-11-04-at-21.36.26.jpeg",
  "/uploads/academy-WhatsApp-Image-2025-09-21-at-08.46.02-2.jpeg",
];

export default function DesprePage() {
  return (
    <>
      <section className="shop-section">
        <div className="shop-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded bg-neutral-50 lg:aspect-[5/6]">
              <Image
                src="/uploads/site-image.jpg"
                alt="Emma - nail instructor"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="max-w-xl">
              <p className="section-label mb-3">Despre Emma</p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-dark md:text-4xl lg:text-5xl">
                Experienta de salon transformata in produse si cursuri profesionale
              </h1>
              <div className="mt-6 space-y-4 shop-copy">
                <p>
                  Emma Nails a pornit din pasiunea pentru manichiura si din nevoia de produse testate in lucru real.
                </p>
                <p>
                  In peste 15 ani de activitate, Emma a format sute de cursante si a construit o gama pentru tehnicieni care cauta rezistenta, control si rezultate curate.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-neutral-100 py-5">
                <div>
                  <p className="font-display text-3xl font-semibold text-dark">15+</p>
                  <p className="mt-1 font-body text-[11px] font-semibold uppercase text-dark-400" style={{ letterSpacing: "0.12em" }}>Ani experienta</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold text-dark">500+</p>
                  <p className="mt-1 font-body text-[11px] font-semibold uppercase text-dark-400" style={{ letterSpacing: "0.12em" }}>Cursante formate</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/produse" className="btn-primary">Produse</Link>
                <Link href="/academie" className="btn-secondary">Academie</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-section-muted">
        <div className="shop-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-label mb-3">Povestea noastra</p>
            <h2 className="shop-title">Calitate, educatie si suport</h2>
            <div className="mt-6 space-y-4 shop-copy text-left md:text-center">
              <p>
                Gama Emma Nails este construita pe feedback-ul real din salon: produse usor de controlat, nuante actuale si rezultate care rezista.
              </p>
              <p>
                Academia completeaza brandul prin cursuri practice, cu accent pe tehnica, igiena, viteza si increderea cursantei in lucru.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="shop-heading-row">
            <div>
              <p className="section-label mb-3">Galerie</p>
              <h2 className="shop-title">Din academie si salon</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {workPhotos.map((src, index) => (
              <div key={src} className="relative aspect-[4/5] overflow-hidden rounded bg-neutral-50">
                <Image src={src} alt={`Emma Nails ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section bg-dark text-white">
        <div className="shop-container text-center">
          <p className="mb-3 font-body text-[11px] font-semibold uppercase text-white/60" style={{ letterSpacing: "0.18em" }}>
            Contact
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Hai sa vorbim despre produse sau cursuri
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink("Buna! As dori sa discutam despre Emma Nails.")} target="_blank" rel="noopener noreferrer" className="btn-white">
              WhatsApp
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center rounded border border-white/70 px-8 py-3.5 font-body text-[12px] font-semibold uppercase text-white transition-colors hover:bg-white hover:text-dark" style={{ letterSpacing: "0.14em" }}>
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
