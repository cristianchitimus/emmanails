import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PATCH(req: Request, { params }: { params: { id: string; sessionId: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data: Record<string, unknown> = {};
  if (body.dateLabel !== undefined) data.dateLabel = body.dateLabel;
  if (body.maxSpots !== undefined) data.maxSpots = parseInt(body.maxSpots);
  if (body.active !== undefined) data.active = body.active;

  const session = await prisma.courseSession.update({
    where: { id: params.sessionId },
    data,
  });

  return NextResponse.json(session);
}

export async function DELETE(req: Request, { params }: { params: { id: string; sessionId: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enrollments = await prisma.courseEnrollment.count({
    where: { sessionId: params.sessionId, status: { not: "cancelled" } },
  });

  if (enrollments > 0) {
    return NextResponse.json(
      { error: `Nu poți șterge — are ${enrollments} înscrieri active. Dezactiveaz-o în schimb.` },
      { status: 400 }
    );
  }

  await prisma.courseSession.delete({ where: { id: params.sessionId } });
  return NextResponse.json({ success: true });
}
