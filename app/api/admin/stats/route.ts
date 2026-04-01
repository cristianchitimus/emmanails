import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalOrders,
    ordersToday,
    ordersThisMonth,
    totalRevenue,
    revenueThisMonth,
    revenueToday,
    pendingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers,
    recentOrders,
    monthlySales,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "paid" } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "paid", createdAt: { gte: startOfMonth } } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: "paid", createdAt: { gte: startOfToday } } }),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.product.count(),
    prisma.product.count({ where: { stock: { not: null, lte: 5 } } }),
    prisma.user.count(),
    prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    // Monthly sales for last 6 months
    prisma.$queryRaw`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') as month,
        COUNT(*)::int as orders,
        COALESCE(SUM("total"), 0)::int as revenue
      FROM "Order"
      WHERE "createdAt" >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    ` as Promise<{ month: string; orders: number; revenue: number }[]>,
  ]);

  return NextResponse.json({
    totalOrders,
    ordersToday,
    ordersThisMonth,
    totalRevenue: totalRevenue._sum.total || 0,
    revenueThisMonth: revenueThisMonth._sum.total || 0,
    revenueToday: revenueToday._sum.total || 0,
    pendingOrders,
    totalProducts,
    lowStockProducts,
    totalCustomers,
    recentOrders,
    monthlySales,
  });
}
