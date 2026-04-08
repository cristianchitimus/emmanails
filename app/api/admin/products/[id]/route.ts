import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, description, price, salePrice, category, subcategory, size, colorHex, imageUrl, images, stock, inStock, featured } = body;

  const data: Record<string, unknown> = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description || null;
  if (price !== undefined) data.price = parseInt(price);
  if (salePrice !== undefined) data.salePrice = salePrice ? parseInt(salePrice) : null;
  if (category !== undefined) data.category = category;
  if (subcategory !== undefined) data.subcategory = subcategory || null;
  if (size !== undefined) data.size = size || null;
  if (colorHex !== undefined) data.colorHex = colorHex || null;
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (images !== undefined) data.images = images?.filter(Boolean) || [];
  if (stock !== undefined) data.stock = stock === "" || stock === null ? null : parseInt(stock);
  if (inStock !== undefined) data.inStock = inStock;
  if (featured !== undefined) data.featured = featured;

  const product = await prisma.product.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(product);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if product has order items
  const orderItems = await prisma.orderItem.count({ where: { productId: params.id } });
  if (orderItems > 0) {
    return NextResponse.json(
      { error: `Nu poți șterge acest produs — are ${orderItems} comenzi asociate. Dezactivează-l în schimb.` },
      { status: 400 }
    );
  }

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
