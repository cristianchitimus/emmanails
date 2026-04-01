import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      sessions: {
        where: { active: true },
        orderBy: { createdAt: "asc" },
        include: {
          _count: { select: { enrollments: { where: { status: { not: "cancelled" } } } } },
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const sessions = course.sessions.map((s) => ({
    id: s.id,
    dateLabel: s.dateLabel,
    maxSpots: s.maxSpots,
    spotsLeft: s.maxSpots - s._count.enrollments,
    full: s._count.enrollments >= s.maxSpots,
  }));

  return NextResponse.json(sessions);
}
