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

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, salePrice, category, subcategory, size, colorHex, imageUrl, images, stock, inStock, featured } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: "Nume, preț și categorie sunt obligatorii" }, { status: 400 });
  }

  // Generate slug from name
  const baseSlug = name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Ensure unique slug
  let slug = baseSlug;
  let counter = 0;
  while (await prisma.product.findUnique({ where: { slug } })) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  const product = await prisma.product.create({
    data: {
      slug,
      name,
      description: description || null,
      price: parseInt(price),
      salePrice: salePrice ? parseInt(salePrice) : null,
      category,
      subcategory: subcategory || null,
      size: size || null,
      colorHex: colorHex || null,
      imageUrl: imageUrl || null,
      images: images?.filter(Boolean) || [],
      stock: stock !== undefined && stock !== "" ? parseInt(stock) : null,
      inStock: inStock !== false,
      featured: featured === true,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
