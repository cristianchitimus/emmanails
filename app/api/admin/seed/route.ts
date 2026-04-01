import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";

// Visit /api/admin/seed?key=emma2026seed to populate database
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("key") !== "emma2026seed") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Clear existing (order matters for FK constraints)
    await prisma.courseEnrollment.deleteMany({});
    await prisma.courseSession.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.course.deleteMany({});

    const { products, courses } = await import("./seedData");

    for (const p of products) { await prisma.product.create({ data: p }); }

    // Create courses with sessions from their dates arrays
    for (const c of courses) {
      const { dates, ...courseData } = c;
      const course = await prisma.course.create({ data: { ...courseData, dates } });

      // Create a session for each date with 10 spots
      if (dates && dates.length > 0) {
        for (const dateLabel of dates) {
          await prisma.courseSession.create({
            data: { courseId: course.id, dateLabel, maxSpots: 10, active: true },
          });
        }
      }
    }

    // Discount codes
    for (const dc of [
      { code: "WELCOME10", type: "percentage", value: 10, minOrderValue: 10000, active: true },
      { code: "EMMA20", type: "percentage", value: 20, minOrderValue: 20000, maxUses: 100, active: true, expiresAt: new Date("2026-12-31") },
      { code: "LIVRARE0", type: "fixed", value: 2000, minOrderValue: 15000, active: true },
      { code: "ABSOLVENT15", type: "percentage", value: 15, minOrderValue: 5000, active: true },
    ]) {
      await prisma.discountCode.upsert({ where: { code: dc.code }, update: dc, create: dc });
    }

    // Test user
    const ph = await hash("test1234", 12);
    await prisma.user.upsert({
      where: { email: "test@emmanails.ro" },
      update: { passwordHash: ph },
      create: { email: "test@emmanails.ro", name: "Maria Test", phone: "0740000000", passwordHash: ph },
    });

    const pc = await prisma.product.count();
    const cc = await prisma.course.count();
    const sc = await prisma.courseSession.count();

    return NextResponse.json({ success: true, products: pc, courses: cc, sessions: sc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
