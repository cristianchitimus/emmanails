import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      sessions: {
        orderBy: { createdAt: "asc" },
        include: {
          _count: { select: { enrollments: true } },
          enrollments: {
            where: { status: { not: "cancelled" } },
            select: { id: true },
          },
        },
      },
    },
  });

  const result = courses.map((c) => ({
    ...c,
    totalEnrollments: c.sessions.reduce((sum, s) => sum + s._count.enrollments, 0),
    sessions: c.sessions.map((s) => ({
      id: s.id,
      dateLabel: s.dateLabel,
      maxSpots: s.maxSpots,
      active: s.active,
      enrolled: s.enrollments.length,
      spotsLeft: s.maxSpots - s.enrollments.length,
    })),
  }));

  return NextResponse.json(result);
}
