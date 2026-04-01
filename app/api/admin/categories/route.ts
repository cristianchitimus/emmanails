import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

// GET: list all categories with subcategories and counts
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.groupBy({
    by: ["category", "subcategory"],
    _count: { id: true },
  });

  // Build tree: { category: { label, subcategories: { sub: count } } }
  const tree: Record<string, { total: number; subcategories: Record<string, number> }> = {};

  for (const row of products) {
    if (!tree[row.category]) {
      tree[row.category] = { total: 0, subcategories: {} };
    }
    tree[row.category].total += row._count.id;
    if (row.subcategory) {
      tree[row.category].subcategories[row.subcategory] = row._count.id;
    }
  }

  return NextResponse.json(tree);
}

// POST: create category, rename category, or batch move products
export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { action } = body;

  if (action === "rename") {
    // Rename a category or subcategory
    const { oldCategory, newCategory, oldSubcategory, newSubcategory } = body;

    if (oldSubcategory !== undefined) {
      // Rename subcategory
      await prisma.product.updateMany({
        where: { category: oldCategory, subcategory: oldSubcategory },
        data: { subcategory: newSubcategory },
      });
    } else {
      // Rename category
      await prisma.product.updateMany({
        where: { category: oldCategory },
        data: { category: newCategory },
      });
    }

    return NextResponse.json({ success: true });
  }

  if (action === "move") {
    // Move specific products to a new category/subcategory
    const { productIds, toCategory, toSubcategory } = body;

    await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: {
        category: toCategory,
        subcategory: toSubcategory || null,
      },
    });

    return NextResponse.json({ success: true, moved: productIds.length });
  }

  if (action === "add-subcategory") {
    // Just a record — subcategories are strings, they exist when products reference them
    return NextResponse.json({ success: true, note: "Subcategorii se creează la adăugarea produselor" });
  }

  return NextResponse.json({ error: "Acțiune necunoscută" }, { status: 400 });
}
