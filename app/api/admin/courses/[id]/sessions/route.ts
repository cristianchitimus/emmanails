import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

// Add a new session to a course
export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dateLabel, maxSpots } = await req.json();
  if (!dateLabel) {
    return NextResponse.json({ error: "Data sesiunii e obligatorie" }, { status: 400 });
  }

  const session = await prisma.courseSession.create({
    data: {
      courseId: params.id,
      dateLabel,
      maxSpots: maxSpots ? parseInt(maxSpots) : 10,
      active: true,
    },
  });

  // Also add to course.dates array for backward compat
  await prisma.course.update({
    where: { id: params.id },
    data: { dates: { push: dateLabel } },
  });

  return NextResponse.json(session, { status: 201 });
}
