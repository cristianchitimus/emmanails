import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("q");

  const where: Record<string, unknown> = {};
  if (category && category !== "all") where.category = category;
  if (search) where.name = { contains: search, mode: "insensitive" };

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
    select: {
      id: true, slug: true, name: true, price: true, salePrice: true,
      category: true, subcategory: true, size: true, inStock: true,
      stock: true, featured: true, imageUrl: true, colorHex: true,
      _count: { select: { orderItems: true } },
    },
  });

  return NextResponse.json(products);
}
