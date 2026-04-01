"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Session {
  id: string;
  dateLabel: string;
  maxSpots: number;
  active: boolean;
  enrolled: number;
  spotsLeft: number;
}

interface Course {
  id: string;
  slug: string;
  name: string;
  priceFrom: number;
  priceTo: number;
  level: string | null;
  duration: string | null;
  hasAccreditation: boolean;
  totalEnrollments: number;
  sessions: Session[];
}

function formatPrice(bani: number) { return `${(bani / 100).toFixed(0)} lei`; }

const LEVEL_LABELS: Record<string, string> = { incepator: "Începător", mediu: "Mediu", avansat: "Avansat" };

export default function AdminCursuriPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/courses").then((r) => r.json()).then(setCourses).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin w-8 h-8 border-2 border-pink border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-dark">Cursuri & Sesiuni</h1>
        <p className="font-body text-sm text-dark-400 mt-1">Gestionează perioadele, locurile și înscriși</p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => {
          const activeSessions = course.sessions.filter((s) => s.active);
          const totalSpots = activeSessions.reduce((sum, s) => sum + s.maxSpots, 0);
          const totalEnrolled = activeSessions.reduce((sum, s) => sum + s.enrolled, 0);

          return (
            <div key={course.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
              {/* Course header */}
              <div className="p-5 border-b border-neutral-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-display text-lg font-medium text-dark">{course.name}</h2>
                      {course.level && (
                        <span className="font-body text-[10px] font-semibold uppercase tracking-wider bg-neutral-100 text-dark-400 px-2 py-0.5 rounded-full">
                          {LEVEL_LABELS[course.level] || course.level}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 font-body text-xs text-dark-400">
                      <span>Avans: <strong className="text-pink">{formatPrice(course.priceFrom)}</strong></span>
                      <span>Integral: <strong className="text-dark">{formatPrice(course.priceTo)}</strong></span>
                      {course.duration && <span>Durată: {course.duration}</span>}
                      <span>Înscrieri totale: <strong>{course.totalEnrollments}</strong></span>
                    </div>
                  </div>
                  <Link href={`/admin/cursuri/${course.id}`}
                    className="bg-pink text-white font-body text-[10px] font-semibold uppercase tracking-wider px-4 py-2 rounded-xl hover:bg-pink/90 transition-colors text-center whitespace-nowrap">
                    Gestionează →
                  </Link>
                </div>
              </div>

              {/* Sessions summary */}
              {activeSessions.length > 0 ? (
                <div className="px-5 py-3">
                  <div className="flex flex-wrap gap-2">
                    {course.sessions.map((s) => (
                      <div key={s.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-body ${
                        !s.active ? "bg-neutral-50 border-neutral-200 text-dark-300 line-through" :
                        s.spotsLeft <= 0 ? "bg-red-50 border-red-200 text-red-600" :
                        s.spotsLeft <= 3 ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                        "bg-emerald-50 border-emerald-200 text-emerald-700"
                      }`}>
                        <span className="font-medium">{s.dateLabel}</span>
                        <span className="opacity-70">
                          {s.spotsLeft <= 0 ? "PLIN" : `${s.enrolled}/${s.maxSpots}`}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between font-body text-[10px] text-dark-300 mb-1">
                      <span>Locuri ocupate: {totalEnrolled} / {totalSpots}</span>
                      <span>{totalSpots > 0 ? Math.round((totalEnrolled / totalSpots) * 100) : 0}%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink to-pink/60 rounded-full transition-all"
                        style={{ width: `${totalSpots > 0 ? Math.min((totalEnrolled / totalSpots) * 100, 100) : 0}%` }} />
                    </div>
                  </div>
                </div>
              ) : (
                <p className="px-5 py-3 font-body text-xs text-dark-300">Nicio sesiune activă</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
