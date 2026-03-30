import Link from "next/link";
import Image from "next/image";
import { formatPriceRange } from "@/lib/utils";

interface CourseCardProps {
  course: {
    id: string;
    slug: string;
    name: string;
    priceFrom: number;
    priceTo: number;
    level?: string | null;
    duration?: string | null;
    imageUrl?: string | null;
  };
}

const levelColors: Record<string, string> = {
  incepator: "bg-emerald-50 text-emerald-700",
  mediu: "bg-amber-50 text-amber-700",
  avansat: "bg-purple-50 text-purple-700",
};

const levelLabels: Record<string, string> = {
  incepator: "Începător",
  mediu: "Mediu",
  avansat: "Avansat",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/academie/${course.slug}`}
      className="group block card-hover"
    >
      <div className="relative bg-white border border-dark-100 rounded-sm overflow-hidden h-full hover:border-pink/40 hover:shadow-xl hover:shadow-pink/5 transition-all duration-500">
        {/* Course image */}
        {course.imageUrl && (
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={course.name}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Top row */}
          <div className="flex items-center justify-between mb-4">
            {course.level && (
              <span
                className={`font-body text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm ${
                  levelColors[course.level] || "bg-dark-50 text-dark-500"
                }`}
              >
                {levelLabels[course.level] || course.level}
              </span>
            )}
            {course.duration && (
              <span className="font-body text-[11px] text-dark-400 uppercase tracking-wider">
                {course.duration}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display text-xl md:text-2xl font-medium text-dark leading-snug group-hover:text-pink transition-colors mb-4 line-clamp-2">
            {course.name}
          </h3>

          {/* Price */}
          <p className="font-body text-sm text-dark-400 mb-5">
            de la{" "}
            <span className="text-dark font-semibold text-base">
              {formatPriceRange(course.priceFrom, course.priceTo)}
            </span>
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-pink group-hover:gap-3 transition-all">
            <span>Vezi detalii</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
