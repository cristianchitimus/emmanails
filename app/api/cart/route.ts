import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Validate cart items exist and return current prices
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body as {
      items: { id: string; quantity: number }[];
    };

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const productIds = items.map((i) => i.id);

    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        salePrice: true,
        inStock: true,
        category: true,
      },
    });

    // Build validated cart with current prices
    const validatedItems = items
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product || !product.inStock) return null;
        return {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.salePrice ?? product.price,
          quantity: Math.min(Math.max(1, item.quantity), 99),
          category: product.category,
        };
      })
      .filter(Boolean);

    const total = validatedItems.reduce(
      (sum, item) => sum + (item?.price ?? 0) * (item?.quantity ?? 0),
      0
    );

    return NextResponse.json({
      items: validatedItems,
      total,
      itemCount: validatedItems.reduce(
        (sum, item) => sum + (item?.quantity ?? 0),
        0
      ),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
