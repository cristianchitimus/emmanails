import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPriceRange, whatsappLink } from "@/lib/utils";
import { ImageGallery } from "@/components/ImageGallery";
import { CourseEnrollment } from "@/components/CourseEnrollment";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) return { title: "Curs negăsit" };
  return { title: course.name, description: course.description || `${course.name} — Emma Nails Academy` };
}

export const revalidate = 60;

const levelLabels: Record<string, string> = { incepator: "Începător", mediu: "Mediu", avansat: "Avansat" };
const levelColors: Record<string, string> = { incepator: "bg-emerald-50 text-emerald-700", mediu: "bg-amber-50 text-amber-700", avansat: "bg-purple-50 text-purple-700" };

export default async function CourseDetailPage({ params }: Props) {
  const course = await prisma.course.findUnique({ where: { slug: params.slug } });
  if (!course) notFound();

  const relatedCourses = await prisma.course.findMany({
    where: { level: course.level, id: { not: course.id } },
    take: 3,
  });

  return (
    <>
      {/* Hero with image */}
      <section className="relative bg-dark py-16 md:py-24 overflow-hidden">
        {course.imageUrl && (
          <div className="absolute inset-0">
            <Image src={course.imageUrl} alt={course.name} fill className="object-cover opacity-25" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/60" />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 font-body text-xs text-white/40 uppercase tracking-wider">
            <Link href="/academie" className="hover:text-pink transition-colors">Academie</Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[250px]">{course.name}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {course.level && (
              <span className={`font-body text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-sm ${levelColors[course.level] || "bg-dark-50 text-dark-500"}`}>
                {levelLabels[course.level] || course.level}
              </span>
            )}
            {course.duration && (
              <span className="font-body text-[11px] text-white/50 uppercase tracking-wider">Durată: {course.duration}</span>
            )}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-medium leading-tight text-white max-w-3xl">{course.name}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2 space-y-8">
              {/* Course image gallery */}
              <ImageGallery images={course.images || (course.imageUrl ? [course.imageUrl] : [])} alt={course.name} />

              {course.description && (
                <div>
                  <h2 className="font-display text-xl font-medium mb-4">Despre curs</h2>
                  <p className="font-body text-base text-dark-500 leading-relaxed">{course.description}</p>
                </div>
              )}

              {/* ── Structura curs (day-by-day) ── */}
              {course.curriculum && course.curriculum.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2">Structura curs</h2>
                  <p className="font-body text-sm text-dark-400 mb-4">
                    Cursul are o durată de {course.duration} și se lucrează 8-10 ore/zi:
                  </p>
                  <div className="space-y-2">
                    {course.curriculum.map((item, idx) => {
                      const dayMatch = item.match(/^(Ziua \d+):?\s*(.*)/);
                      return (
                        <div key={idx} className="border border-dark-100 rounded-sm overflow-hidden">
                          <div className="bg-dark-50 px-4 py-2.5 font-body text-sm font-semibold text-dark">
                            {dayMatch ? dayMatch[1] : `Ziua ${idx + 1}`}
                          </div>
                          {dayMatch && dayMatch[2] && (
                            <div className="px-4 py-2.5">
                              <p className="font-body text-sm text-dark-500">{dayMatch[2]}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Ce include cursul ── */}
              {course.includes.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-medium mb-4">Ce include cursul</h2>
                  <ul className="space-y-3">
                    {course.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-pink mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-body text-base text-dark-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ── Post de lucru asigurat ── */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-2">Post de lucru asigurat</h2>
                <p className="font-body text-sm text-dark-400 mb-4">
                  Școala noastră vă asigura un post de lucru dotat cu:
                </p>
                <ul className="space-y-2">
                  {["Freză profesională STRONG 210 putere 64W", "Lampă LED 36W", "Toate materialele necesare"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-dark flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-sm text-dark-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Mențiuni ── */}
              <div className="bg-neutral-50 border border-dark-100 rounded-sm p-5">
                <h3 className="font-display text-base font-semibold mb-3">Mențiuni</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li className="font-body text-sm text-dark-500">Cursanta își va asigura modelul de practică dacă e posibil</li>
                  <li className="font-body text-sm text-dark-500">Se lucrează o mână — 1 model la 2 cursante.</li>
                  <li className="font-body text-sm text-dark-500">Toate lucrările afișate sunt realizate de către cursante în cadrul cursului</li>
                </ul>
              </div>

              {/* ── Toți participanții la curs primesc ── */}
              <div>
                <h2 className="font-display text-2xl font-semibold mb-5">Toți participanții la curs primesc</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-dark-100 rounded-sm p-5">
                    <span className="text-2xl mb-2 block">📖</span>
                    <h3 className="font-display text-base font-bold">Nail Book</h3>
                    <p className="font-body text-xs text-dark-400 mt-1">Suport de curs cu toate schemele și teoria predată</p>
                  </div>
                  <div className="border border-dark-100 rounded-sm p-5">
                    <span className="text-2xl mb-2 block">🎓</span>
                    <h3 className="font-display text-base font-bold">Diplomă de participare</h3>
                    <p className="font-body text-xs text-dark-400 mt-1">Semnată de școala noastră</p>
                  </div>
                </div>
              </div>

              {/* ── Info grid ── */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-dark-100 rounded-sm p-4 flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-dark/40">Locație</p>
                    <p className="font-body text-sm font-medium mt-0.5">Strada Anton Crihan 9, Iași</p>
                  </div>
                </div>
                <div className="border border-dark-100 rounded-sm p-4 flex items-start gap-3">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-dark/40">Durată</p>
                    <p className="font-body text-sm font-medium mt-0.5">{course.duration || "—"}</p>
                  </div>
                </div>
                <div className="border border-dark-100 rounded-sm p-4 flex items-start gap-3">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-dark/40">Nivel</p>
                    <p className="font-body text-sm font-medium mt-0.5 capitalize">{course.level || "—"}</p>
                  </div>
                </div>
                <div className="border border-dark-100 rounded-sm p-4 flex items-start gap-3">
                  <span className="text-lg">🎓</span>
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase tracking-wider text-dark/40">Diplomă</p>
                    <p className="font-body text-sm font-medium mt-0.5">{course.hasAccreditation ? "Diplomă acreditată" : "Diplomă de participare"}</p>
                  </div>
                </div>
              </div>

              {/* ── Trainer ── */}
              <div className="flex items-center gap-4 border-t border-dark-100 pt-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0">
                  <Image
                    src="/uploads/site-image.jpg"
                    alt="Emma Răileanu"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-display text-base font-semibold">Emma Răileanu</p>
                  <p className="font-body text-xs text-dark/40">Trainer</p>
                </div>
              </div>
            </div>

            {/* Sidebar — Enrollment form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-dark-100 rounded-sm p-6 md:p-8 shadow-sm">
                {course.duration && (
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-dark-100">
                    <span className="font-body text-sm text-dark/40">Durată</span>
                    <span className="font-body text-sm font-semibold">{course.duration}</span>
                  </div>
                )}
                <CourseEnrollment course={{
                  id: course.id,
                  slug: course.slug,
                  name: course.name,
                  priceFrom: course.priceFrom,
                  priceTo: course.priceTo,
                  dates: course.dates || [],
                  hasAccreditation: course.hasAccreditation || false,
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedCourses.length > 0 && (
        <section className="py-10 md:py-16 bg-nude-50 border-t border-dark-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-medium mb-8">Cursuri <span className="italic text-pink">similare</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {relatedCourses.map((c) => (
                <Link key={c.id} href={`/academie/${c.slug}`} className="group block bg-white border border-dark-100 rounded-sm overflow-hidden hover:border-pink/40 hover:shadow-lg transition-all card-hover">
                  {c.imageUrl && (
                    <div className="relative h-40 overflow-hidden">
                      <Image src={c.imageUrl} alt={c.name} fill className="object-cover img-zoom" sizes="33vw" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-medium group-hover:text-pink transition-colors mb-2 line-clamp-2">{c.name}</h3>
                    <p className="font-body text-sm text-dark-400">{formatPriceRange(c.priceFrom, c.priceTo)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
