import { prisma } from "@/lib/db";
import Image from "next/image";
import { CourseCard } from "@/components/CourseCard";
import { GlowLine } from "@/components/GlowLine";
import { whatsappLink } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academie — Cursuri Manichiură & Pedichiură",
  description: "Cursuri profesionale acreditate de manichiură și pedichiură. Iași, România.",
};

export const revalidate = 60;

export default async function AcademiePage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      {/* Mini header */}
      <section className="pt-12 pb-6 md:pt-16 md:pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-label mb-3">Emma Nails Academy</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-dark leading-tight">
            Toate <span className="italic text-pink">cursurile</span>
          </h1>
          <p className="font-body text-base text-dark-400 mt-3 max-w-xl">
            Alege cursul potrivit nivelului tău. Fiecare include practică pe model real și diplomă.
          </p>
        </div>
      </section>

      {/* All courses — flat grid, seed order */}
      <section className="pb-14 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* Promotional hero — Cursuri de manichiură + image */}
      <section className="relative bg-gradient-to-br from-white via-pink-50/50 to-nude-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-3">Înscrie-te acum</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-dark leading-tight">
                Cursuri de <span className="italic text-pink">manichiură</span>
              </h2>
              <p className="font-body text-base md:text-lg text-dark-400 mt-5 max-w-xl leading-relaxed">
                Indiferent dacă ești începătoare sau profesionistă, avem cursuri adaptate nivelului tău. Toate includ diplomă acreditată.
              </p>
              <div className="mt-8">
                <a href={whatsappLink("Bună! Aș dori informații despre cursuri.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Programează-te acum
                </a>
              </div>
            </div>
            <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden hidden lg:block">
              <Image
                src="/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg"
                alt="Emma Nails Academy"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* Stats */}
      <section className="py-12 bg-pink-50/50 border-y border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <span className="font-display text-3xl md:text-4xl font-bold text-pink">15+</span>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">Ani Experiență</p>
            </div>
            <div>
              <span className="font-display text-3xl md:text-4xl font-bold text-pink">{courses.length}</span>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">Cursuri</p>
            </div>
            <div>
              <span className="font-display text-3xl md:text-4xl font-bold text-pink">500+</span>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-dark-400 mt-1">Cursante</p>
            </div>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* CTA — pink */}
      <section className="py-20 md:py-28 bg-pink relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-medium text-white mb-4">
            Nu ești sigură ce curs ți se potrivește?
          </h2>
          <p className="font-body text-base text-white/70 mb-8">Scrie-mi pe WhatsApp și te ajut să alegi cursul potrivit.</p>
          <a href={whatsappLink("Bună! Am nevoie de ajutor în alegerea unui curs.")} target="_blank" rel="noopener noreferrer" className="btn-white">
            Scrie-mi pe WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
