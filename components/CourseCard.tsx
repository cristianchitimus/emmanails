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

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/academie/${course.slug}`} className="motion-card group block">
      <div className="relative aspect-square overflow-hidden rounded bg-neutral-50">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-white">
            <span className="font-display text-3xl font-bold text-neutral-200">EN</span>
          </div>
        )}
      </div>
      <div className="pt-3">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {course.duration && (
            <span className="font-body text-[11px] uppercase text-dark-300" style={{ letterSpacing: "0.12em" }}>
              {course.duration}
            </span>
          )}
          {course.level && <span className="font-body text-[11px] text-dark-300">{course.level}</span>}
        </div>
        <h3 className="min-h-[40px] font-body text-sm font-medium leading-snug text-dark transition-colors group-hover:text-pink line-clamp-2">
          {course.name}
        </h3>
        <p className="mt-2 font-body text-sm font-semibold text-dark">
          {formatPriceRange(course.priceFrom, course.priceTo)}
        </p>
      </div>
    </Link>
  );
}
