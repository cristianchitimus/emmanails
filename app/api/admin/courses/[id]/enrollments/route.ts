import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enrollments = await prisma.courseEnrollment.findMany({
    where: { session: { courseId: params.id } },
    include: { session: { select: { dateLabel: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(enrollments);
}
