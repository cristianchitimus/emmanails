import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { price, salePrice, stock, inStock, featured } = body;

  const data: Record<string, unknown> = {};
  if (price !== undefined) data.price = price;
  if (salePrice !== undefined) data.salePrice = salePrice || null;
  if (stock !== undefined) data.stock = stock === "" || stock === null ? null : parseInt(stock);
  if (inStock !== undefined) data.inStock = inStock;
  if (featured !== undefined) data.featured = featured;

  const product = await prisma.product.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(product);
}
