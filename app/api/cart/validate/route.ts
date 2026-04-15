import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { ids } = body as { ids: string[] };

  if (!ids?.length) {
    return NextResponse.json({ valid: [], invalid: [] });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids }, inStock: true },
    select: { id: true },
  });

  const validIds = new Set(products.map((p) => p.id));
  const valid = ids.filter((id) => validIds.has(id));
  const invalid = ids.filter((id) => !validIds.has(id));

  return NextResponse.json({ valid, invalid });
}
