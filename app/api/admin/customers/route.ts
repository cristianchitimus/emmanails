import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get unique customers from orders
  const orderCustomers = await prisma.order.findMany({
    select: {
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      total: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Get unique customers from course enrollments
  const enrollmentCustomers = await prisma.courseEnrollment.findMany({
    select: {
      email: true,
      name: true,
      phone: true,
      createdAt: true,
      session: {
        select: {
          course: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get registered users
  const registeredUsers = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      phone: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Build a map of unique emails with their info
  const customerMap = new Map<
    string,
    {
      email: string;
      name: string;
      phone: string | null;
      sources: string[];
      totalSpent: number;
      orderCount: number;
      courseCount: number;
      lastActivity: Date;
    }
  >();

  for (const o of orderCustomers) {
    const existing = customerMap.get(o.email.toLowerCase());
    if (existing) {
      if (!existing.sources.includes("orders")) existing.sources.push("orders");
      existing.totalSpent += o.total;
      existing.orderCount += 1;
      if (o.createdAt > existing.lastActivity) existing.lastActivity = o.createdAt;
    } else {
      customerMap.set(o.email.toLowerCase(), {
        email: o.email,
        name: o.name,
        phone: o.phone,
        sources: ["orders"],
        totalSpent: o.total,
        orderCount: 1,
        courseCount: 0,
        lastActivity: o.createdAt,
      });
    }
  }

  for (const e of enrollmentCustomers) {
    const existing = customerMap.get(e.email.toLowerCase());
    if (existing) {
      if (!existing.sources.includes("courses")) existing.sources.push("courses");
      existing.courseCount += 1;
      if (e.createdAt > existing.lastActivity) existing.lastActivity = e.createdAt;
    } else {
      customerMap.set(e.email.toLowerCase(), {
        email: e.email,
        name: e.name,
        phone: e.phone,
        sources: ["courses"],
        totalSpent: 0,
        orderCount: 0,
        courseCount: 1,
        lastActivity: e.createdAt,
      });
    }
  }

  for (const u of registeredUsers) {
    const existing = customerMap.get(u.email.toLowerCase());
    if (existing) {
      if (!existing.sources.includes("registered")) existing.sources.push("registered");
    } else {
      customerMap.set(u.email.toLowerCase(), {
        email: u.email,
        name: u.name || "—",
        phone: u.phone,
        sources: ["registered"],
        totalSpent: 0,
        orderCount: 0,
        courseCount: 0,
        lastActivity: u.createdAt,
      });
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => b.lastActivity.getTime() - a.lastActivity.getTime()
  );

  const stats = {
    total: customers.length,
    orders: customers.filter((c) => c.sources.includes("orders")).length,
    courses: customers.filter((c) => c.sources.includes("courses")).length,
    registered: customers.filter((c) => c.sources.includes("registered")).length,
  };

  return NextResponse.json({ customers, stats });
}
