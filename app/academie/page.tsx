import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CourseCard } from "@/components/CourseCard";
import { whatsappLink } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academie - Cursuri Manichiura & Pedichiura",
  description: "Cursuri profesionale acreditate de manichiura si pedichiura. Iasi, Romania.",
};

export const revalidate = 60;

export default async function AcademiePage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-10 md:py-14">
        <div className="shop-container">
          <p className="section-label mb-3">Emma Nails Academy</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="shop-title">Cursuri profesionale</h1>
              <p className="shop-copy mt-3 max-w-2xl">
                Cursuri cu practica pe model real, materiale incluse si suport pentru fiecare cursanta.
              </p>
            </div>
            <p className="font-body text-sm text-dark-400">{courses.length} cursuri</p>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4 md:gap-x-5 lg:gap-x-7">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="shop-section-muted">
        <div className="shop-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded bg-white">
              <Image
                src="/uploads/academy-WhatsApp-Image-2024-07-10-at-13.46.40-1.jpeg"
                alt="Emma Nails Academy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-xl">
              <p className="section-label mb-3">Inscrieri</p>
              <h2 className="shop-title">Inveti pe model real, cu materiale profesionale</h2>
              <p className="shop-copy mt-5">
                Fiecare curs este construit pentru lucru practic: tehnici clare, corecturi pe loc si recomandari pentru produse, viteza si rezistenta.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={whatsappLink("Buna! As dori informatii despre cursuri.")} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Programeaza-te
                </a>
                <Link href="/contact" className="btn-secondary">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 bg-white">
        <div className="shop-container grid grid-cols-3 divide-x divide-neutral-100 py-8 text-center">
          {[
            { value: "15+", label: "Ani experienta" },
            { value: String(courses.length), label: "Cursuri" },
            { value: "500+", label: "Cursante" },
          ].map((item) => (
            <div key={item.label} className="px-3">
              <p className="font-display text-3xl font-semibold text-dark md:text-4xl">{item.value}</p>
              <p className="mt-2 font-body text-[11px] font-semibold uppercase text-dark-400" style={{ letterSpacing: "0.12em" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shop-section bg-dark text-white">
        <div className="shop-container text-center">
          <p className="mb-3 font-body text-[11px] font-semibold uppercase text-white/60" style={{ letterSpacing: "0.18em" }}>
            Consultanta
          </p>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight md:text-4xl">
            Nu esti sigura ce curs ti se potriveste?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/70 md:text-base">
            Scrie-ne pe WhatsApp si iti recomandam cursul potrivit nivelului tau.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={whatsappLink("Buna! Am nevoie de ajutor in alegerea unui curs.")} target="_blank" rel="noopener noreferrer" className="btn-white">
              Scrie pe WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
