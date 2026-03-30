import { prisma } from "@/lib/db";
import Image from "next/image";
import { CourseCard } from "@/components/CourseCard";
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
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });

  const beginnerCourses = courses.filter((c) => c.level === "incepator");
  const mediumCourses = courses.filter((c) => c.level === "mediu");
  const advancedCourses = courses.filter((c) => c.level === "avansat");

  return (
    <>
      {/* Hero — light pink */}
      <section className="relative bg-gradient-to-br from-white via-pink-50/50 to-nude-100 py-16 md:py-24 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label mb-3">Emma Nails Academy</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-dark leading-tight">
                Cursuri de <span className="italic text-pink">manichiură</span>
              </h1>
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
                src="https://academy.emmanails.ro/wp-content/uploads/2024/05/WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg"
                alt="Emma Nails Academy"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

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

      {/* Courses by level */}
      {[
        { label: "Începător", courses: beginnerCourses, color: "text-emerald-600" },
        { label: "Mediu", courses: mediumCourses, color: "text-amber-600" },
        { label: "Avansat", courses: advancedCourses, color: "text-purple-600" },
      ]
        .filter((g) => g.courses.length > 0)
        .map((group) => (
          <section key={group.label} className="py-14 md:py-20 bg-white border-b border-dark-100/50 last:border-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-10">
                Nivel <span className={`italic ${group.color}`}>{group.label}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {group.courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </section>
        ))}

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
