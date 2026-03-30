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
  incepator: "bg-green-50 text-green-700",
  mediu: "bg-amber-50 text-amber-700",
  avansat: "bg-pink-50 text-pink-700",
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/academie/${course.slug}`}
      className="group block bg-white border border-neutral-100 rounded-sm overflow-hidden hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-neutral-50">
            <span className="font-display text-3xl font-bold text-neutral-200">EN</span>
          </div>
        )}
        {course.level && (
          <span className={`absolute top-3 left-3 font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm ${LEVEL_COLORS[course.level] || "bg-neutral-100 text-neutral-600"}`}>
            {LEVEL_LABELS[course.level] || course.level}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-body text-sm font-medium leading-snug line-clamp-2 group-hover:text-pink transition-colors">
          {course.name}
        </h3>
        <div className="flex items-center justify-between mt-2.5">
          {course.duration && (
            <span className="font-body text-[11px] text-dark/40">{course.duration}</span>
          )}
          <span className="font-body text-sm font-bold text-pink">
            {formatPriceRange(course.priceFrom, course.priceTo)}
          </span>
        </div>
      </div>
    </Link>
  );
}
