import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ImageGallery } from "@/components/ImageGallery";
import { CourseEnrollment } from "@/components/CourseEnrollment";
import { CourseCard } from "@/components/CourseCard";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) return { title: "Curs negasit" };
  return {
    title: course.name,
    description: course.description || `${course.name} - Emma Nails Academy`,
  };
}

export const revalidate = 60;

export default async function CourseDetailPage({ params }: Props) {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) notFound();

  const relatedCourses = await prisma.course.findMany({
    where: { id: { not: course.id } },
    orderBy: { createdAt: "asc" },
    take: 4,
  });

  return (
    <>
      <section className="border-b border-neutral-100 bg-white py-10 md:py-14">
        <div className="shop-container">
          <nav className="mb-6 flex flex-wrap items-center gap-2 font-body text-xs uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>
            <Link href="/academie" className="hover:text-pink transition-colors">Academie</Link>
            <span>/</span>
            <span>{course.name}</span>
          </nav>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="section-label mb-3">Curs profesional</p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-dark md:text-4xl lg:text-5xl">
                {course.name}
              </h1>
              {course.description && (
                <p className="shop-copy mt-5 max-w-2xl">{course.description}</p>
              )}
            </div>
            <div className="grid grid-cols-3 divide-x divide-neutral-100 rounded border border-neutral-100 bg-neutral-50 text-center">
              {[
                { label: "Durata", value: course.duration || "-" },
                { label: "Nivel", value: course.level || "Toate" },
                { label: "Diploma", value: course.hasAccreditation ? "Acreditata" : "Participare" },
              ].map((item) => (
                <div key={item.label} className="p-4">
                  <p className="font-body text-[10px] font-semibold uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>{item.label}</p>
                  <p className="mt-1 font-body text-sm font-semibold text-dark">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="shop-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <ImageGallery images={course.images || (course.imageUrl ? [course.imageUrl] : [])} alt={course.name} />

              {course.curriculum.length > 0 && (
                <div className="mt-10">
                  <h2 className="shop-title text-2xl">Structura curs</h2>
                  <div className="mt-5 divide-y divide-neutral-100 border-y border-neutral-100">
                    {course.curriculum.map((item, index) => (
                      <div key={index} className="py-4">
                        <p className="font-body text-sm leading-relaxed text-dark-500">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {course.includes.length > 0 && (
                <div className="mt-10">
                  <h2 className="shop-title text-2xl">Ce include cursul</h2>
                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                    {course.includes.map((item) => (
                      <div key={item} className="rounded border border-neutral-100 bg-white p-4">
                        <p className="font-body text-sm leading-relaxed text-dark-500">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 rounded border border-neutral-100 bg-neutral-50 p-5">
                <h2 className="font-body text-sm font-semibold uppercase text-dark" style={{ letterSpacing: "0.12em" }}>
                  Post de lucru asigurat
                </h2>
                <p className="shop-copy mt-3">
                  Cursanta lucreaza cu freza profesionala, lampa LED si materialele necesare pentru practica.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-4 border-t border-neutral-100 pt-6">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded bg-neutral-100">
                  <Image src="/uploads/site-image.jpg" alt="Emma Raileanu" fill className="object-cover object-top" sizes="56px" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-dark">Emma Raileanu</p>
                  <p className="font-body text-xs text-dark-400">Trainer</p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded border border-neutral-100 bg-white p-5 shadow-sm md:p-6">
                <CourseEnrollment
                  course={{
                    id: course.id,
                    slug: course.slug,
                    name: course.name,
                    priceFrom: course.priceFrom,
                    priceTo: course.priceTo,
                    dates: course.dates || [],
                    hasAccreditation: course.hasAccreditation || false,
                  }}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="shop-section-muted">
          <div className="shop-container">
            <div className="shop-heading-row">
              <div>
                <p className="section-label mb-3">Recomandari</p>
                <h2 className="shop-title">Cursuri similare</h2>
              </div>
              <Link href="/academie" className="shop-link">Toate cursurile</Link>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 lg:gap-x-7">
              {relatedCourses.map((item) => (
                <CourseCard key={item.id} course={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
