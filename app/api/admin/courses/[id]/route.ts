import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, priceFrom, priceTo, level, duration,
          includes, curriculum, hasAccreditation, featured,
          imageUrl, images } = body;

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description || null;
  if (priceFrom !== undefined) data.priceFrom = parseInt(priceFrom);
  if (priceTo !== undefined) data.priceTo = parseInt(priceTo);
  if (level !== undefined) data.level = level || null;
  if (duration !== undefined) data.duration = duration || null;
  if (includes !== undefined) data.includes = includes;
  if (curriculum !== undefined) data.curriculum = curriculum;
  if (hasAccreditation !== undefined) data.hasAccreditation = hasAccreditation;
  if (featured !== undefined) data.featured = featured;
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (images !== undefined) data.images = images?.filter(Boolean) || [];

  const course = await prisma.course.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(course);
}
