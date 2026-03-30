import Link from "next/link";
import Image from "next/image";
import { formatPriceRange } from "@/lib/utils";

interface CourseCardProps {
  course: {
    slug: string;
    name: string;
    priceFrom: number;
    priceTo: number;
    level?: string | null;
    duration?: string | null;
    imageUrl?: string | null;
  };
}

const LEVEL_LABELS: Record<string, string> = {
  incepator: "Începător",
  mediu: "Mediu",
  avansat: "Avansat",
};

const LEVEL_COLORS: Record<string, string> = {
  incepator: "bg-green-100 text-green-700",
  mediu: "bg-yellow-100 text-yellow-700",
  avansat: "bg-pink-100 text-pink-700",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/academie/${course.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] bg-nude/20 overflow-hidden">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-pink/10 to-nude/40">
            <span className="font-display text-4xl font-bold text-pink/20">EN</span>
          </div>
        )}

        {/* Level badge */}
        {course.level && (
          <span className={`absolute top-3 left-3 font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${LEVEL_COLORS[course.level] || "bg-neutral-100 text-neutral-600"}`}>
            {LEVEL_LABELS[course.level] || course.level}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold leading-snug line-clamp-2 group-hover:text-pink transition-colors">
          {course.name}
        </h3>
        <div className="flex items-center gap-3 mt-3">
          {course.duration && (
            <span className="font-body text-xs text-neutral-500">
              {course.duration}
            </span>
          )}
          <span className="font-display text-sm font-bold text-pink">
            {formatPriceRange(course.priceFrom, course.priceTo)}
          </span>
        </div>
      </div>
    </Link>
  );
}
